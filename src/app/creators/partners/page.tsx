'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaArrowLeft } from 'react-icons/fa';
import PartnersHero from './components/PartnersHero';
import PartnershipTypes from './components/PartnershipTypes';
import PartnerRegistrationSteps from './components/PartnerRegistrationSteps';
import PartnerRegistrationForm from './components/PartnerRegistrationForm';
import PartnerCommitment from './components/PartnerCommitment';
import PartnerContact from './components/PartnerContact';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Header Banner */}
      <PartnersHero />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back button */}
        <div className="mb-8">
          <Link 
            href="/creators" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <FaArrowLeft />
            <span>Quay lại trang Creators</span>
          </Link>
        </div>

        {/* Các hình thức hợp tác */}
        <PartnershipTypes />
        
        {/* Quy trình trở thành đối tác */}
        <PartnerRegistrationSteps />
        
        {/* Form đăng ký đối tác */}
        <PartnerRegistrationForm />
        
        {/* Cam kết của M-SCI */}
        <PartnerCommitment />
        
        {/* Liên hệ hỗ trợ */}
        <PartnerContact />
        
        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/80 italic mb-4">
            M-SCI - Cùng nhau kiến tạo tương lai gaming
          </p>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent mx-auto"></div>
        </div>
      </div>
    </div>
  );
} 