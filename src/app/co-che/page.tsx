import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";
import Image from "next/image";

export const metadata = {
  title: "Cơ Chế Game | Overwatch Clone",
  description: "Tìm hiểu về các cơ chế và quy tắc của game Overwatch Clone",
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
                TÌM HIỂU VỀ CÁC CƠ CHẾ, CHẾ ĐỘ CHƠI VÀ QUY TẮC CỦA M-SCI
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
                <h2 className=" text-3xl font-bold text-white mb-6 relative inline-block">
                  Tổng Quan Cơ Chế
                  <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
                </h2>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  M-SCI là một game hành động chiến thuật khoa học viễn tưởng
                  với các trận chiến nhanh 30 giây. Người chơi điều khiển biệt
                  đội 3 anh hùng thuộc ba class khác nhau:{" "}
                  <span className="text-[#F44336] font-medium">Gunner</span>,{" "}
                  <span className="text-[#3f51b5] font-medium">Sniper</span>,
                  hoặc{" "}
                  <span className="text-[#4CAF50] font-medium"> Rocket</span>.
                </p>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  Mục tiêu chính của game là làm việc như một đội để tiêu diệt
                  lực lượng robot của X-Corp và hoàn thành các nhiệm vụ. Mỗi anh
                  hùng có các kỹ năng cơ bản, khả năng đặc biệt và Kỹ năng Tối
                  thượng riêng biệt giúp quyết định chiến thắng trong những thời
                  khắc quan trọng.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      3v3
                    </div>
                    <div className="text-white/60 text-sm">Đội hình</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      30+
                    </div>
                    <div className="text-white/60 text-sm">Anh hùng</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      20+
                    </div>
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
                    <div className="text-white font-bold text-lg mb-2">
                      Đội hình Overwatch
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 px-3 bg-[#F44336]/20 backdrop-blur-sm rounded-md border border-[#F44336]/30">
                        <span className="text-[#F44336] font-medium text-sm">
                          Gunner
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#3f51b5]/20 backdrop-blur-sm rounded-md border border-[#3f51b5]/30">
                        <span className="text-[#3f51b5] font-medium text-sm">
                          Sniper
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#4CAF50]/20 backdrop-blur-sm rounded-md border border-[#4CAF50]/30">
                        <span className="text-[#4CAF50] font-medium text-sm">
                          Rocket
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Các chế độ chơi */}
          <div className="mb-16">
            <h2 className=" text-3xl font-bold text-white mb-8 relative inline-block">
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
                    <span className="text-white font-medium text-sm">
                      Phổ biến
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-xl font-bold text-white mb-2 group-hover:text-[#F44336] transition-colors">
                    Chiến Dịch
                  </h3>
                  <p className="text-white/70 mb-4">
                    Trải nghiệm cốt truyện M-SCI qua 100 màn chơi kịch tính chia
                    thành 5 khu vực. Mỗi trận đấu kéo dài 30 giây, người chơi
                    cần tiêu diệt toàn bộ kẻ địch trước khi hết thời gian.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      Thời gian chờ: ~2 giây 3v3
                    </div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">3v3</span>
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
                    <span className="text-white font-medium text-sm">
                      Xếp hạng
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                    Xếp hạng
                  </h3>
                  <p className="text-white/70 mb-4">
                    Chế độ cạnh tranh với bảng xếp hạng điểm hoạt động hàng
                    ngày. Thu thập điểm qua nhiệm vụ và tiêu diệt boss để leo
                    hạng từ Tân binh đến Huyền Thoại.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      Thời gian chờ: ~3-5 giây 3v3
                    </div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">3v3</span>
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
                    <span className="text-white font-medium text-sm">
                      Giải trí
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-xl font-bold text-white mb-2 group-hover:text-[#9C27B0] transition-colors">
                    Sự Kiện
                  </h3>
                  <p className="text-white/70 mb-4">
                    Các sự kiện hấp dẫn như Boss Thế Giới, Elite Boss và nhiều
                    hoạt động giới hạn thời gian. Tham gia cùng cộng đồng để
                    nhận phần thưởng độc quyền.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      Thời gian chờ: ~1-3 phút
                    </div>
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
                    <span className="text-white font-medium text-sm">
                      Tùy chỉnh
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-xl font-bold text-white mb-2 group-hover:text-[#2196F3] transition-colors">
                    Guild War
                  </h3>
                  <p className="text-white/70 mb-4">
                    Tham gia cùng bang hội trong các cuộc chiến Guild War hàng
                    ngày, xâm lược bang hội khác hoặc tuyên chiến đặt cược để
                    giành vinh quang và phần thưởng.
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
                    <span className="text-white font-medium text-sm">
                      Giới hạn
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-xl font-bold text-white mb-2 group-hover:text-[#4CAF50] transition-colors">
                    Sự Kiện Theo Mùa
                  </h3>
                  <p className="text-white/70 mb-4">
                    Các sự kiện theo mùa với chế độ chơi đặc biệt, skin giới hạn
                    và nội dung cốt truyện mới. Tham gia để nhận vật phẩm hiếm
                    có thời hạn.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      Thời gian chờ: ~2 phút
                    </div>
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
                    <span className="text-white font-medium text-sm">
                      Sáng tạo
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-xl font-bold text-white mb-2 group-hover:text-[#FF9800] transition-colors">
                    Workshop
                  </h3>
                  <p className="text-white/70 mb-4">
                    Sử dụng Center Market để giao dịch nhân vật, vật phẩm và tài
                    nguyên với người chơi khác. Xây dựng bộ sưu tập và kinh
                    doanh trong thế giới M-SCI.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      Tùy chỉnh hoàn toàn
                    </div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">
                        Không giới hạn
                      </span>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v3m0 0v3m0-3h3m-3 0H9"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-2xl font-bold text-[#F44336] mb-4">
                    Lính Súng Máy (Gunner)
                  </h3>
                  <p className="text-white/70 mb-6">
                    Các Gunner trang bị súng máy với tốc độ bắn cực cao, chuyên
                    gây sát thương dồn dập ở tầm gần và trung. Họ là lực lượng
                    quét sạch nhanh chóng nhiều mục tiêu, nhưng kém hiệu quả khi
                    đối đầu Drone và kẻ địch có lá chắn.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#F44336]"></div>
                      <span className="text-white/80">Tốc độ bắn cực cao</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#F44336]"></div>
                      <span className="text-white/80">
                        {" "}
                        Sát thương mạnh tầm gần
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#F44336]"></div>
                      <span className="text-white/80">
                        {" "}
                        Khả năng quét đám đông
                      </span>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-2xl font-bold text-[#3f51b5] mb-4">
                    Tay Bắn Tỉa (Sniper)
                  </h3>
                  <p className="text-white/70 mb-6">
                    Các Sniper sử dụng súng ngắm tầm xa, bắn chậm nhưng sát
                    thương cực lớn và chính xác. Họ là khắc tinh của các Drone
                    bay, có thể tiêu diệt mục tiêu từ khoảng cách an toàn nhưng
                    yếu trong cận chiến.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#3f51b5]"></div>
                      <span className="text-white/80">
                        Sát thương đơn mục tiêu cao
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#3f51b5]"></div>
                      <span className="text-white/80">
                        Khả năng tiêu diệt Drone (+1000%)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#3f51b5]"></div>
                      <span className="text-white/80">
                        Độ chính xác tuyệt đối
                      </span>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-2xl font-bold text-[#4CAF50] mb-4">
                    Pháo Thủ (Rocket)
                  </h3>
                  <p className="text-white/70 mb-6">
                    Các Rocket sử dụng vũ khí phóng tên lửa hoặc đại bác, gây
                    sát thương diện rộng mạnh mẽ. Họ là chuyên gia phá vỡ lá
                    chắn của kẻ địch, nhưng có tốc độ bắn chậm nhất trong ba
                    class.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#4CAF50]"></div>
                      <span className="text-white/80">
                        Sát thương diện rộng
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#4CAF50]"></div>
                      <span className="text-white/80">
                        Khả năng phá Shield (+1000%)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#4CAF50]"></div>
                      <span className="text-white/80">
                        {" "}
                        Hiệu quả với kẻ địch đông đúc
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Các loại bản đồ */}
          <div className="mb-16">
            <h2 className=" text-3xl font-bold text-white mb-8 relative inline-block">
              Các Khu Vực Chiến Đấu
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
                  <h3 className=" text-xl font-bold text-white mb-3 group-hover:text-[#F44336] transition-colors">
                    Trái Đất (Màn 1-20)
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Khu vực khởi đầu với các robot cơ bản dễ dàng. Người chơi
                    làm quen với cơ chế game và đối đầu với Drone đầu tiên xuất
                    hiện từ màn 4-5. Hoàn thành khu vực này để mở đường rời hành
                    tinh.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">
                      Ví dụ: Thành phố, Cơ sở tập luyện
                    </span>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-xs">20 màn</span>
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
                  <h3 className=" text-xl font-bold text-white mb-3 group-hover:text-[#3f51b5] transition-colors">
                    Ngoài Không Gian (Màn 21-40)
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Bối cảnh chuyển ra vũ trụ với các kẻ địch mạnh hơn, nhiều
                    robot trang bị lá chắn năng lượng và Drone dày đặc. Đòi hỏi
                    kỹ năng núp bắn và ưu tiên mục tiêu tốt hơn.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">
                      Ví dụ: Trạm vũ trụ, Phi thuyền
                    </span>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-xs">20 màn</span>
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
                  <h3 className=" text-xl font-bold text-white mb-3 group-hover:text-[#9C27B0] transition-colors">
                    Sao Hỏa (Màn 41-60)
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Chiến trường trên hành tinh đỏ với kẻ địch có HP và Shield
                    cao vượt trội. Từ khu vực này có cơ hội nhận nhân vật cấp A
                    (Epic) khi vượt màn, tỷ lệ khoảng 1-3%.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">
                      Ví dụ: Sa mạc đỏ, Căn cứ khảo sát
                    </span>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-xs">20 màn</span>
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
                  <h3 className=" text-xl font-bold text-white mb-3 group-hover:text-[#2196F3] transition-colors">
                    Trung Tâm: The Ascended(Màn 61-80)
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Căn cứ tối tân với kẻ thù hùng hậu. Nhân vật cấp S
                    (Legendary) bắt đầu xuất hiện ngẫu nhiên làm phần thưởng, dù
                    xác suất rất nhỏ (0.5-1%). Đòi hỏi đội hình đã phát triển
                    mạnh.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">
                      Ví dụ: Phòng thí nghiệm, Khu điều khiển{" "}
                    </span>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-xs">20 màn</span>
                    </div>
                  </div>
                </div>
              </div>

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
                  <h3 className=" text-xl font-bold text-white mb-3 group-hover:text-[#2196F3] transition-colors">
                    Tổng Hành Dinh X-Corp (Màn 81-100)
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Trận chiến cuối cùng tại sào huyệt của tập đoàn X-Corp với
                    độ khó tối đa. Mỗi màn có thể lên tới 10 robot và 8 Drone
                    cùng lúc. Tỷ lệ rơi nhân vật cấp S tăng nhẹ (tối đa khoảng
                    4% ở các màn 96-100).
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">
                      Ví dụ: Trung tâm chỉ huy, Phòng thí nghiệm tối mật{" "}
                    </span>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-xs">20 màn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer section */}
          <div className="mt-16 bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-8 shadow-lg">
            <div className="text-center">
              <h2 className=" text-2xl font-bold text-white mb-4">
                Sẵn sàng chiến đấu vì nhân loại?
              </h2>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Bây giờ bạn đã hiểu các lớp nhân vật và khu vực chiến đấu của
                M-SCI, hãy chiêu mộ anh hùng, tham gia vào trận chiến 30 giây và
                ngăn chặn The Assended!
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
