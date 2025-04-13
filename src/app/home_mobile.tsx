"use client";

import Image from "next/image";
import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";
import Button from "@/components/Button";
import { useState, useEffect, useRef } from "react";

export default function HomeMobile() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  
  // Tự động chuyển slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(current => (current + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle scroll behavior for mobile nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsNavVisible(false);
      } else {
        // Scrolling up
        setIsNavVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const slides = [
    {
      id: 1,
      image: "/images/free.jpg",
      title: "MIỄN PHÍ",
      badge: "MIỄN PHÍ",
      badgeColor: "var(--accent-blue-bright)",
      description: "Game miễn phí, liên tục phát triển. Tập hợp bạn bè và tham gia trải nghiệm PvP mới."
    },
    {
      id: 2,
      image: "/images/new.jpg",
      title: "ANH HÙNG MỚI",
      badge: "MỚI",
      badgeColor: "var(--vaiTroDamage)",
      description: "Chọn từ đa dạng các anh hùng với nhiều vai trò và phong cách chơi khác nhau."
    },
    {
      id: 3,
      image: "/images/like.jpg",
      title: "HÀNH ĐỘNG ĐỈNH CAO",
      badge: "ACTION",
      badgeColor: "var(--vaiTroSupport)",
      description: "Trận chiến gay cấn, dàn anh hùng mới, nhiều bản đồ và trải nghiệm 5v5 cực đã."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-dark)] to-[var(--bg-darker)]">
      {/* Navigation Bar - Mobile Version */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0c2341]/90 to-[#071323]/90 backdrop-blur-md border-b border-white/10 transition-transform duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="px-4 h-16 flex items-center justify-between">
          {/* Logo - Mobile */}
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Overwatch Logo"
              width={32}
              height={32}
              className="hover:scale-110 transition-transform duration-300"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-[#42abff] to-[#42abff]/80 bg-clip-text text-transparent">
              OW
            </span>
          </div>

          {/* Play Button - Mobile */}
          <button className="px-4 py-1.5 bg-gradient-to-r from-[#42abff] to-[#42abff]/80 rounded-full text-white text-sm font-bold hover:shadow-[0_0_20px_rgba(66,171,255,0.5)] hover:scale-105 transition-all duration-300 flex items-center space-x-1">
            <span>Chơi</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section cho Mobile */}
      <section className="relative overflow-hidden h-screen pb-16">
        {/* Background image thay cho video trên mobile */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/overwatch_bg_2.jpg"
            alt="Overwatch Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[var(--bg-accent-dark)]/50 to-[var(--bg-dark)] z-10"></div>
        </div>
        
        {/* Menu điều hướng nổi */}
        <div className="relative z-20">
          <ThanhDieuHuongResponsive />
        </div>
        
        {/* Nội dung banner cho mobile - tối ưu hóa với các phần tử lớn hơn và dễ tương tác */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-5 pb-24 mt-12">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow"
                style={{ letterSpacing: '-0.025em' }}>
              Overwatch
            </h1>
            <p className="text-lg text-[var(--accent-blue-bright)] font-semibold mb-8 tracking-wide uppercase animate-fade-in">
              Hành Động • Chiến Đấu • Tự Do
            </p>
            <div className="flex flex-col gap-4 animate-slide-up w-full">
              <Button 
                href="/duong_dan/anh_hung" 
                variant="transparent"
                size="lg"
                animate="none"
                className="w-full py-4 text-lg tracking-wider text-shadow-sm button-cyber"
              >
                Chơi Ngay
              </Button>
              <Button 
                href="/heroes" 
                variant="transparent"
                size="lg"
                animate="none"
                className="w-full py-4 text-lg tracking-wider text-shadow-sm button-cyber"
              >
                Xem Anh Hùng
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Section - Mobile Optimized with Auto Slider */}
      <section className="py-16 px-5 bg-gradient-to-b from-[#0d2e4b] to-[#071a2e] text-white relative overflow-hidden">
        {/* Hiệu ứng nền */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[var(--bg-dark)] to-transparent"></div>
          <div className="absolute -right-20 top-1/4 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl"></div>
          <div className="absolute -left-20 bottom-1/4 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white mb-5 relative cyber-halo">
              <span className="text-shadow-blue relative inline-block">
                GAME OF THE YEAR
                <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
            <div className="h-1 w-20 bg-[var(--accent-blue-bright)]/70 mx-auto mb-6"></div>
            <p className="text-base text-white/80 leading-relaxed">
              Overwatch 2 là game hành động đội nhóm miễn phí 5v5 với hơn 30 anh hùng độc đáo.
            </p>
          </div>
          
          {/* Auto Sliding Cards */}
          <div className="relative overflow-hidden rounded-xl h-[380px] mb-4">
            <div 
              className="absolute inset-0 transition-transform duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div 
                  key={slide.id} 
                  className="w-full h-full flex-shrink-0"
                >
                  <div className="w-full h-full bg-gradient-to-b from-[#0a2544] to-[#061529] rounded-xl overflow-hidden shadow-lg shadow-black/30 border border-white/10 hover:border-[var(--accent-blue-bright)]/30 hover:shadow-[var(--accent-blue-bright)]/5 transition-all">
                    <div className="relative h-48 w-full">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div 
                        className="absolute bottom-3 left-3 text-white font-bold py-1 px-3 rounded-full text-sm backdrop-blur-sm"
                        style={{ backgroundColor: `${slide.badgeColor}80` }}
                      >
                        {slide.badge}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-4 text-[var(--accent-blue-bright)]">{slide.title}</h3>
                      <p className="text-white/90 text-base">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel navigation dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array(slides.length).fill(0).map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${
                  activeSlide === i ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => setActiveSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          {/* Swipe Indicator */}
          <div className="text-white/40 text-xs text-center mt-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Vuốt để xem thêm
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </section>
      
      {/* Heroes Section - Mobile Optimized */}
      <section className="py-16 px-5 bg-gradient-to-b from-[#0a1a28] to-[#051018] text-white relative overflow-hidden">
        {/* Hiệu ứng nền */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#071a2e] to-transparent"></div>
          <div className="absolute w-full h-full">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" opacity="0.1">
              <pattern id="hexagons-mobile" width="40" height="70" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                <path d="M0,0 L20,0 L20,18 L0,18 L0,0 Z M20,10 L40,10 L40,28 L20,28 L20,10 Z M0,20 L20,20 L20,38 L0,38 L0,20 Z M20,30 L40,30 L40,48 L20,48 L20,30 Z M0,40 L20,40 L20,58 L0,58 L0,40 Z M20,50 L40,50 L40,68 L20,68 L20,50 Z" fill="none" stroke="var(--accent-blue-bright)" strokeWidth="0.5"></path>
              </pattern>
              <rect width="100%" height="100%" fill="url(#hexagons-mobile)" />
            </svg>
          </div>
          <div className="absolute top-1/4 right-0 w-32 h-32 rounded-full bg-[var(--vaiTroTank)]/10 blur-2xl"></div>
          <div className="absolute bottom-10 left-5 w-24 h-24 rounded-full bg-[var(--vaiTroDamage)]/10 blur-2xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white mb-4 relative cyber-halo">
              <span className="text-shadow-blue relative inline-block">
                ANH HÙNG
                <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
            <div className="h-1 w-20 bg-[var(--accent-blue-bright)]/70 mx-auto mb-6"></div>
          </div>
          
          {/* Hero Cards Grid for Mobile */}
          <div className="grid grid-cols-2 gap-5">
            {/* Hero Card 1 */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#0c2341] to-[#071528] shadow-lg shadow-black/30 relative transform hover:scale-[1.02] transition-all duration-300 active:scale-95">
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                <Image
                  src="/tai_nguyen/anh_hung/asane.png"
                  alt="Tracer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-bold text-[var(--accent-blue-bright)]">TRACER</h3>
                <div className="inline-block mt-1 mb-2 px-2 py-0.5 bg-[var(--vaiTroDamage)]/30 text-white text-xs rounded-full">
                  DAMAGE
                </div>
              </div>
            </div>
            
            {/* Hero Card 2 */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#0c2341] to-[#071528] shadow-lg shadow-black/30 relative transform hover:scale-[1.02] transition-all duration-300 active:scale-95">
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                <Image
                  src="/tai_nguyen/anh_hung/marcus.png"
                  alt="Mercy"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-bold text-[var(--accent-blue-bright)]">MERCY</h3>
                <div className="inline-block mt-1 mb-2 px-2 py-0.5 bg-[var(--vaiTroSupport)]/30 text-white text-xs rounded-full">
                  SUPPORT
                </div>
              </div>
            </div>
            
            {/* Hero Card 3 */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#0c2341] to-[#071528] shadow-lg shadow-black/30 relative transform hover:scale-[1.02] transition-all duration-300 active:scale-95">
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                <Image
                    src="/tai_nguyen/anh_hung/david.png"
                  alt="Reinhardt"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-bold text-[var(--accent-blue-bright)]">REINHARDT</h3>
                <div className="inline-block mt-1 mb-2 px-2 py-0.5 bg-[var(--vaiTroTank)]/30 text-white text-xs rounded-full">
                  TANK
                </div>
              </div>
            </div>
            
            {/* Hero Card 4 */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#0c2341] to-[#071528] shadow-lg shadow-black/30 relative transform hover:scale-[1.02] transition-all duration-300 active:scale-95">
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                <Image
                  src="/tai_nguyen/anh_hung/marcus.png"
                  alt="Genji"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-bold text-[var(--accent-blue-bright)]">GENJI</h3>
                <div className="inline-block mt-1 mb-2 px-2 py-0.5 bg-[var(--vaiTroDamage)]/30 text-white text-xs rounded-full">
                  DAMAGE
                </div>
              </div>
            </div>
          </div>
          
          {/* View All Heroes Button */}
          <div className="mt-6 text-center">
            <Button 
              href="/heroes" 
              variant="transparent"
              size="md"
              className="w-full py-3 text-base tracking-wider text-shadow-sm button-cyber bg-gradient-to-r from-[var(--vaiTroTank)]/20 to-[var(--vaiTroTank)]/10 border border-[var(--vaiTroTank)]/30"
            >
              XEM TẤT CẢ ANH HÙNG
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-14 px-5 relative overflow-hidden bg-gradient-to-br from-[#0d2e4b] via-[#061224] to-[#050a14] text-white">
        {/* Hiệu ứng nền */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#051018] to-transparent"></div>
          <div className="absolute w-full h-full overflow-hidden">
            <div className="absolute w-40 h-40 rounded-full bg-blue-400/10 blur-2xl -top-10 -right-10"></div>
            <div className="absolute w-32 h-32 rounded-full bg-[var(--accent-blue-bright)]/10 blur-xl bottom-10 left-1/4"></div>
          </div>
        </div>
        
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4 cyber-halo">
            <span className="text-shadow-blue relative inline-block">
              BẮT ĐẦU NGAY
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
          <p className="text-base text-white/80 mb-8">
            Sẵn sàng tham gia vào thế giới Overwatch? Tham gia miễn phí ngay hôm nay!
          </p>
          <Button 
            href="/duong_dan/anh_hung" 
            variant="transparent"
            size="lg"
            animate="pulse"
            className="w-full py-4 text-lg tracking-wider text-shadow-sm button-cyber bg-gradient-to-r from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-bright)]/10 backdrop-blur-sm border border-[var(--accent-blue-bright)]/30"
          >
            ĐĂNG KÝ TÀI KHOẢN
          </Button>
        </div>
      </section>
    </div>
  );
} 