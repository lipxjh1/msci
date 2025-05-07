"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSupabase } from '@/context/SupabaseContext';
import { AnhHung } from '@/loai';

const GachaMoreInfo: React.FC = () => {
  const supabase = useSupabase();
  const [legendaryHeroes, setLegendaryHeroes] = useState<AnhHung[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  // Fetch legendary heroes from Supabase
  useEffect(() => {
    const fetchLegendaryHeroes = async () => {
      try {
        const { data, error } = await supabase
          .from('anh_hung')
          .select(`
            *,
            vai_tro(id, ten, mo_ta),
            do_hi_em(id, ma, ten, mau_sac)
          `)
          .eq('do_hi_em.ma', 'S')
          .order('ten');
          
        if (error) {
          console.error('Error fetching legendary heroes:', error);
          return;
        }
        
        if (data) {
          // Sắp xếp để hiển thị Alice ở vị trí nổi bật
          const sortedHeroes = [...data as AnhHung[]];
          
          // Tìm Alice để đưa lên vị trí thứ 2
          const aliceIndex = sortedHeroes.findIndex(hero => hero.ten.toLowerCase().includes('alice'));
          if (aliceIndex >= 0 && aliceIndex !== 1 && sortedHeroes.length > 1) {
            // Nếu tìm thấy Alice và không ở vị trí thứ 2
            const alice = sortedHeroes.splice(aliceIndex, 1)[0];
            if (sortedHeroes.length >= 1) {
              // Đảm bảo có đủ phần tử trước khi chèn
              sortedHeroes.splice(1, 0, alice);
            } else {
              // Nếu không có đủ 1 phần tử, thêm vào cuối
              sortedHeroes.push(alice);
            }
          }
          
          // Tìm Caitlyn để đưa lên vị trí thứ 3
          const caitlynIndex = sortedHeroes.findIndex(hero => hero.ten.toLowerCase().includes('caitlyn'));
          if (caitlynIndex >= 0 && caitlynIndex !== 2 && sortedHeroes.length > 2) {
            // Nếu tìm thấy Caitlyn và không ở vị trí thứ 3
            const caitlyn = sortedHeroes.splice(caitlynIndex, 1)[0];
            if (sortedHeroes.length >= 2) {
              // Đảm bảo có đủ phần tử trước khi chèn
              sortedHeroes.splice(2, 0, caitlyn);
            } else {
              // Nếu không có đủ 2 phần tử, thêm vào cuối
              sortedHeroes.push(caitlyn);
            }
          }
          
          setLegendaryHeroes(sortedHeroes);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLegendaryHeroes();
  }, [supabase]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Helper function to determine class color
  const getClassColor = (vaiTroId: number | null) => {
    if (vaiTroId === 1) return 'red-500'; // Gunner
    if (vaiTroId === 2) return 'blue-500'; // Sniper
    if (vaiTroId === 3) return 'orange-500'; // Rocket
    return 'yellow-500'; // Default
  };

  return (
    <section 
      ref={(el) => { sectionRefs.current[0] = el; }}
      className="reveal my-4"
    >
      <div className="space-y-6">
        <div 
          ref={(el) => { sectionRefs.current[1] = el; }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 reveal-left"
        >
          <section className="bg-[#041019]/60 p-4 rounded-xl border border-[var(--accent-blue-bright)]/30 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-bright)]/5 group relative">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-t border-l border-yellow-400/60"></div>
            <div className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 border-t border-r border-yellow-400/60"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 md:w-6 md:h-6 border-b border-l border-yellow-400/60"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-b border-r border-yellow-400/60"></div>
            
            <h3 className="font-orbitron text-lg md:text-xl font-bold text-white mb-3 flex items-center">
              <span className="text-yellow-400 mr-2 group-hover:animate-pulse transition-all">⚡</span> 
              <span className="relative inline-block">
                Legends Waiting For You
                <div className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-all duration-300"></div>
              </span>
            </h3>
            
            <div className="mb-4">
              <h4 className="font-orbitron text-base md:text-lg font-bold text-white/90 mb-3 text-shadow-sm pb-2 border-b border-white/10">
                Legendary S Characters
              </h4>
              
              <div className="relative h-32 md:h-40 mb-4 grid grid-cols-3 gap-3">
                {loading ? (
                  <div className="col-span-3 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  legendaryHeroes.slice(0, 3).map((hero, index) => (
                    <div key={hero.id} className="relative overflow-hidden rounded-lg shadow-lg group/card">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-red-500/20 rounded-lg blur opacity-60 group-hover/card:opacity-90 transition duration-500"></div>
                      <div className="relative h-full overflow-hidden rounded-lg">
                        <Image 
                          src={hero.anh_dai_dien || `/images/${hero.vai_tro_id === 1 ? 'dan' : hero.vai_tro_id === 2 ? 'ngam' : 'phao'}.png`}
                          alt={hero.ten}
                          fill 
                          className="object-cover transition-transform duration-500 group-hover/card:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                        <div className="absolute bottom-2 left-2">
                          <div className="inline-flex items-center px-2 py-1 bg-black/60 rounded-full backdrop-blur-sm">
                            <span className={`w-2 h-2 rounded-full bg-${getClassColor(hero.vai_tro_id)} mr-1`}></span>
                            <span className="text-xs text-white font-bold">S</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <ul className="space-y-2 text-gray-300">
                {loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <li key={i} className="bg-[#051525]/80 p-3 rounded-lg animate-pulse h-20"></li>
                  ))
                ) : (
                  legendaryHeroes.slice(0, 3).map((hero) => {
                    // Determine class/role based on vai_tro_id
                    const classType = hero.vai_tro_id === 1 ? "Gunner" : 
                                    hero.vai_tro_id === 2 ? "Sniper" : 
                                    hero.vai_tro_id === 3 ? "Rocket" : "Unknown";
                    
                    // Determine color and icon based on class
                    const colorClass = hero.vai_tro_id === 1 ? "red-500" : 
                                      hero.vai_tro_id === 2 ? "blue-500" : 
                                      hero.vai_tro_id === 3 ? "orange-500" : "gray-500";
                    
                    const icon = hero.vai_tro_id === 1 ? "🔥" : 
                                hero.vai_tro_id === 2 ? "❄️" : 
                                hero.vai_tro_id === 3 ? "💥" : "⚡";
                    
                    return (
                      <li key={hero.id} className={`bg-[#051525]/80 p-3 rounded-lg hover:bg-[#051525] transition-colors border-l-2 border-${colorClass} transform hover:translate-x-2 transition-all duration-300`}>
                        <div className="flex items-center mb-1">
                          <span className={`text-${colorClass} mr-2`}>{icon}</span>
                          <span className={`font-bold text-${colorClass}`}>{hero.ten} ({classType})</span>
                        </div>
                        <p className="ml-6 text-xs md:text-sm">{hero.dac_diem || "No description available"}</p>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
            
            <div>
              <h4 className="font-orbitron text-base md:text-lg font-bold text-white/90 mb-2 text-shadow-sm">Hero Evolution</h4>
              <p className="text-xs md:text-sm text-gray-300 p-3 bg-[#051525]/80 rounded-lg mb-3">
                Each character plays an important role in your strategy. Don't underestimate low-tier heroes - they can evolve to S rank!
              </p>
              
              {/* Star evolution visualization */}
              <div className="flex items-center justify-center p-3 bg-[#051525]/60 rounded-lg animate-pulse-very-slow">
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500/20 flex items-center justify-center rounded-full text-green-500 font-bold text-sm md:text-base">C</div>
                  <div className="w-6 md:w-8 h-0.5 bg-gradient-to-r from-green-500/50 to-blue-500/50"></div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/20 flex items-center justify-center rounded-full text-blue-500 font-bold text-sm md:text-base">B</div>
                  <div className="w-6 md:w-8 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50"></div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500/20 flex items-center justify-center rounded-full text-purple-500 font-bold text-sm md:text-base">A</div>
                  <div className="w-6 md:w-8 h-0.5 bg-gradient-to-r from-purple-500/50 to-red-500/50"></div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500/20 flex items-center justify-center rounded-full text-red-500 font-bold text-sm md:text-base">S</div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-[#041019]/60 p-4 rounded-xl border border-[var(--accent-blue-bright)]/30 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-bright)]/5 group relative">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-t border-l border-purple-400/60"></div>
            <div className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 border-t border-r border-purple-400/60"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 md:w-6 md:h-6 border-b border-l border-purple-400/60"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-b border-r border-purple-400/60"></div>
            
            <h3 className="font-orbitron text-lg md:text-xl font-bold text-white mb-3 flex items-center">
              <span className="text-purple-400 mr-2 group-hover:animate-pulse transition-all">💎</span> 
              <span className="relative inline-block">
                Transparent Rates
                <div className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent transition-all duration-300"></div>
              </span>
            </h3>
            
            <div className="mb-4">
              <div className="mb-4 p-3 bg-[#051525]/80 rounded-lg font-mono border border-[var(--accent-blue-bright)]/20">
                <pre className="text-white text-xs md:text-sm">
{`S (Legendary): 5%
A (Epic):      10%  
B (Rare):      30%
C (Common):    55%`}
                </pre>
              </div>
              
              {/* Visualization of drop rates */}
              <div className="relative h-28 md:h-32 w-full bg-[#051525]/60 rounded-lg p-3 overflow-hidden border border-[var(--accent-blue-bright)]/20">
                <div className="absolute bottom-0 left-0 h-full w-[55%] bg-gradient-to-t from-green-500/40 to-green-500/10 rounded-tl-md rounded-bl-md">
                  <div className="absolute top-2 left-2 text-xs text-green-400 font-bold">Common</div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-green-400 font-bold">55%</div>
                </div>
                <div className="absolute bottom-0 left-[55%] h-full w-[30%] bg-gradient-to-t from-blue-500/40 to-blue-500/10">
                  <div className="absolute top-2 left-2 text-xs text-blue-400 font-bold">Rare</div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-blue-400 font-bold">30%</div>
                </div>
                <div className="absolute bottom-0 left-[85%] h-full w-[10%] bg-gradient-to-t from-purple-500/40 to-purple-500/10">
                  <div className="absolute top-2 left-1 text-xs text-purple-400 font-bold">Epic</div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-purple-400 font-bold">10%</div>
                </div>
                <div className="absolute bottom-0 left-[95%] h-full w-[5%] bg-gradient-to-t from-red-500/40 to-red-500/10 rounded-tr-md rounded-br-md">
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-red-400 font-bold">5%</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-orbitron text-base md:text-lg font-bold text-white/90 mb-2 text-shadow-sm">Pro Gacha Tips</h4>
              
              <ul className="space-y-2 text-gray-300">
                <li className="flex p-3 hover:bg-[#051525] rounded-lg transition-colors border-l-2 border-cyan-500 transform hover:translate-x-2 transition-all duration-300">
                  <span className="text-cyan-400 mr-3 text-sm md:text-base">01</span>
                  <div>
                    <p className="font-bold text-white text-sm md:text-base">Smart combination</p>
                    <p className="text-xs md:text-sm">Use Character Tickets for better luck, Piece Tickets for steady progress</p>
                  </div>
                </li>
                <li className="flex p-3 hover:bg-[#051525] rounded-lg transition-colors border-l-2 border-cyan-500 transform hover:translate-x-2 transition-all duration-300">
                  <span className="text-cyan-400 mr-3 text-sm md:text-base">02</span>
                  <div>
                    <p className="font-bold text-white text-sm md:text-base">Hunt for events</p>
                    <p className="text-xs md:text-sm">Rate ups for hot characters during special events</p>
                  </div>
                </li>
                <li className="flex p-3 hover:bg-[#051525] rounded-lg transition-colors border-l-2 border-cyan-500 transform hover:translate-x-2 transition-all duration-300">
                  <span className="text-cyan-400 mr-3 text-sm md:text-base">03</span>
                  <div>
                    <p className="font-bold text-white text-sm md:text-base">Keep duplicate characters</p>
                    <p className="text-xs md:text-sm">Use them to increase Stars or evolve later</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
        
        {/* FAQ Section */}
        <div 
          ref={(el) => { sectionRefs.current[2] = el; }}
          className="bg-[#041019]/60 p-4 rounded-xl border border-[var(--accent-blue-bright)]/30 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-bright)]/5 reveal-bottom">
          <h3 className="font-orbitron text-lg md:text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#051525]/80 p-3 rounded-lg border-l-2 border-cyan-500">
              <h4 className="text-white font-bold mb-2">How often are new heroes added?</h4>
              <p className="text-gray-300 text-sm">We add 2-3 new heroes every month, each with unique abilities and impressive visuals.</p>
            </div>
            
            <div className="bg-[#051525]/80 p-3 rounded-lg border-l-2 border-cyan-500">
              <h4 className="text-white font-bold mb-2">Are there event heroes?</h4>
              <p className="text-gray-300 text-sm">Yes! We have limited-time heroes available only during special events. Don't miss your chance to get them!</p>
            </div>
            
            <div className="bg-[#051525]/80 p-3 rounded-lg border-l-2 border-cyan-500">
              <h4 className="text-white font-bold mb-2">How does the pity system work?</h4>
              <p className="text-gray-300 text-sm">After 50 pulls without an S hero, your chance increases by 0.1% per pull. After 90 pulls, you're guaranteed an S hero.</p>
            </div>
            
            <div className="bg-[#051525]/80 p-3 rounded-lg border-l-2 border-cyan-500">
              <h4 className="text-white font-bold mb-2">Can I trade heroes with other players?</h4>
              <p className="text-gray-300 text-sm">Not directly, but you can use the Fragment Exchange system to trade hero fragments with other players.</p>
            </div>
          </div>
        </div>
        
        {/* Pity System Explanation */}
        <div 
          ref={(el) => { sectionRefs.current[3] = el; }}
          className="bg-[#041019]/60 p-4 rounded-xl border border-[var(--accent-blue-bright)]/30 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-bright)]/5 reveal-right"
        >
          <h3 className="font-orbitron text-lg md:text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">
            Pity System & Special Bonuses
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-[#051525]/80 p-3 rounded-lg">
                <h4 className="text-white font-bold mb-2 flex items-center">
                  <span className="text-pink-400 mr-2">🎯</span> Pity Counter
                </h4>
                <p className="text-gray-300 text-sm mb-2">
                  Your chance of getting an S hero increases with each unsuccessful pull. After 90 pulls, you're guaranteed an S rank hero!
                </p>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 w-[80%] animate-pulse-slow"></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">0</span>
                  <span className="text-xs text-purple-400">72/90</span>
                  <span className="text-xs text-gray-400">90</span>
                </div>
              </div>
              
              <div className="bg-[#051525]/80 p-3 rounded-lg">
                <h4 className="text-white font-bold mb-2 flex items-center">
                  <span className="text-yellow-400 mr-2">🎁</span> Special Bonuses
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2"></span>
                    First-time bonus: Double drops on first 10x pull
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2"></span>
                    Daily free pull: One free pull every day
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2"></span>
                    VIP system: Increases drop rates the more you play
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#051525]/80 p-3 rounded-lg h-full flex flex-col justify-between">
              <div>
                <h4 className="text-white font-bold mb-2 flex items-center">
                  <span className="text-green-400 mr-2">🔄</span> Regular Update Schedule
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  We regularly update our Gacha system with new heroes and improvements. Stay tuned for exciting additions!
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-auto">
                <div className="bg-[#041019] p-2 rounded-lg text-center">
                  <div className="text-xs text-green-400 mb-1">Daily</div>
                  <div className="text-white text-xs">Free Pull</div>
                </div>
                <div className="bg-[#041019] p-2 rounded-lg text-center">
                  <div className="text-xs text-blue-400 mb-1">Weekly</div>
                  <div className="text-white text-xs">New Event</div>
                </div>
                <div className="bg-[#041019] p-2 rounded-lg text-center">
                  <div className="text-xs text-purple-400 mb-1">Monthly</div>
                  <div className="text-white text-xs">New Heroes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Global styles */}
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        
        .reveal-left {
          opacity: 0;
          transform: translateX(-20px);
          transition: all 0.6s ease-out;
        }
        
        .active {
          opacity: 1;
          transform: translate(0);
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shine {
          animation: shine 3s infinite;
        }
        
        .animate-pulse-very-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-fade-in-delayed {
          opacity: 0;
          animation: fadeIn 0.5s ease-out 0.3s forwards;
        }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default GachaMoreInfo; 