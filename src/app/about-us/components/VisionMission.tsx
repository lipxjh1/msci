"use client";

import { FaCheckCircle } from "react-icons/fa";

export default function VisionMission() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      {/* Vision */}
      <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="font-orbitron text-xl font-bold text-white">TẦM NHÌN</h3>
        </div>
        <p className="ml-16 text-gray-300">
          Trở thành studio game hàng đầu Việt Nam, tiên phong trong việc kết hợp công nghệ blockchain với trải nghiệm game AAA, 
          tạo ra một hệ sinh thái game bền vững và công bằng cho mọi người chơi.
        </p>
      </div>
      
      {/* Mission */}
      <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </div>
          <h3 className="font-orbitron text-xl font-bold text-white">SỨ MỆNH</h3>
        </div>
        <ul className="ml-16 text-gray-300 space-y-2">
          <li className="flex items-start">
            <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
            <span>Xây dựng game chất lượng cao với cốt truyện sâu sắc</span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
            <span>Tạo cộng đồng game thủ gắn kết và năng động</span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
            <span>Đổi mới mô hình phát triển game theo hướng cộng đồng</span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
            <span>Ứng dụng công nghệ blockchain một cách có trách nhiệm</span>
          </li>
        </ul>
      </div>
    </div>
  );
} 