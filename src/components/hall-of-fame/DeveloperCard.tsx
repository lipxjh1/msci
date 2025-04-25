'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCode, FaLaptopCode, FaPalette, FaBrain, FaGamepad, FaRocket } from 'react-icons/fa';

// Định nghĩa interface cho dữ liệu developer
export interface DeveloperData {
  id: string;
  name: string;
  role: string;
  description?: string;
  imageUrl: string;
  technologies?: string[];
  github?: string;
  linkedin?: string;
  portfolio?: string;
  contributions?: string[];
  projects?: string[];
  rank?: number;
  points?: number;
  type?: 'frontend' | 'backend' | 'fullstack' | 'designer' | 'game' | 'lead';
}

// Props cho component thẻ developer
interface DeveloperCardProps {
  developer: DeveloperData;
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

export const DeveloperCard = ({ developer, index, onHover }: DeveloperCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });

  // Trả về icon phù hợp với loại developer
  const getDeveloperIcon = (type?: string) => {
    switch (type) {
      case 'frontend':
        return <FaLaptopCode className="text-xl" />;
      case 'backend':
        return <FaCode className="text-xl" />;
      case 'designer':
        return <FaPalette className="text-xl" />;
      case 'game':
        return <FaGamepad className="text-xl" />;
      case 'lead':
        return <FaRocket className="text-xl" />;
      default:
        return <FaBrain className="text-xl" />;
    }
  };

  // Xác định màu sắc dựa trên loại developer
  const getDeveloperColor = (type?: string) => {
    switch (type) {
      case 'frontend':
        return 'bg-blue-500/90 text-white';
      case 'backend':
        return 'bg-green-500/90 text-white';
      case 'designer':
        return 'bg-pink-500/90 text-white';
      case 'game':
        return 'bg-purple-500/90 text-white';
      case 'lead':
        return 'bg-yellow-500/90 text-black';
      default:
        return 'bg-cyan-500/90 text-white';
    }
  };

  // Xác định icon và class cho xếp hạng
  const getRankBadge = () => {
    const rank = developer.rank || 0;
    if (rank <= 3) return null; // Top 3 được hiển thị ở podium

    if (rank <= 10) {
      return (
        <div className="absolute -top-3 -left-3 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-black shadow-md">
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

  // Xác định viền dựa trên loại developer
  const getBorderColor = (type?: string) => {
    switch (type) {
      case 'frontend':
        return 'border-blue-500/20';
      case 'backend':
        return 'border-green-500/20';
      case 'designer':
        return 'border-pink-500/20';
      case 'game':
        return 'border-purple-500/20';
      case 'lead':
        return 'border-yellow-500/20';
      default:
        return 'border-cyan-500/20';
    }
  };

  // Xác định hiệu ứng hover dựa trên loại developer
  const getHoverEffect = (type?: string) => {
    switch (type) {
      case 'frontend':
        return 'hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]';
      case 'backend':
        return 'hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]';
      case 'designer':
        return 'hover:shadow-[0_0_15px_rgba(236,72,153,0.15)]';
      case 'game':
        return 'hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]';
      case 'lead':
        return 'hover:shadow-[0_0_15px_rgba(234,179,8,0.15)]';
      default:
        return 'hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="exit"
      custom={index}
      className={`bg-gray-900/70 backdrop-blur-sm border relative ${getBorderColor(developer.type)} rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 ${getHoverEffect(developer.type)}`}
      onMouseEnter={onHover}
      whileHover={{ scale: 1.02 }}
    >
      {/* Badge xếp hạng */}
      {getRankBadge()}

      <div className="relative h-48 overflow-hidden">
        <img 
          src={developer.imageUrl || "https://via.placeholder.com/300x400?text=Developer"} 
          alt={developer.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        
        {/* Badge loại developer */}
        <div className={`absolute top-4 right-4 ${getDeveloperColor(developer.type)} p-2 rounded-full`}>
          {getDeveloperIcon(developer.type)}
        </div>

        {/* Hiển thị điểm */}
        {developer.points && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded-lg">
            {developer.points} điểm
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{developer.name}</h3>
        <p className="text-blue-300 text-sm mb-2">{developer.role}</p>
        <p className="text-gray-400 text-xs mb-4">{developer.description?.slice(0, 80)}...</p>
        
        {/* Danh sách công nghệ */}
        <div className="flex items-center gap-2 flex-wrap">
          {developer.technologies && developer.technologies.map((tech, i) => (
            <div key={i} className="bg-gray-800/60 px-2 py-1 rounded-full text-xs text-cyan-400">
              {tech}
            </div>
          ))}

          {/* Liệt kê các dự án */}
          {developer.projects && developer.projects.map((project, i) => (
            <div key={`project-${i}`} className="flex items-center text-blue-400 gap-1 bg-gray-800/60 px-2 py-1 rounded-full text-xs">
              <FaRocket className="text-xs" />
              <span>{project}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 