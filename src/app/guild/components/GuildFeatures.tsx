"use client";

import { motion } from "framer-motion";
import { FaUsers, FaUserFriends } from 'react-icons/fa';
import { GiSwordClash, GiShield, GiDragonHead } from 'react-icons/gi';

export default function GuildFeatures() {
  const guildFeatures = [
    {
      icon: <FaUsers className="text-3xl text-cyan-400" />,
      title: "Xây Dựng Đế Chế",
      description: "Tham gia Guild hoặc tự lập Guild riêng với tối đa 5,000 thành viên ở level cao nhất"
    },
    {
      icon: <GiSwordClash className="text-3xl text-red-500" />,
      title: "Guild War",
      description: "Đấu trường khốc liệt nơi các Guild thể hiện sức mạnh và giành lấy phần thưởng khổng lồ"
    },
    {
      icon: <GiShield className="text-3xl text-blue-500" />,
      title: "Phòng Thủ Guild",
      description: "Xây dựng pháo đài bất khả xâm phạm với Guardian, Drone và Sentinel"
    },
    {
      icon: <GiDragonHead className="text-3xl text-green-500" />,
      title: "Nhiệm Vụ Guild",
      description: "Thử thách tập thể và ngân khố chung để phát triển Guild mạnh mẽ hơn"
    }
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="font-[var(--font-orbitron)] text-2xl md:text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            XÂY DỰNG ĐẾ CHẾ GUILD CỦA BẠN
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
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
              <h3 className="font-[var(--font-orbitron)] text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="font-be-vietnam-pro text-gray-300">{feature.description}</p>
            </div>
            <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-br from-[var(--accent-blue-bright)]/30 to-transparent rounded-tl-3xl"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 