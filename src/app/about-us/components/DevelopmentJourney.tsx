"use client";

import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DevelopmentJourney() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);
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
        {/* 2024 */}
        <div className={`backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-700 group hover:-translate-y-2 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
             style={{ transitionDelay: '0ms' }}>
          <div className="flex flex-col">
            <div className="bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white font-bold py-2 px-4 rounded-lg inline-block w-fit mb-4">
              2024 - Beginning
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
        
        {/* 2025 */}
        <div className={`backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-700 group hover:-translate-y-2 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
             style={{ transitionDelay: '150ms' }}>
          <div className="flex flex-col">
            <div className="bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white font-bold py-2 px-4 rounded-lg inline-block w-fit mb-4">
              2025 - Development & Expansion
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
        
        {/* 2026 */}
        <div className={`backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-700 group hover:-translate-y-2 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
             style={{ transitionDelay: '300ms' }}>
          <div className="flex flex-col">
            <div className="bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white font-bold py-2 px-4 rounded-lg inline-block w-fit mb-4">
              2026 - Future
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