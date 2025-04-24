"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaTasks, FaUsers, FaDragon, FaCoins } from "react-icons/fa";

export default function GuildMissions() {
  const missions = [
    {
      icon: <FaUsers className="text-4xl text-green-500" />,
      title: "Mở Rộng Guild",
      description: "Đạt mốc số lượng thành viên",
      rewards: "1,000 Chip + 50 Guild EXP"
    },
    {
      icon: <FaDragon className="text-4xl text-green-500" />,
      title: "Tiêu Diệt Boss Guild",
      description: "Hạ gục Boss tuần của Guild",
      rewards: "5,000 Chip + Boss Box + 200 Guild EXP"
    },
    {
      icon: <FaCoins className="text-4xl text-green-500" />,
      title: "Ngân Khố Guild",
      description: "Đóng góp M-Coin cho Guild",
      rewards: "Buff May Mắn +5% trong 1 giờ"
    }
  ];

  const treasuryItems = [
    "M-Coin từ đóng góp thành viên",
    "Item quý giá của Guild",
    "Tài nguyên đầu tư chiến lược"
  ];

  return (
    <motion.section 
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <div className="text-left mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-green-500 mb-4">
              🎯 NHIỆM VỤ GUILD - THỬ THÁCH TẬP THỂ
            </h2>
            <div className="w-20 h-1 bg-green-500"></div>
          </div>
          
          <div className="space-y-6">
            {missions.map((mission, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/70 border border-green-500/30 p-6 rounded-lg backdrop-blur-sm flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mr-4 mt-1">
                  {mission.icon}
                </div>
                <div>
                  <h3 className="font-orbitron text-xl font-bold text-white mb-1">
                    {mission.title}
                  </h3>
                  <p className="text-gray-300 mb-3 text-sm">
                    {mission.description}
                  </p>
                  <div className="bg-black/30 p-2 rounded">
                    <p className="text-green-400 text-sm font-medium">
                      <span className="mr-2">💎</span>
                      {mission.rewards}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="text-left mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-amber-500 mb-4">
              💰 NGÂN KHỐ GUILD - KHO BÁU CHUNG
            </h2>
            <div className="w-20 h-1 bg-amber-500"></div>
          </div>
          
          <motion.div
            className="bg-gradient-to-br from-amber-900/40 to-gray-900/70 border-2 border-amber-500/30 p-8 rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center">
                <FaCoins className="text-5xl text-amber-500" />
                <div className="absolute w-full h-full rounded-full border-2 border-amber-500/50 animate-ping"></div>
              </div>
            </div>
            
            <p className="text-center text-gray-300 mb-8">
              Ngân khố Guild là nơi lưu trữ tài nguyên chung của Guild, được sử dụng để nâng cấp và phát triển Guild.
              Mỗi thành viên đều có thể đóng góp để Guild ngày càng mạnh mẽ.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-orbitron text-xl font-bold text-amber-400 mb-3">
                Nội dung Ngân khố:
              </h3>
              <ul className="space-y-3">
                {treasuryItems.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-amber-500 mr-2">▪</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <div className="bg-gray-900/70 p-4 rounded-lg border border-amber-500/30">
                <p className="text-center text-amber-400 font-medium">
                  "Thịnh vượng của Guild là thịnh vượng của mỗi người"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
} 