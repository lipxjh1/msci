import React from 'react';

export default function Features() {
  const features = [
    {
      title: "Campaign Mode",
      description: "100 màn chơi với cốt truyện hấp dẫn về cuộc chiến giữa nhân loại và The Ascended",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-600",
      textColor: "text-blue-300",
      darkGradient: "from-blue-900/60 to-blue-800/60",
      hoverGradient: "from-blue-800/80 to-blue-700/80"
    },
    {
      title: "PvP Arena",
      description: "Đấu trường thời gian thực với người chơi khác, thể hiện kỹ năng và nhận phần thưởng giá trị",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      gradient: "from-red-500 to-pink-600",
      textColor: "text-red-300",
      darkGradient: "from-red-900/60 to-red-800/60",
      hoverGradient: "from-red-800/80 to-red-700/80"
    },
    {
      title: "Guild System",
      description: "Tạo lập và tham gia bang hội, chiến đấu cùng đồng đội để giành chiến thắng",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: "from-purple-500 to-indigo-600",
      textColor: "text-purple-300",
      darkGradient: "from-purple-900/60 to-purple-800/60",
      hoverGradient: "from-purple-800/80 to-purple-700/80"
    },
    {
      title: "Daily Events",
      description: "Sự kiện và phần thưởng hàng ngày, giúp bạn nhận được nhiều vật phẩm quý giá",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-600",
      textColor: "text-green-300",
      darkGradient: "from-green-900/60 to-green-800/60",
      hoverGradient: "from-green-800/80 to-green-700/80"
    },
    {
      title: "Marketplace",
      description: "Mua bán vật phẩm và nhân vật, xây dựng đội hình mạnh mẽ của riêng bạn",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: "from-yellow-500 to-amber-600",
      textColor: "text-yellow-300",
      darkGradient: "from-yellow-900/60 to-yellow-800/60",
      hoverGradient: "from-yellow-800/80 to-yellow-700/80"
    },
    {
      title: "Special Events",
      description: "Các sự kiện đặc biệt với cốt truyện độc đáo và phần thưởng giới hạn",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      gradient: "from-indigo-500 to-blue-600",
      textColor: "text-indigo-300",
      darkGradient: "from-indigo-900/60 to-indigo-800/60",
      hoverGradient: "from-indigo-800/80 to-indigo-700/80"
    }
  ];

  return (
    <section className="relative">
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <div className="text-center mb-10">
          <h2 className="inline-block text-3xl md:text-4xl font-orbitron font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 cyber-glitch-sm">
            Tính Năng Chính
          </h2>
          <div className="w-16 h-1 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            Khám phá các tính năng đặc sắc của M-SCI trên Telegram
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500`}></div>
              <div className={`relative bg-gradient-to-b ${feature.darkGradient} group-hover:${feature.hoverGradient} rounded-xl border border-gray-700 p-5 h-full transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg`}>
                <div className="p-2">
                  <div className={`inline-flex items-center justify-center p-2 ${feature.textColor} rounded-lg mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${feature.textColor} mb-2 font-orbitron`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-200">
                    {feature.description}
                  </p>
                </div>
                
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-10 h-10 overflow-hidden`}>
                  <div className={`absolute top-0 right-0 transform translate-y-[-50%] translate-x-[50%] rotate-45 w-16 h-2 bg-gradient-to-r ${feature.gradient}`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://t.me/musksci_bot/game" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative inline-block cyber-halo"
          >
            <span className="relative block bg-gray-900 text-white px-8 py-3 border border-cyan-500/50 rounded hover:text-cyan-300 transition-colors duration-300">
              <span className="flex items-center space-x-2 font-orbitron">
                <span>KHÁM PHÁ NGAY</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
} 