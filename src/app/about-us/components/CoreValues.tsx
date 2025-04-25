"use client";

import { FaGamepad, FaUsers, FaLightbulb, FaBalanceScale } from "react-icons/fa";

export default function CoreValues() {
  return (
    <div className="mb-16">
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            GIÁ TRỊ CỐT LÕI
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Gaming Passion */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4">
              <FaGamepad className="w-8 h-8 text-[var(--accent-blue-bright)]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Đam Mê Gaming</h3>
            <p className="text-gray-300">
              Chúng tôi là game thủ trước khi là nhà phát triển. Mọi quyết định đều xuất phát từ góc nhìn của người chơi.
            </p>
          </div>
        </div>
        
        {/* Community */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4">
              <FaUsers className="w-8 h-8 text-[var(--accent-blue-bright)]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Cộng Đồng Là Trọng Tâm</h3>
            <p className="text-gray-300">
              Người chơi không chỉ là khách hàng - họ là đồng sáng tạo, là một phần không thể thiếu của M-SCI.
            </p>
          </div>
        </div>
        
        {/* Innovation */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4">
              <FaLightbulb className="w-8 h-8 text-[var(--accent-blue-bright)]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Đổi Mới Sáng Tạo</h3>
            <p className="text-gray-300">
              Không ngừng tìm kiếm giải pháp mới để nâng cao trải nghiệm game và mô hình kinh doanh.
            </p>
          </div>
        </div>
        
        {/* Fairness */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4">
              <FaBalanceScale className="w-8 h-8 text-[var(--accent-blue-bright)]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Công Bằng & Minh Bạch</h3>
            <p className="text-gray-300">
              Mọi cơ chế game đều được thiết kế công bằng, không pay-to-win, với tỷ lệ drop minh bạch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 