"use client";

import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

export default function DevelopmentJourney() {
  return (
    <div className="mb-16 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <Image 
          src="/images/grid_pattern.svg" 
          alt="Background pattern"
          fill
          className="object-cover object-center"
        />
      </div>
      
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            DEVELOPMENT JOURNEY
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      {/* Journey Timeline */}
      <div className="hidden md:block w-full h-2 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)]/30 to-transparent rounded-full mb-8 relative">
        <div className="absolute left-1/6 top-1/2 w-4 h-4 rounded-full bg-[var(--accent-blue-bright)] -translate-y-1/2 shadow-lg shadow-[var(--accent-blue-bright)]/30"></div>
        <div className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-[var(--accent-blue-bright)] -translate-y-1/2 shadow-lg shadow-[var(--accent-blue-bright)]/30"></div>
        <div className="absolute left-5/6 top-1/2 w-4 h-4 rounded-full bg-[var(--accent-blue-bright)] -translate-y-1/2 shadow-lg shadow-[var(--accent-blue-bright)]/30"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 2023 */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 group hover:-translate-y-2">
          <div className="flex flex-col">
            <div className="bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white font-bold py-2 px-4 rounded-lg inline-block w-fit mb-4">
              2023 - Beginning
            </div>
            
            <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
              <Image 
                src="/images/staking_bg.jpg" 
                alt="2023 - Beginning"
                fill
                className="object-cover object-center brightness-75 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041019]/80 to-transparent"></div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-white text-sm font-bold px-3 py-1 bg-[var(--accent-blue-bright)]/30 backdrop-blur-sm rounded inline-block">
                  Founding Team
                </div>
              </div>
            </div>
            
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Established core team with 5 members</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Developed first concept and prototype</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Received seed round funding</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 2024 */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 group hover:-translate-y-2">
          <div className="flex flex-col">
            <div className="bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white font-bold py-2 px-4 rounded-lg inline-block w-fit mb-4">
              2024 - Development & Expansion
            </div>
            
            <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
              <Image 
                src="/images/overwatch_bg_2.jpg" 
                alt="2024 - Development"
                fill
                className="object-cover object-center brightness-75 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041019]/80 to-transparent"></div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-white text-sm font-bold px-3 py-1 bg-[var(--accent-blue-bright)]/30 backdrop-blur-sm rounded inline-block">
                  Alpha Launch
                </div>
              </div>
            </div>
            
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Released Alpha version with 1000 players</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Expanded team to 20+ members</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Integrated blockchain technology</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Launched Beta with 10,000+ pre-registrations</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 2025 */}
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 group hover:-translate-y-2">
          <div className="flex flex-col">
            <div className="bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white font-bold py-2 px-4 rounded-lg inline-block w-fit mb-4">
              2025 - Future
            </div>
            
            <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
              <Image 
                src="/images/home/FS-img/hero.png" 
                alt="2025 - Future"
                fill
                className="object-cover object-center brightness-75 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041019]/80 to-transparent"></div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-white text-sm font-bold px-3 py-1 bg-[var(--accent-blue-bright)]/30 backdrop-blur-sm rounded inline-block">
                  Global Launch
                </div>
              </div>
            </div>
            
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Official global launch</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Expansion into international markets</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-[var(--accent-blue-bright)] mt-1 mr-2 flex-shrink-0" />
                <span>Development of M-SCI Universe with multiple new games</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 