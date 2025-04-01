'use client';

import { BaiViet } from '@/types/bai_viet';
import BaiVietCard from './BaiVietCard';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DanhSachBaiVietProps {
  baiViets: BaiViet[];
}

export default function DanhSachBaiViet({ baiViets }: DanhSachBaiVietProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Nếu chưa mount, hiển thị skeleton loading
  if (!isMounted) {
    return (
      <div suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-[#1a2634]/50 rounded-xl h-[400px] animate-pulse" />
        ))}
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96] // Easing function for smooth motion
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
      variants={container}
      initial="hidden"
      animate="show"
      suppressHydrationWarning
    >
      {baiViets.map((baiViet) => (
        <motion.div
          key={baiViet.id}
          variants={item}
          whileHover={{ 
            scale: 1.03,
            transition: { duration: 0.2 }
          }}
          className="h-full"
        >
          <BaiVietCard baiViet={baiViet} />
        </motion.div>
      ))}
    </motion.div>
  );
} 