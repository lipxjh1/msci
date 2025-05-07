'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Import custom CSS cho trang token
import '../token.css';

const TokenHeader = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div className="relative h-[100vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/30 to-[#041019] z-10"></div>
      <div className="absolute inset-0 bg-[url('/images/overwatch_bg_2.jpg')] bg-cover bg-center bg-no-repeat">
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse delay-100"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse delay-200"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse delay-300"></div>
          
          {/* Token coin animation */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 token-coin animate-pulse-glow ${
            animated ? 'animate-float animate-rotate-coin' : ''
          }`}>
            <div className="relative w-full h-full">
              <Image
                src="https://via.placeholder.com/400x400.png?text=MSCI+TOKEN"
                alt="MSCI Token"
                fill
                sizes="(max-width: 768px) 12rem, 16rem"
                className="object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
        <h1 className="font-orbitron text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
          <span className="relative inline-block">
            $MSCI TOKEN
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h1>
        <p className="font-rajdhani text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in">
          CHÌA KHÓA MỞ RA TƯƠNG LAI GAMING PHI TẬP TRUNG
        </p>
        
        {/* Nút cuộn xuống */}
        <div className="animate-slide-in">
          <button 
            onClick={() => document.getElementById('token-content')?.scrollIntoView({behavior: 'smooth'})}
            className="font-rajdhani font-bold tracking-wider text-shadow-sm px-10 py-3 button-cyber clip-hexagon hexagon-border text-white"
          >
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenHeader; 