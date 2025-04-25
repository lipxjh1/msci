'use client';

import { FaDiscord, FaVideo, FaCalendarAlt } from 'react-icons/fa';

export default function CreatorCommunity() {
  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-8">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CỘNG ĐỒNG NGƯỜI SÁNG TẠO
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Discord Server */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 hover:border-[#5865F2]/50 transition-all shadow-lg hover:shadow-[#5865F2]/20 group overflow-hidden">
          <div className="h-24 bg-[#5865F2]/20 relative overflow-hidden">
            {/* Discord-inspired pattern background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#5865F2]/40 blur-3xl transform -translate-y-32"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#5865F2]/30 blur-3xl transform translate-y-32"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <FaDiscord className="w-16 h-16 text-[#5865F2]/70" />
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl text-white font-semibold mb-4 font-rajdhani tracking-wide">
              Máy Chủ Discord
            </h3>
            
            <div className="space-y-4 text-white/80">
              <p>Kênh riêng dành cho các nhà sáng tạo nội dung để kết nối, chia sẻ và học hỏi lẫn nhau.</p>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#5865F2] rounded-full mt-1.5"></span>
                  <p className="text-white/80">Kênh riêng cho người sáng tạo</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#5865F2] rounded-full mt-1.5"></span>
                  <p className="text-white/80">Cơ hội hợp tác</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#5865F2] rounded-full mt-1.5"></span>
                  <p className="text-white/80">Giao tiếp trực tiếp với nhà phát triển</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#5865F2] rounded-full mt-1.5"></span>
                  <p className="text-white/80">Chia sẻ tài nguyên</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <button className="w-full py-3 bg-[#5865F2]/20 text-[#5865F2] hover:text-white rounded-md border border-[#5865F2]/40 hover:bg-[#5865F2]/30 transition-colors font-rajdhani tracking-wide flex items-center justify-center gap-2">
                <FaDiscord className="w-4 h-4" />
                <span>Tham Gia Discord</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Monthly Meetups */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 hover:border-green-500/50 transition-all shadow-lg hover:shadow-green-500/20 group overflow-hidden">
          <div className="h-24 bg-green-500/20 relative overflow-hidden">
            {/* Pattern background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-green-500/40 blur-3xl transform -translate-y-32"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-green-500/30 blur-3xl transform translate-y-32"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <FaVideo className="w-16 h-16 text-green-500/70" />
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl text-white font-semibold mb-4 font-rajdhani tracking-wide">
              Họp Mặt Hàng Tháng
            </h3>
            
            <div className="space-y-4 text-white/80">
              <p>Buổi họp trực tuyến với đội ngũ M-SCI và cộng đồng người sáng tạo nội dung, chia sẻ cập nhật và phản hồi.</p>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></span>
                  <p className="text-white/80">Buổi gặp gỡ trực tuyến</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></span>
                  <p className="text-white/80">Chia sẻ chiến lược</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></span>
                  <p className="text-white/80">Phản hồi và góp ý</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></span>
                  <p className="text-white/80">Sự kiện kết nối</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <button className="w-full py-3 bg-green-500/20 text-green-500 hover:text-white rounded-md border border-green-500/40 hover:bg-green-500/30 transition-colors font-rajdhani tracking-wide flex items-center justify-center gap-2">
                <FaVideo className="w-4 h-4" />
                <span>Đăng Ký Tham Gia</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Annual Conference */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-500/20 group overflow-hidden">
          <div className="h-24 bg-purple-500/20 relative overflow-hidden">
            {/* Pattern background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-purple-500/40 blur-3xl transform -translate-y-32"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-500/30 blur-3xl transform translate-y-32"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <FaCalendarAlt className="w-16 h-16 text-purple-500/70" />
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl text-white font-semibold mb-4 font-rajdhani tracking-wide">
              Hội Nghị Thường Niên
            </h3>
            
            <div className="space-y-4 text-white/80">
              <p>Sự kiện hàng năm quy tụ các nhà sáng tạo nội dung M-SCI từ khắp nơi trên thế giới.</p>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></span>
                  <p className="text-white/80">Hội nghị trực tiếp</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></span>
                  <p className="text-white/80">Lễ trao giải</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></span>
                  <p className="text-white/80">Công bố lộ trình tương lai</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></span>
                  <p className="text-white/80">Tiệc giao lưu</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <button className="w-full py-3 bg-purple-500/20 text-purple-500 hover:text-white rounded-md border border-purple-500/40 hover:bg-purple-500/30 transition-colors font-rajdhani tracking-wide flex items-center justify-center gap-2">
                <FaCalendarAlt className="w-4 h-4" />
                <span>Tìm Hiểu Thêm</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-[var(--accent-blue-bright)]/10 border border-[var(--accent-blue-bright)]/20 rounded-lg">
        <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
          <div className="md:w-3/4">
            <h3 className="text-lg font-semibold text-white mb-2">Tham gia cộng đồng người sáng tạo M-SCI ngay hôm nay!</h3>
            <p className="text-white/70">Kết nối với hàng nghìn nhà sáng tạo nội dung và chia sẻ niềm đam mê của bạn với cộng đồng.</p>
          </div>
          <div className="md:w-1/4 flex justify-start md:justify-end">
            <button className="px-6 py-3 bg-[var(--accent-blue-bright)] text-white rounded-md hover:bg-[var(--accent-blue-bright)]/90 transition-colors font-rajdhani tracking-wide">
              Xem Lịch Định Hướng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 