import React from 'react';

export default function HeroSection() {
  return (
    <header className="pt-20 pb-12 px-4 text-center relative">
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-very-slow"></div>
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl animate-pulse-very-slow"></div>
      
      <div className="relative">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-px hexagon-border inline-block">
            <div className="bg-gray-900 p-2">
              <h1 className="cyber-glitch-sm text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 animate-text-glow py-2 tracking-wide">
                M-SCI <span className="text-white">DOWNLOAD</span>
              </h1>
            </div>
          </div>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full my-6"></div>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto font-be-vietnam-pro leading-relaxed relative z-10">
            <span className="text-shadow-neon text-cyan-300">Tham gia</span> ngay vào cuộc phiêu lưu khoa học viễn tưởng năm 2049, 
            nơi bạn sẽ chiến đấu bên cạnh <span className="text-shadow-neon text-cyan-300">Elon Musk</span> để bảo vệ nhân loại
          </p>
          
          <div className="hidden md:block absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping-slow"></div>
            <div className="absolute bottom-10 right-20 w-3 h-3 bg-purple-400 rounded-full animate-ping-slow animation-delay-1000"></div>
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping-slow animation-delay-500"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 flex justify-center">
        <div className="button-cyber relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse-subtle"></div>
          <a 
            href="#download" 
            className="button-glow relative block bg-gray-900 text-white hover:text-cyan-300 px-8 py-4 overflow-hidden transition-colors duration-300 uppercase tracking-wider font-orbitron"
          >
            Download Now
            <span className="absolute inset-0 border border-cyan-500/50"></span>
          </a>
        </div>
      </div>
    </header>
  );
} 