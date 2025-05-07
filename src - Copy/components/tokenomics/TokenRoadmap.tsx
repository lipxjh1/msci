'use client';

import { useState } from 'react';
import React from 'react';

interface RoadmapPhase {
  id: string;
  title: string;
  time: string;
  description: string;
  milestones: string[];
  color: string;
  icon: React.ReactNode;
}

export default function TokenRoadmap() {
  const [activePhase, setActivePhase] = useState<string>('phase1');
  
  const phases: RoadmapPhase[] = [
    {
      id: 'phase1',
      title: 'Launch',
      time: 'Q2 2024',
      description: 'Ra mắt token và thiết lập nền tảng thanh khoản ban đầu',
      milestones: [
        'Token Generation Event (TGE)',
        'DEX listings (PancakeSwap, Uniswap)',
        'Staking platform launch',
        'Initial liquidity provision'
      ],
      color: '#4CAF50',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'phase2',
      title: 'Growth',
      time: 'Q3-Q4 2024',
      description: 'Mở rộng việc niêm yết và tính năng DeFi',
      milestones: [
        'CEX listings (Tier 1 exchanges)',
        'Cross-chain expansion',
        'Advanced DeFi features',
        'Governance implementation'
      ],
      color: '#2196F3',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'phase3',
      title: 'Maturity',
      time: '2025+',
      description: 'Chuyển sang DAO và mở rộng tiện ích',
      milestones: [
        'DAO transition',
        'Multi-chain presence',
        'Real-world utility expansion',
        'Ecosystem partnerships'
      ],
      color: '#9C27B0',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];
  
  return (
    <section className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl card-neon">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            ROADMAP TOKEN
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      {/* Roadmap Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md backdrop-blur-md bg-black/20 border border-white/10 p-1">
          {phases.map((phase) => (
            <button
              key={phase.id}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activePhase === phase.id
                ? `bg-${phase.color.replace('#', '')} text-white`
                : 'text-white/70 hover:bg-white/5'
              }`}
              style={{ 
                backgroundColor: activePhase === phase.id ? `${phase.color}30` : '',
                borderColor: activePhase === phase.id ? phase.color : ''
              }}
              onClick={() => setActivePhase(phase.id)}
            >
              {phase.title}
            </button>
          ))}
        </div>
      </div>

      {/* Roadmap Horizontal Timeline */}
      <div className="mb-10 relative">
        <div className="absolute top-5 left-0 right-0 h-1 bg-white/10"></div>
        
        <div className="flex justify-between">
          {phases.map((phase, index) => (
            <div 
              key={phase.id} 
              className={`relative flex flex-col items-center cursor-pointer ${index === 0 ? 'ml-0' : ''} ${index === phases.length - 1 ? 'mr-0' : ''}`}
              onClick={() => setActivePhase(phase.id)}
            >
              <div 
                className={`h-10 w-10 rounded-full flex items-center justify-center z-10 transition-colors ${
                  activePhase === phase.id 
                    ? 'bg-white/20 border-2' 
                    : 'bg-black/30 border'
                }`}
                style={{ borderColor: phase.color }}
              >
                <div className={`${activePhase === phase.id ? `text-${phase.color.replace('#', '')}` : 'text-white/70'}`}>
                  {phase.icon}
                </div>
              </div>
              
              <p className={`mt-3 text-sm font-medium ${activePhase === phase.id ? 'text-white' : 'text-white/70'}`}>
                {phase.time}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Active Phase Details */}
      {phases.map((phase) => (
        <div 
          key={phase.id}
          className={`bg-white/5 rounded-xl border shadow-lg transition-opacity duration-300 overflow-hidden ${
            activePhase === phase.id ? 'opacity-100 border-opacity-100' : 'opacity-0 hidden border-opacity-0'
          }`}
          style={{ borderColor: phase.color }}
        >
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="h-12 w-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${phase.color}20` }}
                >
                  <div style={{ color: phase.color }}>
                    {phase.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{phase.title} - {phase.time}</h3>
                  <p className="text-white/70">{phase.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Milestones */}
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Milestones</h4>
                  <ul className="space-y-3">
                    {phase.milestones.map((milestone, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div 
                          className="h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: `${phase.color}20` }}
                        >
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: phase.color }}></div>
                        </div>
                        <span className="text-white">{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Visualization */}
                <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-4 rounded-lg border border-white/10 space-y-4">
                  <h4 className="font-medium text-white">Tập trung</h4>
                  
                  {phase.id === 'phase1' && (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-white/70 mb-1">Liquidity</p>
                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '80%', backgroundColor: phase.color }}></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-white/70 mb-1">Distribution</p>
                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '65%', backgroundColor: phase.color }}></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-white/70 mb-1">Community</p>
                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '45%', backgroundColor: phase.color }}></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-white/70 mb-1">Governance</p>
                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '20%', backgroundColor: phase.color }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {phase.id === 'phase2' && (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-white/70 mb-1">Liquidity</p>
                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: phase.color }}></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-white/70 mb-1">Distribution</p>
                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: phase.color }}></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-white/70 mb-1">Community</p>
                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '70%', backgroundColor: phase.color }}></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-white/70 mb-1">Governance</p>
                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '55%', backgroundColor: phase.color }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {phase.id === 'phase3' && (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-white/70 mb-1">Liquidity</p>
                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '95%', backgroundColor: phase.color }}></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-white/70 mb-1">Distribution</p>
                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: phase.color }}></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-white/70 mb-1">Community</p>
                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: phase.color }}></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-white/70 mb-1">Governance</p>
                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: phase.color }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Next Up */}
            {phase.id !== 'phase3' && (
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-white/70 text-sm">
                  Next up: 
                  <button 
                    onClick={() => {
                      const currentIndex = phases.findIndex(p => p.id === activePhase);
                      if (currentIndex < phases.length - 1) {
                        setActivePhase(phases[currentIndex + 1].id);
                      }
                    }}
                    className="ml-2 text-white hover:underline font-medium"
                  >
                    {phase.id === 'phase1' ? 'Growth Phase (Q3-Q4 2024)' : 'Maturity Phase (2025+)'}
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
} 