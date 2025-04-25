'use client';

import { FaRegEdit, FaSearch, FaUsers, FaFileSignature, FaRocket } from 'react-icons/fa';

export default function PartnerRegistrationSteps() {
  // Dữ liệu các bước đăng ký đối tác
  const registrationSteps = [
    {
      id: 1,
      title: 'Đăng Ký Thông Tin',
      description: 'Điền form đăng ký với thông tin chi tiết về tổ chức của bạn',
      icon: <FaRegEdit className="w-6 h-6 text-white" />
    },
    {
      id: 2,
      title: 'Đánh Giá Sơ Bộ',
      description: 'Đội ngũ M-SCI sẽ review hồ sơ trong vòng 5-7 ngày làm việc',
      icon: <FaSearch className="w-6 h-6 text-white" />
    },
    {
      id: 3,
      title: 'Họp Thảo Luận',
      description: 'Meeting trực tiếp hoặc online để trao đổi chi tiết hợp tác',
      icon: <FaUsers className="w-6 h-6 text-white" />
    },
    {
      id: 4,
      title: 'Ký Kết Thỏa Thuận',
      description: 'Hoàn tất các thủ tục pháp lý và ký kết hợp đồng',
      icon: <FaFileSignature className="w-6 h-6 text-white" />
    },
    {
      id: 5,
      title: 'Triển Khai',
      description: 'Bắt đầu triển khai các hoạt động hợp tác theo kế hoạch',
      icon: <FaRocket className="w-6 h-6 text-white" />
    }
  ];

  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-8">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            QUY TRÌNH TRỞ THÀNH ĐỐI TÁC
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="flex flex-col md:flex-row items-start justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-10 left-10 right-10 h-0.5 bg-gradient-to-r from-[var(--accent-blue-bright)]/70 to-purple-500/70 hidden md:block"></div>
        
        {registrationSteps.map((step) => (
          <div key={step.id} className="flex flex-col items-center mb-8 md:mb-0 relative z-10 w-full md:w-auto">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/80 to-purple-500/80 flex items-center justify-center mb-4 shadow-lg shadow-[var(--accent-blue-bright)]/20">
              {step.icon}
            </div>
            
            <div className="text-center">
              <h3 className="text-lg text-white font-medium mb-2">
                {step.title}
              </h3>
              <p className="text-white/70 text-sm max-w-[200px] mx-auto">
                {step.description}
              </p>
            </div>
            
            <div className="mt-3 flex items-center justify-center md:hidden">
              <div className="w-0.5 h-8 bg-gradient-to-b from-[var(--accent-blue-bright)]/70 to-purple-500/70"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 