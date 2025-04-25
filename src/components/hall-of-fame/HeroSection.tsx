'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import NeonButton from './ui/NeonButton';
import { useSound } from '@/context/SoundContext';
import { FaChevronDown, FaTrophy, FaStar, FaMedal } from 'react-icons/fa';
import Image from 'next/image';
import { TypingText } from './effects/TypingText';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(false);
  const { playSound } = useSound();
  const [activeIcon, setActiveIcon] = useState(0);

  const icons = [
    { icon: <FaTrophy className="text-yellow-400" />, label: "Champions" },
    { icon: <FaStar className="text-blue-400" />, label: "Stars" },
    { icon: <FaMedal className="text-purple-400" />, label: "Legends" }
  ];

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
    
    // Rotating icons
    const iconInterval = setInterval(() => {
      setActiveIcon(prev => (prev + 1) % icons.length);
    }, 3000);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(iconInterval);
    };
  }, [mounted, icons.length]);
  
  const scrollToAbout = () => {
    playSound('click');
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Background particles
  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push(
      <div 
        key={i}
        className="particle absolute rounded-full bg-blue-500"
        style={{
          width: `${Math.random() * 10 + 2}px`,
          height: `${Math.random() * 10 + 2}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5,
          animationDuration: `${Math.random() * 20 + 10}s`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    );
  }
  
  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <video
          className="object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
          src="https://res.cloudinary.com/dgsavskmi/video/upload/f_mp4/q_auto/home_bg_video_xknsd0.webm?_a=DATAg1AAZAA0"
        />
      </div>
      
      {/* Particles animation */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        {particles}
      </div>
      
      {/* Background flare effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-900/20 blur-[120px] opacity-30 z-[2]" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-cyan-900/20 blur-[80px] opacity-20 z-[2]" />
      
      {/* Banner with Trophy */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 w-full max-w-6xl mx-auto mb-8"
      >
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <div className="flex items-center justify-center py-4">
          <div className="w-16 h-16 md:w-24 md:h-24 relative mr-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-blue-500/30"
            />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl md:text-5xl"
            >
              {icons[activeIcon].icon}
            </motion.div>
          </div>
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={icons[activeIcon].label}
              className="text-xl md:text-2xl font-medium text-blue-400"
            >
              {icons[activeIcon].label}
            </motion.p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </motion.div>
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-6 text-center relative z-10"
      >
        <TypingText 
          text="M-SCI GAME PRESENTS" 
          className="text-cyan-400 text-lg md:text-xl mb-3 tracking-wider font-medium"
          typingSpeed={50}
        />
      </motion.div>
      
      <motion.h1
        ref={titleRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8, type: 'spring' }}
        className="text-5xl md:text-7xl lg:text-9xl font-cyber text-center text-white mb-8 tracking-wider relative z-10"
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
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "80%" }}
        transition={{ duration: 1.5, delay: 1 }}
        className="h-[2px] max-w-2xl bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-10 relative z-10"
      />
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="text-gray-300 max-w-2xl text-center mb-12 text-lg md:text-xl relative z-10"
      >
        Nơi vinh danh những cá nhân và tổ chức đã có đóng góp xuất sắc cho sự phát triển của M-SCI. Dựng xây tương lai và đẩy giới hạn game Việt ra toàn cầu.
      </motion.p>
      
      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="flex flex-wrap gap-6 justify-center relative z-10"
      >
        <NeonButton
          onClick={scrollToAbout}
          size="lg"
          variant="primary"
          className="px-10"
        >
          Khám Phá Huyền Thoại
        </NeonButton>
        
        <NeonButton
          onClick={() => window.open('/nomination', '_blank')}
          size="lg"
          variant="secondary"
          className="px-10"
        >
          Đề Cử Ứng Viên
        </NeonButton>
      </motion.div>
      
      {/* Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-32 grid grid-cols-3 gap-6 max-w-md mx-auto relative z-10"
      >
        {["INTERNATIONAL", "OFFICIAL", "ACCLAIMED"].map((badge, index) => (
          <motion.div
            key={badge}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2 + index * 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full border-2 border-gray-700 bg-black/50 backdrop-blur-sm flex items-center justify-center mb-2">
              <div className="w-10 h-10 relative">
                <Image
                  src={`/images/badge-${index + 1}.svg`}
                  alt={badge}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">{badge}</p>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 relative z-10"
      >
        <FaChevronDown className="text-cyan-400 text-2xl" />
      </motion.div>
      
      {/* Custom CSS for particle animations */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        
        .particle {
          animation: float-up linear infinite;
        }
      `}</style>
    </section>
  );
} 