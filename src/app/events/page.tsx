'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';
import './events.css';

// Dữ liệu sự kiện
const events = [
  {
    id: 1,
    title: 'M-SCI Close Beta: Trở Thành Anh Hùng Đầu Tiên Từ 01/01/2025',
    date: '25/12/2024',
    image: '/images/overwatch_bg_2.jpg',
    summary: 'Chuẩn bị sẵn sàng cho một cuộc phiêu lưu chưa từng có! M-SCI hân hạnh thông báo sự kiện Close Beta sẽ chính thức khởi động vào ngày 01/01/2025 trên nền tảng Telegram Mini App.',
    type: 'game',
  },
  {
    id: 2,
    title: 'M-SCI Open Beta: Cuộc Chiến Toàn Cầu Bắt Đầu 10/02/2025',
    date: '05/02/2025',
    image: '/images/particle_overlay.png',
    summary: 'Sau thành công vang dội của Close Beta với phản hồi tích cực từ 5,000 game thủ tiên phong, M-SCI tự hào công bố sự kiện Open Beta sẽ chính thức bắt đầu vào ngày 10/02/2025.',
    type: 'community',
  },
  {
    id: 3,
    title: 'Giải Đấu M-SCI Mùa 1: Tranh Tài Giành 100.000 USD',
    date: '15/03/2025',
    image: '/images/overwatch_bg_2.jpg',
    summary: 'Tham gia giải đấu đầu tiên của M-SCI với giải thưởng lên đến 100.000 USD. Đăng ký ngay để thể hiện kỹ năng và giành chiến thắng!',
    type: 'game',
  },
  {
    id: 4,
    title: 'Sự Kiện Hợp Tác: M-SCI x Anime Festival Asia',
    date: '20/04/2025',
    image: '/images/particle_overlay.png',
    summary: 'M-SCI hợp tác với Anime Festival Asia mang đến các skin và nội dung độc quyền từ các anime nổi tiếng. Không thể bỏ lỡ!',
    type: 'community',
  },
  {
    id: 5,
    title: 'Cập Nhật Mùa 2: Tướng Mới và Bản Đồ Mới',
    date: '10/05/2025',
    image: '/images/overwatch_bg_2.jpg',
    summary: 'Khám phá tướng mới và bản đồ mới trong cập nhật mùa 2. Trải nghiệm ngay để cảm nhận những thay đổi đột phá trong gameplay.',
    type: 'game',
  },
  {
    id: 6,
    title: 'M-SCI World Championship 2025',
    date: '15/06/2025',
    image: '/images/particle_overlay.png',
    summary: 'Giải đấu thế giới đầu tiên của M-SCI với sự tham gia của các đội tuyển hàng đầu từ khắp nơi trên thế giới. Giải thưởng lên đến 1 triệu USD.',
    type: 'community',
  },
];

