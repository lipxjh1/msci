'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaAward, FaTrophy } from 'react-icons/fa';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { SoundProvider, useSound } from '@/context/SoundContext';

import { LegendCard, LegendData } from '@/components/legends/LegendCard';
import { LegendPodium } from '@/components/legends/LegendPodium';
import { LegendFilters } from '@/components/legends/LegendFilters';
import { getAllLegends } from '@/components/legends/legendsData';

// Component chính
function LegendsContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState<'rank' | 'name' | 'points'>('rank');
  const [legends, setLegends] = useState<LegendData[]>([]);
  const [filteredLegends, setFilteredLegends] = useState<LegendData[]>([]);
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

  // Lấy dữ liệu huyền thoại và khởi tạo
  useEffect(() => {
    const allLegends = getAllLegends();
    setLegends(allLegends);
    setFilteredLegends(allLegends);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Lọc huyền thoại dựa trên tìm kiếm
  useEffect(() => {
    let results = legends;
    
    if (searchTerm) {
      results = results.filter(legend => 
        legend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (legend.title && legend.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (legend.description && legend.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (legend.achievements && legend.achievements.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Sắp xếp kết quả
    results = sortLegends(results, sortType);
    
    setFilteredLegends(results);
  }, [searchTerm, sortType, legends]);

  // Lấy top 3 huyền thoại
  const getTopThree = () => {
    return legends.slice(0, 3);
  };

  // Lấy danh sách các huyền thoại còn lại (từ thứ 4 trở đi)
  const getRemainingLegends = () => {
    return filteredLegends.filter(legend => (legend.rank || 0) > 3);
  };

  // Sắp xếp huyền thoại theo loại sắp xếp
  const sortLegends = (legendsList: LegendData[], sortBy: string) => {
    switch (sortBy) {
      case 'name':
        return [...legendsList].sort((a, b) => a.name.localeCompare(b.name));
      case 'points':
        return [...legendsList].sort((a, b) => (b.points || 0) - (a.points || 0));
      case 'rank':
      default:
        return [...legendsList].sort((a, b) => (a.rank || 0) - (b.rank || 0));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as 'rank' | 'name' | 'points');
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
                className="w-5 h-5 rounded-full bg-purple-500/70"
                style={{
                  animation: `bounce 1.5s infinite ${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          <p className="text-purple-500 mt-8 text-xl font-light tracking-wider">ĐANG TẢI HUYỀN THOẠI...</p>
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
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute top-1/3 right-[10%] opacity-5">
          <FaTrophy className="text-[300px] text-purple-300" />
        </div>
        <div className="absolute bottom-1/3 left-[10%] opacity-5">
          <FaAward className="text-[300px] text-purple-300" />
        </div>
      </div>
      
      <main className="container mx-auto pt-24 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-200 to-purple-500">
            Huyền Thoại M-SCI
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Những huyền thoại đã tạo nên lịch sử và góp phần định hình nên thế giới M-SCI như ngày hôm nay.
          </p>
        </motion.div>

        {/* Phần podium cho Top 3 */}
        <LegendPodium legends={getTopThree()} playSound={playSound} />

        {/* Bộ lọc và tìm kiếm */}
        <LegendFilters 
          searchTerm={searchTerm} 
          handleSearch={handleSearch} 
          totalResults={getRemainingLegends().length}
          handleSort={handleSort}
        />

        {/* Danh sách huyền thoại */}
        <AnimatePresence mode="wait">
          {getRemainingLegends().length > 0 ? (
            <motion.div
              key="results"
              variants={parentVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
            >
              {getRemainingLegends().map((legend, index) => (
                <LegendCard
                  key={legend.id} 
                  legend={legend} 
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
              <FaStar className="mx-auto text-4xl text-gray-600 mb-4" />
              <h3 className="text-xl text-gray-300 mb-2">Không tìm thấy kết quả</h3>
              <p className="text-gray-500">Hãy thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer với hiệu ứng gradient */}
      <footer className="py-8 bg-gradient-to-t from-gray-950 to-transparent border-t border-purple-500/10">
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
export default function LegendsPage() {
  return (
    <SoundProvider>
      <LegendsContent />
    </SoundProvider>
  );
} 