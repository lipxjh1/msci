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
      <div className="mb-12 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
        <div className="flex justify-center mb-6">
          <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
            <span className="text-shadow-blue relative inline-block">
              DANH MỤC TIN TỨC
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <Link
              key={filter.label}
              href={filter.href}
              className="px-6 py-3 text-sm font-medium font-rajdhani tracking-wider bg-white/5 text-white border border-white/20 button-cyber clip-hexagon"
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Define colors for each filter type
  const getFilterColor = (value?: string) => {
    switch (value) {
      case 'tin_tuc':
        return 'var(--vaiTroDamage)'; // Red color for news
      case 'cong_dong':
        return 'var(--vaiTroSupport)'; // Green color for community
      default:
        return 'var(--accent-blue-bright)'; // Blue for all
    }
  };

  // Phiên bản với animation chỉ được sử dụng sau khi client hydration
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl"
      suppressHydrationWarning
    >
      <div className="flex justify-center mb-6">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-orbitron text-2xl font-bold text-white cyber-halo"
        >
          <span className="text-shadow-blue relative inline-block">
            DANH MỤC TIN TỨC
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </motion.h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {filters.map((filter, index) => {
          const isActive = activeFilter === filter.value || 
                          (activeFilter === undefined && filter.value === undefined);
          const filterColor = getFilterColor(filter.value);
          
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
                className={`px-6 py-3 text-sm font-medium font-rajdhani tracking-wider transition-all duration-300 ${
                  isActive
                    ? `text-white border-2 border-[${filterColor}] shadow-lg shadow-[${filterColor}]/40 transform scale-105 button-cyber clip-hexagon hexagon-corner-flash bg-[${filterColor}]/20`
                    : `bg-white/5 text-white/90 hover:bg-[${filterColor}]/10 hover:text-white hover:shadow-lg hover:shadow-[${filterColor}]/20 border border-white/20 hover:border-[${filterColor}]/70 button-cyber clip-hexagon`
                }`}
              >
                {filter.label}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
} 