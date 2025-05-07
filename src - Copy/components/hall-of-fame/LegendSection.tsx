'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { hallOfFameData } from '@/data/hallOfFameData';
import SectionTitle from './ui/SectionTitle';
import NeonButton from './ui/NeonButton';
import { useSound } from '@/context/SoundContext';
import { FaTrophy, FaMedal, FaCrown, FaStar } from 'react-icons/fa';
import { GiLaurelCrown } from 'react-icons/gi';

// Component cho từng vị trí trên podium
interface LegendPodiumItemProps {
  legend: any;
  position: number;
  playSound: (sound: string) => void;
}

const LegendPodiumItem = ({ legend, position, playSound }: LegendPodiumItemProps) => {
  // Xác định màu sắc và style dựa trên vị trí
  const getPodiumStyles = () => {
    switch (position) {
      case 1:
        return {
          containerClass: "border-yellow-500 bg-gradient-to-t from-yellow-950/50 to-yellow-900/20",
          heightClass: "h-full",
          badgeClass: "text-yellow-400",
          icon: <GiLaurelCrown className="text-2xl" />,
          podiumBg: "bg-gradient-to-r from-yellow-600 to-yellow-500",
          textColor: "text-yellow-400"
        };
      case 2:
        return {
          containerClass: "border-purple-500 bg-gradient-to-t from-purple-950/50 to-purple-900/20",
          heightClass: "h-[85%]",
          badgeClass: "text-purple-400",
          icon: <FaCrown className="text-2xl" />,
          podiumBg: "bg-gradient-to-r from-purple-600 to-purple-500",
          textColor: "text-purple-400"
        };
      case 3:
        return {
          containerClass: "border-orange-500 bg-gradient-to-t from-orange-950/50 to-orange-900/20",
          heightClass: "h-[70%]",
          badgeClass: "text-orange-400",
          icon: <FaMedal className="text-2xl" />,
          podiumBg: "bg-gradient-to-r from-orange-600 to-orange-500",
          textColor: "text-orange-400"
        };
      default:
        return {
          containerClass: "border-gray-500 bg-gradient-to-t from-gray-950/50 to-gray-900/20",
          heightClass: "h-[60%]",
          badgeClass: "text-gray-400",
          icon: <FaStar className="text-2xl" />,
          podiumBg: "bg-gradient-to-r from-gray-600 to-gray-500",
          textColor: "text-gray-400"
        };
    }
  };

  const styles = getPodiumStyles();

  return (
    <div 
      className={`relative flex flex-col justify-end ${position === 1 ? 'order-2' : position === 2 ? 'order-1' : 'order-3'}`}
      style={{ flex: position === 1 ? '1.2' : '1' }}
    >
      <div 
        className={`${styles.heightClass} relative`}
        onMouseEnter={() => playSound('hover')}
      >
        <div className={`border-2 ${styles.containerClass} rounded-xl overflow-hidden shadow-xl w-full transition-all duration-300 hover:-translate-y-2`}>
          <div className="relative h-40 overflow-hidden">
            <img 
              src={legend.imageUrl} 
              alt={legend.nickname || legend.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            
            {/* Badge */}
            <div className={`absolute top-3 right-3 p-1.5 rounded-full bg-black/70 backdrop-blur-sm ${styles.badgeClass}`}>
              {styles.icon}
            </div>

            {/* Points */}
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-xs font-bold text-white">
              {legend.points || (legend.stats?.points)} điểm
            </div>
          </div>
          
          <div className="p-4 text-center">
            <h3 className="font-bold text-white text-base truncate">{legend.nickname || legend.name}</h3>
            <p className={`text-xs ${styles.textColor} font-medium`}>
              {legend.achievement || legend.title || "Huyền thoại M-SCI"}
            </p>
            <p className="text-xs text-gray-400 truncate mt-1">
              {legend.guild || (legend.stats?.title) || "Nhà sáng lập"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Podium base */}
      <div className={`h-12 ${styles.podiumBg} rounded-t-lg flex items-center justify-center font-bold mt-2`}>
        # {position}
      </div>
    </div>
  );
};

export default function LegendSection() {
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

  // Handle button click
  const handleDetailsClick = () => {
    playSound('click');
  };

  // Get top legends (mixing from different sources for better display)
  const getTopLegends = () => {
    // Try to get variety of legends from different sources
    const legends = [
      // Use first founder as 1st place
      hallOfFameData.founders[0],
      // Use first player legend as 2nd place
      hallOfFameData.players.legends[0],
      // Use another founder or investor as 3rd place
      hallOfFameData.founders[1] || hallOfFameData.investors.eternal[0]
    ];
    
    return legends;
  };

  return (
    <section
      id="legends-section"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 relative bg-gradient-to-b from-gray-950 via-purple-950/10 to-gray-950"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        
        {/* Trophy holograms in background */}
        <div className="absolute top-1/3 right-20 opacity-10">
          <FaTrophy className="text-9xl text-purple-300" />
        </div>
        <div className="absolute bottom-1/3 left-20 opacity-10">
          <FaCrown className="text-9xl text-purple-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          subtitle="Vinh danh"
          title="Huyền Thoại M-SCI"
          description="Những huyền thoại đã tạo nên lịch sử và góp phần định hình nên thế giới M-SCI như ngày hôm nay."
          isInView={isInView}
          lightColor="purple-400"
          darkColor="purple-900"
        />

        {/* Podium display section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-20 mt-16"
        >
          <div className="relative">
            {/* Tiêu đề */}
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-center mb-12 relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                Những Huyền Thoại Hàng Đầu
              </span>
              <div className="absolute w-24 h-1 bg-purple-500/50 bottom-0 left-1/2 transform -translate-x-1/2 rounded-full mt-2"></div>
            </motion.h2>

            {/* Podium hiển thị Top 3 */}
            <div className="flex h-96 gap-4 max-w-4xl mx-auto">
              {getTopLegends().map((legend, index) => (
                <LegendPodiumItem 
                  key={legend.id} 
                  legend={legend} 
                  position={index + 1} 
                  playSound={playSound}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center"
        >
          <Link href="/hall-of-fame/legends">
            <NeonButton
              onClick={handleDetailsClick}
              glowColor="rgb(168, 85, 247)"
              className="px-8"
            >
              XEM TẤT CẢ HUYỀN THOẠI
            </NeonButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 