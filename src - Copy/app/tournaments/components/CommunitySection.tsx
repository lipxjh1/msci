'use client';

import { motion } from 'framer-motion';
import { FaDiscord, FaTwitter, FaTwitch, FaYoutube, FaEnvelope, FaGlobe, FaHeadset } from 'react-icons/fa';

const communityLinks = [
  {
    id: 'discord',
    name: 'Discord',
    url: '#',
    icon: FaDiscord,
    color: 'bg-indigo-600 hover:bg-indigo-700'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: '#',
    icon: FaTwitter,
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    id: 'twitch',
    name: 'Twitch',
    url: '#',
    icon: FaTwitch,
    color: 'bg-purple-600 hover:bg-purple-700'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: '#',
    icon: FaYoutube,
    color: 'bg-red-600 hover:bg-red-700'
  }
];

const contactInfo = [
  {
    type: 'Email',
    value: 'esports@m-sci.net',
    icon: FaEnvelope
  },
  {
    type: 'Website',
    value: 'esports.m-sci.net',
    icon: FaGlobe
  },
  {
    type: 'Hotline',
    value: '1900-MSCI',
    icon: FaHeadset
  }
];

const CommunitySection = () => {
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
          Cộng Đồng Và Liên Hệ
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Tham gia cộng đồng M-SCI để cập nhật thông tin mới nhất về các giải đấu, 
          kết nối với các game thủ khác và được hỗ trợ khi cần thiết.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Khối Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 lg:col-span-2"
          >
            <h3 className="text-xl font-bold text-white mb-6">Kết Nối Với Cộng Đồng</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {communityLinks.map((link, index) => {
                const Icon = link.icon;
                
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`${link.color} text-white rounded-lg p-4 text-center transition-all duration-300 flex flex-col items-center justify-center`}
                  >
                    <Icon className="text-2xl mb-2" />
                    <span>{link.name}</span>
                  </motion.a>
                );
              })}
            </div>
            
            <div className="mt-6 bg-gray-900/50 rounded-lg p-5 border border-gray-700">
              <h4 className="text-white font-medium mb-3">Học Viện Esports M-SCI</h4>
              <p className="text-gray-300 text-sm mb-4">
                Gia nhập Học Viện Esports M-SCI để được đào tạo bởi các cựu vô địch, nhận học bổng 
                dành cho tài năng trẻ và trở thành thế hệ tiếp theo của các nhà vô địch M-SCI.
              </p>
              <a 
                href="#" 
                className="inline-block text-sm text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Tìm hiểu thêm về chương trình đào tạo →
              </a>
            </div>
          </motion.div>
          
          {/* Khối Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Thông Tin Liên Hệ</h3>
            
            <div className="space-y-4 mb-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                      <Icon className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{item.type}</p>
                      <p className="text-white">{item.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-5 border border-gray-700 mb-6">
              <h4 className="text-white font-medium mb-2">Giờ Hỗ Trợ</h4>
              <p className="text-gray-300 text-sm">Thứ 2 - Thứ 6: 9:00 - 21:00</p>
              <p className="text-gray-300 text-sm">Thứ 7 - Chủ Nhật: 10:00 - 18:00</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300"
            >
              Liên Hệ Ngay
            </motion.button>
          </motion.div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-6">
            "Trong thế giới M-SCI, mỗi trận đấu là một chương mới của lịch sử. 
            Hãy để tên bạn được ghi vào huyền thoại!"
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-medium rounded-md transition-all duration-300"
            >
              ĐĂNG KÝ NGAY
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 font-medium rounded-md transition-all duration-300"
            >
              XEM GIẢI ĐẤU
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-md transition-all duration-300"
            >
              THAM GIA CỘNG ĐỒNG
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CommunitySection; 