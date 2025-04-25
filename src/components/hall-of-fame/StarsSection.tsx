'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { hallOfFameData } from '@/data/hallOfFameData';
import SectionTitle from './ui/SectionTitle';
import NeonButton from './ui/NeonButton';
import { useSound } from '@/context/SoundContext';
import { FaStar, FaAward, FaFire, FaCrown, FaMedal } from 'react-icons/fa';
import Link from 'next/link';

export default function StarsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const { playSound } = useSound();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };
  
  // Handle button click
  const handleDetailsClick = () => {
    playSound('click');
  };
  
  // Get top stars
  const getStars = () => {
    return hallOfFameData.community.leaders.slice(0, 2);
  };

  return (
    <section
      id="stars-section"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 relative bg-gradient-to-b from-gray-950 via-yellow-950/10 to-gray-950"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
        
        {/* Star elements in background */}
        <div className="absolute top-1/3 right-20 opacity-10">
          <FaStar className="text-9xl text-yellow-300" />
        </div>
        <div className="absolute bottom-1/3 left-20 opacity-10">
          <FaAward className="text-9xl text-yellow-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          subtitle="Ngôi sao"
          title="Những Ngôi Sao Sáng Nhất"
          description="Những thành viên xuất sắc đã để lại dấu ấn không thể phai mờ trong cộng đồng M-SCI."
          isInView={isInView}
          lightColor="yellow-400"
          darkColor="yellow-900"
        />

        {/* Stars display section - Card style like in the image */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-20 mt-12"
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-8 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              Bảng Xếp Hạng Đầy Đủ
            </span>
            <div className="absolute w-24 h-1 bg-yellow-500/50 bottom-0 left-1/2 transform -translate-x-1/2 rounded-full mt-2"></div>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {getStars().map((star, index) => (
              <motion.div 
                key={star.id}
                variants={itemVariants}
                className="rounded-lg overflow-hidden bg-gray-900/80 border border-yellow-500/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                onMouseEnter={() => playSound('hover')}
              >
                <div className="relative h-[230px] overflow-hidden">
                  <img 
                    src={star.imageUrl} 
                    alt={star.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  
                  {/* Star badge */}
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 backdrop-blur-sm">
                    {index === 0 ? 
                      <FaCrown className="text-yellow-400 text-lg" /> : 
                      <FaStar className="text-yellow-400 text-lg" />
                    }
                  </div>
                  
                  {/* Stats or events */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-xs font-bold text-white">
                    {star.stats.eventsOrganized ? `${star.stats.eventsOrganized} sự kiện` : "100+ sự kiện"}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-t from-yellow-950/30 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-1">{star.name}</h3>
                  <p className="text-yellow-400 text-sm mb-1">{star.platform}</p>
                  <p className="text-gray-400 text-xs">
                    {index === 0 ? "Voice of the People" : "Guardian of Peace"}
                  </p>
                </div>
                
                {/* Number badge at bottom */}
                <div className="w-full h-10 bg-blue-500 flex items-center justify-center text-white font-bold">
                  # {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center"
        >
          <Link href="/hall-of-fame/all-stars">
            <NeonButton
              onClick={handleDetailsClick}
              glowColor="rgb(234, 179, 8)"
              className="px-8"
            >
              XEM TẤT CẢ NGÔI SAO
            </NeonButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 