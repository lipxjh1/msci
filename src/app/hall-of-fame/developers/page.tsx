'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaLaptopCode, FaSearch } from 'react-icons/fa';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { SoundProvider, useSound } from '@/context/SoundContext';

import { DeveloperCard, DeveloperData } from '@/components/hall-of-fame/DeveloperCard';
import { DeveloperPodium } from '@/components/hall-of-fame/DeveloperPodium';
import { DeveloperFilters } from '@/components/hall-of-fame/DeveloperFilters';
import { getAllDevelopers } from '@/components/hall-of-fame/developersData';

// Component chính
function DevelopersContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortType, setSortType] = useState<'rank' | 'name' | 'role' | 'points'>('rank');
  const [developers, setDevelopers] = useState<DeveloperData[]>([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState<DeveloperData[]>([]);
  const { playSound } = useSound();
  
  // Animation variants
  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  // Lấy dữ liệu developers và khởi tạo
  useEffect(() => {
    const allDevelopers = getAllDevelopers();
    setDevelopers(allDevelopers);
    setFilteredDevelopers(allDevelopers);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Lọc developers dựa trên tìm kiếm và bộ lọc
  useEffect(() => {
    let results = developers;
    
    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      results = results.filter(dev => 
        dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dev.role && dev.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (dev.description && dev.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (dev.technologies && dev.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }
    
    // Lọc theo loại developer
    if (typeFilter !== 'all') {
      results = results.filter(dev => dev.type === typeFilter);
    }
    
    // Sắp xếp kết quả
    results = sortDevelopers(results, sortType);
    
    setFilteredDevelopers(results);
  }, [searchTerm, typeFilter, sortType, developers]);

  // Lấy top 3 developers
  const getTopThree = () => {
    return developers.slice(0, 3);
  };

  // Lấy danh sách các developers còn lại (từ thứ 4 trở đi)
  const getRemainingDevelopers = () => {
    return filteredDevelopers.filter(dev => (dev.rank || 0) > 3);
  };

  // Sắp xếp developers theo loại sắp xếp
  const sortDevelopers = (devList: DeveloperData[], sortBy: string) => {
    switch (sortBy) {
      case 'name':
        return [...devList].sort((a, b) => a.name.localeCompare(b.name));
      case 'role':
        return [...devList].sort((a, b) => a.role.localeCompare(b.role));
      case 'points':
        return [...devList].sort((a, b) => (b.points || 0) - (a.points || 0));
      case 'rank':
      default:
        return [...devList].sort((a, b) => (a.rank || 0) - (b.rank || 0));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as 'rank' | 'name' | 'role' | 'points');
    playSound('click');
  };

  // Hiển thị loading
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-5 h-5 rounded-full bg-blue-500/70"
                style={{
                  animation: `bounce 1.5s infinite ${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          <p className="text-blue-500 mt-8 text-xl font-light tracking-wider">ĐANG TẢI THÔNG TIN...</p>
        </div>
        <style jsx>{`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen relative">
      {/* Thanh điều hướng */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ThanhDieuHuongResponsive />
      </div>

      {/* Hiệu ứng nền */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute top-1/3 right-[10%] opacity-5">
          <FaCode className="text-[300px] text-blue-300" />
        </div>
        <div className="absolute bottom-1/3 left-[10%] opacity-5">
          <FaLaptopCode className="text-[300px] text-blue-300" />
        </div>
      </div>
      
      <main className="container mx-auto pt-24 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-500">
            Đội Ngũ Phát Triển
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Những nhà phát triển tài năng đã góp phần xây dựng nên vũ trụ M-SCI với công nghệ tiên tiến và sáng tạo không ngừng.
          </p>
        </motion.div>

        {/* Phần podium cho Top 3 */}
        <DeveloperPodium developers={getTopThree()} playSound={playSound} />

        {/* Bộ lọc và tìm kiếm */}
        <DeveloperFilters 
          searchTerm={searchTerm} 
          handleSearch={handleSearch} 
          totalResults={getRemainingDevelopers().length}
          handleSort={handleSort}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          playSound={playSound}
        />

        {/* Danh sách developers */}
        <AnimatePresence mode="wait">
          {getRemainingDevelopers().length > 0 ? (
            <motion.div
              key="results"
              variants={parentVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
            >
              {getRemainingDevelopers().map((developer, index) => (
                <DeveloperCard
                  key={developer.id} 
                  developer={developer} 
                  index={index}
                  onHover={() => playSound('hover')}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <FaSearch className="mx-auto text-4xl text-gray-600 mb-4" />
              <h3 className="text-xl text-gray-300 mb-2">Không tìm thấy kết quả</h3>
              <p className="text-gray-500">Hãy thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer với hiệu ứng gradient */}
      <footer className="py-8 bg-gradient-to-t from-gray-950 to-transparent border-t border-blue-500/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2023 M-SCI Game Universe. Mọi quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Component chính xuất ra
export default function DevelopersPage() {
  return (
    <SoundProvider>
      <DevelopersContent />
    </SoundProvider>
  );
} 