'use client';

import { useState } from 'react';

interface TokenAllocation {
  name: string;
  percentage: number;
  amount: string;
  vesting: string;
  color: string;
}

export default function TokenDistribution() {
  const [selectedAllocation, setSelectedAllocation] = useState<TokenAllocation | null>(null);

  const tokenAllocations: TokenAllocation[] = [
    {
      name: 'Play-to-Earn Rewards',
      percentage: 30,
      amount: '300,000,000',
      vesting: 'Phát hành dần trong 5 năm',
      color: '#4CAF50' // Xanh lá
    },
    {
      name: 'Team & Advisors',
      percentage: 15,
      amount: '150,000,000',
      vesting: '1 năm khóa, giải phóng 24 tháng',
      color: '#2196F3' // Xanh dương
    },
    {
      name: 'Private Sale',
      percentage: 10,
      amount: '100,000,000',
      vesting: '10% TGE, giải phóng 12 tháng',
      color: '#9C27B0' // Tím
    },
    {
      name: 'Public Sale',
      percentage: 5,
      amount: '50,000,000',
      vesting: '25% TGE, giải phóng 6 tháng',
      color: '#F44336' // Đỏ
    },
    {
      name: 'Ecosystem Fund',
      percentage: 15,
      amount: '150,000,000',
      vesting: 'Giải phóng theo milestone',
      color: '#FF9800' // Cam
    },
    {
      name: 'Marketing & Partnerships',
      percentage: 10,
      amount: '100,000,000',
      vesting: '5% hàng tháng',
      color: '#FFEB3B' // Vàng
    },
    {
      name: 'Liquidity',
      percentage: 10,
      amount: '100,000,000',
      vesting: '50% TGE, còn lại theo nhu cầu',
      color: '#00BCD4' // Xanh ngọc
    },
    {
      name: 'Reserve',
      percentage: 5,
      amount: '50,000,000',
      vesting: 'Khóa 2 năm',
      color: '#607D8B' // Xám xanh
    }
  ];

  return (
    <section className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl card-neon">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            THÔNG TIN TOKEN
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      {/* Token Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-rajdhani text-xl font-bold text-[#FFD700]">Tổng Quan</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/70">Tên Token</span>
                <span className="text-white font-medium">M-SCI Token</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/70">Symbol</span>
                <span className="text-white font-medium">$MSCI</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/70">Blockchain</span>
                <span className="text-white font-medium">BNB Chain (BEP-20)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/70">Tổng cung</span>
                <span className="text-white font-medium">1,000,000,000 $MSCI</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/70">Cung lưu hành ban đầu</span>
                <span className="text-white font-medium">150,000,000 $MSCI</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-rajdhani text-xl font-bold text-[#FFD700]">Tiện Ích Token</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                  <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
                </div>
                <span className="text-white">Giao dịch trên Marketplace trong game</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                  <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
                </div>
                <span className="text-white">Governance voting cho các quyết định quan trọng</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                  <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
                </div>
                <span className="text-white">Staking để nhận phần thưởng</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                  <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
                </div>
                <span className="text-white">Truy cập các tính năng Premium</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                  <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
                </div>
                <span className="text-white">Tham gia các sự kiện độc quyền</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Token Allocation */}
      <div className="mb-8">
        <h3 className="font-rajdhani text-2xl font-bold text-[#FFD700] mb-6 text-center">Phân Bổ Token</h3>
        
        <div className="relative h-80 sm:h-96 md:h-[450px]">
          {/* Donut chart visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#1A1E2D"
                  strokeWidth="20"
                />
                
                {tokenAllocations.map((allocation, index) => {
                  // Calculate the starting point for this segment
                  let startPercent = 0;
                  for (let i = 0; i < index; i++) {
                    startPercent += tokenAllocations[i].percentage;
                  }
                  
                  const startAngle = startPercent * 3.6; // 3.6 = 360 / 100
                  const endAngle = startAngle + (allocation.percentage * 3.6);
                  
                  // SVG arc calculation
                  const startX = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
                  const startY = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
                  const endX = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
                  const endY = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
                  
                  // Large arc flag is 1 if angle > 180 degrees
                  const largeArcFlag = allocation.percentage > 50 ? 1 : 0;
                  
                  return (
                    <path
                      key={allocation.name}
                      d={`M ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`}
                      fill="none"
                      stroke={allocation.color}
                      strokeWidth="20"
                      className="cursor-pointer transition-all hover:stroke-width-25"
                      onMouseEnter={() => setSelectedAllocation(allocation)}
                      onMouseLeave={() => setSelectedAllocation(null)}
                    />
                  );
                })}
                
                {/* Center circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  fill="#1A1E2D"
                  stroke="#FFD700"
                  strokeWidth="0.5"
                />
                
                <text
                  x="50"
                  y="48"
                  textAnchor="middle"
                  fill="#FFF"
                  fontSize="7"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  $MSCI
                </text>
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  fill="#FFD700"
                  fontSize="5"
                  fontFamily="sans-serif"
                >
                  1,000,000,000
                </text>
              </svg>
              
              {/* Info popup on hover */}
              {selectedAllocation && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/20 z-10 w-64 text-center">
                  <p className="font-medium text-[var(--accent-blue-bright)]">{selectedAllocation.name}</p>
                  <p className="text-white text-lg font-bold">{selectedAllocation.percentage}%</p>
                  <p className="text-white/80 text-sm">{selectedAllocation.amount} $MSCI</p>
                  <p className="text-white/60 text-xs">{selectedAllocation.vesting}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 rotate-45 bg-black/80 border-r border-b border-white/20"></div>
                </div>
              )}
            </div>
          </div>
          
          {/* Legend */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 md:translate-y-0 md:top-0 pr-4 space-y-2">
            {tokenAllocations.map(allocation => (
              <div 
                key={allocation.name}
                className="flex items-center gap-2 text-sm group"
                onMouseEnter={() => setSelectedAllocation(allocation)}
                onMouseLeave={() => setSelectedAllocation(null)}
              >
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: allocation.color }}
                ></div>
                <span className="text-white group-hover:text-[var(--accent-blue-bright)] transition-colors">
                  {allocation.name} ({allocation.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Token Details Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="py-3 px-4 text-left text-white border-b border-white/10">Danh Mục</th>
              <th className="py-3 px-4 text-center text-white border-b border-white/10">Tỷ Lệ</th>
              <th className="py-3 px-4 text-center text-white border-b border-white/10">Số Lượng</th>
              <th className="py-3 px-4 text-left text-white border-b border-white/10">Vesting Schedule</th>
            </tr>
          </thead>
          <tbody>
            {tokenAllocations.map(allocation => (
              <tr 
                key={allocation.name} 
                className="hover:bg-white/5 transition-colors"
                onMouseEnter={() => setSelectedAllocation(allocation)}
                onMouseLeave={() => setSelectedAllocation(null)}
              >
                <td className="py-3 px-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: allocation.color }}
                    ></div>
                    <span className="text-white">{allocation.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center border-b border-white/5 text-[#FFD700]">{allocation.percentage}%</td>
                <td className="py-3 px-4 text-center border-b border-white/5 text-white">{allocation.amount}</td>
                <td className="py-3 px-4 border-b border-white/5 text-white/70">{allocation.vesting}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
} 