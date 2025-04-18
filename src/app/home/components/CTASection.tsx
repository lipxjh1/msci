"use client";

import Link from "next/link";
import { FaDiscord, FaTwitter, FaYoutube, FaInstagram, FaPlay } from "react-icons/fa";

export default function CTASection() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden cyberpunk-bg transition-all duration-300">
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
          <div className="lg:col-span-7 text-left reveal-left">
            <div className="relative inline-block mb-6">
              <h2 className="text-5xl md:text-6xl xl:text-7xl font-black text-white mb-2 leading-tight tracking-tighter glitch-text-blue relative z-10 cyberpunk-headline">
               
                <span className="text-white">M-SCI</span>
              </h2>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-30 blur-lg -z-10"></div>
            </div>
            
            <div className="relative">
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Tham gia cùng hàng triệu người chơi trên khắp thế giới trong trải nghiệm <span className="text-cyan-400 font-semibold">chiến đấu đội hình 5v5</span> với các anh hùng có khả năng độc đáo. Hoàn toàn miễn phí trên mọi nền tảng.
              </p>
            </div>
            
            {/* Nút kêu gọi hành động */}
            <div className="flex flex-wrap gap-5 mt-10">
              <Link 
                href="/download"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 cyberpunk-button"
              >
                <span className="absolute inset-0 w-full h-full cyberpunk-button-bg transition-all duration-300"></span>
                <span className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white/20 to-transparent skew-x-[30deg] transform translate-x-20 group-hover:translate-x-40 transition-all duration-700"></span>
                <span className="relative flex items-center">
                  <FaPlay className="mr-3 text-sm animate-pulse" />
                  Chơi Miễn Phí
                </span>
              </Link>
              
              <Link 
                href="/heroes"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-cyan-500/50 text-cyan-400 font-bold text-lg uppercase tracking-wider overflow-hidden transition-all duration-300 hover:text-white hover:border-cyan-400 cyberpunk-button-outline"
              >
                <span className="absolute inset-0 w-0 bg-cyan-600/20 transition-all duration-300 group-hover:w-full"></span>
                <span className="relative">Khám Phá Anh Hùng</span>
              </Link>
            </div>
            
            {/* Thống kê và thông tin */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-12">
              <div className="cyberpunk-stat">
                <div className="text-4xl font-black text-cyan-400 mb-1">40+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Anh Hùng</div>
              </div>
              
              <div className="cyberpunk-stat">
                <div className="text-4xl font-black text-cyan-400 mb-1">5M+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Người Chơi</div>
              </div>
              
              <div className="cyberpunk-stat">
                <div className="text-4xl font-black text-cyan-400 mb-1">20+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Bản Đồ</div>
              </div>
            </div>
            
            {/* Social media icons */}
            <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="text-gray-400 uppercase text-sm tracking-wider">Theo dõi chúng tôi:</div>
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
          <div className="lg:col-span-5 relative reveal-right">
            {/* Circle decoration */}
            <div className="absolute inset-0 bg-cyan-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
            
            {/* Hình ảnh Hero */}
            <div className="relative z-10 overflow-visible max-w-md mx-auto" style={{ height: "600px" }}>
              <img 
                src="/images/heroes/ui 6.png"
                alt="Hero Character"
                className="object-contain w-full h-full relative z-20"
                loading="eager"
                style={{ maxHeight: "100%" }}
              />
              
              {/* Hiệu ứng glitch trên ảnh */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent z-10"></div>
              <div className="absolute inset-0 glitch-effect opacity-20 z-10"></div>
              
              {/* Hiệu ứng viền neon */}
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/70 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/70 animate-pulse"></div>
              <div className="absolute top-0 left-0 h-full w-1 bg-cyan-500/70 animate-pulse"></div>
              <div className="absolute top-0 right-0 h-full w-1 bg-cyan-500/70 animate-pulse"></div>
              
              {/* Game Logo */}
              <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-2 backdrop-blur-sm border border-cyan-500/30">
                <h3 className="text-2xl font-black text-white">M-<span className="text-cyan-400">SCI</span></h3>
              </div>
            </div>
            
            {/* Interactive elements around the hero */}
            <div className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-sm border border-cyan-500/30 px-3 py-2 rounded-lg transform rotate-3 animate-float z-20">
              <div className="flex items-center">
                <span className="text-xs font-medium text-cyan-400 mr-2">MIỄN PHÍ</span>
                <span className="text-xs text-white font-bold">TRÊN MỌI NỀN TẢNG</span>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-600 to-blue-600 px-3 py-2 rounded-lg transform -rotate-3 animate-float animation-delay-500 z-20">
              <div className="text-white font-bold uppercase text-sm">Mới Ra Mắt</div>
            </div>
            
            {/* Thêm stats xung quanh nhân vật */}
            <div className="absolute top-1/4 -right-4 bg-black/70 px-2 py-1 rounded transform rotate-3 border-l-2 border-cyan-500">
              <div className="text-xs text-cyan-400 font-bold">DAMAGE</div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-300"></div>
                <div className="w-5 h-1 bg-gray-700"></div>
              </div>
            </div>
            
            <div className="absolute bottom-1/4 -left-4 bg-black/70 px-2 py-1 rounded transform -rotate-3 border-l-2 border-cyan-500">
              <div className="text-xs text-cyan-400 font-bold">MOBILITY</div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-500"></div>
                <div className="w-5 h-1 bg-cyan-300"></div>
              </div>
            </div>
            
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