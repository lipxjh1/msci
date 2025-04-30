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
            M-SCI is a tactical sci-fi action game set in 2049, where technology and humanity clash on a global scale. Join the M-SCI forces to protect mankind against the threat of The Ascended and their robot army.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
          <div className="bg-gradient-to-b from-[var(--bg-accent-dark)] to-[var(--bg-darker)] p-8 rounded-2xl transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-[var(--vaiTroDamage)]/30 reveal-left delay-1 card-neon">
            <div className="relative h-56 mb-6 overflow-hidden rounded-xl">
              <Image
                src="/images/home/FS-img/free.png"
                alt="Free to Play"
                fill
                className="object-cover transform hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 bg-[var(--accent-blue-bright)]/80 text-white font-bold py-1 px-4 rounded-full text-sm backdrop-blur-sm">FREE TO PLAY</div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[var(--accent-blue-bright)]">FREE</h3>
            <p className="text-white/90 text-lg">
              M-SCI is a free-to-play third-person shooter with accessible yet skill-based gameplay. Control a squad of 3 heroes from different classes (Gunner, Sniper, Rocket) to eliminate enemies in fast-paced 30-second missions.
            </p>
          </div>
          <div className="bg-gradient-to-b from-[var(--bg-accent-dark)] to-[var(--bg-darker)] p-8 rounded-2xl transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-[var(--vaiTroSupport)]/30 reveal delay-2 card-neon">
            <div className="relative h-56 mb-6 overflow-hidden rounded-xl">
              <Image
                src="/images/home/FS-img/hero.png"
                alt="Heroes"
                fill
                className="object-cover transform hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 bg-[var(--accent-blue-bright)]/80 text-white font-bold py-1 px-4 rounded-full text-sm backdrop-blur-sm">HEROES</div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[var(--accent-blue-bright)]">HEROES</h3>
            <p className="text-white/90 text-lg">
              Discover a diverse roster of heroes from Common (C) to Legendary (S) with unique abilities. Participate in World Boss events and Guild Wars while building powerful teams through level upgrades, star enhancements, and character evolution.
            </p>
          </div>
          <div className="bg-gradient-to-b from-[var(--bg-accent-dark)] to-[var(--bg-darker)] p-8 rounded-2xl transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-[var(--vaiTroTank)]/30 reveal-right delay-3 card-neon">
            <div className="relative h-56 mb-6 overflow-hidden rounded-xl">
              <Image
                src="/images/home/FS-img/play_g.png"
                alt="Play Game"
                fill
                className="object-cover transform hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 bg-[var(--accent-blue-bright)]/80 text-white font-bold py-1 px-4 rounded-full text-sm backdrop-blur-sm">GAMEPLAY</div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[var(--accent-blue-bright)]">GAME ECONOMY</h3>
            <p className="text-white/90 text-lg">
              Experience a dynamic game economy with the Center Market where you can trade characters, items, and tokens. Join Guilds to receive power buffs, team up with allies to conquer Guild Bosses, and compete in thrilling Guild Wars.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 