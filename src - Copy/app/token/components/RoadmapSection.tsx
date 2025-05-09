'use client';

import { useRef, useEffect, useState } from 'react';

interface RoadmapItem {
  id: number;
  phase: string;
  timeline: string;
  title: string;
  description: string;
  tasks: string[];
  isActive?: boolean;
}

const roadmapData: RoadmapItem[] = [
  {
    id: 1,
    phase: 'Giai Đoạn 1',
    timeline: 'Q2 2024',
    title: 'Khởi Động',
    description: 'Ra mắt token và thiết lập các cơ chế căn bản cho hệ sinh thái.',
    tasks: [
      'Token Generation Event (TGE)',
      'Listing trên DEX (PancakeSwap)',
      'Ra mắt staking platform',
      'Initial liquidity provision'
    ],
    isActive: true
  },
  {
    id: 2,
    phase: 'Giai Đoạn 2',
    timeline: 'Q3-Q4 2024',
    title: 'Mở Rộng',
    description: 'Tăng cường tính thanh khoản và mở rộng các tính năng DeFi.',
    tasks: [
      'Listing trên CEX lớn (Binance, OKX)',
      'Tích hợp cross-chain',
      'Governance system',
      'Advanced DeFi features'
    ]
  },
  {
    id: 3,
    phase: 'Giai Đoạn 3',
    timeline: '2025+',
    title: 'Trưởng Thành',
    description: 'Chuyển đổi thành hệ sinh thái tự quản và mở rộng quy mô toàn cầu.',
    tasks: [
      'Chuyển đổi sang DAO',
      'Multi-chain expansion',
      'Real-world utility',
      'Ecosystem partnerships'
    ]
  }
];

const RoadmapSection = () => {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    if (roadmapRef.current) {
      const elements = roadmapRef.current.querySelectorAll('.roadmap-item');
      elements.forEach(element => {
        observer.observe(element);
      });
    }

    return () => {
      if (roadmapRef.current) {
        const elements = roadmapRef.current.querySelectorAll('.roadmap-item');
        elements.forEach(element => {
          observer.unobserve(element);
        });
      }
    };
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="mb-20 animate-fade-in-section">
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            LỘ TRÌNH PHÁT TRIỂN
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div ref={roadmapRef} className="relative">
        {/* Line running through center */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[var(--accent-blue-bright)] via-[var(--accent-blue-bright)] to-transparent"></div>
        
        <div className="relative z-10 space-y-8 py-4">
          {roadmapData.map((item, index) => (
            <div 
              key={item.id}
              className={`roadmap-item opacity-0 relative animate-fade-in-section`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 w-8 h-8 rounded-full bg-[var(--accent-blue-bright)] z-20 flex items-center justify-center shadow-lg shadow-[var(--accent-blue-bright)]/30 roadmap-dot">
                  <div className={`w-3 h-3 rounded-full ${item.isActive ? 'bg-white animate-pulse' : 'bg-white/50'}`}></div>
                </div>
                
                {/* Compact Header - Always visible */}
                <button 
                  onClick={() => toggleExpand(item.id)}
                  className={`w-full md:w-auto backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10 shadow-xl transition-all duration-300 hover:border-[var(--accent-blue-bright)]/50 hover:bg-white/10 ${
                    expandedItem === item.id ? 'border-[var(--accent-blue-bright)]/50 bg-white/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.isActive 
                        ? 'bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)]' 
                        : 'bg-white/10 text-white/70'
                    }`}>
                      {item.phase}
                    </div>
                    <span className="text-gray-400 font-rajdhani mr-2">{item.timeline}</span>
                    <h3 className="font-rajdhani text-xl font-bold text-white">{item.title}</h3>
                    <div className="ml-auto">
                      <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${expandedItem === item.id ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              
              {/* Expanded Content - Only visible when clicked */}
              {expandedItem === item.id && (
                <div className="mt-4 ml-8 md:ml-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-300 animate-fadeIn">
                  <p className="text-gray-300 mb-5 font-rajdhani">{item.description}</p>
                  
                  <h4 className="font-rajdhani text-lg font-bold text-white mb-3">Mục tiêu chính:</h4>
                  <ul className="space-y-2">
                    {item.tasks.map((task, idx) => (
                      <li 
                        key={idx}
                        className="font-rajdhani text-white/80 flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-[var(--accent-blue-bright)] before:rounded-full"
                      >
                        <span className="ml-1">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="font-rajdhani text-gray-300 max-w-3xl mx-auto">
          Lộ trình có thể được điều chỉnh để phù hợp với điều kiện thị trường và tiến độ phát triển. 
          Người nắm giữ token MSCI sẽ được quyền bỏ phiếu cho các thay đổi.
        </p>
      </div>
    </div>
  );
};

export default RoadmapSection; 