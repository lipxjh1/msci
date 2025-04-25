import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';

export interface PressSection {
  id: number;
  title: string;
  slug: string;
  content: React.ReactNode;
}

const pressSections: PressSection[] = [
  {
    id: 1,
    title: 'Giới Thiệu',
    slug: 'gioi-thieu',
    content: (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Giới Thiệu</h3>
          <p className="text-white/80 mb-4">M-SCI là một tựa game bắn súng mobile được phát triển bởi đội ngũ nhà phát triển độc lập. Đây là một tựa game được thiết kế để mang đến trải nghiệm hấp dẫn và độc đáo cho người chơi.</p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Tính Năng Nổi Bật',
    slug: 'tinh-nang-noi-bat',
    content: (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Tính Năng Nổi Bật</h3>
          <p className="text-white/80 mb-4">M-SCI mang đến nhiều tính năng hấp dẫn, bao gồm:</p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Hệ thống nhân vật đa dạng</li>
            <li>Gameplay độc đáo và thú vị</li>
            <li>Guild system giúp người chơi hợp tác</li>
            <li>Gacha system kích thích đam mê</li>
            <li>Blockchain integration</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Bộ Nhận Diện',
    slug: 'bo-nhan-dien',
    content: (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Logo & Branding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-all">
              <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white/30">Logo</span>
              </div>
              <p className="text-white text-sm">Logo chính (PNG, SVG)</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-all">
              <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white/30">Icon</span>
              </div>
              <p className="text-white text-sm">Icon app (1024x1024)</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-all">
              <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white/30">Banner</span>
              </div>
              <p className="text-white text-sm">Banner quảng cáo</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Screenshots</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-[9/16] bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-gray-700/50 transition-all">
                <span className="text-white/30">Screenshot {item}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Trailer chính thức</span>
            </div>
            <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Gameplay demo</span>
            </div>
            <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Behind-the-scenes</span>
            </div>
            <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Character showcases</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Artwork</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Key visual</span>
            </div>
            <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Character designs</span>
            </div>
            <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Environment art</span>
            </div>
            <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Concept art</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Liên Hệ',
    slug: 'lien-he',
    content: (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">PR Manager</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Tên:</span>
              <span className="text-white">[Tên PR Manager]</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Email:</span>
              <span className="text-white">pr@msci.game</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Phone:</span>
              <span className="text-white">[Số điện thoại]</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Social Media</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <a href="#" className="flex flex-col items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
              <FaTwitter className="h-8 w-8 text-cyan-400 mb-2" />
              <span className="text-white">@MSCIGame</span>
            </a>
            <a href="#" className="flex flex-col items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
              <FaFacebookF className="h-8 w-8 text-cyan-400 mb-2" />
              <span className="text-white">/MSCIOfficial</span>
            </a>
            <a href="#" className="flex flex-col items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
              <FaYoutube className="h-8 w-8 text-cyan-400 mb-2" />
              <span className="text-white">/MSCIOfficial</span>
            </a>
            <a href="#" className="flex flex-col items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
              <FaDiscord className="h-8 w-8 text-cyan-400 mb-2" />
              <span className="text-white">Discord</span>
            </a>
            <a href="#" className="flex flex-col items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
              <FaTelegram className="h-8 w-8 text-cyan-400 mb-2" />
              <span className="text-white">Telegram</span>
            </a>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Yêu Cầu Phỏng Vấn</h3>
          <p className="text-white/80 mb-4">Vui lòng gửi email đến press@msci.game với tiêu đề "Interview Request - [Tên Tổ Chức]"</p>
          <a 
            href="mailto:press@msci.game?subject=Interview Request" 
            className="inline-block px-6 py-3 bg-cyan-500/20 text-white rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-all button-cyber"
          >
            Gửi Email Ngay
          </a>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Fact Sheet',
    slug: 'fact-sheet',
    content: (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Kỹ Thuật</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Engine:</span>
              <span className="text-white">Unity</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Đồ họa:</span>
              <span className="text-white">2D Spine Animation + 3D Elements</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Dung lượng:</span>
              <span className="text-white">~500MB</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Yêu cầu:</span>
              <span className="text-white">Android 7.0+ / iOS 12+</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Ngôn ngữ:</span>
              <span className="text-white">Tiếng Việt, English, 日本語, 한국어</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Kinh Doanh</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Mô hình:</span>
              <span className="text-white">Free-to-Play</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Monetization:</span>
              <span className="text-white">In-App Purchase, Battle Pass</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Blockchain:</span>
              <span className="text-white">Token $MSCI, NFT marketplace</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Target Market:</span>
              <span className="text-white">SEA, Global</span>
            </li>
          </ul>
        </div>
        
        <div className="text-center mt-10">
          <p className="text-white/50 text-sm">*Cập nhật lần cuối: [Tháng/Năm]*</p>
          <p className="text-white/50 text-sm mt-2">© 2024 M-SCI. All rights reserved.</p>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Hướng Dẫn Sử Dụng',
    slug: 'huong-dan-su-dung',
    content: (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Cấu Trúc Press Kit</h3>
          <p className="text-white/80 mb-4">Bộ Press Kit vừa được tạo bao gồm các phần sau:</p>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">1. Thông Tin Cơ Bản</h4>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Tổng quan về game</li>
                <li>Thông tin liên hệ</li>
                <li>Mô tả ngắn gọn</li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">2. Cốt Truyện</h4>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Bối cảnh game</li>
                <li>Hành trình 100 màn chơi</li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">3. Tính Năng Nổi Bật</h4>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Hệ thống nhân vật</li>
                <li>Gameplay độc đáo</li>
                <li>Guild system</li>
                <li>Gacha system</li>
                <li>Blockchain integration</li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">4. Đội Ngũ Phát Triển</h4>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Core team</li>
                <li>Đối tác chiến lược</li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">5. Thành Tựu & Con Số</h4>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Số liệu cộng đồng</li>
                <li>Giải thưởng (nếu có)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  }
];

export default pressSections; 