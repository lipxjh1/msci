'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';
import type { PressSection } from '../data/pressSections';

interface PressContentProps {
  pressSections: PressSection[];
}

export default function PressContent({ pressSections }: PressContentProps) {
  // Refs cho các section để scroll đến
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Xử lý hash URL khi trang tải
  useEffect(() => {
    // Animation loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    if (typeof window !== 'undefined') {
      // Lấy hash từ URL (loại bỏ dấu # ở đầu)
      const hash = window.location.hash.replace('#', '');
      
      // Nếu hash tồn tại và trùng với một slug trong danh sách sections
      if (hash && pressSections.some(section => section.slug === hash)) {
        const element = sectionRefs.current[hash];
        if (element) {
          // Thêm độ trễ nhỏ để đảm bảo DOM đã render hoàn toàn
          setTimeout(() => {
            const yOffset = -100; // Để tính đến header fixed
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }, 100);
        }
      }
    }
    
    // Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      clearTimeout(timer);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [pressSections]);

  // Scroll đến section khi click vào navigation
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const yOffset = -100; // Để tính đến header fixed
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      // Cập nhật URL hash mà không reload page
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  // Callback để lưu ref
  const setSectionRef = (el: HTMLDivElement | null, slug: string) => {
    if (el) {
      sectionRefs.current[slug] = el;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <Image 
              src="/images/overwatch_bg_2.jpg" 
              alt="Press Kit Background" 
              fill
              sizes="100vw"
              priority
              className="object-cover object-center brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/50 via-[#041019]/50 to-[#041019]"></div>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-4 tracking-wide text-shadow-blue animate-title-glow" data-text="M-SCI PRESS KIT">
            M-SCI PRESS KIT
          </h1>
          <h2 className="text-xl md:text-2xl font-be-vietnam-pro text-white/80 mb-8">Bộ Tài Liệu Báo Chí Chính Thức</h2>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a 
              href="#" 
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg border border-cyan-500/50 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 button-cyber clip-hexagon hexagon-border"
            >
              Download Full Kit
            </a>
            <a 
              href="mailto:press@msci.game" 
              className="px-6 py-3 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all shadow-md button-cyber"
            >
              Contact Us
            </a>
          </div>
          
          {/* Quick navigation */}
          <div className="mt-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {pressSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.slug)}
                  className="px-4 py-2 text-sm md:text-base rounded-full bg-white/10 hover:bg-white/20 hover:text-cyan-300 text-white transition-all"
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Animated arrow down */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Main Content */}
      <div id="press-content" className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Curved section top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041019] -translate-y-full"></div>
        
        {/* All sections displayed one after another */}
        {pressSections.map((section, index) => (
          <div 
            key={section.id}
            ref={(el) => setSectionRef(el, section.slug)}
            id={section.slug}
            className={`mb-20 animate-on-scroll slide-up delay-${index % 5}`}
          >
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-white font-orbitron tracking-wide text-shadow-blue relative inline-block">
                {section.title}
                <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </h2>
            </div>
            
            <div className="bg-[#05121d]/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-[var(--accent-blue-bright)]/30 mb-6 shadow-lg shadow-[var(--accent-blue-bright)]/5">
              <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Join Us Footer - Inspired by Overwatch */}
      <div className="relative w-full overflow-hidden">
        {/* Battlefield Image Background */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <Image 
            src="/images/overwatch_bg_2.jpg" 
            alt="Heroes battlefield" 
            fill
            sizes="100vw"
            className="object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 to-[#041019]/90"></div>
          
          {/* Hero Characters Overlay - Optional if you have hero images */}
          <div className="absolute inset-0 z-10">
            <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-10 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide text-shadow-blue animate-title-glow">
                CHIẾN ĐẤU VÌ TƯƠNG LAI NHÂN LOẠI. GIA NHẬP M-SCI!
              </h2>
              
              <Link 
                href="/play"
                className="mt-4 mb-8 px-8 py-3 bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-lg shadow-lg hover:shadow-[#FF7D00]/50 button-cyber clip-hexagon hexagon-border"
              >
                CHƠI NGAY
              </Link>
              
              <div className="mt-8">
                <h3 className="text-gray-300 uppercase text-sm tracking-widest mb-4">THEO DÕI CHÚNG TÔI</h3>
                <div className="flex justify-center space-x-6">
                  <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                    <FaFacebookF className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                    <FaTwitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                    <FaYoutube className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                    <FaDiscord className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                    <FaTelegram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 w-16 h-16 rotate-45 border border-[var(--accent-blue-bright)]/30 rounded-lg opacity-50 animate-pulse-slow hidden md:block"></div>
      <div className="absolute bottom-1/4 right-8 w-12 h-12 rotate-12 border border-[var(--accent-blue-bright)]/30 rounded-lg opacity-50 animate-pulse-slow delay-300 hidden md:block"></div>
      
      {/* CSS Animation styles */}
      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1);
        }
        
        .animate-in {
          opacity: 1;
          transform: translateY(0) translateX(0) !important;
        }
        
        .slide-up {
          transform: translateY(50px);
        }
        
        .delay-0 {
          transition-delay: 0ms;
        }
        
        .delay-1 {
          transition-delay: 200ms;
        }
        
        .delay-2 {
          transition-delay: 400ms;
        }
        
        .delay-3 {
          transition-delay: 600ms;
        }
        
        .delay-4 {
          transition-delay: 800ms;
        }
      `}</style>
    </div>
  );
} 