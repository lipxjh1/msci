'use client';

import Link from 'next/link';
import { FaHome, FaSearch } from 'react-icons/fa';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d14] to-[#121626] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-gradient-to-br from-[#121626] to-[#0d1018] border border-blue-900/20 rounded-xl p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-2">Trang không tìm thấy</h2>
          <p className="text-gray-400 mb-8">Liên kết bạn theo dõi có thể bị hỏng hoặc trang có thể đã bị xóa.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-lg transition-all duration-200"
            >
              <FaHome /> Trang chủ
            </Link>
            <Link 
              href="/forum"
              className="flex items-center justify-center gap-2 bg-transparent border border-blue-800 hover:border-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200"
            >
              <FaSearch /> Diễn đàn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 