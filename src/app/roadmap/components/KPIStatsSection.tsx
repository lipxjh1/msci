'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StatCardProps {
  title: string;
  value: string;
  previousValue?: string;
  color: string;
  icon: JSX.Element;
}

const StatCard = ({ title, value, previousValue, color, icon }: StatCardProps) => {
  // Tính toán % tăng
  const calculateGrowth = () => {
    if (!previousValue) return null;
    
    const prev = parseFloat(previousValue.replace(/[^0-9.]/g, ''));
    const current = parseFloat(value.replace(/[^0-9.]/g, ''));
    
    if (isNaN(prev) || isNaN(current) || prev === 0) return null;
    
    const growth = ((current - prev) / prev) * 100;
    return growth.toFixed(0);
  };
  
  const growth = calculateGrowth();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-${color}/40 transition-all duration-300 group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}/20`}>
          {icon}
        </div>
        
        {growth && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            parseInt(growth) > 0 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {parseInt(growth) > 0 ? '+' : ''}{growth}%
          </span>
        )}
      </div>
      
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className={`text-2xl font-bold text-white group-hover:text-${color} transition-colors duration-300`}>
        {value}
      </p>
      
      {previousValue && (
        <p className="text-gray-500 text-xs mt-1">
          Trước đó: {previousValue}
        </p>
      )}
    </motion.div>
  );
};

export default function KPIStatsSection() {
  const [activeTab, setActiveTab] = useState('users');
  
  // Data cho các tab
  const chartData = {
    users: {
      labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      datasets: [
        {
          label: 'Monthly Active Users (MAU)',
          data: [0.05, 0.3, 1, 3, 10, 30, 50],
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    revenue: {
      labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      datasets: [
        {
          label: 'Revenue (Million USD)',
          data: [0.5, 5, 20, 50, 100, 200, 300],
          backgroundColor: 'rgba(16, 185, 129, 0.7)',
          borderRadius: 6
        }
      ]
    },
    downloads: {
      labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      datasets: [
        {
          label: 'Total Downloads (Million)',
          data: [0.1, 1, 5, 10, 20, 35, 50],
          borderColor: 'rgba(249, 115, 22, 1)',
          backgroundColor: 'rgba(249, 115, 22, 0.5)',
          fill: true,
          tension: 0.4
        }
      ]
    }
  };
  
  // Các chỉ số theo từng năm
  const kpiStats = [
    {
      year: '2024',
      stats: [
        {
          title: 'Downloads',
          value: '100,000+',
          color: 'blue-500',
          icon: (
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          )
        },
        {
          title: 'Monthly Active Users',
          value: '50,000+',
          color: 'green-500',
          icon: (
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )
        },
        {
          title: 'Revenue',
          value: '$500,000+',
          color: 'purple-500',
          icon: (
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        {
          title: 'User Retention (D1)',
          value: '90%',
          color: 'yellow-500',
          icon: (
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          )
        }
      ]
    },
    {
      year: '2025',
      stats: [
        {
          title: 'Downloads',
          value: '1M+',
          previousValue: '100,000+',
          color: 'blue-500',
          icon: (
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          )
        },
        {
          title: 'Monthly Active Users',
          value: '300,000+',
          previousValue: '50,000+',
          color: 'green-500',
          icon: (
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )
        },
        {
          title: 'Revenue',
          value: '$5M+',
          previousValue: '$500,000+',
          color: 'purple-500',
          icon: (
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        {
          title: 'App Store Rating',
          value: '4.5+',
          color: 'amber-500',
          icon: (
            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )
        }
      ]
    },
    {
      year: '2026',
      stats: [
        {
          title: 'Downloads',
          value: '5M+',
          previousValue: '1M+',
          color: 'blue-500',
          icon: (
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          )
        },
        {
          title: 'Monthly Active Users',
          value: '1M+',
          previousValue: '300,000+',
          color: 'green-500',
          icon: (
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )
        },
        {
          title: 'Revenue',
          value: '$20M+',
          previousValue: '$5M+',
          color: 'purple-500',
          icon: (
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        {
          title: 'Grossing Rank',
          value: 'Top 50',
          previousValue: 'Top 100',
          color: 'red-500',
          icon: (
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          )
        }
      ]
    }
  ];
  
  const [selectedYear, setSelectedYear] = useState('2024');
  
  // Lọc stats theo năm đã chọn
  const filteredStats = kpiStats.find(item => item.year === selectedYear)?.stats || [];
  
  return (
    <div className="py-16 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-3xl font-bold text-white mb-4 cyber-halo">
            <span className="relative inline-block">
              KPI THEO TỪNG NĂM
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-rajdhani">
            Chỉ số hiệu suất chính (KPI) của M-SCI được thiết lập rõ ràng và đầy tham vọng theo từng năm.
          </p>
        </div>
        
        {/* Year Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xl bg-white/10 backdrop-blur-sm">
            {kpiStats.map((year) => (
              <button
                key={year.year}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  selectedYear === year.year 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-white/10'
                }`}
                onClick={() => setSelectedYear(year.year)}
              >
                {year.year}
              </button>
            ))}
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              previousValue={stat.previousValue}
              color={stat.color}
              icon={stat.icon}
            />
          ))}
        </div>
        
        {/* Charts */}
        <div className="mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            {/* Chart Tabs */}
            <div className="flex mb-6 border-b border-gray-700">
              <button
                className={`pb-3 px-4 text-sm font-medium transition-all duration-300 ${
                  activeTab === 'users' 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('users')}
              >
                Users
              </button>
              <button
                className={`pb-3 px-4 text-sm font-medium transition-all duration-300 ${
                  activeTab === 'revenue' 
                    ? 'text-green-400 border-b-2 border-green-400' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('revenue')}
              >
                Revenue
              </button>
              <button
                className={`pb-3 px-4 text-sm font-medium transition-all duration-300 ${
                  activeTab === 'downloads' 
                    ? 'text-orange-400 border-b-2 border-orange-400' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('downloads')}
              >
                Downloads
              </button>
            </div>
            
            {/* Chart Body */}
            <div className="h-80">
              {activeTab === 'users' && (
                <Line
                  data={chartData.users}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          color: 'rgba(255, 255, 255, 0.7)'
                        }
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'rgba(255, 255, 255, 0.9)',
                        bodyColor: 'rgba(255, 255, 255, 0.9)',
                        displayColors: false,
                        callbacks: {
                          label: function(context) {
                            return `${context.parsed.y}M MAU`;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        ticks: {
                          color: 'rgba(255, 255, 255, 0.7)',
                          callback: function(value) {
                            return value + 'M';
                          }
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        }
                      },
                      x: {
                        ticks: {
                          color: 'rgba(255, 255, 255, 0.7)'
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        }
                      }
                    }
                  }}
                />
              )}
              
              {activeTab === 'revenue' && (
                <Bar
                  data={chartData.revenue}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          color: 'rgba(255, 255, 255, 0.7)'
                        }
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'rgba(255, 255, 255, 0.9)',
                        bodyColor: 'rgba(255, 255, 255, 0.9)',
                        displayColors: false,
                        callbacks: {
                          label: function(context) {
                            return `$${context.parsed.y}M revenue`;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        ticks: {
                          color: 'rgba(255, 255, 255, 0.7)',
                          callback: function(value) {
                            return '$' + value + 'M';
                          }
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        }
                      },
                      x: {
                        ticks: {
                          color: 'rgba(255, 255, 255, 0.7)'
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        }
                      }
                    }
                  }}
                />
              )}
              
              {activeTab === 'downloads' && (
                <Line
                  data={chartData.downloads}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          color: 'rgba(255, 255, 255, 0.7)'
                        }
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'rgba(255, 255, 255, 0.9)',
                        bodyColor: 'rgba(255, 255, 255, 0.9)',
                        displayColors: false,
                        callbacks: {
                          label: function(context) {
                            return `${context.parsed.y}M downloads`;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        ticks: {
                          color: 'rgba(255, 255, 255, 0.7)',
                          callback: function(value) {
                            return value + 'M';
                          }
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        }
                      },
                      x: {
                        ticks: {
                          color: 'rgba(255, 255, 255, 0.7)'
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        }
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 