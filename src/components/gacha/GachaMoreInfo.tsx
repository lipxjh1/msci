"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const GachaMoreInfo: React.FC = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
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
                Những Huyền Thoại Đang Chờ Bạn
                <div className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-all duration-300"></div>
              </span>
            </h3>
            
            <div className="mb-4">
              <h4 className="font-orbitron text-base md:text-lg font-bold text-white/90 mb-3 text-shadow-sm pb-2 border-b border-white/10">
                Nhân Vật S Huyền Thoại
              </h4>
              
              <div className="relative h-32 md:h-40 mb-4 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((num, idx) => (
                  <div key={idx} className="relative overflow-hidden rounded-lg shadow-lg group/card">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-red-500/20 rounded-lg blur opacity-60 group-hover/card:opacity-90 transition duration-500"></div>
                    <div className="relative h-full overflow-hidden rounded-lg">
                      <Image 
                        src={`/images/ga-cha/anh${num}.png`} 
                        alt={`Legendary ${idx+1}`} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover/card:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute bottom-2 left-2">
                        <div className="inline-flex items-center px-2 py-1 bg-black/60 rounded-full backdrop-blur-sm">
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                          <span className="text-xs text-white font-bold">S</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <ul className="space-y-2 text-gray-300">
                <li className="bg-[#051525]/80 p-3 rounded-lg hover:bg-[#051525] transition-colors border-l-2 border-red-500 transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-center mb-1">
                    <span className="text-red-500 mr-2">🔥</span>
                    <span className="font-bold text-red-400">Akane (Gunner)</span>
                  </div>
                  <p className="ml-6 text-xs md:text-sm">"Shooting Star" - Bắn toàn bộ robot trong 3 giây!</p>
                </li>
                <li className="bg-[#051525]/80 p-3 rounded-lg hover:bg-[#051525] transition-colors border-l-2 border-blue-500 transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-center mb-1">
                    <span className="text-blue-500 mr-2">❄️</span>
                    <span className="font-bold text-blue-400">Alice (Sniper)</span>
                  </div>
                  <p className="ml-6 text-xs md:text-sm">"Hide on Bush" - Ẩn thân và bất tử 5 giây</p>
                </li>
                <li className="bg-[#051525]/80 p-3 rounded-lg hover:bg-[#051525] transition-colors border-l-2 border-orange-500 transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-center mb-1">
                    <span className="text-orange-500 mr-2">💥</span>
                    <span className="font-bold text-orange-400">Caitlyn (Rocket)</span>
                  </div>
                  <p className="ml-6 text-xs md:text-sm">"Big Bang" - Càn quét toàn màn chơi</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-orbitron text-base md:text-lg font-bold text-white/90 mb-2 text-shadow-sm">Tiến Hóa Anh Hùng</h4>
              <p className="text-xs md:text-sm text-gray-300 p-3 bg-[#051525]/80 rounded-lg mb-3">
                Mỗi nhân vật đều có vai trò quan trọng trong chiến lược của bạn. Đừng coi thường những anh hùng cấp thấp - họ có thể tiến hóa lên cấp S!
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
                Tỷ Lệ Minh Bạch
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
              <h4 className="font-orbitron text-base md:text-lg font-bold text-white/90 mb-2 text-shadow-sm">Mẹo Pro Gacha</h4>
              
              <ul className="space-y-2 text-gray-300">
                <li className="flex p-3 hover:bg-[#051525] rounded-lg transition-colors border-l-2 border-cyan-500 transform hover:translate-x-2 transition-all duration-300">
                  <span className="text-cyan-400 mr-3 text-sm md:text-base">01</span>
                  <div>
                    <p className="font-bold text-white text-sm md:text-base">Kết hợp thông minh</p>
                    <p className="text-xs md:text-sm">Dùng Character Ticket cho may mắn lớn, Piece Ticket cho tiến độ ổn định</p>
                  </div>
                </li>
                <li className="flex p-3 hover:bg-[#051525] rounded-lg transition-colors border-l-2 border-cyan-500 transform hover:translate-x-2 transition-all duration-300">
                  <span className="text-cyan-400 mr-3 text-sm md:text-base">02</span>
                  <div>
                    <p className="font-bold text-white text-sm md:text-base">Săn sự kiện</p>
                    <p className="text-xs md:text-sm">Rate up cho nhân vật hot trong các event đặc biệt</p>
                  </div>
                </li>
                <li className="flex p-3 hover:bg-[#051525] rounded-lg transition-colors border-l-2 border-cyan-500 transform hover:translate-x-2 transition-all duration-300">
                  <span className="text-cyan-400 mr-3 text-sm md:text-base">03</span>
                  <div>
                    <p className="font-bold text-white text-sm md:text-base">Giữ nhân vật trùng</p>
                    <p className="text-xs md:text-sm">Dùng để nâng Star hoặc tiến hóa sau này</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Animated tip banner */}
            <div className="mt-4 relative p-3 bg-gradient-to-r from-[#051525]/80 to-[#05121d]/80 rounded-lg border border-cyan-500/20 overflow-hidden group/banner">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 animate-shine"></div>
              <h5 className="font-orbitron text-sm md:text-base font-bold text-cyan-400 mb-1 flex items-center">
                <span className="mr-2">💡</span> Không Chỉ Là Con Số
              </h5>
              <p className="text-xs md:text-sm text-gray-300">
                Tỷ lệ rơi chỉ là một phần của trải nghiệm Gacha. Chiến lược sử dụng nhân vật mới mới là chìa khóa chiến thắng!
              </p>
            </div>
          </section>
        </div>
        
        {/* Extra section for desktop */}
        <div className="hidden md:block bg-[#041019]/60 p-4 rounded-xl border border-[var(--accent-blue-bright)]/30 animate-fade-in-delayed">
          <div className="text-center">
            <h3 className="font-orbitron text-xl font-bold text-white mb-2">
              <span className="relative inline-block">
                BÍ QUYẾT GACHA HIỆU QUẢ
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h3>
            <p className="text-sm text-gray-300 max-w-3xl mx-auto mb-4">
              Khám phá những chiến thuật nâng cao để tối ưu hóa cơ hội nhận được những anh hùng mạnh nhất trong hệ thống Gacha!
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-[#051525]/50 p-3 rounded-lg border border-[var(--accent-blue-bright)]/10 hover:border-[var(--accent-blue-bright)]/30 transition-all">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full mx-auto flex items-center justify-center mb-2">
                  <span className="text-blue-400 text-xl">🔄</span>
                </div>
                <h4 className="font-bold text-white text-base">Quay Gộp</h4>
                <p className="text-xs text-gray-300">Quay 10 lần liên tiếp để nhận thêm ưu đãi đặc biệt</p>
              </div>
              
              <div className="bg-[#051525]/50 p-3 rounded-lg border border-[var(--accent-blue-bright)]/10 hover:border-[var(--accent-blue-bright)]/30 transition-all">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full mx-auto flex items-center justify-center mb-2">
                  <span className="text-purple-400 text-xl">🎯</span>
                </div>
                <h4 className="font-bold text-white text-base">Gacha Mục Tiêu</h4>
                <p className="text-xs text-gray-300">Tập trung vào các banner có rate-up cho nhân vật bạn cần</p>
              </div>
              
              <div className="bg-[#051525]/50 p-3 rounded-lg border border-[var(--accent-blue-bright)]/10 hover:border-[var(--accent-blue-bright)]/30 transition-all">
                <div className="w-10 h-10 bg-red-500/20 rounded-full mx-auto flex items-center justify-center mb-2">
                  <span className="text-red-400 text-xl">⏱️</span>
                </div>
                <h4 className="font-bold text-white text-base">Thời Điểm</h4>
                <p className="text-xs text-gray-300">Quay Gacha trong các sự kiện đặc biệt để tăng tỷ lệ thành công</p>
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