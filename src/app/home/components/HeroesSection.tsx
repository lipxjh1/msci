"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const roles = ["Tất cả", "Tấn công", "Hỗ trợ", "Phòng thủ"];

// Mảng các anh hùng mẫu
const heroSamples = [
  { id: 1, name: "Tracer", role: "Tấn công" },
  { id: 2, name: "Reinhardt", role: "Phòng thủ" },
  { id: 3, name: "Mercy", role: "Hỗ trợ" },
  { id: 4, name: "Genji", role: "Tấn công" },
  { id: 5, name: "Winston", role: "Phòng thủ" },
  { id: 6, name: "Ana", role: "Hỗ trợ" },
  { id: 7, name: "Reaper", role: "Tấn công" },
  { id: 8, name: "D.Va", role: "Phòng thủ" },
];

export default function HeroesSection() {
  const [activeRole, setActiveRole] = useState(0);

  // Filter heroes based on active role
  const filteredHeroes = activeRole === 0 
    ? heroSamples 
    : heroSamples.filter(hero => {
        const roleFilter = roles[activeRole];
        return hero.role === roleFilter;
      });

  // Get role color class
  const getRoleColorClass = (role: string) => {
    switch(role) {
      case "Tấn công": return "bg-[var(--vaiTroDamage)]";
      case "Hỗ trợ": return "bg-[var(--vaiTroSupport)]";
      case "Phòng thủ": return "bg-[var(--vaiTroTank)]";
      default: return "bg-[var(--accent-blue)]";
    }
  };

  // Hiệu ứng cuộn (scroll reveal)
  useEffect(() => {
    const scrollReveal = () => {
      const reveals = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
      );
      
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        } else {
          reveals[i].classList.remove('active');
        }
      }
    };
    
    window.addEventListener('scroll', scrollReveal);
    scrollReveal();
    
    return () => window.removeEventListener('scroll', scrollReveal);
  }, []);

  return (
    <section className="heroes-section relative min-h-[100vh] py-12 md:py-24 flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--bg-dark)] to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--bg-dark)] to-transparent z-10"></div>
      
      <div className="container mx-auto relative z-20 px-4">
        <div className="text-center mb-12 reveal-scale">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow-blue">Anh Hùng</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Khám phá và làm chủ những anh hùng đa dạng, mỗi người đều có khả năng và vai trò độc đáo trong chiến trường
          </p>
        </div>
        
        {/* Role selector tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-none reveal">
          <div className="flex space-x-2 sm:space-x-4 bg-[var(--bg-darker)] p-1 rounded-lg cyberpunk-border">
            {roles.map((role, index) => (
              <button
                key={role}
                onClick={() => setActiveRole(index)}
                className={`px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-300 whitespace-nowrap
                  ${activeRole === index 
                    ? 'bg-[var(--accent-blue)] text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-[var(--bg-accent-dark)]'
                  }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        
        {/* Current role display */}
        <div className="text-center mb-10 reveal">
          <div className={`inline-block px-3 py-1 rounded-full text-white text-sm ${activeRole === 0 ? 'bg-[var(--accent-blue)]' : getRoleColorClass(roles[activeRole])}`}>
            {activeRole === 0 ? 'Tất cả các anh hùng' : `Vai trò: ${roles[activeRole]}`}
          </div>
        </div>
        
        {/* Hero 3D carousel */}
        <div className="hero-banner w-full relative h-[350px] md:h-[600px] mb-12 reveal">
          <div className="hero-slider" style={{ '--quantity': filteredHeroes.length } as React.CSSProperties}>
            {filteredHeroes.map((hero, index) => (
              <div 
                key={hero.id} 
                className="hero-item" 
                style={{ '--position': index + 1 } as React.CSSProperties}
              >
                <Link href={`/hero/${hero.id}`}>
                  <div className="relative w-full h-full rounded-lg overflow-hidden group">
                    <Image 
                      src={`https://placehold.co/300x400/111827/F5F5F5?text=${encodeURIComponent(hero.name)}`}
                      alt={`Anh hùng ${hero.name}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs text-white ${getRoleColorClass(hero.role)}`}>
                          {hero.role}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[var(--accent-blue-bright)] transition-colors">{hero.name}</h3>
                      <div className="flex items-center mt-1 text-xs text-[var(--accent-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Xem chi tiết</span>
                        <FiChevronRight className="ml-1 w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        {/* Button to view more heroes */}
        <div className="text-center mt-8 mb-8 reveal">
          <Link 
            href="/heroes" 
            className="inline-flex items-center justify-center button-cyber clip-hexagon hexagon-corner-flash text-white px-10 py-3 font-bold text-lg shadow-lg shadow-[var(--accent-blue)]/10 hover:shadow-xl hover:shadow-[var(--accent-blue)]/30 transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            XEM THÊM ANH HÙNG
            <FiChevronRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
} 