'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';
import StakingBanner from './components/StakingBanner';
import StakingTypes from './components/StakingTypes';
import StakingCalculator from './components/StakingCalculator';
import AdditionalRewards from './components/AdditionalRewards';
import SafetySection from './components/SafetySection';
import StakingStrategies from './components/StakingStrategies';
import StakingFAQ from './components/StakingFAQ';
import StakingSupport from './components/StakingSupport';
import GoldenAbstractBg from '@/components/backgrounds/GoldenAbstractBg';

export default function StakingPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Nền vàng abstractc */}
      <GoldenAbstractBg />
      
      {/* Content with relative positioning for proper layering */}
      <div className="relative z-10">
        {/* Menu điều hướng */}
        <ThanhDieuHuongResponsive />

        {/* Staking Banner */}
        <StakingBanner />

        <div id="staking-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
          {/* Curved section top */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-black/80 -translate-y-full"></div>
          
          {/* Staking Types Section */}
          <StakingTypes />
          
          {/* Staking Calculator Section */}
          <StakingCalculator />
          
          {/* Additional Rewards */}
          <AdditionalRewards />
          
          {/* Safety & Security */}
          <SafetySection />
          
          {/* Staking Strategies */}
          <StakingStrategies />
          
          {/* FAQ Section */}
          <StakingFAQ />
          
          {/* Support Section */}
          <StakingSupport />
        </div>
        
        {/* Join Us Footer - Inspired by Overwatch */}
        <div className="relative w-full overflow-hidden">
          {/* Battlefield Image Background */}
          <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
            <Image 
              src="/images/overwatch_bg_2.jpg" 
              alt="Staking battlefield" 
              fill
              sizes="100vw"
              className="object-cover object-center brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
            
            <div className="absolute inset-0 z-10">
              <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-10 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
                  THAM GIA STAKING NGAY ĐỂ NHẬN THU NHẬP THỤ ĐỘNG!
                </h2>
                
                <Link 
                  href="/play"
                  className="mt-4 mb-8 px-8 py-3 bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-lg shadow-lg hover:shadow-[#FF7D00]/50"
                >
                  STAKE NGAY
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