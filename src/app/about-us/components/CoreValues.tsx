"use client";

import { FaGamepad, FaUsers, FaLightbulb, FaBalanceScale } from "react-icons/fa";
import Image from "next/image";

export default function CoreValues() {
  return (
    <div className="mb-16 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <Image 
          src="/images/particle_overlay.png" 
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            GIÁ TRỊ CỐT LÕI
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Gaming Passion */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 group hover:-translate-y-2">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4 group-hover:from-[var(--accent-blue-bright)]/40 group-hover:to-[var(--accent-blue-glow)]/40 transition-all duration-500">
              <FaGamepad className="w-8 h-8 text-[var(--accent-blue-bright)]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Đam Mê Gaming</h3>
            <p className="text-gray-300">
              Chúng tôi là game thủ trước khi là nhà phát triển. Mọi quyết định đều xuất phát từ góc nhìn của người chơi.
            </p>
            
            <div className="mt-4 relative h-24 w-full overflow-hidden rounded-lg">
              <Image 
                src="/images/home/FS-img/play_g.png" 
                alt="Gaming Passion"
                fill
                className="object-cover object-center brightness-75 group-hover:brightness-90 transition-all duration-500"
              />
            </div>
          </div>
        </div>
        
        {/* Community */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 group hover:-translate-y-2">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4 group-hover:from-[var(--accent-blue-bright)]/40 group-hover:to-[var(--accent-blue-glow)]/40 transition-all duration-500">
              <FaUsers className="w-8 h-8 text-[var(--accent-blue-bright)]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Cộng Đồng Là Trọng Tâm</h3>
            <p className="text-gray-300">
              Người chơi không chỉ là khách hàng - họ là đồng sáng tạo, là một phần không thể thiếu của M-SCI.
            </p>
            
            <div className="mt-4 relative h-24 w-full overflow-hidden rounded-lg">
              <Image 
                src="/images/home/FS-img/hero.png" 
                alt="Community Focus"
                fill
                className="object-cover object-center brightness-75 group-hover:brightness-90 transition-all duration-500"
              />
            </div>
          </div>
        </div>
        
        {/* Innovation */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 group hover:-translate-y-2">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4 group-hover:from-[var(--accent-blue-bright)]/40 group-hover:to-[var(--accent-blue-glow)]/40 transition-all duration-500">
              <FaLightbulb className="w-8 h-8 text-[var(--accent-blue-bright)]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Đổi Mới Sáng Tạo</h3>
            <p className="text-gray-300">
              Không ngừng tìm kiếm giải pháp mới để nâng cao trải nghiệm game và mô hình kinh doanh.
            </p>
            
            <div className="mt-4 relative h-24 w-full overflow-hidden rounded-lg">
              <Image 
                src="/images/free.jpg" 
                alt="Innovation"
                fill
                className="object-cover object-center brightness-75 group-hover:brightness-90 transition-all duration-500"
              />
            </div>
          </div>
        </div>
        
        {/* Fairness */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 group hover:-translate-y-2">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4 group-hover:from-[var(--accent-blue-bright)]/40 group-hover:to-[var(--accent-blue-glow)]/40 transition-all duration-500">
              <FaBalanceScale className="w-8 h-8 text-[var(--accent-blue-bright)]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Công Bằng & Minh Bạch</h3>
            <p className="text-gray-300">
              Mọi cơ chế game đều được thiết kế công bằng, không pay-to-win, với tỷ lệ drop minh bạch.
            </p>
            
            <div className="mt-4 relative h-24 w-full overflow-hidden rounded-lg">
              <Image 
                src="/images/home/FS-img/free.png" 
                alt="Fairness"
                fill
                className="object-cover object-center brightness-75 group-hover:brightness-90 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 