'use client';

import { useState } from 'react';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import ReferralHeroBanner from '@/thanh_phan/referral/hero_banner';
import ReferralContent from '@/thanh_phan/referral/referral_content';
import ReferralFooter from '@/thanh_phan/referral/referral_footer';
import CustomChatInterface from '@/thanh_phan/chat/custom_chat_interface';

export default function ReferralPage() {
  const [activeTab, setActiveTab] = useState<string>('how-it-works');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Hero Banner */}
      <ReferralHeroBanner />

      {/* Main Content */}
      <div id="referral-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
        {/* Curved section top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041019] -translate-y-full"></div>
        
        {/* Tab Navigation */}
        <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
          <div className="flex justify-center mb-6">
            <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
              <span className="text-shadow-blue relative inline-block">
                CHƯƠNG TRÌNH GIỚI THIỆU
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {referralTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium font-rajdhani tracking-wider transition-all duration-300 
                  ${activeTab === tab.id 
                    ? `text-white border-2 border-[${tab.color}] shadow-lg shadow-[${tab.color}]/40 transform scale-105 button-cyber clip-hexagon hexagon-corner-flash bg-[${tab.color}]/20` 
                    : `bg-white/5 text-white/90 hover:bg-[${tab.color}]/10 hover:text-white hover:shadow-lg hover:shadow-[${tab.color}]/20 border border-white/20 hover:border-[${tab.color}]/70 button-cyber clip-hexagon`
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Referral Content */}
        <ReferralContent activeTab={activeTab} />
      </div>
      
      {/* Referral Footer */}
      <ReferralFooter />
      
      {/* Chat Interface */}
      <CustomChatInterface
        systemPrompt="Bạn là Akane, một trợ lý AI thông minh và thân thiện. Hãy giúp đỡ người dùng một cách nhiệt tình và chính xác bằng tiếng Việt."
        modelName="deepseek-chat"
        enableStreaming={true}
        botName="Akane AI"
      />
    </div>
  );
}

// Danh sách tab cho trang referral
const referralTabs = [
  { id: 'how-it-works', name: 'Cách Thức Hoạt Động', color: 'var(--vaiTroTank)' },
  { id: 'rewards', name: 'Phần Thưởng', color: 'var(--vaiTroDamage)' },
  { id: 'my-referrals', name: 'Giới Thiệu Của Tôi', color: 'var(--vaiTroSupport)' },
  { id: 'leaderboard', name: 'Bảng Xếp Hạng', color: '#9c27b0' },
  { id: 'faq', name: 'Câu Hỏi Thường Gặp', color: '#2196f3' }
]; 