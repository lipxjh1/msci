'use client';

import { motion } from 'framer-motion';
import { FaSearch, FaSortAmountDown, FaCode, FaLaptopCode, FaPalette, FaGamepad, FaRocket, FaFilter } from 'react-icons/fa';

// Props cho component
interface DeveloperFiltersProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalResults: number;
  handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  playSound: (sound: string) => void;
}

export const DeveloperFilters = ({ 
  searchTerm, 
  handleSearch, 
  totalResults, 
  handleSort,
  typeFilter,
  setTypeFilter,
  playSound
}: DeveloperFiltersProps) => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const handleTypeChange = (type: string) => {
    setTypeFilter(type);
    playSound('click');
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="mb-10"
    >
      <motion.h2 
        className="text-2xl md:text-3xl font-bold text-center mb-8 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          Đội Ngũ Phát Triển Toàn Cầu
        </span>
        <div className="absolute w-24 h-1 bg-blue-500/50 bottom-0 left-1/2 transform -translate-x-1/2 rounded-full mt-2"></div>
      </motion.h2>

      <motion.div 
        variants={fadeInUp}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm nhà phát triển..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-gray-900/80 border border-gray-700 rounded-full py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap md:justify-end">
          <button
            onClick={() => handleTypeChange('all')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              typeFilter === 'all'
                ? 'bg-blue-500 text-white font-medium'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
            }`}
          >
            <span className="flex items-center gap-2">
              <FaFilter className="text-xs" />
              Tất cả
            </span>
          </button>
          <button
            onClick={() => handleTypeChange('frontend')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              typeFilter === 'frontend'
                ? 'bg-blue-500 text-white font-medium'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
            }`}
          >
            <span className="flex items-center gap-2">
              <FaLaptopCode className="text-xs" />
              Frontend
            </span>
          </button>
          <button
            onClick={() => handleTypeChange('backend')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              typeFilter === 'backend'
                ? 'bg-green-500 text-white font-medium'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
            }`}
          >
            <span className="flex items-center gap-2">
              <FaCode className="text-xs" />
              Backend
            </span>
          </button>
          <button
            onClick={() => handleTypeChange('designer')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              typeFilter === 'designer'
                ? 'bg-pink-500 text-white font-medium'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
            }`}
          >
            <span className="flex items-center gap-2">
              <FaPalette className="text-xs" />
              Designer
            </span>
          </button>
          <button
            onClick={() => handleTypeChange('game')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              typeFilter === 'game'
                ? 'bg-purple-500 text-white font-medium'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
            }`}
          >
            <span className="flex items-center gap-2">
              <FaGamepad className="text-xs" />
              Game Dev
            </span>
          </button>
          <button
            onClick={() => handleTypeChange('lead')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              typeFilter === 'lead'
                ? 'bg-yellow-500 text-black font-medium'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
            }`}
          >
            <span className="flex items-center gap-2">
              <FaRocket className="text-xs" />
              Team Lead
            </span>
          </button>
        </div>
      </motion.div>

      {/* Hiển thị số lượng kết quả */}
      <motion.div
        variants={fadeInUp}
        className="flex justify-between items-center mb-6"
      >
        <p className="text-gray-400 text-sm">
          {totalResults} nhà phát triển được tìm thấy
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <FaSortAmountDown />
          <span>Sắp xếp theo: </span>
          <select 
            className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
            onChange={handleSort}
          >
            <option value="rank">Xếp hạng</option>
            <option value="name">Tên</option>
            <option value="role">Vai trò</option>
            <option value="points">Điểm</option>
          </select>
        </div>
      </motion.div>
    </motion.div>
  );
}; 