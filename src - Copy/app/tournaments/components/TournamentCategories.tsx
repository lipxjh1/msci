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
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const Icon = category.icon;
          
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-[#F44336]/20 backdrop-blur-sm text-[#F44336] border border-[#F44336]/30' 
                  : 'bg-[#0f1923]/60 backdrop-blur-sm border border-white/5 text-white/70 hover:border-white/10 hover:text-white'
              }`}
            >
              <Icon className={`text-lg ${isActive ? 'text-[#F44336]' : 'text-white/60'}`} />
              <span className="font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TournamentCategories; 