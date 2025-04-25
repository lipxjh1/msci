"use client";

import React from 'react';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';

export default function DonateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <ThanhDieuHuongResponsive />
      <div className="flex-grow pt-16">
        {children}
      </div>
    </div>
  );
} 