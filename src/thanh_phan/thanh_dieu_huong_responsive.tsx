"use client";

import { useState, useEffect } from 'react';
import ThanhDieuHuong from './thanh_dieu_huong';
import ThanhDieuHuongMobile from './thanh_dieu_huong_mobile';

export default function ThanhDieuHuongResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Kiểm tra lần đầu
    checkIsMobile();
    
    // Thêm event listener để theo dõi thay đổi kích thước màn hình
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Sử dụng Client Component Suspense boundary
  return (
    <>
      {isMobile ? <ThanhDieuHuongMobile /> : <ThanhDieuHuong />}
    </>
  );
} 