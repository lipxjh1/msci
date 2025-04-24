"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GiSwordClash, GiCrossedSwords } from "react-icons/gi";
import { RiSwordFill } from "react-icons/ri";

export default function GuildWar() {
  const warTypes = [
    {
      icon: <GiSwordClash className="text-5xl text-red-500" />,
      title: "Daily War - Chiến Trận Hàng Ngày",
      description: "Diễn ra mỗi ngày một lần với tối đa 100 chiến binh từ mỗi Guild tham chiến",
      goal: "Mục tiêu: Tiêu diệt Sentinel của đối phương",
      rewards: [
        "TOP 1: 100,000 Chip + Skin Box + Guild War Box",
        "TOP 2: 50,000 Chip + Boss Box",
        "TOP 3: 20,000 Chip + Elite Box"
      ]
    },
    {
      icon: <RiSwordFill className="text-5xl text-purple-500" />,
      title: "Invasion - Xâm Lược Chiến Lược",
      description: "Chủ động tấn công Guild khác bất cứ lúc nào",
      details: "Số lượt xâm lược phụ thuộc vào level Guild (5-50 lần/ngày)",
      rewards: [
        "10,000 Chip + Character Box + Piece Ticket",
        "100 Guild EXP"
      ]
    },
    {
      icon: <GiCrossedSwords className="text-5xl text-amber-500" />,
      title: "Declaration of War - Tuyên Chiến Đặt Cược",
      description: "Hình thức chiến đấu cao cấp nhất với đặt cược 5,000 M-Coin",
      rewards: [
        "80% số M-Coin đối phương",
        "1,000 Guild EXP",
        "Attack Buff +10% trong 1 giờ",
        "Lucky Buff +5% khi nâng cấp hero"
      ]
    }
  ];

  return (
    <motion.section 
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-12">
        <h2 className="font-orbitron text-4xl font-bold text-red-500 mb-4">
          ⚔️ GUILD WAR - ĐẤU TRƯỜNG CỦA NHỮNG CHIẾN BINH
        </h2>
        <div className="w-24 h-1 bg-red-500 mx-auto"></div>
      </div>

      <div className="relative mb-16">
        <div className="h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/images/guild/guild-war.jpg"
            alt="Guild War"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 max-w-md">
          <h3 className="font-orbitron text-3xl font-bold text-white mb-4">
            Vinh Quang Chỉ Dành Cho Kẻ Mạnh
          </h3>
          <p className="text-lg text-gray-300">
            Chứng minh sức mạnh Guild của bạn trong các trận chiến khốc liệt và nhận những phần thưởng xứng đáng.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {warTypes.map((type, index) => (
          <motion.div 
            key={index}
            className="bg-gray-900/70 border-2 border-red-500/30 p-6 rounded-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              {type.icon}
            </div>
            <h3 className="font-orbitron text-xl text-center font-bold mb-4 text-white">
              {type.title}
            </h3>
            <p className="text-gray-300 mb-4 text-center">
              {type.description}
            </p>
            {type.goal && (
              <p className="text-red-400 mb-4 text-center font-medium">
                {type.goal}
              </p>
            )}
            {type.details && (
              <p className="text-gray-300 mb-4 text-center">
                {type.details}
              </p>
            )}
            <div className="p-4 bg-black/50 rounded-lg">
              <p className="text-amber-400 font-semibold mb-2">Phần thưởng:</p>
              <ul className="space-y-1">
                {type.rewards.map((reward, rewardIndex) => (
                  <li key={rewardIndex} className="text-gray-300 text-sm">
                    ✦ {reward}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
} 