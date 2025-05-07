import { format, subDays, eachDayOfInterval } from 'date-fns';
import { supabase } from '@/tien_ich/supabase';
import { ThongKe, LuotTruyCapRecord, TopPagesResult, DeviceStatsResult } from './ThongKeTypes';

// Lấy dữ liệu thống kê
export const fetchThongKe = async (timeRange: '24h' | '7d' | '30d'): Promise<ThongKe> => {
  try {
    // Tính thời gian bắt đầu dựa trên khoảng thời gian
    const endDate = new Date();
    let startDate;

    switch (timeRange) {
      case '24h':
        startDate = subDays(endDate, 1);
        break;
      case '7d':
        startDate = subDays(endDate, 7);
        break;
      case '30d':
        startDate = subDays(endDate, 30);
        break;
    }

    // Format ngày theo định dạng ISO 8601 để tránh vấn đề với múi giờ
    const startDateStr = format(startDate, "yyyy-MM-dd'T'HH:mm:ss");
    const endDateStr = format(endDate, "yyyy-MM-dd'T'HH:mm:ss");

    console.log('Thời gian truy vấn:', { startDateStr, endDateStr });

    // Lấy tổng số người dùng
    const { count: tongNguoiDung } = await supabase
      .from('nguoi_dung')
      .select('id', { count: 'exact', head: true });

    // Lấy số người dùng mới trong khoảng thời gian
    const { count: nguoiDungMoi } = await supabase
      .from('nguoi_dung')
      .select('id', { count: 'exact', head: true })
      .gte('ngay_tao', startDateStr)
      .lte('ngay_tao', endDateStr);

    // Lấy tổng lượt truy cập trong khoảng thời gian
    const { count: tongLuotTruyCap } = await supabase
      .from('luot_truy_cap')
      .select('id', { count: 'exact', head: true })
      .gte('ngay_tao', startDateStr)
      .lte('ngay_tao', endDateStr);

    // Lấy top 5 trang phổ biến
    const trangPhoBien = await fetchTopPages(startDateStr, endDateStr);
    
    // Lấy thống kê thiết bị
    const thietBi = await fetchDeviceStats(startDateStr, endDateStr);
    
    // Lấy số lượt nhấp vào nút Play Now
    const nutPlayNow = await fetchPlayNowClicks(startDateStr, endDateStr);
    
    // Lấy thống kê mạng xã hội
    const { mxhCount, trangMXHTruyCap } = await fetchSocialMediaStats(startDateStr, endDateStr);
    
    // Lấy bảng xếp hạng trang chi tiết
    const bangXepHangTrang = await fetchPageRankings(startDateStr, endDateStr);
    
    // Lấy thống kê theo ngày
    const thongKeTheoNgay = await fetchDailyStats(startDate, endDate, startDateStr, endDateStr);

    return {
      tong_nguoi_dung: tongNguoiDung || 0,
      nguoi_dung_moi: nguoiDungMoi || 0,
      tong_luot_truy_cap: tongLuotTruyCap || 0,
      trang_pho_bien: trangPhoBien,
      thiet_bi: thietBi,
      nut_play_now: nutPlayNow,
      luot_click_mxh: mxhCount,
      trang_mxh_truy_cap: trangMXHTruyCap,
      bang_xep_hang_trang: bangXepHangTrang,
      thong_ke_theo_ngay: thongKeTheoNgay
    };
  } catch (error) {
    console.error('Lỗi khi lấy thống kê:', error);
    // Trả về dữ liệu mặc định trong trường hợp lỗi
    return getDefaultThongKe();
  }
};

