"use client";

import Image from "next/image";

export default function FeatureSection() {
  return (
    <section className="py-16 sm:py-24 px-4 md:px-8 bg-[var(--bg-darker)] text-white relative scanline transition-all duration-300">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[var(--bg-dark)] to-transparent"></div>
        <div className="absolute -right-64 top-1/4 w-96 h-96 rounded-full bg-[var(--accent-blue-glow)]/20 blur-3xl"></div>
        <div className="absolute -left-64 bottom-1/4 w-96 h-96 rounded-full bg-[var(--accent-orange-bright)]/15 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="inline-block text-6xl font-extrabold text-white mb-8 relative cyber-halo">
            <span className="text-shadow-blue relative inline-block">
              BEST OF GAME 2025
              <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            M-SCI là game hành động đội nhóm miễn phí, diễn ra trong một tương lai đầy lạc quan, nơi mỗi trận đấu là cuộc chiến 5v5 đỉnh cao
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
          <div className="bg-gradient-to-b from-[var(--bg-accent-dark)] to-[var(--bg-darker)] p-8 rounded-2xl transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-[var(--vaiTroDamage)]/30 reveal-left delay-1 card-neon">
            <div className="relative h-56 mb-6 overflow-hidden rounded-xl">
              <Image
                src="/images/free.jpg"
                alt="Miễn phí"
                fill
                className="object-cover transform hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 bg-[var(--accent-blue-bright)]/80 text-white font-bold py-1 px-4 rounded-full text-sm backdrop-blur-sm">MIỄN PHÍ</div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[var(--accent-blue-bright)]">MIỄN PHÍ</h3>
            <p className="text-white/90 text-lg">
              M-SCI là game miễn phí, luôn hoạt động và liên tục phát triển. Tập hợp bạn bè không phân biệt nền tảng và nhảy vào trải nghiệm PvP được thiết kế lại.
            </p>
          </div>
          
          {/* Thêm 2 feature cards khác tương tự */}
        </div>
      </div>
    </section>
  );
} 