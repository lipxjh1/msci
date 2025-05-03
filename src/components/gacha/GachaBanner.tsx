"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const GachaBanner: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (bannerRef.current) {
      const { top } = bannerRef.current.getBoundingClientRect();
      setOffsetY(-top * 0.5); // Parallax effect
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={bannerRef} className="relative h-[50vh] w-full overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 h-[120%] w-full" style={{ transform: `translateY(${offsetY}px)` }}>
        <Image 
          src="/images/banner/trangchu.jpg" 
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
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
        <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-blue animate-title-glow relative">
          GACHA
          <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
        </h1>
      </div>
    </div>
  );
};

export default GachaBanner; 