'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CreatorBanner() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  return (
    <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/overwatch_bg_2.jpg"
          alt="M-SCI Content Creators"
          fill
          sizes="100vw"
          priority
          className={`object-cover object-center transition-transform duration-1000 ${
            loaded ? 'scale-100 blur-0' : 'scale-110 blur-sm'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/30 via-[#041019]/50 to-[#041019]/90"></div>
      </div>
      
      {/* Animated overlay particles */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/particle_overlay.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-20">
        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="text-shadow-blue relative inline-block">
            CHƯƠNG TRÌNH NHÀ SÁNG TẠO NỘI DUNG
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h1>
        
        <div className={`max-w-xl mx-auto text-lg md:text-xl text-white/80 mb-8 transition-all duration-1000 delay-300 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Sáng Tạo - Kết Nối - Phát Triển Cùng M-SCI
        </div>
        
        <div className={`text-base md:text-lg text-white/70 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Chào mừng đến với Chương trình Nhà Sáng Tạo Nội Dung của M-SCI! Chúng tôi tin rằng những người sáng tạo nội dung là cầu nối quan trọng giữa game và cộng đồng. Hãy cùng chúng tôi xây dựng một cộng đồng game thủ sôi động và đam mê.
        </div>
        
        {/* Scroll indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-1000 delay-1000 ${
          loaded ? 'opacity-70' : 'opacity-0'
        }`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
} 