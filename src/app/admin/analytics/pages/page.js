'use client';

import { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import { supabase } from '@/lib/supabase-client';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend
);

export default function PageAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7days');
  const [pageStats, setPageStats] = useState([]);
  const [buttonStats, setButtonStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      let endDate = new Date();
      let startDate;

      switch (timeRange) {
        case '24hours':
          startDate = subDays(endDate, 1);
          break;
        case '7days':
          startDate = subDays(endDate, 7);
          break;
        case '30days':
          startDate = subDays(endDate, 30);
          break;
        default:
          startDate = subDays(endDate, 7);
      }

      // Format dates for API
      const formattedStartDate = format(startDate, 'yyyy-MM-dd');
      const formattedEndDate = format(endDate, 'yyyy-MM-dd');

      // Fetch page view data
      const { data: pageData, error: pageError } = await supabase
        .from('user_analytics')
        .select('page_path, count(*)')
        .eq('event_type', 'page_view')
        .gte('created_at', formattedStartDate)
        .lte('created_at', formattedEndDate)
        .group('page_path')
        .order('count', { ascending: false });

      if (pageError) {
        console.error('Error fetching page data:', pageError);
      } else if (pageData) {
        setPageStats(pageData);
      }

      // Fetch button click data
      const { data: buttonData, error: buttonError } = await supabase
        .from('user_analytics')
        .select('event_type, count(*)')
        .like('event_type', 'button_%')
        .gte('created_at', formattedStartDate)
        .lte('created_at', formattedEndDate)
        .group('event_type')
        .order('count', { ascending: false });

      if (buttonError) {
        console.error('Error fetching button data:', buttonError);
      } else if (buttonData) {
        setButtonStats(buttonData);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [timeRange]);

  // Xử lý dữ liệu biểu đồ trang
  const pageViewsData = {
    labels: pageStats.map(page => page.page_path.length > 30 
      ? page.page_path.substring(0, 30) + '...' 
      : page.page_path
    ),
    datasets: [
      {
        label: 'Lượt truy cập',
        data: pageStats.map(page => page.count),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  // Xử lý dữ liệu biểu đồ nút
  const buttonsData = {
    labels: buttonStats.map(button => {
      // Làm sạch tên event từ button_abc thành ABC
      const eventName = button.event_type.replace('button_', '');
      return eventName.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }),
    datasets: [
      {
        data: buttonStats.map(button => button.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Thống kê trang và tương tác</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('24hours')}
            className={`px-4 py-2 rounded ${timeRange === '24hours' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            24 giờ
          </button>
          <button 
            onClick={() => setTimeRange('7days')}
            className={`px-4 py-2 rounded ${timeRange === '7days' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            7 ngày
          </button>
          <button 
            onClick={() => setTimeRange('30days')}
            className={`px-4 py-2 rounded ${timeRange === '30days' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            30 ngày
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* Tổng số liệu */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
                <h3 className="text-lg text-gray-500 mb-2">Tổng lượt xem trang</h3>
                <p className="text-3xl font-bold">
                  {pageStats.reduce((sum, page) => sum + parseInt(page.count), 0)}
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
                <h3 className="text-lg text-gray-500 mb-2">Số trang đã xem</h3>
                <p className="text-3xl font-bold">{pageStats.length}</p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-6">
                <h3 className="text-lg text-gray-500 mb-2">Tổng lượt click nút</h3>
                <p className="text-3xl font-bold">
                  {buttonStats.reduce((sum, button) => sum + parseInt(button.count), 0)}
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
                <h3 className="text-lg text-gray-500 mb-2">Số nút đã click</h3>
                <p className="text-3xl font-bold">{buttonStats.length}</p>
              </div>
            </div>
          </div>

          {/* Biểu đồ lượt xem trang */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Lượt xem theo trang</h2>
            <div className="h-96">
              <Bar 
                data={pageViewsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: 'y',
                  scales: {
                    x: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Biểu đồ tương tác nút */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Phân bố click nút</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <Pie 
                  data={buttonsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Các nút được click nhiều nhất</h3>
                <div className="space-y-4">
                  {buttonStats.slice(0, 5).map((button, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2/3">
                        <div className="text-sm font-medium text-gray-700">
                          {button.event_type.replace('button_', '').split('_')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${Math.round((button.count * 100) / buttonStats[0].count)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-1/3 text-right">
                        <span className="text-sm font-semibold">{button.count} lượt</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bảng chi tiết */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bảng trang */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Chi tiết trang</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Đường dẫn
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lượt xem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tỷ lệ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pageStats.map((page, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{page.page_path}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{page.count}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">
                            {Math.round(
                              (parseInt(page.count) * 100) / 
                              pageStats.reduce((sum, p) => sum + parseInt(p.count), 0)
                            )}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bảng nút */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Chi tiết nút</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nút
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lượt click
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tỷ lệ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {buttonStats.map((button, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {button.event_type.replace('button_', '').split('_')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{button.count}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">
                            {Math.round(
                              (parseInt(button.count) * 100) / 
                              buttonStats.reduce((sum, b) => sum + parseInt(b.count), 0)
                            )}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 