"use client";

import { FaUsers } from 'react-icons/fa';
import { GiShield, GiDragonHead } from 'react-icons/gi';

export default function GuildDefense() {
  const defenseUnits = [
    {
      icon: <GiShield className="text-2xl text-blue-400" />,
      title: "Guardian",
      description: "Lính gác mạnh mẽ với khả năng phòng thủ vượt trội",
      color: "blue",
      features: [
        "Nâng cấp từ Level 1 đến Level 10",
        "Mỗi cấp tăng HP/Shield và số lượng",
        "Tự động tham chiến trong Guild War"
      ]
    },
    {
      icon: <FaUsers className="text-2xl text-teal-400" />,
      title: "Drone",
      description: "Đơn vị tấn công nhanh nhẹn với tầm xa",
      color: "teal",
      features: [
        "Nâng cấp từ Level 1 đến Level 10",
        "Tăng sát thương và tốc độ theo cấp",
        "Hỗ trợ tầm xa cho Guardian"
      ]
    },
    {
      icon: <GiDragonHead className="text-2xl text-indigo-400" />,
      title: "Sentinel",
      description: "Trái tim của Guild - Mục tiêu then chốt cần bảo vệ",
      color: "indigo",
      features: [
        "Nâng cấp để tăng HP lên đến 10,000,000",
        "Sở hữu khả năng phản công mạnh mẽ",
        "Mất Sentinel đồng nghĩa với thất bại"
      ]
    }
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            🛡️ XÂY DỰNG PHÁO ĐÀI BẤT KHẢ XÂM PHẠM
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {defenseUnits.map((unit, index) => (
          <div 
            key={index} 
            className={`backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-${unit.color}-500/20 shadow-xl`}
          >
            <div className="flex justify-center mb-4">
              <div className={`p-3 bg-${unit.color}-900/30 rounded-full`}>
                {unit.icon}
              </div>
            </div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-3 text-center">{unit.title}</h3>
            <p className={`font-be-vietnam-pro text-${unit.color}-300 text-center mb-4`}>{unit.description}</p>
            <ul className="space-y-2">
              {unit.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <span className={`text-${unit.color}-400 mr-2`}>•</span>
                  <span className="font-be-vietnam-pro text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="backdrop-blur-sm bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl">
        <div className="text-center mb-6">
          <h3 className="font-orbitron text-2xl font-bold text-white mb-2">
            Chiến Lược Phòng Thủ
          </h3>
          <p className="font-be-vietnam-pro text-gray-300 max-w-3xl mx-auto">
            Thiết lập một hệ thống phòng thủ vững chắc là chìa khóa để bảo vệ Guild của bạn khỏi những cuộc tấn công từ Guild đối phương. Kết hợp hiệu quả các đơn vị phòng thủ để tối ưu hóa sức mạnh của Guild.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
            <p className="text-cyan-400 font-semibold mb-2">Giai đoạn 1</p>
            <p className="font-be-vietnam-pro text-gray-300 text-sm">Nâng cấp Sentinel để tăng HP cơ bản</p>
          </div>
          <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
            <p className="text-cyan-400 font-semibold mb-2">Giai đoạn 2</p>
            <p className="font-be-vietnam-pro text-gray-300 text-sm">Đầu tư vào Guardian để tạo lớp phòng thủ đầu tiên</p>
          </div>
          <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
            <p className="text-cyan-400 font-semibold mb-2">Giai đoạn 3</p>
            <p className="font-be-vietnam-pro text-gray-300 text-sm">Bổ sung Drone để hỗ trợ tấn công từ xa</p>
          </div>
          <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
            <p className="text-cyan-400 font-semibold mb-2">Giai đoạn 4</p>
            <p className="font-be-vietnam-pro text-gray-300 text-sm">Cân bằng và tối ưu hóa toàn bộ hệ thống phòng thủ</p>
          </div>
        </div>
      </div>
    </div>
  );
} 