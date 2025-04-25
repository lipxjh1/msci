import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram, FaEnvelope } from 'react-icons/fa';

const TeamFooter = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Battlefield Image Background */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image 
          src="/images/overwatch_bg_2.jpg" 
          alt="Team battlefield" 
          fill
          sizes="100vw"
          className="object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 to-[#041019]/90"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 z-10">
          <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-10 px-4">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-wide uppercase">
              THAM GIA ĐỘI NGŨ M-SCI
            </h2>
            
            <p className="text-white/80 mb-6 max-w-2xl">
              M-SCI luôn tìm kiếm những tài năng mới để cùng xây dựng tương lai của gaming. Nếu bạn 
              đam mê game và muốn tạo ra điều khác biệt, hãy xem các vị trí đang tuyển dụng của chúng tôi.
            </p>
            
            <Link 
              href="/careers"
              className="mb-10 px-8 py-3 bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-lg shadow-lg hover:shadow-[#FF7D00]/50"
            >
              XEM CƠ HỘI NGHỀ NGHIỆP
            </Link>
            
            <div className="mt-6">
              <h3 className="text-gray-300 uppercase text-xl tracking-widest mb-3 font-medium">LIÊN HỆ VỚI CHÚNG TÔI</h3>
              
              <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-2 mb-4">
                <div className="flex items-center text-white/90">
                  <span>Email chung: <a href="mailto:team@msci.game" className="text-[#FF7D00] hover:underline">team@msci.game</a></span>
                </div>
                <div className="flex items-center text-white/90">
                  <span>Hợp tác kinh doanh: <a href="mailto:partners@msci.game" className="text-[#FF7D00] hover:underline">partners@msci.game</a></span>
                </div>
                <div className="flex items-center text-white/90">
                  <span>Tuyển dụng: <a href="mailto:careers@msci.game" className="text-[#FF7D00] hover:underline">careers@msci.game</a></span>
                </div>
              </div>
              
              <div className="flex justify-center space-x-6 mt-4">
                <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                  <FaFacebookF className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                  <FaYoutube className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                  <FaDiscord className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                  <FaTelegram className="h-6 w-6" />
                </a>
              </div>
              
              <div className="mt-8 text-white/70 text-sm italic">
                "Chúng tôi không chỉ tạo ra game, chúng tôi xây dựng tương lai của ngành công nghiệp game Việt Nam."
              </div>
              <div className="mt-2 text-white/50 text-xs">
                © 2024 M-SCI Team. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamFooter; 