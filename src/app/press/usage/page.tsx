'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram, FaArrowLeft, FaDownload, FaClipboard, FaCheck } from 'react-icons/fa';

export default function PressUsagePage() {
  const [activeTab, setActiveTab] = useState('press');
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({});
  
  // Function to copy text to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus({...copyStatus, [id]: true});
      
      // Reset copy status after 2 seconds
      setTimeout(() => {
        setCopyStatus({...copyStatus, [id]: false});
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-[#041019] text-white font-rajdhani">
      <ThanhDieuHuongResponsive />
      
      {/* Hero Section */}
      <div className="relative h-[30vh] overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <Image 
              src="/images/overwatch_bg_1.jpg" 
              alt="Press Kit Usage Background" 
              fill
              sizes="100vw"
              priority
              className="object-cover object-center brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 via-[#041019]/50 to-[#041019]"></div>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Link href="/press" className="flex items-center justify-center gap-2 text-cyan-400 mb-4 hover:text-cyan-300 transition-colors">
            <FaArrowLeft />
            <span>Quay lại Press Kit</span>
          </Link>
          <h1 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 tracking-wide text-shadow-blue cyber-glitch-sm">
            HƯỚNG DẪN SỬ DỤNG PRESS KIT
          </h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex border-b border-white/20 mb-8">
          <button
            className={`px-4 py-2 font-medium text-lg ${
              activeTab === 'press'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-white/70 hover:text-white'
            }`}
            onClick={() => setActiveTab('press')}
          >
            Cho Báo Chí
          </button>
          <button
            className={`px-4 py-2 font-medium text-lg ${
              activeTab === 'internal'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-white/70 hover:text-white'
            }`}
            onClick={() => setActiveTab('internal')}
          >
            Cho Đội Ngũ Nội Bộ
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'press' ? (
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6 font-rajdhani">Cấu Trúc Press Kit</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">1. Thông Tin Cơ Bản</h3>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    <li>Tổng quan về game</li>
                    <li>Thông tin liên hệ</li>
                    <li>Mô tả ngắn gọn</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">2. Cốt Truyện</h3>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    <li>Bối cảnh game</li>
                    <li>Hành trình 100 màn chơi</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">3. Tính Năng Nổi Bật</h3>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    <li>Hệ thống nhân vật</li>
                    <li>Gameplay độc đáo</li>
                    <li>Guild system</li>
                    <li>Gacha system</li>
                    <li>Blockchain integration</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">4. Đội Ngũ Phát Triển</h3>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    <li>Core team</li>
                    <li>Đối tác chiến lược</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">5. Thành Tựu & Con Số</h3>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    <li>Số liệu cộng đồng</li>
                    <li>Giải thưởng (nếu có)</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">6. Tài Liệu Truyền Thông</h3>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    <li>Logo & Branding</li>
                    <li>Screenshots</li>
                    <li>Videos</li>
                    <li>Artwork</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">7. Trích Dẫn Báo Chí</h3>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    <li>Quotes từ các tờ báo</li>
                    <li>Review từ KOLs</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">8. Liên Hệ Báo Chí</h3>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    <li>Thông tin PR Manager</li>
                    <li>Social media channels</li>
                    <li>Hướng dẫn yêu cầu phỏng vấn</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">9. Fact Sheet</h3>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    <li>Thông số kỹ thuật</li>
                    <li>Thông tin kinh doanh</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6 font-rajdhani">Hướng Dẫn Cho Báo Chí</h2>
              
              <div className="space-y-6">
                <div className="bg-white/5 p-5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaDownload className="text-cyan-400" />
                    <span>Download Press Kit</span>
                  </h3>
                  <p className="text-white/80 mb-4">Tải về toàn bộ press kit để có đầy đủ tài liệu cần thiết cho việc đưa tin:</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                      <FaDownload />
                      <span>Full Press Kit (ZIP)</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                      <FaDownload />
                      <span>Screenshots Pack</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                      <FaDownload />
                      <span>Logo Pack</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                      <FaDownload />
                      <span>Press Kit PDF</span>
                    </a>
                  </div>
                </div>
                
                <div className="bg-white/5 p-5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaClipboard className="text-cyan-400" />
                    <span>Mẫu Bài Viết</span>
                  </h3>
                  <p className="text-white/80 mb-4">Một số mẫu đoạn văn để sử dụng trong bài viết:</p>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 relative">
                      <h4 className="text-white font-medium mb-2">Đoạn Giới Thiệu Ngắn:</h4>
                      <p className="text-white/70 mb-2">M-SCI là game hành động chiến thuật khoa học viễn tưởng lấy bối cảnh năm 2049, nơi người chơi dẫn dắt biệt đội anh hùng chống lại đế chế robot của tập đoàn X-Corp.</p>
                      <button 
                        onClick={() => copyToClipboard('M-SCI là game hành động chiến thuật khoa học viễn tưởng lấy bối cảnh năm 2049, nơi người chơi dẫn dắt biệt đội anh hùng chống lại đế chế robot của tập đoàn X-Corp.', 'intro')}
                        className="absolute top-2 right-2 p-2 text-white/50 hover:text-white transition-colors"
                      >
                        {copyStatus['intro'] ? <FaCheck className="text-green-400" /> : <FaClipboard />}
                      </button>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 relative">
                      <h4 className="text-white font-medium mb-2">Đoạn Về Gameplay:</h4>
                      <p className="text-white/70 mb-2">Gameplay của M-SCI kết hợp giữa hành động căng thẳng với chiến thuật sâu sắc. Mỗi màn chơi kéo dài 30 giây, người chơi cần nhanh chóng tiêu diệt kẻ địch và hoàn thành mục tiêu. Cơ chế chạm để bắn, ẩn nấp chiến thuật và khả năng chuyển đổi nhân vật linh hoạt tạo nên trải nghiệm độc đáo trên mobile.</p>
                      <button 
                        onClick={() => copyToClipboard('Gameplay của M-SCI kết hợp giữa hành động căng thẳng với chiến thuật sâu sắc. Mỗi màn chơi kéo dài 30 giây, người chơi cần nhanh chóng tiêu diệt kẻ địch và hoàn thành mục tiêu. Cơ chế chạm để bắn, ẩn nấp chiến thuật và khả năng chuyển đổi nhân vật linh hoạt tạo nên trải nghiệm độc đáo trên mobile.', 'gameplay')}
                        className="absolute top-2 right-2 p-2 text-white/50 hover:text-white transition-colors"
                      >
                        {copyStatus['gameplay'] ? <FaCheck className="text-green-400" /> : <FaClipboard />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-cyan-900/20 p-5 rounded-lg border border-cyan-500/30">
                  <h3 className="text-xl font-bold text-white mb-4">Quy Định Sử Dụng</h3>
                  <ul className="list-disc list-inside text-white/80 space-y-2">
                    <li>Tất cả các tài liệu đều có thể sử dụng miễn phí trong việc đưa tin về M-SCI</li>
                    <li>Vui lòng ghi nguồn khi sử dụng hình ảnh, video hoặc trích dẫn</li>
                    <li>Không chỉnh sửa logo hoặc artwork khi sử dụng</li>
                    <li>Liên hệ PR team nếu cần thêm tài liệu hoặc phỏng vấn</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6 font-rajdhani">Hướng Dẫn Cho Đội Ngũ Nội Bộ</h2>
              
              <div className="space-y-6">
                <div className="bg-white/5 p-5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Cập Nhật Press Kit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Quy Trình Cập Nhật:</h4>
                      <ol className="list-decimal list-inside text-white/70 space-y-2">
                        <li>Kiểm tra và cập nhật thông tin mỗi tháng</li>
                        <li>Thêm các screenshot/trailer mới</li>
                        <li>Cập nhật số liệu cộng đồng</li>
                        <li>Thêm giải thưởng hoặc trích dẫn báo chí mới</li>
                        <li>Kiểm tra links và assets vẫn hoạt động</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-3">Đầu Mối Phụ Trách:</h4>
                      <ul className="list-disc list-inside text-white/70 space-y-2">
                        <li><span className="text-white">PR Manager:</span> Cập nhật thông tin liên hệ, trích dẫn báo chí</li>
                        <li><span className="text-white">Art Director:</span> Cập nhật hình ảnh, logo, assets</li>
                        <li><span className="text-white">Community Manager:</span> Cập nhật số liệu cộng đồng</li>
                        <li><span className="text-white">Game Director:</span> Xác nhận thông tin kỹ thuật và gameplay</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Lịch Cập Nhật</h3>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="text-white font-medium mb-2">Cập Nhật Hàng Tháng:</h4>
                      <ul className="list-disc list-inside text-white/70 space-y-1">
                        <li>Số liệu cộng đồng: Discord, Telegram, Pre-registration</li>
                        <li>Screenshot và trailer mới</li>
                        <li>Kiểm tra và cập nhật liên kết</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="text-white font-medium mb-2">Cập Nhật Theo Sự Kiện:</h4>
                      <ul className="list-disc list-inside text-white/70 space-y-1">
                        <li>Khi ra mắt tính năng mới</li>
                        <li>Khi nhận được giải thưởng</li>
                        <li>Khi phát hành trailer mới</li>
                        <li>Trước các sự kiện game lớn</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 p-5 rounded-lg border border-purple-500/30">
                  <h3 className="text-xl font-bold text-white mb-4">Quy Trình Phê Duyệt</h3>
                  <ol className="list-decimal list-inside text-white/80 space-y-2">
                    <li>Team trưởng cập nhật thông tin thuộc phần mình phụ trách</li>
                    <li>PR Manager kiểm tra và biên tập lại nội dung</li>
                    <li>Game Director xem xét và phê duyệt cuối cùng</li>
                    <li>IT Team cập nhật lên website và tạo bản PDF</li>
                    <li>PR Team thông báo cho các đối tác báo chí về bản cập nhật mới</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6 font-rajdhani">Quản Lý Tài Nguyên</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Tổ Chức Thư Mục</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg font-mono text-sm">
                    <p className="text-white">press-kit/</p>
                    <p className="text-white/70 ml-4">├── images/</p>
                    <p className="text-white/60 ml-8">├── screenshots/</p>
                    <p className="text-white/60 ml-8">├── artwork/</p>
                    <p className="text-white/60 ml-8">└── logos/</p>
                    <p className="text-white/70 ml-4">├── videos/</p>
                    <p className="text-white/70 ml-4">├── documents/</p>
                    <p className="text-white/70 ml-4">└── templates/</p>
                  </div>
                </div>
                
                <div className="bg-white/5 p-5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Quy Ước Đặt Tên</h3>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    <li><span className="text-white">Screenshots:</span> msci_screenshot_[số]_[mô tả].png</li>
                    <li><span className="text-white">Logos:</span> msci_logo_[variant]_[kích thước].png</li>
                    <li><span className="text-white">Videos:</span> msci_video_[loại]_[ngày].mp4</li>
                    <li><span className="text-white">Documents:</span> msci_presskit_[phiên bản]_[ngày].pdf</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Call to Action */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 card-neon text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-rajdhani">Cần Hỗ Trợ Thêm?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Nếu bạn cần thêm thông tin, tài liệu đặc biệt hoặc yêu cầu phỏng vấn với team phát triển, vui lòng liên hệ trực tiếp với PR team của chúng tôi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:press@msci.game" 
              className="px-6 py-3 bg-cyan-500/20 text-white rounded-lg border border-cyan-500/50 hover:bg-cyan-500/30 transition-all button-cyber"
            >
              Liên Hệ PR Team
            </a>
            <Link 
              href="/press" 
              className="px-6 py-3 bg-white/5 text-white rounded-lg border border-white/20 hover:bg-white/10 transition-all button-cyber"
            >
              Quay Lại Press Kit
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-[#030d13] border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-center md:text-left mb-4 md:mb-0">
              © 2024 M-SCI Game. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">
                <FaYoutube className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">
                <FaDiscord className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">
                <FaTelegram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 