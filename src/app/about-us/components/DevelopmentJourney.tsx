"use client";

import { FaCheckCircle } from "react-icons/fa";

export default function DevelopmentJourney() {
  return (
    <div className="mb-16">
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            HÀNH TRÌNH PHÁT TRIỂN
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 2023 */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300">
          <div className="flex flex-col">
            <div className="bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white font-bold py-2 px-4 rounded-lg inline-block w-fit mb-4">
              2023 - Khởi Đầu
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Thành lập team core với 5 thành viên</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Phát triển concept và prototype đầu tiên</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Nhận được funding seed round</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 2024 */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300">
          <div className="flex flex-col">
            <div className="bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white font-bold py-2 px-4 rounded-lg inline-block w-fit mb-4">
              2024 - Phát Triển & Mở Rộng
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Ra mắt bản Alpha với 1000 người chơi</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Mở rộng team lên 20+ thành viên</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Tích hợp công nghệ blockchain</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Launch bản Beta với 10,000+ pre-registration</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 2025 */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300">
          <div className="flex flex-col">
            <div className="bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white font-bold py-2 px-4 rounded-lg inline-block w-fit mb-4">
              2025 - Tương Lai
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Chính thức ra mắt toàn cầu</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Mở rộng sang thị trường quốc tế</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Phát triển M-SCI Universe với nhiều game mới</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 