'use client';

import { useState } from 'react';

export default function TokenomicsCharts() {
  const [activeTab, setActiveTab] = useState<'release' | 'supply'>('release');

  // Dữ liệu cho biểu đồ phát hành token
  const releaseData = [
    { quarter: 'Q1 Năm 1', value: 15, tokens: '150M' },
    { quarter: 'Q2 Năm 1', value: 20, tokens: '200M' },
    { quarter: 'Q3 Năm 1', value: 25, tokens: '250M' },
    { quarter: 'Q4 Năm 1', value: 30, tokens: '300M' },
    { quarter: 'Năm 2', value: 40, tokens: '400M' },
    { quarter: 'Năm 3', value: 60, tokens: '600M' },
    { quarter: 'Năm 4', value: 80, tokens: '800M' },
    { quarter: 'Năm 5', value: 100, tokens: '1B' }
  ];

  // Dữ liệu cho biểu đồ cung lưu hành
  const supplyData = [
    { year: 'Ban đầu', circulating: 15, locked: 85 },
    { year: 'Năm 1', circulating: 30, locked: 70 },
    { year: 'Năm 2', circulating: 50, locked: 50 },
    { year: 'Năm 3', circulating: 70, locked: 30 },
    { year: 'Năm 4', circulating: 85, locked: 15 },
    { year: 'Năm 5', circulating: 95, locked: 5 }
  ];

  // Xác định chiều cao tối đa cho biểu đồ
  const maxBarHeight = 200;

  return (
    <section className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl card-neon">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            LỊCH TRÌNH PHÁT HÀNH
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex rounded-lg overflow-hidden button-cyber border border-white/10">
          <button
            className={`px-6 py-2 ${activeTab === 'release' ? 'bg-[#FFD700]/20 text-white' : 'bg-transparent text-white/70'}`}
            onClick={() => setActiveTab('release')}
          >
            Token Release
          </button>
          <button
            className={`px-6 py-2 ${activeTab === 'supply' ? 'bg-[#FFD700]/20 text-white' : 'bg-transparent text-white/70'}`}
            onClick={() => setActiveTab('supply')}
          >
            Circulating Supply
          </button>
        </div>
      </div>
      
      {/* Chart container */}
      <div className="relative h-[400px] pb-16">
        {/* Release Chart */}
        {activeTab === 'release' && (
          <div className="h-full">
            <div className="absolute left-12 top-0 bottom-16 w-px bg-white/20"></div>
            <div className="absolute left-12 bottom-16 right-0 h-px bg-white/20"></div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-16 flex flex-col justify-between text-xs text-white/60">
              <div>100%</div>
              <div>75%</div>
              <div>50%</div>
              <div>25%</div>
              <div>0%</div>
            </div>
            
            {/* Chart bars */}
            <div className="absolute left-16 right-0 bottom-16 top-0 flex items-end">
              <div className="w-full h-full flex justify-around items-end">
                {releaseData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center group">
                    <div className="relative mb-2">
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {item.tokens} tokens ({item.value}%)
                      </div>
                      
                      {/* Bar */}
                      <div 
                        className="w-10 bg-gradient-to-t from-[#FFD700] to-[#FFA500] rounded-t relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] border border-[#FFD700]/30"
                        style={{ height: `${(item.value / 100) * maxBarHeight}px` }}
                      >
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-shimmer"></div>
                      </div>
                    </div>
                    
                    {/* X-axis label */}
                    <div className="text-white/70 text-xs mt-2 rotate-45 origin-top-left translate-x-4">
                      {item.quarter}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Supply Chart */}
        {activeTab === 'supply' && (
          <div className="h-full">
            <div className="absolute left-12 top-0 bottom-16 w-px bg-white/20"></div>
            <div className="absolute left-12 bottom-16 right-0 h-px bg-white/20"></div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-16 flex flex-col justify-between text-xs text-white/60">
              <div>100%</div>
              <div>75%</div>
              <div>50%</div>
              <div>25%</div>
              <div>0%</div>
            </div>
            
            {/* Chart bars */}
            <div className="absolute left-16 right-0 bottom-16 top-0 flex items-end">
              <div className="w-full h-full flex justify-around items-end">
                {supplyData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center group">
                    <div className="relative mb-2 w-12">
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Circulating: {item.circulating}%<br />
                        Locked: {item.locked}%
                      </div>
                      
                      {/* Stacked Bar */}
                      <div className="relative h-[200px] w-full">
                        {/* Locked portion */}
                        <div 
                          className="absolute bottom-0 w-full bg-white/20 rounded-t border border-white/30"
                          style={{ height: `${(item.locked / 100) * maxBarHeight}px` }}
                        ></div>
                        
                        {/* Circulating portion */}
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-[#2196F3] to-[#03A9F4] rounded-t border border-[#2196F3]/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(33,150,243,0.5)]"
                          style={{ height: `${(item.circulating / 100) * maxBarHeight}px` }}
                        >
                          {/* Animated shine effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-shimmer"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* X-axis label */}
                    <div className="text-white/70 text-xs mt-2">
                      {item.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-t from-[#2196F3] to-[#03A9F4] rounded"></div>
                <span className="text-white text-sm">Circulating Supply</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white/20 rounded"></div>
                <span className="text-white text-sm">Locked Supply</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Release schedule info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-rajdhani text-xl font-bold text-[#FFD700]">Năm 1</h3>
          <ul className="space-y-2 text-white">
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
              </div>
              <span>Q1: 15% tổng cung (150M $MSCI)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
              </div>
              <span>Q2: 20% tổng cung (200M $MSCI)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
              </div>
              <span>Q3: 25% tổng cung (250M $MSCI)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
              </div>
              <span>Q4: 30% tổng cung (300M $MSCI)</span>
            </li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-rajdhani text-xl font-bold text-[#FFD700]">Năm 2-5</h3>
          <ul className="space-y-2 text-white">
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
              </div>
              <span>Phát hành giảm dần 10% mỗi năm</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
              </div>
              <span>Tập trung vào Play-to-Earn rewards</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
              </div>
              <span>Điều chỉnh linh hoạt theo tăng trưởng user</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
} 