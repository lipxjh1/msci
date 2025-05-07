"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import Link from 'next/link';

export default function DonateHero() {
  const controlsTitle = useAnimation();
  const controlsSubtitle = useAnimation();
  const controlsButton = useAnimation();
  const controlsImage = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controlsTitle.start({ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" }
      });
      await controlsSubtitle.start({ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" }
      });
      await controlsButton.start({ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      });
      await controlsImage.start({ 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" }
      });
    };
    
    sequence();
  }, [controlsTitle, controlsSubtitle, controlsButton, controlsImage]);

  const scrollToPackages = () => {
    const packagesSection = document.getElementById('donate-packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden mt-4">
      {/* Background - có hiệu ứng parallax và lớp phủ */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/overwatch_bg_2.jpg"
          alt="M-SCI Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-gray-900/70 to-gray-900/90 z-10"></div>
        
        {/* Particle overlay */}
        <div className="absolute inset-0 z-20 opacity-30">
          <Image
            src="/images/particle_overlay.png"
            alt="Particles"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 z-30 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <motion.h1 
            className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={controlsTitle}
          >
            CÙNG M-SCI KIẾN TẠO<br />
            <span className="text-cyan-400">TƯƠNG LAI GAME VIỆT NAM</span>
          </motion.h1>
          
          <motion.p
            className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={controlsSubtitle}
          >
            Mỗi gói hỗ trợ không chỉ đơn thuần là một giao dịch tài chính, mà là một cam kết, 
            một lời hứa về sự đồng hành trong hành trình kiến tạo nên một biểu tượng mới cho game Việt.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controlsButton}
          >
            <Link href="/donate/premium-packages">
              <button 
                onClick={scrollToPackages}
                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-cyan-500/30 transform hover:scale-105 duration-300"
              >
                Khám Phá Các Gói Donate
              </button>
            </Link>
          </motion.div>
        </div>
        
        {/* Hero Image */}
        <div className="md:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={controlsImage}
            className="relative h-64 md:h-80 lg:h-96 w-full"
          >
            <Image
              src="/images/home/FS-img/hero.png"
              alt="Hero Character"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={scrollToPackages}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start p-1">
          <div className="w-1.5 h-3 bg-white rounded-full animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
} 