"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GiRobotGolem, GiTowerFall } from "react-icons/gi";
import { FaRobot } from "react-icons/fa";

export default function GuildDefense() {
  const defenseUnits = [
    {
      icon: <GiRobotGolem className="text-5xl text-blue-500" />,
      title: "Guardian",
      description: "Lính gác mạnh mẽ với khả năng phòng thủ vượt trội",
      features: [
        "Nâng cấp từ Level 1 đến Level 10",
        "Mỗi cấp tăng HP/Shield và số lượng",
        "Tự động tham chiến khi Guild bị tấn công"
      ]
    },
    {
      icon: <FaRobot className="text-5xl text-teal-500" />,
      title: "Drone",
      description: "Đơn vị tấn công nhanh nhẹn với tầm xa",
      features: [
        "Nâng cấp từ Level 1 đến Level 10",
        "Tăng sát thương và tốc độ theo cấp",
        "Hỗ trợ tầm xa cho Guardian"
      ]
    },
    {
      icon: <GiTowerFall className="text-5xl text-indigo-500" />,
      title: "Sentinel",
      description: "Trái tim của Guild - Mục tiêu then chốt cần bảo vệ",
      features: [
        "Nâng cấp để tăng HP lên đến 10,000,000",
        "Sở hữu khả năng phản công mạnh mẽ",
        "Mất Sentinel đồng nghĩa với thất bại"
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
        <h2 className="font-orbitron text-4xl font-bold text-blue-500 mb-4">
          🛡️ XÂY DỰNG PHÁO ĐÀI BẤT KHẢ XÂM PHẠM
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
      </div>

      <div className="relative my-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {defenseUnits.map((unit, index) => (
            <motion.div 
              key={index}
              className="bg-gray-900/70 border border-blue-500/30 p-6 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-900/30 rounded-full">
                  {unit.icon}
                </div>
              </div>
              <h3 className="font-orbitron text-2xl text-center font-bold mb-2 text-white">
                {unit.title}
              </h3>
              <p className="text-blue-300 text-center mb-4">
                {unit.description}
              </p>
              <ul className="space-y-2">
                {unit.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 bg-gray-900/50 rounded-xl p-8 border border-blue-500/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-orbitron text-3xl font-bold text-blue-400 mb-6">
              Chiến Thuật Phòng Thủ
            </h3>
            <p className="text-gray-300 mb-4">
              Sắp xếp Guardian và Drone một cách chiến lược sẽ quyết định thắng lợi trong Guild War. Xây dựng hệ thống phòng thủ hùng mạnh và trở thành pháo đài không thể xâm phạm!
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span className="text-gray-300">Nâng cấp đều các đơn vị phòng thủ</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span className="text-gray-300">Ưu tiên bảo vệ Sentinel bằng mọi giá</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span className="text-gray-300">Kết hợp Guardian và Drone hợp lý</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="/images/guild/guild-defense.jpg"
              alt="Guild Defense"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <p className="text-xl font-orbitron text-white">
                  Bảo Vệ Danh Dự Guild
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
} 