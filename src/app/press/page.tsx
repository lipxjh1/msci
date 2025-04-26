'use client';

import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import CustomChatInterface from './components/CustomChatInterface';
import PressContent from './components/PressContent';
import pressSections from './data/pressSections';

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#041019] text-white font-be-vietnam-pro">
      <ThanhDieuHuongResponsive />
      
      <PressContent pressSections={pressSections} />
      
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