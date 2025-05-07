import React from 'react';

export const ToDuKienSection = (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg space-y-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-2 font-rajdhani">Thông Tin Cơ Bản</h3>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Tên Game</h4>
            <p className="text-white/70">M-SCI: Modern Special Combat Intelligence</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Nhà Phát Triển</h4>
            <p className="text-white/70">Infinity Games Studio</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Nhà Phát Hành</h4>
            <p className="text-white/70">TechVerse Interactive</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Ngày Phát Hành</h4>
            <p className="text-white/70">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-medium">Early Access:</span> Q4 2023<br />
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-medium">Bản Chính Thức:</span> Q2 2024
            </p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Nền Tảng</h4>
            <p className="text-white/70">
              iOS, Android, Windows, Mac, Web (HTML5)
            </p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Thể Loại</h4>
            <p className="text-white/70">
              RPG, Tactical, Strategy, Gacha, Turn-based Combat
            </p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Ngôn Ngữ Hỗ Trợ</h4>
            <p className="text-white/70">
              Tiếng Việt, Tiếng Anh, Tiếng Trung, Tiếng Nhật, Tiếng Hàn
            </p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">ESRB Rating</h4>
            <p className="text-white/70">
              Teen (T) - Bạo lực vừa phải, ngôn ngữ nhẹ, chủ đề gợi ý
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg space-y-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-2 font-rajdhani">Thông Số Kỹ Thuật</h3>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Yêu Cầu Hệ Thống (PC)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-cyan-400 font-medium">Tối Thiểu:</p>
                <ul className="space-y-1 text-white/70 text-sm">
                  <li>• OS: Windows 10 (64-bit)</li>
                  <li>• CPU: Intel Core i5-7500 / AMD Ryzen 3 1300X</li>
                  <li>• RAM: 8GB</li>
                  <li>• GPU: NVIDIA GTX 1050 / AMD RX 560</li>
                  <li>• Storage: 10GB</li>
                </ul>
              </div>
              <div>
                <p className="text-cyan-400 font-medium">Đề Xuất:</p>
                <ul className="space-y-1 text-white/70 text-sm">
                  <li>• OS: Windows 10/11 (64-bit)</li>
                  <li>• CPU: Intel Core i7-8700 / AMD Ryzen 5 3600</li>
                  <li>• RAM: 16GB</li>
                  <li>• GPU: NVIDIA GTX 1660 / AMD RX 5600 XT</li>
                  <li>• Storage: 10GB SSD</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Yêu Cầu Hệ Thống (Mobile)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-cyan-400 font-medium">iOS:</p>
                <ul className="space-y-1 text-white/70 text-sm">
                  <li>• iOS 13.0 trở lên</li>
                  <li>• iPhone 8 trở lên</li>
                  <li>• iPad Gen 6 trở lên</li>
                  <li>• 4GB RAM trở lên</li>
                  <li>• 3GB dung lượng trống</li>
                </ul>
              </div>
              <div>
                <p className="text-cyan-400 font-medium">Android:</p>
                <ul className="space-y-1 text-white/70 text-sm">
                  <li>• Android 8.0 trở lên</li>
                  <li>• CPU: Snapdragon 730 / Dimensity 800</li>
                  <li>• 4GB RAM trở lên</li>
                  <li>• Adreno 618 / Mali-G57 MC4 trở lên</li>
                  <li>• 3GB dung lượng trống</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Đặc Điểm Kỹ Thuật</h4>
            <ul className="space-y-1 text-white/70">
              <li>• Engine: Unity 2022.2</li>
              <li>• Đồ Họa: 3D Cel-shaded + 2D Spine Animation</li>
              <li>• Resolution: Hỗ trợ tối đa 4K (PC) / Dynamic Resolution (Mobile)</li>
              <li>• Framerate: 30-144fps (PC) / 30-60fps (Mobile)</li>
              <li>• Connectivity: Requires internet connection</li>
              <li>• Backend: AWS, Firebase, Custom Server</li>
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Tính Năng Online</h4>
            <ul className="space-y-1 text-white/70">
              <li>• PvP Arena (1v1, 2v2, 4v4)</li>
              <li>• Co-op Raids (4-12 người chơi)</li>
              <li>• Guild Activities</li>
              <li>• Global Events</li>
              <li>• Leaderboards</li>
              <li>• Cross-platform Gameplay</li>
              <li>• Cross-save between devices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Điểm Nổi Bật</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-white">150+ Nhân Vật</h4>
          </div>
          <p className="text-white/70 leading-relaxed">
            Hơn 150 nhân vật đa dạng thuộc 6 phe phái khác nhau, mỗi nhân vật đều có câu chuyện và kỹ năng riêng biệt
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-white">Hệ Thống Chiến Đấu Chiến Thuật</h4>
          </div>
          <p className="text-white/70 leading-relaxed">
            Hệ thống chiến đấu theo lượt với yếu tố chiến thuật sâu, đòi hỏi người chơi phải suy nghĩ và lập chiến lược
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-white">Cross-Platform</h4>
          </div>
          <p className="text-white/70 leading-relaxed">
            Chơi trên mọi thiết bị với tính năng đồng bộ hóa tiến trình, cho phép trải nghiệm mượt mà giữa các nền tảng
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-white">Hệ Thống Kỹ Năng Phong Phú</h4>
          </div>
          <p className="text-white/70 leading-relaxed">
            Hơn 500 kỹ năng độc đáo với các hiệu ứng và hoạt ảnh ấn tượng, tạo nên trải nghiệm chiến đấu đa dạng
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-white">Đa Ngôn Ngữ</h4>
          </div>
          <p className="text-white/70 leading-relaxed">
            Hỗ trợ 5 ngôn ngữ phổ biến tại khu vực Châu Á, giúp tiếp cận nhiều người chơi trên toàn thế giới
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-white">Cập Nhật Thường Xuyên</h4>
          </div>
          <p className="text-white/70 leading-relaxed">
            Thêm nội dung mới hàng tháng, bao gồm nhân vật, trang bị, cốt truyện và sự kiện giới hạn thời gian
          </p>
        </div>
      </div>
    </div>
    
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Thông Tin Tài Chính</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <h4 className="text-lg font-medium text-white mb-3">Mô Hình Kinh Doanh</h4>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Free-to-play với in-app purchases</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Gacha system với tỷ lệ minh bạch</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Battle Pass hàng tháng</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>NFT và token cho người chơi (tùy chọn)</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <h4 className="text-lg font-medium text-white mb-3">Đầu Tư & Tài Trợ</h4>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Vòng gọi vốn Series A: $12M</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Các nhà đầu tư: Galaxy Interactive, Bitkraft, Makers Fund</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Strategic Partners: VNG, SoftBank</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Tổng vốn đầu tư: $20M</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <h4 className="text-lg font-medium text-white mb-3">Dự Báo Thị Trường</h4>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Mục tiêu 5 triệu người dùng trong năm đầu</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>ARPU dự kiến: $15-20</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Thị trường chính: SEA, Đông Á, Bắc Mỹ</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Doanh thu dự kiến năm đầu: $50-75M</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
); 