import React from 'react';

export default function EarlyPlayerBenefits() {
  const benefits = [
    {
      icon: "🎁",
      title: "Starter Pack",
      description: "Trị giá 1000 M-Coin",
      color: "from-amber-500 to-yellow-600",
      bgColor: "bg-yellow-900/30",
      borderColor: "border-yellow-700/30",
      textColor: "text-yellow-200"
    },
    {
      icon: "🌟",
      title: "Nhân Vật Epic",
      description: "Độc quyền \"Pioneer\"",
      color: "from-fuchsia-500 to-purple-600",
      bgColor: "bg-purple-900/30",
      borderColor: "border-purple-700/30",
      textColor: "text-purple-200"
    },
    {
      icon: "🏆",
      title: "Badge",
      description: "Người chơi Beta",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-blue-900/30",
      borderColor: "border-blue-700/30",
      textColor: "text-blue-200"
    },
    {
      icon: "💰",
      title: "Bonus 20%",
      description: "Nạp lần đầu",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-900/30",
      borderColor: "border-green-700/30",
      textColor: "text-green-200"
    },
    {
      icon: "🔄",
      title: "Chuyển Đổi",
      description: "Sang các nền tảng mới",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-red-900/30",
      borderColor: "border-red-700/30",
      textColor: "text-red-200"
    }
  ];

  return (
    <section className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-lg blur-xl opacity-30"></div>
      
      <div className="relative bg-yellow-950/50 backdrop-blur-sm rounded-xl overflow-hidden border border-yellow-700/30 p-6 md:p-8">
        {/* Light effect */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-orbitron font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
                Lợi Ích Người Chơi Sớm
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full"></div>
            <p className="mt-3 text-yellow-100">
              Tham gia M-SCI trên Telegram ngay hôm nay để nhận:
            </p>
          </div>
          
          <div className="relative">
            {/* Top decorative line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg`}></div>
                    <div className={`relative ${benefit.bgColor} p-5 rounded-lg border ${benefit.borderColor} h-full flex flex-col items-center justify-center group-hover:border-yellow-500/50 transition-colors duration-300`}>
                      <div className="text-4xl mb-3">{benefit.icon}</div>
                      <h3 className={`font-bold ${benefit.textColor} text-center mb-1 font-orbitron text-lg group-hover:text-white transition-colors duration-300`}>
                        {benefit.title}
                      </h3>
                      <p className="text-amber-100/80 text-sm text-center">{benefit.description}</p>
                      
                      {/* Bottom decorative line */}
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 bg-yellow-500/70 transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <a 
              href="https://t.me/musksci_bot/game" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full opacity-60 blur group-hover:opacity-100 transition duration-200"></div>
              <button className="relative bg-gray-900 text-white px-8 py-3 rounded-full font-orbitron flex items-center gap-2 group-hover:text-yellow-200 transition-colors duration-300">
                <span>THAM GIA NGAY</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 