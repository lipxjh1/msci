'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhone, FaDiscord } from 'react-icons/fa';

export default function CreatorContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Xử lý gửi form - hiện tại chỉ giả lập thành công
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset sau 3 giây
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-8">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            LIÊN HỆ VỚI CHÚNG TÔI
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-bright)]/20 group relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent-blue-bright)]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl text-white font-semibold mb-2 text-center">Tin nhắn đã được gửi!</h3>
              <p className="text-white/70 text-center">Chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-white/80 mb-1">Họ và tên</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-blue-bright)]/70"
                    placeholder="Nhập họ và tên của bạn"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white/80 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-blue-bright)]/70"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-white/80 mb-1">Chủ đề</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[var(--accent-blue-bright)]/70"
                  required
                >
                  <option value="" className="bg-[#041019]">Chọn chủ đề</option>
                  <option value="registration" className="bg-[#041019]">Đăng ký tham gia</option>
                  <option value="partnership" className="bg-[#041019]">Đề xuất hợp tác</option>
                  <option value="support" className="bg-[#041019]">Hỗ trợ kỹ thuật</option>
                  <option value="payment" className="bg-[#041019]">Vấn đề thanh toán</option>
                  <option value="other" className="bg-[#041019]">Khác</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white/80 mb-1">Nội dung</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-blue-bright)]/70"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[var(--accent-blue-bright)]/80 to-blue-500/80 text-white rounded-md hover:from-[var(--accent-blue-bright)] hover:to-blue-500 transition-colors shadow-lg"
                >
                  Gửi Tin Nhắn
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Contact Info */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-500/20 group relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <h3 className="text-xl text-white font-semibold mb-6 font-rajdhani tracking-wide border-b border-white/10 pb-2">
            Thông Tin Liên Hệ
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-[var(--accent-blue-bright)] w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Email</h4>
                <a href="mailto:creators@msci.game" className="text-white/70 hover:text-[var(--accent-blue-bright)] transition-colors">creators@msci.game</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center flex-shrink-0">
                <FaPhone className="text-[var(--accent-blue-bright)] w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Hotline</h4>
                <a href="tel:+84911999888" className="text-white/70 hover:text-[var(--accent-blue-bright)] transition-colors">+84 911 999 888</a>
                <p className="text-white/50 text-sm">Thứ Hai - Thứ Sáu, 9:00 - 18:00</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center flex-shrink-0">
                <FaDiscord className="text-[var(--accent-blue-bright)] w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Discord</h4>
                <a href="#" className="text-white/70 hover:text-[var(--accent-blue-bright)] transition-colors">discord.gg/msci-creators</a>
                <p className="text-white/50 text-sm">Hỗ trợ trực tuyến 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/10">
            <h4 className="text-white font-medium mb-3">Giờ Làm Việc</h4>
            <ul className="space-y-2 text-white/70">
              <li className="flex justify-between">
                <span>Thứ Hai - Thứ Sáu:</span>
                <span>9:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Thứ Bảy:</span>
                <span>9:00 - 12:00</span>
              </li>
              <li className="flex justify-between">
                <span>Chủ Nhật:</span>
                <span>Nghỉ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 