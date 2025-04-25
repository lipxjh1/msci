'use client';

import { motion } from 'framer-motion';
import { FaHistory, FaUserSecret, FaSkull } from 'react-icons/fa';
import { useState } from 'react';

const modes = [
  {
    id: 'story',
    title: 'Chế độ Cốt Truyện',
    icon: FaHistory,
    color: 'bg-blue-500',
    description: 'Chơi lại các sự kiện quan trọng trong game. Điều khiển các nhân vật lịch sử như Sarah, Elon, Độ, Akane và ra quyết định ảnh hưởng đến kết cục.',
    features: [
      'Điều khiển các nhân vật lịch sử: Sarah, Elon, Độ, Akane',
      'Ra quyết định ảnh hưởng đến kết cục',
      'Kết thúc khác nhau tùy lựa chọn',
      'Khám phá chi tiết chưa từng tiết lộ trong cốt truyện gốc'
    ],
    imageUrl: '/images/heroes/robot_3.png'
  },
  {
    id: 'betrayal',
    title: 'Chế độ Phản Bội',
    icon: FaUserSecret,
    color: 'bg-purple-500',
    description: 'Một người chơi bí mật là gián điệp của X-Corp. Phải phá hoại nhóm mà không bị phát hiện. Nếu thành công: Nhận thưởng gấp đôi, nếu bị phát hiện: Mất toàn bộ điểm.',
    features: [
      'Một người chơi bí mật là gián điệp của X-Corp',
      'Phải phá hoại nhóm mà không bị phát hiện',
      'Nếu thành công: Nhận thưởng gấp đôi',
      'Nếu bị phát hiện: Mất toàn bộ điểm'
    ],
    imageUrl: '/images/heroes/robot_4.png'
  },
  {
    id: 'sacrifice',
    title: 'Chế độ Hy Sinh',
    icon: FaSkull,
    color: 'bg-red-500',
    description: 'Mô phỏng nhiệm vụ tự sát của Độ Phùng. Người chơi phải đánh đổi để đội thắng. Thưởng đặc biệt cho người hy sinh đúng lúc và danh hiệu "Anh Hùng Thầm Lặng".',
    features: [
      'Mô phỏng nhiệm vụ tự sát của Độ Phùng',
      'Người chơi phải đánh đổi để đội thắng',
      'Thưởng đặc biệt cho người hy sinh đúng lúc',
      'Danh hiệu "Anh Hùng Thầm Lặng"'
    ],
    imageUrl: '/images/heroes/robot bc.png'
  }
];

const SpecialModes = () => {
  const [activeTab, setActiveTab] = useState(modes[0].id);
  
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
          Chế Độ Thi Đấu Đặc Biệt
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Trải nghiệm những phương thức thi đấu độc đáo, tái hiện các yếu tố quan trọng từ cốt truyện 
          M-SCI và mang đến những thử thách đầy cảm xúc.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            
            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden transition-all duration-300 ${activeTab === mode.id ? 'border-cyan-700 shadow-lg shadow-cyan-900/20' : 'hover:border-gray-600'}`}
              >
                <div className="h-48 relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${mode.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40" />
                  
                  <div className="absolute top-0 left-0 p-4">
                    <div className={`w-12 h-12 ${mode.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="text-white text-xl" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">{mode.title}</h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-300 text-sm mb-4">{mode.description}</p>
                  
                  <button 
                    onClick={() => setActiveTab(mode.id)}
                    className={`w-full py-2 rounded-lg transition-all duration-300 ${
                      activeTab === mode.id 
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {activeTab === mode.id ? 'Đang Xem' : 'Xem Chi Tiết'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {modes.map((mode) => {
          if (activeTab !== mode.id) return null;
          
          return (
            <motion.div
              key={`detail-${mode.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 ${mode.color} rounded-lg flex items-center justify-center mr-3`}>
                  <mode.icon className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{mode.title} - Chi Tiết</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-300 mb-4">{mode.description}</p>
                  
                  <h4 className="text-white font-semibold mb-2">Tính Năng Chính:</h4>
                  <ul className="space-y-2 mb-4">
                    {mode.features.map((feature, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start text-gray-300"
                      >
                        <span className={`inline-block w-2 h-2 ${mode.color} rounded-full mt-1.5 mr-2`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  
                  <button className="mt-2 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white rounded-lg transition-all duration-300">
                    Tham Gia Ngay
                  </button>
                </div>
                
                <div className="h-64 rounded-lg overflow-hidden relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${mode.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                      <h4 className="text-white font-medium text-sm mb-1">
                        Tiêu Chuẩn Tham Gia:
                      </h4>
                      <p className="text-gray-300 text-xs">
                        Người chơi cần đạt cấp độ Học Viên trở lên và hoàn thành ít nhất 
                        10 màn chơi chính để mở khóa chế độ này.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default SpecialModes; 