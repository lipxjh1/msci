'use client';

import { useState, useEffect } from 'react';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import TokenomicsBanner from '@/components/tokenomics/TokenomicsBanner';
import TokenDistribution from '@/components/tokenomics/TokenDistribution';
import TokenomicsCharts from '@/components/tokenomics/TokenomicsCharts';
import TokenUseCase from '@/components/tokenomics/TokenUseCase';
import TokenMetrics from '@/components/tokenomics/TokenMetrics';
import TokenRoadmap from '@/components/tokenomics/TokenRoadmap';
import TokenPartners from '@/components/tokenomics/TokenPartners';
import TokenEconomyModel from '@/components/tokenomics/TokenEconomyModel';
import TokenFAQ from '@/components/tokenomics/TokenFAQ';
import TokenFooter from '@/components/tokenomics/TokenFooter';
import { useDeepSeekChat } from '@/modules/box-akane';
import CustomChatInterface from '@/components/CustomChatInterface';
import DarkAbstractBg from '@/components/backgrounds/DarkAbstractBg';

export default function TokenomicsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Nền đen tối dần */}
      <DarkAbstractBg />

      {/* Content with relative positioning for proper layering */}
      <div className="relative z-10">
        {/* Menu điều hướng */}
        <ThanhDieuHuongResponsive />

        {/* Tokenomics Banner */}
        <TokenomicsBanner />

        <div id="tokenomics-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
          {/* Curved section top */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-black/80 -translate-y-full"></div>
          
          {/* Loading State */}
          {loading && (
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
          )}

          {/* Main Content */}
          {!loading && (
            <div className="space-y-16">
              {/* Token Distribution */}
              <TokenDistribution />
              
              {/* Tokenomics Charts */}
              <TokenomicsCharts />
              
              {/* Token Economy Model */}
              <TokenEconomyModel />
              
              {/* Token Use Cases */}
              <TokenUseCase />
              
              {/* Token Metrics & KPIs */}
              <TokenMetrics />
              
              {/* Token Roadmap */}
              <TokenRoadmap />
              
              {/* Strategic Partners */}
              <TokenPartners />
              
              {/* FAQ */}
              <TokenFAQ />
            </div>
          )}
        </div>
        
        {/* Footer */}
        <TokenFooter />
        
        {/* Chat Interface */}
        <CustomChatInterface
          systemPrompt="Bạn là Akane, một trợ lý AI thông minh và thân thiện. Hãy giúp đỡ người dùng giải đáp về tokenomics của M-SCI bằng tiếng Việt."
          modelName="deepseek-chat"
          enableStreaming={true}
          botName="Akane AI"
        />
      </div>
    </div>
  );
} 