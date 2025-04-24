'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';
import { FaLaptopCode, FaGamepad, FaPaintBrush, FaUsers, FaRocket, FaChartLine, FaMobileAlt, FaLink } from 'react-icons/fa';

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
  return (
    <div 
      className="relative bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 transition-all duration-300 transform-gpu hover:shadow-xl hover:bg-white/10 animate-fadeIn card-neon group"
      style={{ 
        animationDelay: `${index * 50}ms` 
      }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)]">
          {icon}
        </div>
        <div>
          <h3 className="font-rajdhani text-xl font-bold text-white tracking-wide mb-2 text-shadow-blue group-hover:text-[var(--accent-blue-bright)] transition-colors duration-300">{title}</h3>
          <p className="font-rajdhani text-white/80 group-hover:text-white/90 transition-colors duration-300">{description}</p>
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
  // Job categories and positions
  const jobCategories = [
    {
      title: "Nghệ Sĩ & Thiết Kế Game",
      positions: [
        { icon: <FaPaintBrush className="h-6 w-6" />, title: "2D Spine Animator", description: "Tạo animation nhân vật mượt mà và hiệu ứng đặc biệt" },
        { icon: <FaPaintBrush className="h-6 w-6" />, title: "3D Artist", description: "Thiết kế môi trường, nhân vật và vũ khí" },
        { icon: <FaPaintBrush className="h-6 w-6" />, title: "UI/UX Designer", description: "Thiết kế giao diện trực quan, thân thiện" },
        { icon: <FaPaintBrush className="h-6 w-6" />, title: "Concept Artist", description: "Phác họa thế giới khoa học viễn tưởng của M-SCI" },
      ]
    },
    {
      title: "Lập Trình Viên",
      positions: [
        { icon: <FaLaptopCode className="h-6 w-6" />, title: "Unity Developer", description: "Xây dựng cơ chế gameplay và hệ thống game" },
        { icon: <FaLaptopCode className="h-6 w-6" />, title: "Backend Engineer", description: "Phát triển kiến trúc server có khả năng mở rộng" },
        { icon: <FaLaptopCode className="h-6 w-6" />, title: "Blockchain Developer", description: "Tích hợp công nghệ blockchain vào game" },
        { icon: <FaMobileAlt className="h-6 w-6" />, title: "Mobile Developer", description: "Tối ưu hóa trải nghiệm trên Android/iOS" },
      ]
    },
    {
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
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Hero Banner */}
      <div className="relative h-[100vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/30 to-[#041019] z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/overwatch_bg_2.jpg')] bg-cover bg-center bg-no-repeat">
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-200"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-300"></div>
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
          
          {/* Nút cuộn xuống - thêm mới */}
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
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041019] -translate-y-full"></div>
        
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
        
        {/* Job Categories */}
        {jobCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <div className="flex justify-center mb-8">
              <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue relative inline-block">
                  {category.title}
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.positions.map((position, index) => (
                <JobPosition
                  key={index}
                  icon={position.icon}
                  title={position.title}
                  description={position.description}
                  index={index + categoryIndex * 10}
                />
              ))}
            </div>
          </div>
        ))}
        
        {/* Cooperation Model */}
        <div className="mb-16">
          <div className="flex justify-center mb-8">
            <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
              <span className="text-shadow-blue relative inline-block">
                🌟 MÔ HÌNH HỢP TÁC ĐỘC ĐÁO
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all duration-300 card-neon">
              <h3 className="font-orbitron text-xl font-bold text-[var(--accent-blue-bright)] mb-4">Đóng Góp Tài Nguyên</h3>
              <ul className="font-rajdhani text-white/80 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)] mt-0.5">
                    <FaRocket className="h-3 w-3" />
                  </span>
                  <span>Chia sẻ artwork, code, âm thanh của bạn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)] mt-0.5">
                    <FaRocket className="h-3 w-3" />
                  </span>
                  <span>Tham gia với vai trò freelancer hoặc part-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)] mt-0.5">
                    <FaRocket className="h-3 w-3" />
                  </span>
                  <span>Cộng tác từ xa linh hoạt</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all duration-300 card-neon">
              <h3 className="font-orbitron text-xl font-bold text-[var(--accent-blue-bright)] mb-4">Quyền Lợi Người Đóng Góp</h3>
              <ul className="font-rajdhani text-white/80 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)] mt-0.5">
                    <FaRocket className="h-3 w-3" />
                  </span>
                  <span>Tên bạn trong credits game</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)] mt-0.5">
                    <FaRocket className="h-3 w-3" />
                  </span>
                  <span>Nhận % doanh thu từ sản phẩm bạn đóng góp</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)] mt-0.5">
                    <FaRocket className="h-3 w-3" />
                  </span>
                  <span>Token và NFT độc quyền trong game</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)] mt-0.5">
                    <FaRocket className="h-3 w-3" />
                  </span>
                  <span>Cơ hội trở thành core team member</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Benefits */}
        <div className="mb-16">
          <div className="flex justify-center mb-8">
            <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
              <span className="text-shadow-blue relative inline-block">
                💡 TẠI SAO NÊN THAM GIA?
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <JobPosition
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            ))}
          </div>
        </div>
        
        {/* How to Join */}
        <div className="mb-16 backdrop-blur-sm bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl card-neon">
          <div className="flex justify-center mb-6">
            <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
              <span className="text-shadow-blue relative inline-block">
                📝 CÁCH THỨC THAM GIA
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all duration-300 text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)] group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-rajdhani text-xl font-bold text-white mb-2 group-hover:text-[var(--accent-blue-bright)] transition-colors duration-300">Gửi Portfolio</h3>
              <p className="font-rajdhani text-white/70">Showcase tác phẩm của bạn</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all duration-300 text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)] group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-rajdhani text-xl font-bold text-white mb-2 group-hover:text-[var(--accent-blue-bright)] transition-colors duration-300">Đề Xuất Ý Tưởng</h3>
              <p className="font-rajdhani text-white/70">Chia sẻ vision của bạn cho M-SCI</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all duration-300 text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)] group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-rajdhani text-xl font-bold text-white mb-2 group-hover:text-[var(--accent-blue-bright)] transition-colors duration-300">Tham Gia Discord</h3>
              <p className="font-rajdhani text-white/70">Kết nối với cộng đồng developer</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all duration-300 text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)] group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="font-rajdhani text-xl font-bold text-white mb-2 group-hover:text-[var(--accent-blue-bright)] transition-colors duration-300">Bắt Đầu Đóng Góp</h3>
              <p className="font-rajdhani text-white/70">Chọn task phù hợp và bắt đầu sáng tạo</p>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="mt-10 text-center">
            <h3 className="font-orbitron text-xl font-bold text-white mb-6">Liên Hệ</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-white/90 hover:text-[var(--accent-blue-bright)] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-rajdhani">careers@msci.game</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 hover:text-[var(--accent-blue-bright)] transition-colors duration-300">
                <FaDiscord className="h-5 w-5" />
                <span className="font-rajdhani">discord.gg/msci-dev</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 hover:text-[var(--accent-blue-bright)] transition-colors duration-300">
                <FaLink className="h-5 w-5" />
                <span className="font-rajdhani">www.msci.game/careers</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mb-16 py-10 text-center">
          <h2 className="font-orbitron text-3xl font-bold text-white mb-6 text-shadow-blue">
            🚀 CÙNG TẠO NÊN TƯƠNG LAI GAME VIỆT
          </h2>
          <p className="font-rajdhani text-white/90 max-w-4xl mx-auto mb-8 text-lg">
            M-SCI không chỉ là một dự án game - đây là cơ hội để cùng nhau xây dựng một tựa game đẳng cấp quốc tế, do cộng đồng Việt Nam phát triển. Dù bạn là developer dày dạn kinh nghiệm hay người mới bắt đầu đam mê game, chúng tôi đều chào đón!
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 inline-block max-w-xl mx-auto">
            <p className="font-rajdhani text-xl text-[var(--accent-blue-bright)] font-bold italic mb-0">
              "Một người đi nhanh, nhiều người đi xa - Hãy cùng M-SCI tạo nên kỳ tích!"
            </p>
          </div>
        </div>
      </div>
      
      {/* Join Us Footer */}
      <div className="relative w-full overflow-hidden">
        {/* Battlefield Image Background */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <Image 
            src="/images/overwatch_bg_2.jpg" 
            alt="M-SCI battlefield" 
            fill
            sizes="100vw"
            className="object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 to-[#041019]/90"></div>
          
          <div className="absolute inset-0 z-10">
            <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-10 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
                CHIẾN ĐẤU VÌ TƯƠNG LAI NHÂN LOẠI. GIA NHẬP M-SCI!
              </h2>
              
              <Link 
                href="mailto:careers@msci.game"
                className="mt-4 mb-8 px-8 py-3 bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-lg shadow-lg hover:shadow-[#FF7D00]/50"
              >
                LIÊN HỆ NGAY
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
    </div>
  );
} 