export default function EventsPage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mô phỏng tải dữ liệu
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  // Tách 4 sự kiện nổi bật đầu tiên cho phần trên
  const featuredEvents = events.slice(0, 4);
  
  // Tất cả sự kiện cho phần hiển thị dưới cùng
  const allEvents = events;

  return (
    <div className="min-h-screen bg-[#16181D] text-white">
      <ThanhDieuHuongResponsive />

      {/* Hero Banner */}
      <div className="relative w-full h-[30vh] md:h-[40vh] overflow-hidden">
        <Image 
          src="/images/overwatch_bg_2.jpg" 
          alt="Events Hero Banner" 
          fill 
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#16181D]/70 via-[#16181D]/60 to-[#16181D]"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
              SỰ KIỆN
            </h1>
            <div className="w-20 h-1 bg-[#FF7D00] mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Events Section */}
        <div className="mb-16">
          {loading ? (
            // Skeleton loading
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-[#1F2326] rounded-md overflow-hidden animate-pulse h-full">
                  <div className="h-48 bg-gray-700"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3 mb-6"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEvents.map((event) => (
                <Link 
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group"
                >
                  <div className="bg-[#1F2326] rounded-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00A4EA]/10 h-full flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      <div className="absolute top-2 right-2 z-10">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          event.type === 'game' 
                            ? 'bg-[#00A4EA] text-white' 
                            : 'bg-[#FF7D00] text-white'
                        }`}>
                          {event.type === 'game' ? 'GAME' : 'COMMUNITY'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="text-base font-bold text-white group-hover:text-[#00A4EA] transition-colors mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-3 flex-grow">
                        {event.summary}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700">
                        <span className="text-xs text-gray-500">
                          {event.date}
                        </span>
                        <span className="text-xs text-[#00A4EA] group-hover:text-[#FF7D00] transition-colors flex items-center">
                          Xem chi tiết
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transition-transform transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Giải Đấu Button */}
        <div className="flex justify-center mb-16">
          <Link 
            href="/tournaments"
            className="bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium px-8 py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-[#FF7D00]/30 uppercase tracking-wide flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Giải Đấu
          </Link>
        </div>

        {/* Divider */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#16181D] px-4 text-sm text-gray-400 uppercase tracking-widest">Tất cả sự kiện</span>
          </div>
        </div>

        {/* Regular Events Section */}
        <div className="space-y-6 mt-8">
          {loading ? (
            // Skeleton loading
            [...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col md:flex-row bg-[#1F2326] rounded-md overflow-hidden animate-pulse">
                <div className="h-56 md:h-40 md:w-64 lg:w-80 bg-gray-700"></div>
                <div className="p-6 flex-grow">
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3 mb-6"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            allEvents.length > 0 ? (
              allEvents.map((event) => (
                <Link 
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="block group"
                >
                  <div className="flex flex-col md:flex-row bg-[#1F2326] rounded-md overflow-hidden transition-all duration-300 hover:bg-[#24282C] hover:shadow-lg">
                    <div className="relative h-56 md:h-40 md:w-64 lg:w-80 flex-shrink-0">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 256px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                      
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          event.type === 'game' 
                            ? 'bg-[#00A4EA] text-white' 
                            : 'bg-[#FF7D00] text-white'
                        }`}>
                          {event.type === 'game' ? 'GAME' : 'COMMUNITY'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-6 flex flex-col justify-center flex-grow">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#00A4EA] transition-colors mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-400 line-clamp-2 mb-4 text-sm md:text-base">
                        {event.summary}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-gray-500">
                          {event.date}
                        </span>
                        <span className="text-sm text-[#00A4EA] group-hover:text-[#FF7D00] transition-colors flex items-center">
                          Xem chi tiết
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-16 bg-[#1F2326] rounded-md">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Không có sự kiện nào</h3>
                <p className="text-gray-400 max-w-lg mx-auto">Hiện tại chưa có sự kiện nào. Vui lòng quay lại sau.</p>
              </div>
            )
          )}
        </div>

        {/* Email Subscription */}
        <div className="mt-16 bg-[#1F2326] rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/particle_overlay.png"
              alt="Particle Background"
              fill
              style={{ objectFit: 'cover' }}
              className="object-cover"
            />
          </div>
          
          <div className="relative z-10 p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Đăng Ký Nhận Thông Báo Sự Kiện</h2>
                <p className="text-gray-300 mb-4">Nhận thông báo khi có sự kiện mới. Đừng bỏ lỡ cơ hội tham gia các hoạt động độc đáo của M-SCI!</p>
                
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="flex-grow px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-[#00A4EA] focus:ring focus:ring-[#00A4EA]/30 focus:outline-none"
                  />
                  <button className="bg-[#00A4EA] hover:bg-[#0094D5] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 whitespace-nowrap">
                    Đăng Ký
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất kỳ lúc nào.
                </p>
              </div>
              
              <div className="hidden lg:block">
                <div className="relative h-60 w-full">
                  <Image 
                    src="/images/overwatch_bg_2.jpg"
                    alt="Subscribe" 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00A4EA]/30 to-[#FF7D00]/30 rounded-lg"></div>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-10 border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold mb-4">Theo Dõi Chúng Tôi</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#00A4EA] flex items-center justify-center transition-colors">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#00A4EA] flex items-center justify-center transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#00A4EA] flex items-center justify-center transition-colors">
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#00A4EA] flex items-center justify-center transition-colors">
                  <FaDiscord className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#00A4EA] flex items-center justify-center transition-colors">
                  <FaTelegram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 