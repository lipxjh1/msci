"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const GachaInfo: React.FC = () => {
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
      <div className="backdrop-blur-sm bg-[#05121d]/80 p-8 rounded-2xl border border-[var(--accent-blue-bright)]/30 shadow-lg">
        <div className="text-center mb-10">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4 text-shadow-blue animate-title-glow">
            <span className="relative inline-block">
              HỆ THỐNG GACHA
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Khám phá hệ thống Gacha độc đáo của M-SCI, nơi bạn có thể thu thập các anh hùng với sức mạnh khác nhau để xây dựng đội hình chiến đấu của mình.
          </p>
        </div>
        
        <div className="space-y-12">
          <section 
            ref={(el) => { sectionRefs.current[1] = el; }}
            className="reveal-left"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h3 className="font-orbitron text-2xl font-bold text-white mb-4 text-shadow-sm">Khám Phá Vũ Trụ Anh Hùng M-SCI!</h3>
                <p className="text-gray-300 mb-6">
                  Chào mừng đến với hệ thống Gacha đỉnh cao của M-SCI - nơi vận mệnh nhân loại nằm trong tay bạn! Với mỗi lần quay, bạn có cơ hội sở hữu những chiến binh huyền thoại, mỗi người mang một sức mạnh và câu chuyện riêng.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 bg-[#041019]/50 px-4 py-2 rounded-lg border border-[var(--accent-blue-bright)]/20">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-sm text-gray-300">Tỉ lệ cân bằng</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#041019]/50 px-4 py-2 rounded-lg border border-[var(--accent-blue-bright)]/20">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-sm text-gray-300">Cập nhật thường xuyên</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-blue-bright)] via-[var(--accent-blue-glow)] to-[var(--accent-blue-bright)] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/ga-cha/anh1.png" 
                    alt="Gacha Hero" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041019] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <p className="text-white font-bold text-xl text-shadow-blue">Hàng ngàn chiến binh đang chờ bạn khám phá!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <div 
            ref={(el) => { sectionRefs.current[2] = el; }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal"
          >
            <section className="bg-[#041019]/60 p-6 rounded-xl border border-[var(--accent-blue-bright)]/30 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-bright)]/5 group">
              <h3 className="font-orbitron text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-yellow-400 mr-2 group-hover:animate-pulse transition-all">🌟</span> 
                <span className="relative inline-block">
                  Đẳng Cấp Nhân Vật
                  <div className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-all duration-300"></div>
                </span>
              </h3>
              
              <div className="mb-8">
                <h4 className="font-orbitron text-xl font-bold text-white/90 mb-4 text-shadow-sm">Hệ Thống Độ Hiếm</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start p-3 rounded-md bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 transform hover:translate-x-2 transition-all duration-300">
                    <span className="text-red-500 mr-3 text-xl">S</span>
                    <div>
                      <span className="font-bold text-red-400">Legendary</span>
                      <p className="text-sm text-gray-400">Akane, Alice, Caitlyn</p>
                    </div>
                  </li>
                  <li className="flex items-start p-3 rounded-md bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 transform hover:translate-x-2 transition-all duration-300">
                    <span className="text-purple-500 mr-3 text-xl">A</span>
                    <div>
                      <span className="font-bold text-purple-400">Epic</span>
                      <p className="text-sm text-gray-400">Victoria, Elizabeth, Alexandra</p>
                    </div>
                  </li>
                  <li className="flex items-start p-3 rounded-md bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 transform hover:translate-x-2 transition-all duration-300">
                    <span className="text-blue-500 mr-3 text-xl">B</span>
                    <div>
                      <span className="font-bold text-blue-400">Rare</span>
                      <p className="text-sm text-gray-400">Anna, Julia, Fiona</p>
                    </div>
                  </li>
                  <li className="flex items-start p-3 rounded-md bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 transform hover:translate-x-2 transition-all duration-300">
                    <span className="text-green-500 mr-3 text-xl">C</span>
                    <div>
                      <span className="font-bold text-green-400">Common</span>
                      <p className="text-sm text-gray-400">Marcus, David, Henry</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            
            <section className="bg-[#041019]/60 p-6 rounded-xl border border-[var(--accent-blue-bright)]/30 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-bright)]/5 group">
              <h3 className="font-orbitron text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-blue-400 mr-2 group-hover:animate-pulse transition-all">🎯</span> 
                <span className="relative inline-block">
                  Ba Class Độc Đáo
                  <div className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent transition-all duration-300"></div>
                </span>
              </h3>
              
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg border border-[var(--accent-blue-bright)]/20 group/card">
                  <div className="flex p-4 items-center gap-4 bg-gradient-to-r from-red-500/10 to-transparent">
                    <div className="flex-shrink-0 w-16 h-16 relative rounded-full overflow-hidden border-2 border-red-500/30">
                      <Image 
                        src="/images/ga-cha/anh1.png" 
                        alt="Gunner" 
                        fill 
                        className="object-cover group-hover/card:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-orbitron text-xl font-bold text-red-400 mb-1">Gunner</h4>
                      <p className="text-sm text-gray-300">Tấn công liên thanh (1s/10 phát)</p>
                      <div className="mt-2 h-1 w-full bg-[#041019] rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full w-[80%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-lg border border-[var(--accent-blue-bright)]/20 group/card">
                  <div className="flex p-4 items-center gap-4 bg-gradient-to-r from-blue-500/10 to-transparent">
                    <div className="flex-shrink-0 w-16 h-16 relative rounded-full overflow-hidden border-2 border-blue-500/30">
                      <Image 
                        src="/images/ga-cha/anh2.png" 
                        alt="Sniper" 
                        fill 
                        className="object-cover group-hover/card:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-orbitron text-xl font-bold text-blue-400 mb-1">Sniper</h4>
                      <p className="text-sm text-gray-300">Bắn tỉa chính xác (1s/1 phát)</p>
                      <div className="mt-2 h-1 w-full bg-[#041019] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full w-[95%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-lg border border-[var(--accent-blue-bright)]/20 group/card">
                  <div className="flex p-4 items-center gap-4 bg-gradient-to-r from-orange-500/10 to-transparent">
                    <div className="flex-shrink-0 w-16 h-16 relative rounded-full overflow-hidden border-2 border-orange-500/30">
                      <Image 
                        src="/images/ga-cha/anh3.png" 
                        alt="Rocket" 
                        fill 
                        className="object-cover group-hover/card:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-orbitron text-xl font-bold text-orange-400 mb-1">Rocket</h4>
                      <p className="text-sm text-gray-300">Sát thương diện rộng (3s/1 phát)</p>
                      <div className="mt-2 h-1 w-full bg-[#041019] rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full w-[60%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GachaInfo; 