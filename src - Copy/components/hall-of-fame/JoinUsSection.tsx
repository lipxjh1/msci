'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from './ui/SectionTitle';
import NeonButton from './ui/NeonButton';
import { useSound } from '@/context/SoundContext';
import { FaUsers, FaHandshake, FaRocket } from 'react-icons/fa';

export default function JoinUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const { playSound } = useSound();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  // Handle button click
  const handleJoinClick = () => {
    playSound('click');
  };

  return (
    <section
      id="join-us-section"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 relative bg-gradient-to-b from-gray-950 via-green-950/10 to-gray-950"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
        
        {/* Background icons */}
        <div className="absolute top-1/3 right-20 opacity-10">
          <FaUsers className="text-9xl text-green-300" />
        </div>
        <div className="absolute bottom-1/3 left-20 opacity-10">
          <FaRocket className="text-9xl text-green-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          subtitle="Tham gia"
          title="Trở thành một phần của M-SCI"
          description="Bạn có đam mê và kỹ năng? Hãy tham gia cùng chúng tôi để xây dựng và phát triển cộng đồng M-SCI."
          isInView={isInView}
          lightColor="green-400"
          darkColor="green-900"
        />

        {/* Join Us content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gray-900/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-8 hover:shadow-[0_0_15px_rgba(74,222,128,0.15)] transition-shadow duration-300"
          >
            <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <FaUsers className="text-2xl text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Cộng đồng sôi động</h3>
            <p className="text-gray-400 mb-6">Tham gia cộng đồng M-SCI sôi động với những người có cùng đam mê và sáng tạo.</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gray-900/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-8 hover:shadow-[0_0_15px_rgba(74,222,128,0.15)] transition-shadow duration-300"
          >
            <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <FaHandshake className="text-2xl text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Cơ hội hợp tác</h3>
            <p className="text-gray-400 mb-6">Kết nối với những chuyên gia hàng đầu và cùng nhau xây dựng những dự án đột phá.</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gray-900/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-8 hover:shadow-[0_0_15px_rgba(74,222,128,0.15)] transition-shadow duration-300"
          >
            <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <FaRocket className="text-2xl text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Phát triển kỹ năng</h3>
            <p className="text-gray-400 mb-6">Nâng cao kỹ năng và kinh nghiệm của bạn thông qua các dự án thực tế và đào tạo.</p>
          </motion.div>
        </motion.div>

        {/* Application form */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-900/80 backdrop-blur-md border border-green-500/20 rounded-lg p-8 max-w-3xl mx-auto mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Đăng ký ngay</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Họ và tên</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-green-500/20 rounded-lg p-3 text-white focus:outline-none focus:border-green-500"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Email</label>
              <input
                type="email"
                className="w-full bg-gray-800 border border-green-500/20 rounded-lg p-3 text-white focus:outline-none focus:border-green-500"
                placeholder="Nhập địa chỉ email của bạn"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Discord/Telegram</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-green-500/20 rounded-lg p-3 text-white focus:outline-none focus:border-green-500"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Lĩnh vực quan tâm</label>
              <select
                className="w-full bg-gray-800 border border-green-500/20 rounded-lg p-3 text-white focus:outline-none focus:border-green-500"
              >
                <option value="">-- Chọn lĩnh vực --</option>
                <option value="development">Phát triển</option>
                <option value="community">Cộng đồng</option>
                <option value="content">Nội dung</option>
                <option value="marketing">Marketing</option>
                <option value="design">Thiết kế</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2 text-sm">Mô tả kỹ năng và kinh nghiệm</label>
            <textarea
              className="w-full bg-gray-800 border border-green-500/20 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 min-h-[100px]"
              placeholder="Mô tả kỹ năng, kinh nghiệm và lý do bạn muốn tham gia M-SCI"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <NeonButton
              onClick={handleJoinClick}
              glowColor="rgb(74, 222, 128)"
              className="px-8"
            >
              Gửi đơn ứng tuyển
            </NeonButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 