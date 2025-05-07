"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheck, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import './modal-effects.css';

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnershipType: {
    title: string;
    price: string;
    benefits: string[];
    color: string;
  } | null;
}

export default function PartnershipModal({ isOpen, onClose, partnershipType }: PartnershipModalProps) {
  const [formState, setFormState] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll when modal closes
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.companyName.trim()) newErrors.companyName = 'Vui lòng nhập tên công ty';
    if (!formState.contactName.trim()) newErrors.contactName = 'Vui lòng nhập tên người liên hệ';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formState.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^\+?[0-9\s-()]{8,20}$/.test(formState.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formState.country.trim()) newErrors.country = 'Vui lòng chọn quốc gia';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On success
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        onClose();
        setFormState({
          companyName: '',
          contactName: '',
          email: '',
          phone: '',
          country: '',
          message: '',
        });
        setIsSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Có lỗi xảy ra khi gửi biểu mẫu. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Create color classes based on partnership type
  const buttonClass = partnershipType?.color || 'bg-gradient-to-br from-blue-500 to-cyan-500';
  const getTextColor = () => {
    if (!partnershipType?.color) return 'text-blue-500';
    
    if (partnershipType.color.includes('blue')) return 'text-blue-500';
    if (partnershipType.color.includes('purple')) return 'text-purple-500';
    if (partnershipType.color.includes('amber') || partnershipType.color.includes('orange')) return 'text-amber-500';
    
    return 'text-blue-500';
  };
  
  const textColor = getTextColor();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header with pattern background */}
              <div className="relative h-28 overflow-hidden rounded-t-2xl modal-header-bg">
                <div className="absolute inset-0 bg-gray-800 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('/images/grid_pattern.svg')] opacity-20"></div>
                
                {/* Logo and close button */}
                <div className="relative h-full flex items-center justify-between px-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 relative mr-4 modal-glow rounded-full">
                      <Image 
                        src="/images/overwatch_logo.png" 
                        alt="M-SCI Logo" 
                        width={48}
                        height={48}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <h2 className="font-orbitron text-white text-2xl font-bold modal-shimmer">
                      {partnershipType?.title || 'Đối Tác M-SCI'}
                    </h2>
                  </div>
                  
                  <button 
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-gray-700/50 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              
              {/* Modal content */}
              <div className="p-6">
                {isSuccess ? (
                  <div className="text-center py-8 success-appear">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 pulse-effect">
                      <FaCheck className="text-green-500 text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Đã Gửi Thành Công!</h3>
                    <p className="text-gray-300">
                      Cảm ơn bạn đã quan tâm đến gói đối tác của M-SCI. Đội ngũ của chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Description */}
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <div className={`h-1 w-12 ${buttonClass} rounded-full mr-3`}></div>
                        <h3 className={`${textColor} font-medium`}>
                          {partnershipType?.price}
                        </h3>
                      </div>
                      
                      <p className="text-gray-300 mb-4">
                        Vui lòng điền thông tin dưới đây để bắt đầu quá trình thảo luận về hợp tác. Đội ngũ của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                      </p>
                      
                      {/* Benefits */}
                      {partnershipType?.benefits && partnershipType.benefits.length > 0 && (
                        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">Quyền lợi bao gồm:</h4>
                          <ul className="space-y-1">
                            {partnershipType.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start text-sm benefit-hover-effect">
                                <span className={`mr-2 ${textColor}`}>•</span>
                                <span className="text-gray-300">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Tên công ty <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="companyName"
                            value={formState.companyName}
                            onChange={handleChange}
                            className={`w-full bg-gray-800/50 border ${errors.companyName ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 input-focus-effect`}
                            placeholder="Nhập tên công ty"
                          />
                          {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Tên người liên hệ <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="contactName"
                            value={formState.contactName}
                            onChange={handleChange}
                            className={`w-full bg-gray-800/50 border ${errors.contactName ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 input-focus-effect`}
                            placeholder="Nhập tên người liên hệ"
                          />
                          {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Email <span className="text-red-500">*</span></label>
                          <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            className={`w-full bg-gray-800/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 input-focus-effect`}
                            placeholder="contact@company.com"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                          <input
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className={`w-full bg-gray-800/50 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 input-focus-effect`}
                            placeholder="+84 xxx xxx xxx"
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-gray-300 text-sm mb-1">Quốc gia <span className="text-red-500">*</span></label>
                          <select
                            name="country"
                            value={formState.country}
                            onChange={handleChange}
                            className={`w-full bg-gray-800/50 border ${errors.country ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 input-focus-effect`}
                          >
                            <option value="">Chọn quốc gia</option>
                            <option value="VN">Việt Nam</option>
                            <option value="US">Hoa Kỳ</option>
                            <option value="JP">Nhật Bản</option>
                            <option value="KR">Hàn Quốc</option>
                            <option value="SG">Singapore</option>
                            <option value="MY">Malaysia</option>
                            <option value="TH">Thái Lan</option>
                            <option value="OTHER">Khác</option>
                          </select>
                          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-gray-300 text-sm mb-1">Lời nhắn</label>
                          <textarea
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 h-24 resize-none input-focus-effect"
                            placeholder="Hãy cho chúng tôi biết thêm về mục tiêu hợp tác của quý công ty..."
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                          disabled={isSubmitting}
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          className={`px-5 py-2 ${buttonClass} text-white rounded-lg transition-all hover:shadow-lg disabled:opacity-70 flex items-center justify-center min-w-[120px] modal-glow`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin mr-2" />
                              Đang gửi...
                            </>
                          ) : 'Gửi yêu cầu'}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
              
              {/* Footer */}
              <div className="border-t border-gray-800 p-4 text-center">
                <p className="text-gray-400 text-sm">
                  Bạn có thể liên hệ trực tiếp qua email: <a href="mailto:partner@m-sci.io" className={`${textColor} hover:underline`}>partner@m-sci.io</a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 