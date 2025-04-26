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
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-blue-bright)]/30 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-be-vietnam-pro text-shadow-sm">Giới Thiệu</h3>
          <p className="text-white/80 mb-4 font-be-vietnam-pro">M-SCI là một tựa game bắn súng mobile được phát triển bởi đội ngũ nhà phát triển độc lập. Đây là một tựa game được thiết kế để mang đến trải nghiệm hấp dẫn và độc đáo cho người chơi.</p>
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
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-blue-bright)]/30 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-be-vietnam-pro text-shadow-sm">Tính Năng Nổi Bật</h3>
          <p className="text-white/80 mb-4 font-be-vietnam-pro">M-SCI mang đến nhiều tính năng hấp dẫn, bao gồm:</p>
          <ul className="list-disc list-inside text-white/70 space-y-3 font-be-vietnam-pro">
            <li className="flex items-center gap-2 transform hover:translate-x-2 transition-transform duration-300">
              <span className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 animate-pulse-slow"></span>
              <span>Hệ thống nhân vật đa dạng</span>
            </li>
            <li className="flex items-center gap-2 transform hover:translate-x-2 transition-transform duration-300">
              <span className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 animate-pulse-slow"></span>
              <span>Gameplay độc đáo và thú vị</span>
            </li>
            <li className="flex items-center gap-2 transform hover:translate-x-2 transition-transform duration-300">
              <span className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 animate-pulse-slow"></span>
              <span>Guild system giúp người chơi hợp tác</span>
            </li>
            <li className="flex items-center gap-2 transform hover:translate-x-2 transition-transform duration-300">
              <span className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 animate-pulse-slow"></span>
              <span>Gacha system kích thích đam mê</span>
            </li>
            <li className="flex items-center gap-2 transform hover:translate-x-2 transition-transform duration-300">
              <span className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 animate-pulse-slow"></span>
              <span>Blockchain integration</span>
            </li>
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
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-blue-bright)]/30 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-be-vietnam-pro text-shadow-sm">Logo & Branding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#041832]/50 rounded-lg p-4 text-center hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300">
              <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center mb-2 overflow-hidden group">
                <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300">Logo</span>
              </div>
              <p className="text-white text-sm font-be-vietnam-pro">Logo chính (PNG, SVG)</p>
            </div>
            <div className="bg-[#041832]/50 rounded-lg p-4 text-center hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300">
              <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center mb-2 overflow-hidden group">
                <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300">Icon</span>
              </div>
              <p className="text-white text-sm font-be-vietnam-pro">Icon app (1024x1024)</p>
            </div>
            <div className="bg-[#041832]/50 rounded-lg p-4 text-center hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300">
              <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center mb-2 overflow-hidden group">
                <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300">Banner</span>
              </div>
              <p className="text-white text-sm font-be-vietnam-pro">Banner quảng cáo</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-blue-bright)]/30 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-be-vietnam-pro text-shadow-sm">Screenshots</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-[9/16] bg-[#041832]/50 rounded-lg flex items-center justify-center hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300 overflow-hidden group">
                <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300 font-be-vietnam-pro">Screenshot {item}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-blue-bright)]/30 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-be-vietnam-pro text-shadow-sm">Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-video bg-[#041832]/50 rounded-lg flex items-center justify-center hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300 overflow-hidden group">
              <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300 font-be-vietnam-pro">Trailer chính thức</span>
            </div>
            <div className="aspect-video bg-[#041832]/50 rounded-lg flex items-center justify-center hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300 overflow-hidden group">
              <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300 font-be-vietnam-pro">Gameplay demo</span>
            </div>
            <div className="aspect-video bg-[#041832]/50 rounded-lg flex items-center justify-center hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300 overflow-hidden group">
              <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300 font-be-vietnam-pro">Behind-the-scenes</span>
            </div>
            <div className="aspect-video bg-[#041832]/50 rounded-lg flex items-center justify-center hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300 overflow-hidden group">
              <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300 font-be-vietnam-pro">Character showcases</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-blue-bright)]/30 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-be-vietnam-pro text-shadow-sm">Artwork</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-[#041832]/50 rounded-lg flex items-center justify-center hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300 overflow-hidden group">
              <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300 font-be-vietnam-pro">Key visual</span>
            </div>
            <div className="aspect-square bg-[#041832]/50 rounded-lg flex items-center justify-center hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300 overflow-hidden group">
              <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300 font-be-vietnam-pro">Character designs</span>
            </div>
            <div className="aspect-square bg-[#041832]/50 rounded-lg flex items-center justify-center hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300 overflow-hidden group">
              <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300 font-be-vietnam-pro">Environment art</span>
            </div>
            <div className="aspect-square bg-[#041832]/50 rounded-lg flex items-center justify-center hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300 overflow-hidden group">
              <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300 font-be-vietnam-pro">Concept art</span>
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
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-blue-bright)]/30 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-be-vietnam-pro text-shadow-sm">PR Manager</h3>
          <ul className="space-y-3 font-be-vietnam-pro">
            <li className="flex items-start hover:bg-white/5 rounded-lg p-2 transition-colors duration-300">
              <span className="text-white/70 font-medium w-40">Tên:</span>
              <span className="text-white">[Tên PR Manager]</span>
            </li>
            <li className="flex items-start hover:bg-white/5 rounded-lg p-2 transition-colors duration-300">
              <span className="text-white/70 font-medium w-40">Email:</span>
              <span className="text-white">pr@msci.game</span>
            </li>
            <li className="flex items-start hover:bg-white/5 rounded-lg p-2 transition-colors duration-300">
              <span className="text-white/70 font-medium w-40">Phone:</span>
              <span className="text-white">[Số điện thoại]</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-blue-bright)]/30 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-be-vietnam-pro text-shadow-sm">Social Media</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <a href="#" className="flex flex-col items-center bg-[#041832]/50 p-4 rounded-lg hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300">
              <FaTwitter className="h-8 w-8 text-cyan-400 mb-2 animate-float" />
              <span className="text-white font-be-vietnam-pro">@MSCIGame</span>
            </a>
            <a href="#" className="flex flex-col items-center bg-[#041832]/50 p-4 rounded-lg hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300">
              <FaFacebookF className="h-8 w-8 text-cyan-400 mb-2 animate-float animation-delay-500" />
              <span className="text-white font-be-vietnam-pro">/MSCIOfficial</span>
            </a>
            <a href="#" className="flex flex-col items-center bg-[#041832]/50 p-4 rounded-lg hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300">
              <FaYoutube className="h-8 w-8 text-cyan-400 mb-2 animate-float animation-delay-1000" />
              <span className="text-white font-be-vietnam-pro">/MSCIOfficial</span>
            </a>
            <a href="#" className="flex flex-col items-center bg-[#041832]/50 p-4 rounded-lg hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300">
              <FaDiscord className="h-8 w-8 text-cyan-400 mb-2 animate-float animation-delay-1500" />
              <span className="text-white font-be-vietnam-pro">Discord</span>
            </a>
            <a href="#" className="flex flex-col items-center bg-[#041832]/50 p-4 rounded-lg hover:bg-[#041832]/70 transition-all border border-cyan-500/20 hover:border-cyan-500/40 transform hover:scale-105 duration-300">
              <FaTelegram className="h-8 w-8 text-cyan-400 mb-2 animate-float animation-delay-2000" />
              <span className="text-white font-be-vietnam-pro">Telegram</span>
            </a>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-blue-bright)]/30 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-be-vietnam-pro text-shadow-sm">Yêu Cầu Phỏng Vấn</h3>
          <p className="text-white/80 mb-4 font-be-vietnam-pro">Vui lòng gửi email đến press@msci.game với tiêu đề "Interview Request - [Tên Tổ Chức]"</p>
          <a 
            href="mailto:press@msci.game?subject=Interview Request" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white rounded-lg border border-cyan-500/30 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all button-cyber clip-hexagon hexagon-border"
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
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-blue-bright)]/30 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-be-vietnam-pro text-shadow-sm">Kỹ Thuật</h3>
          <ul className="space-y-3 font-be-vietnam-pro">
            <li className="flex items-start hover:bg-white/5 rounded-lg p-2 transition-colors duration-300">
              <span className="text-white/70 font-medium w-40">Engine:</span>
              <span className="text-white">Unity</span>
            </li>
            <li className="flex items-start hover:bg-white/5 rounded-lg p-2 transition-colors duration-300">
              <span className="text-white/70 font-medium w-40">Đồ họa:</span>
              <span className="text-white">2D Spine Animation + 3D Elements</span>
            </li>
            <li className="flex items-start hover:bg-white/5 rounded-lg p-2 transition-colors duration-300">
              <span className="text-white/70 font-medium w-40">Dung lượng:</span>
              <span className="text-white">~500MB</span>
            </li>
            <li className="flex items-start hover:bg-white/5 rounded-lg p-2 transition-colors duration-300">
              <span className="text-white/70 font-medium w-40">Yêu cầu:</span>
              <span className="text-white">Android 7.0+ / iOS 12+</span>
            </li>
            <li className="flex items-start hover:bg-white/5 rounded-lg p-2 transition-colors duration-300">
              <span className="text-white/70 font-medium w-40">Ngôn ngữ:</span>
              <span className="text-white">Tiếng Việt, English, 日本語, 한국어</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-blue-bright)]/30 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-be-vietnam-pro text-shadow-sm">Kinh Doanh</h3>
          <ul className="space-y-3 font-be-vietnam-pro">
            <li className="flex items-start hover:bg-white/5 rounded-lg p-2 transition-colors duration-300">
              <span className="text-white/70 font-medium w-40">Mô hình:</span>
              <span className="text-white">Free-to-Play</span>
            </li>
            <li className="flex items-start hover:bg-white/5 rounded-lg p-2 transition-colors duration-300">
              <span className="text-white/70 font-medium w-40">Monetization:</span>
              <span className="text-white">In-App Purchase, Battle Pass</span>
            </li>
            <li className="flex items-start hover:bg-white/5 rounded-lg p-2 transition-colors duration-300">
              <span className="text-white/70 font-medium w-40">Blockchain:</span>
              <span className="text-white">Token $MSCI, NFT marketplace</span>
            </li>
            <li className="flex items-start hover:bg-white/5 rounded-lg p-2 transition-colors duration-300">
              <span className="text-white/70 font-medium w-40">Target Market:</span>
              <span className="text-white">SEA, Global</span>
            </li>
          </ul>
        </div>
        
        <div className="text-center mt-10">
          <p className="text-white/50 text-sm font-be-vietnam-pro">*Cập nhật lần cuối: [Tháng/Năm]*</p>
          <p className="text-white/50 text-sm mt-2 font-be-vietnam-pro">© 2024 M-SCI. All rights reserved.</p>
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
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-blue-bright)]/30 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-be-vietnam-pro text-shadow-sm">Hướng Dẫn Sử Dụng Press Kit</h3>
          <p className="text-white/80 mb-4 font-be-vietnam-pro">Khi sử dụng tài liệu từ M-SCI Press Kit, vui lòng tuân thủ các hướng dẫn sau:</p>
          
          <div className="space-y-4 font-be-vietnam-pro">
            <div className="p-4 bg-gradient-to-r from-[#041832]/50 to-transparent rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:translate-x-2">
              <h4 className="text-lg font-semibold text-white mb-2">Sử Dụng Logo</h4>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>Không thay đổi tỷ lệ hoặc màu sắc của logo</li>
                <li>Đảm bảo logo hiển thị rõ ràng trên nền</li>
                <li>Không đặt logo gần với nội dung không phù hợp</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-[#041832]/50 to-transparent rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:translate-x-2">
              <h4 className="text-lg font-semibold text-white mb-2">Sử Dụng Hình Ảnh</h4>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>Luôn ghi rõ nguồn gốc "© M-SCI"</li>
                <li>Không chỉnh sửa nội dung chính của hình ảnh</li>
                <li>Sử dụng hình ảnh đúng ngữ cảnh</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-[#041832]/50 to-transparent rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:translate-x-2">
              <h4 className="text-lg font-semibold text-white mb-2">Trích Dẫn & Thông Tin</h4>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>Trích dẫn đầy đủ và chính xác</li>
                <li>Không sửa đổi nội dung phỏng vấn mà không có sự cho phép</li>
                <li>Liên hệ PR team khi cần xác minh thông tin</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-white/80 italic font-be-vietnam-pro">Nếu có bất kỳ thắc mắc nào về việc sử dụng tài liệu, vui lòng liên hệ với đội ngũ PR của chúng tôi qua email: <a href="mailto:pr@msci.game" className="text-cyan-400 hover:underline">pr@msci.game</a></p>
          </div>
        </div>
      </div>
    ),
  },
];

export default pressSections; 