import React from 'react';
import { Metadata } from 'next';
import DonateHero from './components/DonateHero';
import DonatePackages from './components/DonatePackages';
import DonateFeatures from './components/DonateFeatures';
import InvestorSection from './components/InvestorSection';
import DonateInvestor from './components/DonateInvestor';
import DonateVision from './components/DonateVision';
import DonatePartnership from './components/DonatePartnership';
import DonateSpecial from './components/DonateSpecial';
import DonateCtaSection from './components/DonateCtaSection';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'M-SCI Donate - Cùng Kiến Tạo Tương Lai Game Việt Nam',
  description: 'Đồng hành cùng M-SCI trong hành trình kiến tạo nên một biểu tượng mới cho game Việt. Các gói donate đa dạng với nhiều quyền lợi hấp dẫn.',
};

export default function DonatePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900 overflow-hidden">
      <Head>
        <title>Ủng hộ dự án | M-SCI</title>
        <meta name="description" content="Ủng hộ dự án M-SCI" />
      </Head>

      <DonateHero />
      <DonateFeatures />
      <DonatePackages />
      <InvestorSection />
      <DonateInvestor />
      <DonateVision />
      <DonatePartnership />
      <DonateSpecial />
      <DonateCtaSection />
    </main>
  );
} 