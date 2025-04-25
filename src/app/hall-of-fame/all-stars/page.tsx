'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { hallOfFameData } from '@/data/hallOfFameData';
import { FaStar, FaAward, FaFire, FaTrophy, FaSearch, FaSortAmountDown, FaFilter, FaCrown, FaMedal } from 'react-icons/fa';
import { GiLaurelCrown, GiPodium } from 'react-icons/gi';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { SoundProvider, useSound } from '@/context/SoundContext';
import { ReactNode } from 'react';

// Định nghĩa interface cho đối tượng ngôi sao
interface StarData {
  id: string;
  name: string;
  category: string;
  role: string;
  platform?: string;
  stats?: Record<string, string | number>;
  imageUrl: string;
  rank?: number;
  points?: number;
  [key: string]: any;
}

// Kết hợp tất cả các "ngôi sao" vào một mảng duy nhất và thêm điểm và xếp hạng
const getAllStars = (): StarData[] => {
  // Hàm tạo điểm ngẫu nhiên cho mục đích demo
  const generatePoints = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Lấy dữ liệu từ các danh mục khác nhau
  const leaders = hallOfFameData.community.leaders.map(star => ({
    ...star,
    category: 'Lãnh Đạo Cộng Đồng',
    role: star.platform,
    points: generatePoints(5000, 8000),
  }));

  const creators = hallOfFameData.community.creators.map(star => ({
    ...star,
    category: 'Nhà Sáng Tạo',
    role: star.platform,
    points: generatePoints(4000, 7000),
  }));

  const founders = hallOfFameData.founders.map(star => ({
    ...star,
    category: 'Nhà Sáng Lập',
    role: star.title,
    platform: 'Founder',
    stats: { title: star.title },
    points: generatePoints(8000, 10000),
  }));

  const legends = hallOfFameData.players.legends.map(star => ({
    ...star,
    name: star.nickname,
    category: 'Huyền Thoại',
    role: star.achievement,
    platform: star.guild || 'Không có',
    points: generatePoints(7000, 9000),
  }));

  // Kết hợp tất cả
  let allStars: StarData[] = [
    ...founders,
    ...legends,
    ...leaders,
    ...creators,
  ];

  // Thêm tất cả các champion từ các mùa
  Object.entries(hallOfFameData.players.champions).forEach(([season, champions]) => {
    champions.forEach(champion => {
      allStars.push({
        ...champion,
        name: champion.nickname,
        category: 'Vô Địch',
        role: champion.achievement,
        platform: `${champion.guild || 'Không có'} | ${season}`,
        stats: { ...champion.stats, title: champion.achievement },
        points: generatePoints(6000, 8500),
      });
    });
  });

  // Sắp xếp theo điểm và gán xếp hạng
  allStars.sort((a, b) => (b.points || 0) - (a.points || 0));
  allStars = allStars.map((star, index) => ({
    ...star,
    rank: index + 1
  }));

  return allStars;
};

// Props cho top stars podium
interface TopStarProps {
  star: StarData;
  position: number;
  playSound: (sound: string) => void;
}

