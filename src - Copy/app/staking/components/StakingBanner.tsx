'use client';

import { useEffect } from 'react';

export default function StakingBanner() {
  // Thêm hàm scroll cho nút khám phá
  const scrollToContent = () => {
    document.getElementById('staking-content')?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className="relative h-[100vh] overflow-hidden">
      {/* Tăng độ trong suốt của lớp nền */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 z-10"></div>
      
      {/* Lớp hình ảnh cơ bản */}
      <div className="absolute inset-0 bg-[url('/images/staking_bg.jpg')] bg-cover bg-center bg-no-repeat opacity-30 mix-blend-screen">
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50 animate-pulse delay-100"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse delay-200"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50 animate-pulse delay-300"></div>
        </div>
      </div>
      
      {/* Nội dung banner */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
        <h1 className="font-orbitron text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-gold animate-title-glow cyber-halo">
          <span className="relative inline-block">
            STAKING
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
          </span>
        </h1>
        <p className="font-rajdhani text-xl md:text-2xl text-yellow-400 font-semibold mb-10 tracking-wide uppercase animate-fade-in">
          TĂNG THU NHẬP THỤ ĐỘNG TỪ TÀI SẢN GAME
        </p>
        
        {/* Nút cuộn xuống */}
        <div className="animate-slide-up">
          <button 
            onClick={scrollToContent}
            className="font-rajdhani font-bold tracking-wider text-shadow-sm px-10 py-3 button-cyber clip-hexagon border border-yellow-500/50 text-white hover:border-yellow-500"
          >
            Tìm hiểu thêm
          </button>
        </div>
        
        {/* Thêm hiệu ứng hào quang phía sau */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl z-0 animate-pulse-slow"></div>
      </div>
    </div>
  );
} 