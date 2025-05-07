"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GiSwordClash, GiCrossedSwords } from "react-icons/gi";
import { RiSwordFill } from "react-icons/ri";

export default function GuildWar() {
  const warTypes = [
    {
      title: "Daily War",
      description: "Diễn ra mỗi ngày một lần với tối đa 100 chiến binh từ mỗi Guild",
      color: "red",
      rewards: [
        "TOP 1: 100,000 Chip + Skin Box",
        "TOP 2: 50,000 Chip + Boss Box",
        "TOP 3: 20,000 Chip + Elite Box"
      ]
    },
    {
      title: "Invasion",
      description: "Chủ động tấn công Guild khác với 5-50 lượt xâm lược mỗi ngày",
      color: "purple",
      rewards: [
        "10,000 Chip + Character Box",
        "100 Guild EXP"
      ]
    },
    {
      title: "Declaration of War",
      description: "Chiến đấu cao cấp nhất với đặt cược 5,000 M-Coin",
      color: "amber",
      rewards: [
        "1,000 Guild EXP",
        "Attack Buff +10% trong 1 giờ",
        "Lucky Buff +5% khi nâng cấp hero"
      ]
    }
  ];

  return (
    <div className="mb-20 relative">
      {/* Decorative background effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white cyber-halo" style={{ fontFamily: 'var(--font-orbitron)' }}>
          <span className="text-shadow-blue relative inline-block">
            ⚔️ GUILD WAR - ĐẤU TRƯỜNG CỦA NHỮNG CHIẾN BINH
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {warTypes.map((type, index) => (
          <div 
            key={index} 
            className={`backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-${type.color}-500/20 shadow-xl`}
          >
            <h3 className="text-xl font-bold text-white mb-3 text-center" style={{ fontFamily: 'var(--font-orbitron)' }}>{type.title}</h3>
            <p className="font-be-vietnam-pro text-gray-300 mb-4 text-center">{type.description}</p>
            <div className="mt-4 p-3 bg-black/30 rounded-lg">
              <p className="text-amber-400 font-semibold mb-2 text-sm">Phần thưởng:</p>
              <ul className="font-be-vietnam-pro text-gray-300 space-y-1 text-sm">
                {type.rewards.map((reward, rewardIndex) => (
                  <li key={rewardIndex}>{reward}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="backdrop-blur-sm bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden border border-white/20">
            <Image 
              src="/images/guild/guild-war.jpg" 
              alt="Guild War"
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041019]/80 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="font-be-vietnam-pro text-white text-lg font-bold">Chiến đấu vì vinh quang</p>
            </div>
          </div>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>Lợi ích khi tham gia Guild War</h3>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span className="font-be-vietnam-pro">Buff sức mạnh: Tăng đến 10% damage</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span className="font-be-vietnam-pro">Buff may mắn: Tăng đến 10% tỷ lệ may mắn khi nâng cấp hero</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span className="font-be-vietnam-pro">Phần thưởng khổng lồ từ Guild War</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span className="font-be-vietnam-pro">Trải nghiệm chiến thuật trong các trận chiến quy mô lớn</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span className="font-be-vietnam-pro">Kết nối và chiến đấu cùng những người chơi cùng chí hướng</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 