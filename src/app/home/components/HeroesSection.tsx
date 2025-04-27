"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from 'react-intersection-observer';
import Link from "next/link";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";

const roles = ["Tất cả", "Gunner", "Sniper", "Rocket"];

// Mảng các anh hùng mẫu với đường dẫn ảnh đã kiểm tra
const heroSamples = [
  { 
    id: 1, 
    name: "Tracer", 
    role: "Gunner", 
    image: "/images/heroes/idle_1.png",
    shootImage: "/images/heroes/shoot1.png",
    description: "Anh hùng tấn công nhanh với khả năng dịch chuyển thời gian"
  },
  { 
    id: 2, 
    name: "Reinhardt", 
    role: "Sniper", 
    image: "/images/heroes/idle4.png",
    shootImage: "/images/heroes/shoot4.png",
    description: "Kỵ sĩ hiệp sĩ với khiên bảo vệ đồng đội"
  },
  { 
    id: 3, 
    name: "Mercy", 
    role: "Rocket", 
    image: "/images/heroes/idle6.png",
    shootImage: "/images/heroes/shoot6.png",
    description: "Thiên thần chữa thương với khả năng hồi sinh đồng đội"
  },
  { 
    id: 4, 
    name: "Genji", 
    role: "Gunner", 
    image: "/images/heroes/idle7.png",
    shootImage: "/images/heroes/shoot7.png",
    description: "Ninja cyber với khả năng phản đòn chính xác"
  },
  { 
    id: 5, 
    name: "Winston", 
    role: "Sniper", 
    image: "/images/heroes/idle8.png",
    shootImage: "/images/heroes/shoot8.png",
    description: "Khỉ đột thông minh với khiên năng lượng bảo vệ"
  },
  { 
    id: 6, 
    name: "Ana", 
    role: "Rocket", 
    image: "/images/heroes/idle9.png",
    shootImage: "/images/heroes/shoot9.png",
    description: "Xạ thủ bắn tỉa với khả năng chữa thương từ xa"
  },
  { 
    id: 7, 
    name: "Reaper", 
    role: "Gunner", 
    image: "/images/heroes/idle10.png",
    shootImage: "/images/heroes/shoot10.png",
    description: "Linh hồn bóng tối với khả năng dịch chuyển bóng tối"
  },
  { 
    id: 8, 
    name: "D.Va", 
    role: "Sniper", 
    image: "/images/heroes/idle11.png",
    shootImage: "/images/heroes/shoot11.png",
    description: "Phi công mech với khả năng bảo vệ và tấn công mạnh mẽ"
  },
];

export default function HeroesSection() {
  const [activeRole, setActiveRole] = useState(0);
  const [hoveredHero, setHoveredHero] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Filter heroes based on active role - memoized with useCallback
  const getFilteredHeroes = useCallback(() => {
    return activeRole === 0 
      ? heroSamples 
      : heroSamples.filter(hero => {
          const roleFilter = roles[activeRole];
          return hero.role === roleFilter;
        });
  }, [activeRole]);
  
  const filteredHeroes = getFilteredHeroes();

  // Get role color class
  const getRoleColorClass = (role: string) => {
    switch(role) {
      case "Gunner": return "bg-[var(--vaiTroDamage)]";
      case "Sniper": return "bg-[var(--vaiTroSupport)]";
      case "Rocket": return "bg-[var(--vaiTroTank)]";
      default: return "bg-[var(--accent-blue)]";
    }
  };

  // Get role border color class
  const getRoleBorderClass = (role: string) => {
    switch(role) {
      case "Gunner": return "border-[var(--vaiTroDamage)]";
      case "Sniper": return "border-[var(--vaiTroSupport)]";
      case "Rocket": return "border-[var(--vaiTroTank)]";
      default: return "border-[var(--accent-blue)]";
    }
  };

  // Get role text color class
  const getRoleTextClass = (role: string) => {
    switch(role) {
      case "Gunner": return "text-[var(--vaiTroDamage)]";
      case "Sniper": return "text-[var(--vaiTroSupport)]";
      case "Rocket": return "text-[var(--vaiTroTank)]";
      default: return "text-[var(--accent-blue)]";
    }
  };

  return (
    <section 
      ref={ref}
      className={`heroes-section relative min-h-[100vh] py-12 md:py-24 flex items-center justify-center overflow-hidden ${inView ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--bg-dark)] to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--bg-dark)] to-transparent z-10"></div>
      
      <div className="container mx-auto relative z-20 px-4">
        <div className={`text-center mb-12 ${inView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} transition-all duration-700 delay-300`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow-blue">Anh Hùng</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          M-SCI có dàn nhân vật phong phú với 4 bậc độ hiếm: Common (C), Rare (B), Epic (A) và Legendary (S). Mỗi hero thuộc một trong ba class (Gunner, Sniper, Rocket) với vai trò và thế mạnh riêng để đối phó với các loại kẻ địch khác nhau.
          </p>
        </div>
        
        {/* Role selector tabs */}
        <div className={`flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-none ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-500`}>
          <div className="flex space-x-2 sm:space-x-4 bg-[var(--bg-darker)] p-1 rounded-lg cyberpunk-border">
            {roles.map((role, index) => (
              <button
                key={role}
                onClick={() => setActiveRole(index)}
                suppressHydrationWarning
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
        <div className={`text-center mb-10 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-700`}>
          <div className={`inline-block px-3 py-1 rounded-full text-white text-sm ${activeRole === 0 ? 'bg-[var(--accent-blue)]' : getRoleColorClass(roles[activeRole])}`}>
            {activeRole === 0 ? 'Tất cả các anh hùng' : `Vai trò: ${roles[activeRole]}`}
          </div>
        </div>
        
        {/* Hero grid display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredHeroes.map((hero, index) => (
            <div 
              key={hero.id}
              className={`${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`}
              style={{ transitionDelay: `${700 + index * 100}ms` }}
              onMouseEnter={() => setHoveredHero(hero.id)}
              onMouseLeave={() => setHoveredHero(null)}
            >
              <Link 
                href={`/heroes/${hero.id}`}
                className={`block h-full bg-[var(--bg-accent-dark)] bg-opacity-50 rounded-xl overflow-hidden border-2 ${getRoleBorderClass(hero.role)} hover:shadow-lg transition-all duration-500 group`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-transparent to-black/30">
                  <Image
                    src={hoveredHero === hero.id ? hero.shootImage : hero.image}
                    alt={hero.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className={`text-xs font-semibold mb-1 inline-block px-2 py-0.5 rounded ${getRoleColorClass(hero.role)}`}>
                      {hero.role}
                    </div>
                    <h3 className="text-xl font-bold">{hero.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-300 text-sm line-clamp-2">{hero.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className={`text-sm font-semibold ${getRoleTextClass(hero.role)}`}>Chi tiết</span>
                    <FiChevronRight className="text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {/* See all heroes button */}
        <div className={`text-center mt-8 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-1000`}>
          <Link 
            href="/heroes" 
            className="inline-flex items-center justify-center px-8 py-3 bg-[var(--accent-blue)] text-white font-semibold rounded-md hover:bg-[var(--accent-blue-glow)] transition-colors hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/25 group"
          >
            <span>Xem tất cả anh hùng</span>
            <FiChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
} 