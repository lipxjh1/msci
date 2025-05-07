'use client';

import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const events = [
  {
    id: 1,
    title: 'Giới Thiệu Giải Vô Địch Quân Đoàn M-SCI',
    date: '15/03/2049',
    time: '19:00 - 21:00',
    location: 'Học Viện M-SCI',
    imageUrl: '/images/heroes/shoot1.png'
  },
  {
    id: 2,
    title: 'Đăng Ký Và Bốc Thăm Chia Bảng',
    date: '20/03/2049',
    time: '15:00 - 17:00',
    location: 'Sảnh Chính Học Viện',
    imageUrl: '/images/heroes/shoot3.png'
  },
  {
    id: 3,
    title: 'Buổi Huấn Luyện Đặc Biệt Với Giáo Sư Sarah Chen',
    date: '25/03/2049',
    time: '10:00 - 12:00',
    location: 'Phòng Thí Nghiệm Số 7',
    imageUrl: '/images/heroes/shoot5.png'
  },
  {
    id: 4,
    title: 'Khai Mạc Giải Vô Địch Quân Đoàn M-SCI',
    date: '01/04/2049',
    time: '18:00 - 22:00',
    location: 'Sân Vận Động M-SCI',
    imageUrl: '/images/heroes/shoot7.png'
  }
];

const UpcomingEvents = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <section className="py-16 relative">
      <div className="absolute left-0 top-0 w-full h-full bg-[url('/images/grid_pattern.svg')] bg-repeat opacity-5 z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-3 text-cyan-400">
          Sự Kiện Sắp Diễn Ra
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Tham gia các sự kiện và hoạt động chính thức của M-SCI để cập nhật các thông tin mới nhất về giải đấu và có cơ hội gặp gỡ các huyền thoại M-SCI.
        </p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {events.map((event) => (
            <motion.div 
              key={event.id}
              variants={item}
              className="bg-gray-800/60 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-700/50 transition-all duration-300 shadow-lg"
            >
              <div 
                className="h-40 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  Sự kiện
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-bold mb-3">{event.title}</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-cyan-400" />
                    <span className="text-gray-300">{event.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaClock className="text-cyan-400" />
                    <span className="text-gray-300">{event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-cyan-400" />
                    <span className="text-gray-300">{event.location}</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors duration-300">
                  Đăng Ký Tham Gia
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-10">
          <motion.button
            className="inline-flex items-center px-6 py-3 bg-transparent border border-cyan-500 text-cyan-400 rounded-md hover:bg-cyan-900/20 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Xem Tất Cả Sự Kiện
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default UpcomingEvents; 