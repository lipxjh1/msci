"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function HeroBanner() {
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
    <div ref={bannerRef} className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 h-[120%] w-full" style={{ transform: `translateY(${offsetY}px)` }}>
        <Image 
          src="/images/abous/Black and Orange Gradient Modern Game Presentation.jpg" 
          alt="About Us Hero" 
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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <div className="relative">
          {/* Glowing circle behind title */}
          <div className="absolute inset-0 bg-[var(--accent-blue-bright)]/20 filter blur-3xl rounded-full scale-150"></div>
          
          <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-blue animate-title-glow relative">
            ABOUT US
            <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </h1>
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
} 