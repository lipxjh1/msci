'use client';

import { FaEnvelope, FaPhone, FaBuilding, FaClock } from 'react-icons/fa';

export default function PartnerContact() {
  // Dữ liệu thông tin liên hệ
  const contactInfo = {
    department: "Phòng Phát Triển Đối Tác",
    email: "partners@m-sci.net",
    phone: "1900-MSCI-88",
    address: "Tầng 25, Tòa nhà M-SCI Tower, Q.1, TP.HCM",
    workingHours: "8:30 - 17:30 (Thứ 2 - Thứ 6)"
  };

  return (
    <div className="mb-16">
      <div className="flex justify-center mb-8">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            LIÊN HỆ HỖ TRỢ
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-[var(--accent-blue-bright)] to-purple-600 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-12 h-12 text-white" 
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
                r="1" 
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 className="text-xl text-white font-semibold mb-2">
            {contactInfo.department}
          </h3>
          <p className="text-white/60 text-center max-w-xl">
            Đội ngũ chuyên viên hỗ trợ đối tác của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và đồng hành cùng bạn.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center mb-3">
              <FaEnvelope className="text-[var(--accent-blue-bright)] w-5 h-5" />
            </div>
            <h4 className="text-white font-medium mb-1">Email</h4>
            <p className="text-white/70 text-center">
              {contactInfo.email}
            </p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center mb-3">
              <FaPhone className="text-[var(--accent-blue-bright)] w-5 h-5" />
            </div>
            <h4 className="text-white font-medium mb-1">Hotline</h4>
            <p className="text-white/70 text-center">
              {contactInfo.phone}
            </p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center mb-3">
              <FaBuilding className="text-[var(--accent-blue-bright)] w-5 h-5" />
            </div>
            <h4 className="text-white font-medium mb-1">Địa chỉ</h4>
            <p className="text-white/70 text-center">
              {contactInfo.address}
            </p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center mb-3">
              <FaClock className="text-[var(--accent-blue-bright)] w-5 h-5" />
            </div>
            <h4 className="text-white font-medium mb-1">Giờ làm việc</h4>
            <p className="text-white/70 text-center">
              {contactInfo.workingHours}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 