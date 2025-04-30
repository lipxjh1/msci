"use client";

import Link from "next/link";
import Image from "next/image";
import { useInView } from 'react-intersection-observer';
import { FaDiscord, FaTwitter, FaYoutube, FaInstagram, FaPlay } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function CTASection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Thêm trạng thái để quản lý việc chuyển đổi nhân vật
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroImages = [
    "/images/heroin/player_0_ui_idle.png",
    "/images/heroin/ui 4.png",
    "/images/heroin/ui 5.png",
    "/images/heroin/ui 10.png",
    "/images/heroin/ui11.png",
    "/images/heroin/ui7.png",
    "/images/heroin/uiux 1.png"
  ];
  
  // Thêm hiệu ứng nhấp nháy VFX
  const [vfxActive, setVfxActive] = useState(false);

  // Sử dụng useEffect để tự động chuyển đổi giữa các nhân vật
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      // Kích hoạt hiệu ứng VFX khi chuyển đổi
      setVfxActive(true);
      setTimeout(() => setVfxActive(false), 500);
    }, 2000);

    return () => clearInterval(heroInterval);
  }, []);

  return (
    <section 
      ref={ref}
      className={`relative py-20 sm:py-32 overflow-hidden cyberpunk-bg transition-all duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Background và hiệu ứng */}
      <div className="absolute inset-0 bg-[#030b16] z-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30"></div>
        
        {/* Đường neon */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-cyan-300 to-cyan-500 opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-cyan-300 to-cyan-500 opacity-70 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Hiệu ứng ánh sáng nền */}
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-cyan-900/20 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-900/20 blur-[100px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Hiệu ứng scanline và glitch */}
      <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 glitch-overlay opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Nội dung bên trái */}
          <div className={`lg:col-span-7 text-left ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} transition-all duration-700 delay-300`}>
            <div className="relative inline-block mb-6">
              <h2 className="text-5xl md:text-6xl xl:text-7xl font-black text-white mb-2 leading-tight tracking-tighter glitch-text-blue relative z-10 cyberpunk-headline">
                <span className="text-white">M-SCI</span>
              </h2>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-30 blur-lg -z-10"></div>
            </div>
            
            <div className="relative">
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Join the M-SCI forces in the intense battle of 2049, fighting against The Assended's robot and drone army to protect humanity.<span className="text-cyan-400 font-semibold">Control a team of 3 heroes </span> with unique abilities in thrilling 30-second battles.
              </p>
            </div>
            
            {/* Nút kêu gọi hành động */}
            <div className={`flex flex-wrap gap-5 mt-10 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-700 delay-500`}>
              <Link 
                href="/download"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 cyberpunk-button"
              >
                <span className="absolute inset-0 w-full h-full cyberpunk-button-bg transition-all duration-300"></span>
                <span className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white/20 to-transparent skew-x-[30deg] transform translate-x-20 group-hover:translate-x-40 transition-all duration-700"></span>
                <span className="relative flex items-center">
                  <FaPlay className="mr-3 text-sm animate-pulse" />
                  Play For Free
                </span>
              </Link>
              
              <Link 
                href="/heroes"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-cyan-500/50 text-cyan-400 font-bold text-lg uppercase tracking-wider overflow-hidden transition-all duration-300 hover:text-white hover:border-cyan-400 cyberpunk-button-outline"
              >
                <span className="absolute inset-0 w-0 bg-cyan-600/20 transition-all duration-300 group-hover:w-full"></span>
                <span className="relative">Explore Heroes</span>
              </Link>
            </div>
            
            {/* Thống kê và thông tin */}
            <div className={`grid grid-cols-2 sm:grid-cols-3 gap-6 mt-12 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-700 delay-700`}>
              <div className="cyberpunk-stat">
                <div className="text-4xl font-black text-cyan-400 mb-1">4+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">HERO LEVELS</div>
              </div>
              
              <div className="cyberpunk-stat">
                <div className="text-4xl font-black text-cyan-400 mb-1">3</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">UNIQUE CLASSES</div>
              </div>
              
              <div className="cyberpunk-stat">
                <div className="text-4xl font-black text-cyan-400 mb-1">100+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">STAGES</div>
              </div>
            </div>
            
            {/* Social media icons */}
            <div className={`mt-12 flex flex-col sm:flex-row sm:items-center gap-4 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-700 delay-900`}>
              <div className="text-gray-400 uppercase text-sm tracking-wider">Follow us:</div>
              <div className="flex space-x-5">
                <Link href="#" className="text-cyan-500 hover:text-white transition-colors duration-300" aria-label="Twitter">
                  <FaTwitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-cyan-500 hover:text-white transition-colors duration-300" aria-label="Discord">
                  <FaDiscord className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-cyan-500 hover:text-white transition-colors duration-300" aria-label="YouTube">
                  <FaYoutube className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-cyan-500 hover:text-white transition-colors duration-300" aria-label="Instagram">
                  <FaInstagram className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Hình ảnh bên phải */}
          <div className={`lg:col-span-5 relative ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-700 delay-500`}>
            {/* Circle decoration */}
            <div className="absolute inset-0 bg-cyan-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
            
            {/* Hình ảnh Hero với hiệu ứng chuyển đổi */}
            <div className="relative z-10 overflow-visible max-w-md mx-auto" style={{ height: "600px" }}>
              <div className="relative h-full w-full">
                <Image 
                  src={heroImages[currentHeroIndex]}
                  alt="Hero Character"
                  fill
                  priority={false}
                  sizes="(max-width: 768px) 100vw, 500px"
                  className={`object-contain relative z-20 transition-all duration-500 ${vfxActive ? 'scale-105 brightness-125' : ''}`}
                  loading="lazy"
                />
                
                {/* Hiệu ứng VFX khi chuyển đổi */}
                {vfxActive && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 z-30 animate-flash"></div>
                    <div className="absolute -inset-5 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 rounded-full blur-xl z-30 animate-ping"></div>
                  </>
                )}
              </div>
              
              {/* Hiệu ứng glitch trên ảnh */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent z-10"></div>
              <div className="absolute inset-0 glitch-effect opacity-20 z-10"></div>
              
              {/* Hiệu ứng viền neon cải tiến */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/70 via-blue-500/70 to-cyan-500/70 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/70 via-blue-500/70 to-cyan-500/70 animate-pulse"></div>
              <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-cyan-500/70 via-blue-500/70 to-cyan-500/70 animate-pulse"></div>
              <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-cyan-500/70 via-blue-500/70 to-cyan-500/70 animate-pulse"></div>
              
              {/* Thêm đốm sáng tại các góc */}
              <div className="absolute top-0 left-0 w-5 h-5 bg-cyan-500 rounded-full blur-md animate-pulse"></div>
              <div className="absolute top-0 right-0 w-5 h-5 bg-blue-500 rounded-full blur-md animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-5 h-5 bg-blue-500 rounded-full blur-md animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-cyan-500 rounded-full blur-md animate-pulse"></div>
              
              {/* Chỉ số nhân vật - thêm hiệu ứng */}
              <div className="absolute top-8 right-8 px-3 py-2 bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg z-30">
                <div className="text-sm font-medium text-cyan-400 mb-1">HERO {currentHeroIndex + 1}/{heroImages.length}</div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                    style={{ width: `${(currentHeroIndex + 1) / heroImages.length * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Game Logo */}
              <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-2 backdrop-blur-sm border border-cyan-500/30">
                <h3 className="text-2xl font-black text-white">M-<span className="text-cyan-400">SCI</span></h3>
              </div>
            </div>
            
            {/* Interactive elements around the hero */}
            <div className={`absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-sm border border-cyan-500/30 px-3 py-2 rounded-lg transform rotate-3 animate-float z-20 ${inView ? 'opacity-100' : 'opacity-0'} transition-all duration-700 delay-1000`}>
              <div className="flex items-center">
                <span className="text-xs font-medium text-cyan-400 mr-2">FREE</span>
                <span className="text-xs text-white font-bold">ON ALL PLATFORMS</span>
              </div>
            </div>
            
            <div className={`absolute -top-4 -right-4 bg-gradient-to-r from-cyan-600 to-blue-600 px-3 py-2 rounded-lg transform -rotate-3 animate-float animation-delay-500 z-20 ${inView ? 'opacity-100' : 'opacity-0'} transition-all duration-700 delay-1100`}>
              <div className="text-white font-bold uppercase text-sm">Just Released</div>
            </div>
            
            {/* Thêm stats xung quanh nhân vật */}
            <div className={`absolute top-1/4 -right-4 bg-black/70 px-2 py-1 rounded transform rotate-3 border-l-2 border-cyan-500 ${inView ? 'opacity-100' : 'opacity-0'} transition-all duration-700 delay-1200`}>
              <div className="text-xs text-cyan-400 font-bold">DAMAGE</div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-300"></div>
                <div className="w-5 h-1 bg-gray-700"></div>
              </div>
            </div>
            
            <div className={`absolute bottom-1/4 -left-4 bg-black/70 px-2 py-1 rounded transform -rotate-3 border-l-2 border-cyan-500 ${inView ? 'opacity-100' : 'opacity-0'} transition-all duration-700 delay-1300`}>
              <div className="text-xs text-cyan-400 font-bold">MOBILITY</div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-300"></div>
              </div>
            </div>
            
            {/* Thêm hào quang xung quanh nhân vật */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse"></div>
            
            {/* Thêm vòng tròn trang trí */}
            <div className="absolute -z-10 w-32 h-32 rounded-full border border-cyan-500/20 top-10 -right-16"></div>
            <div className="absolute -z-10 w-20 h-20 rounded-full border border-cyan-500/30 bottom-10 -left-10"></div>
            
            {/* Thêm line kết nối */}
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent top-1/3 -right-24 transform -rotate-45"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent bottom-1/3 -left-24 transform rotate-45"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 