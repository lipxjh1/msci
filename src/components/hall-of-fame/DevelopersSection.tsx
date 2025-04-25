'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { hallOfFameData } from '@/data/hallOfFameData';
import SectionTitle from './ui/SectionTitle';
import NeonButton from './ui/NeonButton';
import { useSound } from '@/context/SoundContext';
import { FaCode, FaLaptopCode, FaBrain } from 'react-icons/fa';

export default function DevelopersSection() {
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

  // Get developers data
  const getDevelopers = () => {
    // Mélanger créateurs et helpers pour avoir une bonne variété
    const developers = [
      ...hallOfFameData.community.creators,
      ...hallOfFameData.community.helpers
    ].slice(0, 3);

    return developers;
  };

  return (
    <section
      id="developers-section"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 relative bg-gradient-to-b from-gray-950 via-blue-950/10 to-gray-950"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        
        {/* Code elements in background */}
        <div className="absolute top-1/3 right-20 opacity-10">
          <FaCode className="text-9xl text-blue-300" />
        </div>
        <div className="absolute bottom-1/3 left-20 opacity-10">
          <FaBrain className="text-9xl text-blue-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          subtitle="Kỹ thuật"
          title="Đội Ngũ Phát Triển"
          description="Những nhà phát triển tài năng đã đóng góp vào sự tiến bộ của M-SCI với kỹ năng và sáng tạo không giới hạn."
          isInView={isInView}
          lightColor="blue-400"
          darkColor="blue-900"
        />

        {/* Developers grid - Card style like in the image */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-16 mt-12"
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-8 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Bảng Xếp Hạng Đầy Đủ
            </span>
            <div className="absolute w-24 h-1 bg-blue-500/50 bottom-0 left-1/2 transform -translate-x-1/2 rounded-full mt-2"></div>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {getDevelopers().map((developer, index) => (
              <motion.div 
                key={developer.id}
                variants={itemVariants}
                className="rounded-lg overflow-hidden bg-gray-900/80 border border-blue-500/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                onMouseEnter={() => playSound('hover')}
              >
                <div className="relative h-[230px] overflow-hidden">
                  <img 
                    src={developer.imageUrl} 
                    alt={developer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  
                  {/* Developer tag */}
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-blue-500/90 text-white">
                    <FaLaptopCode className="text-lg" />
                  </div>
                  
                  {/* Stats or points */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-xs font-bold text-white">
                    {developer.type === 'creator' ? '100+ sự kiện' : '8500 điểm'}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-t from-blue-950/30 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-1">{developer.name}</h3>
                  <p className="text-blue-400 text-sm mb-1">{developer.platform}</p>
                  <p className="text-gray-400 text-xs">
                    {developer.type === 'creator' ? 'Người sáng tạo nội dung' : 'Người đóng góp kỹ thuật'}
                  </p>
                </div>
                
                {/* Number badge */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500/70"></div>
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
          <Link href="/hall-of-fame/developers">
            <NeonButton
              onClick={handleDetailsClick}
              glowColor="rgb(59, 130, 246)"
              className="px-8"
            >
              XEM TẤT CẢ NHÀ PHÁT TRIỂN
            </NeonButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 