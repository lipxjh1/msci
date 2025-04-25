'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaMapMarkerAlt, FaLock, FaUnlock, FaExclamationTriangle } from 'react-icons/fa';

const arenas = [
  {
    id: 'academy',
    name: 'Học Viện M-SCI',
    description: 'Tái hiện chính xác học viện trong cốt truyện với phòng thí nghiệm số 7 của Sarah Chen và sân tập của 4 đội chiến thuật.',
    imageUrl: '/images/heroes/idle_1.png',
    features: [
      'Phòng thí nghiệm số 7 của Sarah Chen',
      'Sân tập của 4 đội chiến thuật',
      'Căn phòng họp bí mật của Elon Musk',
      'Khu vực huấn luyện đặc biệt'
    ],
    difficulty: 'normal',
    status: 'unlocked'
  },
  {
    id: 'xcorp',
    name: 'Căn Cứ X-Corp',
    description: 'Địa điểm nguy hiểm với nhà tù ngầm nơi giam giữ Elon Musk và trung tâm điều khiển Protocol X.',
    imageUrl: '/images/heroes/idle4.png',
    features: [
      'Nhà tù ngầm nơi giam giữ Elon Musk',
      'Trung tâm điều khiển Protocol X',
      'Phòng thí nghiệm với Patient Zero',
      'Hành lang bí mật của The Ascended'
    ],
    difficulty: 'hard',
    status: 'unlocked'
  },
  {
    id: 'mars',
    name: 'Sao Hỏa Đỏ',
    description: 'Căn cứ của The Ascended trên Sao Hỏa, nơi diễn ra trận chiến cuối cùng giữa nhân loại và The Ascended.',
    imageUrl: '/images/heroes/idle6.png',
    features: [
      'Căn cứ của The Ascended trên Sao Hỏa',
      'Trung tâm Lõi Plasma',
      'Khu vực "Tân Nhân Loại"',
      'Nơi diễn ra trận chiến cuối cùng'
    ],
    difficulty: 'extreme',
    status: 'locked'
  }
];

const BattleArenas = () => {
  const [activeArena, setActiveArena] = useState(arenas[0].id);
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'normal': return 'text-green-500';
      case 'hard': return 'text-yellow-500';
      case 'extreme': return 'text-red-500';
      default: return 'text-green-500';
    }
  };
  
  const getDifficultyText = (difficulty: string) => {
    switch(difficulty) {
      case 'normal': return 'Thông Thường';
      case 'hard': return 'Khó';
      case 'extreme': return 'Cực Kỳ Khó';
      default: return 'Thông Thường';
    }
  };
  
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 relative"
      >
        <h2 className="text-3xl font-bold text-center mb-3 text-cyan-400">
          Đấu Trường Lịch Sử
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Thi đấu trong những địa điểm biểu tượng được tái hiện từ cốt truyện M-SCI. 
          Mỗi đấu trường đều có thử thách và bí mật riêng, mở ra chiến thuật mới.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-xl font-bold text-white mb-1">Chọn Đấu Trường</h3>
                <p className="text-gray-400 text-sm">Mỗi địa điểm có đặc điểm và độ khó riêng</p>
              </div>
              
              <div className="divide-y divide-gray-700/50">
                {arenas.map((arena) => (
                  <motion.button
                    key={arena.id}
                    onClick={() => setActiveArena(arena.id)}
                    className={`w-full flex items-center p-4 text-left transition-all ${
                      activeArena === arena.id ? 'bg-gray-700/30' : 'hover:bg-gray-700/20'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className="w-12 h-12 rounded-md bg-cover bg-center mr-3 flex-shrink-0"
                      style={{ backgroundImage: `url(${arena.imageUrl})` }}
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="text-white font-medium">{arena.name}</h4>
                        {arena.status === 'locked' && (
                          <FaLock className="text-gray-500 ml-2 text-xs" />
                        )}
                      </div>
                      <div className="flex items-center text-xs mt-1">
                        <span className={`${getDifficultyColor(arena.difficulty)} mr-1`}>
                          {getDifficultyText(arena.difficulty)}
                        </span>
                        <span className="text-gray-500">
                          • {arena.status === 'locked' ? 'Chưa mở khóa' : 'Đã mở khóa'}
                        </span>
                      </div>
                    </div>
                    
                    {activeArena === arena.id && (
                      <div className="w-1 h-12 bg-cyan-500 rounded-full ml-2" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            {arenas.map((arena) => {
              if (activeArena !== arena.id) return null;
              
              return (
                <motion.div 
                  key={arena.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden h-full"
                >
                  <div 
                    className="h-64 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${arena.imageUrl})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="flex items-center mb-2">
                        <h3 className="text-2xl font-bold text-white mr-3">{arena.name}</h3>
                        {arena.status === 'locked' ? (
                          <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full flex items-center">
                            <FaLock className="mr-1" /> Chưa mở khóa
                          </span>
                        ) : (
                          <span className="bg-green-900/70 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                            <FaUnlock className="mr-1" /> Đã mở khóa
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-300">
                        <FaMapMarkerAlt className="text-cyan-400 mr-2" />
                        <span>Địa điểm xuất hiện trong chương 25-37 của cốt truyện</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-300 mb-6">{arena.description}</p>
                    
                    <h4 className="text-white font-semibold mb-3">Đặc Điểm Nổi Bật:</h4>
                    <ul className="space-y-2 mb-6">
                      {arena.features.map((feature, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mt-1.5 mr-2" />
                          <span className="text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {arena.status === 'locked' ? (
                      <div className="bg-red-950/20 border border-red-800/30 rounded-lg p-4 mb-6">
                        <div className="flex items-start">
                          <FaExclamationTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <h5 className="text-red-400 font-medium mb-1">Đấu trường bị khóa</h5>
                            <p className="text-gray-400 text-sm">
                              Đấu trường này chỉ mở khóa sau khi bạn hoàn thành 50 màn chơi trong Giải Vô Địch Quân Đoàn M-SCI hoặc đạt cấp độ Chỉ Huy.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3">Độ Khó:</h4>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              arena.difficulty === 'normal' ? 'bg-green-500 w-1/3' : 
                              arena.difficulty === 'hard' ? 'bg-yellow-500 w-2/3' : 
                              'bg-red-500 w-full'
                            }`}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Thông Thường</span>
                          <span>Khó</span>
                          <span>Cực Kỳ Khó</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <button className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                        arena.status === 'locked' 
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white'
                      }`}>
                        {arena.status === 'locked' ? 'Chưa Mở Khóa' : 'Chọn Đấu Trường Này'}
                      </button>
                      
                      <button className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300">
                        Xem Chi Tiết
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BattleArenas; 