'use client';

import { FaCheckCircle } from 'react-icons/fa';

export default function PartnerCommitment() {
  // Dữ liệu cam kết
  const commitments = [
    "Xử lý hồ sơ trong vòng 5-7 ngày làm việc",
    "Bảo mật thông tin đối tác",
    "Hỗ trợ tận tình trong quá trình hợp tác",
    "Chia sẻ lợi ích công bằng và minh bạch"
  ];

  return (
    <div className="mb-16">
      <div className="flex justify-center mb-8">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CAM KẾT CỦA M-SCI
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((commitment, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-4 bg-gradient-to-b from-[var(--accent-blue-bright)]/5 to-purple-500/5 rounded-lg border border-[var(--accent-blue-bright)]/10 hover:border-[var(--accent-blue-bright)]/30 transition-all group"
            >
              <FaCheckCircle className="w-10 h-10 text-[var(--accent-blue-bright)] mb-3 group-hover:text-[var(--accent-blue-bright)]/80 transition-colors" />
              <p className="text-white/90 text-center">
                {commitment}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 border border-white/10 rounded-lg bg-gradient-to-r from-[var(--accent-blue-bright)]/5 to-purple-500/5">
          <p className="text-white/80 text-center">
            Chúng tôi tin rằng mối quan hệ đối tác thành công phải dựa trên sự minh bạch, tin cậy và tôn trọng lẫn nhau. M-SCI cam kết đồng hành cùng đối tác để cùng phát triển và thành công.
          </p>
        </div>
      </div>
    </div>
  );
} 