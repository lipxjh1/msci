import React from 'react';

const GachaBanner: React.FC = () => {
  return (
    <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/30 to-[#041019] z-10"></div>
      <div className="absolute inset-0 bg-[url('/images/overwatch_bg_2.jpg')] bg-cover bg-center bg-no-repeat">
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-100"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-200"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-300"></div>
          
          {/* Thêm nhiều hạt sáng hơn */}
          <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse delay-150"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse delay-175"></div>
          <div className="absolute bottom-1/2 right-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse delay-250"></div>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
        <h1 className="font-orbitron text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
          <span className="relative inline-block">
            GACHA
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h1>
        <p className="font-rajdhani text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in text-center">
          THỬ VẬN MAY CỦA BẠN VỚI HỆ THỐNG GACHA ĐỘC ĐÁO
        </p>
      </div>
    </div>
  );
};

export default GachaBanner; 