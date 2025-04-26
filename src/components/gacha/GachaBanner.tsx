"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const GachaBanner: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (bannerRef.current) {
      const { top } = bannerRef.current.getBoundingClientRect();
      setOffsetY(-top * 0.5); // Hiệu ứng parallax
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={bannerRef} className="relative h-[45vh] lg:h-[60vh] w-full overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 h-[120%] w-full" style={{ transform: `translateY(${offsetY}px)` }}>
        <Image 
          src="/images/overwatch_bg_2.jpg" 
          alt="Gacha Hero" 
          fill
          priority
          className="object-cover object-center brightness-50"
          sizes="100vw"
        />
      </div>
      
      {/* Particle overlay */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Image 
          src="/images/particle_overlay.png" 
          alt="Particle effect"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 via-transparent to-[#041019]"></div>
      
      {/* Additional animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse delay-100"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse delay-200"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse delay-300"></div>
        <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-green-400 rounded-full shadow-lg shadow-green-400/50 animate-pulse delay-150"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50 animate-pulse delay-175"></div>
        <div className="absolute bottom-1/2 right-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse delay-250"></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
        <div className="relative">
          {/* Glowing circle behind title */}
          <div className="absolute inset-0 bg-[var(--accent-blue-bright)]/20 filter blur-3xl rounded-full scale-150"></div>
          
          {/* Logo */}
          <div className="mb-6 relative animate-float">
            <Image 
              src="/images/overwatch_logo.png" 
              alt="M-SCI Logo"
              width={180}
              height={60}
              className="mx-auto"
            />
          </div>
          
          <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-blue animate-title-glow relative">
            GACHA
            <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </h1>
        </div>
        
        <p className="max-w-2xl text-lg md:text-xl text-gray-200 animate-fade-in mb-8">
          THỬ VẬN MAY CỦA BẠN VỚI HỆ THỐNG GACHA ĐỘC ĐÁO
        </p>
        
        <div className="flex gap-4 animate-fade-in-up">
          <a href="#gacha-content" className="px-6 py-3 bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[var(--accent-blue-bright)]/30 transition-all duration-300">
            Bắt Đầu Quay
          </a>
          <a href="/about-us" className="px-6 py-3 bg-transparent border border-[var(--accent-blue-bright)] text-white font-bold rounded-lg hover:bg-[var(--accent-blue-bright)]/10 transition-all duration-300">
            Tìm Hiểu Thêm
          </a>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 w-20 h-20 rotate-45 border border-[var(--accent-blue-bright)]/30 rounded-lg opacity-50 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-8 w-16 h-16 rotate-12 border border-[var(--accent-blue-bright)]/30 rounded-lg opacity-50 animate-pulse-slow delay-300"></div>
    </div>
  );
};

export default GachaBanner; 