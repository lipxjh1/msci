"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram, FaUsers, FaUserFriends } from 'react-icons/fa';
import { GiSwordClash, GiShield, GiDragonHead } from 'react-icons/gi';
import { motion } from "framer-motion";
import GuildIntro from "./components/GuildIntro";
import GuildFeatures from "./components/GuildFeatures";
import GuildWar from "./components/GuildWar";
import GuildDefense from "./components/GuildDefense";
import GuildMissions from "./components/GuildMissions";
import GuildBenefits from "./components/GuildBenefits";
import GuildCTA from "./components/GuildCTA";
import HeroBanner from "./components/HeroBanner";

export default function GuildPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
    <main className="min-h-screen bg-[#041019] text-white overflow-hidden">
      {/* Thanh điều hướng */}
      <div className="relative z-30">
        <ThanhDieuHuongResponsive />
      </div>
      
      {/* Hero Banner */}
      <HeroBanner />

      <div id="guild-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
        {/* Curved section top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041019] -translate-y-full"></div>
        
        {/* Guild Intro Section */}
        <GuildIntro />
        
        {/* Guild Features Section */}
        <GuildFeatures />
        
        {/* Guild War Section */}
        <GuildWar />
        
        {/* Guild Defense Section */}
        <GuildDefense />
        
        {/* Guild Missions Section */}
        <GuildMissions />
        
        {/* Guild Benefits Section */}
        <GuildBenefits />
      </div>
      
      {/* Call to Action */}
      <GuildCTA />
    </main>
  );
} 