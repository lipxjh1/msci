'use client';

import { useState, useEffect } from 'react';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import RoadmapBanner from './components/RoadmapBanner';
import RoadmapContent from './components/RoadmapContent';
import JoinUsFooter from '@/thanh_phan/JoinUsFooter';
import { useDeepSeekChat } from '@/modules/box-akane';
import CustomChatInterface from '@/thanh_phan/CustomChatInterface';

export default function RoadmapPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập thời gian tải
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Roadmap Banner */}
      <RoadmapBanner />

      {/* Roadmap Content */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="relative cyber-halo">
            <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-[var(--accent-blue-bright)] animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-[var(--accent-blue-glow)] animate-spin animation-delay-150"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-[var(--accent-blue-bright)] animate-spin animation-delay-300"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-[var(--accent-blue-bright)]/30 animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        <RoadmapContent />
      )}
      
      {/* Join Us Footer */}
      <JoinUsFooter />
      
      {/* Thêm ChatInterface với ảnh tùy chỉnh */}
      <CustomChatInterface
        systemPrompt="Bạn là Akane, một trợ lý AI thông minh và thân thiện. Hãy giúp đỡ người dùng một cách nhiệt tình và chính xác bằng tiếng Việt."
        modelName="deepseek-chat"
        enableStreaming={true}
        botName="Akane AI"
      />
    </div>
  );
} 