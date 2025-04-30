"use client";

import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";
import Button from "@/components/Button";

export default function HeroSection() {
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
        <ThanhDieuHuongResponsive />
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
            <Button 
              href="/duong_dan/anh_hung" 
              variant="transparent"
              size="lg"
              animate="none"
              className="tracking-wider text-shadow-sm px-6 sm:px-10 py-3 button-cyber clip-hexagon hexagon-corner-flash transition-all duration-300"
            >
              PLAY NOW
            </Button>
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
              <span>Online Players: 2,457</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full pulse-animation"></span>
              <span>Release: Q4 2024</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient overlay at the bottom of hero section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--bg-dark)] to-transparent z-10"></div>
    </section>
  );
} 