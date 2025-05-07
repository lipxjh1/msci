'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/tien_ich/supabase';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { vi } from 'date-fns/locale';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement,
  PointElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

// Đăng ký các thành phần Chart.js
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement,
  PointElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
);

interface ThongKe {
  tong_nguoi_dung: number;
  nguoi_dung_moi: number;
  tong_luot_truy_cap: number;
  trang_pho_bien: { url: string; count: number }[];
  thiet_bi: { device: string; count: number }[];
  nut_play_now: number;
  luot_click_mxh: {
    twitter: number;
    facebook: number;
    discord: number;
    telegram: number;
    youtube: number;
    instagram: number;
  };
  trang_mxh_truy_cap: { platform: string; count: number }[];
  bang_xep_hang_trang: { url: string; count: number }[];
  thong_ke_theo_ngay: { ngay: string; luot_truy_cap: number; luot_play_now: number; luot_mxh: number }[];
}

interface TopPagesResult {
  url: string;
  count: number;
}

interface DeviceStatsResult {
  device: string;
  count: number;
}

interface LuotTruyCapRecord {
  url?: string;
  device?: string;
  [key: string]: any;
}

export default function QuanLyThongKe() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [thongKe, setThongKe] = useState<ThongKe>({
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
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'tong_quan' | 'chi_tiet' | 'bieu_do'>('tong_quan');

  useEffect(() => {
    fetchThongKe();
  }, [timeRange]);

  const fetchThongKe = async () => {
    setIsLoading(true);
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

      const startDateStr = format(startDate, 'yyyy-MM-dd');
      const endDateStr = format(endDate, 'yyyy-MM-dd');

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

      // Lấy top 5 trang phổ biến bằng RPC
      const { data: trangPhoBienData, error: trangError } = await supabase.rpc('get_top_pages', {
        start_date: startDateStr,
        end_date: endDateStr,
        limit_count: 5
      });

      let trangPhoBien: TopPagesResult[] = [];
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
          
          trangPhoBien = Object.entries(urlCount)
            .map(([url, count]) => ({ url, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
        }
      } else if (trangPhoBienData) {
        trangPhoBien = trangPhoBienData as TopPagesResult[];
      }

      // Lấy thống kê thiết bị bằng RPC
      const { data: thietBiData, error: thietBiError } = await supabase.rpc('get_device_stats', {
        start_date: startDateStr,
        end_date: endDateStr
      });

      let thietBi: DeviceStatsResult[] = [];
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
          
          thietBi = Object.entries(deviceCount)
            .map(([device, count]) => ({ device, count }))
            .sort((a, b) => b.count - a.count);
        }
      } else if (thietBiData) {
        thietBi = thietBiData as DeviceStatsResult[];
      }

      // Lấy số lượt nhấp vào nút Play Now
      const { count: nutPlayNow } = await supabase
        .from('tuong_tac')
        .select('id', { count: 'exact', head: true })
        .eq('loai', 'play_now')
        .gte('ngay_tao', startDateStr)
        .lte('ngay_tao', endDateStr);

      // Lấy thống kê trang mạng xã hội được truy cập nhiều nhất
      const { data: mxhData } = await supabase
        .from('tuong_tac')
        .select('platform, count')
        .eq('loai', 'social_media')
        .gte('ngay_tao', startDateStr)
        .lte('ngay_tao', endDateStr);

      // Lấy lượt nhấp cho từng mạng xã hội
      const { data: mxhCountData } = await supabase
        .from('tuong_tac')
        .select('platform')
        .eq('loai', 'social_media')
        .gte('ngay_tao', startDateStr)
        .lte('ngay_tao', endDateStr);

      // Xử lý dữ liệu mạng xã hội
      const mxhCount = {
        twitter: 0,
        facebook: 0,
        discord: 0,
        telegram: 0,
        youtube: 0,
        instagram: 0
      };

      if (mxhCountData) {
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

      // Chuyển đổi dữ liệu mạng xã hội thành mảng để hiển thị trong bảng xếp hạng
      let trangMXHTruyCap: { platform: string; count: number }[] = [];
      if (mxhData) {
        trangMXHTruyCap = Object.entries(mxhCount)
          .map(([platform, count]) => ({ platform, count }))
          .sort((a, b) => b.count - a.count);
      }

      // Lấy bảng xếp hạng trang chi tiết hơn
      const { data: rankData } = await supabase.rpc('get_top_pages', {
        start_date: startDateStr,
        end_date: endDateStr,
        limit_count: 10
      });
      
      let bangXepHangTrang: { url: string; count: number }[] = [];
      if (rankData) {
        bangXepHangTrang = rankData.map((item: any) => ({
          url: item.url,
          count: parseInt(item.count, 10)
        }));
      } else {
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
          
          bangXepHangTrang = Object.entries(urlCount)
            .map(([url, count]) => ({ url, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
        }
      }

      // Lấy thống kê theo ngày trong khoảng thời gian
      const daysInterval = eachDayOfInterval({ start: startDate, end: endDate });
      
      // Mảng chứa thống kê theo ngày
      let thongKeTheoNgay: { ngay: string; luot_truy_cap: number; luot_play_now: number; luot_mxh: number }[] = [];
      
      // Lấy dữ liệu lượt truy cập theo ngày
      const { data: dataLuotTruyCapTheoNgay } = await supabase
        .from('luot_truy_cap')
        .select('ngay_tao')
        .gte('ngay_tao', startDateStr)
        .lte('ngay_tao', endDateStr);
        
      // Lấy dữ liệu lượt nhấp play now theo ngày
      const { data: dataPlayNowTheoNgay } = await supabase
        .from('tuong_tac')
        .select('ngay_tao')
        .eq('loai', 'play_now')
        .gte('ngay_tao', startDateStr)
        .lte('ngay_tao', endDateStr);
        
      // Lấy dữ liệu lượt nhấp mạng xã hội theo ngày
      const { data: dataMXHTheoNgay } = await supabase
        .from('tuong_tac')
        .select('ngay_tao')
        .eq('loai', 'social_media')
        .gte('ngay_tao', startDateStr)
        .lte('ngay_tao', endDateStr);
      
      // Xử lý dữ liệu theo từng ngày
      daysInterval.forEach(date => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const displayDateStr = format(date, 'dd/MM/yyyy');
        
        // Đếm lượt truy cập trong ngày
        const luotTruyCapTrongNgay = dataLuotTruyCapTheoNgay?.filter(item => 
          format(new Date(item.ngay_tao), 'yyyy-MM-dd') === dateStr
        ).length || 0;
        
        // Đếm lượt nhấp play now trong ngày
        const luotPlayNowTrongNgay = dataPlayNowTheoNgay?.filter(item => 
          format(new Date(item.ngay_tao), 'yyyy-MM-dd') === dateStr
        ).length || 0;
        
        // Đếm lượt nhấp mạng xã hội trong ngày
        const luotMXHTrongNgay = dataMXHTheoNgay?.filter(item => 
          format(new Date(item.ngay_tao), 'yyyy-MM-dd') === dateStr
        ).length || 0;
        
        thongKeTheoNgay.push({
          ngay: displayDateStr,
          luot_truy_cap: luotTruyCapTrongNgay,
          luot_play_now: luotPlayNowTrongNgay,
          luot_mxh: luotMXHTrongNgay
        });
      });

      setThongKe({
        tong_nguoi_dung: tongNguoiDung || 0,
        nguoi_dung_moi: nguoiDungMoi || 0,
        tong_luot_truy_cap: tongLuotTruyCap || 0,
        trang_pho_bien: trangPhoBien,
        thiet_bi: thietBi,
        nut_play_now: nutPlayNow || 0,
        luot_click_mxh: mxhCount,
        trang_mxh_truy_cap: trangMXHTruyCap,
        bang_xep_hang_trang: bangXepHangTrang,
        thong_ke_theo_ngay: thongKeTheoNgay
      });
    } catch (error) {
      console.error('Lỗi khi lấy thống kê:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Thống kê người dùng</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('24h')}
            className={`px-4 py-2 rounded ${
              timeRange === '24h' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            24 giờ
          </button>
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-4 py-2 rounded ${
              timeRange === '7d' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            7 ngày
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-4 py-2 rounded ${
              timeRange === '30d' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            30 ngày
          </button>
        </div>
      </div>

      {/* Tabs chức năng */}
      <div className="border-b border-gray-200 mb-6">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('tong_quan')}
              className={`inline-block p-4 ${
                activeTab === 'tong_quan'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Tổng quan
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('chi_tiet')}
              className={`inline-block p-4 ${
                activeTab === 'chi_tiet'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Chi tiết
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('bieu_do')}
              className={`inline-block p-4 ${
                activeTab === 'bieu_do'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Biểu đồ
            </button>
          </li>
        </ul>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Tab Tổng quan */}
          {activeTab === 'tong_quan' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-6">
                  <h3 className="text-lg mb-2">Tổng người dùng</h3>
                  <p className="text-3xl font-bold">{thongKe.tong_nguoi_dung}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg p-6">
                  <h3 className="text-lg mb-2">Người dùng mới</h3>
                  <p className="text-3xl font-bold">{thongKe.nguoi_dung_moi}</p>
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg p-6">
                  <h3 className="text-lg mb-2">Tổng lượt truy cập</h3>
                  <p className="text-3xl font-bold">{thongKe.tong_luot_truy_cap}</p>
                </div>
                <div className="bg-gradient-to-r from-amber-500 to-amber-700 text-white rounded-lg p-6">
                  <h3 className="text-lg mb-2">Lượt nhấp Play Now</h3>
                  <p className="text-3xl font-bold">{thongKe.nut_play_now}</p>
                </div>
              </div>

              {/* Thống kê tương tác */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Thống kê tương tác</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Tương tác Play Now</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">{thongKe.nut_play_now}</p>
                        <p className="text-sm text-gray-500">Tổng số lượt nhấp</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Tỷ lệ chuyển đổi: {Math.round((thongKe.nut_play_now / thongKe.tong_luot_truy_cap) * 100) || 0}%</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.round((thongKe.nut_play_now / thongKe.tong_luot_truy_cap) * 100) || 0}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Tương tác mạng xã hội</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </div>
                          <span>Twitter</span>
                        </div>
                        <span className="font-semibold">{thongKe.luot_click_mxh.twitter}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                          </div>
                          <span>Facebook</span>
                        </div>
                        <span className="font-semibold">{thongKe.luot_click_mxh.facebook}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475v19.05c-.067 1.338-1.201 2.475-2.607 2.475h-16.444c-1.406 0-2.54-1.137-2.607-2.475v-19.05c.067-1.337 1.201-2.475 2.607-2.475h16.444zm-8.222 7.25c-3.852 0-6.986 3.134-6.986 6.986s3.134 6.986 6.986 6.986 6.986-3.134 6.986-6.986-3.134-6.986-6.986-6.986zm0 4.665c1.282 0 2.332 1.048 2.332 2.321 0 1.282-1.048 2.332-2.332 2.332-1.282 0-2.321-1.05-2.321-2.332 0-1.273 1.039-2.321 2.321-2.321z" />
                            </svg>
                          </div>
                          <span>Instagram</span>
                        </div>
                        <span className="font-semibold">{thongKe.luot_click_mxh.instagram}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                          </div>
                          <span>YouTube</span>
                        </div>
                        <span className="font-semibold">{thongKe.luot_click_mxh.youtube}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Tổng tương tác</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <span>Tổng lượt truy cập</span>
                        </div>
                        <span className="font-semibold">{thongKe.tong_luot_truy_cap}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span>Nhấp Play Now</span>
                        </div>
                        <span className="font-semibold">{thongKe.nut_play_now}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                          </div>
                          <span>Tổng nhấp MXH</span>
                        </div>
                        <span className="font-semibold">
                          {Object.values(thongKe.luot_click_mxh).reduce((a, b) => a + b, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Tab Chi tiết */}
          {activeTab === 'chi_tiet' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Danh sách trang phổ biến */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Trang phổ biến nhất</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          URL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lượt truy cập
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {thongKe.trang_pho_bien.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900 truncate max-w-xs">
                              {item.url}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{item.count}</div>
                          </td>
                        </tr>
                      ))}
                      {thongKe.trang_pho_bien.length === 0 && (
                        <tr>
                          <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Thống kê thiết bị */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Thống kê thiết bị</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thiết bị
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Số lượng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tỷ lệ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {thongKe.thiet_bi.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{item.device || 'Không xác định'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{item.count}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">
                              {Math.round((item.count / thongKe.tong_luot_truy_cap) * 100) || 0}%
                            </div>
                          </td>
                        </tr>
                      ))}
                      {thongKe.thiet_bi.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bảng xếp hạng trang chi tiết */}
              <div className="bg-white rounded-lg shadow p-6 col-span-2">
                <h3 className="text-lg font-semibold mb-4">Bảng xếp hạng trang chi tiết</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thứ hạng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trang
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lượt truy cập
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tỷ lệ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {thongKe.bang_xep_hang_trang.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900 truncate max-w-xs">{item.url}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{item.count}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">
                              {Math.round((item.count / thongKe.tong_luot_truy_cap) * 100) || 0}%
                            </div>
                          </td>
                        </tr>
                      ))}
                      {thongKe.bang_xep_hang_trang.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab Biểu đồ */}
          {activeTab === 'bieu_do' && (
            <div className="grid grid-cols-1 gap-6 mb-8">
              {/* Biểu đồ tương tác theo thời gian */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Tương tác theo thời gian</h3>
                <div className="h-96">
                  <Line
                    data={{
                      labels: thongKe.thong_ke_theo_ngay.map(item => item.ngay),
                      datasets: [
                        {
                          label: 'Lượt truy cập',
                          data: thongKe.thong_ke_theo_ngay.map(item => item.luot_truy_cap),
                          borderColor: 'rgb(99, 102, 241)',
                          backgroundColor: 'rgba(99, 102, 241, 0.1)',
                          tension: 0.3,
                          fill: true
                        },
                        {
                          label: 'Nhấp Play Now',
                          data: thongKe.thong_ke_theo_ngay.map(item => item.luot_play_now),
                          borderColor: 'rgb(245, 158, 11)',
                          backgroundColor: 'rgba(245, 158, 11, 0.1)',
                          tension: 0.3
                        },
                        {
                          label: 'Nhấp mạng xã hội',
                          data: thongKe.thong_ke_theo_ngay.map(item => item.luot_mxh),
                          borderColor: 'rgb(239, 68, 68)',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          tension: 0.3
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Biểu đồ mạng xã hội */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Phân bố nhấp mạng xã hội</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-80">
                    <Doughnut
                      data={{
                        labels: Object.keys(thongKe.luot_click_mxh),
                        datasets: [
                          {
                            data: Object.values(thongKe.luot_click_mxh),
                            backgroundColor: [
                              'rgb(59, 130, 246)',
                              'rgb(37, 99, 235)',
                              'rgb(99, 102, 241)',
                              'rgb(124, 58, 237)',
                              'rgb(236, 72, 153)',
                              'rgb(239, 68, 68)'
                            ],
                            borderWidth: 1
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right'
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-md font-semibold mb-4">Thống kê mạng xã hội</h4>
                    <div className="space-y-3">
                      {Object.entries(thongKe.luot_click_mxh).map(([platform, count]) => (
                        <div key={platform} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" 
                                style={{ 
                                  backgroundColor: platform === 'twitter' ? 'rgb(59, 130, 246)' :
                                                  platform === 'facebook' ? 'rgb(37, 99, 235)' :
                                                  platform === 'discord' ? 'rgb(99, 102, 241)' :
                                                  platform === 'telegram' ? 'rgb(124, 58, 237)' :
                                                  platform === 'youtube' ? 'rgb(236, 72, 153)' :
                                                  'rgb(239, 68, 68)'
                                }}></div>
                            <span className="capitalize">{platform}</span>
                          </div>
                          <span className="font-semibold">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 