"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaTrophy, FaChessKnight, FaUserFriends, FaRocket } from "react-icons/fa";

export default function GuildBenefits() {
  const benefits = [
    {
      icon: <FaUsers className="text-4xl text-purple-500" />,
      title: "Sức mạnh từ cộng đồng",
      description: "Buff tăng sức mạnh cho mọi thành viên"
    },
    {
      icon: <FaTrophy className="text-4xl text-purple-500" />,
      title: "Phần thưởng khổng lồ",
      description: "Chip, Skin Box, item hiếm từ Guild War"
    },
    {
      icon: <FaChessKnight className="text-4xl text-purple-500" />,
      title: "Trải nghiệm chiến thuật",
      description: "Phối hợp trong các trận chiến quy mô lớn"
    },
    {
      icon: <FaUserFriends className="text-4xl text-purple-500" />,
      title: "Kết nối xã hội",
      description: "Gặp gỡ và chiến đấu cùng những người chơi cùng chí hướng"
    },
    {
      icon: <FaRocket className="text-4xl text-purple-500" />,
      title: "Cơ hội phát triển",
      description: "Nâng cấp hero nhanh hơn với các buff Guild"
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
        <h2 className="font-orbitron text-4xl font-bold text-purple-500 mb-4">
          TẠI SAO NÊN THAM GIA GUILD?
        </h2>
        <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index}
            className="bg-gray-900/70 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-purple-900/30 rounded-full mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-orbitron text-xl font-bold mb-2 text-white">
                {benefit.title}
              </h3>
              <p className="text-gray-300">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-16 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-8 rounded-xl border border-purple-500/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
            Trong M-SCI, không có anh hùng đơn độc - chỉ có những Guild hùng mạnh!
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Hãy tham gia hoặc tạo Guild của riêng bạn ngay hôm nay. Cùng nhau xây dựng một đế chế bất khả chiến bại và khẳng định vị thế trong vũ trụ M-SCI!
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
} 