// Lấy dữ liệu trang phổ biến
const fetchTopPages = async (startDateStr: string, endDateStr: string): Promise<TopPagesResult[]> => {
  try {
    const { data: trangPhoBienData, error: trangError } = await supabase.rpc('get_top_pages', {
      start_date: startDateStr,
      end_date: endDateStr,
      limit_count: 5
    });

    if (trangError) {
      console.error('Lỗi khi lấy trang phổ biến:', trangError);
      
      // Thử phương pháp thay thế nếu RPC không hoạt động
      const { data: trangData } = await supabase
        .from('luot_truy_cap')
        .select('url')
        .gte('ngay_tao', startDateStr)
        .lte('ngay_tao', endDateStr);
        
      if (trangData) {
        // Đếm thủ công
        const urlCount: Record<string, number> = {};
        trangData.forEach((item: LuotTruyCapRecord) => {
          if (item.url) {
            urlCount[item.url] = (urlCount[item.url] || 0) + 1;
          }
        });
        
        return Object.entries(urlCount)
          .map(([url, count]) => ({ url, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
      }
      return [];
    }
    
    return trangPhoBienData as TopPagesResult[];
  } catch (error) {
    console.error('Lỗi khi lấy trang phổ biến:', error);
    return [];
  }
};

// Lấy thống kê thiết bị
const fetchDeviceStats = async (startDateStr: string, endDateStr: string): Promise<DeviceStatsResult[]> => {
  try {
    const { data: thietBiData, error: thietBiError } = await supabase.rpc('get_device_stats', {
      start_date: startDateStr,
      end_date: endDateStr
    });

    if (thietBiError) {
      console.error('Lỗi khi lấy thống kê thiết bị:', thietBiError);
      
      // Thử phương pháp thay thế nếu RPC không hoạt động
      const { data: deviceData } = await supabase
        .from('luot_truy_cap')
        .select('device')
        .gte('ngay_tao', startDateStr)
        .lte('ngay_tao', endDateStr);
        
      if (deviceData) {
        // Đếm thủ công
        const deviceCount: Record<string, number> = {};
        deviceData.forEach((item: LuotTruyCapRecord) => {
          const device = item.device || 'Không xác định';
          deviceCount[device] = (deviceCount[device] || 0) + 1;
        });
        
        return Object.entries(deviceCount)
          .map(([device, count]) => ({ device, count }))
          .sort((a, b) => b.count - a.count);
      }
      return [];
    }
    
    return thietBiData as DeviceStatsResult[];
  } catch (error) {
    console.error('Lỗi khi lấy thống kê thiết bị:', error);
    return [];
  }
};

// Lấy số lượt nhấp vào nút Play Now
const fetchPlayNowClicks = async (startDateStr: string, endDateStr: string): Promise<number> => {
  try {
    const { count: playNowCount, error: playNowError } = await supabase
      .from('tuong_tac')
      .select('id', { count: 'exact', head: true })
      .eq('loai', 'play_now')
      .gte('ngay_tao', startDateStr)
      .lte('ngay_tao', endDateStr);

    if (playNowError) {
      console.error('Lỗi khi lấy dữ liệu Play Now:', playNowError);
      return 0;
    }
    
    return playNowCount || 0;
  } catch (error) {
    console.error('Lỗi khi lấy số lượt nhấp Play Now:', error);
    return 0;
  }
};

// Lấy thống kê mạng xã hội
const fetchSocialMediaStats = async (startDateStr: string, endDateStr: string) => {
  try {
    // Khởi tạo các biến mặc định
    const mxhCount = {
      twitter: 0,
      facebook: 0,
      discord: 0,
      telegram: 0,
      youtube: 0,
      instagram: 0
    };
    
    // Truy vấn dữ liệu từ bảng link_clicks
    const { data: linkClicks, error: linkError } = await supabase
      .from('link_clicks')
      .select('link_name')
      .gte('timestamp', startDateStr)
      .lte('timestamp', endDateStr);
      
    if (linkError) {
      console.error('Lỗi khi lấy dữ liệu từ link_clicks:', linkError);
      
      // Thử phương pháp thay thế - truy vấn từ bảng tuong_tac
      const { data: mxhCountData, error: mxhError } = await supabase
        .from('tuong_tac')
        .select('platform')
        .eq('loai', 'social_media')
        .gte('ngay_tao', startDateStr)
        .lte('ngay_tao', endDateStr);
        
      if (mxhError) {
        console.error('Lỗi khi lấy dữ liệu mạng xã hội từ tuong_tac:', mxhError);
      } else if (mxhCountData) {
        mxhCountData.forEach((item: any) => {
          if (item.platform && 
              (item.platform === 'twitter' || 
               item.platform === 'facebook' || 
               item.platform === 'discord' || 
               item.platform === 'telegram' || 
               item.platform === 'youtube' || 
               item.platform === 'instagram')) {
            mxhCount[item.platform as keyof typeof mxhCount] += 1;
          }
        });
      }
    } else if (linkClicks) {
      // Xử lý dữ liệu từ link_clicks
      linkClicks.forEach((item: any) => {
        if (item.link_name && 
            (item.link_name === 'twitter' || 
             item.link_name === 'facebook' || 
             item.link_name === 'discord' || 
             item.link_name === 'telegram' || 
             item.link_name === 'youtube' || 
             item.link_name === 'instagram')) {
          mxhCount[item.link_name as keyof typeof mxhCount] += 1;
        }
      });
    }

    // Chuyển đổi dữ liệu mạng xã hội thành mảng để hiển thị trong bảng xếp hạng
    const trangMXHTruyCap = Object.entries(mxhCount)
      .map(([platform, count]) => ({ platform, count }))
      .sort((a, b) => b.count - a.count);
      
    return { mxhCount, trangMXHTruyCap };
  } catch (error) {
    console.error('Lỗi khi xử lý dữ liệu mạng xã hội:', error);
    // Trả về dữ liệu mặc định trong trường hợp lỗi
    return { 
      mxhCount: {
        twitter: 0,
        facebook: 0,
        discord: 0,
        telegram: 0,
        youtube: 0,
        instagram: 0
      },
      trangMXHTruyCap: []
    };
  }
};

// Lấy bảng xếp hạng trang chi tiết
const fetchPageRankings = async (startDateStr: string, endDateStr: string) => {
  try {
    const { data: rankData } = await supabase.rpc('get_top_pages', {
      start_date: startDateStr,
      end_date: endDateStr,
      limit_count: 10
    });
    
    if (rankData) {
      return rankData.map((item: any) => ({
        url: item.url,
        count: parseInt(item.count, 10)
      }));
    }
    
    // Phương pháp thay thế nếu RPC không hoạt động
    const { data: urlData } = await supabase
      .from('luot_truy_cap')
      .select('url')
      .gte('ngay_tao', startDateStr)
      .lte('ngay_tao', endDateStr)
      .not('url', 'is', null);
      
    if (urlData) {
      // Đếm thủ công
      const urlCount: Record<string, number> = {};
      urlData.forEach((item: LuotTruyCapRecord) => {
        if (item.url) {
          urlCount[item.url] = (urlCount[item.url] || 0) + 1;
        }
      });
      
      return Object.entries(urlCount)
        .map(([url, count]) => ({ url, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    }
    
    return [];
  } catch (error) {
    console.error('Lỗi khi lấy bảng xếp hạng trang:', error);
    return [];
  }
};

// Lấy thống kê theo ngày
const fetchDailyStats = async (startDate: Date, endDate: Date, startDateStr: string, endDateStr: string) => {
  try {
    const daysInterval = eachDayOfInterval({ start: startDate, end: endDate });
    
    // Lấy dữ liệu lượt truy cập theo ngày
    const { data: dataLuotTruyCapTheoNgay, error: errorLuotTruyCap } = await supabase
      .from('luot_truy_cap')
      .select('ngay_tao')
      .gte('ngay_tao', startDateStr)
      .lte('ngay_tao', endDateStr);
      
    if (errorLuotTruyCap) {
      console.error('Lỗi khi lấy dữ liệu lượt truy cập theo ngày:', errorLuotTruyCap);
    }
      
    // Lấy dữ liệu lượt nhấp play now theo ngày
    const { data: dataPlayNowTheoNgay, error: errorPlayNow } = await supabase
      .from('tuong_tac')
      .select('ngay_tao')
      .eq('loai', 'play_now')
      .gte('ngay_tao', startDateStr)
      .lte('ngay_tao', endDateStr);
      
    if (errorPlayNow) {
      console.error('Lỗi khi lấy dữ liệu Play Now theo ngày:', errorPlayNow);
    }
      
    // Lấy dữ liệu lượt nhấp mạng xã hội theo ngày
    const { data: dataMXHTheoNgay, error: errorMXH } = await supabase
      .from('tuong_tac')
      .select('ngay_tao')
      .eq('loai', 'social_media')
      .gte('ngay_tao', startDateStr)
      .lte('ngay_tao', endDateStr);
    
    if (errorMXH) {
      console.error('Lỗi khi lấy dữ liệu mạng xã hội theo ngày:', errorMXH);
    }
    
    // Lấy dữ liệu từ link_clicks
    const { data: dataLinkClicks, error: errorLinkClicks } = await supabase
      .from('link_clicks')
      .select('timestamp')
      .gte('timestamp', startDateStr)
      .lte('timestamp', endDateStr);
      
    if (errorLinkClicks) {
      console.error('Lỗi khi lấy dữ liệu link_clicks theo ngày:', errorLinkClicks);
    }
    
    // Xử lý dữ liệu theo từng ngày
    const thongKeTheoNgay = daysInterval.map(date => {
      const displayDateStr = format(date, 'dd/MM/yyyy');
      
      // Đếm lượt truy cập trong ngày
      const luotTruyCapTrongNgay = dataLuotTruyCapTheoNgay?.filter(item => {
        // So sánh ngày tháng năm, bỏ qua giờ phút giây
        const itemDate = new Date(item.ngay_tao || '');
        return (
          itemDate.getFullYear() === date.getFullYear() &&
          itemDate.getMonth() === date.getMonth() &&
          itemDate.getDate() === date.getDate()
        );
      }).length || 0;
      
      // Đếm lượt nhấp play now trong ngày
      const luotPlayNowTrongNgay = dataPlayNowTheoNgay?.filter(item => {
        // So sánh ngày tháng năm, bỏ qua giờ phút giây
        const itemDate = new Date(item.ngay_tao || '');
        return (
          itemDate.getFullYear() === date.getFullYear() &&
          itemDate.getMonth() === date.getMonth() &&
          itemDate.getDate() === date.getDate()
        );
      }).length || 0;
      
      // Đếm lượt nhấp mạng xã hội trong ngày từ tuong_tac
      const luotMXHTrongNgayTuongTac = dataMXHTheoNgay?.filter(item => {
        // So sánh ngày tháng năm, bỏ qua giờ phút giây
        const itemDate = new Date(item.ngay_tao || '');
        return (
          itemDate.getFullYear() === date.getFullYear() &&
          itemDate.getMonth() === date.getMonth() &&
          itemDate.getDate() === date.getDate()
        );
      }).length || 0;
      
      // Đếm lượt nhấp mạng xã hội trong ngày từ link_clicks
      const luotMXHTrongNgayLinkClicks = dataLinkClicks?.filter(item => {
        // So sánh ngày tháng năm, bỏ qua giờ phút giây
        const itemDate = new Date(item.timestamp || '');
        return (
          itemDate.getFullYear() === date.getFullYear() &&
          itemDate.getMonth() === date.getMonth() &&
          itemDate.getDate() === date.getDate()
        );
      }).length || 0;
      
      // Tổng hợp lượt nhấp mạng xã hội từ cả hai nguồn
      const luotMXHTongHop = luotMXHTrongNgayTuongTac + luotMXHTrongNgayLinkClicks;
      
      return {
        ngay: displayDateStr,
        luot_truy_cap: luotTruyCapTrongNgay,
        luot_play_now: luotPlayNowTrongNgay,
        luot_mxh: luotMXHTongHop
      };
    });
    
    return thongKeTheoNgay;
  } catch (error) {
    console.error('Lỗi khi xử lý thống kê theo ngày:', error);
    return [];
  }
};

// Hàm tạo dữ liệu thống kê mặc định khi có lỗi
const getDefaultThongKe = (): ThongKe => {
  return {
    tong_nguoi_dung: 0,
    nguoi_dung_moi: 0,
    tong_luot_truy_cap: 0,
    trang_pho_bien: [],
    thiet_bi: [],
    nut_play_now: 0,
    luot_click_mxh: {
      twitter: 0,
      facebook: 0,
      discord: 0,
      telegram: 0,
      youtube: 0,
      instagram: 0
    },
    trang_mxh_truy_cap: [],
    bang_xep_hang_trang: [],
    thong_ke_theo_ngay: []
  };
}; 