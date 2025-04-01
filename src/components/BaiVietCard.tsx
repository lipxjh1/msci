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

  return (
    <div suppressHydrationWarning className="bg-[#1a2634]/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/10 hover:border-[#F44336]/50 transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={baiViet.anh_dai_dien}
          alt={baiViet.tieu_de}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent opacity-60" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            baiViet.loai === 'tin_tuc' 
              ? 'bg-[#F44336]/20 text-[#F44336]' 
              : 'bg-[#4CAF50]/20 text-[#4CAF50]'
          }`}>
            {baiViet.loai === 'tin_tuc' ? 'Tin tức' : 'Cộng đồng'}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-3 text-white line-clamp-2">{baiViet.tieu_de}</h2>
        <p className="text-gray-300 line-clamp-3 mb-4 flex-grow">{baiViet.noi_dung}</p>
        <div className="flex items-center justify-between text-sm text-gray-400 mt-auto">
          {/* Sử dụng suppressHydrationWarning trên phần ngày tháng */}
          <span suppressHydrationWarning>{isMounted ? formattedDate : ''}</span>
          <Link 
            href={`/tin-tuc/${baiViet.id}`} 
            className="text-[#F44336] hover:text-[#e53935] transition-colors"
          >
            Đọc thêm →
          </Link>
        </div>
      </div>
    </div>
  );
} 