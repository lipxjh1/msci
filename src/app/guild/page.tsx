"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram, FaUsers, FaUserFriends } from 'react-icons/fa';
import { GiSwordClash, GiShield, GiDragonHead } from 'react-icons/gi';
import { motion } from "framer-motion";

export default function GuildPage() {
  const guildFeatures = [
    {
      icon: <FaUsers className="text-2xl text-cyan-400" />,
      title: "Xây Dựng Đế Chế",
      description: "Tham gia Guild hoặc tự lập Guild riêng với tối đa 5,000 thành viên ở level cao nhất"
    },
    {
      icon: <GiSwordClash className="text-2xl text-red-500" />,
      title: "Guild War",
      description: "Đấu trường khốc liệt nơi các Guild thể hiện sức mạnh và giành lấy phần thưởng khổng lồ"
    },
    {
      icon: <GiShield className="text-2xl text-blue-500" />,
      title: "Phòng Thủ Guild",
      description: "Xây dựng pháo đài bất khả xâm phạm với Guardian, Drone và Sentinel"
    },
    {
      icon: <GiDragonHead className="text-2xl text-green-500" />,
      title: "Nhiệm Vụ Guild",
      description: "Thử thách tập thể và ngân khố chung để phát triển Guild mạnh mẽ hơn"
    }
  ];

  const guildBenefits = [
    "Buff sức mạnh: Tăng đến 10% damage",
    "Buff may mắn: Tăng đến 10% tỷ lệ may mắn khi nâng cấp hero",
    "Phần thưởng khổng lồ từ Guild War",
    "Trải nghiệm chiến thuật trong các trận chiến quy mô lớn",
    "Kết nối và chiến đấu cùng những người chơi cùng chí hướng"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Hero Banner */}
      <div className="relative h-[100vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/30 to-[#041019] z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/guild/guild-hero.jpg')] bg-cover bg-center bg-no-repeat">
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse delay-200"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse delay-300"></div>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
          <h1 className="font-sans text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
            <span className="relative inline-block">
              GUILD
              <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h1>
          <p className="font-mono text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in text-center">
            HỆ THỐNG GUILD - NƠI ANH HÙNG HỘI TỤ<br />
            XÂY DỰNG ĐẾ CHẾ, CHINH PHỤC VŨ TRỤ CÙNG BANG HỘI
          </p>
          
          {/* Nút cuộn xuống */}
          <div className="animate-slide-up">
            <button 
              onClick={() => document.getElementById('guild-content')?.scrollIntoView({behavior: 'smooth'})}
              className="font-mono font-bold tracking-wider text-shadow-sm px-10 py-3 button-cyber clip-hexagon hexagon-border text-white"
            >
              KHÁM PHÁ GUILD
            </button>
          </div>
        </div>
      </div>

      <div id="guild-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
        {/* Curved section top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041019] -translate-y-full"></div>
        
        {/* Giới thiệu */}
        <div className="mb-16 backdrop-blur-sm bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl">
          <div className="flex justify-center mb-8">
            <h2 className="font-sans text-3xl font-bold text-white cyber-halo">
              <span className="text-shadow-blue relative inline-block">
                TRONG THẾ GIỚI M-SCI NĂM 2049
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
          </div>
          <p className="text-gray-300 text-center max-w-4xl mx-auto mb-8 text-lg font-sans">
            Không anh hùng đơn độc nào có thể đánh bại được đội quân robot và drone của X-Corp.
            Hệ thống Guild chính là nơi các chiến binh tập hợp, xây dựng sức mạnh tập thể và
            cùng nhau viết nên những huyền thoại bất diệt!
          </p>
          <div className="border-t border-cyan-500/20 pt-8 mt-8">
            <p className="text-center text-2xl font-sans text-cyan-400 mb-2">
              🏰 Guild - Gia Đình Thứ Hai Của Bạn
            </p>
            <p className="text-center text-white font-sans">
              "Đoàn kết là sức mạnh - Guild là gia đình - Chiến thắng là vinh quang!"
            </p>
          </div>
        </div>

        {/* Tính năng Guild */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl font-bold text-white cyber-halo mb-2">
              <span className="text-shadow-blue">
                XÂY DỰNG ĐẾ CHẾ GUILD CỦA BẠN
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guildFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl overflow-hidden relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue-bright)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-4 p-3 bg-white/5 rounded-full inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="font-sans text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 font-sans">{feature.description}</p>
                </div>
                <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-br from-[var(--accent-blue-bright)]/30 to-transparent rounded-tl-3xl"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Guild War Section */}
        <div className="mb-20 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl font-bold text-white cyber-halo mb-2">
              <span className="text-shadow-blue">
                ⚔️ GUILD WAR - ĐẤU TRƯỜNG CỦA NHỮNG CHIẾN BINH
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-red-500/20 shadow-xl">
              <h3 className="font-sans text-xl font-bold text-white mb-3 text-center">Daily War</h3>
              <ul className="space-y-2 text-gray-300 font-sans">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Diễn ra mỗi ngày một lần</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Tối đa 100 chiến binh từ mỗi Guild</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Mục tiêu: Tiêu diệt Sentinel đối phương</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-black/30 rounded-lg">
                <p className="text-amber-400 font-semibold mb-2 text-sm">Phần thưởng:</p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>TOP 1: 100,000 Chip + Skin Box</li>
                  <li>TOP 2: 50,000 Chip + Boss Box</li>
                  <li>TOP 3: 20,000 Chip + Elite Box</li>
                </ul>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-purple-500/20 shadow-xl">
              <h3 className="font-sans text-xl font-bold text-white mb-3 text-center">Invasion</h3>
              <ul className="space-y-2 text-gray-300 font-sans">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Chủ động tấn công Guild khác</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>5-50 lượt xâm lược mỗi ngày</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Số lượt phụ thuộc vào level Guild</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-black/30 rounded-lg">
                <p className="text-amber-400 font-semibold mb-2 text-sm">Phần thưởng:</p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>10,000 Chip + Character Box</li>
                  <li>100 Guild EXP</li>
                </ul>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-amber-500/20 shadow-xl">
              <h3 className="font-sans text-xl font-bold text-white mb-3 text-center">Declaration of War</h3>
              <ul className="space-y-2 text-gray-300 font-sans">
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span>Chiến đấu cao cấp nhất</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span>Đặt cược 5,000 M-Coin</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span>Kẻ chiến thắng nhận 80% M-Coin đối thủ</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-black/30 rounded-lg">
                <p className="text-amber-400 font-semibold mb-2 text-sm">Phần thưởng:</p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>1,000 Guild EXP</li>
                  <li>Attack Buff +10% trong 1 giờ</li>
                  <li>Lucky Buff +5% khi nâng cấp hero</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-sm bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-sans text-2xl font-bold text-white mb-4">Lợi ích khi tham gia Guild</h3>
                <ul className="space-y-3 text-gray-300 font-sans">
                  {guildBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/images/guild/guild-team.jpg"
                  alt="Guild Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <p className="text-xl font-sans text-white">
                      Chiến đấu cùng đồng đội. Chiến thắng cùng Guild.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phòng thủ Guild */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl font-bold text-white cyber-halo mb-2">
              <span className="text-shadow-blue">
                🛡️ XÂY DỰNG PHÁO ĐÀI BẤT KHẢ XÂM PHẠM
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-blue-500/20 shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-900/30 rounded-full">
                  <GiShield className="text-2xl text-blue-400" />
                </div>
              </div>
              <h3 className="font-sans text-xl font-bold text-white mb-3 text-center">Guardian</h3>
              <p className="text-blue-300 text-center mb-4">Lính gác mạnh mẽ với khả năng phòng thủ vượt trội</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Nâng cấp từ Level 1 đến Level 10</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Mỗi cấp tăng HP/Shield và số lượng</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Tự động tham chiến trong Guild War</span>
                </li>
              </ul>
            </div>

            <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-teal-500/20 shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-teal-900/30 rounded-full">
                  <FaUsers className="text-2xl text-teal-400" />
                </div>
              </div>
              <h3 className="font-sans text-xl font-bold text-white mb-3 text-center">Drone</h3>
              <p className="text-teal-300 text-center mb-4">Đơn vị tấn công nhanh nhẹn với tầm xa</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Nâng cấp từ Level 1 đến Level 10</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Tăng sát thương và tốc độ theo cấp</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Hỗ trợ tầm xa cho Guardian</span>
                </li>
              </ul>
            </div>

            <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-indigo-500/20 shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-indigo-900/30 rounded-full">
                  <GiDragonHead className="text-2xl text-indigo-400" />
                </div>
              </div>
              <h3 className="font-sans text-xl font-bold text-white mb-3 text-center">Sentinel</h3>
              <p className="text-indigo-300 text-center mb-4">Trái tim của Guild - Mục tiêu then chốt cần bảo vệ</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Nâng cấp để tăng HP lên đến 10,000,000</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Sở hữu khả năng phản công mạnh mẽ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Mất Sentinel đồng nghĩa với thất bại</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-20">
          <div className="backdrop-blur-sm bg-gradient-to-r from-cyan-900/20 to-purple-900/20 p-8 rounded-xl border border-cyan-500/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
            
            <div className="text-center">
              <h2 className="font-sans text-3xl font-bold text-white mb-6">
                BẮT ĐẦU HÀNH TRÌNH GUILD CỦA BẠN
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto mb-8 font-sans text-lg">
                Trong M-SCI, không có anh hùng đơn độc - chỉ có những Guild hùng mạnh! Hãy tham gia hoặc tạo Guild của riêng bạn ngay hôm nay. Cùng nhau xây dựng một đế chế bất khả chiến bại!
              </p>
              <button className="px-8 py-3 bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium rounded transition-colors uppercase tracking-wider text-lg shadow-lg hover:shadow-[#FF7D00]/50">
                CHƠI NGAY
              </button>
            </div>
          </div>
        </div>
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
          
          <div className="absolute inset-0 z-10">
            <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-10 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
                CHIẾN ĐẤU VÌ TƯƠNG LAI NHÂN LOẠI. GIA NHẬP M-SCI!
              </h2>
              
              <Link 
                href="/play"
                className="mt-4 mb-8 px-8 py-3 bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-lg shadow-lg hover:shadow-[#FF7D00]/50"
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
    </div>
  );
} 