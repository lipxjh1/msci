'use client';

import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaMoneyBillWave, FaCrown, FaUserAstronaut } from 'react-icons/fa';

const rewards = [
  {
    id: 'elon',
    title: 'Giải Elon Musk',
    description: 'Dành cho đội vô địch hạng cao nhất',
    prize: '50.000 $MSCI',
    extra: 'Nhân vật DOGE độc quyền',
    icon: FaTrophy,
    color: 'from-yellow-400 to-amber-600',
    textColor: 'text-amber-400',
    rank: '1'
  },
  {
    id: 'sarah',
    title: 'Giải Sarah Chen',
    description: 'Dành cho đội đứng thứ hai',
    prize: '30.000 $MSCI',
    extra: 'Nhân vật Protocol X độc quyền',
    icon: FaMedal,
    color: 'from-gray-300 to-gray-500',
    textColor: 'text-gray-300',
    rank: '2'
  },
  {
    id: 'do',
    title: 'Giải Độ Phùng',
    description: 'Dành cho đội đứng thứ ba',
    prize: '20.000 $MSCI',
    extra: 'Nhân vật Phản Bội độc quyền',
    icon: FaMedal,
    color: 'from-amber-700 to-amber-900',
    textColor: 'text-amber-700',
    rank: '3'
  },
  {
    id: 'akane',
    title: 'Giải Akane',
    description: 'Dành cho MVP của giải đấu',
    prize: '15.000 $MSCI',
    extra: 'Nhân vật Báo Thù độc quyền',
    icon: FaCrown,
    color: 'from-cyan-500 to-blue-700',
    textColor: 'text-cyan-400',
    rank: 'MVP'
  },
  {
    id: 'architect',
    title: 'Giải Architect',
    description: 'Dành cho người có chiến thuật xuất sắc nhất',
    prize: '10.000 $MSCI',
    extra: 'Nhân vật The Ascended độc quyền',
    icon: FaUserAstronaut,
    color: 'from-purple-500 to-purple-800',
    textColor: 'text-purple-400',
    rank: 'Chiến Thuật'
  }
];

const legacyRewards = [
  'Tên người chiến thắng được khắc vào tượng đài ảo M-SCI',
  'Video highlight lưu giữ trong Bảo tàng Esports M-SCI',
  'Nhân vật độc quyền mang tên người chơi',
  'Cơ hội xuất hiện trong cốt truyện mùa sau'
];

const RewardsSection = () => {
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
          Phần Thưởng Và Di Sản
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Vinh danh những người chiến thắng với giải thưởng giá trị và cơ hội trở thành một phần 
          của lịch sử Esports M-SCI mãi mãi.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;
            
            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute -top-4 -right-4 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${reward.color}`} />
                </div>
                
                <div className="flex items-center mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reward.color} flex items-center justify-center mr-4`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${reward.textColor}`}>{reward.title}</h3>
                    <p className="text-gray-400 text-sm">{reward.description}</p>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Phần thưởng:</span>
                    <span className={`${reward.textColor} font-semibold`}>{reward.prize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Phần thưởng đặc biệt:</span>
                    <span className="text-white">{reward.extra}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-green-500 mr-2" />
                    <span className="text-gray-300 text-sm">Token $MSCI</span>
                  </div>
                  
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${reward.color} text-white font-bold text-sm`}>
                    {reward.rank}
                  </div>
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
          <h3 className="text-xl font-bold text-white mb-6 text-center">Di Sản Vĩnh Cửu</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {legacyRewards.map((legacy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-800/30 transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-600/20 to-blue-800/20 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl text-cyan-400 font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-300">{legacy}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white rounded-lg shadow-lg shadow-amber-700/20 font-medium transition-all duration-300"
          >
            <FaTrophy className="mr-2" />
            Đăng Ký Tham Gia Giải Đấu
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default RewardsSection; 