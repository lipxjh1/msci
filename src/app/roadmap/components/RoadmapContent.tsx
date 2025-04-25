'use client';

import TimelineSection from './TimelineSection';
import KPIStatsSection from './KPIStatsSection';
import TechCommunitySection from './TechCommunitySection';

export default function RoadmapContent() {
  return (
    <div id="roadmap-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
      {/* Curved section top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041019] -translate-y-full"></div>
      
      {/* Giới thiệu */}
      <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
        <div className="flex flex-col items-center text-center mb-6">
          <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo mb-4">
            <span className="text-shadow-blue relative inline-block">
              TẦM NHÌN 2024-2030
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
          <p className="text-gray-300 max-w-3xl font-rajdhani">
            M-SCI không chỉ là một tựa game - đó là khởi đầu cho hành trình đưa ngành công nghiệp game Việt Nam vươn tầm thế giới. Lộ trình dưới đây phác thảo kế hoạch phát triển chi tiết từ 2024 đến 2030.
          </p>
        </div>
      </div>
      
      {/* Timeline Section */}
      <TimelineSection />
      
      {/* Spacer */}
      <div className="py-8"></div>
      
      {/* KPI Stats Section */}
      <KPIStatsSection />
      
      {/* Spacer */}
      <div className="py-8"></div>
      
      {/* Tech & Community Section */}
      <TechCommunitySection />
    </div>
  );
} 