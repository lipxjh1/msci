'use client';

import { motion } from 'framer-motion';
import { FaCrown, FaChess, FaShieldAlt, FaStar, FaGraduationCap, FaUser, FaFire } from 'react-icons/fa';
import Image from 'next/image';

const ranks = [
  {
    name: 'Thủ Lĩnh',
    description: 'Top 0.1% - Cấp độ Elon Musk',
    icon: FaCrown,
    color: 'text-amber-400',
    bgColor: 'from-amber-600/20 to-amber-800/20',
    borderColor: 'border-amber-500/30',
    imageUrl: '/images/heroes/elon_musk.png'
  },
  {
    name: 'Giáo Sư',
    description: 'Top 1% - Cấp độ Sarah Chen',
    icon: FaGraduationCap,
    color: 'text-purple-400',
    bgColor: 'from-purple-600/20 to-purple-800/20',
    borderColor: 'border-purple-500/30',
    imageUrl: '/images/heroes/ui 2.png'
  },
  {
    name: 'Chỉ Huy',
    description: 'Top 5% - Cấp độ Độ Phùng, Akane',
    icon: FaChess,
    color: 'text-cyan-400',
    bgColor: 'from-cyan-600/20 to-cyan-800/20',
    borderColor: 'border-cyan-500/30',
    imageUrl: '/images/heroes/ui 4.png'
  },
  {
    name: 'Chiến Binh Elite',
    description: 'Top 15% - Cấp độ các thành viên Khóa 9',
    icon: FaFire,
    color: 'text-blue-400',
    bgColor: 'from-blue-600/20 to-blue-800/20',
    borderColor: 'border-blue-500/30',
    imageUrl: '/images/heroes/ui 5.png'
  },
  {
    name: 'Học Viên Xuất Sắc',
    description: 'Top 35% - Nhận nhiều đặc quyền',
    icon: FaShieldAlt,
    color: 'text-green-400',
    bgColor: 'from-green-600/20 to-green-800/20',
    borderColor: 'border-green-500/30',
    imageUrl: '/images/heroes/ui 6.png'
  },
  {
    name: 'Học Viên',
    description: 'Top 65% - Thành viên tích cực',
    icon: FaStar,
    color: 'text-orange-400',
    bgColor: 'from-orange-600/20 to-orange-800/20',
    borderColor: 'border-orange-500/30',
    imageUrl: '/images/heroes/ui7.png'
  },
  {
    name: 'Tân Binh',
    description: 'Còn lại - Mới bắt đầu hành trình',
    icon: FaUser,
    color: 'text-gray-400',
    bgColor: 'from-gray-600/20 to-gray-800/20',
    borderColor: 'border-gray-500/30',
    imageUrl: '/images/heroes/ui8.png'
  }
];

const specialRanks = [
  { name: 'Kẻ Hy Sinh', description: 'Cho người chơi thực hiện nhiệm vụ tự sát như Độ' },
  { name: 'Người Cứu Rỗi', description: 'Cho người hoàn thành 100 màn ở độ khó cao nhất' },
  { name: 'Phản Bội', description: 'Danh hiệu đặc biệt cho người chơi PvP xuất sắc' },
  { name: 'Tâm Hồn Thuần Khiết', description: 'Cho người không bao giờ phản bội đồng đội' }
];

const RankingSystem = () => {
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
          Hệ Thống Xếp Hạng
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Theo cốt truyện M-SCI, người chơi được phân loại dựa trên thành tích và kỹ năng, 
          từ Tân Binh đến Thủ Lĩnh - giống như hệ thống thứ bậc của nhân vật trong game.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {ranks.map((rank, index) => {
            const Icon = rank.icon;
            
            return (
              <motion.div 
                key={rank.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`bg-gradient-to-br ${rank.bgColor} border ${rank.borderColor} rounded-xl p-5 hover:shadow-xl transition-all duration-500 group relative overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform scale-110 group-hover:scale-125 transition-transform duration-700"
                    style={{ backgroundImage: `url(${rank.imageUrl})` }}
                  />
                </div>
                
                <div className="flex items-center mb-4">
                  <div className={`mr-3 p-3 rounded-lg ${rank.color} bg-gray-800`}>
                    <Icon className="text-xl" />
                  </div>
                  <h3 className={`text-xl font-bold ${rank.color}`}>{rank.name}</h3>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">{rank.description}</p>
                
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 flex-1 rounded-full ${i < 5 - index ? rank.color.replace('text', 'bg') : 'bg-gray-700'}`}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Danh Hiệu Đặc Biệt</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specialRanks.map((rank, index) => (
              <motion.div
                key={rank.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="border border-gray-700 rounded-lg p-4 hover:border-cyan-700/40 transition-all duration-300"
              >
                <h4 className="text-cyan-400 font-semibold mb-2">{rank.name}</h4>
                <p className="text-gray-400 text-sm">{rank.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="text-center mt-10">
          <motion.button
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-medium rounded-md transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Xem Bảng Xếp Hạng
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default RankingSystem; 