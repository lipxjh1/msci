"use client";

import NavBar from "@/components/NavBar";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [playerCount, setPlayerCount] = useState(1850);
  
  useEffect(() => {
    // Thay đổi số người chơi mỗi 3 giây, với mức thay đổi nhỏ từ 30-50 người
    const interval = setInterval(() => {
      // Tạo mức thay đổi ngẫu nhiên từ 30-50
      const change = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
      
      // Xác định hướng thay đổi (tăng hoặc giảm)
      const direction = Math.random() > 0.5 ? 1 : -1;
      
      // Cập nhật số người chơi, đảm bảo nằm trong khoảng 1200-2200
      setPlayerCount(prevCount => {
        const newCount = prevCount + (change * direction);
        if (newCount < 1200) return 1200 + Math.floor(Math.random() * 50);
        if (newCount > 2200) return 2200 - Math.floor(Math.random() * 50);
        return newCount;
      });
    }, 3000); // Thay đổi sau mỗi 3 giây
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section relative overflow-hidden min-h-screen h-auto transition-all duration-300 ease-in-out">
      <div className="absolute inset-0 z-0 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-accent-dark)]/50 to-[var(--bg-dark)] z-10 transition-opacity duration-300"></div>
        <div className="relative w-full h-full overflow-hidden transition-all duration-300">
          <video
            src="https://res.cloudinary.com/dgsavskmi/video/upload/f_mp4/q_auto/home_bg_video_xknsd0.webm?_a=DATAg1AAZAA0"
            className="absolute w-[130%] h-[130%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover transition-transform duration-300"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
      
      {/* Navigation menu floating over video */}
      <div className="relative z-20 transition-all duration-300">
        <NavBar />
      </div>
      
      {/* Banner content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pb-20 pt-32 transition-all duration-300">
        <div className="text-center transition-all duration-300 transform">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow text-glitch"
              data-text="M-SCI"
              style={{ letterSpacing: '-0.025em' }}>
            M-SCI
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in transition-all duration-300">
            ACTION • COMBAT • FREEDOM
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 animate-slide-up transition-all duration-300">
            <Link 
              href="https://t.me/MSCIChannel"
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-wider text-shadow-sm px-6 sm:px-10 py-3 button-cyber clip-hexagon hexagon-corner-flash transition-all duration-300 text-white"
            >
              PLAY NOW
            </Link>
            <Button 
              href="/heroes" 
              variant="transparent"
              size="lg"
              animate="none"
              className="tracking-wider text-shadow-sm px-6 sm:px-10 py-3 button-cyber clip-hexagon hexagon-border transition-all duration-300"
            >
              MEET HEROES
            </Button>
          </div>
          <div className="mt-12 text-sm text-white/60 flex justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full pulse-animation"></span>
              <span>Online Players: {playerCount}</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full pulse-animation"></span>
              <span>Release: Q1 2025</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient overlay at the bottom of hero section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--bg-dark)] to-transparent z-10"></div>
    </section>
  );
} 