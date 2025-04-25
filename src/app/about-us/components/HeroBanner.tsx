"use client";

import Image from "next/image";

export default function HeroBanner() {
  return (
    <div className="relative h-[50vh] lg:h-[70vh] w-full overflow-hidden">
      <Image 
        src="/images/overwatch_bg_2.jpg" 
        alt="About Us Hero" 
        fill
        sizes="100vw"
        priority
        className="object-cover object-center brightness-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 via-transparent to-[#041019]"></div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-4 text-shadow-blue animate-title-glow">
          VỀ CHÚNG TÔI
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent mb-6"></div>
        <p className="max-w-2xl text-lg md:text-xl text-gray-200 animate-fade-in">
          Hành trình xây dựng một vũ trụ game đột phá tại Việt Nam
        </p>
      </div>
    </div>
  );
} 