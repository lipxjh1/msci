import { Metadata } from "next";
import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Download Game - M-SCI - The Battle For Humanity",
  description: "Download M-SCI game - Sci-fi game 2049, where you fight alongside Elon Musk to protect humanity",
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634] font-inter">
      <ThanhDieuHuongResponsive />

      {/* Hero section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        {/* Background image with parallax effect */}
        <div className="absolute inset-0">
          <Image
            src="/images/overwatch_bg_2.jpg"
            alt="Download Game"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a141e]/70 via-transparent to-[#0a141e] z-10"></div>

          {/* Animated particles */}
          <div className="absolute inset-0 z-10">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50 animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-200"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse delay-300"></div>
          </div>

          {/* Add scanline effect */}
          <div className="absolute inset-0 scanline"></div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mt-10">
              <h1 className="font-orbitron text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
                <span className="relative inline-block">
                  DOWNLOAD GAME
                  <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h1>
              <p className="font-roboto text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in">
                JOIN THE BATTLE FOR HUMANITY WITH ELON MUSK
              </p>
            </div>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform rotate-1 scale-110 z-20"></div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform -rotate-1 scale-110 z-20"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-10 pb-20 relative z-30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Download options */}
            <div className="bg-[#1a2634]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-xl">
              <h2 className="font-orbitron text-2xl font-bold text-white mb-6 relative inline-block">
                Download M-SCI Game
                <div className="absolute -bottom-2 left-0 h-1 w-12 bg-gradient-to-r from-[#F44336] to-transparent"></div>
              </h2>

              <div className="space-y-6">
                {/* Telegram Download */}
                <div className="bg-[#0f1923] border border-white/10 rounded-lg p-6 hover:border-[#F44336]/30 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-[#F44336]/10 border border-[#F44336]/20 mr-4">
                      <svg className="w-6 h-6 text-[#F44336]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1 .22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.02-.1.02-1.62 1.03-4.58 3.03-.43.3-.83.45-1.18.44-.39-.01-1.13-.22-1.68-.4-.68-.23-1.22-.35-1.17-.74.03-.2.3-.4.82-.62 3.23-1.4 5.37-2.32 6.44-2.78 3.06-1.31 3.7-1.54 4.12-1.54.1 0 .3.02.42.09.11.06.19.19.2.34.02.15.01.35-.01.49z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Telegram Mini App</h3>
                      <p className="text-white/70 text-sm">
                        Play now without downloading
                      </p>
                    </div>
                  </div>
                  <a 
                    href="https://t.me/MSCIChannel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-6 py-3 bg-[#0D1923] border border-[#F44336]/30 rounded-lg text-white font-medium hover:bg-[#F44336]/10 transition-colors duration-300"
                  >
                    <span className="mr-2">Play Now</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                {/* Mobile Download (Coming Soon) */}
                <div className="bg-[#0f1923] border border-white/10 rounded-lg p-6 opacity-70">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-blue-500/10 border border-blue-500/20 mr-4">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Mobile (Coming Soon)</h3>
                      <p className="text-white/70 text-sm">
                        Android & iOS - Q3 2025
                      </p>
                    </div>
                  </div>
                  <button 
                    disabled
                    className="w-full flex items-center justify-center px-6 py-3 bg-[#0D1923] border border-blue-500/30 rounded-lg text-white/50 font-medium cursor-not-allowed"
                  >
                    <span className="mr-2">Coming Soon</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>

                {/* PC Download (Coming Soon) */}
                <div className="bg-[#0f1923] border border-white/10 rounded-lg p-6 opacity-70">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-green-500/10 border border-green-500/20 mr-4">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">PC (Coming Soon)</h3>
                      <p className="text-white/70 text-sm">
                        Windows & Mac - Q4 2025
                      </p>
                    </div>
                  </div>
                  <button 
                    disabled
                    className="w-full flex items-center justify-center px-6 py-3 bg-[#0D1923] border border-green-500/30 rounded-lg text-white/50 font-medium cursor-not-allowed"
                  >
                    <span className="mr-2">Coming Soon</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Game Info */}
            <div className="space-y-8">
              {/* Game screenshot */}
              <div className="relative rounded-2xl overflow-hidden border border-white/5">
                <Image
                  src="/images/home/FS-img/play_g.png"
                  alt="M-SCI Gameplay"
                  width={600}
                  height={350}
                  className="object-cover w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a141e]/90 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-[#F44336]/80 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  Free to Play
                </div>
              </div>

              {/* Game details */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
                <h3 className="font-medium text-white text-xl mb-4 font-orbitron">Game Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-[#F44336]/10 border border-[#F44336]/20 mr-3">
                      <svg className="w-5 h-5 text-[#F44336]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Release Date</h4>
                      <p className="text-white/70">Already available on Telegram Mini App</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/20 mr-3">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Player Count</h4>
                      <p className="text-white/70">10,000+ players have joined</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-green-500/10 border border-green-500/20 mr-3">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Latest Update</h4>
                      <p className="text-white/70">v1.5.2 - New character and events added</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="text-center">
                <a 
                  href="https://t.me/MSCIChannel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 font-rajdhani font-bold tracking-wider text-shadow-sm button-cyber clip-hexagon hexagon-border text-white"
                >
                  PLAY NOW TODAY
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="bg-gradient-to-r from-[#F44336]/20 to-[#1a2634] py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-orbitron text-3xl font-bold text-white mb-4">
              Subscribe for Updates
            </h2>
            <p className="text-white/70 mb-8 font-inter">
              Receive notifications about events, new characters, gift codes and the latest M-SCI news
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 bg-[#0f1923] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F44336]/50 focus:border-transparent text-white"
              />
              <button className="px-6 py-3 font-rajdhani font-bold tracking-wider text-shadow-sm button-cyber clip-hexagon hexagon-border text-white">
                Subscribe
              </button>
            </div>

            <p className="text-white/50 text-sm mt-4 font-roboto">
              We respect your privacy. See our{" "}
              <Link href="#" className="text-[#F44336] hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 