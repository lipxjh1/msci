'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BoLocBaiVietProps {
  activeFilter?: string;
}

export default function BoLocBaiViet({ activeFilter }: BoLocBaiVietProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filters = [
    { value: undefined, label: 'Tất cả', href: '/tin-tuc' },
    { value: 'tin_tuc', label: 'Tin tức', href: '/tin-tuc?loai=tin_tuc' },
    { value: 'cong_dong', label: 'Cộng đồng', href: '/tin-tuc?loai=cong_dong' },
  ];

  // Phiên bản không có animation cho SSR và trước khi client hydration
  if (!isMounted) {
    return (
      <div suppressHydrationWarning className="flex flex-wrap justify-center gap-4 mt-2">
        {filters.map((filter) => (
          <Link
            key={filter.label}
            href={filter.href}
            className="px-6 py-3 rounded-full font-medium bg-[#1a2634]/80 text-white/80 border border-white/10"
          >
            {filter.label}
          </Link>
        ))}
      </div>
    );
  }

  // Phiên bản với animation chỉ được sử dụng sau khi client hydration
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-4 mt-2"
      suppressHydrationWarning
    >
      {filters.map((filter, index) => {
        const isActive = activeFilter === filter.value || 
                        (activeFilter === undefined && filter.value === undefined);
        
        return (
          <motion.div
            key={filter.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={filter.href}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 block ${
                isActive
                  ? 'bg-gradient-to-r from-[#F44336] to-[#e53935] text-white shadow-lg shadow-red-500/20'
                  : 'bg-[#1a2634]/80 backdrop-blur-md text-white/80 hover:bg-[#F44336]/20 hover:text-[#F44336] border border-white/10'
              }`}
            >
              {filter.label}
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
} 