/**
 * Các hàm tiện ích để tích hợp analytics vào luồng xác thực người dùng
 */
import { supabase } from '@/lib/supabase-client';
import { trackEvent } from '@/lib/analytics-service';

/**
 * Lưu thông tin đăng nhập của người dùng vào analytics
 * Gọi hàm này khi người dùng đăng nhập thành công
 * 
 * @param {object} user - Thông tin người dùng từ Supabase auth
 * @param {string} method - Phương thức đăng nhập (email, google, facebook, etc.)
 */
export async function trackUserLogin(user, method = 'email') {
  if (!user) return;
  
  try {
    // Lấy thông tin bổ sung từ bảng người dùng nếu có
    let userData = { id: user.id, email: user.email };
    
    const { data: nguoiDungData } = await supabase
      .from('nguoi_dung')
      .select('id, ten, vai_tro, avatar_url, last_login_at')
      .eq('id', user.id)
      .single();
      
    // Kiểm tra có phải lần đăng nhập đầu tiên không
    const isFirstLogin = !nguoiDungData?.last_login_at;
    
    // Cập nhật thời gian đăng nhập gần nhất
    await supabase
      .from('nguoi_dung')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', user.id);
    
    // Ghi nhận sự kiện đăng nhập
    trackEvent('user_login', {
      method,
      userId: user.id,
      email_domain: user.email ? user.email.split('@')[1] : null,
      has_avatar: !!(nguoiDungData?.avatar_url),
      is_first_login: isFirstLogin,
      role: nguoiDungData?.vai_tro || null
    });
    
  } catch (error) {
    console.error('Lỗi khi theo dõi đăng nhập:', error);
  }
}

/**
 * Lưu thông tin đăng ký của người dùng vào analytics
 * Gọi hàm này khi người dùng đăng ký thành công
 * 
 * @param {object} user - Thông tin người dùng từ Supabase auth
 * @param {string} method - Phương thức đăng ký (email, google, facebook, etc.)
 * @param {string} referrer - Nguồn giới thiệu người dùng (nếu có)
 */
export function trackUserSignup(user, method = 'email', referrer = null) {
  if (!user) return;
  
  try {
    // Ghi nhận sự kiện đăng ký
    trackEvent('user_signup', {
      method,
      userId: user.id,
      email_domain: user.email ? user.email.split('@')[1] : null,
      referrer
    });
    
  } catch (error) {
    console.error('Lỗi khi theo dõi đăng ký:', error);
  }
}

/**
 * Lưu thông tin đăng xuất của người dùng vào analytics
 * Gọi hàm này khi người dùng đăng xuất
 * 
 * @param {string} reason - Lý do đăng xuất (manual, session_expired, security_issue, etc.)
 * @param {object} sessionInfo - Thông tin về phiên đăng nhập
 */
export function trackUserLogout(reason = 'manual', sessionInfo = {}) {
  try {
    // Tính toán thời gian người dùng đã đăng nhập (nếu có)
    let durationSeconds = null;
    if (sessionInfo.loginTime) {
      durationSeconds = Math.floor((Date.now() - new Date(sessionInfo.loginTime).getTime()) / 1000);
    }
    
    // Ghi nhận sự kiện đăng xuất
    trackEvent('user_logout', {
      reason,
      duration_seconds: durationSeconds,
      pages_visited: sessionInfo.pagesVisited || null
    });
    
  } catch (error) {
    console.error('Lỗi khi theo dõi đăng xuất:', error);
  }
}

/**
 * Hook vào event listener của Supabase để tự động theo dõi đăng nhập/đăng xuất
 * Gọi hàm này tại component cấp cao nhất (ví dụ: _app.js)
 */
export function setupAuthTracking() {
  if (typeof window === 'undefined') return;
  
  try {
    // Lưu thời gian đăng nhập khi người dùng đăng nhập
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        // Lưu thời gian đăng nhập vào localStorage
        localStorage.setItem('login_time', new Date().toISOString());
        
        // Đặt lại bộ đếm trang đã truy cập
        localStorage.setItem('pages_visited', '0');
        
        // Theo dõi sự kiện đăng nhập
        trackUserLogin(session?.user, 'supabase');
      }
      
      if (event === 'SIGNED_OUT') {
        // Lấy thông tin phiên từ localStorage
        const loginTime = localStorage.getItem('login_time');
        const pagesVisited = parseInt(localStorage.getItem('pages_visited') || '0', 10);
        
        // Theo dõi sự kiện đăng xuất
        trackUserLogout('manual', { 
          loginTime, 
          pagesVisited 
        });
        
        // Xóa dữ liệu phiên
        localStorage.removeItem('login_time');
        localStorage.removeItem('pages_visited');
      }
    });
    
    // Theo dõi số trang đã truy cập
    const trackPageCount = () => {
      if (supabase.auth.getUser()) {
        const count = parseInt(localStorage.getItem('pages_visited') || '0', 10);
        localStorage.setItem('pages_visited', (count + 1).toString());
      }
    };
    
    // Đăng ký sự kiện theo dõi trang
    window.addEventListener('popstate', trackPageCount);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('popstate', trackPageCount);
    };
    
  } catch (error) {
    console.error('Lỗi khi thiết lập theo dõi xác thực:', error);
  }
} 