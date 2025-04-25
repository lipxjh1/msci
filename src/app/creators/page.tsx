'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';
import CreatorBanner from './components/CreatorBanner';
import CreatorLevels from './components/CreatorLevels';
import CreatorRewards from './components/CreatorRewards';
import CreatorResources from './components/CreatorResources';
import CreatorGuidelines from './components/CreatorGuidelines';
import CreatorJoin from './components/CreatorJoin';
import CreatorPartners from './components/CreatorPartners';
import CreatorSuccess from './components/CreatorSuccess';
import CreatorCommunity from './components/CreatorCommunity';
import CreatorFAQ from './components/CreatorFAQ';
import CreatorContact from './components/CreatorContact';

export default function CreatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Creators Banner */}
      <CreatorBanner />

      <div id="creators-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
        {/* Curved section top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041019] -translate-y-full"></div>
        
        {/* Creator Levels Section */}
        <CreatorLevels />
        
        {/* Creator Rewards System */}
        <CreatorRewards />
        
        {/* Creator Resources & Tools */}
        <CreatorResources />
        
        {/* Content Guidelines */}
        <CreatorGuidelines />
        
        {/* How to Join */}
        <CreatorJoin />
        
        {/* Strategic Partners */}
        <CreatorPartners />
        
        {/* Success Stories */}
        <CreatorSuccess />
        
        {/* Creator Community */}
        <CreatorCommunity />
        
        {/* FAQ Section */}
        <CreatorFAQ />
        
        {/* Contact Section */}
        <CreatorContact />
      </div>
      
      {/* Join Us Footer - Inspired by Overwatch */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <Image 
          src="/images/overwatch_bg_2.jpg" 
          alt="Creators battlefield" 
          fill
          sizes="100vw"
          className="object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 to-[#041019]/90"></div>
        
        <div className="absolute inset-0 z-10">
          <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-10 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
              TRỞ THÀNH NHÀ SÁNG TẠO NỘI DUNG CỦA M-SCI NGAY HÔM NAY!
            </h2>
            
            <Link 
              href="/creators/register"
              className="mt-4 mb-8 px-8 py-3 bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-lg shadow-lg hover:shadow-[#FF7D00]/50"
            >
              ĐĂNG KÝ NGAY
            </Link>
            
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <FaYoutube />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <FaDiscord />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <FaTelegram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 