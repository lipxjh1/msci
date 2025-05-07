'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCalendarAlt, FaTrophy, FaUsers } from 'react-icons/fa';

const TournamentBanner = () => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background video hoặc image */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-indigo-900/70 z-10" />
      
      <div className="absolute inset-0 bg-[url('/images/overwatch_bg_2.jpg')] bg-cover bg-center">
        {/* Hiệu ứng particles */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Hiệu ứng neon grid */}
      <div className="absolute inset-0 bg-[url('/images/grid_pattern.svg')] bg-repeat opacity-20 z-10" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center z-20 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.h2 
            className="text-lg md:text-xl text-cyan-400 font-semibold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            2049 - MÙA GIẢI MỚI
          </motion.h2>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            GIẢI VÔ ĐỊCH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              QUÂN ĐOÀN M-SCI
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Tái hiện cuộc chiến 100 màn giữa nhân loại và The Ascended. Bạn có đủ khả năng để trở thành huyền thoại?
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-cyan-400" />
              <span className="text-white">Mở đăng ký: 15/03/2049</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTrophy className="text-cyan-400" />
              <span className="text-white">Tổng giải thưởng: 100.000 $MSCI</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-cyan-400" />
              <span className="text-white">32 đội tham gia</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-md transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
              ĐĂNG KÝ NGAY
            </button>
            <button className="px-6 py-3 bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 font-medium rounded-md transition-all duration-300">
              XEM GIẢI ĐẤU
            </button>
          </motion.div>
        </motion.div>
        
        {/* Animated decorative elements */}
        <motion.div 
          className="absolute right-10 lg:right-20 bottom-10 lg:bottom-20 hidden md:block"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="relative w-56 h-56">
            <div className="absolute inset-0 rounded-lg border-2 border-cyan-500/50 transform rotate-45 opacity-70" />
            <div className="absolute inset-4 rounded-lg border border-blue-500/30 transform rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl text-cyan-400/80 font-bold">M</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Wave overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent z-20" />
    </div>
  );
};

export default TournamentBanner; 