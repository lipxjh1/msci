"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUsers, FaGlobe, FaRocket, FaChartLine, FaDiscord, FaFacebook, FaTrophy } from "react-icons/fa";
import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      <ThanhDieuHuongResponsive />

      {/* Hero section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        {/* Background image with parallax effect */}
        <div className="absolute inset-0">
          <Image
            src="/images/overwatch_bg_2.jpg"
            alt="Cộng Đồng M-SCI"
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
                  CỘNG ĐỒNG
                  <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h1>
              <p className="font-rajdhani text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in">
                KẾT NỐI - CHIA SẺ - LAN TỎA GIÁ TRỊ CÙNG M-SCI
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
                <h2 className="text-3xl font-bold text-white mb-6 relative inline-block">
                  Trung Tâm Cộng Đồng
                  <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
                </h2>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  Trung tâm Cộng đồng M-SCI là nền tảng kết nối cộng đồng game, được thiết kế nhằm tạo ra một hệ sinh thái 
                  tương tác mạnh mẽ giữa người chơi, nhà phát triển và các đối tác. Với tầm nhìn xây dựng cộng đồng game bền vững, 
                  Trung tâm Cộng đồng là minh chứng cho cam kết của M-SCI.
                </p>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  Thông qua nền tảng này, người chơi có thể kết nối với nhau, tham gia các sự kiện, thảo luận về game,
                  đóng góp ý kiến và cùng nhau phát triển hệ sinh thái M-SCI. Các hoạt động cộng đồng đa dạng luôn
                  diễn ra hàng ngày, mang đến trải nghiệm phong phú cho mọi thành viên.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      25K+
                    </div>
                    <div className="text-white/60 text-sm">Thành viên</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      100+
                    </div>
                    <div className="text-white/60 text-sm">Sự kiện/tháng</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      98%
                    </div>
                    <div className="text-white/60 text-sm">Hài lòng</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-xl overflow-hidden border border-white/5 shadow-xl">
                  <Image
                    src="/images/home/FS-img/hero.png"
                    alt="Cộng đồng M-SCI"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a141e] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white font-bold text-lg mb-2">
                      Cộng đồng M-SCI
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 px-3 bg-[#F44336]/20 backdrop-blur-sm rounded-md border border-[#F44336]/30">
                        <span className="text-[#F44336] font-medium text-sm">
                          Sôi động
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#3f51b5]/20 backdrop-blur-sm rounded-md border border-[#3f51b5]/30">
                        <span className="text-[#3f51b5] font-medium text-sm">
                          Đa dạng
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#4CAF50]/20 backdrop-blur-sm rounded-md border border-[#4CAF50]/30">
                        <span className="text-[#4CAF50] font-medium text-sm">
                          Năng động
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Các nền tảng cộng đồng */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 relative inline-block">
              Nền Tảng Cộng Đồng
              <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Discord */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/like.jpg"
                    alt="Discord"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#5865F2]/30 backdrop-blur-sm rounded-md border border-[#5865F2]/30">
                    <span className="text-white font-medium text-sm">
                      Chat & Voice
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#5865F2] transition-colors flex items-center">
                    <FaDiscord className="mr-2" /> Discord Server
                  </h3>
                  <p className="text-white/70 mb-4">
                    Tham gia kênh Discord chính thức của M-SCI với hơn 15,000 thành viên. 
                    Trao đổi trực tiếp với các game thủ khác, nhận thông báo về sự kiện
                    và cập nhật mới nhất về game.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      15,000+ thành viên
                    </div>
                    <Link href="https://discord.gg/msci" className="p-2 px-4 bg-[#5865F2]/20 backdrop-blur-sm rounded-md border border-[#5865F2]/30 text-white/80 hover:bg-[#5865F2]/30 transition-colors">
                      Tham gia
                    </Link>
                  </div>
                </div>
              </div>

              {/* Facebook */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/new.jpg"
                    alt="Facebook"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#1877F2]/30 backdrop-blur-sm rounded-md border border-[#1877F2]/30">
                    <span className="text-white font-medium text-sm">
                      Cộng đồng
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#1877F2] transition-colors flex items-center">
                    <FaFacebook className="mr-2" /> Fanpage & Group
                  </h3>
                  <p className="text-white/70 mb-4">
                    Theo dõi Fanpage chính thức và tham gia Group Facebook của M-SCI để 
                    cập nhật tin tức, chia sẻ khoảnh khắc, chiến thuật và tham gia
                    các cuộc thảo luận sôi nổi.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      8,500+ thành viên
                    </div>
                    <Link href="https://facebook.com/msci" className="p-2 px-4 bg-[#1877F2]/20 backdrop-blur-sm rounded-md border border-[#1877F2]/30 text-white/80 hover:bg-[#1877F2]/30 transition-colors">
                      Theo dõi
                    </Link>
                  </div>
                </div>
              </div>

              {/* Diễn đàn */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/home/FS-img/play_g.png"
                    alt="Diễn đàn"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#9C27B0]/30 backdrop-blur-sm rounded-md border border-[#9C27B0]/30">
                    <span className="text-white font-medium text-sm">
                      Thảo luận
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#9C27B0] transition-colors">
                    Diễn Đàn M-SCI
                  </h3>
                  <p className="text-white/70 mb-4">
                    Diễn đàn chính thức với các mục thảo luận chuyên sâu về chiến thuật, 
                    cập nhật, hướng dẫn và chia sẻ kinh nghiệm. Nơi tất cả game thủ 
                    có thể giao lưu và học hỏi.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      10,000+ bài viết
                    </div>
                    <Link href="/dien-dan" className="p-2 px-4 bg-[#9C27B0]/20 backdrop-blur-sm rounded-md border border-[#9C27B0]/30 text-white/80 hover:bg-[#9C27B0]/30 transition-colors">
                      Truy cập
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sự kiện cộng đồng */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-6 relative inline-block">
                  Sự Kiện Cộng Đồng
                  <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#FFD700] to-transparent"></div>
                </h2>

                <div className="space-y-4">
                  {/* Sự kiện 1 */}
                  <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg p-5 hover:border-[#FFD700]/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-16 h-16 bg-[#FFD700]/10 rounded-lg flex items-center justify-center border border-[#FFD700]/20">
                        <FaTrophy className="text-[#FFD700] text-3xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">Giải Đấu Quý III/2023</h3>
                        <p className="text-white/70 text-sm mb-2">
                          Giải đấu hàng quý với tổng giải thưởng lên đến 50 triệu đồng
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-[#FFD700] text-sm">
                            25/09/2023 - 10/10/2023
                          </div>
                          <Link href="/events/q3-2023" className="text-white/70 text-sm hover:text-[#FFD700] transition-colors">
                            Chi tiết →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sự kiện 2 */}
                  <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg p-5 hover:border-[#00BCD4]/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-16 h-16 bg-[#00BCD4]/10 rounded-lg flex items-center justify-center border border-[#00BCD4]/20">
                        <FaUsers className="text-[#00BCD4] text-3xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">Họp Mặt Cộng Đồng Hà Nội</h3>
                        <p className="text-white/70 text-sm mb-2">
                          Gặp gỡ trực tiếp các thành viên và đội ngũ phát triển M-SCI
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-[#00BCD4] text-sm">
                            15/10/2023 - 16:00 GMT+7
                          </div>
                          <Link href="/events/hanoi-meetup" className="text-white/70 text-sm hover:text-[#00BCD4] transition-colors">
                            Chi tiết →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sự kiện 3 */}
                  <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg p-5 hover:border-[#4CAF50]/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-16 h-16 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center border border-[#4CAF50]/20">
                        <FaRocket className="text-[#4CAF50] text-3xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">Chương Trình Đại Sứ M-SCI</h3>
                        <p className="text-white/70 text-sm mb-2">
                          Cơ hội trở thành đại diện chính thức của cộng đồng M-SCI
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-[#4CAF50] text-sm">
                            Đang mở đơn đăng ký
                          </div>
                          <Link href="/events/ambassador" className="text-white/70 text-sm hover:text-[#4CAF50] transition-colors">
                            Chi tiết →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-6 relative inline-block">
                  Chỉ Số Cộng Đồng
                  <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#3f51b5] to-transparent"></div>
                </h2>

                <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#3f51b5]/20 border border-[#3f51b5]/30 mb-4">
                        <div className="text-3xl font-bold text-white">65%</div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">Tỷ lệ tương tác</h3>
                      <p className="text-white/70 text-sm">
                        Thành viên hoạt động hàng ngày
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#F44336]/20 border border-[#F44336]/30 mb-4">
                        <div className="text-3xl font-bold text-white">45<span className="text-lg">ph</span></div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">Thời gian tương tác</h3>
                      <p className="text-white/70 text-sm">
                        Trung bình mỗi ngày
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#4CAF50]/20 border border-[#4CAF50]/30 mb-4">
                        <div className="text-3xl font-bold text-white">80%</div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">Tỷ lệ giữ chân</h3>
                      <p className="text-white/70 text-sm">
                        Người dùng quay lại
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#9C27B0]/20 border border-[#9C27B0]/30 mb-4">
                        <div className="text-3xl font-bold text-white">15%</div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">Tăng trưởng</h3>
                      <p className="text-white/70 text-sm">
                        Thành viên mới mỗi tháng
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-[#0f1923] to-[#1a2634] rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-30">
              <Image
                src="/images/particle_overlay.png"
                alt="Background"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="relative p-10 md:p-16 z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sẵn Sàng Kết Nối Với Cộng Đồng?</h2>
                <p className="text-white/80 text-lg mb-10">
                  Trung tâm Cộng đồng M-SCI không chỉ là một tính năng - đó là trái tim của hệ sinh thái game, 
                  nơi công nghệ và con người gặp gỡ để tạo nên những trải nghiệm không thể quên.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dang-ky" className="px-8 py-4 bg-gradient-to-r from-[#F44336] to-[#E53935] rounded-lg text-white font-bold hover:shadow-lg hover:shadow-[#F44336]/30 transition-all">
                    Tham Gia Ngay
                  </Link>
                  <Link href="/discord" className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white font-bold hover:bg-white/10 transition-all">
                    Tham Gia Discord
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 