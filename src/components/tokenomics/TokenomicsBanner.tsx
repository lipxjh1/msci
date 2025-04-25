'use client';

import Image from 'next/image';

export default function TokenomicsBanner() {
  return (
    <div className="relative h-[100vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/30 to-[#041019] z-10"></div>
      <div className="absolute inset-0 bg-[url('/images/tokenomics_bg.jpg')] bg-cover bg-center bg-no-repeat">
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse delay-100"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse delay-200"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse delay-300"></div>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
        <h1 className="font-orbitron text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
          <span className="relative inline-block">
            TOKENOMICS
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </span>
        </h1>
        <p className="font-rajdhani text-xl md:text-2xl text-[#FFD700] font-semibold mb-10 tracking-wide uppercase animate-fade-in">
          KINH TẾ TOKEN BỀN VỮNG CHO TƯƠNG LAI GAMING
        </p>
        
        {/* Nút cuộn xuống */}
        <div className="animate-slide-up">
          <button 
            onClick={() => document.getElementById('tokenomics-content')?.scrollIntoView({behavior: 'smooth'})}
            className="font-rajdhani font-bold tracking-wider text-shadow-sm px-10 py-3 button-cyber clip-hexagon hexagon-border text-white border-[#FFD700] hover:shadow-[#FFD700]/30"
          >
            KHÁM PHÁ TOKENOMICS
          </button>
        </div>
      </div>
    </div>
  );
} 