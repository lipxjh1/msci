"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaSearch, FaGlobe, FaServer, FaGamepad, FaExchangeAlt, FaPalette, FaTools, FaChartBar, FaTrophy, FaBook, FaFire, FaCalendarAlt, FaUsers, FaChevronRight } from "react-icons/fa";

interface ForumSectionProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  counts?: string[];
  category: string;
}

export default function ForumPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("global");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
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
    scrollReveal();
    
    return () => window.removeEventListener('scroll', scrollReveal);
  }, []);

  const ForumSection = ({ icon, title, items, counts = [], category }: ForumSectionProps) => (
    <div className="mb-10 reveal-scale">
      <div className="flex items-center gap-2 mb-5 text-xl font-bold text-blue-400 relative">
        <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 w-2 h-10 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r-md"></div>
        {icon}
        <h2>{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item: string, index: number) => (
          <Link 
            href={`/forum/topic/${category}/${encodeURIComponent(item.toLowerCase().replace(/\s+/g, '-'))}`} 
            key={index} 
            className="block p-4 bg-gradient-to-br from-[#121626] to-[#0d1018] border border-blue-900/20 rounded-xl hover:border-blue-700/30 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-white text-lg">{item}</h3>
              <span className="flex items-center justify-center bg-blue-900/30 text-blue-300 text-xs font-bold rounded-full w-10 h-5 mt-1">
                {counts[index] ? parseInt(counts[index].replace(/,/g, '')).toLocaleString() : "0"}
              </span>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FaUsers className="text-xs" /> <span>{(Math.random() * 200 + 10).toFixed(0)} online</span>
              </div>
              <div className="text-blue-400 hover:text-blue-300 transition-colors">
                <FaChevronRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen">
      <style jsx global>{`
        /* Hiệu ứng Reveal */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        
        .reveal-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s ease;
        }
        
        .reveal-left.active {
          opacity: 1;
          transform: translateX(0);
        }
        
        .reveal-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s ease;
        }
        
        .reveal-right.active {
          opacity: 1;
          transform: translateX(0);
        }
        
        .reveal-scale {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.8s ease;
        }
        
        .reveal-scale.active {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>

      {/* Header mới với ảnh nền */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/overwatch_bg_2.jpg"
            alt="Forum Background"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0d14] z-10"></div>
        
        {/* Particle overlay */}
        <div className="absolute inset-0 z-10 opacity-30">
          <Image
            src="/images/particle_overlay.png"
            alt="Particle Overlay"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        
        <div className="relative bg-gradient-to-r from-blue-900/30 to-purple-900/30 py-16 z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center reveal">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/images/overwatch_logo.png"
                  alt="Overwatch Logo"
                  width={120}
                  height={120}
                  className="opacity-80"
                />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">DIỄN ĐÀN CỘNG ĐỒNG M-SCI TOÀN CẦU 🌍</h1>
              <p className="text-lg text-blue-200 mb-8">Nơi kết nối các chiến binh M-SCI trên toàn thế giới, chia sẻ chiến thuật và cùng phát triển</p>
              
              {/* Thống kê nhanh */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-4 border border-blue-800/30">
                  <div className="text-4xl font-bold text-white mb-1">2.3M+</div>
                  <div className="text-blue-300 text-sm">Thành viên</div>
                </div>
                <div className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-4 border border-blue-800/30">
                  <div className="text-4xl font-bold text-white mb-1">12.5M+</div>
                  <div className="text-blue-300 text-sm">Bài viết</div>
                </div>
                <div className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-4 border border-blue-800/30">
                  <div className="text-4xl font-bold text-white mb-1">234K+</div>
                  <div className="text-blue-300 text-sm">Chủ đề</div>
                </div>
                <div className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-4 border border-blue-800/30">
                  <div className="text-4xl font-bold text-white mb-1">45K+</div>
                  <div className="text-blue-300 text-sm">Online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Thông báo quan trọng với ảnh */}
        <div className="bg-gradient-to-r from-red-900/30 to-red-900/10 p-6 rounded-xl mb-10 border border-red-900/30 reveal relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 z-0">
            <Image
              src="/images/particle_overlay.png"
              alt="Particle Overlay"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="relative z-10">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-4 text-red-300">
              <FaFire size={24} className="text-red-400" />
              🔔 Thông Báo Quan Trọng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-900/20 rounded-lg flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">[NÓNG]</span>
                <div>
                  <p className="text-white">Cập nhật Giao thức X - Tính năng Neuralink mới cho đấu trường</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-red-300">
                    <FaCalendarAlt /> <span>28/11/2025</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-red-900/20 rounded-lg flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">[SỰ KIỆN]</span>
                <div>
                  <p className="text-white">Giải Vô địch Thế giới M-SCI 2025 - Vòng loại khu vực bắt đầu</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-red-300">
                    <FaCalendarAlt /> <span>30/11/2025</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-red-900/20 rounded-lg flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">[BẢO TRÌ]</span>
                <div>
                  <p className="text-white">Bảo trì máy chủ toàn cầu 30/04 - Nâng cấp hệ thống Kẻ Thăng Thiên</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-red-300">
                    <FaCalendarAlt /> <span>30/04/2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto mb-10 pb-2 space-x-1 reveal">
          {[
            { id: "global", icon: <FaGlobe />, name: "Khu Vực Quốc Tế", image: "/images/heroes/robot_3.png" },
            { id: "gameplay", icon: <FaGamepad />, name: "Nội Dung Trò Chơi", image: "/images/heroes/shoot1.png" },
            { id: "trade", icon: <FaExchangeAlt />, name: "Giao Dịch & Kinh Tế", image: "/images/heroes/robot_4.png" },
            { id: "creative", icon: <FaPalette />, name: "Góc Sáng Tạo", image: "/images/heroes/idle_1.png" },
            { id: "support", icon: <FaTools />, name: "Hỗ Trợ Kỹ Thuật", image: "/images/heroes/robot bc.png" }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-lg whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                ? "bg-gradient-to-r from-blue-700 to-indigo-700 shadow-md shadow-blue-900/30 text-white"
                : "bg-[#121626] text-gray-300 hover:bg-[#1a1f36]"
              }`}
            >
              <span className="flex items-center gap-2">
                {activeTab === tab.id ? (
                  <div className="relative h-5 w-5 overflow-hidden rounded-full">
                    <Image
                      src={tab.image}
                      alt={tab.name}
                      width={20}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                ) : tab.icon}
                {tab.name}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "global" && (
          <div>
            <ForumSection 
              icon={<FaGlobe />}
              title="Thảo Luận Toàn Cầu"
              category="global"
              items={[
                "Diễn đàn Tiếng Anh 🇬🇧",
                "Diễn đàn Tiếng Trung 🇨🇳",
                "Diễn đàn Tiếng Nhật 🇯🇵",
                "Diễn đàn Tiếng Hàn 🇰🇷",
                "Diễn đàn Tiếng Việt 🇻🇳",
                "Ngôn ngữ khác 🌍"
              ]}
              counts={["15,234", "12,567", "8,901", "7,654", "6,789", "4,321"]}
            />
            
            {/* Banner trung gian */}
            <div className="my-12 relative h-32 rounded-xl overflow-hidden reveal">
              <Image
                src="/images/overwatch_bg_2.jpg"
                alt="Banner"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-indigo-900/70"></div>
              <div className="absolute inset-0 flex items-center px-8">
                <div className="w-16 h-16 mr-6 relative hidden md:block">
                  <Image
                    src="/images/heroes/robot_3.png"
                    alt="Robot"
                    width={64}
                    height={64}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Tham gia Diễn đàn Quốc tế</h3>
                  <p className="text-blue-200">Kết nối với người chơi từ hơn 180 quốc gia trên toàn thế giới</p>
                </div>
              </div>
            </div>
            
            <ForumSection 
              icon={<FaServer />}
              title="Máy Chủ Khu Vực"
              category="servers"
              items={[
                "Châu Á - Thái Bình Dương",
                "Châu Âu",
                "Châu Mỹ",
                "Trung Đông & Châu Phi"
              ]}
              counts={["8,435", "6,754", "5,321", "3,987"]}
            />
          </div>
        )}

        {activeTab === "gameplay" && (
          <div>
            <ForumSection 
              icon={<FaBook />}
              title="Cốt Truyện & Truyền Thuyết"
              category="story"
              items={[
                "Bí ẩn về Kẻ Thăng Thiên",
                "Tiểu sử Nhân vật",
                "Elon Musk & Nguồn gốc M-SCI",
                "Giả thuyết & Suy đoán của Fan"
              ]}
              counts={["3,456", "2,789", "1,234", "4,567"]}
            />
            
            <ForumSection 
              icon={<FaGamepad />}
              title="Chiến Thuật & Hướng Dẫn"
              category="tactics"
              items={[
                "Phân tích Meta",
                "Xây dựng Nhân vật",
                "Đội hình Chiến đấu",
                "Cơ chế Nâng cao"
              ]}
              counts={["5,678", "4,321", "3,890", "2,345"]}
            />
            
            <ForumSection 
              icon={<FaTrophy />}
              title="Đấu Trường & Thi Đấu"
              category="competition"
              items={[
                "Thảo luận Giải đấu",
                "Chiến thuật Leo hạng",
                "Tuyển mộ Đội",
                "Phân tích Trận đấu"
              ]}
              counts={["6,789", "5,432", "3,210", "4,567"]}
            />
          </div>
        )}

        {activeTab === "trade" && (
          <div>
            <ForumSection 
              icon={<FaExchangeAlt />}
              title="Chợ NFT"
              category="nft"
              items={[
                "Mua bán Nhân vật",
                "Trao đổi Trang phục",
                "Chợ Vật phẩm",
                "Thảo luận Giá cả"
              ]}
              counts={["8,901", "7,654", "6,543", "5,432"]}
            />
            
            <ForumSection 
              icon={<FaExchangeAlt />}
              title="Tiền Mã Hóa & Token"
              category="crypto"
              items={[
                "Token $MSCI",
                "Staking & Farming",
                "Tích hợp DeFi",
                "Hỗ trợ Ví điện tử"
              ]}
              counts={["4,321", "3,210", "2,345", "1,890"]}
            />
          </div>
        )}

        {activeTab === "creative" && (
          <div>
            <ForumSection 
              icon={<FaPalette />}
              title="Sáng Tạo Cộng Đồng"
              category="creative"
              items={[
                "Phòng tranh Fan Art",
                "Trưng bày Cosplay",
                "Nội dung Video",
                "Âm nhạc & Remix"
              ]}
              counts={["9,876", "5,432", "7,890", "3,456"]}
            />
            
            <ForumSection 
              icon={<FaPalette />}
              title="Trung Tâm Người Sáng Tạo"
              category="creators"
              items={[
                "Mẹo Phát trực tiếp",
                "Chiến lược YouTube",
                "Kiếm tiền từ Nội dung",
                "Yêu cầu Hợp tác"
              ]}
              counts={["4,567", "3,890", "2,789", "1,987"]}
            />
          </div>
        )}

        {activeTab === "support" && (
          <div>
            <ForumSection 
              icon={<FaTools />}
              title="Báo Lỗi"
              category="bugs"
              items={[
                "Vấn đề Nghiêm trọng",
                "Vấn đề Hiệu năng",
                "Vấn đề Kết nối",
                "Tối ưu Di động"
              ]}
              counts={["2,345", "1,890", "1,567", "1,234"]}
            />
            
            <ForumSection 
              icon={<FaTools />}
              title="Đề Xuất Tính Năng"
              category="features"
              items={[
                "Gợi ý Gameplay",
                "Cải thiện Giao diện",
                "Ý tưởng Nhân vật mới",
                "Sự kiện Cộng đồng"
              ]}
              counts={["3,456", "2,789", "2,345", "1,987"]}
            />
          </div>
        )}

        {/* Lãnh đạo cộng đồng - Nâng cấp với ảnh thật */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#121626] to-[#0d1018] rounded-xl border border-blue-900/20 reveal relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <Image
              src="/images/grid_pattern.svg"
              alt="Grid Pattern"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          
          <h2 className="flex items-center gap-2 text-xl font-bold mb-6 text-blue-400 relative z-10">
            <FaTrophy />
            🏆 Lãnh Đạo Cộng Đồng
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div>
              <h3 className="text-lg font-medium mb-4 text-white">Quản Trị Viên Toàn Cầu</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-900/10 rounded-lg">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/images/heroes/elon_musk.png"
                        alt="PhượngHoàng_BấtTử"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute -top-1 -right-1 text-yellow-400">🌟</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">PhượngHoàng_BấtTử</p>
                    <p className="text-sm text-blue-300">Quản trị viên Trưởng</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-900/10 rounded-lg">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/images/heroes/robot_3.png"
                        alt="RồngThầnTối"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute -top-1 -right-1 text-yellow-400">🌟</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">RồngThầnTối</p>
                    <p className="text-sm text-blue-300">Quản lý Cộng đồng</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-900/10 rounded-lg">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/images/heroes/drone_2.png"
                        alt="HiềnGiảViễnTưởng"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute -top-1 -right-1 text-yellow-400">🌟</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">HiềnGiảViễnTưởng</p>
                    <p className="text-sm text-blue-300">Trưởng phòng Kỹ thuật</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-white">Đóng Góp Hàng Đầu</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-900/10 rounded-lg">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/images/heroes/idle 5.png"
                        alt="NgườiThăngThiên"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute -top-1 -right-1 text-yellow-400">🥇</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white">NgườiThăngThiên</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-blue-300">15,678 bài viết</p>
                      <div className="bg-amber-400/20 rounded-full px-2 py-0.5 text-amber-300 text-xs font-bold">
                        TOP 1
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-900/10 rounded-lg">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/images/heroes/idle4.png"
                        alt="ChủNhânGiaoThức"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute -top-1 -right-1 text-gray-300">🥈</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white">ChủNhânGiaoThức</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-blue-300">12,345 bài viết</p>
                      <div className="bg-gray-400/20 rounded-full px-2 py-0.5 text-gray-300 text-xs font-bold">
                        TOP 2
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-900/10 rounded-lg">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/images/heroes/robot quais.png"
                        alt="FanCứngElon"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute -top-1 -right-1 text-amber-600">🥉</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white">FanCứngElon</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-blue-300">10,987 bài viết</p>
                      <div className="bg-amber-700/20 rounded-full px-2 py-0.5 text-amber-500 text-xs font-bold">
                        TOP 3
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Banner phía dưới */}
        <div className="mt-12 relative h-48 rounded-xl overflow-hidden reveal">
          <Image
            src="/images/staking_bg.jpg"
            alt="Join Banner"
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
          <div className="absolute inset-0 flex items-center justify-between px-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">Trở thành thành viên của cộng đồng M-SCI</h3>
              <p className="text-blue-200 mb-4">Tham gia hàng triệu người chơi khác và khám phá thế giới M-SCI ngay hôm nay</p>
              <button className="bg-white text-blue-900 hover:bg-blue-50 font-medium py-2 px-6 rounded-lg transition-colors">
                Đăng ký miễn phí
              </button>
            </div>
            <div className="hidden md:block w-48 h-48 relative">
              <Image
                src="/images/heroes/shoot6.png"
                alt="Hero"
                width={192}
                height={192}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 