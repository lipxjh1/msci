'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import NeonButton from './ui/NeonButton';
import { FaAward, FaTrophy, FaStar, FaScroll } from 'react-icons/fa';
import { useSound } from '@/context/SoundContext';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const { playSound } = useSound();

  // Animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  // Features data
  const features = [
    {
      icon: <FaTrophy />,
      title: 'Huyền Thoại',
      description: 'Vinh danh những game thủ đã đạt thành tích xuất sắc nhất trong lịch sử M-SCI.'
    },
    {
      icon: <FaAward />,
      title: 'Nhà Đầu Tư',
      description: 'Tri ân những nhà đầu tư đã góp phần tạo nên sự phát triển của M-SCI.'
    },
    {
      icon: <FaStar />,
      title: 'Cộng Đồng',
      description: 'Ghi nhận những đóng góp từ cộng đồng người chơi, creator và leader.'
    },
    {
      icon: <FaScroll />,
      title: 'Di Sản',
      description: 'Lưu giữ những dấu ấn lịch sử của game để truyền cảm hứng cho thế hệ tương lai.'
    }
  ];

  const playAchievementSound = () => {
    playSound('achievement');
  };

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 relative"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-cyber text-white mb-4">
            Đại Sảnh Danh Vọng
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Nơi ghi danh những huyền thoại đã góp phần tạo nên lịch sử M-SCI. Mỗi cái tên ở đây đều là một phần không thể thiếu 
            trong hành trình phát triển của game.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={playAchievementSound}
              className="bg-gradient-to-br from-gray-900 to-gray-950 p-6 rounded-lg border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="bg-blue-900/20 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-cyber text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-block relative">
            <NeonButton
              variant="primary"
              size="lg"
              className="px-8"
              onClick={() => window.open('/register', '_blank')}
            >
              Tham Gia Ngay
            </NeonButton>
            
            {/* Glow pulse effect */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-md blur-xl bg-cyan-500/20 -z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 