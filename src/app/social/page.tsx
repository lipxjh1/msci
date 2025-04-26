"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUsers, FaGlobe, FaRocket, FaChartLine, FaCheckCircle } from "react-icons/fa";
import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";

export default function SocialPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [kpiAnimated, setKpiAnimated] = useState(false);
  const kpiRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal-item');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
      
      // Kiểm tra nếu phần KPI đã xuất hiện trong viewport
      if (kpiRef.current) {
        const rect = kpiRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !kpiAnimated) {
          setKpiAnimated(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [kpiAnimated]);

  // Hàm tạo hiệu ứng đếm số từ 0 đến giá trị target
  useEffect(() => {
    if (kpiAnimated) {
      const counters = document.querySelectorAll('.counter-value');
      const speed = 200;
      
      counters.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute('data-target') || '0', 10);
        const increment = targetValue / speed;
        let currentValue = 0;
        
        const updateCounter = () => {
          if (currentValue < targetValue) {
            currentValue += increment;
            counter.textContent = Math.ceil(currentValue).toString();
            setTimeout(updateCounter, 1);
          } else {
            counter.textContent = targetValue.toString();
          }
        };
        
        updateCounter();
      });
      
      // Chạy animation cho circular progress
      document.querySelectorAll('.circular-progress').forEach(circle => {
        const percent = circle.getAttribute('data-percent') || '0';
        if (circle instanceof HTMLElement) {
          circle.style.background = `conic-gradient(
            #54d8ff ${percent}%, 
            rgba(255, 255, 255, 0.1) ${percent}%
          )`;
        }
      });
    }
  }, [kpiAnimated]);

  return (
    <main className="min-h-screen text-white">
      {/* Thanh điều hướng */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ThanhDieuHuongResponsive />
      </div>
      
      {/* Trang chính với hiệu ứng nền hiện đại */}
      <div className="relative min-h-screen">
        {/* Nền động */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1923] via-[#162032] to-[#0a1018]"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
          <div className="absolute inset-0 bg-[url('/images/particle_overlay.png')] opacity-10 bg-repeat"></div>
        </div>

        {/* Hero Section - Điều chỉnh padding-top để không bị che bởi thanh điều hướng */}
        <section className="relative pt-28 pb-20 px-4 overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center reveal-item">
              <div className="inline-block mb-6">
                <div className="p-1 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  <Image src="/images/overwatch_logo.png" alt="M-SCI Logo" width={80} height={80} className="bg-[#0f1923] rounded-lg" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                TRUNG TÂM CỘNG ĐỒNG
              </h1>
              <div className="mb-6 relative">
                <div className="text-3xl md:text-4xl font-bold text-white">M-SCI</div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600"></div>
              </div>
              
              <p className="text-xl md:text-2xl font-light mb-8 text-blue-100">
                "Kết Nối Cộng Đồng - Lan Tỏa Giá Trị"
              </p>
              <p className="max-w-3xl mx-auto text-md md:text-lg text-gray-300 mb-12">
                Trung tâm Cộng đồng M-SCI là nền tảng kết nối cộng đồng game, được thiết kế nhằm tạo ra một hệ sinh thái 
                tương tác mạnh mẽ giữa người chơi, nhà phát triển và các đối tác. Với tầm nhìn xây dựng cộng đồng game bền vững, 
                Trung tâm Cộng đồng là minh chứng cho cam kết của M-SCI.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-medium overflow-hidden transition-all">
                  <span className="relative z-10">Tham Gia Cộng Đồng</span>
                  <div className="absolute inset-0 scale-0 rounded-xl bg-white/20 transition-transform duration-300 group-hover:scale-100"></div>
                </button>
                <button className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white font-medium overflow-hidden transition-all">
                  <span className="relative z-10">Xem Sự Kiện</span>
                  <div className="absolute inset-0 scale-0 rounded-xl bg-white/10 transition-transform duration-300 group-hover:scale-100"></div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Đường cong trang trí */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#101a24]"></div>
        </section>

        {/* Mục tiêu chiến lược */}
        <section className="relative py-20 px-4 bg-[#101a24]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal-item">
              <h2 className="inline-block text-3xl md:text-5xl font-bold mb-3 text-white">
                MỤC TIÊU CHIẾN LƯỢC
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { icon: <FaUsers size={36} />, title: "Kết nối", desc: "Xây dựng mạng lưới người chơi toàn cầu" },
                { icon: <FaGlobe size={36} />, title: "Tương tác", desc: "Tạo trải nghiệm cộng đồng sâu sắc" },
                { icon: <FaRocket size={36} />, title: "Phát triển", desc: "Nuôi dưỡng tài năng và sáng tạo" },
                { icon: <FaChartLine size={36} />, title: "Bền vững", desc: "Xây dựng hệ sinh thái game lâu dài" }
              ].map((item, index) => (
                <div key={index} className="relative group reveal-item">
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-blue-600/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* KPIs với hiệu ứng biểu đồ và animation */}
            <div className="relative reveal-item" ref={kpiRef}>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-3xl blur-md"></div>
              <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 p-10 rounded-3xl">
                <h3 className="text-3xl font-bold mb-8 text-center text-white">Chỉ số Hiệu quả <span className="text-cyan-400">(KPIs)</span></h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { metric: "65", symbol: "+", percent: 65, desc: "Tỷ lệ tương tác hàng ngày", color: "from-cyan-400 to-blue-400" },
                    { metric: "45", symbol: "", percent: 45, desc: "Thời gian tương tác trung bình/ngày", color: "from-blue-400 to-indigo-400" },
                    { metric: "80", symbol: "+", percent: 80, desc: "Tỷ lệ giữ chân người dùng", color: "from-indigo-400 to-purple-400" },
                    { metric: "15", symbol: "", percent: 15, desc: "Tăng trưởng cộng đồng/tháng", color: "from-purple-400 to-cyan-400" }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 transform transition-transform hover:scale-105">
                      {/* Biểu đồ tròn với animation */}
                      <div className="circular-chart-container mb-4 relative">
                        <div 
                          className={`circular-progress w-36 h-36 rounded-full flex items-center justify-center ${kpiAnimated ? 'animate-progress' : ''}`}
                          data-percent={item.percent}
                        >
                          <div className="circle-bg w-28 h-28 rounded-full bg-[#0f1923] flex items-center justify-center">
                            <div className="text-center">
                              <span className={`counter-value text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} data-target={item.metric}>
                                0
                              </span>
                              <span className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.symbol}</span>
                              {item.symbol === '' && <span className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>ph</span>}
                              {item.symbol === '' && index === 3 && <span className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>%</span>}
                            </div>
                          </div>
                        </div>
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                          <path
                            className="circle-bg"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path
                            className={`circle ${kpiAnimated ? 'animate-stroke' : ''}`}
                            strokeDasharray={`${item.percent}, 100`}
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            stroke={`url(#gradient-${index})`}
                            strokeWidth="2"
                            fill="none"
                          />
                          <defs>
                            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgb(34, 211, 238)" />
                              <stop offset="100%" stopColor="rgb(59, 130, 246)" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="text-blue-100 text-center">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tính năng độc đáo */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal-item">
              <h2 className="inline-block text-3xl md:text-5xl font-bold mb-3 text-white">
                TÍNH NĂNG ĐỘC ĐÁO
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto"></div>
            </div>
            
            <div className="space-y-20">
              {[
                {
                  title: "Mạng lưới Cộng đồng Thần kinh",
                  desc: "Hệ thống kết nối dựa trên AI với gợi ý bạn bè thông minh dựa trên phong cách chơi, dịch thuật đa ngôn ngữ thời gian thực, và phân tích cảm xúc cộng đồng.",
                  stats: ["Tăng 40% tỷ lệ kết bạn thành công", "Giảm 60% rào cản ngôn ngữ", "Cải thiện 35% trải nghiệm người dùng"],
                  image: "/images/new.jpg"
                },
                {
                  title: "Hệ thống Sự kiện Động",
                  desc: "Sự kiện tự động theo hành vi người chơi, phần thưởng cá nhân hóa, tích hợp với lối chơi chính, và tham gia đa nền tảng.",
                  stats: ["500+ sự kiện/tháng", "75% tỷ lệ tham gia", "90% độ hài lòng người dùng"],
                  image: "/images/like.jpg"
                },
                {
                  title: "Nền tảng Kinh tế Sáng tạo",
                  desc: "Công cụ tạo nội dung tích hợp, chợ cho tài sản người sáng tạo, mô hình chia sẻ doanh thu, và chương trình cố vấn.",
                  stats: ["10.000+ người sáng tạo nội dung", "500.000$+ thu nhập cho người sáng tạo", "1 triệu+ nội dung được tạo"],
                  image: "/images/free.jpg"
                }
              ].map((feature, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center reveal-item`}>
                  <div className="lg:w-1/2 relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-md opacity-70"></div>
                    <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden border border-white/10">
                      <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101a24] to-transparent opacity-60"></div>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{feature.title}</h3>
                    <p className="text-xl text-blue-100 mb-8">{feature.desc}</p>
                    <ul className="space-y-4">
                      {feature.stats.map((stat, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-cyan-400 mr-3"><FaCheckCircle /></span>
                          <span className="text-gray-300 text-lg">{stat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center reveal-item">
            <div className="relative py-16 px-8 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-xl"></div>
              <div className="absolute inset-0 backdrop-blur-sm bg-[#101a24]/60"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">SẴN SÀNG THAM GIA?</h2>
                <p className="max-w-2xl mx-auto text-xl text-blue-100 mb-10">
                  Trung tâm Cộng đồng M-SCI không chỉ là một tính năng - đó là trái tim của hệ sinh thái game, 
                  nơi công nghệ và con người gặp gỡ để tạo nên những trải nghiệm không thể quên.
                </p>
                <button className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white text-lg font-medium overflow-hidden transition-all">
                  <span className="relative z-10">Tham Gia Ngay</span>
                  <div className="absolute inset-0 scale-0 rounded-xl bg-white/20 transition-transform duration-300 group-hover:scale-100"></div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-item.active {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Biểu đồ tròn và animation */
        .circular-progress {
          background: conic-gradient(
            #54d8ff 0%, 
            rgba(255, 255, 255, 0.1) 0%
          );
          transition: background 1.5s ease-in-out;
        }
        
        .animate-progress {
          animation: progress 1.5s ease-in-out forwards;
        }
        
        @keyframes progress {
          from {
            background: conic-gradient(
              #54d8ff 0%, 
              rgba(255, 255, 255, 0.1) 0%
            );
          }
        }
        
        .circle {
          stroke-dasharray: 0, 100;
          transition: stroke-dasharray 1.5s ease-in-out;
        }
        
        .animate-stroke {
          animation: stroke 1.5s ease-in-out forwards;
        }
        
        @keyframes stroke {
          from {
            stroke-dasharray: 0, 100;
          }
        }
      `}</style>
    </main>
  );
} 