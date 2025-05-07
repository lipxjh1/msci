'use client';

export default function TokenMetrics() {
  // Định nghĩa các KPI và thông số theo dõi
  const kpiMetrics = [
    {
      name: 'Circulating Supply',
      target: 'Kiểm soát lạm phát <10%/năm',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: 'Token Velocity',
      target: 'Duy trì >2.0',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      name: 'Holder Growth',
      target: '20% MoM trong năm đầu',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      name: 'Staking Ratio',
      target: '>40% tổng cung',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    },
    {
      name: 'Daily Active Wallets',
      target: '100,000+ vào cuối 2024',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    }
  ];

  // Các thông số real-time
  const realTimeMetrics = [
    {
      name: 'Token Price & Volume',
      description: 'Theo dõi biến động giá và khối lượng giao dịch theo thời gian thực',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500',
      valueStyle: 'text-blue-500'
    },
    {
      name: 'Holder Distribution',
      description: 'Phân bổ token giữa các nhóm người nắm giữ khác nhau',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500',
      valueStyle: 'text-purple-500'
    },
    {
      name: 'Transaction Count',
      description: 'Số lượng giao dịch token mỗi ngày trong và ngoài game',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500',
      valueStyle: 'text-green-500'
    },
    {
      name: 'Burn Rate',
      description: 'Tốc độ đốt token và ảnh hưởng đến lạm phát',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500',
      valueStyle: 'text-red-500'
    },
    {
      name: 'Staking APY',
      description: 'Lãi suất hàng năm cho việc staking token',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500',
      valueStyle: 'text-yellow-500'
    }
  ];

  return (
    <section className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl card-neon">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            METRICS & KPIs
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      {/* KPI Goals */}
      <div className="mb-10">
        <h3 className="font-rajdhani text-2xl font-bold text-[#FFD700] mb-6 text-center">Mục Tiêu Chính</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpiMetrics.map((metric, index) => (
            <div 
              key={index} 
              className="backdrop-blur-md bg-white/5 p-5 rounded-xl border border-white/10 shadow-xl card-neon transition-all hover:bg-white/10 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-[#FFD700]/10 flex items-center justify-center mb-3 group-hover:bg-[#FFD700]/20 transition-colors">
                  <div className="text-[#FFD700]">
                    {metric.icon}
                  </div>
                </div>
                <h4 className="font-medium text-white text-lg mb-2">{metric.name}</h4>
                <p className="text-[#FFD700] text-sm font-medium">{metric.target}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Dashboard Preview */}
      <div className="mb-10">
        <h3 className="font-rajdhani text-2xl font-bold text-[#FFD700] mb-6 text-center">Token Analytics Dashboard</h3>
        
        <div className="border border-white/10 rounded-xl overflow-hidden backdrop-blur-md bg-black/30 shadow-xl">
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-[#041019] to-[#0D2538] p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FFD700]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-medium text-white">M-SCI Token Metrics</h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">Last updated: Live</span>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {realTimeMetrics.map((metric, index) => (
                <div 
                  key={index} 
                  className={`${metric.bgColor} p-3 rounded-lg ${metric.borderColor} border overflow-hidden relative`}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 17V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 7H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="mb-2 font-medium text-white text-sm">{metric.name}</div>
                  <div className={`${metric.valueStyle} text-xl font-bold`}>
                    {index === 0 && '$0.087'}
                    {index === 1 && '16,742'}
                    {index === 2 && '45,632'}
                    {index === 3 && '2.7%'}
                    {index === 4 && '18.5%'}
                  </div>
                  <div className="text-white/60 text-xs mt-1">{metric.description}</div>
                </div>
              ))}
            </div>
            
            {/* Charts Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price Chart */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="mb-3 font-medium text-white">Token Price (30d)</div>
                <div className="h-40 relative">
                  {/* Mockup chart - replace with real chart in production */}
                  <div className="absolute inset-0">
                    <svg viewBox="0 0 200 80" className="w-full h-full">
                      <defs>
                        <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#4299E1" stopOpacity="0.5"/>
                          <stop offset="100%" stopColor="#4299E1" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path d="M0,80 L0,70 C5,65 10,55 15,50 C20,45 25,40 30,45 C35,50 40,60 45,65 C50,70 55,65 60,60 C65,55 70,45 75,40 C80,35 85,30 90,25 C95,20 100,15 105,20 C110,25 115,35 120,30 C125,25 130,20 135,15 C140,10 145,5 150,10 C155,15 160,25 165,30 C170,35 175,40 180,35 C185,30 190,25 195,20 L200,15 L200,80 Z" fill="url(#priceGradient)" />
                      <path d="M0,70 C5,65 10,55 15,50 C20,45 25,40 30,45 C35,50 40,60 45,65 C50,70 55,65 60,60 C65,55 70,45 75,40 C80,35 85,30 90,25 C95,20 100,15 105,20 C110,25 115,35 120,30 C125,25 130,20 135,15 C140,10 145,5 150,10 C155,15 160,25 165,30 C170,35 175,40 180,35 C185,30 190,25 195,20 L200,15" fill="none" stroke="#4299E1" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-white/40 text-xs">
                    <span>1 Jul</span>
                    <span>15 Jul</span>
                    <span>31 Jul</span>
                  </div>
                </div>
              </div>
              
              {/* Volume Chart */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="mb-3 font-medium text-white">Trading Volume (30d)</div>
                <div className="h-40 relative">
                  {/* Mockup chart - replace with real chart in production */}
                  <div className="absolute inset-0">
                    <svg viewBox="0 0 200 80" className="w-full h-full">
                      <rect x="5" y="60" width="10" height="20" rx="2" fill="#805AD5" opacity="0.5" />
                      <rect x="20" y="50" width="10" height="30" rx="2" fill="#805AD5" opacity="0.5" />
                      <rect x="35" y="40" width="10" height="40" rx="2" fill="#805AD5" opacity="0.5" />
                      <rect x="50" y="55" width="10" height="25" rx="2" fill="#805AD5" opacity="0.5" />
                      <rect x="65" y="30" width="10" height="50" rx="2" fill="#805AD5" opacity="0.8" />
                      <rect x="80" y="45" width="10" height="35" rx="2" fill="#805AD5" opacity="0.5" />
                      <rect x="95" y="40" width="10" height="40" rx="2" fill="#805AD5" opacity="0.5" />
                      <rect x="110" y="20" width="10" height="60" rx="2" fill="#805AD5" opacity="0.8" />
                      <rect x="125" y="35" width="10" height="45" rx="2" fill="#805AD5" opacity="0.5" />
                      <rect x="140" y="45" width="10" height="35" rx="2" fill="#805AD5" opacity="0.5" />
                      <rect x="155" y="50" width="10" height="30" rx="2" fill="#805AD5" opacity="0.5" />
                      <rect x="170" y="25" width="10" height="55" rx="2" fill="#805AD5" opacity="0.8" />
                      <rect x="185" y="40" width="10" height="40" rx="2" fill="#805AD5" opacity="0.5" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-white/40 text-xs">
                    <span>1 Jul</span>
                    <span>15 Jul</span>
                    <span>31 Jul</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-white/70 text-sm max-w-2xl mx-auto">
          Chúng tôi cam kết tính minh bạch cao nhất trong việc theo dõi và báo cáo các thông số token. 
          Dashboard phân tích sẽ được công khai cho tất cả người dùng sau khi TGE.
        </p>
      </div>
    </section>
  );
} 