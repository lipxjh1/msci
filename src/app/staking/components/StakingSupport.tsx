'use client';

export default function StakingSupport() {
  return (
    <div className="mb-8 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            HỖ TRỢ STAKING
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 group">
          <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-4 font-rajdhani tracking-wide flex items-center">
            <span className="inline-block w-8 h-8 mr-2 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            Liên Hệ
          </h3>
          
          <div className="space-y-4 text-white">
            <div className="flex items-center">
              <span className="inline-block w-8 h-8 mr-3 rounded-full bg-[var(--accent-blue-bright)]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <div className="text-white/60 text-sm">Email</div>
                <div className="font-medium font-rajdhani">staking@msci.game</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="inline-block w-8 h-8 mr-3 rounded-full bg-[var(--accent-blue-bright)]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
              <div>
                <div className="text-white/60 text-sm">Telegram</div>
                <div className="font-medium font-rajdhani">t.me/MSCIStaking</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="inline-block w-8 h-8 mr-3 rounded-full bg-[var(--accent-blue-bright)]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </span>
              <div>
                <div className="text-white/60 text-sm">Discord</div>
                <div className="font-medium font-rajdhani">#staking-support</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="inline-block w-8 h-8 mr-3 rounded-full bg-[var(--accent-blue-bright)]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <div>
                <div className="text-white/60 text-sm">Hotline</div>
                <div className="font-medium font-rajdhani">1900-xxxx</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="bg-gradient-to-r from-[var(--accent-blue-bright)]/10 to-[var(--accent-blue-glow)]/10 p-4 rounded-lg border border-[var(--accent-blue-bright)]/20">
              <p className="text-white/80 text-sm">
                Đội ngũ hỗ trợ của chúng tôi hoạt động từ 9:00 - 18:00 (GMT+7) từ thứ 2 đến thứ 6. Thời gian phản hồi thông thường trong vòng 24 giờ.
              </p>
            </div>
          </div>
        </div>
        
        {/* Documentation */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 group">
          <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-4 font-rajdhani tracking-wide flex items-center">
            <span className="inline-block w-8 h-8 mr-2 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            Tài Liệu Hướng Dẫn
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            <a href="#" className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[var(--accent-blue-bright)]/30 transition-all group">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani group-hover:text-[var(--accent-blue-bright)] transition-colors">Video hướng dẫn staking</div>
                <div className="text-white/60 text-sm">Xem hướng dẫn chi tiết từng bước</div>
              </div>
            </a>
            
            <a href="#" className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[var(--accent-blue-bright)]/30 transition-all group">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani group-hover:text-[var(--accent-blue-bright)] transition-colors">Whitepaper chi tiết</div>
                <div className="text-white/60 text-sm">Tìm hiểu sâu về cơ chế staking</div>
              </div>
            </a>
            
            <a href="#" className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[var(--accent-blue-bright)]/30 transition-all group">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani group-hover:text-[var(--accent-blue-bright)] transition-colors">Smart contract docs</div>
                <div className="text-white/60 text-sm">Thông tin kỹ thuật và mã nguồn</div>
              </div>
            </a>
            
            <a href="#" className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[var(--accent-blue-bright)]/30 transition-all group">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani group-hover:text-[var(--accent-blue-bright)] transition-colors">FAQ mở rộng</div>
                <div className="text-white/60 text-sm">Câu hỏi và trả lời chi tiết</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Closing Message */}
      <div className="mt-8 text-center">
        <div className="italic text-white/80 text-sm max-w-3xl mx-auto">
          <em>Staking không chỉ là cách kiếm thêm thu nhập - đó là cam kết dài hạn với sự phát triển của M-SCI. Hãy cùng xây dựng tương lai game Việt!</em>
        </div>
        <div className="mt-4 text-white/50 text-xs">
          © 2024 M-SCI. All rights reserved.
        </div>
      </div>
    </div>
  );
} 