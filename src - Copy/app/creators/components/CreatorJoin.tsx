'use client';

import { useState } from 'react';
import { FaUserPlus, FaRocket, FaPencilAlt } from 'react-icons/fa';
import CreatorJoinPopup from './CreatorJoinPopup';

interface JoinStepType {
  id: 'register' | 'onboarding' | 'create';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  steps: string[];
}

export default function CreatorJoin() {
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [activeJoinStep, setActiveJoinStep] = useState<'register' | 'onboarding' | 'create'>('register');

  // Dữ liệu join steps
  const joinStepsData: Record<'register' | 'onboarding' | 'create', JoinStepType> = {
    register: {
      id: 'register',
      title: 'Quy Trình Đăng Ký',
      subtitle: 'Bắt đầu hành trình sáng tạo',
      icon: <FaUserPlus />,
      description: 'Quy trình đăng ký để trở thành Nhà sáng tạo nội dung M-SCI đơn giản và minh bạch. Chúng tôi đánh giá ứng viên dựa trên chất lượng nội dung, tầm với và sự phù hợp với giá trị của M-SCI. Hãy tuân theo các bước sau để bắt đầu hành trình của bạn.',
      steps: [
        'Chuẩn bị thông tin về các kênh mạng xã hội và nền tảng của bạn',
        'Điền đầy đủ mẫu đăng ký trực tuyến trên trang web của chúng tôi',
        'Viết một đoạn mô tả ngắn về chiến lược nội dung bạn dự định tạo',
        'Gửi đơn đăng ký và kiểm tra email xác nhận',
        'Đợi đội ngũ xem xét đơn đăng ký của bạn (3-5 ngày làm việc)',
        'Nhận kết quả và các bước tiếp theo qua email'
      ]
    },
    onboarding: {
      id: 'onboarding',
      title: 'Quy Trình Khởi Động',
      subtitle: 'Bắt đầu hành trình sáng tạo',
      icon: <FaRocket />,
      description: 'Sau khi đơn đăng ký của bạn được chấp nhận, bạn sẽ trải qua quá trình khởi động để làm quen với chương trình Nhà sáng tạo M-SCI. Quá trình này giúp bạn hiểu rõ về các công cụ, tài nguyên và quy trình làm việc của chúng tôi.',
      steps: [
        'Xác nhận tham gia chương trình qua email trong vòng 48 giờ',
        'Chọn thời gian tham gia buổi định hướng trực tuyến từ lịch có sẵn',
        'Tham gia buổi định hướng qua Discord hoặc Zoom (khoảng 60 phút)',
        'Nhận quyền truy cập vào bộ công cụ người sáng tạo (logo, hình ảnh, tài liệu)',
        'Thiết lập tài khoản trên bảng điều khiển Nhà sáng tạo M-SCI',
        'Kết nối thông tin thanh toán để nhận phần thưởng M-Coin'
      ]
    },
    create: {
      id: 'create',
      title: 'Bắt Đầu Sáng Tạo',
      subtitle: 'Tạo nội dung, phát triển thương hiệu',
      icon: <FaPencilAlt />,
      description: 'Đã đến lúc bắt đầu hành trình sáng tạo nội dung cho M-SCI! Sử dụng bộ công cụ và tài nguyên của chúng tôi để tạo ra nội dung chất lượng cao, thu hút người xem và xây dựng cộng đồng của riêng bạn.',
      steps: [
        'Lập kế hoạch nội dung hàng tháng sử dụng template trong bộ công cụ',
        'Sử dụng các tài nguyên từ bộ công cụ (logo, hình ảnh, âm thanh)',
        'Tạo nội dung đầu tiên theo hướng dẫn với các hashtag yêu cầu',
        'Đăng nội dung lên nền tảng của bạn và chia sẻ liên kết trong bảng điều khiển',
        'Gửi nội dung để đánh giá thông qua bảng điều khiển Nhà sáng tạo',
        'Theo dõi hiệu suất nội dung và nhận thưởng vào ngày 15 hàng tháng'
      ]
    }
  };

  const handleOpenJoinPopup = (type: 'register' | 'onboarding' | 'create') => {
    setActiveJoinStep(type);
    setShowJoinPopup(true);
  };

  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-8">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CÁCH THAM GIA
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Step 1: Register */}
        <div className="flex-1 relative group">
          {/* Line connector for desktop */}
          <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-transparent z-10"></div>
          
          <div className="relative bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20 h-full overflow-hidden">
            {/* Background Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Step Number */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold">
              1
            </div>
            
            {/* Icon */}
            <div className="relative z-10 bg-blue-500/10 text-blue-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform">
              <FaUserPlus className="w-7 h-7" />
            </div>
            
            {/* Title */}
            <h3 className="text-xl text-center text-white font-semibold mb-4 font-rajdhani tracking-wide">
              Đăng Ký
            </h3>
            
            {/* Content */}
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Điền mẫu đăng ký tại trang web của chúng tôi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Cung cấp liên kết đến kênh/trang cá nhân</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Mô tả chiến lược nội dung của bạn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Chờ phê duyệt (3-5 ngày làm việc)</span>
              </li>
            </ul>
            
            {/* Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button 
                onClick={() => handleOpenJoinPopup('register')}
                className="w-full py-2.5 bg-blue-500 text-white font-bold border border-blue-400/40 hover:bg-blue-600 rounded transition-colors uppercase text-sm tracking-wider"
              >
                Xem Chi Tiết Đăng Ký
              </button>
            </div>
          </div>
        </div>
        
        {/* Step 2: Onboarding */}
        <div className="flex-1 relative group">
          {/* Line connectors for desktop */}
          <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5 bg-gradient-to-l from-purple-500 to-transparent z-10"></div>
          <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-transparent z-10"></div>
          
          <div className="relative bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-500/20 h-full overflow-hidden">
            {/* Background Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Step Number */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold">
              2
            </div>
            
            {/* Icon */}
            <div className="relative z-10 bg-purple-500/10 text-purple-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform">
              <FaRocket className="w-7 h-7" />
            </div>
            
            {/* Title */}
            <h3 className="text-xl text-center text-white font-semibold mb-4 font-rajdhani tracking-wide">
              Khởi Động
            </h3>
            
            {/* Content */}
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Tham gia buổi định hướng trực tuyến</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Nhận bộ công cụ người sáng tạo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Thiết lập quyền truy cập bảng điều khiển</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Kết nối tài khoản thanh toán</span>
              </li>
            </ul>
            
            {/* Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button 
                onClick={() => handleOpenJoinPopup('onboarding')}
                className="w-full py-2.5 bg-purple-500 text-white font-bold border border-purple-400/40 hover:bg-purple-600 rounded transition-colors uppercase text-sm tracking-wider"
              >
                Xem Chi Tiết Khởi Động
              </button>
            </div>
          </div>
        </div>
        
        {/* Step 3: Create Content */}
        <div className="flex-1 relative group">
          {/* Line connector for desktop */}
          <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5 bg-gradient-to-l from-yellow-500 to-transparent z-10"></div>
          
          <div className="relative bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-yellow-500/50 transition-all shadow-lg hover:shadow-yellow-500/20 h-full overflow-hidden">
            {/* Background Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Step Number */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 font-bold">
              3
            </div>
            
            {/* Icon */}
            <div className="relative z-10 bg-yellow-500/10 text-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform">
              <FaPencilAlt className="w-7 h-7" />
            </div>
            
            {/* Title */}
            <h3 className="text-xl text-center text-white font-semibold mb-4 font-rajdhani tracking-wide">
              Sáng Tạo
            </h3>
            
            {/* Content */}
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Lập kế hoạch nội dung hàng tháng</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Sử dụng công cụ và tài nguyên từ bộ công cụ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Đăng và quảng bá nội dung của bạn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Nhận phần thưởng dựa trên thành tích</span>
              </li>
            </ul>
            
            {/* Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button 
                onClick={() => handleOpenJoinPopup('create')}
                className="w-full py-2.5 bg-yellow-500 text-white font-bold border border-yellow-400/40 hover:bg-yellow-600 rounded transition-colors uppercase text-sm tracking-wider"
              >
                Xem Chi Tiết Sáng Tạo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showJoinPopup && (
        <CreatorJoinPopup 
          joinStep={joinStepsData[activeJoinStep]} 
          onClose={() => setShowJoinPopup(false)} 
        />
      )}
    </div>
  );
} 