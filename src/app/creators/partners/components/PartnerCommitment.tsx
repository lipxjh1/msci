'use client';

import { FaCheckCircle, FaShieldAlt, FaHeadset, FaBalanceScale, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function PartnerCommitment() {
  // Dữ liệu cam kết
  const commitments = [
    {
      id: 1,
      title: "Phản Hồi Nhanh Chóng",
      description: "Xử lý hồ sơ trong vòng 5-7 ngày làm việc",
      icon: <FaCheckCircle className="w-8 h-8" />,
      color: "blue"
    },
    {
      id: 2,
      title: "Bảo Mật Tuyệt Đối",
      description: "Bảo mật thông tin đối tác theo tiêu chuẩn cao nhất",
      icon: <FaShieldAlt className="w-8 h-8" />,
      color: "purple"
    },
    {
      id: 3,
      title: "Hỗ Trợ 24/7",
      description: "Hỗ trợ tận tình trong suốt quá trình hợp tác",
      icon: <FaHeadset className="w-8 h-8" />,
      color: "teal"
    },
    {
      id: 4,
      title: "Công Bằng & Minh Bạch",
      description: "Chia sẻ lợi ích công bằng và minh bạch",
      icon: <FaBalanceScale className="w-8 h-8" />,
      color: "yellow"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="mb-24"
    >
      {/* Banner and Title Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 rounded-t-3xl p-8 md:p-12 overflow-hidden shadow-xl border-b-4 border-[var(--accent-blue-bright)]">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 filter blur-3xl"></div>
          <div className="absolute -bottom-20 left-20 w-72 h-72 rounded-full bg-indigo-500/10 filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-sm p-3 rounded-full mb-6 border border-white/20"
          >
            <FaHandshake className="text-[var(--accent-blue-bright)] w-12 h-12" />
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="font-orbitron text-4xl md:text-5xl font-bold text-white cyber-halo mb-6 text-center tracking-wider text-shadow-blue-lg"
          >
            CAM KẾT CỦA M-SCI
          </motion.h2>
          
          <motion.p 
            variants={itemVariants} 
            className="text-white/90 text-center max-w-3xl text-lg md:text-xl"
          >
            Niềm tin là nền tảng của mọi mối quan hệ hợp tác bền vững. Chúng tôi cam kết đặt lợi ích của đối tác lên hàng đầu.
          </motion.p>
        </div>
      </div>
      
      {/* Commitment Cards */}
      <div className="relative bg-gradient-to-b from-[#041019] to-[#041019]/80 p-10 md:p-12 rounded-b-3xl shadow-2xl border border-t-0 border-white/5 transform -mt-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {commitments.map((commitment, index) => (
            <motion.div 
              key={commitment.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
              className={`bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden relative group`}
            >
              {/* Colored Border Top */}
              <div className={`h-2 w-full bg-${commitment.color}-500`}></div>
              
              {/* Content */}
              <div className="p-8">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-full bg-${commitment.color}-500 flex items-center justify-center mb-6 shadow-lg shadow-${commitment.color}-500/30 mx-auto`}>
                  <div className="text-white">
                    {commitment.icon}
                  </div>
                </div>
                
                {/* Text */}
                <h3 className={`text-${commitment.color}-400 text-xl font-bold mb-4 text-center`}>
                  {commitment.title}
                </h3>
                <p className="text-white text-center text-lg">
                  {commitment.description}
                </p>
              </div>
              
              {/* Bottom Gradient Overlay */}
              <div className={`absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-${commitment.color}-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Message */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 filter blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-purple-500/10 filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <FaHandshake className="text-[var(--accent-blue-bright)] w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl text-white font-bold mb-4 text-center">
              Mối Quan Hệ Đối Tác Bền Vững
            </h3>
            <p className="text-white text-center text-lg leading-relaxed max-w-4xl mx-auto">
              Chúng tôi tin rằng mối quan hệ đối tác thành công phải dựa trên sự minh bạch, tin cậy và tôn trọng lẫn nhau. M-SCI cam kết đồng hành cùng đối tác để cùng phát triển và thành công trong dài hạn.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 