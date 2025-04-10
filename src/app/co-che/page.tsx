import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import Image from 'next/image';

export const metadata = {
  title: 'Cơ Chế Game | Overwatch Clone',
  description: 'Tìm hiểu về các cơ chế và quy tắc của game Overwatch Clone',
};

export default function CoChePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      <ThanhDieuHuongResponsive />
      
      {/* Hero section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        {/* Background image with parallax effect */}
        <div className="absolute inset-0">
          <Image 
            src="/images/overwatch_bg_2.jpg"
            alt="Cơ Chế Game"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a141e]/70 via-transparent to-[#0a141e] z-10"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 z-10">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50 animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-200"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse delay-300"></div>
          </div>

          {/* Add scanline effect */}
          <div className="absolute inset-0 scanline"></div>
        </div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-orbitron text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
                <span className="relative inline-block">
                   GAME PLAY
                  <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h1>
              <p className="font-rajdhani text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in">
                Tìm hiểu về các cơ chế, chế độ chơi và quy tắc của Overwatch
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative bottom curve */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform rotate-1 scale-110 z-20"></div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform -rotate-1 scale-110 z-20"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 pt-16 pb-20 relative z-30">
        <div className="max-w-7xl mx-auto">
          {/* Giới thiệu */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="w-full md:w-1/2">
                <h2 className="font-orbitron text-3xl font-bold text-white mb-6 relative inline-block">
                  Tổng Quan Cơ Chế
                  <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
                </h2>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  Overwatch là một game bắn súng đội nhóm 6v6 với nhiều anh hùng có khả năng độc đáo. Mỗi anh hùng thuộc một trong ba vai trò: <span className="text-[#F44336] font-medium">Tank</span>, <span className="text-[#3f51b5] font-medium">DPS</span>, hoặc <span className="text-[#4CAF50] font-medium">Support</span>.
                </p>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  Mục tiêu chính của game là làm việc như một đội để hoàn thành các mục tiêu khác nhau như chiếm điểm, hộ tống payload, hoặc kết hợp cả hai. Mỗi anh hùng có các kỹ năng cơ bản, khả năng đặc biệt và Ultimate riêng.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">6v6</div>
                    <div className="text-white/60 text-sm">Đội hình</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">30+</div>
                    <div className="text-white/60 text-sm">Anh hùng</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">20+</div>
                    <div className="text-white/60 text-sm">Bản đồ</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-xl overflow-hidden border border-white/5 shadow-xl">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Cơ chế game"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a141e] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white font-bold text-lg mb-2">Đội hình Overwatch</div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 px-3 bg-[#F44336]/20 backdrop-blur-sm rounded-md border border-[#F44336]/30">
                        <span className="text-[#F44336] font-medium text-sm">2 Tank</span>
                      </div>
                      <div className="p-2 px-3 bg-[#3f51b5]/20 backdrop-blur-sm rounded-md border border-[#3f51b5]/30">
                        <span className="text-[#3f51b5] font-medium text-sm">2 DPS</span>
                      </div>
                      <div className="p-2 px-3 bg-[#4CAF50]/20 backdrop-blur-sm rounded-md border border-[#4CAF50]/30">
                        <span className="text-[#4CAF50] font-medium text-sm">2 Support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Các chế độ chơi */}
          <div className="mb-16">
            <h2 className="font-orbitron text-3xl font-bold text-white mb-8 relative inline-block">
              Chế Độ Chơi
              <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Play */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Quick Play"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#F44336]/30 backdrop-blur-sm rounded-md border border-[#F44336]/30">
                    <span className="text-white font-medium text-sm">Phổ biến</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-orbitron text-xl font-bold text-white mb-2 group-hover:text-[#F44336] transition-colors">
                    Quick Play
                  </h3>
                  <p className="text-white/70 mb-4">
                    Trải nghiệm nhanh chóng với các trận đấu thông thường. Hoàn hảo cho người mới và những ai muốn chơi không căng thẳng.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">Thời gian chờ: ~2 phút</div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">6v6</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Competitive */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Competitive"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#FFD700]/30 backdrop-blur-sm rounded-md border border-[#FFD700]/30">
                    <span className="text-white font-medium text-sm">Xếp hạng</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-orbitron text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                    Competitive
                  </h3>
                  <p className="text-white/70 mb-4">
                    Chế độ nghiêm túc với hệ thống xếp hạng và điểm SR. Chiến đấu để leo thang từ Bronze đến Grandmaster.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">Thời gian chờ: ~3-5 phút</div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">6v6</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Arcade */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Arcade"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#9C27B0]/30 backdrop-blur-sm rounded-md border border-[#9C27B0]/30">
                    <span className="text-white font-medium text-sm">Giải trí</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-orbitron text-xl font-bold text-white mb-2 group-hover:text-[#9C27B0] transition-colors">
                    Arcade
                  </h3>
                  <p className="text-white/70 mb-4">
                    Các chế độ chơi thú vị và độc đáo như Deathmatch, Mystery Heroes, và nhiều minigame khác.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">Thời gian chờ: ~1-3 phút</div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">Đa dạng</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Custom Games */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Custom Games"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#2196F3]/30 backdrop-blur-sm rounded-md border border-[#2196F3]/30">
                    <span className="text-white font-medium text-sm">Tùy chỉnh</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-orbitron text-xl font-bold text-white mb-2 group-hover:text-[#2196F3] transition-colors">
                    Custom Games
                  </h3>
                  <p className="text-white/70 mb-4">
                    Tạo trận đấu riêng với luật chơi tùy chỉnh, lựa chọn bản đồ và thiết lập các quy tắc đặc biệt.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">Tự quyết định</div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">Tùy chọn</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Seasonal Events */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Seasonal Events"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#4CAF50]/30 backdrop-blur-sm rounded-md border border-[#4CAF50]/30">
                    <span className="text-white font-medium text-sm">Giới hạn</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-orbitron text-xl font-bold text-white mb-2 group-hover:text-[#4CAF50] transition-colors">
                    Seasonal Events
                  </h3>
                  <p className="text-white/70 mb-4">
                    Sự kiện theo mùa với các chế độ chơi đặc biệt, skin và nội dung giới hạn thời gian.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">Thời gian chờ: ~2 phút</div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">Theo mùa</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Workshop */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Workshop"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#FF9800]/30 backdrop-blur-sm rounded-md border border-[#FF9800]/30">
                    <span className="text-white font-medium text-sm">Sáng tạo</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-orbitron text-xl font-bold text-white mb-2 group-hover:text-[#FF9800] transition-colors">
                    Workshop
                  </h3>
                  <p className="text-white/70 mb-4">
                    Sử dụng công cụ lập trình để tạo ra các chế độ chơi hoàn toàn mới với cơ chế độc đáo.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">Tùy chỉnh hoàn toàn</div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">Không giới hạn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Các vai trò */}
          <div className="mb-16">
            <h2 className="font-orbitron text-3xl font-bold text-white mb-8 relative inline-block">
              Vai Trò Trong Game
              <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tank */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-[#F44336]/20 transition-all duration-300 group">
                <div className="relative h-48">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Tank Role"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 right-4 p-2 bg-[#F44336]/30 backdrop-blur-sm rounded-full h-12 w-12 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v3m0 0v3m0-3h3m-3 0H9" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-orbitron text-2xl font-bold text-[#F44336] mb-4">
                    Tank
                  </h3>
                  <p className="text-white/70 mb-6">
                    Các Tank có nhiều máu và khả năng phòng thủ, bảo vệ đồng đội và tạo không gian an toàn. Họ dẫn đầu đội hình và kiểm soát chiến trường.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#F44336]"></div>
                      <span className="text-white/80">Máu cao</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#F44336]"></div>
                      <span className="text-white/80">Khả năng che chắn</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#F44336]"></div>
                      <span className="text-white/80">Khả năng khống chế</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* DPS */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-[#3f51b5]/20 transition-all duration-300 group">
                <div className="relative h-48">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="DPS Role"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 right-4 p-2 bg-[#3f51b5]/30 backdrop-blur-sm rounded-full h-12 w-12 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-orbitron text-2xl font-bold text-[#3f51b5] mb-4">
                    DPS
                  </h3>
                  <p className="text-white/70 mb-6">
                    Các DPS (Damage Per Second) tập trung vào việc gây sát thương lớn và loại bỏ đối thủ quan trọng. Họ có khả năng cơ động và tiềm năng sát thương cao.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#3f51b5]"></div>
                      <span className="text-white/80">Sát thương cao</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#3f51b5]"></div>
                      <span className="text-white/80">Khả năng cơ động</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#3f51b5]"></div>
                      <span className="text-white/80">Khả năng đột phá</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Support */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-[#4CAF50]/20 transition-all duration-300 group">
                <div className="relative h-48">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Support Role"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 right-4 p-2 bg-[#4CAF50]/30 backdrop-blur-sm rounded-full h-12 w-12 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-orbitron text-2xl font-bold text-[#4CAF50] mb-4">
                    Support
                  </h3>
                  <p className="text-white/70 mb-6">
                    Các Support (Hỗ trợ) chữa trị và tăng cường sức mạnh cho đồng đội. Họ có khả năng hồi phục, buff và đôi khi cả debuff đối thủ.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#4CAF50]"></div>
                      <span className="text-white/80">Khả năng hồi phục</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#4CAF50]"></div>
                      <span className="text-white/80">Buff/debuff</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#4CAF50]"></div>
                      <span className="text-white/80">Ultimate hỗ trợ đội</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Các loại bản đồ */}
          <div className="mb-16">
            <h2 className="font-orbitron text-3xl font-bold text-white mb-8 relative inline-block">
              Các Loại Bản Đồ
              <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Assault */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-[#F44336]/10 hover:border-white/10 transition-all duration-300 group">
                <div className="relative h-40">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Assault Map"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                </div>
                <div className="p-5">
                  <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-[#F44336] transition-colors">
                    Assault (2CP)
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Đội tấn công cố gắng chiếm hai điểm liên tiếp, trong khi đội phòng thủ ngăn chặn.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Ví dụ: Hanamura, Volskaya</span>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-xs">2 điểm</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Escort */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-[#3f51b5]/10 hover:border-white/10 transition-all duration-300 group">
                <div className="relative h-40">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Escort Map"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                </div>
                <div className="p-5">
                  <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-[#3f51b5] transition-colors">
                    Escort (Payload)
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Đội tấn công đẩy xe chở hàng đến đích, đội phòng thủ cản trở tiến độ.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Ví dụ: Route 66, Dorado</span>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-xs">3 checkpoint</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hybrid */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-[#9C27B0]/10 hover:border-white/10 transition-all duration-300 group">
                <div className="relative h-40">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Hybrid Map"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                </div>
                <div className="p-5">
                  <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-[#9C27B0] transition-colors">
                    Hybrid
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Kết hợp Assault và Escort - đầu tiên chiếm điểm, sau đó đẩy xe hàng.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Ví dụ: Eichenwalde, King&apos;s Row</span>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-xs">1CP + payload</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Control */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-[#2196F3]/10 hover:border-white/10 transition-all duration-300 group">
                <div className="relative h-40">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Control Map"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                </div>
                <div className="p-5">
                  <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-[#2196F3] transition-colors">
                    Control (KOTH)
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Cả hai đội cạnh tranh để chiếm và giữ một điểm trung tâm duy nhất, đấu theo format Bo3.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Ví dụ: Ilios, Nepal</span>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-xs">Bo3 rounds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer section */}
          <div className="mt-16 bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-8 shadow-lg">
            <div className="text-center">
              <h2 className="font-orbitron text-2xl font-bold text-white mb-4">
                Sẵn sàng tham gia trận đấu?
              </h2>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Bây giờ bạn đã hiểu các cơ chế cơ bản của Overwatch, hãy tham gia vào trận đấu và trải nghiệm game!
              </p>
              <button className="px-8 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-[#F44336] to-[#e53935] hover:from-[#e53935] hover:to-[#F44336] transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/30">
                Chơi Ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 