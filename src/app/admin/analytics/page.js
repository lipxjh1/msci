'use client';

import { useState, useEffect } from 'react';
import { getDailyStats, getUserActions } from '@/lib/analytics-service';
import { format, subDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Bar, Line, Pie } from 'react-chartjs-2';
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

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7days');
  const [dailyStats, setDailyStats] = useState([]);
  const [userActions, setUserActions] = useState([]);
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

      // Fetch data
      const dailyData = await getDailyStats(formattedStartDate, formattedEndDate);
      const actionsData = await getUserActions(formattedStartDate, formattedEndDate);

      if (dailyData) setDailyStats(dailyData);
      if (actionsData) setUserActions(actionsData);

      setIsLoading(false);
    };

    fetchData();
  }, [timeRange]);

  // Prepare data for charts
  const usersChartData = {
    labels: dailyStats.map(day => format(new Date(day.date), 'dd/MM', { locale: vi })),
    datasets: [
      {
        label: 'Tổng lượt truy cập',
        data: dailyStats.map(day => day.total_users),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Người dùng mới',
        data: dailyStats.map(day => day.new_users),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Người dùng quay lại',
        data: dailyStats.map(day => day.returning_users),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ],
  };

  const actionsChartData = {
    labels: userActions.map(action => action.event_type),
    datasets: [
      {
        label: 'Số lượt',
        data: userActions.map(action => action.count),
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
        <h1 className="text-3xl font-bold">Thống kê người dùng</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tổng số liệu */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg text-gray-500 mb-2">Tổng lượt truy cập</h3>
              <p className="text-3xl font-bold">
                {dailyStats.reduce((sum, day) => sum + day.total_users, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg text-gray-500 mb-2">Người dùng mới</h3>
              <p className="text-3xl font-bold">
                {dailyStats.reduce((sum, day) => sum + day.new_users, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg text-gray-500 mb-2">Tỷ lệ quay lại</h3>
              <p className="text-3xl font-bold">
                {Math.round(
                  (dailyStats.reduce((sum, day) => sum + day.returning_users, 0) / 
                  dailyStats.reduce((sum, day) => sum + day.total_users, 0)) * 100 || 0
                )}%
              </p>
            </div>
          </div>

          {/* Biểu đồ người dùng theo thời gian */}
          <div className="bg-white rounded-lg shadow p-6 col-span-1 lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Người dùng theo thời gian</h2>
            <div className="h-80">
              <Line 
                data={usersChartData} 
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

          {/* Biểu đồ hành động của người dùng */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Phân bố hành động</h2>
            <div className="h-80">
              <Pie 
                data={actionsChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          {/* Bảng hành động chi tiết */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Hành động chi tiết</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loại hành động
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tỷ lệ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userActions.map((action, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{action.event_type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{action.count}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{action.percentage}%</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 