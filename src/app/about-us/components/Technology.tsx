"use client";

import { FaCode } from "react-icons/fa";
import Image from "next/image";

export default function Technology() {
  return (
    <div className="mb-16 relative">
      {/* Background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[var(--accent-blue-bright)]/5 to-transparent opacity-70 rounded-3xl"></div>
      </div>
      
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            TECHNOLOGY & INNOVATION
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      {/* Technology background image */}
      <div className="relative w-full h-48 mb-10 rounded-xl overflow-hidden">
        <Image 
          src="/images/overwatch_bg_2.webp" 
          alt="Technology background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041019]/80 via-transparent to-[#041019]/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-xl md:text-2xl font-bold text-center max-w-3xl px-4">
            "Technology is the foundation, <span className="text-[var(--accent-blue-bright)]">creativity</span> is the soul, <span className="text-[var(--accent-blue-bright)]">community</span> is the driving force"
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Game Engine */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-10">
            <Image 
              src="/images/particle_overlay.png" 
              alt="Particle overlay"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4 group-hover:from-[var(--accent-blue-bright)]/40 group-hover:to-[var(--accent-blue-glow)]/40 transition-all duration-500">
              <FaCode className="w-8 h-8 text-[var(--accent-blue-bright)]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Game Engine</h3>
            <p className="text-gray-300">
              Using Unity Engine with 2D Spine Animation techniques combined with 3D, optimized for mobile to deliver a smooth experience on all devices.
            </p>
            
            <div className="mt-4 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)]/30 to-transparent"></div>
            
            <div className="mt-4 relative h-24 w-full overflow-hidden rounded-lg">
              <Image 
                src="/images/tank_hero.png" 
                alt="Game Engine Technology"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Blockchain Integration */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-10">
            <Image 
              src="/images/particle_overlay.png" 
              alt="Particle overlay"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4 group-hover:from-[var(--accent-blue-bright)]/40 group-hover:to-[var(--accent-blue-glow)]/40 transition-all duration-500">
              <svg className="w-8 h-8 text-[var(--accent-blue-bright)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Blockchain Integration</h3>
            <p className="text-gray-300">
              Responsibly integrating blockchain technology, creating the $MSCI token ecosystem and NFTs that allow players to truly own in-game assets.
            </p>
            
            <div className="mt-4 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)]/30 to-transparent"></div>
            
            <div className="mt-4 relative h-24 w-full overflow-hidden rounded-lg">
              <Image 
                src="/images/damage_hero.png" 
                alt="Blockchain Technology"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* AI & Machine Learning */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-10">
            <Image 
              src="/images/particle_overlay.png" 
              alt="Particle overlay"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4 group-hover:from-[var(--accent-blue-bright)]/40 group-hover:to-[var(--accent-blue-glow)]/40 transition-all duration-500">
              <svg className="w-8 h-8 text-[var(--accent-blue-bright)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">AI & Machine Learning</h3>
            <p className="text-gray-300">
              Applying AI to personalize player experiences, balance gameplay and detect cheating.
            </p>
            
            <div className="mt-4 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)]/30 to-transparent"></div>
            
            <div className="mt-4 relative h-24 w-full overflow-hidden rounded-lg">
              <Image 
                src="/images/support_hero.png" 
                alt="AI Technology"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 