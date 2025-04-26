'use client';

import { useState, useEffect } from 'react';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import DarkAbstractBg from '@/components/backgrounds/DarkAbstractBg';

// Nhập các thành phần một cách động để tối ưu hóa hiệu suất
const TokenHeader = dynamic(() => import('./components/TokenHeader'), { ssr: false });
const TokenFeatures = dynamic(() => import('./components/TokenFeatures'), { ssr: false });
const TokenomicsChart = dynamic(() => import('./components/TokenomicsChart'), { ssr: false });
const TokenUsageTable = dynamic(() => import('./components/TokenUsageTable'), { ssr: false });
const RoadmapSection = dynamic(() => import('./components/RoadmapSection'), { ssr: false });
const TokenFAQ = dynamic(() => import('./components/TokenFAQ'), { ssr: false });
const InvestmentInfo = dynamic(() => import('./components/InvestmentInfo'), { ssr: false });

export default function TokenPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mô phỏng thời gian tải trang
    const timer = setTimeout(() => {
      setIsLoading(false);
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

        {/* Token Banner */}
        <TokenHeader />

        {/* Loading State */}
        {isLoading ? (
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
          <div id="token-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
            {/* Curved section top */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-black/80 -translate-y-full"></div>
            
            {/* Token Features Section */}
            <TokenFeatures />
            
            {/* Tokenomics Chart Section */}
            <TokenomicsChart />
            
            {/* Token Usage Table Section */}
            <TokenUsageTable />
            
            {/* Roadmap Section */}
            <RoadmapSection />
            
            {/* FAQ Section */}
            <TokenFAQ />
            
            {/* Investment Info Section */}
            <InvestmentInfo />
          </div>
        )}
        
        {/* Join Us Footer - Inspired by Overwatch */}
        <div className="relative w-full overflow-hidden">
          {/* Battlefield Image Background */}
          <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
            <Image 
              src="/images/overwatch_bg_2.jpg" 
              alt="Token background" 
              fill
              sizes="100vw"
              className="object-cover object-center brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
            
            {/* Token Overlay */}
            <div className="absolute inset-0 z-10">
              <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-10 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
                  HÃY THAM GIA VÀO TƯƠNG LAI CỦA GAMING. MUA $MSCI NGAY!
                </h2>
                
                <Link 
                  href="/play"
                  className="mt-4 mb-8 px-8 py-3 bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-lg shadow-lg hover:shadow-[#FF7D00]/50"
                >
                  MUA TOKEN
                </Link>
                
                <div className="mt-8">
                  <h3 className="text-gray-300 uppercase text-sm tracking-widest mb-4">THEO DÕI CHÚNG TÔI</h3>
                  <div className="flex justify-center space-x-6">
                    <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                      <FaFacebookF className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                      <FaTwitter className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                      <FaYoutube className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                      <FaDiscord className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                      <FaTelegram className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 