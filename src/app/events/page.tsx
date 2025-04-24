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
  },
  {
    id: 2,
    title: 'M-SCI Open Beta: Cuộc Chiến Toàn Cầu Bắt Đầu 10/02/2025',
    date: '05/02/2025',
    image: '/images/particle_overlay.png',
    summary: 'Sau thành công vang dội của Close Beta với phản hồi tích cực từ 5,000 game thủ tiên phong, M-SCI tự hào công bố sự kiện Open Beta sẽ chính thức bắt đầu vào ngày 10/02/2025.',
  },
  {
    id: 3,
    title: 'Giải Đấu M-SCI Mùa 1: Tranh Tài Giành 100.000 USD',
    date: '15/03/2025',
    image: '/images/overwatch_bg_2.jpg',
    summary: 'Tham gia giải đấu đầu tiên của M-SCI với giải thưởng lên đến 100.000 USD. Đăng ký ngay để thể hiện kỹ năng và giành chiến thắng!',
  },
  {
    id: 4,
    title: 'Sự Kiện Hợp Tác: M-SCI x Anime Festival Asia',
    date: '20/04/2025',
    image: '/images/particle_overlay.png',
    summary: 'M-SCI hợp tác với Anime Festival Asia mang đến các skin và nội dung độc quyền từ các anime nổi tiếng. Không thể bỏ lỡ!',
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

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      {/* Thanh điều hướng */}
      <ThanhDieuHuongResponsive />
      
      {/* Hero Section */}
      <div className="relative pt-20 lg:pt-24 pb-10 lg:pb-16">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/overwatch_bg_2.jpg"
            alt="Overwatch Background"
            fill
            style={{ objectFit: 'cover' }}
            quality={80}
            priority
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 glow-text">Sự Kiện M-SCI</h1>
              <p className="text-xl text-blue-300 mb-4">Khám phá và tham gia các sự kiện mới nhất</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Events List */}
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        {loading ? (
          // Skeleton loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-800 bg-opacity-60 rounded-lg overflow-hidden animate-pulse">
                <div className="h-52 bg-gray-700"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3 mb-6"></div>
                  <div className="h-10 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="bg-gray-800 bg-opacity-60 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Link href={`/events/${event.id}`} className="block relative h-52 overflow-hidden group">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70"></div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-xs py-1 px-2 rounded-full">
                      {event.date}
                    </span>
                  </div>
                </Link>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    <Link href={`/events/${event.id}`} className="hover:text-blue-400 transition-colors">
                      {event.title}
                    </Link>
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm line-clamp-3">{event.summary}</p>
                  
                  <div className="flex justify-between items-center">
                    <Link href={`/events/${event.id}`} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-300 inline-flex items-center">
                      <span>Chi Tiết</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                    
                    <div className="flex space-x-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-600 transition-colors">
                        <FaFacebookF className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-600 transition-colors">
                        <FaTwitter className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="bg-gray-800 bg-opacity-60 rounded-xl overflow-hidden relative">
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
                <h2 className="text-2xl md:text-3xl font-bold mb-4 glow-text">Nhận Thông Báo Sự Kiện Mới</h2>
                <p className="text-gray-300 mb-4">Đăng ký nhận thông báo về các sự kiện mới nhất của M-SCI. Bạn sẽ là người đầu tiên biết về các bản cập nhật, sự kiện đặc biệt và nhiều hơn nữa!</p>
                
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="flex-grow px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 whitespace-nowrap">
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
                    alt="Newsletter" 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg"></div>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-10 border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold mb-4">Theo Dõi Chúng Tôi</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <FaDiscord className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <FaTelegram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-10 mt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="relative h-10 w-32 mr-2">
                  <Image
                    src="/images/overwatch_logo.png"
                    alt="M-SCI Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-2">© 2024 M-SCI. Tất cả quyền được bảo lưu.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/heroes" className="text-gray-300 hover:text-white transition-colors">Anh Hùng</Link>
              <Link href="/events" className="text-gray-300 hover:text-white transition-colors">Sự Kiện</Link>
              <Link href="/tin-tuc" className="text-gray-300 hover:text-white transition-colors">Tin Tức</Link>
              <Link href="/co-che" className="text-gray-300 hover:text-white transition-colors">Cơ Chế</Link>
              <Link href="/lien-he" className="text-gray-300 hover:text-white transition-colors">Liên Hệ</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 