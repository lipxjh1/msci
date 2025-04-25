'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaTrophy, FaUser, FaEnvelope, FaBuilding, FaGlobe, FaMedal, FaAward, FaLinkedin, FaTwitter } from 'react-icons/fa';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import './nomination.css';

// Form fields type
type FormData = {
  nominatorName: string;
  nominatorEmail: string;
  nomineeName: string;
  nomineeOrganization: string;
  nomineeWebsite: string;
  nomineeLinkedin: string;
  nomineeTwitter: string;
  category: string;
  achievements: string;
  contributions: string;
  impact: string;
  additionalInfo: string;
};

// Categories
const categories = [
  { id: 'player', label: 'Người chơi xuất sắc', icon: <FaTrophy className="text-yellow-400" /> },
  { id: 'creator', label: 'Nhà sáng tạo nội dung', icon: <FaAward className="text-purple-400" /> },
  { id: 'developer', label: 'Nhà phát triển', icon: <FaMedal className="text-blue-400" /> },
  { id: 'community', label: 'Đóng góp cộng đồng', icon: <FaGlobe className="text-green-400" /> },
  { id: 'esports', label: 'Thành tựu Esports', icon: <FaTrophy className="text-red-400" /> },
  { id: 'lifetime', label: 'Cống hiến trọn đời', icon: <FaMedal className="text-cyan-400" /> },
];

