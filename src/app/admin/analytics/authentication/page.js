'use client';

import { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import { supabase } from '@/lib/supabase-client';
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

export default function AuthenticationAnalytics() {
  const [timeRange, setTimeRange] = useState('7days');
  const [loginStats, setLoginStats] = useState([]);
  const [loginEvents, setLoginEvents] = useState([]);
  const [logoutEvents, setLogoutEvents] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
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

      // Fetch login stats
      const { data: statsData, error: statsError } = await supabase.rpc('get_login_stats', { 
        start_date: formattedStartDate, 
        end_date: formattedEndDate 
      });

      if (statsError) {
        console.error('Error fetching login stats:', statsError);
      } else if (statsData) {
        setLoginStats(statsData);
      }

      // Fetch login events
      const { data: loginData, error: loginError } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('event_type', 'user_login')
        .gte('created_at', formattedStartDate)
        .lte('created_at', formattedEndDate)
        .order('created_at', { ascending: false });

      if (loginError) {
        console.error('Error fetching login events:', loginError);
      } else if (loginData) {
        setLoginEvents(loginData);
      }

      // Fetch logout events
      const { data: logoutData, error: logoutError } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('event_type', 'user_logout')
        .gte('created_at', formattedStartDate)
        .lte('created_at', formattedEndDate)
        .order('created_at', { ascending: false });

      if (logoutError) {
        console.error('Error fetching logout events:', logoutError);
      } else if (logoutData) {
        setLogoutEvents(logoutData);
      }

      // Fetch active users from auth_sessions
      const { data: activeUsersData, error: activeUsersError } = await supabase
        .from('auth_sessions')
        .select('user_id, login_time')
        .is('logout_time', null)
        .order('login_time', { ascending: false });

      if (activeUsersError) {
        console.error('Error fetching active users:', activeUsersError);
      } else if (activeUsersData) {
        setActiveUsers(activeUsersData);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [timeRange]);

  // Prepare data for charts
  const loginChartData = {
    labels: loginStats.map(day => format(new Date(day.date), 'dd/MM', { locale: vi })),
    datasets: [
      {
        label: 'Đăng nhập',
        data: loginStats.map(day => day.login_count),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Người dùng duy nhất',
        data: loginStats.map(day => day.unique_users),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  // Group login methods
  const loginMethods = loginEvents.reduce((acc, event) => {
    const method = event.metadata?.method || 'unknown';
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});

  const loginMethodsData = {
    labels: Object.keys(loginMethods),
    datasets: [
      {
        label: 'Phương thức đăng nhập',
        data: Object.values(loginMethods),
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

  // Group logout reasons
  const logoutReasons = logoutEvents.reduce((acc, event) => {
    const reason = event.metadata?.reason || 'unknown';
    acc[reason] = (acc[reason] || 0) + 1;
    return acc;
  }, {});

  const logoutReasonsData = {
    labels: Object.keys(logoutReasons),
    datasets: [
      {
        label: 'Lý do đăng xuất',
        data: Object.values(logoutReasons),
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

  // Calculate average session duration
  const avgSessionDuration = loginStats.reduce((sum, day) => sum + day.avg_session_duration, 0) / 
    (loginStats.length || 1);

  // Group devices
  const devices = [...loginEvents, ...logoutEvents].reduce((acc, event) => {
    const device = event.device_type || 'unknown';
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {});

  const devicesData = {
    labels: Object.keys(devices),
    datasets: [
      {
        label: 'Thiết bị',
        data: Object.values(devices),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Format time function
  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Thống kê Đăng nhập/Đăng xuất</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-6">
              <h3 className="text-lg mb-2">Tổng lượt đăng nhập</h3>
              <p className="text-3xl font-bold">
                {loginStats.reduce((sum, day) => sum + day.login_count, 0)}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg p-6">
              <h3 className="text-lg mb-2">Người dùng duy nhất</h3>
              <p className="text-3xl font-bold">
                {loginStats.reduce((sum, day) => sum + day.unique_users, 0)}
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg p-6">
              <h3 className="text-lg mb-2">Thời gian trung bình</h3>
              <p className="text-3xl font-bold">
                {formatDuration(avgSessionDuration)}
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-lg p-6">
              <h3 className="text-lg mb-2">Đang hoạt động</h3>
              <p className="text-3xl font-bold">{activeUsers.length}</p>
            </div>
          </div>

          {/* Biểu đồ đăng nhập theo thời gian */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Đăng nhập theo thời gian</h2>
            <div className="h-80">
              <Line 
                data={loginChartData} 
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

          {/* Biểu đồ phương thức đăng nhập và lý do đăng xuất */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Phương thức đăng nhập */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Phương thức đăng nhập</h2>
              <div className="h-64">
                <Pie 
                  data={loginMethodsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>

            {/* Lý do đăng xuất */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Lý do đăng xuất</h2>
              <div className="h-64">
                <Pie 
                  data={logoutReasonsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>

            {/* Thiết bị */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Thiết bị</h2>
              <div className="h-64">
                <Pie 
                  data={devicesData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Người dùng đang hoạt động */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Người dùng đang hoạt động ({activeUsers.length})</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID người dùng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đăng nhập lúc
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời gian đã online
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeUsers.slice(0, 10).map((user, index) => {
                    const loginTime = new Date(user.login_time);
                    const currentTime = new Date();
                    const onlineDuration = Math.floor((currentTime - loginTime) / 1000);

                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.user_id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {format(loginTime, 'dd/MM/yyyy HH:mm:ss')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDuration(onlineDuration)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {activeUsers.length > 10 && (
                <div className="mt-4 text-center text-sm text-gray-500">
                  Hiển thị 10/{activeUsers.length} người dùng đang hoạt động
                </div>
              )}
            </div>
          </div>

          {/* Lịch sử đăng nhập gần đây */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Lịch sử đăng nhập gần đây</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời gian
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID người dùng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phương thức
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thiết bị
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trình duyệt
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loginEvents.slice(0, 10).map((event, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(event.created_at), 'dd/MM/yyyy HH:mm:ss')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.user_id || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.metadata?.method || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.device_type || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.browser || 'N/A'}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {loginEvents.length > 10 && (
                <div className="mt-4 text-center text-sm text-gray-500">
                  Hiển thị 10/{loginEvents.length} lần đăng nhập gần đây
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 