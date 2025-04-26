"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function HeroBanner() {
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
    <div ref={bannerRef} className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden">
      {/* Hình nền với hiệu ứng parallax */}
      <div className="absolute inset-0 h-[120%] w-full" style={{ transform: `translateY(${offsetY}px)` }}>
        <Image 
          src="/images/guild/guild-hero.jpg" 
          alt="Guild Banner"
          fill
          priority
          className="object-cover object-center brightness-50"
          sizes="100vw"
        />
      </div>
      
      {/* Hiệu ứng hạt */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Image 
          src="/images/particle_overlay.png" 
          alt="Hiệu ứng hạt"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 via-transparent to-[#041019]"></div>
      
      {/* Nội dung */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <div className="relative">
          {/* Vòng sáng phía sau tiêu đề */}
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
          
          <h1 className="font-[var(--font-orbitron)] text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-blue animate-title-glow relative">
            GUILD
            <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </h1>
        </div>
        
        <p className="font-be-vietnam-pro max-w-2xl text-lg md:text-xl text-gray-200 animate-fade-in mb-8">
          HỆ THỐNG GUILD - NƠI ANH HÙNG HỘI TỤ<br />
          XÂY DỰNG ĐẾ CHẾ, CHINH PHỤC VŨ TRỤ CÙNG BANG HỘI
        </p>
        
        <div className="flex gap-4 animate-fade-in-up">
          <a href="#guild-content" className="font-be-vietnam-pro px-6 py-3 bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[var(--accent-blue-bright)]/30 transition-all duration-300">
            Khám Phá
          </a>
          <a href="/play" className="font-be-vietnam-pro px-6 py-3 bg-transparent border border-[var(--accent-blue-bright)] text-white font-bold rounded-lg hover:bg-[var(--accent-blue-bright)]/10 transition-all duration-300">
            Tham Gia Ngay
          </a>
        </div>
      </div>
      
      {/* Chỉ báo cuộn xuống */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      
      {/* Các yếu tố trang trí */}
      <div className="absolute top-1/4 left-8 w-20 h-20 rotate-45 border border-[var(--accent-blue-bright)]/30 rounded-lg opacity-50 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-8 w-16 h-16 rotate-12 border border-[var(--accent-blue-bright)]/30 rounded-lg opacity-50 animate-pulse-slow delay-300"></div>
    </div>
  );
} 