'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaCalendarAlt, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLink, FaShareAlt } from 'react-icons/fa';
import React from 'react';
import '../events.css';

// Dữ liệu sự kiện
const events = [
  {
    id: 1,
    title: 'M-SCI Close Beta: Trở Thành Anh Hùng Đầu Tiên Từ 01/01/2025',
    subtitle: 'M-SCI Chính Thức Mở Cửa Thử Nghiệm Close Beta Trên Telegram Mini App',
    date: '25/12/2024',
    time: '10:00 GMT+7',
    location: 'Thâm Quyến',
    image: '/images/overwatch_bg_2.jpg',
    coverImage: '/images/overwatch_bg_2.jpg',
    summary: 'Chuẩn bị sẵn sàng cho một cuộc phiêu lưu chưa từng có! M-SCI hân hạnh thông báo sự kiện Close Beta sẽ chính thức khởi động vào ngày 01/01/2025 trên nền tảng Telegram Mini App.',
    content: `
      <p><strong>Thâm Quyến, 25/12/2024</strong> - Chuẩn bị sẵn sàng cho một cuộc phiêu lưu chưa từng có! M-SCI (Musk Institute of Science and Cybernetic Intelligence) hân hạnh thông báo sự kiện Close Beta sẽ chính thức khởi động vào ngày 01/01/2025 trên nền tảng Telegram Mini App. Đây là cơ hội độc quyền để bạn trở thành những anh hùng đầu tiên bước vào thế giới khoa học viễn tưởng đầy thử thách của M-SCI.</p>
      
      <h3>Giới Thiệu Về M-SCI</h3>
      <p>M-SCI là tựa game hành động bắn súng chiến thuật thế hệ mới, lấy bối cảnh năm 2049. Trong game, bạn sẽ gia nhập lực lượng tinh nhuệ do Elon Musk sáng lập, chiến đấu chống lại tập đoàn công nghệ X-Corp và đội quân robot, drone do AI điều khiển. Với đồ họa cyberpunk ấn tượng, gameplay chiến thuật sâu sắc và cốt truyện hấp dẫn, M-SCI hứa hẹn mang đến trải nghiệm gaming đột phá.</p>
      
      <h3>Chi Tiết Sự Kiện Close Beta</h3>
      <p>
        <strong>Ngày Bắt Đầu:</strong> 01/01/2025<br/>
        <strong>Nền Tảng:</strong> Telegram Mini App<br/>
        <strong>Thời Gian:</strong> 40 ngày<br/>
        <strong>Số Lượng:</strong> Giới hạn 5,000 người chơi
      </p>
      
      <h4>Nội Dung Close Beta:</h4>
      <ul>
        <li><strong>Trải Nghiệm Độc Quyền:</strong> Chơi thử 40 màn đầu tiên của chiến dịch M-SCI</li>
        <li><strong>3 Class Nhân Vật:</strong> Thử nghiệm Lính Súng Máy, Tay Bắn Tỉa và Pháo Thủ</li>
        <li><strong>Sự Kiện Boss Thế Giới:</strong> Cùng nhau chiến đấu với Boss đầu tiên</li>
        <li><strong>Phần Thưởng Giới Hạn:</strong> Nhận huy hiệu và vật phẩm độc quyền cho người thử nghiệm</li>
        <li><strong>Đóng Góp Phát Triển:</strong> Ý kiến của bạn sẽ giúp hoàn thiện game</li>
      </ul>
      
      <h3>Cách Tham Gia Close Beta</h3>
      <ol>
        <li><strong>Đăng Ký:</strong> Truy cập bot M-SCI trên Telegram từ ngày 25/12/2024</li>
        <li><strong>Điền Form:</strong> Hoàn thành bảng câu hỏi beta tester</li>
        <li><strong>Chờ Xác Nhận:</strong> Kết quả sẽ được thông báo qua Telegram trước 30/12/2024</li>
        <li><strong>Sẵn Sàng:</strong> Cài đặt Mini App và chờ đến 01/01/2025</li>
      </ol>
      
      <h3>Đặc Quyền Beta Tester</h3>
      <ul>
        <li>Danh hiệu độc quyền "Anh Hùng Khai Sinh"</li>
        <li>Huy hiệu thành tích beta tester</li>
        <li>1,000 M-Coin khi game chính thức ra mắt</li>
        <li>Ưu tiên tham gia mọi sự kiện tương lai</li>
        <li>Skin nhân vật phiên bản giới hạn</li>
      </ul>
      
      <h3>Yêu Cầu Tham Gia</h3>
      <ul>
        <li>Tài khoản Telegram đang hoạt động</li>
        <li>Điện thoại hỗ trợ Telegram Mini App</li>
        <li>Kết nối internet ổn định</li>
        <li>Sẵn sàng dành ít nhất 5 giờ/tuần cho việc test game</li>
      </ul>
      
      <h3>Lời Nhắn Từ Nhà Phát Triển</h3>
      <p>"Close Beta là bước đầu tiên trong hành trình đưa M-SCI đến với game thủ toàn cầu," chia sẻ Sarah Chen, Trưởng dự án. "Chúng tôi mong muốn lắng nghe ý kiến từ cộng đồng để hoàn thiện trải nghiệm game tốt nhất."</p>
      
      <h3>Kết Nối Với Chúng Tôi</h3>
      <ul>
        <li>Website: <a href="https://m-sci.net">m-sci.net</a></li>
        <li>Telegram: <a href="https://t.me/MSCIGameBot">@MSCIGameBot</a></li>
        <li>Group: <a href="https://t.me/MSCICommunity">t.me/MSCICommunity</a></li>
        <li>Facebook: <a href="https://fb.com/MSCIVietnam">fb.com/MSCIVietnam</a></li>
      </ul>
      
      <p><em>M-SCI - Nơi Anh Hùng Hội Tụ, Nơi Huyền Thoại Tỏa Sáng!</em></p>
    `,
  },
  {
    id: 2,
    title: 'M-SCI Open Beta: Cuộc Chiến Toàn Cầu Bắt Đầu 10/02/2025',
    subtitle: 'Sẵn Sàng Cho Cuộc Chiến Quyết Định Tương Lai Nhân Loại',
    date: '05/02/2025',
    time: '14:00 GMT+7',
    location: 'Thâm Quyến',
    image: '/images/particle_overlay.png',
    coverImage: '/images/particle_overlay.png',
    summary: 'Sau thành công vang dội của Close Beta với phản hồi tích cực từ 5,000 game thủ tiên phong, M-SCI tự hào công bố sự kiện Open Beta sẽ chính thức bắt đầu vào ngày 10/02/2025.',
    content: `
      <p><strong>Thâm Quyến, 05/02/2025</strong> - Sau thành công vang dội của Close Beta với phản hồi tích cực từ 5,000 game thủ tiên phong, M-SCI tự hào công bố sự kiện Open Beta sẽ chính thức bắt đầu vào ngày 10/02/2025. Đây là cơ hội để tất cả game thủ trên toàn thế giới cùng tham gia cuộc chiến giành lại tương lai cho nhân loại!</p>
      
      <h3>Thời Khắc Lịch Sử Đã Đến</h3>
      <p>Close Beta đã vượt xa mọi kỳ vọng với 98% đánh giá tích cực từ người chơi. Giờ đây, chúng tôi mở rộng cánh cửa đón tất cả các chiến binh. Hãy trải nghiệm sức mạnh thực sự của M-SCI với gameplay đột phá, đồ họa đỉnh cao và cốt truyện sâu sắc.</p>
      
      <h3>Chi Tiết Sự Kiện Open Beta</h3>
      <p>
        <strong>Ngày Bắt Đầu:</strong> 10/02/2025<br/>
        <strong>Thời Gian:</strong> Không giới hạn<br/>
        <strong>Nền Tảng:</strong> Telegram Mini App<br/>
        <strong>Người Chơi:</strong> Mở cho tất cả mọi người
      </p>
      
      <h4>Nội Dung Open Beta:</h4>
      <ul>
        <li><strong>100 Màn Chơi Hoàn Chỉnh:</strong> Khám phá đầy đủ 5 khu vực từ Trái Đất đến Sao Hỏa</li>
        <li><strong>Hệ Thống Guild:</strong> Lập bang hội, tham gia Guild War</li>
        <li><strong>Sự Kiện Đặc Biệt:</strong> Boss Thế Giới, Boss Tinh Anh mỗi ngày</li>
        <li><strong>Hệ Thống Gacha:</strong> Thu thập đầy đủ dàn anh hùng từ C đến S</li>
        <li><strong>Center Market:</strong> Giao dịch tự do với người chơi khác</li>
        <li><strong>Chat AI Nhân Vật:</strong> Trò chuyện trực tiếp với anh hùng của bạn</li>
      </ul>
      
      <h3>Điểm Nổi Bật Open Beta</h3>
      <ol>
        <li>
          <strong>Gameplay Hoàn Thiện:</strong>
          <ul>
            <li>Cân bằng nhân vật được điều chỉnh dựa trên feedback Close Beta</li>
            <li>Cơ chế điều khiển tối ưu cho Telegram Mini App</li>
            <li>Hiệu ứng và âm thanh được nâng cấp</li>
          </ul>
        </li>
        <li>
          <strong>Sự Kiện Ra Mắt:</strong>
          <ul>
            <li>Đăng nhập 7 ngày liên tiếp nhận Hero cấp A miễn phí</li>
            <li>Boss Thế Giới đặc biệt với phần thưởng x2</li>
            <li>Giảm 50% phí giao dịch Market trong tuần đầu</li>
          </ul>
        </li>
        <li>
          <strong>Cộng Đồng & Hỗ Trợ:</strong>
          <ul>
            <li>Hệ thống chat trong game</li>
            <li>Đội ngũ GM hỗ trợ 24/7</li>
            <li>Kênh báo lỗi và góp ý riêng</li>
          </ul>
        </li>
      </ol>
      
      <h3>Phần Thưởng Open Beta</h3>
      <ul>
        <li><strong>Top 100 Đầu Tiên:</strong> Hero S ngẫu nhiên + 10,000 M-Coin</li>
        <li><strong>Top 1000 Đầu Tiên:</strong> Hero A ngẫu nhiên + 5,000 M-Coin</li>
        <li><strong>Mọi Người Chơi:</strong> Gói khởi đầu với 1,000 M-Coin + DOGE Shield x10</li>
      </ul>
      
      <h3>Cách Tham Gia</h3>
      <ol>
        <li>Tìm bot <a href="https://t.me/MSCIGameBot">@MSCIGameBot</a> trên Telegram</li>
        <li>Nhấn Start và chọn "Play Game"</li>
        <li>Tạo tài khoản và nhận phần thưởng đăng ký</li>
        <li>Bắt đầu hành trình của bạn!</li>
      </ol>
      
      <h3>Lộ Trình Sau Open Beta</h3>
      <ul>
        <li><strong>Tháng 3/2025:</strong> Cập nhật Guild War 2.0</li>
        <li><strong>Tháng 4/2025:</strong> Ra mắt chế độ PvP trực tiếp</li>
        <li><strong>Tháng 5/2025:</strong> Tích hợp NFT và Play-to-Earn</li>
        <li><strong>Tháng 6/2025:</strong> Phát hành chính thức toàn cầu</li>
      </ul>
      
      <h3>Lời Kết</h3>
      <p>"Open Beta đánh dấu bước ngoặt quan trọng trong hành trình phát triển M-SCI," Elon Musk, người sáng lập M-SCI chia sẻ. "Chúng tôi tin rằng với sự đóng góp của cộng đồng game thủ toàn cầu, M-SCI sẽ trở thành tựa game định nghĩa lại thể loại sci-fi action."</p>
      
      <h3>Tham Gia Cộng Đồng</h3>
      <ul>
        <li>Website: <a href="https://m-sci.net">m-sci.net</a></li>
        <li>Telegram Community: <a href="https://t.me/MSCICommunity">t.me/MSCICommunity</a></li>
        <li>Facebook: <a href="https://fb.com/MSCIVietnam">fb.com/MSCIVietnam</a></li>
        <li>Discord: <a href="https://discord.gg/msci">discord.gg/msci</a></li>
        <li>YouTube: <a href="https://youtube.com/MSCIOfficial">youtube.com/MSCIOfficial</a></li>
      </ul>
      
      <p><em>M-SCI - Chiến Đấu Không Ngừng - Chiến Thắng Không Giới Hạn!</em></p>
    `,
  },
];

