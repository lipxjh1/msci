"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaTasks, FaUsers, FaDragon, FaCoins } from "react-icons/fa";
import Image from "next/image";

export default function GuildMissions() {
  const missions = [
    {
      title: "Nhiệm Vụ Hàng Ngày",
      description: "Hoàn thành nhiệm vụ hàng ngày để nhận Guild EXP và tài nguyên quý giá",
      rewards: "Reward: 100 Guild EXP, 1,000 Chip, Resource Box"
    },
    {
      title: "Thử Thách Guild",
      description: "Chiến đấu cùng đồng đội để đánh bại boss thử thách mỗi tuần",
      rewards: "Reward: 500 Guild EXP, Guild Boss Box, Random Piece"
    },
    {
      title: "Xâm Lược Lãnh Thổ",
      description: "Mở rộng lãnh thổ Guild bằng cách chiếm đóng vùng đất mới",
      rewards: "Reward: Guild Resource, Territory Buff, Resource Generation"
    },
    {
      title: "Đóng Góp Guild",
      description: "Đóng góp tài nguyên để nghiên cứu công nghệ và nâng cấp Guild",
      rewards: "Reward: Guild Tokens, Contribution Points, Technology Progress"
    }
  ];

  const treasuryItems = [
    "M-Coin từ đóng góp thành viên",
    "Item quý giá của Guild",
    "Tài nguyên đầu tư chiến lược"
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            NHIỆM VỤ GUILD - HÀNH TRÌNH CÙNG PHÁT TRIỂN
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {missions.map((mission, index) => (
          <div 
            key={index} 
            className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl group hover:border-cyan-500/30 transition-all duration-300"
          >
            <h3 className="font-orbitron text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{mission.title}</h3>
            <p className="font-be-vietnam-pro text-gray-300 mb-4">{mission.description}</p>
            <div className="p-3 bg-black/30 rounded-lg">
              <p className="font-be-vietnam-pro text-amber-400 text-sm">{mission.rewards}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="backdrop-blur-sm bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="prose prose-lg prose-invert max-w-none">
            <h3 className="font-orbitron text-2xl text-white mb-4">Ngân Khố Guild</h3>
            <p className="font-be-vietnam-pro text-gray-200 leading-relaxed">
              Tất cả thành viên Guild có thể đóng góp vào ngân khố chung - nơi tích lũy tài nguyên để phát triển Guild.
              Mỗi đóng góp đều được ghi nhận và thành viên đóng góp nhiều sẽ nhận được phần thưởng xứng đáng.
            </p>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="text-cyan-400 font-semibold mb-2">Tổng Tài Nguyên</p>
                <p className="font-be-vietnam-pro text-gray-300 text-sm">Chi tiêu hợp lý cho nâng cấp và nghiên cứu</p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="text-cyan-400 font-semibold mb-2">Hệ Thống Đóng Góp</p>
                <p className="font-be-vietnam-pro text-gray-300 text-sm">Top Contributors nhận thưởng mỗi tuần</p>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden border border-white/20">
            <Image 
              src="/images/guild/guild-missions.jpg" 
              alt="Guild Missions"
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041019]/80 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="font-be-vietnam-pro text-white text-lg font-bold">Đoàn kết - Thử thách - Phát triển</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 