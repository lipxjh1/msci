'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { teamMembers } from './data';
import TeamMemberCard from './TeamMemberCard';
import DepartmentFilters from './components/DepartmentFilters';
import TeamFooter from './components/TeamFooter';

export default function TeamPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [filteredMembers, setFilteredMembers] = useState(teamMembers);

  // Filter team members based on selected department
  useEffect(() => {
    if (selectedDepartment) {
      setFilteredMembers(teamMembers.filter(member => member.department === selectedDepartment));
    } else {
      setFilteredMembers(teamMembers);
    }
  }, [selectedDepartment]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Team Banner */}
      <div className="relative h-[100vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/30 to-[#041019] z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/overwatch_bg_2.jpg')] bg-cover bg-center bg-no-repeat">
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse delay-200"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse delay-300"></div>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
          <h1 className="font-orbitron text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
            <span className="relative inline-block">
              ĐỘI NGŨ
              <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h1>
          <p className="font-rajdhani text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in text-center">
            Gặp gỡ những con người đứng sau thành công của M-SCI - đội ngũ đam mê và tài năng đang kiến tạo nên tương lai của game Việt.
          </p>
          
          {/* Nút cuộn xuống */}
          <div className="animate-slide-up">
            <button 
              onClick={() => document.getElementById('team-content')?.scrollIntoView({behavior: 'smooth'})}
              className="font-rajdhani font-bold tracking-wider text-shadow-sm px-10 py-3 button-cyber clip-hexagon hexagon-border text-white"
            >
              Khám phá đội ngũ
            </button>
          </div>
        </div>
      </div>

      {/* Team Content */}
      <div id="team-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
        {/* Curved section top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041019] -translate-y-full"></div>
        
        {/* Department Filters */}
        <DepartmentFilters 
          selectedDepartment={selectedDepartment} 
          setSelectedDepartment={setSelectedDepartment} 
        />
        
        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-24 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl card-neon">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="font-orbitron text-2xl font-bold text-white mb-3 text-shadow-blue">Không tìm thấy thành viên</h3>
            <p className="font-rajdhani text-white/60 max-w-lg mx-auto">Không có thành viên nào trong bộ phận này. Vui lòng thử lại với bộ lọc khác.</p>
            <button 
              onClick={() => setSelectedDepartment(null)} 
              className="font-rajdhani mt-6 px-6 py-3 tracking-wider text-shadow-sm button-cyber clip-hexagon hexagon-border"
            >
              Xem tất cả thành viên
            </button>
          </div>
        )}
      </div>
      
      {/* Team Footer with contacts and join us info */}
      <TeamFooter />
    </div>
  );
} 