'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PartnersHero() {
  return (
    <div className="relative h-[250px] md:h-[300px] lg:h-[400px] overflow-hidden">
      {/* Background Image với scale effect */}
      <Image 
        src="/images/banner/trangchu.jpg" 
        alt="Partners Banner" 
        fill
        priority
        sizes="100vw"
        className="object-cover object-center brightness-65 scale-105 transition-transform duration-10000 hover:scale-110"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/60 via-[#041019]/70 to-[#041019]/90"></div>
      
      {/* Animated Overlay Particles */}
      <div className="absolute inset-0 bg-[url('/images/particle-overlay.png')] bg-repeat opacity-10"></div>
      
      {/* Content Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl px-4 z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 cyber-halo text-shadow-blue font-orbitron tracking-wider">
              TRỞ THÀNH <span className="text-[var(--accent-blue-bright)]">ĐỐI TÁC</span> M-SCI
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/90 max-w-3xl mx-auto px-4 text-lg md:text-xl leading-relaxed font-light"
          >
            M-SCI mời gọi các tổ chức, doanh nghiệp và cá nhân có tầm nhìn cùng hợp tác để phát triển hệ sinh thái game toàn diện. Hãy cùng chúng tôi tạo nên những giá trị bền vững cho cộng đồng game thủ toàn cầu.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            <a 
              href="#partner-form" 
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[var(--accent-blue-bright)] to-blue-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105"
            >
              Đăng Ký Ngay
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom Fade Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--overwatch-dark-blue)] to-transparent"></div>
    </div>
  );
} 