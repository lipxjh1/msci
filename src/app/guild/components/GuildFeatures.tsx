"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaArrowUp, FaSearch } from "react-icons/fa";

export default function GuildFeatures() {
  const features = [
    {
      icon: <FaSearch className="text-4xl text-cyan-400" />,
      title: "Tham Gia Guild - Khởi Đầu Hành Trình",
      items: [
        "Tìm kiếm và gia nhập Guild phù hợp hoặc tự lập Guild riêng",
        "Xây dựng cộng đồng với tối đa 5,000 thành viên (ở level cao nhất)",
        "Quản lý thành viên linh hoạt: tuyển mộ, phê duyệt, loại bỏ"
      ]
    },
    {
      icon: <FaArrowUp className="text-4xl text-cyan-400" />,
      title: "Phát Triển Guild - Con Đường Đến Vinh Quang",
      items: [
        "Nâng cấp Guild từ Level 1 đến Level 10",
        "Mở khóa các buff sức mạnh cho toàn bộ thành viên",
        "Mở rộng số lượng thành viên và trận xâm lược mỗi ngày"
      ],
      details: [
        "Buff sát thương: Tăng đến 10% damage",
        "Buff may mắn: Tăng đến 10% tỷ lệ may mắn khi nâng cấp hero"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section 
      className="py-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="text-center mb-12">
        <h2 className="font-orbitron text-4xl font-bold text-cyan-400 mb-4">
          XÂY DỰNG ĐẾ CHẾ GUILD CỦA BẠN
        </h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="bg-gray-900/70 border border-cyan-800/50 p-8 rounded-lg backdrop-blur-sm"
          >
            <div className="flex items-center mb-6">
              {feature.icon}
              <h3 className="font-orbitron text-2xl font-semibold ml-4 text-white">
                {feature.title}
              </h3>
            </div>
            <ul className="space-y-3 mb-4">
              {feature.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            {feature.details && (
              <div className="mt-4 pl-4 border-l-2 border-cyan-500">
                {feature.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-cyan-300 my-2">
                    ○ {detail}
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
} 