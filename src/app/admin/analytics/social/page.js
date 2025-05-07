'use client';

import { useState, useEffect } from 'react';
import { getSocialStats } from '@/lib/analytics-service';
import { format, subDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Bar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend
);

export default function SocialAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7days');
  const [socialStats, setSocialStats] = useState([]);
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
      const socialData = await getSocialStats(formattedStartDate, formattedEndDate);

      if (socialData) setSocialStats(socialData);

      setIsLoading(false);
    };

    fetchData();
  }, [timeRange]);

  // Xử lý dữ liệu cho các biểu đồ
  const socialNetworks = [...new Set(socialStats.map(item => item.social_network))];
  const networkCounts = socialNetworks.map(network => {
    return socialStats
      .filter(item => item.social_network === network)
      .reduce((sum, item) => sum + parseInt(item.count), 0);
  });

  // Chuẩn bị dữ liệu cho biểu đồ phân phối mạng xã hội
  const networkDistributionData = {
    labels: socialNetworks,
    datasets: [
      {
        data: networkCounts,
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

  // Chuẩn bị dữ liệu cho biểu đồ hành động theo mạng xã hội
  const actionsByNetworkData = {
    labels: socialNetworks,
    datasets: [
      {
        label: 'Lượt tương tác',
        data: networkCounts,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  // Nhóm các loại hành động
  const groupedActions = socialStats.reduce((acc, curr) => {
    const key = curr.action_type;
    if (!acc[key]) {
      acc[key] = parseInt(curr.count);
    } else {
      acc[key] += parseInt(curr.count);
    }
    return acc;
  }, {});

  // Chuẩn bị dữ liệu cho biểu đồ loại hành động
  const actionTypesData = {
    labels: Object.keys(groupedActions),
    datasets: [
      {
        label: 'Số lượt',
        data: Object.values(groupedActions),
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
        <h1 className="text-3xl font-bold">Thống kê mạng xã hội</h1>
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
          <div className="bg-white rounded-lg shadow p-6 col-span-1 lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-6">
                <h3 className="text-lg mb-2">Tổng lượt tương tác</h3>
                <p className="text-3xl font-bold">
                  {socialStats.reduce((sum, item) => sum + parseInt(item.count), 0)}
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg p-6">
                <h3 className="text-lg mb-2">Mạng xã hội</h3>
                <p className="text-3xl font-bold">{socialNetworks.length}</p>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg p-6">
                <h3 className="text-lg mb-2">Loại hành động</h3>
                <p className="text-3xl font-bold">{Object.keys(groupedActions).length}</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg p-6">
                <h3 className="text-lg mb-2">Trung bình/ngày</h3>
                <p className="text-3xl font-bold">
                  {Math.round(
                    socialStats.reduce((sum, item) => sum + parseInt(item.count), 0) / 
                    (timeRange === '24hours' ? 1 : timeRange === '7days' ? 7 : 30)
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Biểu đồ phân phối mạng xã hội */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Phân phối mạng xã hội</h2>
            <div className="h-80">
              <Doughnut 
                data={networkDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          {/* Biểu đồ loại hành động */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Loại hành động</h2>
            <div className="h-80">
              <Doughnut 
                data={actionTypesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          {/* Biểu đồ cột cho các mạng */}
          <div className="bg-white rounded-lg shadow p-6 col-span-1 lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Lượt tương tác theo mạng xã hội</h2>
            <div className="h-80">
              <Bar 
                data={actionsByNetworkData}
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

          {/* Bảng chi tiết */}
          <div className="bg-white rounded-lg shadow p-6 col-span-1 lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Chi tiết tương tác mạng xã hội</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mạng xã hội
                    </th>
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
                  {socialStats.map((stat, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{stat.social_network}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{stat.action_type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{stat.count}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">
                          {Math.round(
                            (parseInt(stat.count) * 100) / 
                            socialStats.reduce((sum, item) => sum + parseInt(item.count), 0)
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
      )}
    </div>
  );
} 