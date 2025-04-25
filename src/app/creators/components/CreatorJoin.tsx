'use client';

import { FaUserPlus, FaRocket, FaPencilAlt } from 'react-icons/fa';

export default function CreatorJoin() {
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
              <button className="w-full py-2 bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/40 hover:bg-blue-500/30 transition-colors font-rajdhani tracking-wide">
                Đăng Ký Ngay
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
                <span>Kết nối phương thức thanh toán</span>
              </li>
            </ul>
            
            {/* Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button className="w-full py-2 bg-purple-500/20 text-purple-400 rounded-md border border-purple-500/40 hover:bg-purple-500/30 transition-colors font-rajdhani tracking-wide">
                Xem Lịch Định Hướng
              </button>
            </div>
          </div>
        </div>
        
        {/* Step 3: Create */}
        <div className="flex-1 relative group">
          {/* Line connector for desktop */}
          <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5 bg-gradient-to-l from-green-500 to-transparent z-10"></div>
          
          <div className="relative bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-green-500/50 transition-all shadow-lg hover:shadow-green-500/20 h-full overflow-hidden">
            {/* Background Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Step Number */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 font-bold">
              3
            </div>
            
            {/* Icon */}
            <div className="relative z-10 bg-green-500/10 text-green-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform">
              <FaPencilAlt className="w-7 h-7" />
            </div>
            
            {/* Title */}
            <h3 className="text-xl text-center text-white font-semibold mb-4 font-rajdhani tracking-wide">
              Bắt Đầu Sáng Tạo
            </h3>
            
            {/* Content */}
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Tạo nội dung theo hướng dẫn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Gắn thẻ #MSCICreator</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Gửi nội dung để đánh giá</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Nhận thưởng hàng tháng</span>
              </li>
            </ul>
            
            {/* Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button className="w-full py-2 bg-green-500/20 text-green-400 rounded-md border border-green-500/40 hover:bg-green-500/30 transition-colors font-rajdhani tracking-wide">
                Xem Hướng Dẫn Sáng Tạo
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Indicator Dots */}
      <div className="flex justify-center mt-6 gap-1 md:hidden">
        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
        <span className="w-2 h-2 rounded-full bg-purple-400"></span>
        <span className="w-2 h-2 rounded-full bg-green-400"></span>
      </div>
    </div>
  );
} 