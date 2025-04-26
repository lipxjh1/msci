'use client';

import { useState } from 'react';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import PartnersHeroBanner from '@/thanh_phan/partners/hero_banner';
import PartnersContent from '@/thanh_phan/partners/partners_content';
import PartnersFooter from '@/thanh_phan/partners/partners_footer';
import CustomChatInterface from '@/thanh_phan/chat/custom_chat_interface';
import DarkAbstractBg from '@/components/backgrounds/DarkAbstractBg';

export default function PartnersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Nền đen tối dần */}
      <DarkAbstractBg />

      {/* Content with relative positioning for proper layering */}
      <div className="relative z-10">
        {/* Menu điều hướng */}
        <ThanhDieuHuongResponsive />

        {/* Hero Banner */}
        <PartnersHeroBanner />

        {/* Main Content */}
        <div id="partners-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
          {/* Curved section top */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-black/80 -translate-y-full"></div>
          
          {/* Filter by Category */}
          <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
            <div className="flex justify-center mb-6">
              <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue relative inline-block">
                  DANH MỤC
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-3 text-sm font-medium font-rajdhani tracking-wider transition-all duration-300 
                  ${selectedCategory === null 
                  ? 'text-white border-2 border-[var(--accent-blue-bright)] shadow-lg shadow-[var(--accent-blue-glow)]/40 transform scale-105 button-cyber clip-hexagon hexagon-corner-flash bg-[var(--accent-blue-bright)]/20' 
                  : 'bg-white/5 text-white/90 hover:bg-[var(--accent-blue-bright)]/10 hover:text-white hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 border border-white/20 hover:border-[var(--accent-blue-bright)]/70 button-cyber clip-hexagon'
                }`}
              >
                Tất Cả
              </button>
              
              {partnerCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 text-sm font-medium font-rajdhani tracking-wider transition-all duration-300 
                    ${selectedCategory === category.id 
                      ? `text-white border-2 border-[${category.color}] shadow-lg shadow-[${category.color}]/40 transform scale-105 button-cyber clip-hexagon hexagon-corner-flash bg-[${category.color}]/20` 
                      : `bg-white/5 text-white/90 hover:bg-[${category.color}]/10 hover:text-white hover:shadow-lg hover:shadow-[${category.color}]/20 border border-white/20 hover:border-[${category.color}]/70 button-cyber clip-hexagon`
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Partners Content */}
          <PartnersContent selectedCategory={selectedCategory} />
        </div>
        
        {/* Partners Footer */}
        <PartnersFooter />
        
        {/* Chat Interface */}
        <CustomChatInterface
          systemPrompt="Bạn là Akane, một trợ lý AI thông minh và thân thiện. Hãy giúp đỡ người dùng một cách nhiệt tình và chính xác bằng tiếng Việt."
          modelName="deepseek-chat"
          enableStreaming={true}
          botName="Akane AI"
        />
      </div>
    </div>
  );
}

// Danh sách category cho đối tác
const partnerCategories = [
  { id: 'investors', name: 'Nhà Đầu Tư', color: 'var(--vaiTroTank)' },
  { id: 'technology', name: 'Đối Tác Công Nghệ', color: 'var(--vaiTroDamage)' },
  { id: 'publishers', name: 'Đối Tác Phát Hành', color: 'var(--vaiTroSupport)' },
  { id: 'creative', name: 'Đối Tác Sáng Tạo', color: '#9c27b0' },
  { id: 'academic', name: 'Đối Tác Học Thuật', color: '#2196f3' }
]; 