'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ReferralHeroBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-[100vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/30 to-[#041019] z-10"></div>
      <div className="absolute inset-0 bg-[url('/images/overwatch_bg_2.jpg')] bg-cover bg-center bg-no-repeat">
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse delay-100"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse delay-200"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse delay-300"></div>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
        <h1 
          className={`font-orbitron text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="relative inline-block">
            GIỚI THIỆU BẠN BÈ
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </span>
        </h1>
        <p 
          className={`font-rajdhani text-xl md:text-2xl text-purple-400 font-semibold mb-10 tracking-wide uppercase transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          CÙNG CHIẾN ĐẤU - CÙNG NHẬN THƯỞNG
        </p>
        
        {/* Thêm số liệu thống kê */}
        <div 
          className={`flex flex-wrap justify-center gap-8 mb-10 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1 animate-pulse-slow">500K+</div>
            <div className="text-sm uppercase text-purple-300">Người chơi đã tham gia</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1 animate-pulse-slow">2M+</div>
            <div className="text-sm uppercase text-purple-300">Lượt giới thiệu</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1 animate-pulse-slow">100M+</div>
            <div className="text-sm uppercase text-purple-300">Phần thưởng đã phát</div>
          </div>
        </div>
        
        {/* Nút cuộn xuống */}
        <div className={`transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button 
            onClick={() => document.getElementById('referral-content')?.scrollIntoView({behavior: 'smooth'})}
            className="font-rajdhani font-bold tracking-wider text-shadow-sm px-10 py-3 button-cyber clip-hexagon hexagon-border text-white bg-purple-500/20 border-purple-500"
          >
            Khám phá ngay
          </button>
        </div>
      </div>
    </div>
  );
} 