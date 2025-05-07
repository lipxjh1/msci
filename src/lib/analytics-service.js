import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase-client';

// Session ID được tạo hoặc lấy từ localStorage
let sessionId = null;

// Khởi tạo analytics service
export const initAnalytics = () => {
  // Kiểm tra xem người dùng đã có session ID chưa
  if (typeof window !== 'undefined') {
    sessionId = localStorage.getItem('session_id');
    
    // Nếu chưa có, tạo session ID mới
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('session_id', sessionId);
      
      // Ghi nhận lần đầu truy cập
      trackEvent('first_visit');
    } else {
      // Ghi nhận lần truy cập lại
      trackEvent('page_view');
    }
  }
};

// Theo dõi sự kiện người dùng
export const trackEvent = async (eventType, metadata = {}) => {
  try {
    if (!sessionId && typeof window !== 'undefined') {
      sessionId = localStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem('session_id', sessionId);
      }
    }

    const user = supabase.auth.getUser();
    const userId = user?.data?.user?.id;

    const deviceInfo = getDeviceInfo();
    const pageInfo = getPageInfo();

    const { error } = await supabase.from('user_analytics').insert({
      session_id: sessionId,
      user_id: userId || null,
      event_type: eventType,
      page_path: pageInfo.path,
      referrer: pageInfo.referrer,
      source: pageInfo.source,
      ...deviceInfo,
      ...metadata
    });

    if (error) {
      console.error('Error tracking event:', error);
    }
  } catch (err) {
    console.error('Failed to track event:', err);
  }
};

// Theo dõi hành động mạng xã hội
export const trackSocialAction = async (socialNetwork, actionType) => {
  try {
    if (!sessionId && typeof window !== 'undefined') {
      sessionId = localStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem('session_id', sessionId);
      }
    }

    const user = supabase.auth.getUser();
    const userId = user?.data?.user?.id;

    const { error } = await supabase.from('social_analytics').insert({
      session_id: sessionId,
      user_id: userId || null,
      social_network: socialNetwork,
      action_type: actionType
    });

    if (error) {
      console.error('Error tracking social action:', error);
    }
  } catch (err) {
    console.error('Failed to track social action:', err);
  }
};

// Lấy thông tin thiết bị
const getDeviceInfo = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  const userAgent = window.navigator.userAgent;
  const deviceType = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent) 
    ? 'mobile' 
    : /Tablet|iPad/i.test(userAgent) 
      ? 'tablet' 
      : 'desktop';

  // Xác định browser
  let browser = 'unknown';
  if (userAgent.indexOf('Chrome') > -1) browser = 'Chrome';
  else if (userAgent.indexOf('Safari') > -1) browser = 'Safari';
  else if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
  else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) browser = 'IE';
  else if (userAgent.indexOf('Edge') > -1) browser = 'Edge';
  
  // Xác định OS
  let os = 'unknown';
  if (userAgent.indexOf('Windows') > -1) os = 'Windows';
  else if (userAgent.indexOf('Mac') > -1) os = 'MacOS';
  else if (userAgent.indexOf('Linux') > -1) os = 'Linux';
  else if (userAgent.indexOf('Android') > -1) os = 'Android';
  else if (userAgent.indexOf('iOS') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) os = 'iOS';

  return {
    device_type: deviceType,
    browser,
    os
  };
};

// Lấy thông tin trang
const getPageInfo = () => {
  if (typeof window === 'undefined') {
    return { path: '', referrer: '', source: '' };
  }

  // Lấy đường dẫn hiện tại
  const path = window.location.pathname;
  
  // Lấy referrer
  const referrer = document.referrer;
  
  // Xác định nguồn truy cập từ URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('utm_source') || 'direct';

  return {
    path,
    referrer,
    source
  };
};

// Lấy thống kê người dùng theo ngày
export const getDailyStats = async (startDate, endDate) => {
  try {
    const { data, error } = await supabase.rpc('get_daily_users', { 
      start_date: startDate,
      end_date: endDate
    });

    if (error) {
      console.error('Error fetching daily stats:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Failed to get daily stats:', err);
    return null;
  }
};

// Lấy thống kê hành động người dùng
export const getUserActions = async (startDate, endDate) => {
  try {
    const { data, error } = await supabase.rpc('get_user_actions', { 
      start_date: startDate,
      end_date: endDate
    });

    if (error) {
      console.error('Error fetching user actions:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Failed to get user actions:', err);
    return null;
  }
};

// Lấy thống kê mạng xã hội
export const getSocialStats = async (startDate, endDate) => {
  try {
    const { data, error } = await supabase
      .from('social_analytics')
      .select('social_network, action_type, count(*)')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .group('social_network, action_type');

    if (error) {
      console.error('Error fetching social stats:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Failed to get social stats:', err);
    return null;
  }
}; 