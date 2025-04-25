'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

        {/* Developers grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {[...hallOfFameData.community.creators, ...hallOfFameData.community.helpers].slice(0, 6).map((developer, index: number) => (
            <motion.div 
              key={developer.id}
              variants={itemVariants}
              className="bg-gray-900/70 backdrop-blur-sm border border-blue-500/20 rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={developer.imageUrl} 
                  alt={developer.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                
                {/* Developer specialty icon */}
                <div className="absolute top-4 right-4 bg-blue-500/90 text-white p-2 rounded-full">
                  <FaLaptopCode className="text-xl" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{developer.name}</h3>
                <p className="text-blue-300 text-sm mb-4">{developer.platform}</p>
                <p className="text-gray-400 text-sm mb-6">{developer.type === 'creator' ? 'Người sáng tạo nội dung' : 'Người đóng góp kỹ thuật'}</p>
                
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-gray-400">Chuyên môn: </span>
                    <span className="text-white">{developer.type === 'creator' ? 'Nội dung' : 'Kỹ thuật'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center"
        >
          <NeonButton
            onClick={handleDetailsClick}
            glowColor="rgb(59, 130, 246)"
            className="px-8"
          >
            Xem tất cả Nhà phát triển
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
} 