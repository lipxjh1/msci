'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import Image from 'next/image';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
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
  ArcElement,
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
  gradient: string;
  bgGradient: string;
  icon: string;
  delay: number;
}

const StatCard = ({ title, value, previousValue, color, gradient, bgGradient, icon, delay }: StatCardProps) => {
  // Calculate growth percentage
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
      transition={{ duration: 0.5, delay: delay }}
      className={`bg-gradient-to-br ${bgGradient} backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-${color}/40 transition-all duration-300 group hover:shadow-lg hover:shadow-${color}/20`}
    >
      <div className="relative p-6">
        {/* Background particle effect */}
        <div className="absolute top-0 right-0 opacity-10 w-40 h-40 -translate-y-12 translate-x-12">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={`var(--${color})`} d="M49.8,-57.6C63.9,-47.1,74.6,-30.9,75.7,-14.2C76.8,2.5,68.3,19.8,58.8,37.8C49.3,55.8,38.8,74.6,23.4,79.3C7.9,83.9,-12.5,74.4,-29.9,64.5C-47.3,54.7,-61.6,44.6,-71.2,29.8C-80.8,15,-85.8,-4.4,-80.1,-20.7C-74.4,-37,-57.9,-50.3,-41.6,-60.2C-25.3,-70.1,-9.1,-76.7,5.7,-83.3C20.6,-89.9,35.7,-68.2,49.8,-57.6Z" transform="translate(100 100)" />
          </svg>
        </div>
      
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className={`p-3 rounded-lg bg-${color}/20 border border-${color}/30`}>
            <Image 
              src={icon} 
              alt={title}
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
          </div>
          
          {growth && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              parseInt(growth) > 0 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {parseInt(growth) > 0 ? '↑' : '↓'} {growth}%
            </span>
          )}
        </div>
        
        <h3 className="text-gray-400 text-sm font-medium mb-2 relative z-10">{title}</h3>
        <p className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent relative z-10`}>
          {value}
        </p>
        
        {previousValue && (
          <p className="text-gray-500 text-xs mt-2 relative z-10">
            Previous: {previousValue}
          </p>
        )}
      </div>
      <div className={`h-1 w-full bg-gradient-to-r ${gradient}`}></div>
    </motion.div>
  );
};

export default function KPIStatsSection() {
  const [activeTab, setActiveTab] = useState('users');
  const [animateChart, setAnimateChart] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2025');
  
  useEffect(() => {
    // Delay to trigger chart animation
    const timer = setTimeout(() => {
      setAnimateChart(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Rajdhani', sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: "'Orbitron', sans-serif",
          size: 14
        },
        bodyFont: {
          family: "'Rajdhani', sans-serif",
          size: 13
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderDash: [5, 5]
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Rajdhani', sans-serif"
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderDash: [5, 5]
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Rajdhani', sans-serif"
          }
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };
  
  // Data for tabs
  const chartData = {
    users: {
      labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      datasets: [
        {
          label: 'Monthly Active Users (million)',
          data: animateChart ? [0.05, 0.5, 2, 5, 15, 30, 50] : [0, 0, 0, 0, 0, 0, 0],
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderWidth: 3,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#fff',
          pointRadius: 5,
          pointHoverRadius: 8,
          fill: true,
          tension: 0.4
        }
      ]
    },
    revenue: {
      labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      datasets: [
        {
          label: 'Revenue (million USD)',
          data: animateChart ? [0.5, 8, 25, 60, 120, 220, 350] : [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: [
            'rgba(16, 185, 129, 0.7)',
            'rgba(14, 165, 233, 0.7)',
            'rgba(168, 85, 247, 0.7)',
            'rgba(249, 115, 22, 0.7)',
            'rgba(236, 72, 153, 0.7)',
            'rgba(234, 179, 8, 0.7)',
            'rgba(239, 68, 68, 0.7)'
          ],
          borderRadius: 6,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }
      ]
    },
    downloads: {
      labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      datasets: [
        {
          label: 'Total Downloads (million)',
          data: animateChart ? [0.1, 2, 10, 25, 45, 70, 100] : [0, 0, 0, 0, 0, 0, 0],
          borderColor: 'rgba(249, 115, 22, 1)',
          backgroundColor: 'rgba(249, 115, 22, 0.2)',
          borderWidth: 3,
          pointBackgroundColor: 'rgba(249, 115, 22, 1)',
          pointBorderColor: '#fff',
          pointRadius: 5,
          pointHoverRadius: 8,
          fill: true,
          tension: 0.4
        }
      ]
    },
    marketShare: {
      labels: ['M-SCI', 'Game A', 'Game B', 'Game C', 'Game D'],
      datasets: [
        {
          data: animateChart ? [30, 25, 20, 15, 10] : [0, 0, 0, 0, 0],
          backgroundColor: [
            'rgba(79, 70, 229, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(107, 114, 128, 0.8)'
          ],
          borderColor: 'rgba(22, 24, 29, 0.8)',
          borderWidth: 3,
          hoverOffset: 15
        }
      ]
    }
  };
  
  // KPI stats by year
  const kpiYears = ['2024', '2025', '2026', '2027', '2028'];
  
  const kpiStats = {
    '2024': [
      {
        title: 'Total Downloads',
        value: '100,000+',
        color: 'blue-500',
        gradient: 'from-blue-500 to-blue-600',
        bgGradient: 'from-blue-900/10 to-blue-800/5',
        icon: '/images/home/FS-img/play_g.png',
        delay: 0.1
      },
      {
        title: 'Monthly Users',
        value: '50,000+',
        color: 'green-500',
        gradient: 'from-green-500 to-green-600',
        bgGradient: 'from-green-900/10 to-green-800/5',
        icon: '/images/heroes/player_0_gameplay_shoot.png',
        delay: 0.2
      },
      {
        title: 'Revenue',
        value: '$500,000+',
        color: 'purple-500',
        gradient: 'from-purple-500 to-purple-600',
        bgGradient: 'from-purple-900/10 to-purple-800/5',
        icon: '/images/heroes/ava_chatbot.png',
        delay: 0.3
      },
      {
        title: 'Retention Rate (D1)',
        value: '45%',
        color: 'yellow-500',
        gradient: 'from-yellow-500 to-amber-500',
        bgGradient: 'from-yellow-900/10 to-amber-800/5',
        icon: '/images/heroes/idle_1.png',
        delay: 0.4
      }
    ],
    '2025': [
      {
        title: 'Total Downloads',
        value: '2M+',
        previousValue: '100,000+',
        color: 'blue-500',
        gradient: 'from-blue-500 to-cyan-400',
        bgGradient: 'from-blue-900/10 to-cyan-800/5',
        icon: '/images/home/FS-img/play_g.png',
        delay: 0.1
      },
      {
        title: 'Monthly Users',
        value: '500,000+',
        previousValue: '50,000+',
        color: 'green-500',
        gradient: 'from-green-500 to-emerald-400',
        bgGradient: 'from-green-900/10 to-emerald-800/5',
        icon: '/images/heroes/player_0_gameplay_shoot.png',
        delay: 0.2
      },
      {
        title: 'Revenue',
        value: '$8M+',
        previousValue: '$500,000+',
        color: 'purple-500',
        gradient: 'from-purple-500 to-indigo-400',
        bgGradient: 'from-purple-900/10 to-indigo-800/5',
        icon: '/images/heroes/ava_chatbot.png',
        delay: 0.3
      },
      {
        title: 'Retention Rate (D30)',
        value: '25%',
        previousValue: '10%',
        color: 'yellow-500',
        gradient: 'from-yellow-500 to-orange-400',
        bgGradient: 'from-yellow-900/10 to-orange-800/5',
        icon: '/images/heroes/idle_1.png',
        delay: 0.4
      }
    ],
    '2026': [
      {
        title: 'Total Downloads',
        value: '10M+',
        previousValue: '2M+',
        color: 'blue-500',
        gradient: 'from-blue-500 to-cyan-400',
        bgGradient: 'from-blue-900/10 to-cyan-800/5',
        icon: '/images/home/FS-img/play_g.png',
        delay: 0.1
      },
      {
        title: 'Monthly Users',
        value: '2M+',
        previousValue: '500,000+',
        color: 'green-500',
        gradient: 'from-green-500 to-emerald-400',
        bgGradient: 'from-green-900/10 to-emerald-800/5',
        icon: '/images/heroes/player_0_gameplay_shoot.png',
        delay: 0.2
      },
      {
        title: 'Revenue',
        value: '$25M+',
        previousValue: '$8M+',
        color: 'purple-500',
        gradient: 'from-purple-500 to-indigo-400',
        bgGradient: 'from-purple-900/10 to-indigo-800/5',
        icon: '/images/heroes/ava_chatbot.png',
        delay: 0.3
      },
      {
        title: 'MOBA Market Share',
        value: '15%',
        previousValue: '5%',
        color: 'pink-500',
        gradient: 'from-pink-500 to-rose-400',
        bgGradient: 'from-pink-900/10 to-rose-800/5',
        icon: '/images/badge-1.svg',
        delay: 0.4
      }
    ],
    '2027': [
      {
        title: 'Total Downloads',
        value: '25M+',
        previousValue: '10M+',
        color: 'blue-500',
        gradient: 'from-blue-500 to-cyan-400',
        bgGradient: 'from-blue-900/10 to-cyan-800/5',
        icon: '/images/home/FS-img/play_g.png',
        delay: 0.1
      },
      {
        title: 'Monthly Users',
        value: '5M+',
        previousValue: '2M+',
        color: 'green-500',
        gradient: 'from-green-500 to-emerald-400',
        bgGradient: 'from-green-900/10 to-emerald-800/5',
        icon: '/images/heroes/player_0_gameplay_shoot.png',
        delay: 0.2
      },
      {
        title: 'Revenue',
        value: '$60M+',
        previousValue: '$25M+',
        color: 'purple-500',
        gradient: 'from-purple-500 to-indigo-400',
        bgGradient: 'from-purple-900/10 to-indigo-800/5',
        icon: '/images/heroes/ava_chatbot.png',
        delay: 0.3
      },
      {
        title: 'Tournament Viewers',
        value: '2M+',
        previousValue: '500k+',
        color: 'red-500',
        gradient: 'from-red-500 to-orange-400',
        bgGradient: 'from-red-900/10 to-orange-800/5',
        icon: '/images/badge-2.svg',
        delay: 0.4
      }
    ],
    '2028': [
      {
        title: 'Total Downloads',
        value: '45M+',
        previousValue: '25M+',
        color: 'blue-500',
        gradient: 'from-blue-500 to-cyan-400',
        bgGradient: 'from-blue-900/10 to-cyan-800/5',
        icon: '/images/home/FS-img/play_g.png',
        delay: 0.1
      },
      {
        title: 'Monthly Users',
        value: '15M+',
        previousValue: '5M+',
        color: 'green-500',
        gradient: 'from-green-500 to-emerald-400',
        bgGradient: 'from-green-900/10 to-emerald-800/5',
        icon: '/images/heroes/player_0_gameplay_shoot.png',
        delay: 0.2
      },
      {
        title: 'Revenue',
        value: '$120M+',
        previousValue: '$60M+',
        color: 'purple-500',
        gradient: 'from-purple-500 to-indigo-400',
        bgGradient: 'from-purple-900/10 to-indigo-800/5',
        icon: '/images/heroes/ava_chatbot.png',
        delay: 0.3
      },
      {
        title: 'Brand Value',
        value: '$1B+',
        previousValue: '$300M+',
        color: 'emerald-500',
        gradient: 'from-emerald-500 to-teal-400',
        bgGradient: 'from-emerald-900/10 to-teal-800/5',
        icon: '/images/badge-3.svg',
        delay: 0.4
      }
    ]
  };

  return (
    <section className="relative p-6 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 shadow-xl">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
        <Image
          src="/images/grid_pattern.svg"
          alt="Background Pattern"
          fill
          className="object-cover opacity-[0.03]"
        />
      </div>
    
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold font-orbitron text-white mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            GROWTH METRICS
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-rajdhani">
          Growth forecast based on market analysis and expansion plans from 2024-2028.
          Select different years to view KPI targets for each phase.
        </p>
      </motion.div>
      
      {/* Year selector */}
      <div className="flex justify-center mb-10 flex-wrap gap-2">
        {kpiYears.map((year, index) => (
          <motion.button
            key={year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedYear === year 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {year}
          </motion.button>
        ))}
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {kpiStats[selectedYear].map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            previousValue={stat.previousValue}
            color={stat.color}
            gradient={stat.gradient}
            bgGradient={stat.bgGradient}
            icon={stat.icon}
            delay={stat.delay}
          />
        ))}
      </div>
      
      {/* Chart Tabs */}
      <div className="mb-6">
        <div className="flex justify-center space-x-2 mb-6">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'users' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Users
          </button>
          <button 
            onClick={() => setActiveTab('downloads')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'downloads' 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Downloads
          </button>
          <button 
            onClick={() => setActiveTab('revenue')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'revenue' 
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Revenue
          </button>
          <button 
            onClick={() => setActiveTab('marketShare')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'marketShare' 
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Market Share
          </button>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 md:p-6">
          <div className="h-[350px]">
            {activeTab === 'users' && (
              <Line data={chartData.users} options={chartOptions} />
            )}
            {activeTab === 'downloads' && (
              <Line data={chartData.downloads} options={chartOptions} />
            )}
            {activeTab === 'revenue' && (
              <Bar data={chartData.revenue} options={chartOptions} />
            )}
            {activeTab === 'marketShare' && (
              <div className="flex flex-col md:flex-row items-center justify-center h-full">
                <div className="w-full md:w-1/2 h-full">
                  <Doughnut 
                    data={chartData.marketShare} 
                    options={{
                      ...chartOptions,
                      cutout: '60%',
                      plugins: {
                        ...chartOptions.plugins,
                        legend: {
                          position: 'right',
                          labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                              family: "'Rajdhani', sans-serif",
                              size: 12
                            },
                            padding: 20
                          }
                        }
                      }
                    }} 
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-6 md:mt-0">
                  <h3 className="text-xl font-bold text-white mb-2">2026 Market Share Forecast</h3>
                  <p className="text-gray-400 text-center">
                    M-SCI will capture 30% of the mobile MOBA market in Southeast Asia by 2026, surpassing major competitors in the industry.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-1/4 h-1/4 bg-indigo-500/20 rounded-full filter blur-[80px] -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-1/4 h-1/4 bg-purple-500/20 rounded-full filter blur-[80px] -z-10"></div>
    </section>
  );
} 