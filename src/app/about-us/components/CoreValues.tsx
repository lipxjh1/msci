"use client";

import { useState } from "react";
import { FaGamepad, FaUsers, FaLightbulb, FaBalanceScale } from "react-icons/fa";
import Image from "next/image";

export default function CoreValues() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const values = [
    {
      icon: <FaGamepad className="w-8 h-8 text-[var(--accent-blue-bright)]" />,
      title: "Gaming Passion",
      desc: "We are gamers before we are developers. Every decision stems from the player's perspective.",
      img: "/images/abous/Untitled (4).png",
      alt: "Gaming Passion"
    },
    {
      icon: <FaUsers className="w-8 h-8 text-[var(--accent-blue-bright)]" />,
      title: "Community-Focused",
      desc: "Players are not just customers - they are co-creators, an integral part of M-SCI.",
      img: "/images/abous/Untitled (7).png",
      alt: "Community Focus"
    },
    {
      icon: <FaLightbulb className="w-8 h-8 text-[var(--accent-blue-bright)]" />,
      title: "Innovation",
      desc: "Constantly seeking new solutions to enhance gaming experiences and business models.",
      img: "/images/abous/Untitled (6).png",
      alt: "Innovation"
    },
    {
      icon: <FaBalanceScale className="w-8 h-8 text-[var(--accent-blue-bright)]" />,
      title: "Fairness & Transparency",
      desc: "All game mechanics are designed to be fair, non-pay-to-win, with transparent drop rates.",
      img: "/images/abous/Untitled (3).png",
      alt: "Fairness"
    }
  ];
  return (
    <div className="mb-16 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <Image 
          src="/images/particle_overlay.png" 
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CORE VALUES
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, idx) => (
          <div
            key={v.title}
            className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-500 group hover:-translate-y-2 cursor-pointer flex flex-col items-center"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <div className="mt-4 relative w-full overflow-hidden rounded-lg aspect-[4/1]">
              <Image 
                src={v.img}
                alt={v.alt}
                fill
                className="object-cover object-center brightness-75 group-hover:brightness-90 transition-all duration-500"
              />
            </div>
            <div
              className={`transition-all duration-500 ease-in-out ${openIndex === idx ? 'opacity-100 max-h-96 mt-6' : 'opacity-0 max-h-0 mt-0 overflow-hidden'}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-glow)]/20 flex items-center justify-center mb-4 group-hover:from-[var(--accent-blue-bright)]/40 group-hover:to-[var(--accent-blue-glow)]/40 transition-all duration-500">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{v.title}</h3>
                <p className="text-gray-300">{v.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 