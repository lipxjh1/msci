'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import InfoSection from '@/components/common/InfoSection';
import CallToAction from '@/components/careers/CallToAction';
import ApplicationPopup from '@/components/careers/ApplicationPopup';

export default function CareersPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');

  const openApplicationPopup = (position: string = 'Vị trí tại 5MSCI') => {
    setSelectedPosition(position);
    setIsPopupOpen(true);
  };

  return (
    <main className="flex flex-col min-h-screen">
      <PageHeader
        title="Tuyển dụng"
        subtitle="Trở thành một phần của đội ngũ 5MSCI"
        imagePath="/images/careers-header.jpg"
      />
      
      <InfoSection
        title="Tham gia cùng chúng tôi"
        subtitle="Tại sao nên làm việc tại 5MSCI?"
        bgColor="bg-gray-900"
        textColor="text-white"
        customStyles="pb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 border border-gray-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <h3 className="font-orbitron text-xl text-white font-medium mb-2">Cơ hội học tập</h3>
            <p className="font-noto-sans text-gray-300">Chúng tôi đầu tư vào sự phát triển của nhân viên thông qua đào tạo, hội thảo và chứng chỉ ngành.</p>
          </div>
          
          <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 border border-gray-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
              </svg>
            </div>
            <h3 className="font-orbitron text-xl text-white font-medium mb-2">Môi trường phát triển</h3>
            <p className="font-noto-sans text-gray-300">Làm việc trong môi trường năng động, sáng tạo và cùng nhau giải quyết những thách thức công nghệ.</p>
          </div>
          
          <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 border border-gray-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="font-orbitron text-xl text-white font-medium mb-2">Đội ngũ tài năng</h3>
            <p className="font-noto-sans text-gray-300">Làm việc cùng những chuyên gia hàng đầu và học hỏi từ đội ngũ nhiều kinh nghiệm trong ngành.</p>
          </div>
          
          <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 border border-gray-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <h3 className="font-orbitron text-xl text-white font-medium mb-2">Công nghệ tiên tiến</h3>
            <p className="font-noto-sans text-gray-300">Tiếp cận với các công nghệ mới nhất và tham gia vào các dự án đột phá trong lĩnh vực công nghệ.</p>
          </div>
          
          <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 border border-gray-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 className="font-orbitron text-xl text-white font-medium mb-2">Phúc lợi hấp dẫn</h3>
            <p className="font-noto-sans text-gray-300">Chế độ lương thưởng cạnh tranh, bảo hiểm sức khỏe và các chương trình phúc lợi đa dạng.</p>
          </div>
          
          <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 border border-gray-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <h3 className="font-orbitron text-xl text-white font-medium mb-2">Cơ hội thăng tiến</h3>
            <p className="font-noto-sans text-gray-300">Lộ trình phát triển nghề nghiệp rõ ràng với nhiều cơ hội thăng tiến dựa trên năng lực.</p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => openApplicationPopup()}
            className="font-noto-sans button-cyber clip-hexagon hexagon-border text-white bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/40 transition-all duration-300 py-3 px-8 font-medium"
          >
            Gửi ứng tuyển ngay
          </button>
        </div>
      </InfoSection>
      
      <div className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">Quy trình tuyển dụng</h2>
            <p className="font-noto-sans text-gray-300 max-w-3xl mx-auto">
              Quy trình tuyển dụng của 5MSCI được thiết kế để tìm kiếm những ứng viên phù hợp nhất và cung cấp trải nghiệm tốt nhất cho bạn.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-full flex items-center justify-center mb-4 relative z-10">
                  <span className="font-orbitron text-xl font-bold">1</span>
                </div>
                <div className="hidden md:block absolute top-8 left-[50%] w-full h-0.5 bg-gradient-to-r from-[var(--accent-blue-bright)]/0 via-[var(--accent-blue-bright)]/50 to-[var(--accent-blue-bright)]/0"></div>
                <h3 className="font-orbitron text-lg text-white font-medium mb-2 text-center">Nộp đơn</h3>
                <p className="font-noto-sans text-gray-300 text-center">Nộp đơn ứng tuyển trực tuyến với thông tin chi tiết về kinh nghiệm và kỹ năng của bạn.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-full flex items-center justify-center mb-4 relative z-10">
                  <span className="font-orbitron text-xl font-bold">2</span>
                </div>
                <div className="hidden md:block absolute top-8 left-[50%] w-full h-0.5 bg-gradient-to-r from-[var(--accent-blue-bright)]/0 via-[var(--accent-blue-bright)]/50 to-[var(--accent-blue-bright)]/0"></div>
                <h3 className="font-orbitron text-lg text-white font-medium mb-2 text-center">Phỏng vấn sơ bộ</h3>
                <p className="font-noto-sans text-gray-300 text-center">Phỏng vấn qua điện thoại để tìm hiểu thêm về bạn và giải đáp các câu hỏi ban đầu.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-full flex items-center justify-center mb-4 relative z-10">
                  <span className="font-orbitron text-xl font-bold">3</span>
                </div>
                <div className="hidden md:block absolute top-8 left-[50%] w-full h-0.5 bg-gradient-to-r from-[var(--accent-blue-bright)]/0 via-[var(--accent-blue-bright)]/50 to-[var(--accent-blue-bright)]/0"></div>
                <h3 className="font-orbitron text-lg text-white font-medium mb-2 text-center">Đánh giá kỹ thuật</h3>
                <p className="font-noto-sans text-gray-300 text-center">Bài kiểm tra kỹ thuật hoặc bài tập thực hành để đánh giá kỹ năng chuyên môn của bạn.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-full flex items-center justify-center mb-4 relative z-10">
                  <span className="font-orbitron text-xl font-bold">4</span>
                </div>
                <h3 className="font-orbitron text-lg text-white font-medium mb-2 text-center">Phỏng vấn cuối cùng</h3>
                <p className="font-noto-sans text-gray-300 text-center">Phỏng vấn trực tiếp với đội ngũ quản lý và thảo luận về cơ hội hợp tác.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div id="apply-section">
          <CallToAction />
        </div>

        <div className="fixed bottom-10 right-10 z-30">
          <button
            onClick={() => openApplicationPopup()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] rounded-full shadow-lg hover:shadow-[var(--accent-blue-glow)]/40 transition-all duration-300 group"
          >
            <span className="text-black font-medium">Ứng Tuyển Ngay</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-black transform group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <ApplicationPopup 
          isOpen={isPopupOpen} 
          jobTitle={selectedPosition}
          onClose={() => setIsPopupOpen(false)} 
        />
      )}
    </main>
  );
} 