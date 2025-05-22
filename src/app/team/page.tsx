'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { teamMembers, TeamMember } from './data';
import TeamMemberCard from './TeamMemberCard';
import DepartmentFilters from './components/DepartmentFilters';
import TeamFooter from './components/TeamFooter';
import Footer from '@/app/home/components/Footer';
import MemberPopup from './components/MemberPopup';

export default function TeamPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [filteredMembers, setFilteredMembers] = useState(teamMembers);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('right');

  // Hàm tự động cuộn
  const startAutoScroll = () => {
    if (!autoScrollActive) return;
    
    const container = scrollContainerRef.current;
    if (!container) return;
    
    autoScrollRef.current = setInterval(() => {
      if (!container) return;
      
      const scrollAmount = 1; // Tốc độ cuộn
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (scrollDirection === 'right') {
        // Cuộn từ trái sang phải
        container.scrollLeft += scrollAmount;
        
        // Nếu đã cuộn đến cuối, đổi hướng
        if (container.scrollLeft >= maxScroll - 5) {
          setScrollDirection('left');
        }
      } else {
        // Cuộn từ phải sang trái
        container.scrollLeft -= scrollAmount;
        
        // Nếu đã cuộn đến đầu, đổi hướng
        if (container.scrollLeft <= 5) {
          setScrollDirection('right');
        }
      }
    }, 30); // Cứ 30ms cuộn một lần để tạo hiệu ứng mượt mà
  };

  // Dừng tự động cuộn
  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  // Khởi động tự động cuộn khi trang được tải
  useEffect(() => {
    startAutoScroll();
    
    // Dọn dẹp khi component unmount
    return () => {
      stopAutoScroll();
    };
  }, [autoScrollActive, scrollDirection]);

  // Dừng tự động cuộn khi người dùng tương tác với container
  const handleMouseEnter = () => {
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    if (autoScrollActive) {
      startAutoScroll();
    }
  };

  // Filter team members based on selected department
  useEffect(() => {
    if (selectedDepartment) {
      setFilteredMembers(teamMembers.filter(member => member.department === selectedDepartment));
    } else {
      setFilteredMembers(teamMembers);
    }
  }, [selectedDepartment]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Hero section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        {/* Background image with parallax effect */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner/trangchu.jpg"
            alt="Team"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a141e]/70 via-transparent to-[#0a141e] z-10"></div>

          {/* Animated particles */}
          <div className="absolute inset-0 z-10">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50 animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-200"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse delay-300"></div>
          </div>

          {/* Add scanline effect */}
          <div className="absolute inset-0 scanline"></div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-orbitron text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
                <span className="relative inline-block">
                  OUR TEAM
                  <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform rotate-1 scale-110 z-20"></div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform -rotate-1 scale-110 z-20"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-16 pb-20 relative z-30">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-6 relative inline-block">
                  About Our Team
                  <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
                </h2>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  The M-SCI team consists of passionate and talented individuals from various fields, united by a vision to create breakthrough gaming experiences for players in Vietnam and worldwide.
                </p>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  Each member brings unique skills and perspectives, forming a diverse and creative collective always striving to elevate Vietnamese games to the global stage.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      5+
                    </div>
                    <div className="text-white/60 text-sm">Departments</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      20+
                    </div>
                    <div className="text-white/60 text-sm">Members</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      10+
                    </div>
                    <div className="text-white/60 text-sm">Projects</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-xl overflow-hidden border border-white/5 shadow-xl">
                  <Image
                    src="/images/banner/team.jpg"
                    alt="Team Overview"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a141e] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white font-bold text-lg mb-2">
                      M-SCI Team
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="p-2 px-3 bg-[#F44336]/20 backdrop-blur-sm rounded-md border border-[#F44336]/30">
                        <span className="text-[#F44336] font-medium text-sm">
                          Leadership
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#9C27B0]/20 backdrop-blur-sm rounded-md border border-[#9C27B0]/30">
                        <span className="text-[#9C27B0] font-medium text-sm">
                          Creative Team
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#2196F3]/20 backdrop-blur-sm rounded-md border border-[#2196F3]/30">
                        <span className="text-[#2196F3] font-medium text-sm">
                          Technical Team
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#4CAF50]/20 backdrop-blur-sm rounded-md border border-[#4CAF50]/30">
                        <span className="text-[#4CAF50] font-medium text-sm">
                          Operations Team
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Filters styled like in mechanics */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 relative inline-block">
              Departments
              <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
            </h2>
            
            <DepartmentFilters 
              selectedDepartment={selectedDepartment} 
              setSelectedDepartment={setSelectedDepartment} 
            />
          </div>
          
          {/* Team Members Grid - with improved card design */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 relative inline-block">
              Our Team
              <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
            </h2>
            
            <div className="w-full overflow-hidden relative">
              {/* Gradient masks */}
              <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-[#0a141e] to-transparent"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-[#0a141e] to-transparent"></div>
              
              {/* Team members carousel */}
              <div 
                ref={scrollContainerRef}
                className="w-full overflow-x-auto pb-6 scrollbar-none" 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ scrollBehavior: 'smooth' }}
              >
                <div className="flex flex-row gap-6 min-w-max px-16">
                  {filteredMembers.map((member, index) => (
                    <div key={member.id} className="w-[240px]">
                      <TeamMemberCard 
                        member={member} 
                        index={index} 
                        onClick={() => {
                          // Hiệu ứng ripple khi bấm
                          const ripple = document.createElement('div');
                          ripple.classList.add('animate-ripple', 'absolute', 'w-0', 'h-0', 'rounded-full', 'bg-white/30', 'pointer-events-none');
                          
                          // Thêm ripple element vào DOM
                          const cardElement = document.getElementById(`team-card-${member.id}`);
                          if (cardElement) {
                            const rect = cardElement.getBoundingClientRect();
                            ripple.style.left = `${rect.width / 2}px`;
                            ripple.style.top = `${rect.height / 2}px`;
                            cardElement.appendChild(ripple);
                            
                            // Xóa element sau khi animation kết thúc
                            setTimeout(() => {
                              ripple.remove();
                            }, 700);
                          }
                          
                          setSelectedMember(member);
                        }} 
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Control panel */}
              <div className="flex items-center justify-center mt-4 gap-4">
                <button 
                  className="p-2 rounded-full bg-[#1a2634]/80 backdrop-blur-sm hover:bg-[#F44336]/30 transition-colors"
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollLeft -= 500; // Cuộn nhanh sang trái
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  className={`px-4 py-2 rounded-md backdrop-blur-sm transition-colors ${autoScrollActive ? 'bg-[#F44336]/30 text-white' : 'bg-[#1a2634]/80 text-white/70'}`}
                  onClick={() => {
                    setAutoScrollActive(!autoScrollActive);
                    if (!autoScrollActive) {
                      startAutoScroll();
                    } else {
                      stopAutoScroll();
                    }
                  }}
                >
                  {autoScrollActive ? 'Stop Auto Scroll' : 'Auto Scroll'}
                </button>
                <button 
                  className="p-2 rounded-full bg-[#1a2634]/80 backdrop-blur-sm hover:bg-[#F44336]/30 transition-colors"
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollLeft += 500; // Cuộn nhanh sang phải
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Empty State */}
            {filteredMembers.length === 0 && (
              <div className="text-center py-24 bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl shadow-lg">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Không tìm thấy thành viên</h3>
                <p className="text-white/60 max-w-lg mx-auto">Không có thành viên nào trong bộ phận này. Vui lòng thử lại với bộ lọc khác.</p>
                <button 
                  onClick={() => setSelectedDepartment(null)} 
                  className="mt-6 px-8 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-[#F44336] to-[#e53935] hover:from-[#e53935] hover:to-[#F44336] transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/30"
                >
                  Xem tất cả thành viên
                </button>
              </div>
            )}
          </div>
          
          {/* CTA Section - styled like mechanics footer section */}
          <div className="mt-16 bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-8 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Join the M-SCI Team
              </h2>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                M-SCI is always looking for new talents to help build the future of gaming. If you are passionate about games and want to make a difference, check out our open positions.
              </p>
              <Link href="/careers" className="inline-block px-8 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-[#F44336] to-[#e53935] hover:from-[#e53935] hover:to-[#F44336] transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/30">
                See Career Opportunities
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add updated TeamFooter */}
      <Footer />

      {/* Member Popup */}
      {selectedMember && (
        <MemberPopup 
          member={selectedMember} 
          onClose={() => setSelectedMember(null)} 
        />
      )}
    </div>
  );
} 