"use client";

import Image from "next/image";
import Link from "next/link";
import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import HomeMobile from "./home_mobile";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Kiểm tra xem thiết bị có phải là mobile hay không
  useEffect(() => {
    setIsClient(true);
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  // Thêm hiệu ứng scroll reveal
  useEffect(() => {
    const scrollReveal = () => {
      const reveals = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
      );
      
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        } else {
          reveals[i].classList.remove('active');
        }
      }
    };
    
    window.addEventListener('scroll', scrollReveal);
    scrollReveal(); // Run once on load
    
    return () => window.removeEventListener('scroll', scrollReveal);
  }, []);

  // Nếu là thiết bị di động, sử dụng giao diện mobile
  if (isClient && isMobile) {
    return <HomeMobile />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-dark)] to-[var(--bg-darker)]">
      {/* Hero Section với video nền */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-accent-dark)]/50 to-[var(--bg-dark)] z-10"></div>
          <div className="relative w-full h-full overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/dZl1yGUetjI?autoplay=1&controls=0&showinfo=0&loop=1&playlist=dZl1yGUetjI&playsinline=1&rel=0&enablejsapi=1&modestbranding=1&start=22&mute=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute w-[130%] h-[130%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        {/* Menu điều hướng nổi trên video */}
        <div className="relative z-20">
          <ThanhDieuHuongResponsive />
        </div>
        
        {/* Nội dung banner */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pb-20">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow text-glitch"
                data-text="Overwatch"
                style={{ letterSpacing: '-0.025em' }}>
              Overwatch
            </h1>
            <p className="text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in">
              Hành Động • Chiến Đấu • Tự Do
            </p>
            <div className="flex flex-wrap justify-center gap-8 animate-slide-up">
              <Button 
                href="/duong_dan/anh_hung" 
                variant="transparent"
                size="lg"
                animate="none"
                className="tracking-wider text-shadow-sm px-10 button-cyber clip-hexagon hexagon-corner-flash"
              >
                Chơi Ngay
              </Button>
              <Button 
                href="/heroes" 
                variant="transparent"
                size="lg"
                animate="none"
                className="tracking-wider text-shadow-sm px-10 button-cyber clip-hexagon hexagon-border"
              >
                Xem Anh Hùng
              </Button>
            </div>
          </div>
        </div>
        
        {/* Đường viền chỉ phần cuối của hero section */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--bg-dark)] to-transparent z-10"></div>
      </section>
      
      {/* Feature Section */}
      <section className="py-24 px-4 md:px-8 bg-[var(--bg-darker)] text-white relative scanline">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[var(--bg-dark)] to-transparent"></div>
          <div className="absolute -right-64 top-1/4 w-96 h-96 rounded-full bg-[var(--accent-blue-glow)]/20 blur-3xl"></div>
          <div className="absolute -left-64 bottom-1/4 w-96 h-96 rounded-full bg-[var(--accent-orange-bright)]/15 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <h2 className="inline-block text-6xl font-extrabold text-white mb-8 relative cyber-halo">
              <span className="text-shadow-blue relative inline-block">
                BEST OF GAME 2025
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Overwatch 2 là game hành động đội nhóm miễn phí, diễn ra trong một tương lai đầy lạc quan, nơi mỗi trận đấu là cuộc chiến 5v5 đỉnh cao. Hãy hóa thân thành chiến binh du hành thời gian, DJ chiến trường sôi động, hoặc một trong hơn 30 anh hùng độc đáo khác khi bạn chiến đấu khắp thế giới.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gradient-to-b from-[var(--bg-accent-dark)] to-[var(--bg-darker)] p-8 rounded-2xl transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-[var(--vaiTroDamage)]/30 reveal-left delay-1 card-neon">
              <div className="relative h-56 mb-6 overflow-hidden rounded-xl">
                <Image
                  src="/images/free.jpg"
                  alt="Miễn phí"
                  fill
                  className="object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4 bg-[var(--accent-blue-bright)]/80 text-white font-bold py-1 px-4 rounded-full text-sm backdrop-blur-sm">MIỄN PHÍ</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--accent-blue-bright)]">MIỄN PHÍ</h3>
              <p className="text-white/90 text-lg">
                Overwatch 2 là game miễn phí, luôn hoạt động và liên tục phát triển. Tập hợp bạn bè không phân biệt nền tảng và nhảy vào trải nghiệm PvP được thiết kế lại.
              </p>
            </div>
            
            <div className="bg-gradient-to-b from-[var(--bg-accent-dark)] to-[var(--bg-darker)] p-8 rounded-2xl transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-[var(--vaiTroDamage)]/30 reveal delay-2 card-neon">
              <div className="relative h-56 mb-6 overflow-hidden rounded-xl">
                <Image
                  src="/images/new.jpg"
                  alt="Anh hùng mới"
                  fill
                  className="object-cover object-top transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4 bg-[var(--vaiTroDamage)]/80 text-white font-bold py-1 px-4 rounded-full text-sm backdrop-blur-sm">MỚI</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--accent-blue-bright)]">ANH HÙNG MỚI</h3>
              <p className="text-white/90 text-lg">
                Nhiều anh hùng phi thường hơn sẽ tham gia vào đội hình hiện tại. Dù bạn thích dẫn đầu cuộc tấn công, phục kích kẻ thù hay hỗ trợ đồng minh, đều có anh hùng mới cho bạn.
              </p>
            </div>
            
            <div className="bg-gradient-to-b from-[var(--bg-accent-dark)] to-[var(--bg-darker)] p-8 rounded-2xl transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-[var(--vaiTroSupport)]/30 reveal-right delay-3 card-neon">
              <div className="relative h-56 mb-6 overflow-hidden rounded-xl">
                <Image
                  src="/images/like.jpg"
                  alt="Hành động được khen ngợi"
                  fill
                  className="object-cover object-top transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4 bg-[var(--vaiTroSupport)]/80 text-white font-bold py-1 px-4 rounded-full text-sm backdrop-blur-sm">ACTION</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--accent-blue-bright)]">HÀNH ĐỘNG ĐƯỢC KHEN NGỢI</h3>
              <p className="text-white/90 text-lg">
                Tận hưởng những trận chiến gay cấn với dàn anh hùng mới, nhiều bản đồ hơn để khám phá và các trận đấu 5v5 mang đến cho mỗi người chơi sức mạnh thay đổi trận đấu.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Heroes Section - Hexagon Layout */}
      <section className="py-32 bg-gradient-to-b from-[var(--bg-dark)] to-[var(--bg-darker)] relative overflow-hidden bg-grid">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="hexagons" width="30" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(4)">
                <path d="M0,0 L15,0 L15,14 L0,14 L0,0 Z M15,8 L30,8 L30,22 L15,22 L15,8 Z M0,16 L15,16 L15,30 L0,30 L0,16 Z M15,24 L30,24 L30,38 L15,38 L15,24 Z M0,32 L15,32 L15,46 L0,46 L0,32 Z M15,40 L30,40 L30,54 L15,54 L15,40 Z" fill="none" stroke="var(--accent-blue-bright)" strokeWidth="0.5"></path>
              </pattern>
              <rect width="100%" height="100%" fill="url(#hexagons)" />
            </svg>
          </div>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[var(--accent-blue-glow)]/20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-[var(--vaiTroTank)]/15 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-[var(--vaiTroDamage)]/15 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Section header with glow */}
          <div className="text-center mb-20 reveal-scale">
            <h2 className="inline-block text-6xl font-extrabold text-white mb-8 relative cyber-halo">
              <span className="text-shadow-blue relative inline-block">
                ANH HÙNG
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Chọn từ một danh sách đa dạng các anh hùng với những kỹ năng và khả năng độc đáo. Mỗi anh hùng thuộc về một vai trò nhất định trong đội hình của bạn.
            </p>
          </div>
          
          {/* Role selector tabs */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10 shadow-lg shadow-[var(--accent-blue-glow)]/10">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[var(--vaiTroTank)] to-[var(--vaiTroTank)]/70 text-white font-bold text-lg shadow-lg shadow-[var(--vaiTroTank)]/20 button-glow">
                TANK
              </button>
              <button className="px-8 py-3 rounded-full text-white font-medium text-lg hover:bg-white/10 transition-colors">
                DAMAGE
              </button>
              <button className="px-8 py-3 rounded-full text-white font-medium text-lg hover:bg-white/10 transition-colors">
                SUPPORT
              </button>
            </div>
          </div>
          
          {/* Featured Tank Heroes */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Featured Hero */}
              <div className="aspect-square relative overflow-hidden rounded-2xl reveal-left shadow-2xl shadow-[var(--vaiTroTank)]/20 transform hover:scale-[1.02] transition-all duration-500 card-neon">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--vaiTroTank)]/80 to-transparent z-10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[var(--vaiTroTank)]/10 backdrop-blur-sm z-0"></div>
                <div className="relative h-full w-full z-0">
                <Image
                  src="/tai_nguyen/anh_hung/asane.png"
                    alt="Featured Tank Hero"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                  <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold text-white mb-4">
                    TANK
                  </div>
                  <h3 className="text-4xl font-extrabold text-white mb-4 text-shadow-blue">REINHARDT</h3>
                  <p className="text-white/90 mb-6 text-lg max-w-lg">
                    Chiến binh huyền thoại trang bị giáp năng lượng, mang khiên hình chữ nhật khổng lồ, vung búa chiến Rocket Hammer.
                  </p>
                  <Link href="/heroes" className="inline-flex items-center text-white font-bold py-2 px-6 bg-[var(--vaiTroTank)]/30 hover:bg-[var(--vaiTroTank)]/50 backdrop-blur-sm rounded-full transition-colors button-cyber">
                    XEM CHI TIẾT
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Other Heroes Grid */}
              <div className="grid grid-cols-2 gap-6 reveal-right">
                {/* Hero 1 */}
                <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-xl hover:shadow-2xl hover:shadow-[var(--vaiTroTank)]/20 transition-all duration-500 transform hover:scale-[1.03]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 group-hover:from-[var(--vaiTroTank)]/80 transition-all duration-300"></div>
                  <div className="relative h-full w-full z-0">
                    <Image
                      src="/tai_nguyen/anh_hung/marcus.png"
                      alt="Tank Hero"
                      fill
                      className="object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-y-0 translate-y-8 transition-transform duration-300">ROADHOG</h3>
                    <p className="text-white/0 group-hover:text-white/90 transition-all duration-300 text-base">
                      Kẻ sát nhân tàn bạo và bạo chúa với móc xích kéo và súng bắn mảnh vỡ.
                    </p>
                  </div>
            </div>
            
                {/* Hero 2 */}
                <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-xl hover:shadow-2xl hover:shadow-[var(--vaiTroTank)]/20 transition-all duration-500 transform hover:scale-[1.03]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 group-hover:from-[var(--vaiTroTank)]/80 transition-all duration-300"></div>
                  <div className="relative h-full w-full z-0">
                <Image
                      src="/tai_nguyen/anh_hung/david.png"
                      alt="Tank Hero"
                      fill
                      className="object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-y-0 translate-y-8 transition-transform duration-300">D.VA</h3>
                    <p className="text-white/0 group-hover:text-white/90 transition-all duration-300 text-base">
                      Cựu game thủ chuyên nghiệp điều khiển mech chiến đấu với khả năng cơ động cao.
                    </p>
                  </div>
                </div>
                
                {/* Hero 3 */}
                <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-xl hover:shadow-2xl hover:shadow-[var(--vaiTroTank)]/20 transition-all duration-500 transform hover:scale-[1.03]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 group-hover:from-[var(--vaiTroTank)]/80 transition-all duration-300"></div>
                  <div className="relative h-full w-full z-0">
                    <Image
                      src="/tai_nguyen/anh_hung/asane.png"
                      alt="Tank Hero"
                      fill
                      className="object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    />
              </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-y-0 translate-y-8 transition-transform duration-300">ORISA</h3>
                    <p className="text-white/0 group-hover:text-white/90 transition-all duration-300 text-base">
                      Robot chiến đấu bất khuất với lao năng lượng và khả năng phòng thủ mạnh mẽ.
                    </p>
                  </div>
            </div>
            
                {/* Hero 4 */}
                <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-xl hover:shadow-2xl hover:shadow-[var(--vaiTroTank)]/20 transition-all duration-500 transform hover:scale-[1.03]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 group-hover:from-[var(--vaiTroTank)]/80 transition-all duration-300"></div>
                  <div className="relative h-full w-full z-0">
                <Image
                      src="/tai_nguyen/anh_hung/fiona.png"
                      alt="Tank Hero"
                      fill
                      className="object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-y-0 translate-y-8 transition-transform duration-300">ZARYA</h3>
                    <p className="text-white/0 group-hover:text-white/90 transition-all duration-300 text-base">
                      Người lính với khiên năng lượng và súng particle cannon có thể bắn những tia năng lượng phá hoại.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* View All Heroes Button */}
          <div className="text-center">
            <Link 
              href="/heroes"
              className="inline-flex items-center px-10 py-5 rounded-full bg-gradient-to-r from-[var(--vaiTroTank)]/70 to-[var(--vaiTroTank)]/40 border border-[var(--vaiTroTank)]/30 text-white text-lg font-bold shadow-lg shadow-[var(--vaiTroTank)]/10 hover:shadow-xl hover:shadow-[var(--vaiTroTank)]/30 transition-all duration-300 transform hover:translate-y-[-2px] button-glow clip-hexagon"
            >
              XEM TẤT CẢ ANH HÙNG
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 ml-2">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* News Section - Thiết kế mới */}
      <section className="py-20 bg-gradient-to-br from-[#0d2e4b] to-[#050a0c] relative overflow-hidden particle-effect">
        {/* Particle elements */}
        <div className="particle" style={{ left: '10%', animationDelay: '0s' }}></div>
        <div className="particle" style={{ left: '20%', animationDelay: '1s' }}></div>
        <div className="particle" style={{ left: '35%', animationDelay: '2s' }}></div>
        <div className="particle" style={{ left: '50%', animationDelay: '0.5s' }}></div>
        <div className="particle" style={{ left: '65%', animationDelay: '1.5s' }}></div>
        <div className="particle" style={{ left: '80%', animationDelay: '2.5s' }}></div>
        <div className="particle" style={{ left: '90%', animationDelay: '0.2s' }}></div>
        <div className="particle" style={{ left: '15%', animationDelay: '3s' }}></div>
        <div className="particle" style={{ left: '25%', animationDelay: '2.2s' }}></div>
        <div className="particle" style={{ left: '45%', animationDelay: '1.8s' }}></div>
        <div className="particle" style={{ left: '70%', animationDelay: '2.7s' }}></div>
        <div className="particle" style={{ left: '85%', animationDelay: '0.7s' }}></div>
        
        {/* Decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#1A2526] to-transparent"></div>
          <div className="absolute right-0 top-20 w-96 h-96 rounded-full bg-[var(--overwatch-blue)]/5 blur-3xl"></div>
          <div className="absolute -left-20 bottom-10 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
          <div className="absolute left-1/4 top-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
          <div className="absolute left-1/3 top-1/4 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
          <div className="absolute right-1/4 top-2/3 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
          <div className="absolute right-1/3 bottom-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Header - Centered with glow */}
          <div className="text-center mb-14 reveal-scale">
            <div className="inline-block">
            <h2 className="inline-block text-5xl font-extrabold text-white mb-6 relative cyber-halo">
              <span className="text-shadow-blue">NEWS </span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--overwatch-blue)] to-transparent"></div>
            </h2>
            </div>
            <p className="text-white/60 max-w-2xl mx-auto">
              Cập nhật các tin tức mới nhất về Overwatch. Từ cập nhật game, sự kiện đặc biệt đến các tin tức esports.
            </p>
          </div>
          
          {/* Main featured news */}
          <div className="mb-12 reveal">
            <div className="bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 card-neon">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-80 lg:h-auto overflow-hidden">
                <Image
                  src="/images/overwatch_bg_2.webp"
                  alt="Season 15 News"
                  fill
                    className="object-cover transform transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-[var(--overwatch-blue)] text-white text-sm font-bold px-3 py-1 rounded">MỚI NHẤT</div>
                </div>
                
                <div className="p-6 lg:p-10 flex flex-col justify-center">
                  <div className="text-[var(--overwatch-blue)] font-semibold mb-3 flex items-center dot-flicker">
                    <span className="inline-block w-2 h-2 bg-[var(--overwatch-blue)] rounded-full mr-2"></span>
                    CẬP NHẬT GAME
              </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Season 15 Midseason: Collab, Crossbow, and Chaos</h3>
                  <p className="text-white/70 mb-6">
                    Khám phá màn hợp tác đặc biệt, anh hùng mới và nhiều nội dung thú vị trong bản cập nhật giữa mùa của Season 15 với sự xuất hiện của nhiều tính năng được người chơi mong đợi từ lâu.
                  </p>
                  <div className="mt-auto">
                    <Link 
                      href="/duong_dan/tin_tuc"
                      className="inline-flex items-center text-white font-bold transition-all hover:text-[var(--overwatch-blue)] button-cyber"
                    >
                      ĐỌC THÊM
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              </div>
            </div>
            
          {/* News grid with cards in a different style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* News Item 1 */}
            <div className="group relative reveal-left delay-1 card-neon">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 bg-gradient-to-b from-white/5 to-white/0 rounded-xl p-1 transform transition-all duration-300 group-hover:translate-y-[-5px] border border-white/10 backdrop-blur-sm overflow-hidden shadow-lg">
                <div className="relative h-44 rounded-t-lg overflow-hidden">
                <Image
                  src="/images/overwatch_bg_2.jpg"
                  alt="LE SSERAFIM Collab"
                  fill
                  className="object-cover"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-white/60">March 15, 2024</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">COLLABORATION</span>
              </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[var(--overwatch-blue)] transition-colors">Remix the Beat with Overwatch 2 x LE SSERAFIM</h3>
                  <p className="text-white/60 text-sm line-clamp-3 mb-4">
                  Bùng nổ âm thanh khi Overwatch 2 x LE SSERAFIM mang nguồn năng lượng và nhịp điệu táo bạo thẳng vào chiến trường.
                </p>
                  <Link href="#" className="text-sm font-medium text-white/70 group-hover:text-[var(--overwatch-blue)] transition-colors flex items-center">
                    Xem chi tiết
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* News Item 2 */}
            <div className="group relative reveal delay-2 card-neon">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 bg-gradient-to-b from-white/5 to-white/0 rounded-xl p-1 transform transition-all duration-300 group-hover:translate-y-[-5px] border border-white/10 backdrop-blur-sm overflow-hidden shadow-lg">
                <div className="relative h-44 rounded-t-lg overflow-hidden">
                <Image
                  src="/images/overwatch_bg_2.jpg"
                    alt="Director's Take"
                  fill
                  className="object-cover"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-white/60">March 10, 2024</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">DEV UPDATE</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[var(--overwatch-blue)] transition-colors">Director&apos;s Take - Catch Up on Our AMA</h3>
                  <p className="text-white/60 text-sm line-clamp-3 mb-4">
                    Cập nhật thông tin mới nhất về hướng phát triển của game qua buổi hỏi đáp với đạo diễn và đội phát triển.
                  </p>
                  <Link href="#" className="text-sm font-medium text-white/70 group-hover:text-[var(--overwatch-blue)] transition-colors flex items-center">
                    Xem chi tiết
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* News Item 3 */}
            <div className="group relative reveal-right delay-3 card-neon">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 bg-gradient-to-b from-white/5 to-white/0 rounded-xl p-1 transform transition-all duration-300 group-hover:translate-y-[-5px] border border-white/10 backdrop-blur-sm overflow-hidden shadow-lg">
                <div className="relative h-44 rounded-t-lg overflow-hidden">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Esports News"
                    fill
                    className="object-cover object-center bg-[#0d2e4b]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-white/60">March 5, 2024</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300">ESPORTS</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[var(--overwatch-blue)] transition-colors">Overwatch League 2024 - Lịch Thi Đấu Mới</h3>
                  <p className="text-white/60 text-sm line-clamp-3 mb-4">
                    Khám phá lịch thi đấu mới nhất của Overwatch League 2024 với nhiều đội tuyển mới và các cải tiến trong format thi đấu.
                  </p>
                  <Link href="#" className="text-sm font-medium text-white/70 group-hover:text-[var(--overwatch-blue)] transition-colors flex items-center">
                    Xem chi tiết
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* See all news button */}
          <div className="text-center mt-12 reveal">
            <Link 
              href="/duong_dan/tin_tuc"
              className="inline-block bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full border border-white/10 transition-all duration-300 hover:border-[var(--overwatch-blue)]/50 hover:shadow-lg hover:shadow-blue-500/10 button-glow"
            >
              XEM TẤT CẢ TIN TỨC
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Thiết kế mới */}
      <section className="relative py-24 overflow-hidden animated-gradient-bg scanline">
        {/* Background với hiệu ứng */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-[#0d2e4b] to-[#071a2e] z-0">
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#1A2526] to-transparent"></div>
          <div className="absolute w-full h-full overflow-hidden">
            <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-3xl -top-20 -left-20 animate-pulse-slow"></div>
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[var(--overwatch-blue)]/20 blur-2xl right-10 top-1/2 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
            <div className="absolute w-[200px] h-[200px] rounded-full bg-blue-500/20 blur-xl bottom-10 left-1/4 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
        
        {/* Overwatch logo watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 opacity-5">
          <div className="relative w-full h-full">
            <Image 
              src="/images/overwatch_logo.png" 
              alt="Overwatch Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Nội dung */}
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-left reveal-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Tham Gia <span className="text-[var(--overwatch-blue)] cyber-halo">Overwatch</span> Ngay Hôm Nay!
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Hãy tham gia cùng hàng triệu người chơi trên khắp thế giới trong trải nghiệm chiến đấu đội nhóm hấp dẫn nhất. Game hoàn toàn miễn phí và sẵn sàng để chơi trên mọi nền tảng.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link 
                  href="/duong_dan/anh_hung" 
                  className="inline-block bg-gradient-to-r from-[var(--overwatch-blue)] to-[#1a73e8] text-white font-bold py-4 px-8 rounded-md text-lg uppercase tracking-wider hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 btn-shine clip-hexagon button-cyber"
                >
                  Tải Game Ngay
                </Link>
          <Link 
            href="/duong_dan/anh_hung" 
                  className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-md text-lg uppercase tracking-wider hover:bg-white/20 transition-all duration-300 clip-hexagon hexagon-border"
          >
                  Tìm Hiểu Thêm
          </Link>
              </div>
              
              {/* Thêm các biểu tượng mạng xã hội */}
              <div className="mt-6">
                <p className="text-white/60 mb-4">Theo dõi chúng tôi trên mạng xã hội:</p>
                <div className="flex space-x-4">
                  <Link 
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--overwatch-blue)] transition-colors duration-300"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </Link>
                  <Link 
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--overwatch-blue)] transition-colors duration-300"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </Link>
                  <Link 
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--overwatch-blue)] transition-colors duration-300"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </Link>
                  <Link 
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--overwatch-blue)] transition-colors duration-300"
                  >
                    <span className="sr-only">YouTube</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  </Link>
                  <Link 
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--overwatch-blue)] transition-colors duration-300"
                  >
                    <span className="sr-only">Discord</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                      <path d="M9 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"></path>
                      <path d="M7.5 4h9a4.5 4.5 0 0 1 4.5 4.5v6a4.5 4.5 0 0 1-4.5 4.5h-1.5l-3 3-3-3H7.5A4.5 4.5 0 0 1 3 14.5v-6A4.5 4.5 0 0 1 7.5 4z"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end reveal-right">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 rounded-full bg-[var(--overwatch-blue)]/30 blur-xl animate-pulse-slow"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[var(--overwatch-blue)]/20 shadow-2xl shadow-blue-500/30">
                  <div className="absolute inset-4 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <div className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32">
                          <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer - Thiết kế mới */}
      <footer className="bg-[#050a0c] text-white pt-16 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Logo và mô tả */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-white/10 pb-12">
            <div className="mb-8 md:mb-0 max-w-md">
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 mr-3">
                  <Image
                    src="/images/overwatch_logo.png"
                    alt="Overwatch Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-bold text-white">OVERWATCH</span>
              </div>
              <p className="text-white/60 mb-6">
                Overwatch là game bắn súng đội nhóm nơi các anh hùng tập hợp để tham gia vào các trận chiến 5v5 đầy hấp dẫn với nhiều kỹ năng và tính năng độc đáo.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <Link 
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#1a2526] flex items-center justify-center hover:bg-[var(--overwatch-blue)] transition-colors duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link 
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#1a2526] flex items-center justify-center hover:bg-[var(--overwatch-blue)] transition-colors duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link 
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#1a2526] flex items-center justify-center hover:bg-[var(--overwatch-blue)] transition-colors duration-300"
                >
                  <span className="sr-only">Instagram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link 
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#1a2526] flex items-center justify-center hover:bg-[var(--overwatch-blue)] transition-colors duration-300"
                >
                  <span className="sr-only">YouTube</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-auto">
              <div>
                <h3 className="text-lg font-bold mb-4 text-[var(--overwatch-blue)]">GAME</h3>
                <ul className="space-y-3">
                  <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Anh Hùng</Link></li>
                  <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Bản Đồ</Link></li>
                  <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Mùa Giải</Link></li>
                  <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Chế Độ Chơi</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4 text-[var(--overwatch-blue)]">HỖ TRỢ</h3>
                <ul className="space-y-3">
                  <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Trung Tâm Hỗ Trợ</Link></li>
                  <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Báo Lỗi</Link></li>
                  <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Liên Hệ</Link></li>
                  <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Forums</Link></li>
              </ul>
            </div>
            
              <div>
                <h3 className="text-lg font-bold mb-4 text-[var(--overwatch-blue)]">CỘNG ĐỒNG</h3>
                <ul className="space-y-3">
                  <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Tin Tức</Link></li>
                  <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Esports</Link></li>
                  <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Discord</Link></li>
                  <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Fanart</Link></li>
              </ul>
              </div>
            </div>
          </div>
          
          {/* Copyright và pháp lý */}
          <div className="flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
            <p>©2024 Clone Overwatch. Đây là một dự án clone, không phải trang web chính thức.</p>
            
            <div className="flex mt-4 md:mt-0 space-x-6">
              <Link href="#" className="hover:text-white transition-colors">Điều Khoản Sử Dụng</Link>
              <Link href="#" className="hover:text-white transition-colors">Chính Sách Riêng Tư</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
