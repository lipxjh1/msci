'use client';

import { useState } from 'react';

export default function StakingTypes() {
  const [activeTab, setActiveTab] = useState<string>('token');

  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CÁC LOẠI STAKING
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('token')}
          className={`px-6 py-3 text-sm font-medium font-rajdhani tracking-wider transition-all duration-300 
            ${activeTab === 'token' 
            ? 'text-white border-2 border-[var(--accent-blue-bright)] shadow-lg shadow-[var(--accent-blue-glow)]/40 transform scale-105 button-cyber clip-hexagon hexagon-corner-flash bg-[var(--accent-blue-bright)]/20' 
            : 'bg-white/5 text-white/90 hover:bg-[var(--accent-blue-bright)]/10 hover:text-white hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 border border-white/20 hover:border-[var(--accent-blue-bright)]/70 button-cyber clip-hexagon'
          }`}
        >
          $MSCI Token Staking
        </button>
        
        <button
          onClick={() => setActiveTab('nft')}
          className={`px-6 py-3 text-sm font-medium font-rajdhani tracking-wider transition-all duration-300 
            ${activeTab === 'nft' 
            ? 'text-white border-2 border-[var(--accent-blue-bright)] shadow-lg shadow-[var(--accent-blue-glow)]/40 transform scale-105 button-cyber clip-hexagon hexagon-corner-flash bg-[var(--accent-blue-bright)]/20' 
            : 'bg-white/5 text-white/90 hover:bg-[var(--accent-blue-bright)]/10 hover:text-white hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 border border-white/20 hover:border-[var(--accent-blue-bright)]/70 button-cyber clip-hexagon'
          }`}
        >
          NFT Hero Staking
        </button>
        
        <button
          onClick={() => setActiveTab('lp')}
          className={`px-6 py-3 text-sm font-medium font-rajdhani tracking-wider transition-all duration-300 
            ${activeTab === 'lp' 
            ? 'text-white border-2 border-[var(--accent-blue-bright)] shadow-lg shadow-[var(--accent-blue-glow)]/40 transform scale-105 button-cyber clip-hexagon hexagon-corner-flash bg-[var(--accent-blue-bright)]/20' 
            : 'bg-white/5 text-white/90 hover:bg-[var(--accent-blue-bright)]/10 hover:text-white hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 border border-white/20 hover:border-[var(--accent-blue-bright)]/70 button-cyber clip-hexagon'
          }`}
        >
          LP Token Staking
        </button>
      </div>

      {/* Tab content */}
      <div className="p-4">
        {/* $MSCI Token Staking */}
        {activeTab === 'token' && (
          <div className="animate-fadeIn">
            <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-4 font-rajdhani tracking-wide">
              $MSCI Token Staking - Đặt cược token để nhận lãi suất hấp dẫn
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {/* Flexible */}
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-semibold text-lg font-rajdhani">Gói Linh Hoạt</h4>
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">Flexible</span>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Thời gian: Không cố định</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>APY: 8-12%</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Thưởng: Trả hàng ngày</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Rút vốn: Ngay lập tức</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 bg-blue-500/20 text-blue-300 rounded-md border border-blue-500/40 hover:bg-blue-500/30 transition-colors font-rajdhani tracking-wide">
                    Stake Now
                  </button>
                </div>
              </div>
              
              {/* 30 Days */}
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-semibold text-lg font-rajdhani">Gói 30 Ngày</h4>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">Popular</span>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Thời gian: Khóa 30 ngày</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>APY: 15-20%</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Thưởng: Trả hàng tuần</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Bonus: +5% M-Coin</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 bg-blue-500/20 text-blue-300 rounded-md border border-blue-500/40 hover:bg-blue-500/30 transition-colors font-rajdhani tracking-wide">
                    Stake Now
                  </button>
                </div>
              </div>
              
              {/* 90 Days */}
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-semibold text-lg font-rajdhani">Gói 90 Ngày</h4>
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">Premium</span>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Thời gian: Khóa 90 ngày</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>APY: 25-35%</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Thưởng: Trả hàng tuần</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Bonus: +15% M-Coin + Skin đặc biệt</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 bg-blue-500/20 text-blue-300 rounded-md border border-blue-500/40 hover:bg-blue-500/30 transition-colors font-rajdhani tracking-wide">
                    Stake Now
                  </button>
                </div>
              </div>
              
              {/* 180 Days */}
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-semibold text-lg font-rajdhani">Gói 180 Ngày</h4>
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs">Elite</span>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Thời gian: Khóa 180 ngày</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>APY: 40-50%</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Thưởng: Trả hàng tuần</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Bonus: +30% M-Coin + Hero cấp A</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 bg-blue-500/20 text-blue-300 rounded-md border border-blue-500/40 hover:bg-blue-500/30 transition-colors font-rajdhani tracking-wide">
                    Stake Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NFT Hero Staking */}
        {activeTab === 'nft' && (
          <div className="animate-fadeIn">
            <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-4 font-rajdhani tracking-wide">
              NFT Hero Staking - Đặt cược nhân vật NFT để nhận thưởng đặc biệt
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {/* Common Heroes */}
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-green-500/50 transition-all shadow-lg hover:shadow-green-500/20 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-semibold text-lg font-rajdhani">Common Heroes</h4>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">C</span>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>APY: 5-8%</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Thưởng: M-Coin hàng ngày</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Bonus: Character Ticket mỗi tháng</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 bg-green-500/20 text-green-300 rounded-md border border-green-500/40 hover:bg-green-500/30 transition-colors font-rajdhani tracking-wide">
                    Stake NFT
                  </button>
                </div>
              </div>
              
              {/* Rare Heroes */}
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-semibold text-lg font-rajdhani">Rare Heroes</h4>
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">B</span>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>APY: 10-15%</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Thưởng: M-Coin + Chip hàng ngày</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Bonus: Piece Ticket mỗi tuần</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 bg-blue-500/20 text-blue-300 rounded-md border border-blue-500/40 hover:bg-blue-500/30 transition-colors font-rajdhani tracking-wide">
                    Stake NFT
                  </button>
                </div>
              </div>
              
              {/* Epic Heroes */}
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-500/20 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-semibold text-lg font-rajdhani">Epic Heroes</h4>
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">A</span>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>APY: 20-30%</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Thưởng: M-Coin + Chip + Memory</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Bonus: Skin độc quyền mỗi tháng</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 bg-purple-500/20 text-purple-300 rounded-md border border-purple-500/40 hover:bg-purple-500/30 transition-colors font-rajdhani tracking-wide">
                    Stake NFT
                  </button>
                </div>
              </div>
              
              {/* Legendary Heroes */}
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-yellow-500/50 transition-all shadow-lg hover:shadow-yellow-500/20 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-semibold text-lg font-rajdhani">Legendary Heroes</h4>
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs">S</span>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span>APY: 40-60%</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span>Thưởng: M-Coin + Premium items</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span>Bonus: Quyền tham gia event VIP</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 bg-yellow-500/20 text-yellow-300 rounded-md border border-yellow-500/40 hover:bg-yellow-500/30 transition-colors font-rajdhani tracking-wide">
                    Stake NFT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LP Token Staking */}
        {activeTab === 'lp' && (
          <div className="animate-fadeIn">
            <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-4 font-rajdhani tracking-wide">
              LP Token Staking - Cung cấp thanh khoản và nhận thưởng
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* $MSCI/USDT */}
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-pink-500/50 transition-all shadow-lg hover:shadow-pink-500/20 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-semibold text-lg font-rajdhani">$MSCI/USDT Pool</h4>
                  <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs">High Yield</span>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span>APY: 50-80%</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span>Thưởng: $MSCI + Trading fees</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span>Bonus: Governance token</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span>Min deposit: $100 giá trị LP</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 bg-pink-500/20 text-pink-300 rounded-md border border-pink-500/40 hover:bg-pink-500/30 transition-colors font-rajdhani tracking-wide">
                    Add Liquidity
                  </button>
                </div>
              </div>
              
              {/* $MSCI/BNB */}
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-orange-500/50 transition-all shadow-lg hover:shadow-orange-500/20 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-semibold text-lg font-rajdhani">$MSCI/BNB Pool</h4>
                  <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs">Ultra Yield</span>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>APY: 70-100%</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>Thưởng: $MSCI + Trading fees</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>Bonus: Governance token + VIP rewards</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>Min deposit: $200 giá trị LP</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 bg-orange-500/20 text-orange-300 rounded-md border border-orange-500/40 hover:bg-orange-500/30 transition-colors font-rajdhani tracking-wide">
                    Add Liquidity
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 