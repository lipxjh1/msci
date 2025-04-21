import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Liên Hệ | Overwatch Clone",
  description:
    "CONTACT US THAM GIA CỘNG ĐỒNG M-SCI HOẶC LIÊN HỆ ĐỘI NGŨ HỖ TRỢ",
};

export default function LienHePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      <ThanhDieuHuongResponsive />

      {/* Hero section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        {/* Background image with parallax effect */}
        <div className="absolute inset-0">
          <Image
            src="/images/overwatch_bg_2.jpg"
            alt="Liên Hệ"
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
            <div className="max-w-3xl mx-auto text-center mt-10">
              <h1 className="font-orbitron text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
                <span className="relative inline-block">
                  CONTACT US
                  <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h1>
              <p className="font-rajdhani text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in">
                THAM GIA CỘNG ĐỒNG M-SCI HOẶC LIÊN HỆ ĐỘI NGŨ HỖ TRỢ
              </p>
            </div>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform rotate-1 scale-110 z-20"></div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform -rotate-1 scale-110 z-20"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-10 pb-20 relative z-30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact form */}
            <div className="bg-[#1a2634]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-xl">
              <h2 className="font-bai-jamjuree text-2xl font-bold text-white mb-6 relative inline-block">
                Gửi tin nhắn cho chúng tôi
                <div className="absolute -bottom-2 left-0 h-1 w-12 bg-gradient-to-r from-[#F44336] to-transparent"></div>
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white/80 text-sm font-medium mb-2"
                    >
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-[#0f1923] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F44336]/50 focus:border-transparent text-white"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white/80 text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-[#0f1923] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F44336]/50 focus:border-transparent text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-white/80 text-sm font-medium mb-2"
                  >
                    Chủ đề
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-[#0f1923] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F44336]/50 focus:border-transparent text-white"
                    placeholder="Nhập chủ đề"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white/80 text-sm font-medium mb-2"
                  >
                    Tin nhắn
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-[#0f1923] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F44336]/50 focus:border-transparent text-white resize-none"
                    placeholder="Nhập nội dung tin nhắn..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 font-rajdhani font-bold tracking-wider text-shadow-sm button-cyber clip-hexagon hexagon-border text-white"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>

            {/* Contact information */}
            <div className="space-y-8">
              {/* Map or image */}
              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/5">
                <Image
                  src="/images/overwatch_bg_2.jpg"
                  alt="Bản đồ"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a141e]/90"></div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <div className="h-3 w-3 bg-[#F44336] rounded-full animate-ping-slow"></div>
                  <span className="text-white text-sm font-medium">
                    Trụ sở chính
                  </span>
                </div>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Address */}
                <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-5 shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-[#F44336]/10 border border-[#F44336]/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#F44336]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Địa chỉ</h3>
                      <p className="text-white/70 text-sm">
                      10 Collyer Quay Ocean Financial Centre 
                        <br />
                        Singapore 049315 
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-5 shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-blue-500/10 border border-blue-500/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Email</h3>
                      <p className="text-white/70 text-sm">
                      support@m-sci.net
                    
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-5 shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-green-500/10 border border-green-500/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">
                        Điện thoại
                      </h3>
                      <p className="text-white/70 text-sm">
                      +65 6225 8480 
                        <br />
                        +65 9843 6721 
                      </p>
                    </div>
                  </div>
                </div>

                {/* Working hours */}
                <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-5 shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">
                        Giờ làm việc
                      </h3>
                      <p className="text-white/70 text-sm">
                      Thứ hai - Thứ sáu: 9:00 - 18:00 
                        <br />
                        Thứ bảy: 10:00 - 15:00 
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social media */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
                <h3 className="font-medium text-white mb-4">
                  Kết nối với chúng tôi
                </h3>
                <div className="flex items-center space-x-4">
                  <Link
                    href="#"
                    className="p-3 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="p-3 rounded-full bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="p-3 rounded-full bg-[#FC3F93]/10 border border-[#FC3F93]/20 text-[#FC3F93] hover:bg-[#FC3F93]/20 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="p-3 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/20 text-[#FF0000] hover:bg-[#FF0000]/20 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="p-3 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 pb-20 relative z-30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-3xl font-bold text-white mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-white/70">
            Các câu hỏi thường gặp về game M-SCI
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ items */}
            <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-white text-lg mb-2">
              M-SCI là gì?
              </h3>
              <p className="text-white/70">
              M-SCI là game hành động chiến thuật khoa học viễn tưởng lấy bối cảnh năm 2049, 
              nơi người chơi tham gia lực lượng M-SCI chống lại các thế lực ngoài hành tinh The Assended và đội quân robot.
               Bạn sẽ điều khiển đội hình 3 anh hùng thuộc 3 class khác nhau (Gunner, Sniper, Rocket) trong các trận chiến kịch tính 30 giây
              </p>
            </div>

            <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-white text-lg mb-2">
                Làm thế nào để tôi có thể tham gia cộng đồng?
              </h3>
              <p className="text-white/70">
              Bạn có thể tham gia cộng đồng M-SCI bằng cách tham gia các kênh Discord/Telegram/Facebook chính thức của game. 
              Tại đây, hàng chục ngàn chiến hữu đang chờ đón bạn, cùng chia sẻ mẹo chơi, chiến thuật và tham gia các sự kiện cộng đồng hấp dẫn.
              </p>
            </div>

            <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-white text-lg mb-2">
                Làm thế nào để báo cáo lỗi hoặc đề xuất tính năng mới?
              </h3>
              <p className="text-white/70">
              Bạn có thể sử dụng mục <span> TRỢ GIÚP </span>  trong game hoặc gửi email trực tiếp đến support@msci-game.com với chi tiết về lỗi hoặc tính năng bạn muốn đề xuất.
               Đội ngũ GM và mod luôn túc trực 24/7 để hỗ trợ bạn. 
               Nếu phát hiện lỗi, bạn sẽ được thưởng quà cảm ơn!
              </p>
            </div>

            <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-white text-lg mb-2">
                Dự án này có tính phí không?
              </h3>
              <p className="text-white/70">
              M-SCI là game miễn phí, bạn có thể tải và chơi mà không mất phí. Game có các gói nạp tùy chọn như Battle Pass hay skin đẹp, nhưng bạn hoàn toàn có thể đạt được mọi nhân vật và vật phẩm quý chỉ bằng cách chơi chăm chỉ. 
              M-SCI tự hào không pay-to-win - nơi kỹ năng và nỗ lực của bạn quyết định tất cả!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-[#F44336]/20 to-[#1a2634] py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-orbitron text-3xl font-bold text-white mb-4">
              Đăng ký nhận thông tin
            </h2>
            <p className="text-white/70 mb-8">
            Nhận thông báo về sự kiện, nhân vật mới, giftcode và tin tức M-SCI mới nhất
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                className="flex-grow px-4 py-3 bg-[#0f1923] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F44336]/50 focus:border-transparent text-white"
              />
              <button className="px-6 py-3 font-rajdhani font-bold tracking-wider text-shadow-sm button-cyber clip-hexagon hexagon-border text-white">
                Đăng ký
              </button>
            </div>

            <p className="text-white/50 text-sm mt-4">
              Chúng tôi tôn trọng quyền riêng tư của bạn. Xem{" "}
              <Link href="#" className="text-[#F44336] hover:underline">
                Chính sách bảo mật
              </Link>{" "}
              của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
