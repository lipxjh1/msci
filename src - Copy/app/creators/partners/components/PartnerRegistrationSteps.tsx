'use client';

import { FaRegEdit, FaSearch, FaUsers, FaFileSignature, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function PartnerRegistrationSteps() {
  // Dữ liệu các bước đăng ký đối tác
  const registrationSteps = [
    {
      id: 1,
      title: 'Đăng Ký Thông Tin',
      description: 'Điền form đăng ký với thông tin chi tiết về tổ chức của bạn',
      icon: <FaRegEdit className="w-7 h-7 text-white" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Đánh Giá Sơ Bộ',
      description: 'Đội ngũ M-SCI sẽ review hồ sơ trong vòng 5-7 ngày làm việc',
      icon: <FaSearch className="w-7 h-7 text-white" />,
      color: 'from-cyan-500 to-teal-500'
    },
    {
      id: 3,
      title: 'Họp Thảo Luận',
      description: 'Meeting trực tiếp hoặc online để trao đổi chi tiết hợp tác',
      icon: <FaUsers className="w-7 h-7 text-white" />,
      color: 'from-teal-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Ký Kết Thỏa Thuận',
      description: 'Hoàn tất các thủ tục pháp lý và ký kết hợp đồng',
      icon: <FaFileSignature className="w-7 h-7 text-white" />,
      color: 'from-emerald-500 to-blue-500'
    },
    {
      id: 5,
      title: 'Triển Khai',
      description: 'Bắt đầu triển khai các hoạt động hợp tác theo kế hoạch',
      icon: <FaRocket className="w-7 h-7 text-white" />,
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 50 
      }
    }
  };

  return (
    <motion.div 
      id="partnership-process"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="mb-24 backdrop-blur-sm bg-gradient-to-br from-[#041019]/60 to-[#072030]/60 p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl"
    >
      <div className="flex flex-col items-center mb-16">
        <motion.h2 
          variants={itemVariants}
          className="font-orbitron text-3xl md:text-4xl font-bold text-white cyber-halo mb-4"
        >
          <span className="text-shadow-blue relative inline-block">
            QUY TRÌNH TRỞ THÀNH ĐỐI TÁC
          </span>
        </motion.h2>
        <motion.div 
          variants={itemVariants}
          className="h-1 w-32 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"
        ></motion.div>
        <motion.p 
          variants={itemVariants} 
          className="text-white/80 text-center max-w-2xl mt-4 text-lg"
        >
          Quy trình 5 bước đơn giản để bắt đầu hành trình hợp tác cùng M-SCI
        </motion.p>
      </div>
      
      <div className="flex flex-col md:flex-row items-start justify-between relative">
        {/* Connecting line for desktop */}
        <div className="absolute top-20 left-10 right-10 h-1 bg-gradient-to-r from-blue-500/30 via-teal-500/30 to-indigo-500/30 hidden md:block"></div>
        
        {registrationSteps.map((step, index) => (
          <motion.div 
            key={step.id} 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="flex flex-col items-center mb-12 md:mb-0 relative z-10 w-full md:w-auto"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-xl shadow-[var(--accent-blue-bright)]/20 relative`}
            >
              {/* Glowing outer ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 blur-sm"></div>
              
              {/* Number badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white font-bold">
                {step.id}
              </div>
              
              {/* Icon */}
              <div className="relative">
                {step.icon}
              </div>
            </motion.div>
            
            <div className="text-center px-4">
              <h3 className="text-xl text-white font-bold mb-3 font-rajdhani">
                {step.title}
              </h3>
              <p className="text-white/80 text-base max-w-[220px] mx-auto">
                {step.description}
              </p>
            </div>
            
            {/* Connecting line for mobile */}
            {index < registrationSteps.length - 1 && (
              <div className="mt-6 flex items-center justify-center md:hidden">
                <div className="w-0.5 h-10 bg-gradient-to-b from-[var(--accent-blue-bright)]/70 to-purple-500/70"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* CTA Button */}
      <motion.div 
        variants={itemVariants}
        className="mt-16 flex justify-center"
      >
        <a 
          href="#partner-form" 
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 flex items-center"
        >
          Bắt Đầu Ngay
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
} 