// Component hiển thị ngôi sao top 3
const TopStar = ({ star, position, playSound }: TopStarProps) => {
  // Xác định màu sắc và kích thước dựa trên vị trí
  const getPodiumStyles = () => {
    switch (position) {
      case 1:
        return {
          containerHeight: 'h-80',
          podiumHeight: 'h-24',
          podiumBg: 'bg-gradient-to-r from-yellow-500 to-yellow-300',
          borderColor: 'border-yellow-400',
          shadowColor: 'shadow-yellow-500/30',
          crownColor: 'text-yellow-500',
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
              src={star.imageUrl}
              alt={star.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            
            {/* Huy hiệu loại */}
            <div className="absolute top-2 right-2 p-1 rounded-full bg-black/70 backdrop-blur-sm">
              {star.category === 'Nhà Sáng Lập' ? (
                <FaTrophy className="text-purple-400 text-lg" />
              ) : star.category === 'Huyền Thoại' ? (
                <FaAward className="text-red-400 text-lg" />
              ) : (
                <FaStar className="text-yellow-400 text-lg" />
              )}
            </div>

            {/* Hiển thị điểm */}
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-xs font-bold text-white">
              {star.points} điểm
            </div>
          </div>
          
          <div className="p-4 text-center">
            <h3 className="font-bold text-white text-lg truncate">{star.name}</h3>
            <p className="text-xs text-gray-400 mb-1 truncate">{star.role}</p>
            <p className={`text-xs ${
              star.category === 'Nhà Sáng Lập' ? 'text-purple-300' :
              star.category === 'Huyền Thoại' ? 'text-red-300' :
              star.category === 'Lãnh Đạo Cộng Đồng' ? 'text-yellow-300' :
              star.category === 'Nhà Sáng Tạo' ? 'text-blue-300' : 'text-green-300'
            } font-medium truncate`}>
              {star.category}
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

// Props cho component card
interface StarCardProps {
  star: StarData;
  index: number;
  filter: string;
}

// Component card ngôi sao với animation
const StarCard = ({ star, index, filter }: StarCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  const { playSound } = useSound();

  const handleHover = () => {
    playSound('hover');
  };

  const getStarBadgeColor = (category: string): string => {
    switch (category) {
      case 'Nhà Sáng Lập':
        return 'bg-purple-500/90';
      case 'Lãnh Đạo Cộng Đồng':
        return 'bg-yellow-500/90';
      case 'Nhà Sáng Tạo':
        return 'bg-blue-500/90';
      case 'Huyền Thoại':
        return 'bg-red-500/90';
      case 'Vô Địch':
        return 'bg-green-500/90';
      default:
        return 'bg-yellow-500/90';
    }
  };

  const getCardBorderColor = (category: string): string => {
    switch (category) {
      case 'Nhà Sáng Lập':
        return 'border-purple-500/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]';
      case 'Lãnh Đạo Cộng Đồng':
        return 'border-yellow-500/20 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]';
      case 'Nhà Sáng Tạo':
        return 'border-blue-500/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]';
      case 'Huyền Thoại':
        return 'border-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]';
      case 'Vô Địch':
        return 'border-green-500/20 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]';
      default:
        return 'border-yellow-500/20';
    }
  };

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

  // Xác định icon và class cho xếp hạng
  const getRankBadge = () => {
    const rank = star.rank || 0;
    if (rank <= 3) return null; // Top 3 được hiển thị ở podium

    if (rank <= 10) {
      return (
        <div className="absolute -top-3 -left-3 bg-yellow-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-black shadow-md">
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
      className={`bg-gray-900/70 backdrop-blur-sm border relative ${getCardBorderColor(star.category)} rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2`}
      onMouseEnter={handleHover}
      whileHover={{ scale: 1.02 }}
    >
      {/* Badge xếp hạng */}
      {getRankBadge()}

      <div className="relative h-48 overflow-hidden">
        <img 
          src={star.imageUrl} 
          alt={star.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        
        {/* Huy hiệu ngôi sao */}
        <div className={`absolute top-4 right-4 ${getStarBadgeColor(star.category)} text-white p-2 rounded-full`}>
          {star.category === 'Nhà Sáng Lập' ? <FaTrophy className="text-xl" /> : 
            star.category === 'Huyền Thoại' ? <FaAward className="text-xl" /> : 
            <FaStar className="text-xl" />}
        </div>

        {/* Hiển thị điểm */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded-lg">
          {star.points} điểm
        </div>

        {/* Huy hiệu danh mục */}
        <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
          {star.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{star.name}</h3>
        <p className={`${
          star.category === 'Nhà Sáng Lập' ? 'text-purple-300' : 
          star.category === 'Lãnh Đạo Cộng Đồng' ? 'text-yellow-300' : 
          star.category === 'Nhà Sáng Tạo' ? 'text-blue-300' : 
          star.category === 'Huyền Thoại' ? 'text-red-300' : 'text-green-300'
        } text-sm mb-2`}>{star.role}</p>
        <p className="text-gray-400 text-xs mb-4">{star.platform || '-'}</p>
        
        <div className="flex items-center gap-2 flex-wrap">
          {star.stats && Object.entries(star.stats).map(([key, value], i) => (
            key !== 'title' && (
              <div key={i} className="flex items-center text-yellow-400 gap-1 bg-gray-800/60 px-2 py-1 rounded-full text-xs">
                <FaFire />
                <span>{value}</span>
              </div>
            )
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Component con để xử lý các thao tác với âm thanh
function AllStarsContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stars, setStars] = useState<StarData[]>(getAllStars());
  const [filteredStars, setFilteredStars] = useState<StarData[]>(stars);
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

  // Lọc sao dựa trên tìm kiếm và bộ lọc
  useEffect(() => {
    let results = stars;
    
    if (searchTerm) {
      results = results.filter(star => 
        star.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (star.role && star.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (star.platform && star.platform.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (categoryFilter !== 'all') {
      results = results.filter(star => star.category === categoryFilter);
    }
    
    setFilteredStars(results);
  }, [searchTerm, categoryFilter, stars]);

  // Hiệu ứng loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    playSound('click');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Lấy top 3 ngôi sao
  const getTopThree = () => {
    return stars.slice(0, 3);
  };

  // Lấy danh sách các ngôi sao còn lại (từ thứ 4 trở đi)
  const getRemainingStars = () => {
    return filteredStars.filter(star => (star.rank || 0) > 3);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-5 h-5 rounded-full bg-yellow-500/70"
                style={{
                  animation: `bounce 1.5s infinite ${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          <p className="text-yellow-500 mt-8 text-xl font-light tracking-wider">ĐANG TẢI NGÔI SAO...</p>
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
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
        <div className="absolute top-1/3 right-[10%] opacity-5">
          <FaStar className="text-[300px] text-yellow-300" />
        </div>
        <div className="absolute bottom-1/3 left-[10%] opacity-5">
          <FaAward className="text-[300px] text-yellow-300" />
        </div>
      </div>
      
      <main className="container mx-auto pt-24 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">
            Đại Sảnh Danh Vọng
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Vinh danh những cá nhân đã có những đóng góp xuất sắc và tạo nên lịch sử của cộng đồng M-SCI. Từ những nhà sáng lập đầu tiên đến các huyền thoại và ngôi sao sáng giá.
          </p>
        </motion.div>

        {/* Phần podium cho Top 3 */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                Những Ngôi Sao Hàng Đầu
              </span>
              <div className="absolute w-24 h-1 bg-yellow-500/50 bottom-0 left-1/2 transform -translate-x-1/2 rounded-full mt-2"></div>
            </motion.h2>

            {/* Hiệu ứng sân khấu */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            
            {/* Podium hiển thị Top 3 */}
            <div className="flex justify-center items-end space-x-8 md:space-x-16 h-80 mt-16">
              {/* Vị trí thứ 2 */}
              <TopStar star={getTopThree()[1]} position={2} playSound={playSound} />
              
              {/* Vị trí thứ 1 */}
              <TopStar star={getTopThree()[0]} position={1} playSound={playSound} />
              
              {/* Vị trí thứ 3 */}
              <TopStar star={getTopThree()[2]} position={3} playSound={playSound} />
            </div>
          </div>
        </motion.div>

        {/* Bộ lọc và tìm kiếm */}
        <motion.div
          variants={parentVariants}
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Bảng Xếp Hạng Đầy Đủ
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
                placeholder="Tìm kiếm ngôi sao..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full bg-gray-900/80 border border-gray-700 rounded-full py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap md:justify-end">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  categoryFilter === 'all'
                    ? 'bg-yellow-500 text-black font-medium'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => handleCategoryChange('Nhà Sáng Lập')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  categoryFilter === 'Nhà Sáng Lập'
                    ? 'bg-purple-500 text-white font-medium'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FaTrophy className="text-xs" />
                  Nhà Sáng Lập
                </span>
              </button>
              <button
                onClick={() => handleCategoryChange('Huyền Thoại')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  categoryFilter === 'Huyền Thoại'
                    ? 'bg-red-500 text-white font-medium'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FaAward className="text-xs" />
                  Huyền Thoại
                </span>
              </button>
              <button
                onClick={() => handleCategoryChange('Lãnh Đạo Cộng Đồng')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  categoryFilter === 'Lãnh Đạo Cộng Đồng'
                    ? 'bg-yellow-500 text-black font-medium'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FaStar className="text-xs" />
                  Lãnh Đạo
                </span>
              </button>
              <button
                onClick={() => handleCategoryChange('Nhà Sáng Tạo')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  categoryFilter === 'Nhà Sáng Tạo'
                    ? 'bg-blue-500 text-white font-medium'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FaFire className="text-xs" />
                  Sáng Tạo
                </span>
              </button>
              <button
                onClick={() => handleCategoryChange('Vô Địch')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  categoryFilter === 'Vô Địch'
                    ? 'bg-green-500 text-white font-medium'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FaStar className="text-xs" />
                  Vô Địch
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
              {getRemainingStars().length} ngôi sao được tìm thấy
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaSortAmountDown />
              <span>Sắp xếp theo: </span>
              <select className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm">
                <option value="rank">Xếp hạng</option>
                <option value="name">Tên</option>
                <option value="category">Danh mục</option>
              </select>
            </div>
          </motion.div>
        </motion.div>

        {/* Danh sách ngôi sao */}
        <AnimatePresence mode="wait">
          {getRemainingStars().length > 0 ? (
            <motion.div
              key="results"
              variants={parentVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
            >
              {getRemainingStars().map((star, index) => (
                <StarCard 
                  key={star.id} 
                  star={star} 
                  index={index} 
                  filter={categoryFilter}
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
      <footer className="py-8 bg-gradient-to-t from-gray-950 to-transparent border-t border-yellow-500/10">
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
export default function AllStars() {
  return (
    <SoundProvider>
      <AllStarsContent />
    </SoundProvider>
  );
} 