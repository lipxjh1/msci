'use client';

import { motion } from 'framer-motion';
import { GiLaurelCrown, GiPodium } from 'react-icons/gi';
import { FaCrown, FaMedal, FaTrophy, FaAward, FaStar } from 'react-icons/fa';
import { LegendData } from './LegendCard';

// Props cho top legends podium
interface LegendPodiumProps {
  legends: LegendData[];
  playSound: (sound: string) => void;
}

// Props cho từng vị trí trên podium
interface TopLegendProps {
  legend: LegendData;
  position: number;
  playSound: (sound: string) => void;
}

// Component hiển thị huyền thoại top 3
const TopLegend = ({ legend, position, playSound }: TopLegendProps) => {
  // Xác định màu sắc và kích thước dựa trên vị trí
  const getPodiumStyles = () => {
    switch (position) {
      case 1:
        return {
          containerHeight: 'h-80',
          podiumHeight: 'h-24',
          podiumBg: 'bg-gradient-to-r from-purple-500 to-purple-300',
          borderColor: 'border-purple-400',
          shadowColor: 'shadow-purple-500/30',
          crownColor: 'text-purple-500',
          crownSize: 'text-5xl',
          transform: 'scale(1.1)',
          zIndex: 'z-30',
        };
      case 2:
        return {
          containerHeight: 'h-72',
          podiumHeight: 'h-16',
          podiumBg: 'bg-gradient-to-r from-slate-400 to-slate-300',
          borderColor: 'border-slate-400',
          shadowColor: 'shadow-slate-500/30',
          crownColor: 'text-slate-400',
          crownSize: 'text-4xl',
          transform: 'scale(1)',
          zIndex: 'z-20',
        };
      case 3:
        return {
          containerHeight: 'h-64',
          podiumHeight: 'h-10',
          podiumBg: 'bg-gradient-to-r from-amber-700 to-amber-500',
          borderColor: 'border-amber-600',
          shadowColor: 'shadow-amber-700/30',
          crownColor: 'text-amber-600',
          crownSize: 'text-3xl',
          transform: 'scale(0.95)',
          zIndex: 'z-10',
        };
      default:
        return {
          containerHeight: 'h-64',
          podiumHeight: 'h-8',
          podiumBg: 'bg-gradient-to-r from-gray-700 to-gray-600',
          borderColor: 'border-gray-600',
          shadowColor: 'shadow-gray-700/30',
          crownColor: 'text-gray-600',
          crownSize: 'text-xl',
          transform: 'scale(0.9)',
          zIndex: 'z-0',
        };
    }
  };

  const styles = getPodiumStyles();

  // Hiển thị biểu tượng phù hợp với vị trí
  const renderAward = () => {
    switch (position) {
      case 1:
        return <GiLaurelCrown className={`${styles.crownColor} ${styles.crownSize} absolute -top-8 left-1/2 transform -translate-x-1/2`} />;
      case 2:
        return <FaCrown className={`${styles.crownColor} ${styles.crownSize} absolute -top-6 left-1/2 transform -translate-x-1/2`} />;
      case 3:
        return <FaMedal className={`${styles.crownColor} ${styles.crownSize} absolute -top-5 left-1/2 transform -translate-x-1/2`} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`relative ${styles.containerHeight} flex flex-col items-center`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: position * 0.1 }}
      style={{ transform: styles.transform }}
    >
      {renderAward()}
      
      <div 
        className={`relative flex-grow flex flex-col items-center justify-end mb-4 max-w-52`}
        onMouseEnter={() => playSound('hover')}
      >
        <div className={`${styles.borderColor} ${styles.shadowColor} border-2 rounded-xl overflow-hidden shadow-lg bg-gray-900/90 backdrop-blur-sm w-full hover:shadow-xl transition-all duration-300`}>
          <div className="relative h-40 overflow-hidden">
            <img
              src={legend.imageUrl}
              alt={legend.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            
            {/* Huy hiệu huyền thoại */}
            <div className="absolute top-2 right-2 p-1 rounded-full bg-black/70 backdrop-blur-sm">
              {position === 1 ? (
                <FaTrophy className="text-purple-400 text-lg" />
              ) : position === 2 ? (
                <FaAward className="text-purple-400 text-lg" />
              ) : (
                <FaStar className="text-purple-400 text-lg" />
              )}
            </div>

            {/* Hiển thị điểm */}
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-xs font-bold text-white">
              {legend.points} điểm
            </div>
          </div>
          
          <div className="p-4 text-center">
            <h3 className="font-bold text-white text-lg truncate">{legend.name}</h3>
            <p className="text-xs text-gray-400 mb-1 truncate">{legend.title}</p>
            <p className="text-xs text-purple-300 font-medium truncate">
              {legend.achievements || "Huyền thoại M-SCI"}
            </p>
          </div>
        </div>
      </div>

      {/* Bục podium */}
      <div className={`w-full ${styles.podiumHeight} ${styles.podiumBg} rounded-t-lg flex items-center justify-center text-black font-bold`}>
        # {position}
      </div>
    </motion.div>
  );
};

// Component chính cho phần podium
export const LegendPodium = ({ legends, playSound }: LegendPodiumProps) => {
  if (!legends || legends.length < 3) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mb-24 mt-16"
    >
      <div className="relative">
        {/* Tiêu đề top 3 */}
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

        {/* Hiệu ứng sân khấu */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
        
        {/* Podium hiển thị Top 3 */}
        <div className="flex justify-center items-end space-x-8 md:space-x-16 h-80 mt-16">
          {/* Vị trí thứ 2 */}
          <TopLegend legend={legends[1]} position={2} playSound={playSound} />
          
          {/* Vị trí thứ 1 */}
          <TopLegend legend={legends[0]} position={1} playSound={playSound} />
          
          {/* Vị trí thứ 3 */}
          <TopLegend legend={legends[2]} position={3} playSound={playSound} />
        </div>
      </div>
    </motion.div>
  );
}; 