export default function Nomination() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    nominatorName: '',
    nominatorEmail: '',
    nomineeName: '',
    nomineeOrganization: '',
    nomineeWebsite: '',
    nomineeLinkedin: '',
    nomineeTwitter: '',
    category: '',
    achievements: '',
    contributions: '',
    impact: '',
    additionalInfo: '',
  });
  
  // Form state and validation
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Particles for background effect
  const particles = [];
  for (let i = 0; i < 30; i++) {
    const size = Math.random() * 6 + 2;
    const opacity = Math.random() * 0.3;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    const drift = Math.random() * 40 - 20;
    
    particles.push(
      <div 
        key={i}
        className="enhanced-particle absolute rounded-full bg-blue-500"
        style={{
          '--particle-size': `${size}px`,
          '--particle-opacity': opacity.toString(),
          '--particle-duration': `${duration}s`,
          '--particle-drift': `${drift}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${delay}s`,
        } as React.CSSProperties}
      />
    );
  }
  
  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    // Required fields
    if (!formData.nominatorName) newErrors.nominatorName = 'Họ tên là trường bắt buộc';
    if (!formData.nominatorEmail) {
      newErrors.nominatorEmail = 'Email là trường bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.nominatorEmail)) {
      newErrors.nominatorEmail = 'Email không hợp lệ';
    }
    
    if (!formData.nomineeName) newErrors.nomineeName = 'Họ tên người được đề cử là trường bắt buộc';
    if (!formData.category) newErrors.category = 'Vui lòng chọn một danh mục';
    if (!formData.achievements) newErrors.achievements = 'Thành tích là trường bắt buộc';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormSubmitted(true);
      // Reset form
      setFormData({
        nominatorName: '',
        nominatorEmail: '',
        nomineeName: '',
        nomineeOrganization: '',
        nomineeWebsite: '',
        nomineeLinkedin: '',
        nomineeTwitter: '',
        category: '',
        achievements: '',
        contributions: '',
        impact: '',
        additionalInfo: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ThanhDieuHuongResponsive />
      </div>
      
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/particle_overlay.png')] bg-center opacity-10 z-0"></div>
        
        {/* Particles animation */}
        <div className="absolute inset-0 overflow-hidden z-[1]">
          {particles}
        </div>
        
        {/* Background flares */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[150px] opacity-30 z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[120px] opacity-20 z-0" />
      </div>
      
      <div className="pt-24 pb-20 px-4 relative z-10">
        {/* Header section */}
        <div className="max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4">
              Đề Cử Ứng Viên
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Vinh danh những cá nhân và tổ chức xuất sắc với những đóng góp to lớn cho cộng đồng M-SCI
            </p>
          </motion.div>
          
          {/* Trophy Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex justify-center mb-12"
          >
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, type: 'tween' }}
              className="relative w-24 h-24 md:w-32 md:h-32"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaTrophy className="text-6xl md:text-7xl text-yellow-400 trophy-icon" />
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {formSubmitted ? (
          // Success message
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-gradient-to-b from-blue-900/30 to-blue-900/10 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/30 text-center success-animation"
          >
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto badge-pulse">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Đề Cử Thành Công!</h2>
            <p className="text-gray-300 mb-6">
              Cảm ơn bạn đã đề cử ứng viên cho Hall of Fame của M-SCI. Đề cử của bạn đã được ghi nhận và sẽ được xem xét bởi hội đồng tuyển chọn.
            </p>
            <button
              onClick={() => setFormSubmitted(false)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors btn-nomination"
            >
              Đề Cử Ứng Viên Khác
            </button>
          </motion.div>
        ) : (
          // Form container
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-b from-blue-900/30 to-blue-900/10 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-blue-500/30 card-hover-effect">
              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Form sections */}
                <div className="mb-8 form-section form-section-delay-1">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-400">Thông Tin Người Đề Cử</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="nominatorName"
                          value={formData.nominatorName}
                          onChange={handleChange}
                          className={`w-full bg-slate-900/60 border ${errors.nominatorName ? 'border-red-500' : 'border-gray-700'} rounded-lg py-3 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 input-focus-effect`}
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                      {errors.nominatorName && <p className="text-red-500 text-sm mt-1">{errors.nominatorName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Email <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="nominatorEmail"
                          value={formData.nominatorEmail}
                          onChange={handleChange}
                          className={`w-full bg-slate-900/60 border ${errors.nominatorEmail ? 'border-red-500' : 'border-gray-700'} rounded-lg py-3 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 input-focus-effect`}
                          placeholder="email@example.com"
                        />
                      </div>
                      {errors.nominatorEmail && <p className="text-red-500 text-sm mt-1">{errors.nominatorEmail}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="mb-8 form-section form-section-delay-2">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-400">Thông Tin Người Được Đề Cử</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="nomineeName"
                          value={formData.nomineeName}
                          onChange={handleChange}
                          className={`w-full bg-slate-900/60 border ${errors.nomineeName ? 'border-red-500' : 'border-gray-700'} rounded-lg py-3 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 input-focus-effect`}
                          placeholder="Nguyễn Văn B"
                        />
                      </div>
                      {errors.nomineeName && <p className="text-red-500 text-sm mt-1">{errors.nomineeName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Tổ chức/Công ty (nếu có)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FaBuilding className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="nomineeOrganization"
                          value={formData.nomineeOrganization}
                          onChange={handleChange}
                          className="w-full bg-slate-900/60 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 input-focus-effect"
                          placeholder="Tên tổ chức"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Website (nếu có)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FaGlobe className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="nomineeWebsite"
                          value={formData.nomineeWebsite}
                          onChange={handleChange}
                          className="w-full bg-slate-900/60 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 input-focus-effect"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Danh mục <span className="text-red-500">*</span></label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full bg-slate-900/60 border ${errors.category ? 'border-red-500' : 'border-gray-700'} rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 input-focus-effect`}
                      >
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">LinkedIn (nếu có)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FaLinkedin className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="nomineeLinkedin"
                          value={formData.nomineeLinkedin}
                          onChange={handleChange}
                          className="w-full bg-slate-900/60 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 input-focus-effect"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Twitter/X (nếu có)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FaTwitter className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="nomineeTwitter"
                          value={formData.nomineeTwitter}
                          onChange={handleChange}
                          className="w-full bg-slate-900/60 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 input-focus-effect"
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8 form-section form-section-delay-3">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-400">Thông Tin Thành Tích & Đóng Góp</h2>
                  
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Thành tích nổi bật <span className="text-red-500">*</span></label>
                    <textarea
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleChange}
                      className={`w-full bg-slate-900/60 border ${errors.achievements ? 'border-red-500' : 'border-gray-700'} rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] input-focus-effect`}
                      placeholder="Mô tả những thành tích nổi bật của ứng viên..."
                    ></textarea>
                    {errors.achievements && <p className="text-red-500 text-sm mt-1">{errors.achievements}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Đóng góp cho cộng đồng</label>
                    <textarea
                      name="contributions"
                      value={formData.contributions}
                      onChange={handleChange}
                      className="w-full bg-slate-900/60 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] input-focus-effect"
                      placeholder="Mô tả những đóng góp của ứng viên cho cộng đồng M-SCI..."
                    ></textarea>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Tác động & ảnh hưởng</label>
                    <textarea
                      name="impact"
                      value={formData.impact}
                      onChange={handleChange}
                      className="w-full bg-slate-900/60 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] input-focus-effect"
                      placeholder="Mô tả những tác động và ảnh hưởng của ứng viên..."
                    ></textarea>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Thông tin bổ sung</label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      className="w-full bg-slate-900/60 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] input-focus-effect"
                      placeholder="Bất kỳ thông tin bổ sung nào về ứng viên..."
                    ></textarea>
                  </div>
                </div>
                
                {/* Submit button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 btn-nomination ${
                      isSubmitting 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 hover:shadow-xl hover:shadow-blue-500/20'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang xử lý...
                      </div>
                    ) : (
                      'Gửi Đề Cử'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
        
        {/* Badges section */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-sm p-4 rounded-xl border border-slate-700/30 flex flex-col items-center text-center badge-hover"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-800/50 border border-slate-700/30 flex items-center justify-center mb-3">
                  <div className="text-2xl md:text-3xl">
                    {cat.icon}
                  </div>
                </div>
                <h3 className="text-sm text-gray-300">
                  {cat.label}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* How it works */}
        <div className="max-w-5xl mx-auto mt-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quy Trình Xét Duyệt</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Đề Cử",
                description: "Hoàn thành biểu mẫu đề cử ứng viên mà bạn cho rằng xứng đáng vào Hall of Fame",
                icon: "📝",
                delay: 0.4
              },
              {
                title: "Xét Duyệt",
                description: "Hội đồng tuyển chọn sẽ xem xét tất cả các đề cử dựa trên thành tích và đóng góp",
                icon: "🔍",
                delay: 0.6
              },
              {
                title: "Vinh Danh",
                description: "Những người được chọn sẽ được vinh danh trong buổi lễ trao giải và ghi danh vào Hall of Fame",
                icon: "🏆",
                delay: 0.8
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: step.delay }}
                className="bg-gradient-to-b from-blue-900/20 to-slate-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 text-center card-hover-effect"
              >
                <div className="w-16 h-16 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center mx-auto mb-4 text-3xl">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-300">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer note */}
      <div className="relative z-10 bg-gradient-to-b from-transparent to-blue-900/10 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p className="mb-2">© 2024 M-SCI Entertainment. All rights reserved.</p>
          <p className="text-sm">
            Hạn chót cho đề cử năm 2024: <span className="text-blue-400">30/06/2024</span>
          </p>
        </div>
      </div>
    </div>
  );
} 