import React from 'react';
import Image from 'next/image';

export default function DownloadTelegram() {
  return (
    <section id="download" className="relative group">
      {/* Nền hiệu ứng */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 blur-xl opacity-50 group-hover:opacity-75 transition duration-700"></div>
      
      {/* Nội dung chính */}
      <div className="relative">
        <div className="cyberpunk-card bg-gray-900/90 rounded-lg border border-blue-500/30 backdrop-blur-sm overflow-hidden">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="lg:w-1/2 order-2 lg:order-1 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-5 bg-cyan-500"></div>
                    <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      Chơi Ngay Trên Telegram
                    </h2>
                  </div>
                  
                  <p className="text-blue-100 font-be-vietnam-pro leading-relaxed">
                    M-SCI hiện đã có mặt trên Telegram Mini App!
                    Chỉ cần một click để bắt đầu hành trình của bạn.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 border border-blue-500/20 rounded-lg p-5">
                  <h3 className="text-xl font-semibold text-cyan-300 mb-4 font-orbitron">
                    Ưu Điểm Khi Chơi Trên Telegram:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Không cần tải về, chơi ngay lập tức',
                      'Đồng bộ tài khoản Telegram',
                      'Nhận thông báo sự kiện nhanh chóng',
                      'Kết nối với cộng đồng dễ dàng',
                      'Hoàn toàn MIỄN PHÍ'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-3 group">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gray-800 border border-blue-500 flex items-center justify-center group-hover:bg-blue-900/50 transition duration-300">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:scale-125 transition duration-300"></div>
                        </div>
                        <span className="text-blue-100 group-hover:text-cyan-200 transition duration-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-center lg:justify-start pt-4">
                  <a 
                    href="https://t.me/musksci_bot/game" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative inline-block group clip-hexagon"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 animate-pulse-subtle"></span>
                    <span className="relative block bg-gray-900 hover:bg-gray-800/80 text-white font-orbitron px-8 py-4 transition-colors duration-300 uppercase tracking-wide clip-hexagon">
                      <span className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1 .22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.02-.1.02-1.62 1.03-4.58 3.03-.43.3-.83.45-1.18.44-.39-.01-1.13-.22-1.68-.4-.68-.23-1.22-.35-1.17-.74.03-.2.3-.4.82-.62 3.23-1.4 5.37-2.32 6.44-2.78 3.06-1.31 3.7-1.54 4.12-1.54.1 0 .3.02.42.09.11.06.19.19.2.34.02.15.01.35-.01.49z"/>
                        </svg>
                        <span>CHƠI NGAY TRÊN TELEGRAM</span>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
              
              <div className="lg:w-1/2 order-1 lg:order-2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-700"></div>
                  <div className="relative">
                    <div className="aspect-square max-w-md mx-auto">
                      <div className="w-full h-full relative">
                        <Image 
                          src="/images/home/FS-img/play_g.png" 
                          alt="M-SCI Game" 
                          width={500}
                          height={500}
                          className="rounded-xl border border-blue-500/30 object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 border border-blue-400/30 rounded-xl"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50 rounded-xl"></div>
                        <div className="absolute -bottom-5 -right-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg transform rotate-6 shadow-lg font-orbitron">
                          Free!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative corner effects */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-500/50"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-500/50"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/50"></div>
        </div>
      </div>
    </section>
  );
} 