'use client';

import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaPalette, FaBrain, FaGamepad, FaRocket, FaStar, FaAward, FaMedal } from 'react-icons/fa';
import { GiLaurelCrown } from 'react-icons/gi';
import { DeveloperData } from './DeveloperCard';

// Props cho component
interface DeveloperPodiumProps {
  developers: DeveloperData[];
  playSound: (sound: string) => void;
}

// Props cho từng developer trên podium
interface TopDeveloperProps {
  developer: DeveloperData;
  position: number;
  playSound: (sound: string) => void;
}

// Component hiển thị developer top 3
const TopDeveloper = ({ developer, position, playSound }: TopDeveloperProps) => {
  // Xác định màu sắc và kích thước dựa trên vị trí
  const getPodiumStyles = () => {
    switch (position) {
      case 1:
        return {
          containerHeight: 'h-80',
          podiumHeight: 'h-24',
          podiumBg: 'bg-gradient-to-r from-blue-500 to-blue-300',
          borderColor: 'border-blue-400',
          shadowColor: 'shadow-blue-500/30',
          crownColor: 'text-blue-500',
          crownSize: 'text-5xl',
          transform: 'scale(1.1)',
          zIndex: 'z-30',
        };
      case 2:
        return {
          containerHeight: 'h-72',
          podiumHeight: 'h-16',
          podiumBg: 'bg-gradient-to-r from-green-500 to-green-300',
          borderColor: 'border-green-400',
          shadowColor: 'shadow-green-500/30',
          crownColor: 'text-green-400',
          crownSize: 'text-4xl',
          transform: 'scale(1)',
          zIndex: 'z-20',
        };
      case 3:
        return {
          containerHeight: 'h-64',
          podiumHeight: 'h-10',
          podiumBg: 'bg-gradient-to-r from-cyan-600 to-cyan-400',
          borderColor: 'border-cyan-500',
          shadowColor: 'shadow-cyan-500/30',
          crownColor: 'text-cyan-500',
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
        return <FaAward className={`${styles.crownColor} ${styles.crownSize} absolute -top-6 left-1/2 transform -translate-x-1/2`} />;
      case 3:
        return <FaMedal className={`${styles.crownColor} ${styles.crownSize} absolute -top-5 left-1/2 transform -translate-x-1/2`} />;
      default:
        return null;
    }
  };

  // Trả về icon phù hợp với loại developer
  const getDeveloperIcon = (type?: string) => {
    switch (type) {
      case 'frontend':
        return <FaLaptopCode className="text-lg" />;
      case 'backend':
        return <FaCode className="text-lg" />;
      case 'designer':
        return <FaPalette className="text-lg" />;
      case 'game':
        return <FaGamepad className="text-lg" />;
      case 'lead':
        return <FaRocket className="text-lg" />;
      default:
        return <FaBrain className="text-lg" />;
    }
  };

  // Xác định màu sắc badge dựa trên loại developer
  const getBadgeColor = (type?: string) => {
    switch (type) {
      case 'frontend':
        return 'text-blue-400';
      case 'backend':
        return 'text-green-400';
      case 'designer':
        return 'text-pink-400';
      case 'game':
        return 'text-purple-400';
      case 'lead':
        return 'text-yellow-400';
      default:
        return 'text-cyan-400';
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
              src={developer.imageUrl || "https://via.placeholder.com/300x400?text=Developer"}
              alt={developer.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            
            {/* Badge loại developer */}
            <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 backdrop-blur-sm">
              <span className={getBadgeColor(developer.type)}>
                {getDeveloperIcon(developer.type)}
              </span>
            </div>

            {/* Hiển thị điểm */}
            {developer.points && (
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-xs font-bold text-white">
                {developer.points} điểm
              </div>
            )}
          </div>
          
          <div className="p-4 text-center">
            <h3 className="font-bold text-white text-lg truncate">{developer.name}</h3>
            <p className="text-xs text-gray-400 mb-1 truncate">{developer.role}</p>
            
            {/* Technologies */}
            {developer.technologies && developer.technologies.length > 0 && (
              <p className="text-xs text-blue-300 font-medium truncate">
                {developer.technologies.slice(0, 2).join(' • ')}
              </p>
            )}
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

// Component Podium chính
export const DeveloperPodium = ({ developers, playSound }: DeveloperPodiumProps) => {
  if (!developers || developers.length < 3) {
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
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
            Những Nhà Phát Triển Tài Năng
          </span>
          <div className="absolute w-24 h-1 bg-blue-500/50 bottom-0 left-1/2 transform -translate-x-1/2 rounded-full mt-2"></div>
        </motion.h2>

        {/* Hiệu ứng sân khấu */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
        
        {/* Podium hiển thị Top 3 */}
        <div className="flex justify-center items-end space-x-8 md:space-x-16 h-80 mt-16">
          {/* Vị trí thứ 2 */}
          <TopDeveloper developer={developers[1]} position={2} playSound={playSound} />
          
          {/* Vị trí thứ 1 */}
          <TopDeveloper developer={developers[0]} position={1} playSound={playSound} />
          
          {/* Vị trí thứ 3 */}
          <TopDeveloper developer={developers[2]} position={3} playSound={playSound} />
        </div>
      </div>
    </motion.div>
  );
}; 