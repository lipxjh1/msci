"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';

export default function GuildCTA() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <Image 
          src="/images/overwatch_bg_2.jpg" 
          alt="Guild Call to Action" 
          fill
          sizes="100vw"
          className="object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 to-[#041019]/90"></div>
        
        {/* Overlay content */}
        <div className="absolute inset-0 z-10">
          <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-16 px-4">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-6 max-w-3xl">
              BẮT ĐẦU HÀNH TRÌNH GUILD CỦA BẠN NGAY HÔM NAY
            </h2>
            
            <p className="font-be-vietnam-pro text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
              Trong M-SCI, không có anh hùng đơn độc - chỉ có những Guild hùng mạnh! Hãy tham gia hoặc tạo Guild của riêng bạn ngay hôm nay. Cùng nhau xây dựng một đế chế bất khả chiến bại!
            </p>
            
            <Link 
              href="/play"
              className="font-be-vietnam-pro px-8 py-3 bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[var(--accent-blue-bright)]/30 transition-all duration-300 mb-10"
            >
              CHƠI NGAY
            </Link>
            
            <div className="mt-6">
              <h3 className="font-be-vietnam-pro text-gray-300 uppercase text-sm tracking-widest mb-4">THEO DÕI CHÚNG TÔI</h3>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-white hover:text-[var(--accent-blue-bright)] transition-colors">
                  <FaFacebookF className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-[var(--accent-blue-bright)] transition-colors">
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-[var(--accent-blue-bright)] transition-colors">
                  <FaYoutube className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-[var(--accent-blue-bright)] transition-colors">
                  <FaDiscord className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-[var(--accent-blue-bright)] transition-colors">
                  <FaTelegram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 