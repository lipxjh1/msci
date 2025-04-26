'use client';

import { useState } from 'react';
import Link from 'next/link';

interface JobPositionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  onApply: () => void;
}

export default function JobPosition({ 
  icon, 
  title, 
  description, 
  index,
  onApply
}: JobPositionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="relative bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 transition-all duration-300 transform-gpu hover:shadow-xl hover:bg-white/10 animate-fadeIn card-neon group cursor-pointer"
      style={{ 
        animationDelay: `${index * 50}ms` 
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-[var(--accent-blue-bright)]/20 flex items-center justify-center text-[var(--accent-blue-bright)]">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-rajdhani text-xl font-bold text-white tracking-wide mb-2 text-shadow-blue group-hover:text-[var(--accent-blue-bright)] transition-colors duration-300">{title}</h3>
            <div className="flex items-center justify-center w-8 h-8">
              <svg 
                className={`w-5 h-5 transition-transform duration-300 text-white/70 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="font-rajdhani text-white/80 group-hover:text-white/90 transition-colors duration-300">{description}</p>
          
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-white/10 animate-fadeIn">
              <h4 className="font-rajdhani text-lg font-bold text-[var(--accent-blue-bright)] mb-2">Yêu cầu:</h4>
              <ul className="font-rajdhani text-white/80 space-y-2 pl-4">
                <li className="flex items-start gap-2 before:content-['•'] before:text-[var(--accent-blue-bright)] before:mr-2">
                  Kinh nghiệm làm việc ít nhất 1 năm trong vị trí tương tự
                </li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-[var(--accent-blue-bright)] before:mr-2">
                  Có portfolio/Github thể hiện năng lực
                </li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-[var(--accent-blue-bright)] before:mr-2">
                  Đam mê phát triển game và công nghệ mới
                </li>
              </ul>
              
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện click lan tỏa lên component cha
                    onApply();
                  }}
                  className="px-4 py-2 bg-[var(--accent-blue-bright)]/20 hover:bg-[var(--accent-blue-bright)]/30 text-[var(--accent-blue-bright)] font-medium rounded-lg transition-colors duration-300"
                >
                  Ứng tuyển ngay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Corner decoration - top left */}
      <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-16 h-16 -translate-x-8 -translate-y-8 rotate-45 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ 
            background: 'linear-gradient(135deg, var(--accent-blue-bright), transparent)'
          }}
        ></div>
      </div>
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
        style={{ 
          boxShadow: 'inset 0 0 20px 5px var(--accent-blue-bright)/40'
        }}
      ></div>
    </div>
  );
} 