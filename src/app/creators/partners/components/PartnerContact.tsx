'use client';

import { FaEnvelope, FaPhone, FaBuilding, FaClock, FaMapMarkedAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function PartnerContact() {
  // Dữ liệu thông tin liên hệ
  const contactInfo = {
    department: "Phòng Phát Triển Đối Tác",
    email: "partners@m-sci.net",
    phone: "1900-MSCI-88",
    address: "Tầng 25, Tòa nhà M-SCI Tower, Q.1, TP.HCM",
    workingHours: "8:30 - 17:30 (Thứ 2 - Thứ 6)"
  };

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
      id="contact-section"
    >
      <div className="flex flex-col items-center mb-12">
        <motion.h2 
          variants={itemVariants}
          className="font-orbitron text-3xl md:text-4xl font-bold text-white cyber-halo mb-4"
        >
          <span className="text-shadow-blue relative inline-block">
            LIÊN HỆ HỖ TRỢ
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
          Đội ngũ chuyên viên của chúng tôi luôn sẵn sàng hỗ trợ mọi thắc mắc
        </motion.p>
      </div>
      
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-br from-[#041019]/60 to-[#072030]/60 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-10 shadow-2xl relative overflow-hidden"
      >
        {/* Background particles */}
        <div className="absolute inset-0 bg-[url('/images/particle-overlay.png')] bg-repeat opacity-5"></div>
        
        {/* Glowing orbs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-500/5 filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-500/5 filter blur-3xl"></div>
        
        <div className="relative z-10">
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
          >
            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 transform -rotate-6">
              <svg 
                className="w-14 h-14 text-white" 
                viewBox="0 0 24 24" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M20 10C20 14.4183 16.4183 18 12 18C7.58172 18 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" 
                  stroke="currentColor" 
                  strokeWidth="2"
                />
                <path 
                  d="M12 14V22M12 22H9M12 22H15" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
                <circle 
                  cx="12" 
                  cy="10" 
                  r="2" 
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="text-center md:text-left max-w-xl">
              <h3 className="text-2xl md:text-3xl text-white font-bold mb-2">
                {contactInfo.department}
              </h3>
              <p className="text-white/70 text-lg">
                Đội ngũ chuyên viên hỗ trợ đối tác của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và đồng hành cùng bạn trong suốt quá trình hợp tác.
              </p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-blue-600/10 to-blue-400/5 rounded-xl p-6 flex flex-col items-center hover:shadow-blue-500/10 hover:shadow-lg transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/0 transition-all duration-500"></div>
              <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:shadow-blue-500/30 group-hover:shadow-lg transition-all duration-500">
                <FaEnvelope className="text-blue-400 w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Email</h4>
              <p className="text-white/80 text-center text-base">
                {contactInfo.email}
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href={`mailto:${contactInfo.email}`} className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center">
                  Gửi Email
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-purple-600/10 to-purple-400/5 rounded-xl p-6 flex flex-col items-center hover:shadow-purple-500/10 hover:shadow-lg transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/0 transition-all duration-500"></div>
              <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 group-hover:shadow-purple-500/30 group-hover:shadow-lg transition-all duration-500">
                <FaPhone className="text-purple-400 w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Hotline</h4>
              <p className="text-white/80 text-center text-base">
                {contactInfo.phone}
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href={`tel:${contactInfo.phone}`} className="text-purple-400 hover:text-purple-300 text-sm inline-flex items-center">
                  Gọi Ngay
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-teal-600/10 to-teal-400/5 rounded-xl p-6 flex flex-col items-center hover:shadow-teal-500/10 hover:shadow-lg transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-teal-500/0 group-hover:from-teal-500/5 group-hover:to-teal-500/0 transition-all duration-500"></div>
              <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center mb-4 group-hover:shadow-teal-500/30 group-hover:shadow-lg transition-all duration-500">
                <FaMapMarkedAlt className="text-teal-400 w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Địa chỉ</h4>
              <p className="text-white/80 text-center text-base">
                {contactInfo.address}
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href="#" className="text-teal-400 hover:text-teal-300 text-sm inline-flex items-center">
                  Xem Bản Đồ
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-amber-600/10 to-amber-400/5 rounded-xl p-6 flex flex-col items-center hover:shadow-amber-500/10 hover:shadow-lg transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/0 transition-all duration-500"></div>
              <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mb-4 group-hover:shadow-amber-500/30 group-hover:shadow-lg transition-all duration-500">
                <FaClock className="text-amber-400 w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Giờ làm việc</h4>
              <p className="text-white/80 text-center text-base">
                {contactInfo.workingHours}
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-amber-400 text-sm">
                  Hỗ trợ 24/7 qua email
                </span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex justify-center"
          >
            <a 
              href="#partner-form" 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 flex items-center"
            >
              Đăng Ký Làm Đối Tác Ngay
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
} 