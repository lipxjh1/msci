'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function RoadmapBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-[40vh] md:h-[45vh] lg:h-[50vh] overflow-hidden">
      {/* Nền banner với hiệu ứng parallax */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/banner/trangchu.jpg" 
          alt="M-SCI Roadmap Banner" 
          fill 
          priority
          className="object-cover object-center"
          style={{
            transform: isVisible ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 10s ease-out, filter 1.5s ease-in-out',
            filter: isVisible ? 'brightness(0.8)' : 'brightness(0.5)'
          }}
        />
      </div>

      {/* Lớp gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#16181D]/70 via-[#16181D]/60 to-[#16181D] z-10"></div>

      {/* Hiệu ứng lưới kỹ thuật số */}
      <div 
        className="absolute inset-0 z-20 opacity-20"
        style={{
          backgroundImage: 'url("/images/grid_pattern.svg")',
          backgroundSize: '100px',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Hiệu ứng hạt */}
      <div className="absolute inset-0 z-20">
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2], 
              scale: [0.2, 1, 0.2],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50
            }}
            transition={{ 
              duration: 3 + Math.random() * 5, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: index % 3 === 0 ? '#00A4EA' : (index % 3 === 1 ? '#FF7D00' : '#FFFFFF')
            }}
          />
        ))}
      </div>

      {/* Decoration Robots */}
      <div className="absolute top-1/4 right-10 w-40 h-40 z-20 opacity-20">
        <Image 
          src="/images/heroes/robot_3.png" 
          alt="Robot" 
          width={160} 
          height={160}
          className="object-contain"
        />
      </div>
      
      <div className="absolute bottom-1/4 left-10 w-40 h-40 z-20 opacity-20">
        <Image 
          src="/images/heroes/drone 1.png" 
          alt="Drone" 
          width={160} 
          height={160}
          className="object-contain"
        />
      </div>

      {/* Nội dung chính */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-30">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-2"
        >
          <span className="bg-[#FF7D00] text-white text-xs md:text-sm uppercase font-bold px-3 py-1 rounded-full tracking-wider">
            2024-2030
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A4EA] to-[#00D7FF]">
            ROAD MAP
          </span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-20 h-1 bg-[#FF7D00] mx-auto mb-6"
        ></motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-base md:text-lg text-gray-300 max-w-2xl text-center mb-8"
        >
        </motion.p>

        {/* Call to action button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <button 
            onClick={() => document.getElementById('roadmap-content')?.scrollIntoView({behavior: 'smooth'})}
            className="bg-[#00A4EA] hover:bg-[#00B5FF] text-white font-medium px-6 py-2.5 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-[#00A4EA]/30 flex items-center"
          >
            <span className="mr-2">Xem Chi Tiết</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Hiệu ứng đường kẻ sọc dọc - chỉ hiển thị trên màn hình lớn */}
      <div className="absolute inset-0 z-20 opacity-10 pointer-events-none hidden md:block">
        <div className="h-full w-px bg-white absolute left-1/4"></div>
        <div className="h-full w-px bg-white absolute left-1/2"></div>
        <div className="h-full w-px bg-white absolute left-3/4"></div>
      </div>

      {/* Vật trang trí ở góc */}
      <motion.div
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 0.8, rotate: 0 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute top-10 right-10 md:top-20 md:right-20 w-20 h-20 md:w-28 md:h-28 z-20 opacity-30"
      >
        <Image
          src="/images/particle_overlay.svg"
          alt="Decorative Element"
          width={120}
          height={120}
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
} 