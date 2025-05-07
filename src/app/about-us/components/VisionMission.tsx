"use client";

import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

export default function VisionMission() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 relative">
      {/* Background effect */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--accent-blue-bright)]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--accent-blue-bright)]/5 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Vision */}
      <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 transform hover:-translate-y-1 group relative overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-500">
          <Image 
            src="/images/particle_overlay.svg" 
            alt="Particle effect"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex items-center mb-4 relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] flex items-center justify-center mr-4 group-hover:shadow-lg group-hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500">
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="font-orbitron text-xl font-bold text-white">VISION</h3>
        </div>
        
        <div className="ml-16 flex items-start gap-6">
          <div className="flex-1">
            <p className="text-gray-300 leading-relaxed">
              To become Vietnam's leading game studio, pioneering the integration of blockchain technology with AAA gaming experiences,
              creating a sustainable and fair gaming ecosystem for all players.
            </p>
          </div>
          <div className="hidden md:block w-28 h-28 relative rounded-lg overflow-hidden flex-shrink-0">
            <Image 
              src="/images/like.jpg" 
              alt="Vision"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Mission */}
      <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 transform hover:-translate-y-1 group relative overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-500">
          <Image 
            src="/images/particle_overlay.svg" 
            alt="Particle effect"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex items-center mb-4 relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] flex items-center justify-center mr-4 group-hover:shadow-lg group-hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500">
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </div>
          <h3 className="font-orbitron text-xl font-bold text-white">MISSION</h3>
        </div>
        
        <div className="ml-16 flex items-start gap-6">
          <div className="flex-1">
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Build high-quality games with immersive storylines</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Create a connected and dynamic gaming community</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Innovate game development model with community focus</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Apply blockchain technology responsibly</span>
              </li>
            </ul>
          </div>
          <div className="hidden md:block w-28 h-28 relative rounded-lg overflow-hidden flex-shrink-0">
            <Image 
              src="/images/new.jpg" 
              alt="Mission"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 