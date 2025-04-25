'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaTrophy, FaMedal, FaCrown, FaFire } from 'react-icons/fa';

// Định nghĩa interface cho dữ liệu huyền thoại
export interface LegendData {
  id: string;
  name: string;
  title: string;
  description?: string;
  imageUrl: string;
  achievements?: string;
  category?: string;
  rank?: number;
  points?: number;
  stats?: Record<string, string | number>;
  [key: string]: any;
}

// Props cho component thẻ huyền thoại
interface LegendCardProps {
  legend: LegendData;
  index: number;
  onHover: () => void;
}

// Animation variants
const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: (i: number) => ({ 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5,
      delay: i * 0.05,
    }
  }),
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.4
    }
  }
};

export const LegendCard = ({ legend, index, onHover }: LegendCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });

  // Xác định icon và class cho xếp hạng
  const getRankBadge = () => {
    const rank = legend.rank || 0;
    if (rank <= 3) return null; // Top 3 được hiển thị ở podium

    if (rank <= 10) {
      return (
        <div className="absolute -top-3 -left-3 bg-purple-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-black shadow-md">
          {rank}
        </div>
      );
    }

    return (
      <div className="absolute -top-3 -left-3 bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-black">
        {rank}
      </div>
    );
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="exit"
      custom={index}
      className="bg-gray-900/70 backdrop-blur-sm border relative border-purple-500/20 rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
      onMouseEnter={onHover}
      whileHover={{ scale: 1.02 }}
    >
      {/* Badge xếp hạng */}
      {getRankBadge()}

      <div className="relative h-48 overflow-hidden">
        <img 
          src={legend.imageUrl} 
          alt={legend.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        
        {/* Huy hiệu */}
        <div className="absolute top-4 right-4 bg-purple-500/90 text-white p-2 rounded-full">
          {index === 0 ? <FaCrown className="text-xl" /> : 
           index === 1 ? <FaTrophy className="text-xl" /> : 
           <FaMedal className="text-xl" />}
        </div>

        {/* Hiển thị điểm */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded-lg">
          {legend.points} điểm
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{legend.name}</h3>
        <p className="text-purple-300 text-sm mb-2">{legend.title}</p>
        <p className="text-gray-400 text-xs mb-4">{legend.description?.slice(0, 80)}...</p>
        
        <div className="flex items-center gap-2 flex-wrap">
          {legend.stats && Object.entries(legend.stats).map(([key, value], i) => (
            key !== 'title' && (
              <div key={i} className="flex items-center text-purple-400 gap-1 bg-gray-800/60 px-2 py-1 rounded-full text-xs">
                <FaFire />
                <span>{value}</span>
              </div>
            )
          ))}
          {legend.achievements && (
            <div className="flex items-center text-purple-400 gap-1 bg-gray-800/60 px-2 py-1 rounded-full text-xs">
              <FaFire />
              <span>{legend.achievements}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}; 