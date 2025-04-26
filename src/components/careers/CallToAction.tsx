'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ApplicationPopup from './ApplicationPopup';

export default function CallToAction() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');

  const positions = [
    { id: 'game-developer', title: 'Game Developer' },
    { id: 'ui-ux-designer', title: 'UI/UX Designer' },
    { id: '3d-artist', title: '3D Artist' },
    { id: 'marketing', title: 'Marketing Specialist' },
    { id: 'game-tester', title: 'Game Tester' }
  ];

  const handleApply = (position: string) => {
    setSelectedPosition(position);
    setIsPopupOpen(true);
  };

  return (
    <section className="relative">
      <div className="bg-gradient-to-r from-gray-900/80 via-black/80 to-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 lg:p-12">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <div className="bg-[var(--accent-blue-bright)] px-6 py-2 text-black font-orbitron font-bold uppercase text-sm tracking-wider clip-hexagon hexagon-border">
            Ứng tuyển ngay
          </div>
        </div>
        
        <div className="text-center mb-10">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
            Tham gia <span className="text-[var(--accent-blue-bright)]">5MSCI</span>
          </h2>
          <p className="font-noto-sans text-gray-300 max-w-2xl mx-auto">
            Tham gia đội ngũ của chúng tôi và khám phá cơ hội phát triển bản thân trong một môi trường sáng tạo và năng động. Chúng tôi cung cấp chế độ đãi ngộ hấp dẫn, cơ hội đào tạo liên tục và văn hoá làm việc độc đáo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-[var(--accent-blue-bright)]/20 p-2 rounded-lg mt-1">
                <ArrowRight className="w-5 h-5 text-[var(--accent-blue-bright)]" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-semibold text-white mb-1">Phát triển kỹ năng</h3>
                <p className="font-noto-sans text-gray-300">Cơ hội phát triển chuyên môn không giới hạn với các dự án game đa dạng và công nghệ tiên tiến</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-[var(--accent-blue-bright)]/20 p-2 rounded-lg mt-1">
                <ArrowRight className="w-5 h-5 text-[var(--accent-blue-bright)]" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-semibold text-white mb-1">Thu nhập hấp dẫn</h3>
                <p className="font-noto-sans text-gray-300">Mức lương cạnh tranh, thưởng theo hiệu suất và nhiều cơ hội tăng lương</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-[var(--accent-blue-bright)]/20 p-2 rounded-lg mt-1">
                <ArrowRight className="w-5 h-5 text-[var(--accent-blue-bright)]" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-semibold text-white mb-1">Môi trường chuyên nghiệp</h3>
                <p className="font-noto-sans text-gray-300">Văn hóa làm việc tôn trọng, hỗ trợ và khuyến khích sáng tạo</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-[var(--accent-blue-bright)]/20 p-2 rounded-lg mt-1">
                <ArrowRight className="w-5 h-5 text-[var(--accent-blue-bright)]" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-semibold text-white mb-1">Phúc lợi đặc biệt</h3>
                <p className="font-noto-sans text-gray-300">Bảo hiểm sức khoẻ, ngày nghỉ linh hoạt, team building và các hoạt động ngoại khóa thường xuyên</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4">Vị trí tuyển dụng</h3>
            <div className="space-y-3">
              {positions.map((position) => (
                <div 
                  key={position.id}
                  className="flex justify-between items-center bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-[var(--accent-blue-bright)]/50 rounded-lg p-4 transition-all duration-300"
                >
                  <span className="font-noto-sans font-medium text-white">{position.title}</span>
                  <button 
                    onClick={() => handleApply(position.title)}
                    className="font-noto-sans text-sm bg-[var(--accent-blue-bright)]/20 hover:bg-[var(--accent-blue-bright)]/30 text-[var(--accent-blue-bright)] px-4 py-2 rounded-full transition-colors"
                  >
                    Ứng tuyển
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4">Liên hệ nhân sự</h3>
            <p className="font-noto-sans text-gray-300 mb-6">
              Gửi CV hoặc thông tin ứng tuyển của bạn qua email hoặc liên hệ trực tiếp với bộ phận nhân sự của chúng tôi
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--accent-blue-bright)]/20 p-2 rounded-full">
                  <svg className="w-5 h-5 text-[var(--accent-blue-bright)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span className="font-noto-sans text-white">hr@5msci.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[var(--accent-blue-bright)]/20 p-2 rounded-full">
                  <svg className="w-5 h-5 text-[var(--accent-blue-bright)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span className="font-noto-sans text-white">(+84) 28 3123 4567</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => setIsPopupOpen(true)}
                className="font-noto-sans w-full button-cyber clip-hexagon hexagon-border text-white bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/40 transition-all duration-300 py-3 font-medium"
              >
                Ứng Tuyển Ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isPopupOpen && (
        <ApplicationPopup 
          isOpen={isPopupOpen} 
          jobTitle={selectedPosition || "Vị trí tại 5MSCI"} 
          onClose={() => setIsPopupOpen(false)} 
        />
      )}
    </section>
  );
} 