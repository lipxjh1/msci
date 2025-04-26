'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';
import { FaLaptopCode, FaGamepad, FaPaintBrush, FaUsers, FaRocket, FaChartLine, FaMobileAlt, FaLink } from 'react-icons/fa';
import DarkAbstractBg from '@/components/backgrounds/DarkAbstractBg';

// Component cho từng vị trí tuyển dụng
function JobPosition({ 
  icon, 
  title, 
  description, 
  index 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="relative bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 transition-all duration-300 transform-gpu hover:shadow-xl hover:bg-white/10 animate-fadeIn card-neon group cursor-pointer"
      style={{ 
        animationDelay: `${index * 50}ms` 
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)]">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-rajdhani text-xl font-bold text-white tracking-wide mb-2 text-shadow-blue group-hover:text-[var(--accent-blue-bright)] transition-colors duration-300">{title}</h3>
            <div className="flex items-center justify-center w-8 h-8">
              <svg 
                className={`w-5 h-5 transition-transform duration-300 text-white/70 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="font-rajdhani text-white/80 group-hover:text-white/90 transition-colors duration-300">{description}</p>
          
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-white/10 animate-fadeIn">
              <h4 className="font-rajdhani text-lg font-bold text-[var(--accent-blue-bright)] mb-2">Yêu cầu:</h4>
              <ul className="font-rajdhani text-white/80 space-y-2 pl-4">
                <li className="flex items-start gap-2 before:content-['•'] before:text-[var(--accent-blue-bright)] before:mr-2">
                  Kinh nghiệm làm việc ít nhất 1 năm trong vị trí tương tự
                </li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-[var(--accent-blue-bright)] before:mr-2">
                  Có portfolio/Github thể hiện năng lực
                </li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-[var(--accent-blue-bright)] before:mr-2">
                  Đam mê phát triển game và công nghệ mới
                </li>
              </ul>
              
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-[var(--accent-blue-bright)]/20 hover:bg-[var(--accent-blue-bright)]/30 text-[var(--accent-blue-bright)] font-medium rounded-lg transition-colors duration-300">
                  Ứng tuyển ngay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Corner decoration - top left */}
      <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-16 h-16 -translate-x-8 -translate-y-8 rotate-45 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ 
            background: 'linear-gradient(135deg, var(--accent-blue-bright), transparent)'
          }}
        ></div>
      </div>
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
        style={{ 
          boxShadow: 'inset 0 0 20px 5px var(--accent-blue-bright)/40'
        }}
      ></div>
    </div>
  );
}

export default function CareersPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Job categories and positions
  const jobCategories = [
    {
      id: 'art',
      title: "Nghệ Sĩ & Thiết Kế Game",
      positions: [
        { icon: <FaPaintBrush className="h-6 w-6" />, title: "2D Spine Animator", description: "Tạo animation nhân vật mượt mà và hiệu ứng đặc biệt" },
        { icon: <FaPaintBrush className="h-6 w-6" />, title: "3D Artist", description: "Thiết kế môi trường, nhân vật và vũ khí" },
        { icon: <FaPaintBrush className="h-6 w-6" />, title: "UI/UX Designer", description: "Thiết kế giao diện trực quan, thân thiện" },
        { icon: <FaPaintBrush className="h-6 w-6" />, title: "Concept Artist", description: "Phác họa thế giới khoa học viễn tưởng của M-SCI" },
      ]
    },
    {
      id: 'dev',
      title: "Lập Trình Viên",
      positions: [
        { icon: <FaLaptopCode className="h-6 w-6" />, title: "Unity Developer", description: "Xây dựng cơ chế gameplay và hệ thống game" },
        { icon: <FaLaptopCode className="h-6 w-6" />, title: "Backend Engineer", description: "Phát triển kiến trúc server có khả năng mở rộng" },
        { icon: <FaLaptopCode className="h-6 w-6" />, title: "Blockchain Developer", description: "Tích hợp công nghệ blockchain vào game" },
        { icon: <FaMobileAlt className="h-6 w-6" />, title: "Mobile Developer", description: "Tối ưu hóa trải nghiệm trên Android/iOS" },
      ]
    },
    {
      id: 'content',
      title: "Sáng Tạo Nội Dung",
      positions: [
        { icon: <FaGamepad className="h-6 w-6" />, title: "Game Writer", description: "Viết kịch bản, câu chuyện nhân vật" },
        { icon: <FaGamepad className="h-6 w-6" />, title: "Sound Designer", description: "Tạo hiệu ứng âm thanh và nhạc nền" },
        { icon: <FaUsers className="h-6 w-6" />, title: "Community Manager", description: "Quản lý và phát triển cộng đồng game" },
      ]
    }
  ];

  // Lợi ích khi tham gia
  const benefits = [
    { icon: <FaUsers className="h-6 w-6" />, title: "Cộng Đồng Sáng Tạo", description: "Làm việc với các nhà phát triển đam mê từ khắp nơi" },
    { icon: <FaChartLine className="h-6 w-6" />, title: "Mô Hình Minh Bạch", description: "Chia sẻ lợi nhuận công bằng dựa trên đóng góp" },
    { icon: <FaRocket className="h-6 w-6" />, title: "Công Nghệ Tiên Tiến", description: "Làm việc với 2D Spine, 3D và blockchain" },
    { icon: <FaGamepad className="h-6 w-6" />, title: "Tầm Nhìn Toàn Cầu", description: "Dự án hướng đến thị trường quốc tế" },
    { icon: <FaLaptopCode className="h-6 w-6" />, title: "Phát Triển Kỹ Năng", description: "Học hỏi và phát triển trong môi trường chuyên nghiệp" },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Nền đen tối dần */}
      <DarkAbstractBg />

      {/* Content with relative positioning for proper layering */}
      <div className="relative z-10">
        {/* Menu điều hướng */}
        <ThanhDieuHuongResponsive />

        {/* Hero Banner */}
        <div className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/30 to-[#041019] z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/overwatch_bg_2.jpg')] bg-cover bg-center bg-no-repeat">
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse delay-100"></div>
              <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse delay-200"></div>
              <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse delay-300"></div>
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
            <h1 className="font-orbitron text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
              <span className="relative inline-block">
                TUYỂN DỤNG
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h1>
            <p className="font-rajdhani text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in text-center">
              CÙNG XÂY DỰNG TỰA GAME CỦA CỘNG ĐỒNG
            </p>
            
            {/* Nút cuộn xuống */}
            <div className="animate-slide-up">
              <button 
                onClick={() => document.getElementById('careers-content')?.scrollIntoView({behavior: 'smooth'})}
                className="font-rajdhani font-bold tracking-wider text-shadow-sm px-10 py-3 button-cyber clip-hexagon hexagon-border text-white"
              >
                Xem vị trí
              </button>
            </div>
          </div>
        </div>

        <div id="careers-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
          {/* Curved section top */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-black/80 -translate-y-full"></div>
          
          {/* Intro Section */}
          <div className="mb-16 backdrop-blur-sm bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl">
            <div className="flex justify-center mb-6">
              <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue relative inline-block">
                  M-SCI TUYỂN DỤNG
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h2>
            </div>
            
            <div className="text-center max-w-4xl mx-auto mb-8">
              <p className="font-rajdhani text-white/90 text-lg mb-6">
                M-SCI không chỉ là một tựa game - đây là dự án game cộng đồng, nơi MỌI NGƯỜI đều có thể đóng góp sức sáng tạo để cùng xây dựng một vũ trụ game độc đáo. Chúng tôi đang phát triển một tựa game hành động khoa học viễn tưởng kết hợp hoàn hảo giữa đồ họa 2D Spine Animation và 3D, sẽ ra mắt trên nền tảng Android và iOS.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all duration-300 card-neon">
                <h3 className="font-orbitron text-xl font-bold text-[var(--accent-blue-bright)] mb-4">🎮 Về Dự Án M-SCI</h3>
                <p className="font-rajdhani text-white/80 mb-4">
                  M-SCI là tựa game hành động khoa học viễn tưởng đầy tham vọng lấy bối cảnh năm 2049, khi nhân loại đối mặt với thử thách lớn nhất từ đội quân robot và drone do AI điều khiển.
                </p>
                <p className="font-rajdhani text-white/80 font-bold">
                  Điều đặc biệt? Chúng tôi xây dựng game CÙNG VỚI cộng đồng, không chỉ CHO cộng đồng.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all duration-300 card-neon">
                <h3 className="font-orbitron text-xl font-bold text-[var(--accent-blue-bright)] mb-4">🚀 Thông Số Kỹ Thuật</h3>
                <ul className="font-rajdhani text-white/80 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-blue-bright)]"></span>
                    <span><strong>Nền tảng</strong>: Android & iOS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-blue-bright)]"></span>
                    <span><strong>Công nghệ</strong>: 2D Spine Animation + Đồ họa 3D</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-blue-bright)]"></span>
                    <span><strong>Thể loại</strong>: Game bắn súng hành động sci-fi kết hợp yếu tố RPG</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-blue-bright)]"></span>
                    <span><strong>Tính năng</strong>: Sưu tầm anh hùng, Hệ thống Guild, Chiến đấu PvP/PvE, Tích hợp Blockchain</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="mb-10">
            <div className="flex justify-center mb-6">
              <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue relative inline-block">
                  VỊ TRÍ ĐANG TUYỂN
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-3 text-sm font-medium font-rajdhani tracking-wider transition-all duration-300 
                  ${activeCategory === 'all' 
                  ? 'text-white border-2 border-[var(--accent-blue-bright)] shadow-lg shadow-[var(--accent-blue-glow)]/40 transform scale-105 button-cyber clip-hexagon hexagon-corner-flash bg-[var(--accent-blue-bright)]/20' 
                  : 'bg-white/5 text-white/90 hover:bg-[var(--accent-blue-bright)]/10 hover:text-white hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 border border-white/20 hover:border-[var(--accent-blue-bright)]/70 button-cyber clip-hexagon'
                }`}
              >
                Tất Cả
              </button>
              
              {jobCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 text-sm font-medium font-rajdhani tracking-wider transition-all duration-300 
                    ${activeCategory === category.id 
                      ? 'text-white border-2 border-[var(--accent-blue-bright)] shadow-lg shadow-[var(--accent-blue-glow)]/40 transform scale-105 button-cyber clip-hexagon hexagon-corner-flash bg-[var(--accent-blue-bright)]/20' 
                      : 'bg-white/5 text-white/90 hover:bg-[var(--accent-blue-bright)]/10 hover:text-white hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 border border-white/20 hover:border-[var(--accent-blue-bright)]/70 button-cyber clip-hexagon'
                    }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* Job Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {jobCategories.map((category) => 
              // Hiển thị tất cả hoặc theo category được chọn
              (activeCategory === 'all' || activeCategory === category.id) &&
              category.positions.map((position, index) => (
                <JobPosition
                  key={`${category.id}-${index}`}
                  icon={position.icon}
                  title={position.title}
                  description={position.description}
                  index={index}
                />
              ))
            )}
          </div>
          
          {/* Benefits Section */}
          <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
            <div className="flex justify-center mb-8">
              <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue relative inline-block">
                  LỢI ÍCH KHI THAM GIA M-SCI
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all duration-300 card-neon animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)] mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-rajdhani text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="font-rajdhani text-white/80">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call To Action */}
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo mb-6">
              <span className="text-shadow-blue">
                SẴN SÀNG THAM GIA?
              </span>
            </h2>
            <p className="font-rajdhani text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Gửi CV hoặc portfolio của bạn đến <span className="text-[var(--accent-blue-bright)] font-bold">careers@m-sci.com</span> cùng với vị trí bạn quan tâm.
            </p>
            <button className="font-rajdhani text-lg font-bold tracking-wider px-10 py-4 button-cyber clip-hexagon hexagon-border text-white bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/40 transition-all duration-300">
              GỬI ỨNG TUYỂN NGAY
            </button>
          </div>
        </div>
        
        {/* Join Us Footer */}
        <div className="relative w-full overflow-hidden">
          {/* Battlefield Image Background */}
          <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
            <Image 
              src="/images/overwatch_bg_2.jpg" 
              alt="Careers background" 
              fill
              sizes="100vw"
              className="object-cover object-center brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
            
            {/* Footer Overlay */}
            <div className="absolute inset-0 z-10">
              <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-10 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
                  XÂY DỰNG TƯƠNG LAI GAME VIỆT
                </h2>
                
                <div className="mt-8">
                  <h3 className="text-gray-300 uppercase text-sm tracking-widest mb-4">THEO DÕI CHÚNG TÔI</h3>
                  <div className="flex justify-center space-x-6">
                    <a href="#" className="text-white hover:text-[var(--accent-blue-bright)] transition-colors">
                      <FaFacebookF className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-white hover:text-[var(--accent-blue-bright)] transition-colors">
                      <FaTwitter className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-white hover:text-[var(--accent-blue-bright)] transition-colors">
                      <FaYoutube className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-white hover:text-[var(--accent-blue-bright)] transition-colors">
                      <FaDiscord className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-white hover:text-[var(--accent-blue-bright)] transition-colors">
                      <FaTelegram className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 w-16 h-16 rotate-45 border border-[var(--accent-blue-bright)]/30 rounded-lg opacity-50 animate-pulse-slow hidden md:block"></div>
      <div className="absolute bottom-1/4 right-8 w-12 h-12 rotate-12 border border-[var(--accent-blue-bright)]/30 rounded-lg opacity-50 animate-pulse-slow delay-300 hidden md:block"></div>
    </div>
  );
} 