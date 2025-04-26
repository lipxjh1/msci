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
      className="reveal my-16"
    >
      <div className="space-y-16">
        <div 
          ref={(el) => { sectionRefs.current[1] = el; }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-left"
        >
          <section className="bg-[#041019]/60 p-6 rounded-xl border border-[var(--accent-blue-bright)]/30 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-bright)]/5 group relative">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-yellow-400/60"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-yellow-400/60"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-yellow-400/60"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-yellow-400/60"></div>
            
            <h3 className="font-orbitron text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-yellow-400 mr-2 group-hover:animate-pulse transition-all">⚡</span> 
              <span className="relative inline-block">
                Những Huyền Thoại Đang Chờ Bạn
                <div className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-all duration-300"></div>
              </span>
            </h3>
            
            <div className="mb-8">
              <h4 className="font-orbitron text-xl font-bold text-white/90 mb-4 text-shadow-sm pb-2 border-b border-white/10">
                Nhân Vật S Huyền Thoại
              </h4>
              
              <div className="relative h-48 mb-6 grid grid-cols-3 gap-3">
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
              
              <ul className="space-y-3 text-gray-300">
                <li className="bg-[#051525]/80 p-4 rounded-lg hover:bg-[#051525] transition-colors border-l-2 border-red-500 transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-center mb-1">
                    <span className="text-red-500 mr-2">🔥</span>
                    <span className="font-bold text-red-400">Akane (Gunner)</span>
                  </div>
                  <p className="ml-6 text-sm">"Shooting Star" - Bắn toàn bộ robot trong 3 giây!</p>
                </li>
                <li className="bg-[#051525]/80 p-4 rounded-lg hover:bg-[#051525] transition-colors border-l-2 border-blue-500 transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-center mb-1">
                    <span className="text-blue-500 mr-2">❄️</span>
                    <span className="font-bold text-blue-400">Alice (Sniper)</span>
                  </div>
                  <p className="ml-6 text-sm">"Hide on Bush" - Ẩn thân và bất tử 5 giây</p>
                </li>
                <li className="bg-[#051525]/80 p-4 rounded-lg hover:bg-[#051525] transition-colors border-l-2 border-orange-500 transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-center mb-1">
                    <span className="text-orange-500 mr-2">💥</span>
                    <span className="font-bold text-orange-400">Caitlyn (Rocket)</span>
                  </div>
                  <p className="ml-6 text-sm">"Big Bang" - Càn quét toàn màn chơi</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-orbitron text-xl font-bold text-white/90 mb-4 text-shadow-sm">Tiến Hóa Anh Hùng</h4>
              <p className="text-gray-300 p-4 bg-[#051525]/80 rounded-lg mb-6">
                Mỗi nhân vật đều có vai trò quan trọng trong chiến lược của bạn. Đừng coi thường những anh hùng cấp thấp - họ có thể tiến hóa lên cấp S!
              </p>
              
              {/* Star evolution visualization */}
              <div className="flex items-center justify-center p-4 bg-[#051525]/60 rounded-lg animate-pulse-very-slow">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500/20 flex items-center justify-center rounded-full text-green-500 font-bold">C</div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-green-500/50 to-blue-500/50"></div>
                  <div className="w-10 h-10 bg-blue-500/20 flex items-center justify-center rounded-full text-blue-500 font-bold">B</div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50"></div>
                  <div className="w-10 h-10 bg-purple-500/20 flex items-center justify-center rounded-full text-purple-500 font-bold">A</div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500/50 to-red-500/50"></div>
                  <div className="w-10 h-10 bg-red-500/20 flex items-center justify-center rounded-full text-red-500 font-bold">S</div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-[#041019]/60 p-6 rounded-xl border border-[var(--accent-blue-bright)]/30 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-bright)]/5 group relative">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-purple-400/60"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-purple-400/60"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-purple-400/60"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-purple-400/60"></div>
            
            <h3 className="font-orbitron text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-purple-400 mr-2 group-hover:animate-pulse transition-all">💎</span> 
              <span className="relative inline-block">
                Tỷ Lệ Minh Bạch
                <div className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent transition-all duration-300"></div>
              </span>
            </h3>
            
            <div className="mb-8">
              <div className="mb-6 p-4 bg-[#051525]/80 rounded-lg font-mono border border-[var(--accent-blue-bright)]/20">
                <pre className="text-white">
{`S (Legendary): 5%
A (Epic):      10%  
B (Rare):      30%
C (Common):    55%`}
                </pre>
              </div>
              
              {/* Visualization of drop rates */}
              <div className="relative h-36 w-full bg-[#051525]/60 rounded-lg p-3 overflow-hidden border border-[var(--accent-blue-bright)]/20">
                <div className="absolute bottom-0 left-0 h-full w-[55%] bg-gradient-to-t from-green-500/40 to-green-500/10 rounded-tl-md rounded-bl-md">
                  <div className="absolute top-2 left-2 text-xs text-green-400 font-bold">Common</div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-green-400 font-bold">55%</div>
                </div>
                <div className="absolute bottom-0 left-[55%] h-full w-[30%] bg-gradient-to-t from-blue-500/40 to-blue-500/10">
                  <div className="absolute top-2 left-2 text-xs text-blue-400 font-bold">Rare</div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-blue-400 font-bold">30%</div>
                </div>
                <div className="absolute bottom-0 left-[85%] h-full w-[10%] bg-gradient-to-t from-purple-500/40 to-purple-500/10">
                  <div className="absolute top-2 left-1 text-xs text-purple-400 font-bold">Epic</div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-purple-400 font-bold">10%</div>
                </div>
                <div className="absolute bottom-0 left-[95%] h-full w-[5%] bg-gradient-to-t from-red-500/40 to-red-500/10 rounded-tr-md rounded-br-md">
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-red-400 font-bold">5%</div>
                </div>
              </div>
            </div>
            
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4 flex items-center mt-2">
              <span className="text-cyan-400 mr-2 group-hover:animate-pulse transition-all">🚀</span> 
              <span className="relative inline-block">
                Mẹo Pro Gacha
                <div className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-300"></div>
              </span>
            </h3>
            
            <ul className="space-y-3 text-gray-300">
              <li className="flex p-3 hover:bg-[#051525] rounded-lg transition-colors border-l-2 border-cyan-500 transform hover:translate-x-2 transition-all duration-300">
                <span className="text-cyan-400 mr-3">01</span>
                <div>
                  <p className="font-bold text-white">Kết hợp thông minh</p>
                  <p className="text-sm">Dùng Character Ticket cho may mắn lớn, Piece Ticket cho tiến độ ổn định</p>
                </div>
              </li>
              <li className="flex p-3 hover:bg-[#051525] rounded-lg transition-colors border-l-2 border-cyan-500 transform hover:translate-x-2 transition-all duration-300">
                <span className="text-cyan-400 mr-3">02</span>
                <div>
                  <p className="font-bold text-white">Săn sự kiện</p>
                  <p className="text-sm">Rate up cho nhân vật hot trong các event đặc biệt</p>
                </div>
              </li>
              <li className="flex p-3 hover:bg-[#051525] rounded-lg transition-colors border-l-2 border-cyan-500 transform hover:translate-x-2 transition-all duration-300">
                <span className="text-cyan-400 mr-3">03</span>
                <div>
                  <p className="font-bold text-white">Giữ nhân vật trùng</p>
                  <p className="text-sm">Dùng để nâng Star hoặc tiến hóa sau này</p>
                </div>
              </li>
            </ul>
            
            {/* Animated tip banner */}
            <div className="relative overflow-hidden mt-6 p-4 rounded-lg animate-pulse-very-slow">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"></div>
              <p className="relative z-10 text-white text-center">
                <span className="text-yellow-400 font-bold">PRO TIP:</span> Tham gia Discord cộng đồng để nhận code quà tặng miễn phí mỗi tuần!
              </p>
            </div>
          </section>
        </div>
        
        <section 
          ref={(el) => { sectionRefs.current[2] = el; }}
          className="bg-[#041019]/60 p-8 rounded-2xl border border-[var(--accent-blue-bright)]/30 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-bright)]/5 reveal-scale relative"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-indigo-400/60 rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-indigo-400/60 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-indigo-400/60 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-indigo-400/60 rounded-br-2xl"></div>
          
          <h3 className="font-orbitron text-3xl font-bold text-white mb-6 text-center text-shadow-blue animate-title-glow">
            <span className="relative inline-block">
              Không Chỉ Là Con Số
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h3>
          
          <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
            Mỗi nhân vật trong M-SCI không chỉ là dữ liệu - họ là những anh hùng với cá tính và khả năng riêng biệt.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-[#051525]/80 p-6 rounded-xl border border-[var(--accent-blue-bright)]/20 text-center transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10 group">
              <div className="text-4xl mb-3 group-hover:animate-pulse-slow transition-all">📜</div>
              <div className="text-white font-bold mb-2 group-hover:text-indigo-300 transition-colors">Câu chuyện riêng biệt</div>
              <p className="text-gray-400 text-sm">Mỗi nhân vật có một quá khứ và động cơ riêng</p>
            </div>
            <div className="bg-[#051525]/80 p-6 rounded-xl border border-[var(--accent-blue-bright)]/20 text-center transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10 group">
              <div className="text-4xl mb-3 group-hover:animate-pulse-slow transition-all">🎭</div>
              <div className="text-white font-bold mb-2 group-hover:text-indigo-300 transition-colors">Tính cách độc đáo</div>
              <p className="text-gray-400 text-sm">Từ lạnh lùng đến nhiệt huyết, mỗi nhân vật có cá tính riêng</p>
            </div>
            <div className="bg-[#051525]/80 p-6 rounded-xl border border-[var(--accent-blue-bright)]/20 text-center transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10 group">
              <div className="text-4xl mb-3 group-hover:animate-pulse-slow transition-all">⚔️</div>
              <div className="text-white font-bold mb-2 group-hover:text-indigo-300 transition-colors">Kỹ năng đặc trưng</div>
              <p className="text-gray-400 text-sm">Kỹ năng chủ động và bị động cho chiến thuật đa dạng</p>
            </div>
            <div className="bg-[#051525]/80 p-6 rounded-xl border border-[var(--accent-blue-bright)]/20 text-center transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10 group">
              <div className="text-4xl mb-3 group-hover:animate-pulse-slow transition-all">♟️</div>
              <div className="text-white font-bold mb-2 group-hover:text-indigo-300 transition-colors">Vai trò chiến lược</div>
              <p className="text-gray-400 text-sm">Trước tuyến, hỗ trợ hay chuyên gia sát thương</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
            Khi bạn triệu hồi được những nhân vật hùng mạnh, bạn không chỉ nhận được một công cụ chiến đấu - mà là những đồng đội sẽ cùng bạn viết nên huyền thoại riêng.
          </p>
          
          <div className="bg-gradient-to-r from-[#041019] via-[var(--accent-blue-bright)]/10 to-[#041019] p-8 rounded-xl shadow-inner">
            <p className="text-center text-white font-bold text-xl italic animate-pulse-slow text-shadow-blue">
              "Mỗi lần quay Gacha là một cơ hội để thay đổi vận mệnh - Hãy triệu hồi những anh hùng vĩ đại nhất!"
            </p>
          </div>
        </section>
        
        <div 
          ref={(el) => { sectionRefs.current[3] = el; }}
          className="text-center pt-8 border-t border-[var(--accent-blue-bright)]/30 reveal"
        >
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] rounded-xl blur opacity-25"></div>
            <a 
              href="#" 
              className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#051525]/90 text-white font-bold hover:bg-[#051525] transition-colors group"
            >
              <span className="text-[var(--accent-blue-bright)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span>Tham Gia M-SCI Ngay Hôm Nay</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GachaMoreInfo; 