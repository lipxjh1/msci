'use client';

import Image from 'next/image';
import { BaiViet } from '@/types/bai_viet';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BaiVietCardProps {
  baiViet: BaiViet;
}

export default function BaiVietCard({ baiViet }: BaiVietCardProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    // Định dạng ngày tháng chỉ ở phía client để tránh lỗi hydration
    try {
      setFormattedDate(new Date(baiViet.ngay_dang).toLocaleDateString('vi-VN'));
    } catch (error) {
      setFormattedDate('');
      console.error('Error formatting date:', error);
    }
  }, [baiViet.ngay_dang]);

  // Determine color based on article type
  const getTypeColor = () => {
    return baiViet.loai === 'tin_tuc' 
      ? 'var(--vaiTroDamage)' // Red for news
      : 'var(--vaiTroSupport)'; // Green for community
  };

  return (
    <div suppressHydrationWarning className="bg-[#1a2634]/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all duration-300 h-full flex flex-col card-neon">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={baiViet.anh_dai_dien}
          alt={baiViet.tieu_de}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent opacity-60" />

        {/* Type badge - top right corner */}
        <div className="absolute top-3 right-3 z-30">
          <div className="px-3 py-1 rounded-full text-sm font-rajdhani font-medium flex items-center gap-1.5 backdrop-blur-sm button-cyber"
            style={{ 
              backgroundColor: `${getTypeColor()}30`,
              borderRight: `3px solid ${getTypeColor()}`
            }}
          >
            <span className="inline-block h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: getTypeColor() }}
            ></span>
            <span className="text-white">
              {baiViet.loai === 'tin_tuc' ? 'Tin tức' : 'Cộng đồng'}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="font-rajdhani text-xl font-bold mb-3 text-white line-clamp-2 text-shadow-blue">{baiViet.tieu_de}</h2>
        <p className="font-rajdhani text-gray-300 line-clamp-3 mb-4 flex-grow">{baiViet.noi_dung}</p>
        <div className="flex items-center justify-between text-sm text-gray-400 mt-auto">
          {/* Sử dụng suppressHydrationWarning trên phần ngày tháng */}
          <span suppressHydrationWarning className="font-rajdhani">{isMounted ? formattedDate : ''}</span>
          <Link 
            href={`/tin-tuc/${baiViet.id}`} 
            className="font-rajdhani text-[var(--accent-blue-bright)] hover:text-[var(--accent-blue-glow)] transition-colors button-cyber"
          >
            Đọc thêm →
          </Link>
        </div>
      </div>

      {/* Corner decoration - top left */}
      <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-16 h-16 -translate-x-8 -translate-y-8 rotate-45 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ 
            background: `linear-gradient(135deg, ${getTypeColor()}, transparent)`
          }}
        ></div>
      </div>
    </div>
  );
} 