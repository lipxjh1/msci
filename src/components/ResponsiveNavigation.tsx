"use client";

import { useState, useEffect } from 'react';
import ThanhDieuHuong from '@/thanh_phan/thanh_dieu_huong';
import ThanhDieuHuongMobile from '@/thanh_phan/thanh_dieu_huong_mobile';

export default function ResponsiveNavigation() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener to track screen size changes
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Use Client Component Suspense boundary
  return (
    <>
      {isMobile ? <ThanhDieuHuongMobile /> : <ThanhDieuHuong />}
    </>
  );
} 