"use client";

import { FaCode } from "react-icons/fa";

export default function Technology() {
  return (
    <div className="mb-16">
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CÔNG NGHỆ & ĐỔI MỚI
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Game Engine */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4">
              <FaCode className="w-8 h-8 text-[var(--accent-blue-bright)]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Game Engine</h3>
            <p className="text-gray-300">
              Sử dụng Unity Engine với kỹ thuật 2D Spine Animation kết hợp 3D, tối ưu hóa cho mobile để mang lại trải nghiệm mượt mà trên mọi thiết bị.
            </p>
          </div>
        </div>
        
        {/* Blockchain Integration */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[var(--accent-blue-bright)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Blockchain Integration</h3>
            <p className="text-gray-300">
              Tích hợp công nghệ blockchain một cách có trách nhiệm, tạo ra hệ sinh thái token $MSCI và NFT cho phép người chơi thực sự sở hữu tài sản trong game.
            </p>
          </div>
        </div>
        
        {/* AI & Machine Learning */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[var(--accent-blue-bright)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">AI & Machine Learning</h3>
            <p className="text-gray-300">
              Ứng dụng AI để cá nhân hóa trải nghiệm người chơi, cân bằng gameplay và phát hiện gian lận.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 