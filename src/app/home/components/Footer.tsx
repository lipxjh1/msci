"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050a0c] text-white pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Logo và mô tả */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-white/10 pb-12">
          <div className="mb-8 md:mb-0 max-w-md">
            <div className="flex items-center mb-4">
              <div className="relative h-12 w-12 mr-3">
                <Image
                  src="/images/overwatch_logo.png"
                  alt="Game Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-white">M-SCI</span>
            </div>
            <p className="text-white/60 mb-6">
              M-SCI là game bắn súng đội nhóm nơi các anh hùng tập hợp để tham gia vào các trận chiến 5v5 đầy hấp dẫn với nhiều kỹ năng và tính năng độc đáo.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <Link 
                href="#"
                className="w-10 h-10 rounded-full bg-[#1a2526] flex items-center justify-center hover:bg-[var(--overwatch-blue)] transition-colors duration-300"
              >
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              {/* Add other social media icons */}
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-auto">
            <div>
              <h3 className="text-lg font-bold mb-4 text-[var(--overwatch-blue)]">GAME</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Anh Hùng</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Bản Đồ</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Mùa Giải</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Chế Độ Chơi</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-[var(--overwatch-blue)]">HỖ TRỢ</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Trung Tâm Hỗ Trợ</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Báo Lỗi</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Liên Hệ</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Forums</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-[var(--overwatch-blue)]">CỘNG ĐỒNG</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Tin Tức</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Esports</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Discord</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Fanart</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright và pháp lý */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
          <p>©2024 M-SCI. Đây là một dự án clone, không phải trang web chính thức.</p>
          
          <div className="flex mt-4 md:mt-0 space-x-6">
            <Link href="#" className="hover:text-white transition-colors">Điều Khoản Sử Dụng</Link>
            <Link href="#" className="hover:text-white transition-colors">Chính Sách Riêng Tư</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 