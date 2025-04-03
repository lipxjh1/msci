"use client";

import Image from "next/image";
import Link from "next/link";
import ThanhDieuHuong from "@/thanh_phan/thanh_dieu_huong";
import { useEffect } from "react";

export default function Home() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Hero Section với video nền */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1e88e5]/20 to-[#1A2526] z-10"></div>
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
          <ThanhDieuHuong />
        </div>
        
        {/* Nội dung banner */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pb-20">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow"
                style={{ letterSpacing: '-0.025em' }}>
              Overwatch
            </h1>
            <p className="text-xl md:text-2xl text-[var(--overwatch-blue)] font-semibold mb-10 tracking-wide uppercase animate-fade-in">
              Hành Động • Chiến Đấu • Tự Do
            </p>
            <div className="flex flex-wrap justify-center gap-6 animate-slide-up">
              <Link 
                href="/duong_dan/anh_hung" 
                className="inline-block bg-gradient-to-r from-[var(--overwatch-blue)] to-[#1a73e8] text-white font-bold py-5 px-10 rounded-md text-lg uppercase tracking-wider hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 btn-shine"
              >
                Chơi Ngay
              </Link>
              <Link 
                href="/heroes" 
                className="inline-block bg-transparent border-2 border-[var(--overwatch-blue)] text-white font-bold py-5 px-10 rounded-md text-lg uppercase tracking-wider hover:bg-[var(--overwatch-blue)]/10 transition-all duration-300"
              >
                Xem Anh Hùng
              </Link>
            </div>
          </div>
        </div>
        
        {/* Đường viền chỉ phần cuối của hero section */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--overwatch-dark-blue)] to-transparent z-10"></div>
      </section>
      
      {/* Feature Section */}
      <section className="py-16 px-4 md:px-8 bg-[var(--overwatch-black)] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-blue-text">Hãy là anh hùng, xây dựng đội hình, giành chiến thắng!</h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Overwatch 2 là game hành động đội nhóm miễn phí, diễn ra trong một tương lai đầy lạc quan, nơi mỗi trận đấu là cuộc chiến 5v5 đỉnh cao. Hãy hóa thân thành chiến binh du hành thời gian, DJ chiến trường sôi động, hoặc một trong hơn 30 anh hùng độc đáo khác khi bạn chiến đấu khắp thế giới.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1e2d33] p-6 rounded-lg transition-all duration-300 hover:translate-y-[-5px] glow-blue-hover reveal-left delay-1">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-6xl text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                    <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--overwatch-blue)]">MIỄN PHÍ</h3>
              <p className="text-white/80">
                Overwatch 2 là game miễn phí, luôn hoạt động và liên tục phát triển. Tập hợp bạn bè không phân biệt nền tảng và nhảy vào trải nghiệm PvP được thiết kế lại.
              </p>
            </div>
            
            <div className="bg-[#1e2d33] p-6 rounded-lg transition-all duration-300 hover:translate-y-[-5px] glow-blue-hover reveal delay-2">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                <div className="text-6xl text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--overwatch-blue)]">ANH HÙNG MỚI</h3>
              <p className="text-white/80">
                Nhiều anh hùng phi thường hơn sẽ tham gia vào đội hình hiện tại. Dù bạn thích dẫn đầu cuộc tấn công, phục kích kẻ thù hay hỗ trợ đồng minh, đều có anh hùng mới cho bạn.
              </p>
            </div>
            
            <div className="bg-[#1e2d33] p-6 rounded-lg transition-all duration-300 hover:translate-y-[-5px] glow-blue-hover reveal-right delay-3">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <div className="text-6xl text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--overwatch-blue)]">HÀNH ĐỘNG ĐƯỢC KHEN NGỢI</h3>
              <p className="text-white/80">
                Tận hưởng những trận chiến gay cấn với dàn anh hùng mới, nhiều bản đồ hơn để khám phá và các trận đấu 5v5 mang đến cho mỗi người chơi sức mạnh thay đổi trận đấu.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Heroes Section - Hexagon Layout */}
      <section className="py-20 bg-[#041019] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="hexagons" width="30" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(3)">
                <path d="M0,0 L15,0 L15,14 L0,14 L0,0 Z M15,8 L30,8 L30,22 L15,22 L15,8 Z M0,16 L15,16 L15,30 L0,30 L0,16 Z M15,24 L30,24 L30,38 L15,38 L15,24 Z M0,32 L15,32 L15,46 L0,46 L0,32 Z M15,40 L30,40 L30,54 L15,54 L15,40 Z" fill="none" stroke="#2473c3" strokeWidth="0.5"></path>
              </pattern>
              <rect width="100%" height="100%" fill="url(#hexagons)" />
            </svg>
          </div>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[var(--overwatch-blue)]/5 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-[var(--vaiTroTank)]/5 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-[var(--vaiTroDamage)]/5 blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Section header with glow */}
          <div className="text-center mb-16 reveal-scale">
            <h2 className="inline-block text-5xl font-extrabold text-white mb-6 relative">
              <span className="text-shadow-blue">ANH HÙNG</span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--overwatch-blue)] to-transparent"></div>
            </h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              Chọn từ một danh sách đa dạng các anh hùng với những kỹ năng và khả năng độc đáo. Mỗi anh hùng thuộc về một vai trò nhất định trong đội hình của bạn.
            </p>
          </div>
          
          {/* Role selector tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-full p-1.5 border border-white/10">
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[var(--vaiTroTank)] to-[var(--vaiTroTank)]/70 text-white font-bold text-sm">
                TANK
              </button>
              <button className="px-6 py-2 rounded-full text-white/70 font-medium text-sm hover:text-white/90 transition-colors">
                DAMAGE
              </button>
              <button className="px-6 py-2 rounded-full text-white/70 font-medium text-sm hover:text-white/90 transition-colors">
                SUPPORT
              </button>
            </div>
          </div>
          
          {/* Featured Tank Heroes */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Featured Hero */}
              <div className="aspect-square relative overflow-hidden rounded-lg reveal-left">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--vaiTroTank)]/80 to-transparent z-10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[var(--vaiTroTank)]/10 backdrop-blur-sm z-0"></div>
                <div className="relative h-full w-full z-0">
                <Image
                  src="/images/tank_hero.png"
                    alt="Featured Tank Hero"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded text-sm font-bold text-white mb-3">
                    TANK
                  </div>
                  <h3 className="text-3xl font-extrabold text-white mb-2">REINHARDT</h3>
                  <p className="text-white/80 mb-4">
                    Chiến binh huyền thoại trang bị giáp năng lượng, mang khiên hình chữ nhật khổng lồ, vung búa chiến Rocket Hammer.
                  </p>
                  <Link href="/heroes" className="inline-flex items-center text-white font-bold hover:text-[var(--vaiTroTank)] transition-colors">
                    XEM CHI TIẾT
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Other Heroes Grid */}
              <div className="grid grid-cols-2 gap-4 reveal-right">
                {/* Hero 1 */}
                <div className="group relative overflow-hidden rounded-lg aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 group-hover:from-[var(--vaiTroTank)]/80 transition-all duration-300"></div>
                  <div className="relative h-full w-full z-0">
                    <Image
                      src="/images/tank_hero.png"
                      alt="Tank Hero"
                      fill
                      className="object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-y-0 translate-y-8 transition-transform duration-300">ROADHOG</h3>
                    <p className="text-white/0 group-hover:text-white/80 transition-all duration-300 text-sm">
                      Kẻ sát nhân tàn bạo và bạo chúa với móc xích kéo và súng bắn mảnh vỡ.
                    </p>
                  </div>
            </div>
            
                {/* Hero 2 */}
                <div className="group relative overflow-hidden rounded-lg aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 group-hover:from-[var(--vaiTroTank)]/80 transition-all duration-300"></div>
                  <div className="relative h-full w-full z-0">
                <Image
                      src="/images/tank_hero.png"
                      alt="Tank Hero"
                      fill
                      className="object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-y-0 translate-y-8 transition-transform duration-300">D.VA</h3>
                    <p className="text-white/0 group-hover:text-white/80 transition-all duration-300 text-sm">
                      Cựu game thủ chuyên nghiệp điều khiển mech chiến đấu với khả năng cơ động cao.
                    </p>
                  </div>
                </div>
                
                {/* Hero 3 */}
                <div className="group relative overflow-hidden rounded-lg aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 group-hover:from-[var(--vaiTroTank)]/80 transition-all duration-300"></div>
                  <div className="relative h-full w-full z-0">
                    <Image
                      src="/images/tank_hero.png"
                      alt="Tank Hero"
                      fill
                      className="object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    />
              </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-y-0 translate-y-8 transition-transform duration-300">ORISA</h3>
                    <p className="text-white/0 group-hover:text-white/80 transition-all duration-300 text-sm">
                      Robot chiến đấu bất khuất với lao năng lượng và khả năng phòng thủ mạnh mẽ.
                    </p>
                  </div>
            </div>
            
                {/* Hero 4 */}
                <div className="group relative overflow-hidden rounded-lg aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 group-hover:from-[var(--vaiTroTank)]/80 transition-all duration-300"></div>
                  <div className="relative h-full w-full z-0">
                <Image
                      src="/images/tank_hero.png"
                      alt="Tank Hero"
                      fill
                      className="object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-y-0 translate-y-8 transition-transform duration-300">ZARYA</h3>
                    <p className="text-white/0 group-hover:text-white/80 transition-all duration-300 text-sm">
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
              className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-[var(--vaiTroTank)]/70 to-[var(--vaiTroTank)]/40 border border-[var(--vaiTroTank)]/30 text-white font-bold shadow-lg shadow-[var(--vaiTroTank)]/10 hover:shadow-[var(--vaiTroTank)]/30 transition-shadow duration-300"
            >
              XEM TẤT CẢ ANH HÙNG
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* News Section - Thiết kế mới */}
      <section className="py-20 bg-gradient-to-br from-[#0d2e4b] to-[#050a0c] relative overflow-hidden">
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
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 text-center relative">
                <span className="relative inline-block">
                  TIN TỨC MỚI NHẤT
                  <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--overwatch-blue)] to-transparent"></span>
                </span>
              </h2>
            </div>
            <p className="text-white/60 max-w-2xl mx-auto">
              Cập nhật các tin tức mới nhất về Overwatch. Từ cập nhật game, sự kiện đặc biệt đến các tin tức esports.
            </p>
          </div>
          
          {/* Main featured news */}
          <div className="mb-12 reveal">
            <div className="bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-80 lg:h-auto overflow-hidden">
                <Image
                  src="https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt1a9edd6ab0eac0e9/65ad9fa0d67b5576e9e42d03/Freja_Mythic_FinalBoss_FeaturedImage_ALT_1920x1080.jpg"
                  alt="Season 15 News"
                  fill
                    className="object-cover transform transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-[var(--overwatch-blue)] text-white text-sm font-bold px-3 py-1 rounded">MỚI NHẤT</div>
                </div>
                
                <div className="p-6 lg:p-10 flex flex-col justify-center">
                  <div className="text-[var(--overwatch-blue)] font-semibold mb-3 flex items-center">
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
                      className="inline-flex items-center text-white font-bold transition-all hover:text-[var(--overwatch-blue)]"
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
            <div className="group relative reveal-left delay-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 bg-gradient-to-b from-white/5 to-white/0 rounded-xl p-1 transform transition-all duration-300 group-hover:translate-y-[-5px] border border-white/10 backdrop-blur-sm overflow-hidden shadow-lg">
                <div className="relative h-44 rounded-t-lg overflow-hidden">
                <Image
                  src="https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt0b59541fe5f1726d/65a9ae9bc0e13e77b7d2e2a3/OW2_LeSSERAFIM_Battlepass_Featured_1920x1080.jpg"
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
            <div className="group relative reveal delay-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 bg-gradient-to-b from-white/5 to-white/0 rounded-xl p-1 transform transition-all duration-300 group-hover:translate-y-[-5px] border border-white/10 backdrop-blur-sm overflow-hidden shadow-lg">
                <div className="relative h-44 rounded-t-lg overflow-hidden">
                <Image
                  src="https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt0883501d78c0bbd5/65a5ade1c0e13e77b7d2c16d/DirectorsTake_Jan23_1920x1080.jpg"
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
            <div className="group relative reveal-right delay-3">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 bg-gradient-to-b from-white/5 to-white/0 rounded-xl p-1 transform transition-all duration-300 group-hover:translate-y-[-5px] border border-white/10 backdrop-blur-sm overflow-hidden shadow-lg">
                <div className="relative h-44 rounded-t-lg overflow-hidden">
                  <Image
                    src="/images/overwatch_logo.png"
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
              className="inline-block bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full border border-white/10 transition-all duration-300 hover:border-[var(--overwatch-blue)]/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              XEM TẤT CẢ TIN TỨC
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Thiết kế mới */}
      <section className="relative py-24 overflow-hidden">
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
                Tham Gia <span className="text-[var(--overwatch-blue)]">Overwatch</span> Ngay Hôm Nay!
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Hãy tham gia cùng hàng triệu người chơi trên khắp thế giới trong trải nghiệm chiến đấu đội nhóm hấp dẫn nhất. Game hoàn toàn miễn phí và sẵn sàng để chơi trên mọi nền tảng.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link 
                  href="/duong_dan/anh_hung" 
                  className="inline-block bg-gradient-to-r from-[var(--overwatch-blue)] to-[#1a73e8] text-white font-bold py-4 px-8 rounded-md text-lg uppercase tracking-wider hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 btn-shine"
                >
                  Tải Game Ngay
                </Link>
          <Link 
            href="/duong_dan/anh_hung" 
                  className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-md text-lg uppercase tracking-wider hover:bg-white/20 transition-all duration-300"
          >
                  Tìm Hiểu Thêm
          </Link>
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
                {['Twitter', 'Facebook', 'Instagram', 'YouTube'].map((platform) => (
                  <Link 
                    key={platform} 
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#1a2526] flex items-center justify-center hover:bg-[var(--overwatch-blue)] transition-colors duration-300"
                  >
                    <span className="sr-only">{platform}</span>
                    <div className="w-5 h-5 text-white">
                      {/* Placeholder for social icon */}
                    </div>
                  </Link>
                ))}
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
