import React from 'react';

export default function ComingSoonPlatforms() {
  const platforms = [
    {
      title: "Mobile",
      subtitle: "iOS & Android",
      icon: "📱",
      releaseDate: "Q3 2025",
      features: [
        "Đồ họa nâng cao với engine mới",
        "Điều khiển tối ưu cho màn hình cảm ứng",
        "Cross-platform với Telegram",
        "AR features độc quyền"
      ],
      color: "blue",
      gradient: "from-blue-900/40 to-blue-950/40",
      borderColor: "border-blue-800/50",
      hoverBorderColor: "group-hover:border-blue-600/70",
      tagColor: "bg-blue-800",
      iconBg: "bg-blue-800/30"
    },
    {
      title: "PC",
      subtitle: "Windows & Mac",
      icon: "💻",
      releaseDate: "Q4 2025",
      features: [
        "Đồ họa 3D chất lượng cao",
        "Hỗ trợ bàn phím và chuột",
        "Mod support",
        "Streaming integration"
      ],
      color: "purple",
      gradient: "from-purple-900/40 to-purple-950/40",
      borderColor: "border-purple-800/50",
      hoverBorderColor: "group-hover:border-purple-600/70",
      tagColor: "bg-purple-800",
      iconBg: "bg-purple-800/30"
    },
    {
      title: "Console",
      subtitle: "PS5/Xbox/Switch",
      icon: "🎮",
      releaseDate: "2026",
      features: [
        "PlayStation 5",
        "Xbox Series X/S",
        "Nintendo Switch (đang xem xét)",
        "Chơi offline"
      ],
      color: "green",
      gradient: "from-green-900/40 to-green-950/40",
      borderColor: "border-green-800/50",
      hoverBorderColor: "group-hover:border-green-600/70",
      tagColor: "bg-green-800",
      iconBg: "bg-green-800/30"
    }
  ];

  return (
    <section className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-600/20 to-gray-800/20 rounded-lg blur-xl opacity-30"></div>
      
      <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden p-6 md:p-8 border border-gray-700">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
        <div className="absolute top-0 right-0 w-40 h-1 bg-gradient-to-l from-green-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-40 h-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-40 h-1 bg-gradient-to-l from-cyan-500 to-transparent"></div>
        
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-orbitron font-bold relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-300">
              Sắp Ra Mắt Trên Các Nền Tảng Khác
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-lg mx-auto">
            M-SCI sẽ mở rộng đến nhiều nền tảng khác trong tương lai gần
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <div key={index} className={`group relative bg-gradient-to-b ${platform.gradient} rounded-xl ${platform.borderColor} ${platform.hoverBorderColor} border p-5 hover:transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${platform.iconBg} rounded-lg flex items-center justify-center text-2xl`}>
                  {platform.icon}
                </div>
                <div>
                  <div className="font-orbitron text-xl font-bold text-white flex items-center">
                    <span>{platform.title}</span>
                    <span className={`ml-2 text-xs ${platform.tagColor} text-white px-2 py-1 rounded font-normal`}>
                      {platform.releaseDate}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">{platform.subtitle}</div>
                </div>
              </div>
              
              <ul className="space-y-2 text-sm">
                {platform.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-gray-300 group-hover:text-white transition-colors duration-300">
                    <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:bg-cyan-400 transition-colors duration-300"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Decorative line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-cyan-400 group-hover:w-1/2 transition-all duration-500 ease-out"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <div className="inline-block rounded-lg px-4 py-2 text-sm text-gray-400 bg-gray-800/50 border border-gray-700">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lịch phát hành có thể thay đổi. Theo dõi kênh Telegram để cập nhật mới nhất.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
} 