// Định nghĩa kiểu cho params
type EventParams = {
  id: string;
};

// Hàm tìm kiếm sự kiện theo ID
const getEventById = (id: string) => {
  const eventId = parseInt(id, 10);
  return events.find(event => event.id === eventId);
};

// Component trang chi tiết sự kiện
export default function EventPage({ params }: { params: EventParams }) {
  // Sử dụng React.use() để unwrap params
  const unwrappedParams = React.use(params as any) as EventParams;
  const event = getEventById(unwrappedParams.id);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Nếu không tìm thấy sự kiện, chuyển hướng đến trang 404
  if (!event) {
    notFound();
  }

  // Thêm hiệu ứng thanh cuộn
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D1117] text-white relative">
      {/* Thanh điều hướng */}
      <ThanhDieuHuongResponsive />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src={event.coverImage || event.image}
          alt={event.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 px-4 py-12 md:py-16">
          <div className="container mx-auto max-w-6xl">
            <div className="inline-flex items-center bg-blue-600/80 backdrop-blur-sm text-white text-sm py-1.5 px-4 rounded-full mb-4">
              <FaCalendarAlt className="mr-2" /> {event.date}
              {event.time && <span className="ml-2">| {event.time}</span>}
              {event.location && (
                <span className="ml-2 flex items-center">
                  <span className="inline-block w-1 h-1 bg-white/40 rounded-full mx-2"></span>
                  <FaMapMarkerAlt className="mr-1" /> {event.location}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl leading-tight">{event.title}</h1>
            
            {event.subtitle && (
              <p className="text-xl md:text-2xl text-blue-300 max-w-3xl font-light">{event.subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Floating action bar */}
      <div className={`sticky top-16 z-20 transition-all duration-300 bg-gray-900/80 backdrop-blur-md border-y border-gray-800 ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <Link href="/events" className="text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Quay lại
              </Link>
              <h2 className="text-lg font-medium hidden md:block truncate max-w-md">{event.title}</h2>
            </div>
            
            <div className="flex items-center gap-x-2">
              <button className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800">
                <FaShareAlt className="w-4 h-4" />
              </button>
              <button className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center">
                Đăng ký tham gia
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Content area */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 mb-8">
            <div className="p-6 md:p-8">
              <div className="prose prose-lg prose-invert max-w-none prose-headings:text-blue-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline">
                <div dangerouslySetInnerHTML={{ __html: event.content }}></div>
              </div>
            </div>
          </div>
          
          {/* Comments section */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6">Bình luận & Đánh giá</h3>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-300 font-semibold">
                    TL
                  </div>
                  <div>
                    <div className="font-medium">Trần Long</div>
                    <div className="text-sm text-gray-400">2 giờ trước</div>
                  </div>
                </div>
                <p className="text-gray-300">Sự kiện này quá tuyệt vời! Tôi đã đăng ký và đang rất hào hứng chờ đợi ngày khai mạc. Hy vọng sẽ gặp được nhiều game thủ khác.</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center text-purple-300 font-semibold">
                    PH
                  </div>
                  <div>
                    <div className="font-medium">Phạm Hương</div>
                    <div className="text-sm text-gray-400">5 giờ trước</div>
                  </div>
                </div>
                <p className="text-gray-300">Cuối cùng cũng có game Việt chất lượng quốc tế. Rất mong chờ trải nghiệm gameplay độc đáo của M-SCI.</p>
              </div>
              
              <div className="pt-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0"></div>
                  <div className="flex-grow">
                    <textarea
                      className="w-full bg-gray-800/50 rounded-lg p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
                      placeholder="Viết bình luận của bạn..."
                      rows={3}
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors text-sm">
                        Đăng bình luận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Registration card */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 mb-6 sticky top-32">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Đăng ký tham gia</h3>
              <p className="text-gray-300 mb-6">Đảm bảo vị trí của bạn trong sự kiện đặc biệt này. Số lượng có hạn!</p>
              
              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Ngày bắt đầu:</span>
                  <span className="text-white font-medium">01/01/2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Số người đã đăng ký:</span>
                  <span className="text-white font-medium">3,421 / 5,000</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-1 mb-4">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '68%'}}></div>
                </div>
                
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-center mb-2">
                  Đăng ký ngay
                </button>
                <button className="w-full py-3 px-4 bg-transparent border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white rounded-lg transition-colors font-medium text-center flex items-center justify-center">
                  <FaCalendarAlt className="mr-2" />
                  Thêm vào lịch
                </button>
              </div>
            </div>
          </div>
          
          {/* Share card */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 mb-6">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Chia sẻ sự kiện</h3>
              <div className="flex gap-2">
                <a href="#" className="flex-1 py-2 bg-[#1877F2] text-white rounded flex items-center justify-center">
                  <FaFacebookF className="mr-2" />
                  Facebook
                </a>
                <a href="#" className="flex-1 py-2 bg-[#1DA1F2] text-white rounded flex items-center justify-center">
                  <FaTwitter className="mr-2" />
                  Twitter
                </a>
                <a href="#" className="flex-1 py-2 bg-gray-700 text-white rounded flex items-center justify-center">
                  <FaLink className="mr-2" />
                  Copy
                </a>
              </div>
            </div>
          </div>
          
          {/* Related events */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Sự kiện liên quan</h3>
              <div className="space-y-4">
                {events.filter(e => e.id !== parseInt(unwrappedParams.id, 10)).map((relatedEvent) => (
                  <Link href={`/events/${relatedEvent.id}`} key={relatedEvent.id} className="block group">
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={relatedEvent.image}
                          alt={relatedEvent.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">{relatedEvent.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{relatedEvent.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative h-10 w-32 mr-2">
                <Image
                  src="/images/overwatch_logo.png"
                  alt="M-SCI Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="100px"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/heroes" className="text-gray-300 hover:text-white transition-colors">Anh Hùng</Link>
              <Link href="/events" className="text-gray-300 hover:text-white transition-colors">Sự Kiện</Link>
              <Link href="/tin-tuc" className="text-gray-300 hover:text-white transition-colors">Tin Tức</Link>
              <Link href="/mechanics" className="text-gray-300 hover:text-white transition-colors">Cơ Chế</Link>
              <Link href="/lien-he" className="text-gray-300 hover:text-white transition-colors">Liên Hệ</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400 text-sm">
            <p>© 2024 M-SCI. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 