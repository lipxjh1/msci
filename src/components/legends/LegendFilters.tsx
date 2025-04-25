'use client';

import { motion } from 'framer-motion';
import { FaSearch, FaSortAmountDown, FaFilter } from 'react-icons/fa';

interface LegendFiltersProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalResults: number;
  handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

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

export const LegendFilters = ({ 
  searchTerm, 
  handleSearch, 
  totalResults, 
  handleSort 
}: LegendFiltersProps) => {
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
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
          Bảng Xếp Hạng Đầy Đủ
        </span>
        <div className="absolute w-24 h-1 bg-purple-500/50 bottom-0 left-1/2 transform -translate-x-1/2 rounded-full mt-2"></div>
      </motion.h2>

      <motion.div 
        variants={fadeInUp}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm huyền thoại..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-gray-900/80 border border-gray-700 rounded-full py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Hiển thị số lượng kết quả */}
      <motion.div
        variants={fadeInUp}
        className="flex justify-between items-center mb-6"
      >
        <p className="text-gray-400 text-sm">
          {totalResults} huyền thoại được tìm thấy
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
            <option value="points">Điểm số</option>
          </select>
        </div>
      </motion.div>
    </motion.div>
  );
}; 