"use client";

import Image from "next/image";
import Link from "next/link";
import {  FiTwitter, FiYoutube, FiInstagram } from "react-icons/fi";
import { FaDiscord, FaFacebookF, FaTwitch, FaTumblr } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#080b0d] border-t border-[#ffde01]/10 pt-16 pb-8 relative overflow-hidden">
      {/* Neon grid decoration */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#000] to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Newsletter signup */}
       
        
       
        
        {/* Banner partners */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-10 border-b border-[#223038]/30 pb-10">
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <Image src="https://www.cyberpunk.net/build/images/footer/partners/nvidia-5a0ab065.svg" width={120} height={40} alt="NVIDIA" className="object-contain h-10" />
          </div>
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <Image src="https://www.cyberpunk.net/build/images/footer/partners/alienware-3d98dd93.svg" width={120} height={40} alt="AMD" className="object-contain h-10" />
          </div>
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <Image src="https://www.cyberpunk.net/build/images/footer/partners/amd-a823d277.svg" width={140} height={40} alt="Alienware" className="object-contain h-10" />
          </div>
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <Image src="https://www.cyberpunk.net/build/images/footer/partners/amd-a823d277.svg" width={80} height={40} alt="ESRB Rating" className="object-contain h-12" />
          </div>
        </div>
        
        {/* Find us on */}
        <div className="flex flex-col items-center mb-10">
          <div className="text-gray-400 uppercase text-sm tracking-wider mb-4 font-medium">Tìm chúng tôi trên</div>
          <div className="flex items-center space-x-6">
            <Link href="#" aria-label="YouTube" className="text-cyan-400 hover:text-white transition-colors">
              <FiYoutube className="w-6 h-6" />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-cyan-400 hover:text-white transition-colors">
              <FaFacebookF className="w-5 h-5" />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-cyan-400 hover:text-white transition-colors">
              <FiTwitter className="w-6 h-6" />
            </Link>
            <Link href="#" aria-label="Epic Games" className="text-cyan-400 hover:text-white transition-colors">
              <SiEpicgames className="w-6 h-6" />
            </Link>
            <Link href="#" aria-label="Discord" className="text-cyan-400 hover:text-white transition-colors">
              <FaDiscord className="w-6 h-6" />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-cyan-400 hover:text-white transition-colors">
              <FiInstagram className="w-6 h-6" />
            </Link>
            <Link href="#" aria-label="Tumblr" className="text-cyan-400 hover:text-white transition-colors">
              <FaTumblr className="w-5 h-5" />
            </Link>
            <Link href="#" aria-label="Twitch" className="text-cyan-400 hover:text-white transition-colors">
              <FaTwitch className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        {/* Legal links */}
        <div className="text-center text-xs text-gray-500 flex flex-wrap justify-center gap-6 mb-6">
          <Link href="/terms" className="hover:text-cyan-400 transition-colors">Điều Khoản Sử Dụng & Chính Sách Riêng Tư</Link>
          <Link href="/careers" className="hover:text-cyan-400 transition-colors">Tuyển Dụng</Link>
          <Link href="/agreement" className="hover:text-cyan-400 transition-colors">Thỏa Thuận Người Dùng</Link>
          <Link href="/fan-content" className="hover:text-cyan-400 transition-colors">Hướng Dẫn Nội Dung Fan</Link>
          <Link href="/cookies" className="hover:text-cyan-400 transition-colors">Cookie Declaration</Link>
          <Link href="/redmod" className="hover:text-cyan-400 transition-colors">Phiên Bản Game</Link>
        </div>
        
        {/* Bottom footer */}
        <div className="text-center border-t border-[#223038]/30 pt-8">
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center mb-6">
              <Image 
                src="/images/overwatch_logo.png" 
                alt="M-SCI" 
                width={120} 
                height={80} 
                className="object-contain"
              />
            </div>
            <p className="text-gray-500 text-xs max-w-3xl mx-auto">
              © 2024 M-SCI. Đây là một dự án clone, không phải trang web chính thức. M-SCI, logo M-SCI, và tất cả các nhân vật, tên, và hình ảnh liên quan đều là thương hiệu và/hoặc nhãn hiệu đã đăng ký của dự án M-SCI.
            </p>
          </div>
          
          <div className="flex justify-center gap-8 mt-6">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors text-xs">
              M-SCI Game
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors text-xs">
              Official Store
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors text-xs">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 