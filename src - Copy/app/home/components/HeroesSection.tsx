"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from 'react-intersection-observer';
import Link from "next/link";
import Image from "next/image";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useSupabase } from "@/context/SupabaseContext";
import { AnhHung, VaiTro } from "@/loai";

// Các class CSS cần thiết nếu chưa có trong global CSS
const buttonCyberClass = "relative overflow-hidden";
const clipHexagonClass = "clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)";
const hexagonCornerFlashClass = "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-white/20 after:animate-flash";

// Correct role name to UI mapping
const roles = ["All", "Gunner", "Sniper", "Rocket"];

export default function HeroesSection() {
  const supabase = useSupabase();
  const [activeRole, setActiveRole] = useState(0);
  const [hoveredHero, setHoveredHero] = useState<number | null>(null);
  const [heroes, setHeroes] = useState<AnhHung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Featured hero state
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Fetch heroes from Supabase
  useEffect(() => {
    async function fetchHeroes() {
      setLoading(true);
      setError(null);
      
      try {
        // Check Supabase connection
        const { data: testConnection, error: connectionError } = await supabase
          .from('vai_tro')
          .select('*')
          .limit(1);
        
        if (connectionError) {
          console.error('Supabase connection error:', connectionError);
          throw new Error(`Could not connect to Supabase. Details: ${connectionError.message}`);
        }
        
        // Lấy danh sách vai trò từ Supabase để đảm bảo mapping đúng
        const { data: roleData, error: roleError } = await supabase
          .from('vai_tro')
          .select('*')
          .order('id');
        
        if (roleError) {
          console.error('Error fetching roles:', roleError);
        } else {
          console.log("Database roles:", roleData);
        }
        
        // Debug: Log the role mappings to verify correctness
        console.log("Role mapping check:", { 
          UI_roles: roles,
          activeRole
        });
        
        // Build query based on selected role
        let query = supabase
          .from('anh_hung')
          .select(`
            *,
            vai_tro(id, ten, mo_ta),
            do_hi_em(id, ma, ten, mau_sac)
          `)
          .order('ten');
          
        if (activeRole !== 0) {
          // Correct mapping from UI role name to the database role ID
          // Yêu cầu mới: Đảo Sniper và Rocket
          const roleMapping: Record<string, number> = {
            "Gunner": 1, // ID 1 in database - Rocket (hiển thị là Gunner)
            "Sniper": 2, // ID 2 in database - Gunner (hiển thị là Sniper)
            "Rocket": 3  // ID 3 in database - Sniper (hiển thị là Rocket)
          };
          
          const selectedRoleId = roleMapping[roles[activeRole]];
          if (selectedRoleId) {
            console.log(`Filtering by role: ${roles[activeRole]} (ID: ${selectedRoleId})`);
            query = query.eq('vai_tro_id', selectedRoleId);
          }
        }
        
        const { data, error } = await query.limit(8); // Limit to 8 heroes for the homepage
        
        if (error) {
          console.error('Error fetching hero data:', error);
          throw new Error(`Error fetching hero data: ${error.message}`);
        }
        
        console.log("Heroes data:", data);
        
        if (!data || data.length === 0) {
          console.warn('No hero data found');
          setHeroes([]);
        } else {
          setHeroes(data as AnhHung[]);
          // Reset current hero index when heroes change
          setCurrentHeroIndex(0);
        }
      } catch (err: any) {
        console.error('Error fetching heroes:', err);
        setError(`Could not fetch heroes. ${err.message || 'Please check console for details.'}`);
      } finally {
        setLoading(false);
      }
    }

    fetchHeroes();
  }, [supabase, activeRole]);
  
  // Auto-rotate through heroes every 5 seconds
  useEffect(() => {
    if (heroes.length === 0 || loading) return;
    
    // Clear any existing interval when dependencies change
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    // Set a new interval
    autoPlayRef.current = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => 
        prevIndex === heroes.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change hero every 5 seconds
    
    // Cleanup on unmount
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [heroes, loading]);
  
  // Filter heroes based on active role if we already have data
  const getFilteredHeroes = useCallback(() => {
    return heroes;
  }, [heroes]);
  
  const filteredHeroes = getFilteredHeroes();

  // Navigate to the next hero
  const goToNextHero = useCallback(() => {
    setCurrentHeroIndex((prevIndex) => 
      prevIndex === heroes.length - 1 ? 0 : prevIndex + 1
    );
    
    // Reset the auto-play timer when manually navigating
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setCurrentHeroIndex((prevIndex) => 
          prevIndex === heroes.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
  }, [heroes.length]);

  // Navigate to the previous hero
  const goToPrevHero = useCallback(() => {
    setCurrentHeroIndex((prevIndex) => 
      prevIndex === 0 ? heroes.length - 1 : prevIndex - 1
    );
    
    // Reset the auto-play timer when manually navigating
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setCurrentHeroIndex((prevIndex) => 
          prevIndex === heroes.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
  }, [heroes.length]);

  // Get role color class
  const getRoleColorClass = (role: VaiTro | undefined) => {
    if (!role) return "bg-[var(--accent-blue)]";
    
    // Sửa lại theo mapping mới: 
    // ID 1 = Rocket => Gunner
    // ID 2 = Gunner => Sniper
    // ID 3 = Sniper => Rocket
    switch(role.id) {
      case 1: return "bg-[var(--vaiTroTank)]"; // Rocket (hiển thị là Gunner)
      case 2: return "bg-[var(--vaiTroDamage)]"; // Gunner (hiển thị là Sniper)
      case 3: return "bg-[var(--vaiTroSupport)]"; // Sniper (hiển thị là Rocket)
      default: return "bg-[var(--accent-blue)]";
    }
  };

  // Get role border color class
  const getRoleBorderClass = (role: VaiTro | undefined) => {
    if (!role) return "border-[var(--accent-blue)]";
    
    // Sửa lại theo mapping mới
    switch(role.id) {
      case 1: return "border-[var(--vaiTroTank)]"; // Rocket (hiển thị là Gunner)
      case 2: return "border-[var(--vaiTroDamage)]"; // Gunner (hiển thị là Sniper)
      case 3: return "border-[var(--vaiTroSupport)]"; // Sniper (hiển thị là Rocket)
      default: return "border-[var(--accent-blue)]";
    }
  };

  // Get role text color class
  const getRoleTextClass = (role: VaiTro | undefined) => {
    if (!role) return "text-[var(--accent-blue)]";
    
    // Sửa lại theo mapping mới
    switch(role.id) {
      case 1: return "text-[var(--vaiTroTank)]"; // Rocket (hiển thị là Gunner)
      case 2: return "text-[var(--vaiTroDamage)]"; // Gunner (hiển thị là Sniper)
      case 3: return "text-[var(--vaiTroSupport)]"; // Sniper (hiển thị là Rocket)
      default: return "text-[var(--accent-blue)]";
    }
  };

  // Get the current featured hero
  const currentHero = heroes.length > 0 ? heroes[currentHeroIndex] : null;

  return (
    <section 
      ref={ref}
      className={`heroes-section relative py-10 md:py-16 flex items-center justify-center overflow-hidden ${inView ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--bg-dark)] to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--bg-dark)] to-transparent z-10"></div>
      
      <div className="container mx-auto relative z-20 px-4">
        <div className={`text-center mb-8 ${inView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} transition-all duration-700 delay-300`}>
          <div className="inline-block relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight uppercase relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-orbitron">Legendary Heroes</span>
              <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-purple-500"></div>
            </h2>
          </div>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed font-rajdhani">
            Elite roster of heroes with four rarity tiers, each belonging to one of three specialized classes 
            with unique abilities and strategic advantages.
          </p>
        </div>
        
        {/* Role selector tabs */}
        <div className={`flex justify-center mb-6 overflow-x-auto pb-2 scrollbar-none ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-500`}>
          <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl w-full">
            <div className="flex justify-center mb-6">
              <h2 className="font-bold text-2xl text-white">
                <span className="relative inline-block">
                   ROLES
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </span>
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveRole(0)}
                className={`px-6 py-3 text-sm font-medium tracking-wider transition-all duration-300 rounded-md
                  ${activeRole === 0 
                  ? 'text-white border-2 border-blue-500 shadow-lg shadow-blue-500/40 transform scale-105 bg-blue-500/20' 
                  : 'bg-white/5 text-white/90 hover:bg-blue-500/10 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 border border-white/20 hover:border-blue-500/70'
                }`}
              >
                All
              </button>
              
              {roles.slice(1).map((role, index) => {
                // Xác định màu sắc dựa trên vai trò
                const roleId = index + 1;
                let roleColor = '';
                let bgColorClass = '';
                let shadowColorClass = '';
                
                // Dựa trên mapping mới: Gunner → Rocket (1), Sniper → Gunner (2), Rocket → Sniper (3)
                if (role === 'Gunner') {
                  // Gunner hiển thị Rocket (vàng)
                  roleColor = 'var(--vaiTroTank)';
                  bgColorClass = 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500';
                  shadowColorClass = 'shadow-amber-500/40 hover:shadow-amber-500/60';
                } else if (role === 'Sniper') {
                  // Sniper hiển thị Gunner (đỏ)
                  roleColor = 'var(--vaiTroDamage)';
                  bgColorClass = 'bg-red-500/20 hover:bg-red-500/30 border-red-500';
                  shadowColorClass = 'shadow-red-500/40 hover:shadow-red-500/60';
                } else { // Rocket
                  // Rocket hiển thị Sniper (xanh lá)
                  roleColor = 'var(--vaiTroSupport)';
                  bgColorClass = 'bg-green-500/20 hover:bg-green-500/30 border-green-500';
                  shadowColorClass = 'shadow-green-500/40 hover:shadow-green-500/60';
                }
                
                return (
                  <button
                    key={roleId}
                    onClick={() => setActiveRole(index + 1)}
                    className={`px-6 py-3 text-sm font-medium tracking-wider transition-all duration-300 rounded-md
                      ${activeRole === index + 1 
                        ? `text-white border-2 shadow-lg transform scale-105 ${bgColorClass} ${shadowColorClass}` 
                        : `bg-white/5 text-white/90 hover:text-white hover:shadow-lg border border-white/20 hover:border-opacity-70 ${shadowColorClass}`                      }`}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-[var(--accent-blue-bright)] animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full border-t-3 border-b-3 border-[var(--accent-blue-glow)] animate-spin animation-delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 text-white text-center my-8 shadow-lg shadow-red-500/10 max-w-xl mx-auto">
            <h3 className="text-base font-bold text-red-400 mb-2">Error Occurred</h3>
            <p className="text-white/80 text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-1.5 bg-red-500/20 hover:bg-red-500/40 text-white text-sm rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* Featured Hero Carousel */}
        {!loading && !error && heroes.length > 0 && (
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Hero Image */}
              <div className="relative w-full md:w-2/5 h-[300px] sm:h-[350px] rounded-lg overflow-hidden shadow-lg">
                {currentHero && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
                    <Image
                      src={currentHero.anh_dai_dien || '/images/heroes/placeholder.png'}
                      alt={currentHero.ten}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center transition-transform duration-700 z-0"
                    />
                    <div className="absolute top-3 right-3 z-20">
                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getRoleColorClass(currentHero.vai_tro)} shadow-md`}>
                        {currentHero.vai_tro?.ten || 'Unknown'}
                      </div>
                    </div>
                    
                    {/* Navigation controls */}
                    <div className="absolute inset-y-0 left-0 flex items-center z-20">
                      <button 
                        onClick={goToPrevHero}
                        className="bg-black/30 hover:bg-black/50 p-1 rounded-r-md text-white/80 hover:text-white transition-all"
                        aria-label="Previous hero"
                      >
                        <FiChevronLeft size={20} />
                      </button>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center z-20">
                      <button 
                        onClick={goToNextHero}
                        className="bg-black/30 hover:bg-black/50 p-1 rounded-l-md text-white/80 hover:text-white transition-all"
                        aria-label="Next hero"
                      >
                        <FiChevronRight size={20} />
                      </button>
                    </div>
                    
                    {/* Pagination dots */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20">
                      {heroes.map((_, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setCurrentHeroIndex(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            idx === currentHeroIndex 
                              ? 'bg-white w-3' 
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                          aria-label={`Go to hero ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* Hero Details */}
              <div className="w-full md:w-3/5 text-left flex flex-col">
                {currentHero && (
                  <div className="animate-fadeIn">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentHero.ten}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${getRoleColorClass(currentHero.vai_tro)}`}>
                        {currentHero.vai_tro?.ten || 'Unknown'}
                      </span>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-gray-700 text-white text-xs">
                        Rank: {currentHero.do_hi_em?.ma || 'Unknown'}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      {currentHero.dac_diem || "This hero has unique abilities to dominate the battlefield."}
                    </p>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white/80 mb-1">Skills:</h4>
                      <p className="text-gray-400 text-xs">
                        {currentHero.ky_nang || "Skills information not available."}
                      </p>
                    </div>
                    <Link 
                      href={`/heroes/${currentHero.id}`}
                      className={`inline-flex items-center px-4 py-1.5 border ${getRoleBorderClass(currentHero.vai_tro)} text-white text-sm font-medium rounded-md hover:bg-white/5 transition-colors`}
                    >
                      <span>View Details</span>
                      <FiChevronRight className="ml-1 w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Hero grid display - Enhanced AAA-style */}
        {!loading && !error && heroes.length > 0 && (
          <div className="relative overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 infinite-scroll-container">
              {/* Tạo bản sao của danh sách hero để hiệu ứng quấn chiếu (bản 1) */}
              <div className="flex hero-scroll">
                {filteredHeroes.map((hero, index) => (
                  <div 
                    key={`original-${hero.id}`}
                    className="min-w-[18rem] max-w-[18rem] p-2"
                  >
                    <Link 
                      href={`/heroes/${hero.id}`}
                      className={`block h-full bg-[var(--bg-accent-dark)] bg-opacity-50 rounded-lg overflow-hidden border ${getRoleBorderClass(hero.vai_tro)} hover:shadow-lg transition-all duration-500 group hover:scale-[1.03]`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-transparent to-black/50">
                        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                        <Image
                          src={hero.anh_dai_dien || '/images/heroes/placeholder.png'}
                          alt={hero.ten}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700 z-0"
                        />
                        <div className="absolute top-2 right-2 z-20">
                          <div className={`text-xs font-medium px-1.5 py-0.5 rounded ${getRoleColorClass(hero.vai_tro)} shadow-md`}>
                            {hero.vai_tro?.ten || 'Unknown'}
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-white z-20 bg-gradient-to-t from-black/90 to-transparent pt-8">
                          <h3 className="text-base font-bold group-hover:text-blue-400 transition-colors line-clamp-1">{hero.ten}</h3>
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-gray-400 text-xs line-clamp-2">{hero.dac_diem || "This hero has unique abilities."}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className={`text-xs font-medium ${getRoleTextClass(hero.vai_tro)}`}>View</span>
                          <FiChevronRight className="text-white w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
                
                {/* Bản sao của danh sách hero để hiệu ứng quấn chiếu (bản 2) */}
                {filteredHeroes.map((hero, index) => (
                  <div 
                    key={`duplicate-${hero.id}`}
                    className="min-w-[18rem] max-w-[18rem] p-2"
                  >
                    <Link 
                      href={`/heroes/${hero.id}`}
                      className={`block h-full bg-[var(--bg-accent-dark)] bg-opacity-50 rounded-lg overflow-hidden border ${getRoleBorderClass(hero.vai_tro)} hover:shadow-lg transition-all duration-500 group hover:scale-[1.03]`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-transparent to-black/50">
                        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                        <Image
                          src={hero.anh_dai_dien || '/images/heroes/placeholder.png'}
                          alt={hero.ten}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700 z-0"
                        />
                        <div className="absolute top-2 right-2 z-20">
                          <div className={`text-xs font-medium px-1.5 py-0.5 rounded ${getRoleColorClass(hero.vai_tro)} shadow-md`}>
                            {hero.vai_tro?.ten || 'Unknown'}
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-white z-20 bg-gradient-to-t from-black/90 to-transparent pt-8">
                          <h3 className="text-base font-bold group-hover:text-blue-400 transition-colors line-clamp-1">{hero.ten}</h3>
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-gray-400 text-xs line-clamp-2">{hero.dac_diem || "This hero has unique abilities."}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className={`text-xs font-medium ${getRoleTextClass(hero.vai_tro)}`}>View</span>
                          <FiChevronRight className="text-white w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hiệu ứng scroll từ phải sang trái dạng quấn chiếu */}
            <style jsx global>{`
              .infinite-scroll-container {
                overflow: hidden;
                position: relative;
                width: 100%;
              }
              
              .hero-scroll {
                display: flex;
                animation: scrollLeftInfinite 50s linear infinite;
                width: fit-content;
              }
              
              @keyframes scrollLeftInfinite {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              .hero-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>
          </div>
        )}
        
        {/* Empty State */}
        {!loading && !error && heroes.length === 0 && (
          <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2">No Heroes Found</h3>
            <p className="text-white/60 max-w-lg mx-auto text-sm">No heroes match the selected filter. Please try another filter or check your connection to Supabase.</p>
            <button 
              onClick={() => setActiveRole(0)} 
              className="mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-white text-sm rounded-md transition-colors"
            >
              View All Heroes
            </button>
          </div>
        )}
        
        {/* See all heroes button */}
        <div className={`text-center mt-6 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-1000`}>
          <Link 
            href="/heroes" 
            className="inline-flex items-center justify-center px-6 py-2 bg-[var(--accent-blue)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-blue-glow)] transition-colors hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/25 group relative overflow-hidden"
          >
            <span className="relative z-10">VIEW ALL HEROES</span>
            <FiChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </section>
  );
} 
