"use client";

import { useState, useEffect } from "react";
// import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

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
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  const [hoveredHero, setHoveredHero] = useState<number | null>(null);

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

  // Debug image paths
  useEffect(() => {
    console.log("Hero image paths:", heroSamples.map(hero => hero.image));
  }, []);

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
          M-SCI có dàn nhân vật phong phú với 4 bậc độ hiếm: Common (C), Rare (B), Epic (A) và Legendary (S). Mỗi hero thuộc một trong ba class (Gunner, Sniper, Rocket) với vai trò và thế mạnh riêng để đối phó với các loại kẻ địch khác nhau.
          </p>
        </div>
        
        {/* Role selector tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-none reveal">
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
                  <div 
                    className={`relative w-full h-full rounded-lg overflow-hidden group border-2 ${getRoleBorderClass(hero.role)} transition-all duration-300`}
                    onMouseEnter={() => setHoveredHero(hero.id)}
                    onMouseLeave={() => setHoveredHero(null)}
                  >
                    <div className="w-full h-full relative">
                      <img 
                        src={hoveredHero === hero.id ? hero.shootImage : hero.image}
                        alt={`Anh hùng ${hero.name}`}
                        className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = `https://placehold.co/300x400/111827/F5F5F5?text=${encodeURIComponent(hero.name)}`;
                          console.error(`Failed to load image: ${hoveredHero === hero.id ? hero.shootImage : hero.image}`);
                          setImagesLoaded(prev => ({ ...prev, [hero.id]: false }));
                        }}
                        onLoad={() => {
                          console.log(`Successfully loaded image: ${hoveredHero === hero.id ? hero.shootImage : hero.image}`);
                          setImagesLoaded(prev => ({ ...prev, [hero.id]: true }));
                        }}
                      />
                    </div>
                    {!imagesLoaded[hero.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <span className="text-white">Đang tải...</span>
                      </div>
                    )}
                    
                    {/* Hero info overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs text-white ${getRoleColorClass(hero.role)}`}>
                          {hero.role}
                        </span>
                        <div className={`w-8 h-8 rounded-full ${getRoleColorClass(hero.role)} flex items-center justify-center`}>
                          <span className="text-white text-xs font-bold">{hero.id}</span>
                        </div>
                      </div>
                      <h3 className={`text-xl font-bold text-white group-hover:${getRoleTextClass(hero.role)} transition-colors`}>{hero.name}</h3>
                      <p className="text-xs text-gray-300 mt-1 line-clamp-2">{hero.description}</p>
                      <div className="flex items-center mt-2 text-xs text-[var(--accent-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Xem chi tiết</span>
                        <FiChevronRight className="ml-1 w-3 h-3" />
                      </div>
                    </div>
                    
                    {/* Cyberpunk border effect */}
                    <div className="absolute inset-0 cyberpunk-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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