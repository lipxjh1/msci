import { supabase } from '@/utils/supabase';
import { UAParser } from 'ua-parser-js';

/**
 * Ghi lại lượt truy cập trang
 * @param url URL của trang đang được truy cập
 * @param userId ID người dùng nếu đã đăng nhập
 */
export async function trackPageView(url: string, userId?: string) {
  try {
    // Phân tích user agent để lấy thông tin thiết bị và trình duyệt
    const parser = new UAParser();
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    parser.setUA(userAgent);
    
    const browser = parser.getBrowser();
    const device = parser.getDevice();
    const os = parser.getOS();
    
    // Dữ liệu để lưu vào DB
    const pageViewData = {
      url: url,
      nguoi_dung_id: userId || null,
      device: device.type || (os.name ? 'Desktop' : 'Unknown'),
      browser: browser.name || 'Unknown',
      os: os.name || 'Unknown',
      ngay_tao: new Date().toISOString(),
      is_mobile: device.type === 'mobile' || device.type === 'tablet',
      referer: typeof document !== 'undefined' ? document.referrer : null,
    };
    
    // Lưu vào Supabase
    const { error } = await supabase
      .from('luot_truy_cap')
      .insert([pageViewData]);
    
    if (error) {
      console.error('Lỗi khi lưu lượt truy cập:', error);
    }
  } catch (error) {
    console.error('Lỗi khi theo dõi lượt truy cập:', error);
  }
}

/**
 * Ghi lại hành động của người dùng
 * @param eventType Loại hành động (click, submit, etc.)
 * @param element Phần tử HTML tương tác
 * @param userId ID người dùng nếu đã đăng nhập
 */
export async function trackUserAction(eventType: string, element: string, userId?: string) {
  try {
    const actionData = {
      event_type: eventType,
      element: element,
      nguoi_dung_id: userId || null,
      url: typeof window !== 'undefined' ? window.location.href : '',
      ngay_tao: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('hanh_dong_nguoi_dung')
      .insert([actionData]);
    
    if (error) {
      console.error('Lỗi khi lưu hành động người dùng:', error);
    }
  } catch (error) {
    console.error('Lỗi khi theo dõi hành động người dùng:', error);
  }
} 