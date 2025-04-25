'use client';

import { motion } from 'framer-motion';
import { FaTrophy, FaUsers, FaUser, FaStar, FaCrown } from 'react-icons/fa';

interface TournamentCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'Tất Cả', icon: FaStar },
  { id: 'GVQ', name: 'Giải Vô Địch Quân Đoàn', icon: FaTrophy },
  { id: 'ChienDichBangHoi', name: 'Chiến Dịch Bang Hội', icon: FaUsers },
  { id: 'AnhHungDon', name: 'Giải Anh Hùng Đơn', icon: FaUser },
  { id: 'premium', name: 'Giải Premium', icon: FaCrown },
];

const TournamentCategories: React.FC<TournamentCategoriesProps> = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="mb-12">
      <motion.h2 
        className="text-2xl font-bold mb-6 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Khám Phá Các Giải Đấu
      </motion.h2>
      
      <motion.div 
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const Icon = category.icon;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white border-transparent shadow-lg shadow-cyan-600/20' 
                  : 'border-gray-700 text-gray-300 hover:border-cyan-500 hover:text-cyan-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`text-sm ${isActive ? 'text-white' : 'text-cyan-400'}`} />
              {category.name}
            </motion.button>
          );
        })}
      </motion.div>
      
      <motion.div 
        className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mt-8"
        initial={{ width: 0 }}
        animate={{ width: "5rem" }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
    </div>
  );
};

export default TournamentCategories; 