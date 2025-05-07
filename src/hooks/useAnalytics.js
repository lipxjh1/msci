import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initAnalytics, trackEvent, trackSocialAction } from '@/lib/analytics-service';

/**
 * Hook để theo dõi phân tích người dùng
 * @returns Các hàm để theo dõi sự kiện và hành động mạng xã hội
 */
export const useAnalytics = () => {
  const router = useRouter();

  // Khởi tạo analytics và theo dõi lượt xem trang
  useEffect(() => {
    // Khởi tạo analytics khi component mount
    initAnalytics();

    // Theo dõi chuyển trang trong Next.js
    const handleRouteChange = (url) => {
      trackEvent('page_view', { page_path: url });
    };

    // Đăng ký event listener
    router.events.on('routeChangeComplete', handleRouteChange);

    // Hủy đăng ký khi unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  /**
   * Theo dõi khi người dùng nhấn vào nút
   * @param {string} buttonName - Tên của nút
   * @param {object} metadata - Dữ liệu bổ sung (tùy chọn)
   */
  const trackButtonClick = (buttonName, metadata = {}) => {
    trackEvent(`button_${buttonName.toLowerCase().replace(/\s+/g, '_')}`, metadata);
  };

  /**
   * Theo dõi khi người dùng nhấn vào nút Play Now
   * @param {object} metadata - Dữ liệu bổ sung (tùy chọn)
   */
  const trackPlayNowClick = (metadata = {}) => {
    trackEvent('button_play_now', metadata);
  };

  /**
   * Theo dõi khi người dùng tương tác với mạng xã hội
   * @param {string} network - Tên mạng xã hội (facebook, twitter, discord, v.v.)
   * @param {string} action - Loại hành động (click, share, follow, v.v.)
   */
  const trackSocialClick = (network, action = 'click') => {
    trackSocialAction(network.toLowerCase(), action.toLowerCase());
  };

  /**
   * Theo dõi khi người dùng đăng nhập
   * @param {string} method - Phương thức đăng nhập (email, google, facebook, etc.)
   * @param {object} userData - Thông tin người dùng (tùy chọn)
   */
  const trackLogin = (method, userData = {}) => {
    // Chỉ gửi thông tin không nhạy cảm
    const safeUserData = {
      userId: userData.id || userData.userId || null,
      email_domain: userData.email ? userData.email.split('@')[1] : null,
      has_avatar: !!userData.avatar_url,
      is_first_login: !!userData.is_first_login,
      role: userData.role || userData.vai_tro || null
    };

    trackEvent('user_login', { 
      method,
      ...safeUserData
    });
  };

  /**
   * Theo dõi khi người dùng đăng ký
   * @param {string} method - Phương thức đăng ký (email, google, facebook, etc.)
   * @param {object} userData - Thông tin người dùng (tùy chọn)
   */
  const trackSignup = (method, userData = {}) => {
    // Chỉ gửi thông tin không nhạy cảm
    const safeUserData = {
      userId: userData.id || userData.userId || null,
      email_domain: userData.email ? userData.email.split('@')[1] : null,
      referrer: userData.referrer || null
    };

    trackEvent('user_signup', { 
      method,
      ...safeUserData 
    });
  };

  /**
   * Theo dõi khi người dùng đăng xuất
   * @param {string} reason - Lý do đăng xuất (manual, session_expired, security_issue, etc.)
   * @param {object} metadata - Dữ liệu bổ sung (tùy chọn)
   */
  const trackLogout = (reason = 'manual', metadata = {}) => {
    trackEvent('user_logout', { 
      reason,
      duration_seconds: metadata.duration_seconds || null,
      pages_visited: metadata.pages_visited || null,
      ...metadata
    });
  };

  /**
   * Theo dõi khi người dùng thực hiện một giao dịch hoặc mua hàng
   * @param {string} itemName - Tên mục được mua
   * @param {number} amount - Số tiền
   */
  const trackPurchase = (itemName, amount) => {
    trackEvent('purchase', { item: itemName, amount });
  };

  return {
    trackEvent,
    trackButtonClick,
    trackPlayNowClick,
    trackSocialClick,
    trackLogin,
    trackSignup,
    trackLogout,
    trackPurchase
  };
}; 