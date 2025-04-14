"use client";

import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (

    
    <section className="relative py-20 sm:py-24 overflow-hidden animated-gradient-bg scanline transition-all duration-300">
      {/* Background với hiệu ứng */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-[#0d2e4b] to-[#071a2e] z-0">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#1A2526] to-transparent"></div>
        <div className="absolute w-full h-full overflow-hidden">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-3xl -top-20 -left-20 animate-pulse-slow"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[var(--overwatch-blue)]/20 blur-2xl right-10 top-1/2 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="absolute w-[200px] h-[200px] rounded-full bg-blue-500/20 blur-xl bottom-10 left-1/4 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>
      </div>
      
      {/* Overwatch logo watermark */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 opacity-5">
        <div className="relative w-full h-full">
          <Image 
            src="/images/overwatch_logo.png" 
            alt="Game Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      {/* Nội dung */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-left reveal-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Tham Gia <span className="text-[var(--overwatch-blue)] cyber-halo">M-SCI</span> Ngay Hôm Nay!
            </h2>
            <p className="text-lg text-white/80 mb-6">
              Hãy tham gia cùng hàng triệu người chơi trên khắp thế giới trong trải nghiệm chiến đấu đội nhóm hấp dẫn nhất. Game hoàn toàn miễn phí và sẵn sàng để chơi trên mọi nền tảng.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link 
                href="/duong_dan/anh_hung" 
                className="inline-block bg-gradient-to-r from-[var(--overwatch-blue)] to-[#1a73e8] text-white font-bold py-4 px-8 rounded-md text-lg uppercase tracking-wider hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 btn-shine clip-hexagon button-cyber"
              >
                Tải Game Ngay
              </Link>
              <Link 
                href="/duong_dan/anh_hung" 
                className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-md text-lg uppercase tracking-wider hover:bg-white/20 transition-all duration-300 clip-hexagon hexagon-border"
              >
                Tìm Hiểu Thêm
              </Link>
            </div>
            
            {/* Social media icons */}
            <div className="mt-6">
              <p className="text-white/60 mb-4">Theo dõi chúng tôi trên mạng xã hội:</p>
              <div className="flex space-x-4">
                {/* Social media links */}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end reveal-right">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full bg-[var(--overwatch-blue)]/30 blur-xl animate-pulse-slow"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[var(--overwatch-blue)]/20 shadow-2xl shadow-blue-500/30">
                <div className="absolute inset-4 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 