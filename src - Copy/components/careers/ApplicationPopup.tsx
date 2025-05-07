'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ApplicationPopupProps {
  isOpen: boolean;
  jobTitle: string;
  onClose: () => void;
}

export default function ApplicationPopup({ isOpen, jobTitle, onClose }: ApplicationPopupProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    portfolio: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after submission
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        portfolio: '',
        message: ''
      });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl mx-4 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg p-6 overflow-hidden">
        {/* Decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent-blue-bright)]/10 blur-3xl rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[var(--accent-blue-bright)]/10 blur-3xl rounded-full -ml-20 -mb-20"></div>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Header */}
        <div className="mb-6 relative z-10">
          <div className="w-fit px-3 py-1 mb-2 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] text-xs rounded-full">
            Vị trí ứng tuyển: {jobTitle}
          </div>
          <h2 className="font-orbitron text-2xl font-bold text-white mb-2">
            Đơn ứng tuyển
          </h2>
          <p className="font-noto-sans text-gray-300">
            Vui lòng điền đầy đủ thông tin dưới đây để ứng tuyển vị trí {jobTitle} tại 5MSCI
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-2">Gửi đơn thành công!</h3>
            <p className="font-noto-sans text-gray-300">
              Cảm ơn bạn đã ứng tuyển vào 5MSCI. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block mb-1 font-noto-sans text-sm font-medium text-gray-300">
                  Họ và tên *
                </label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full py-2.5 px-4 bg-gray-800/50 border border-gray-700 focus:border-[var(--accent-blue-bright)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue-bright)]/50 text-white rounded-lg"
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-1 font-noto-sans text-sm font-medium text-gray-300">
                  Email *
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-2.5 px-4 bg-gray-800/50 border border-gray-700 focus:border-[var(--accent-blue-bright)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue-bright)]/50 text-white rounded-lg"
                  placeholder="Nhập địa chỉ email của bạn"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block mb-1 font-noto-sans text-sm font-medium text-gray-300">
                  Số điện thoại *
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full py-2.5 px-4 bg-gray-800/50 border border-gray-700 focus:border-[var(--accent-blue-bright)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue-bright)]/50 text-white rounded-lg"
                  placeholder="Nhập số điện thoại của bạn"
                />
              </div>
              
              <div>
                <label htmlFor="experience" className="block mb-1 font-noto-sans text-sm font-medium text-gray-300">
                  Kinh nghiệm làm việc *
                </label>
                <select 
                  id="experience" 
                  name="experience" 
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full py-2.5 px-4 bg-gray-800/50 border border-gray-700 focus:border-[var(--accent-blue-bright)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue-bright)]/50 text-white rounded-lg"
                >
                  <option value="" disabled>Chọn kinh nghiệm</option>
                  <option value="0-1 năm">Dưới 1 năm</option>
                  <option value="1-2 năm">1-2 năm</option>
                  <option value="2-5 năm">2-5 năm</option>
                  <option value="Trên 5 năm">Trên 5 năm</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="portfolio" className="block mb-1 font-noto-sans text-sm font-medium text-gray-300">
                Link Portfolio/Github (nếu có)
              </label>
              <input 
                type="url" 
                id="portfolio" 
                name="portfolio" 
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full py-2.5 px-4 bg-gray-800/50 border border-gray-700 focus:border-[var(--accent-blue-bright)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue-bright)]/50 text-white rounded-lg"
                placeholder="https://yourportfolio.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-1 font-noto-sans text-sm font-medium text-gray-300">
                Thông tin thêm
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full py-2.5 px-4 bg-gray-800/50 border border-gray-700 focus:border-[var(--accent-blue-bright)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue-bright)]/50 text-white rounded-lg resize-none"
                placeholder="Các thông tin liên quan đến kinh nghiệm, mong muốn của bạn..."
              ></textarea>
            </div>
          
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  required
                  className="w-4 h-4 bg-gray-800 border-gray-700 text-[var(--accent-blue-bright)] rounded focus:ring-[var(--accent-blue-bright)]/25"
                />
                <span className="font-noto-sans text-sm text-gray-300">Tôi đồng ý với các <a href="#" className="text-[var(--accent-blue-bright)] hover:underline">điều khoản bảo mật</a></span>
              </label>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="font-noto-sans button-cyber clip-hexagon hexagon-border text-white bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/40 transition-all duration-300 py-3 px-6 font-medium flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang gửi...
                  </>
                ) : 'Gửi Đơn Ứng Tuyển'}
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-6 border-t border-gray-800 pt-4 text-center font-noto-sans text-sm text-gray-400 relative z-10">
          Nếu có thắc mắc, vui lòng liên hệ qua email <a href="mailto:hr@5msci.com" className="text-[var(--accent-blue-bright)] hover:underline">hr@5msci.com</a>
        </div>
      </div>
    </div>
  );
} 