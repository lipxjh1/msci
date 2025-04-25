'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import NeonButton from './ui/NeonButton';
import { useSound } from '@/context/SoundContext';
import { FaChevronDown } from 'react-icons/fa';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(false);
  const { playSound } = useSound();

  // 3D effect on mouse move
  useEffect(() => {
    setMounted(true);
    
    const container = containerRef.current;
    const title = titleRef.current;
    
    if (!container || !title) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      // Apply 3D rotation effect
      title.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${y * -10}deg)
        translateZ(50px)
      `;
      
      // Light up effect - change shadow based on mouse position
      const shadowX = x * 20;
      const shadowY = y * 20;
      title.style.textShadow = `
        ${-shadowX}px ${-shadowY}px 10px rgba(6, 182, 212, 0.5),
        ${shadowX}px ${shadowY}px 10px rgba(59, 130, 246, 0.5),
        0 0 20px rgba(6, 182, 212, 0.8),
        0 0 40px rgba(6, 182, 212, 0.4),
        0 0 60px rgba(6, 182, 212, 0.2)
      `;
    };
    
    const handleMouseLeave = () => {
      // Reset to original position smoothly
      title.style.transition = 'all 0.5s ease';
      title.style.transform = `
        perspective(1000px)
        rotateY(0deg)
        rotateX(0deg)
        translateZ(0)
      `;
      title.style.textShadow = `
        0 0 20px rgba(6, 182, 212, 0.8),
        0 0 40px rgba(6, 182, 212, 0.4),
        0 0 60px rgba(6, 182, 212, 0.2)
      `;
      
      // Remove transition after animation completes
      setTimeout(() => {
        if (title) {
          title.style.transition = '';
        }
      }, 500);
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mounted]);
  
  const scrollToAbout = () => {
    playSound('click');
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      {/* Background flare effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-900/20 blur-[120px] opacity-30" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-cyan-900/20 blur-[80px] opacity-20" />
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-6 text-center"
      >
        <p className="text-cyan-400 text-lg md:text-xl mb-3 tracking-wider font-medium">M-SCI GAME</p>
      </motion.div>
      
      <motion.h1
        ref={titleRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8, type: 'spring' }}
        className="text-5xl md:text-7xl lg:text-8xl font-cyber text-center text-white mb-8 tracking-wider"
        style={{
          textShadow: `
            0 0 20px rgba(6, 182, 212, 0.8),
            0 0 40px rgba(6, 182, 212, 0.4),
            0 0 60px rgba(6, 182, 212, 0.2)
          `,
          transform: 'perspective(1000px)',
          transformStyle: 'preserve-3d',
        }}
      >
        HALL OF FAME
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="text-gray-300 max-w-xl text-center mb-12 text-lg"
      >
        Nơi vinh danh những cá nhân và tổ chức đã có đóng góp xuất sắc cho sự phát triển của game.
      </motion.p>
      
      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <NeonButton
          onClick={scrollToAbout}
          size="lg"
          variant="primary"
          className="px-10"
        >
          Khám Phá
        </NeonButton>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <FaChevronDown className="text-cyan-400 text-2xl" />
      </motion.div>
    </section>
  );
} 