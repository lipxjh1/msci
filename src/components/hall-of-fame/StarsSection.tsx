'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { hallOfFameData } from '@/data/hallOfFameData';
import SectionTitle from './ui/SectionTitle';
import NeonButton from './ui/NeonButton';
import { useSound } from '@/context/SoundContext';
import { FaStar, FaAward, FaFire } from 'react-icons/fa';

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

        {/* Stars grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {hallOfFameData.community.leaders.slice(0, 6).map((star, index: number) => (
            <motion.div 
              key={star.id}
              variants={itemVariants}
              className="bg-gray-900/70 backdrop-blur-sm border border-yellow-500/20 rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(234,179,8,0.15)] transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={star.imageUrl} 
                  alt={star.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                
                {/* Star badge */}
                <div className="absolute top-4 right-4 bg-yellow-500/90 text-white p-2 rounded-full">
                  <FaStar className="text-xl" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{star.name}</h3>
                <p className="text-yellow-300 text-sm mb-4">{star.platform}</p>
                <p className="text-gray-400 text-sm mb-6">{star.stats.title || "Ngôi sao cộng đồng M-SCI"}</p>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-yellow-400 gap-1">
                    <FaFire />
                    <span>{star.stats.eventsOrganized ? `${star.stats.eventsOrganized} sự kiện` : "Người có ảnh hưởng"}</span>
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
            glowColor="rgb(234, 179, 8)"
            className="px-8"
          >
            Xem tất cả Ngôi sao
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
} 