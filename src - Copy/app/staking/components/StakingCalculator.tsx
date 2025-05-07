'use client';

import { useState, useEffect } from 'react';

export default function StakingCalculator() {
  const [stakingType, setStakingType] = useState<string>('token');
  const [amount, setAmount] = useState<number>(10000);
  const [duration, setDuration] = useState<number>(30);
  const [apy, setApy] = useState<number>(20);
  const [expectedReturn, setExpectedReturn] = useState<number>(0);

  // Tính toán lợi nhuận dự kiến khi các giá trị thay đổi
  useEffect(() => {
    calculateReturn();
  }, [stakingType, amount, duration, apy]);

  // Hàm tính toán lợi nhuận
  const calculateReturn = () => {
    // Công thức: Principal * (APY/100) * (days/365)
    const annual = amount * (apy / 100);
    const periodReturn = annual * (duration / 365);
    setExpectedReturn(Number(periodReturn.toFixed(2)));
  };

  // Thay đổi APY khi thay đổi loại staking và thời gian
  const handleStakingTypeChange = (type: string) => {
    setStakingType(type);
    // Đặt APY mặc định dựa trên loại
    switch (type) {
      case 'token':
        setApy(duration === 30 ? 20 : duration === 90 ? 35 : duration === 180 ? 50 : 12);
        break;
      case 'nft':
        setApy(50); // S class NFT
        break;
      case 'lp':
        setApy(80);
        break;
      default:
        setApy(20);
    }
  };

  // Thay đổi APY khi thay đổi thời gian
  const handleDurationChange = (days: number) => {
    setDuration(days);
    if (stakingType === 'token') {
      setApy(days === 30 ? 20 : days === 90 ? 35 : days === 180 ? 50 : 12);
    }
  };

  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            BẢNG TÍNH TOÁN STAKING
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator Controls */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-4 font-rajdhani tracking-wide">
            Tính Thu Nhập Dự Kiến
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Staking Type */}
              <div>
                <label className="block text-white font-medium mb-2 font-rajdhani">Loại Staking</label>
                <select 
                  value={stakingType}
                  onChange={(e) => handleStakingTypeChange(e.target.value)}
                  className="w-full bg-black/40 text-white border border-white/30 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue-bright)]"
                >
                  <option value="token">$MSCI Token</option>
                  <option value="nft">NFT Hero (S Class)</option>
                  <option value="lp">LP Token</option>
                </select>
              </div>
              
              {/* Amount */}
              <div>
                <label className="block text-white font-medium mb-2 font-rajdhani">Số Lượng</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-black/40 text-white border border-white/30 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue-bright)]"
                  min="1"
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              {/* Duration */}
              <div>
                <label className="block text-white font-medium mb-2 font-rajdhani">Thời Gian (ngày)</label>
                <select 
                  value={duration}
                  onChange={(e) => handleDurationChange(Number(e.target.value))}
                  className="w-full bg-black/40 text-white border border-white/30 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue-bright)]"
                >
                  <option value="30">30 ngày</option>
                  <option value="90">90 ngày</option>
                  <option value="180">180 ngày</option>
                  <option value="365">365 ngày</option>
                </select>
              </div>
              
              {/* APY */}
              <div>
                <label className="block text-white font-medium mb-2 font-rajdhani">APY (%)</label>
                <input 
                  type="number" 
                  value={apy}
                  onChange={(e) => setApy(Number(e.target.value))}
                  className="w-full bg-black/40 text-white border border-white/30 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue-bright)]"
                  min="0"
                  max="200"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Result Card */}
        <div className="bg-[var(--accent-blue-bright)]/10 backdrop-blur-sm rounded-lg p-6 border border-[var(--accent-blue-bright)]/30 flex flex-col justify-center items-center shadow-lg card-neon">
          <h3 className="text-[var(--accent-blue-bright)] font-bold text-lg mb-6 font-rajdhani">Thu Nhập Dự Kiến</h3>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2 font-orbitron tracking-wider cyber-halo">
              {expectedReturn}
            </div>
            <div className="text-[var(--accent-blue-bright)] font-medium">{stakingType === 'token' || stakingType === 'lp' ? '$MSCI' : 'M-Coin'}</div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[var(--accent-blue-bright)]/30 text-sm text-white/80 font-rajdhani">
            <div>Số vốn: {amount} {stakingType === 'token' || stakingType === 'lp' ? '$MSCI' : 'NFT'}</div>
            <div>Thời gian: {duration} ngày</div>
            <div>APY: {apy}%</div>
          </div>
        </div>
      </div>

      {/* Example Table */}
      <div className="mt-8 overflow-x-auto">
        <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-4 font-rajdhani tracking-wide">
          Ví Dụ Thu Nhập
        </h3>
        
        <table className="w-full min-w-full bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
          <thead>
            <tr className="bg-[var(--accent-blue-bright)]/20 text-white">
              <th className="py-3 px-4 text-left font-rajdhani font-medium">Loại Staking</th>
              <th className="py-3 px-4 text-left font-rajdhani font-medium">Số Lượng</th>
              <th className="py-3 px-4 text-left font-rajdhani font-medium">Thời Gian</th>
              <th className="py-3 px-4 text-left font-rajdhani font-medium">APY</th>
              <th className="py-3 px-4 text-left font-rajdhani font-medium">Thu Nhập Dự Kiến</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            <tr className="hover:bg-white/10 transition-colors">
              <td className="py-3 px-4 text-white font-rajdhani">$MSCI Token</td>
              <td className="py-3 px-4 text-white font-rajdhani">10,000</td>
              <td className="py-3 px-4 text-white font-rajdhani">30 ngày</td>
              <td className="py-3 px-4 text-white font-rajdhani">20%</td>
              <td className="py-3 px-4 text-[var(--accent-blue-bright)] font-rajdhani">166 $MSCI</td>
            </tr>
            <tr className="hover:bg-white/10 transition-colors">
              <td className="py-3 px-4 text-white font-rajdhani">$MSCI Token</td>
              <td className="py-3 px-4 text-white font-rajdhani">10,000</td>
              <td className="py-3 px-4 text-white font-rajdhani">90 ngày</td>
              <td className="py-3 px-4 text-white font-rajdhani">35%</td>
              <td className="py-3 px-4 text-[var(--accent-blue-bright)] font-rajdhani">875 $MSCI</td>
            </tr>
            <tr className="hover:bg-white/10 transition-colors">
              <td className="py-3 px-4 text-white font-rajdhani">Hero S</td>
              <td className="py-3 px-4 text-white font-rajdhani">1</td>
              <td className="py-3 px-4 text-white font-rajdhani">30 ngày</td>
              <td className="py-3 px-4 text-white font-rajdhani">50%</td>
              <td className="py-3 px-4 text-[var(--accent-blue-bright)] font-rajdhani">2,500 M-Coin</td>
            </tr>
            <tr className="hover:bg-white/10 transition-colors">
              <td className="py-3 px-4 text-white font-rajdhani">LP Token</td>
              <td className="py-3 px-4 text-white font-rajdhani">$1,000</td>
              <td className="py-3 px-4 text-white font-rajdhani">30 ngày</td>
              <td className="py-3 px-4 text-white font-rajdhani">80%</td>
              <td className="py-3 px-4 text-[var(--accent-blue-bright)] font-rajdhani">$66</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 