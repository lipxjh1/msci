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
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="my-8 py-6">
      {/* Backdrop glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Tiêu đề chính - HỆ THỐNG GACHA */}
      <div className="relative z-10 text-center mb-12 animate-on-scroll fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 animate-gradient">
          HỆ THỐNG GACHA
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6"></div>
        <p className="text-gray-300 md:text-lg max-w-3xl mx-auto px-4">
          Khám phá hệ thống Gacha độc đáo của M-SCI, nơi bạn có thể thu thập các anh hùng với sức mạnh khác nhau để xây dựng đội hình chiến đấu của mình.
        </p>
      </div>

      {/* Khám Phá Vũ Trụ Anh Hùng */}
      <div className="max-w-6xl mx-auto mb-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 p-6 bg-[#041832]/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 animate-on-scroll slide-right">
            <h3 className="text-2xl font-bold text-white relative pl-4 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-400 before:to-cyan-300 animate-pulse-slow">
              Khám Phá Vũ Trụ Anh Hùng M-SCI
            </h3>
            
            <p className="text-gray-300">
              Chào mừng đến với hệ thống Gacha đỉnh cao của M-SCI - nơi vận mệnh nhân loại nằm trong tay bạn! Với mỗi lần quay, bạn có cơ hội sở hữu những chiến binh huyền thoại, mỗi người mang một sức mạnh và câu chuyện riêng.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-3 bg-blue-900/30 px-4 py-3 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:translate-y-[-2px]">
                <div className="w-3 h-3 rounded-full bg-cyan-400 pulse-animation"></div>
                <span className="text-cyan-100">Tỷ lệ minh bạch</span>
              </div>
              <div className="flex items-center gap-3 bg-blue-900/30 px-4 py-3 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:translate-y-[-2px]">
                <div className="w-3 h-3 rounded-full bg-purple-400 pulse-animation"></div>
                <span className="text-purple-100">Cập nhật thường xuyên</span>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden animate-on-scroll slide-left shadow-glow group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-400/10 z-10 group-hover:opacity-70 transition-opacity duration-700"></div>
            <Image 
              src="/images/ga-cha/anh1.png"
              alt="Gacha Heroes"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent z-20"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-30">
              <p className="text-white font-bold text-xl text-shadow-blue animate-float">Hàng ngàn chiến binh đang chờ bạn khám phá!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Phân loại nhân vật và lớp */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Đẳng Cấp Nhân Vật */}
          <div className="space-y-8 animate-on-scroll slide-up p-6 bg-[#041832]/50 backdrop-blur-sm rounded-2xl border border-blue-500/20">
            <div className="flex items-center gap-3">
              <span className="text-yellow-400 text-3xl animate-pulse-slow">🌟</span>
              <h3 className="text-2xl font-bold text-white glow-text-yellow">Đẳng Cấp Nhân Vật</h3>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-white/80 mb-4">Hệ Thống Độ Hiếm</h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-lg border border-red-500/10 hover:border-red-500/30 transition-all duration-300 transform hover:translate-x-2 hover:shadow-glow-red">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-red-900/50 flex items-center justify-center text-red-500 font-bold animate-pulse-slow">S</div>
                    <span className="font-bold text-red-400 text-lg">Legendary</span>
                  </div>
                  <p className="text-gray-400 ml-11">Akane, Alice, Caitlyn</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 transform hover:translate-x-2 hover:shadow-glow-purple">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-500 font-bold animate-pulse-slow">A</div>
                    <span className="font-bold text-purple-400 text-lg">Epic</span>
                  </div>
                  <p className="text-gray-400 ml-11">Victoria, Elizabeth, Alexandra</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 transform hover:translate-x-2 hover:shadow-glow-blue">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-500 font-bold animate-pulse-slow">B</div>
                    <span className="font-bold text-blue-400 text-lg">Rare</span>
                  </div>
                  <p className="text-gray-400 ml-11">Anna, Julia, Fiona</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/10 hover:border-green-500/30 transition-all duration-300 transform hover:translate-x-2 hover:shadow-glow-green">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center text-green-500 font-bold animate-pulse-slow">C</div>
                    <span className="font-bold text-green-400 text-lg">Common</span>
                  </div>
                  <p className="text-gray-400 ml-11">Marcus, David, Henry</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ba Class Độc Đáo */}
          <div className="space-y-8 animate-on-scroll slide-up delay-300 p-6 bg-[#041832]/50 backdrop-blur-sm rounded-2xl border border-blue-500/20">
            <div className="flex items-center gap-3">
              <span className="text-blue-400 text-3xl animate-pulse-slow">🎯</span>
              <h3 className="text-2xl font-bold text-white glow-text-blue">Ba Class Độc Đáo</h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-900/20 to-transparent rounded-lg overflow-hidden border border-red-500/20 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-glow-red group">
                <div className="flex p-5 items-center gap-5">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden">
                    <Image 
                      src="/images/ga-cha/anh1.png" 
                      alt="Gunner" 
                      fill 
                      className="object-cover group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-red-900/20 group-hover:bg-red-900/10 transition-all duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors duration-300">Gunner</h4>
                    <p className="text-gray-300 mb-3">Tấn công liên thanh (1s/10 phát)</p>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-[80%] animate-pulse-width"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-900/20 to-transparent rounded-lg overflow-hidden border border-blue-500/20 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-glow-blue group">
                <div className="flex p-5 items-center gap-5">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden">
                    <Image 
                      src="/images/ga-cha/anh2.png" 
                      alt="Sniper" 
                      fill 
                      className="object-cover group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/10 transition-all duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300">Sniper</h4>
                    <p className="text-gray-300 mb-3">Bắn tỉa chính xác (1s/1 phát)</p>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[95%] animate-pulse-width"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-900/20 to-transparent rounded-lg overflow-hidden border border-orange-500/20 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-glow-orange group">
                <div className="flex p-5 items-center gap-5">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden">
                    <Image 
                      src="/images/ga-cha/anh3.png" 
                      alt="Rocket" 
                      fill 
                      className="object-cover group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-orange-900/20 group-hover:bg-orange-900/10 transition-all duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-orange-400 mb-2 group-hover:text-orange-300 transition-colors duration-300">Rocket</h4>
                    <p className="text-gray-300 mb-3">Sát thương diện rộng (3s/1 phát)</p>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 w-[60%] animate-pulse-width"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hiệu ứng CSS */}
      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1);
        }
        
        .animate-in {
          opacity: 1;
          transform: translateY(0) translateX(0) !important;
        }
        
        .fade-up {
          transform: translateY(30px);
        }
        
        .slide-right {
          transform: translateX(-50px);
        }
        
        .slide-left {
          transform: translateX(50px);
        }
        
        .slide-up {
          transform: translateY(50px);
        }
        
        .pulse-animation {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .animate-pulse-width {
          animation: pulseWidth 4s ease-in-out infinite;
        }
        
        .shadow-glow {
          box-shadow: 0 0 25px rgba(37, 99, 235, 0.15);
          transition: box-shadow 0.3s ease;
        }
        
        .shadow-glow:hover {
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.3);
        }
        
        .shadow-glow-red {
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.15);
        }
        
        .shadow-glow-purple {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.15);
        }
        
        .shadow-glow-blue {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
        }
        
        .shadow-glow-green {
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.15);
        }
        
        .shadow-glow-orange {
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.15);
        }
        
        .glow-text-yellow {
          text-shadow: 0 0 10px rgba(253, 224, 71, 0.3);
        }
        
        .glow-text-blue {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
        }
        
        .text-shadow-blue {
          text-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes pulseWidth {
          0%, 100% {
            width: var(--width);
            opacity: 1;
          }
          50% {
            width: calc(var(--width) - 10%);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
};

export default GachaInfo; 