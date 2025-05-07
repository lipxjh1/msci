import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';

export const LienHeSection = (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">PR Manager</h3>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-full flex items-center justify-center border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h4 className="text-lg font-medium text-white">Nguyễn Minh Quân</h4>
              <p className="text-white/50">PR & Marketing Manager</p>
            </div>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-white/50 text-sm">Email:</p>
                <a href="mailto:pr@msci.game" className="text-white hover:text-cyan-400 transition-colors">pr@msci.game</a>
              </div>
            </li>
            
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-white/50 text-sm">Điện thoại:</p>
                <a href="tel:+84987654321" className="text-white hover:text-cyan-400 transition-colors">+84 987 654 321</a>
              </div>
            </li>
            
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-white/50 text-sm">Skype/Zoom:</p>
                <p className="text-white">@msci.pr.team</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Yêu Cầu Phỏng Vấn</h3>
        <p className="text-white/80 mb-6 leading-relaxed">
          Vui lòng gửi email đến <a href="mailto:press@msci.game" className="text-cyan-400 hover:underline">press@msci.game</a> với 
          tiêu đề "Interview Request - [Tên Tổ Chức]" và các thông tin sau:
        </p>
        
        <div className="bg-white/5 rounded-lg p-5 mb-6">
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Tên đơn vị báo chí / truyền thông</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Thông tin người phỏng vấn</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Chủ đề và phạm vi cuộc phỏng vấn</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Định dạng phỏng vấn (email, video, trực tiếp)</span>
            </li>
            <li className="flex items-start">
              <div className="text-cyan-400 mr-2">•</div>
              <span>Thời gian dự kiến và thời lượng</span>
            </li>
          </ul>
        </div>
        
        <a 
          href="mailto:press@msci.game?subject=Interview Request" 
          className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white rounded-lg border border-cyan-500/30 hover:border-cyan-500/50 transition-all"
        >
          Gửi Email Ngay
        </a>
      </div>
    </div>
    
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Social Media</h3>
      <p className="text-white/80 mb-6 leading-relaxed">
        Kết nối với M-SCI trên các nền tảng mạng xã hội để cập nhật tin tức và sự kiện mới nhất:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <a href="#" className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition-all group border border-white/10 hover:border-blue-500/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40">
              <FaTwitter className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="flex-grow">
              <h4 className="text-white font-medium">Twitter</h4>
              <p className="text-white/50 text-sm">@MSCIGame</p>
            </div>
          </div>
        </a>
        
        <a href="#" className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition-all group border border-white/10 hover:border-blue-500/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40">
              <FaFacebookF className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-grow">
              <h4 className="text-white font-medium">Facebook</h4>
              <p className="text-white/50 text-sm">/MSCIOfficial</p>
            </div>
          </div>
        </a>
        
        <a href="#" className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition-all group border border-white/10 hover:border-red-500/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-900/30 to-pink-900/30 rounded-lg flex items-center justify-center border border-red-500/20 group-hover:border-red-500/40">
              <FaYoutube className="h-6 w-6 text-red-400" />
            </div>
            <div className="flex-grow">
              <h4 className="text-white font-medium">YouTube</h4>
              <p className="text-white/50 text-sm">/MSCIOfficial</p>
            </div>
          </div>
        </a>
        
        <a href="#" className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition-all group border border-white/10 hover:border-indigo-500/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg flex items-center justify-center border border-indigo-500/20 group-hover:border-indigo-500/40">
              <FaDiscord className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="flex-grow">
              <h4 className="text-white font-medium">Discord</h4>
              <p className="text-white/50 text-sm">discord.gg/msci</p>
            </div>
          </div>
        </a>
        
        <a href="#" className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition-all group border border-white/10 hover:border-blue-500/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40">
              <FaTelegram className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-grow">
              <h4 className="text-white font-medium">Telegram</h4>
              <p className="text-white/50 text-sm">t.me/MSCIOfficial</p>
            </div>
          </div>
        </a>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all shadow-lg">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/4 p-4 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="w-full md:w-3/4 p-4">
          <h3 className="text-xl font-bold text-cyan-400 mb-2 text-center md:text-left font-rajdhani">Lịch Phát Hành Và Sự Kiện</h3>
          <p className="text-white/80 leading-relaxed mb-4">
            Đăng ký để nhận thông báo về các sự kiện báo chí, phát hành game và cập nhật quan trọng của M-SCI.
            Chúng tôi sẽ gửi cho bạn thông tin nổi bật và tài liệu độc quyền trước khi công bố rộng rãi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Email của bạn" 
              className="px-4 py-2 bg-white/10 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500/50 text-white w-full" 
            />
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all whitespace-nowrap">
              Đăng Ký
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
); 