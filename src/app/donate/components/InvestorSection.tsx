"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { FaTimes, FaEnvelope, FaTelegram, FaLinkedin, FaPhone, FaFileContract, FaCheck } from 'react-icons/fa';

export default function InvestorSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    investmentLevel: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        company: '',
        investmentLevel: '',
        message: '',
      });
      setActiveTab('contact');
      setIsModalOpen(false);
    }, 3000);
  };
  
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/images/particle_overlay.png')] opacity-10 z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          {/* Image Section */}
          <div className="lg:w-1/2 overflow-hidden rounded-xl relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[400px] w-full rounded-xl overflow-hidden"
            >
              <Image
                src="/images/overwatch_bg_2.jpg"
                alt="M-SCI Investor"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent"></div>
            </motion.div>
          </div>
          
          {/* Content Section */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-6">
                Quyền Lợi <span className="text-cyan-400">Đặc Biệt</span> <br/>
                Dành Cho Nhà Đầu Tư Lớn
              </h2>
              
              <p className="text-gray-300 mb-6">
                Chúng tôi hiểu rằng các nhà đầu tư lớn cần được đối xử đặc biệt. M-SCI cam kết mang lại những 
                quyền lợi riêng biệt, bảo vệ lợi ích và tối đa hóa tiềm năng đầu tư của bạn.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="text-cyan-400 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Quyền tiếp cận độc quyền</h3>
                    <p className="text-gray-400">Tham gia các cuộc họp chiến lược, được tư vấn cá nhân và quyền lựa chọn tính năng ưu tiên.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-cyan-400 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phần trăm lợi nhuận đảm bảo</h3>
                    <p className="text-gray-400">Chính sách chia sẻ lợi nhuận rõ ràng với mức cam kết ROI cạnh tranh và ổn định.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-cyan-400 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Vị trí trong hội đồng cố vấn</h3>
                    <p className="text-gray-400">Với mức đầu tư đủ lớn, bạn sẽ có cơ hội tham gia hội đồng cố vấn dự án và định hướng phát triển.</p>
                  </div>
                </li>
              </ul>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-cyan-500/30 transform hover:scale-105 duration-300"
              >
                Liên Hệ Bộ Phận Đầu Tư
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Investor Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-3xl mx-4 z-10 relative overflow-hidden"
            >
              {/* Success overlay */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gray-900/95 flex flex-col items-center justify-center z-20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <FaCheck className="text-green-500 text-6xl mb-4" />
                    </motion.div>
                    <h3 className="text-white text-2xl font-bold mb-2">Gửi thông tin thành công!</h3>
                    <p className="text-gray-300 mb-6">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                    >
                      Đóng
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="border-b border-gray-700 p-4 flex justify-between items-center bg-gray-800">
                <h3 className="text-xl font-orbitron text-white">Liên Hệ Đầu Tư</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-700">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-4 py-3 font-medium ${
                    activeTab === 'contact' 
                      ? 'text-cyan-400 border-b-2 border-cyan-400' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Thông Tin Liên Hệ
                </button>
                <button
                  onClick={() => setActiveTab('form')}
                  className={`px-4 py-3 font-medium ${
                    activeTab === 'form' 
                      ? 'text-cyan-400 border-b-2 border-cyan-400' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Gửi Yêu Cầu
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {activeTab === 'contact' && (
                  <div>
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-white mb-4">Thông Tin Liên Hệ Chính Thức</h4>
                      <div className="bg-gray-800 rounded-lg p-5">
                        <div className="flex items-start mb-4">
                          <FaEnvelope className="text-cyan-400 mt-1 mr-3" />
                          <div>
                            <h5 className="text-white font-medium">Email</h5>
                            <a href="mailto:investor@m-sci.net" className="text-cyan-400 hover:underline">
                              investor@m-sci.net
                            </a>
                            <p className="text-gray-400 text-sm mt-1">
                              Thời gian phản hồi: 24-48 giờ làm việc
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start mb-4">
                          <FaTelegram className="text-cyan-400 mt-1 mr-3" />
                          <div>
                            <h5 className="text-white font-medium">Telegram</h5>
                            <a href="https://t.me/MSCIinvestor" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                              @MSCIinvestor
                            </a>
                            <p className="text-gray-400 text-sm mt-1">
                              Hỗ trợ trực tuyến: 9:00 - 18:00 (GMT+7)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start mb-4">
                          <FaPhone className="text-cyan-400 mt-1 mr-3" />
                          <div>
                            <h5 className="text-white font-medium">Hotline</h5>
                            <a href="tel:+84900000000" className="text-cyan-400 hover:underline">
                              +84 90 000 0000
                            </a>
                            <p className="text-gray-400 text-sm mt-1">
                              Giờ làm việc: Thứ Hai - Thứ Sáu, 9:00 - 17:00 (GMT+7)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaLinkedin className="text-cyan-400 mt-1 mr-3" />
                          <div>
                            <h5 className="text-white font-medium">LinkedIn</h5>
                            <a href="https://linkedin.com/company/m-sci" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                              M-SCI Corporation
                            </a>
                            <p className="text-gray-400 text-sm mt-1">
                              Theo dõi cập nhật mới nhất về dự án
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Tài Liệu Cho Nhà Đầu Tư</h4>
                      <div className="bg-gray-800 rounded-lg p-5">
                        <div className="flex justify-between items-center p-3 border border-gray-700 rounded-lg mb-3 hover:border-gray-500 transition-colors">
                          <div className="flex items-center">
                            <FaFileContract className="text-cyan-400 mr-3" />
                            <span className="text-white">Whitepaper</span>
                          </div>
                          <a 
                            href="#"
                            className="px-3 py-1 bg-gray-700 hover:bg-cyan-600 text-white text-sm rounded transition-colors"
                          >
                            Tải xuống
                          </a>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border border-gray-700 rounded-lg mb-3 hover:border-gray-500 transition-colors">
                          <div className="flex items-center">
                            <FaFileContract className="text-cyan-400 mr-3" />
                            <span className="text-white">Hồ sơ nhà đầu tư</span>
                          </div>
                          <a 
                            href="#"
                            className="px-3 py-1 bg-gray-700 hover:bg-cyan-600 text-white text-sm rounded transition-colors"
                          >
                            Tải xuống
                          </a>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors">
                          <div className="flex items-center">
                            <FaFileContract className="text-cyan-400 mr-3" />
                            <span className="text-white">Bản đồ lộ trình</span>
                          </div>
                          <a 
                            href="#"
                            className="px-3 py-1 bg-gray-700 hover:bg-cyan-600 text-white text-sm rounded transition-colors"
                          >
                            Tải xuống
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'form' && (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="fullName" className="block text-white mb-1">Họ và tên <span className="text-red-500">*</span></label>
                        <input 
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-white mb-1">Email <span className="text-red-500">*</span></label>
                        <input 
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="company" className="block text-white mb-1">Công ty</label>
                        <input 
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="investmentLevel" className="block text-white mb-1">Mức đầu tư dự kiến</label>
                        <select 
                          id="investmentLevel"
                          name="investmentLevel"
                          value={formData.investmentLevel}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        >
                          <option value="">-- Chọn mức đầu tư --</option>
                          <option value="10000">Dưới $10,000</option>
                          <option value="50000">$10,000 - $50,000</option>
                          <option value="100000">$50,000 - $100,000</option>
                          <option value="500000">$100,000 - $500,000</option>
                          <option value="1000000">Trên $500,000</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="message" className="block text-white mb-1">Thông điệp <span className="text-red-500">*</span></label>
                      <textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        placeholder="Mô tả ngắn gọn về mục đích liên hệ và những thông tin bạn cần tìm hiểu thêm..."
                      ></textarea>
                    </div>

                    <div className="mt-6">
                      <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg"
                      >
                        Gửi Yêu Cầu
                      </button>
                    </div>

                    <div className="mt-4 text-center text-sm text-gray-400">
                      Chúng tôi sẽ liên hệ lại với bạn trong vòng 24-48 giờ làm việc
                    </div>
                  </form>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-700 p-4 flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
                >
                  Đóng
                </button>
                
                {activeTab === 'contact' && (
                  <button
                    onClick={() => setActiveTab('form')}
                    className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                  >
                    Gửi Yêu Cầu
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
} 