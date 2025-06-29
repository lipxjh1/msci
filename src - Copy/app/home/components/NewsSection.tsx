"use client";

import Image from "next/image";
import Link from "next/link";

export default function NewsSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0d2e4b] to-[#050a0c] relative overflow-hidden particle-effect transition-all duration-300">
      {/* Particle elements */}
      <div className="particle" style={{ left: '10%', animationDelay: '0s' }}></div>
      <div className="particle" style={{ left: '20%', animationDelay: '1s' }}></div>
      <div className="particle" style={{ left: '35%', animationDelay: '2s' }}></div>
      <div className="particle" style={{ left: '50%', animationDelay: '0.5s' }}></div>
      <div className="particle" style={{ left: '65%', animationDelay: '1.5s' }}></div>
      <div className="particle" style={{ left: '80%', animationDelay: '2.5s' }}></div>
      <div className="particle" style={{ left: '90%', animationDelay: '0.2s' }}></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header - Centered with glow */}
        <div className="text-center mb-14 reveal-scale">
          <div className="inline-block">
            <h2 className="inline-block text-5xl font-extrabold text-white mb-6 relative cyber-halo">
              <span className="text-shadow-blue">NEWS </span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--overwatch-blue)] to-transparent"></div>
            </h2>
          </div>
          <p className="text-white/60 max-w-2xl mx-auto">
          Get the latest updates about M-SCI. From World Boss events, Guild War to giftcodes and new character updates. Follow important announcements about game feature upgrades.
          </p>
        </div>
        
        {/* Main featured news */}
        <div className="mb-12 reveal">
          <div className="bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 card-neon">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative overflow-hidden">
                <div className="relative" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                  <Image
                    src="/images/overwatch_bg_2.webp"
                    alt="Season 15 News"
                    fill
                    className="object-cover transform transition-transform duration-700 hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-[var(--overwatch-blue)] text-white text-sm font-bold px-3 py-1 rounded">LATEST</div>
                </div>
              </div>
              
              <div className="p-6 lg:p-10 flex flex-col justify-center">
                <div className="text-[var(--overwatch-blue)] font-semibold mb-3 flex items-center dot-flicker">
                  <span className="inline-block w-2 h-2 bg-[var(--overwatch-blue)] rounded-full mr-2"></span>
                  GAME UPDATE
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Season 15 Midseason: Collab, Crossbow, and Chaos</h3>
                <p className="text-white/70 mb-6">
                  Đây là đoạn tóm tắt tin tức. Nội dung này sẽ được thay bằng tóm tắt thực tế của bạn.
                </p>
                <div className="mt-auto">
                  <Link 
                    href="/tin_tuc"
                    className="inline-flex items-center text-white font-bold transition-all hover:text-[var(--overwatch-blue)] button-cyber"
                  >
                    READ MORE
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* News cards */}
        </div>
        
        {/* See all news button */}
        <div className="text-center mt-12 reveal">
          <Link 
            href="/new"
            className="inline-block bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full border border-white/10 transition-all duration-300 hover:border-[var(--overwatch-blue)]/50 hover:shadow-lg hover:shadow-blue-500/10 button-glow"
          >
            VIEW ALL NEWS
          </Link>
        </div>
      </div>
    </section>
  );
} 