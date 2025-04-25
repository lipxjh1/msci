'use client';

import { useState } from 'react';

type EconomyTab = 'sinks' | 'faucets' | 'burning';

export default function TokenEconomyModel() {
  const [activeTab, setActiveTab] = useState<EconomyTab>('sinks');
  
  return (
    <section className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl card-neon">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            MÔ HÌNH KINH TẾ
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      {/* Infographic */}
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Token Sinks */}
          <div 
            className={`bg-gradient-to-br from-[#041019] to-[#0D2538] p-5 rounded-xl border ${activeTab === 'sinks' ? 'border-red-500' : 'border-white/10'} card-neon transition-all hover:shadow-lg`}
            onClick={() => setActiveTab('sinks')}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-rajdhani text-xl font-bold text-white">Nguồn Thu (Token Sinks)</h3>
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-red-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4">Các cơ chế thu token từ người dùng, giúp giảm lượng cung và ổn định giá trị</p>
            <div className={`overflow-hidden transition-all ${activeTab === 'sinks' ? 'max-h-80' : 'max-h-0'}`}>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-red-500/20 mt-0.5">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span>Marketplace Fees: 5% phí giao dịch</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-red-500/20 mt-0.5">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span>Premium Features: Battle Pass, VIP subscriptions</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-red-500/20 mt-0.5">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span>NFT Minting: Phí đúc NFT nhân vật</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-red-500/20 mt-0.5">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span>Guild Creation: Phí tạo guild</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-red-500/20 mt-0.5">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span>Tournament Entry: Phí tham gia giải đấu</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Token Faucets */}
          <div 
            className={`bg-gradient-to-br from-[#041019] to-[#0D2538] p-5 rounded-xl border ${activeTab === 'faucets' ? 'border-green-500' : 'border-white/10'} card-neon transition-all hover:shadow-lg`}
            onClick={() => setActiveTab('faucets')}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-rajdhani text-xl font-bold text-white">Nguồn Chi (Token Faucets)</h3>
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-green-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4">Các cơ chế phân phối token cho người dùng, tăng tính tương tác và thúc đẩy hoạt động</p>
            <div className={`overflow-hidden transition-all ${activeTab === 'faucets' ? 'max-h-80' : 'max-h-0'}`}>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-green-500/20 mt-0.5">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span>Play-to-Earn: Phần thưởng chơi game hàng ngày</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-green-500/20 mt-0.5">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span>Staking Rewards: Lãi suất staking</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-green-500/20 mt-0.5">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span>Tournament Prizes: Giải thưởng thi đấu</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-green-500/20 mt-0.5">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span>Community Events: Phần thưởng sự kiện</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-green-500/20 mt-0.5">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span>Referral Program: Thưởng giới thiệu</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Burning Mechanism */}
          <div 
            className={`bg-gradient-to-br from-[#041019] to-[#0D2538] p-5 rounded-xl border ${activeTab === 'burning' ? 'border-[#FFD700]' : 'border-white/10'} card-neon transition-all hover:shadow-lg`}
            onClick={() => setActiveTab('burning')}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-rajdhani text-xl font-bold text-white">Cơ Chế Đốt Token</h3>
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-[#FFD700]/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4">Cơ chế giảm phát token, tạo áp lực giảm lượng cung để bảo vệ giá trị dài hạn</p>
            <div className={`overflow-hidden transition-all ${activeTab === 'burning' ? 'max-h-80' : 'max-h-0'}`}>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                    <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
                  </div>
                  <span>30% phí giao dịch marketplace</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                    <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
                  </div>
                  <span>50% phí nâng cấp nhân vật cao cấp</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                    <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
                  </div>
                  <span>100% phí tạo guild</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[#FFD700]/20 mt-0.5">
                    <div className="h-2 w-2 bg-[#FFD700] rounded-full"></div>
                  </div>
                  <span>Quarterly buyback & burn từ lợi nhuận</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Anti-inflation section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-rajdhani text-xl font-bold text-[#FFD700] mb-4">Chống Lạm Phát Token</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 group">
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-[#FFD700]/10 mt-0.5 group-hover:bg-[#FFD700]/20 transition-colors">
                <span className="text-[#FFD700] font-bold">1</span>
              </div>
              <div>
                <h4 className="text-white font-medium">Deflationary Mechanics</h4>
                <p className="text-white/70 text-sm">Đốt token định kỳ từ các hoạt động trong game, giảm lượng cung theo thời gian</p>
              </div>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-[#FFD700]/10 mt-0.5 group-hover:bg-[#FFD700]/20 transition-colors">
                <span className="text-[#FFD700] font-bold">2</span>
              </div>
              <div>
                <h4 className="text-white font-medium">Vesting Schedule</h4>
                <p className="text-white/70 text-sm">Khóa token team và nhà đầu tư trong thời gian dài để tránh bán đổ</p>
              </div>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-[#FFD700]/10 mt-0.5 group-hover:bg-[#FFD700]/20 transition-colors">
                <span className="text-[#FFD700] font-bold">3</span>
              </div>
              <div>
                <h4 className="text-white font-medium">Dynamic Rewards</h4>
                <p className="text-white/70 text-sm">Điều chỉnh phần thưởng P2E theo cung-cầu và giá token</p>
              </div>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-[#FFD700]/10 mt-0.5 group-hover:bg-[#FFD700]/20 transition-colors">
                <span className="text-[#FFD700] font-bold">4</span>
              </div>
              <div>
                <h4 className="text-white font-medium">Staking Incentives</h4>
                <p className="text-white/70 text-sm">Khuyến khích người dùng giữ token dài hạn qua staking và các đặc quyền</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-rajdhani text-xl font-bold text-[#FFD700] mb-4">Ổn Định Thanh Khoản</h3>
          <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-5 rounded-xl border border-white/10 card-neon h-full">
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                <span className="text-white">Liquidity pools trên DEXs hàng đầu</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                <span className="text-white">Market making partnerships</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                <span className="text-white">Cross-chain bridges</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                <span className="text-white">CEX listings có uy tín</span>
              </li>
            </ul>
            
            {/* Simple visual representation */}
            <div className="mt-6 h-24 relative rounded-lg overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-blue-500/20 to-green-500/20"></div>
              
              {/* Animated liquidity dots */}
              <div className="absolute h-2 w-2 bg-blue-400 rounded-full top-[20%] left-[10%] animate-ping"></div>
              <div className="absolute h-3 w-3 bg-green-400 rounded-full top-[60%] left-[30%] animate-ping" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute h-2 w-2 bg-yellow-400 rounded-full top-[40%] left-[50%] animate-ping" style={{animationDelay: '0.7s'}}></div>
              <div className="absolute h-3 w-3 bg-purple-400 rounded-full top-[70%] left-[70%] animate-ping" style={{animationDelay: '1.1s'}}></div>
              <div className="absolute h-2 w-2 bg-red-400 rounded-full top-[30%] left-[85%] animate-ping" style={{animationDelay: '1.5s'}}></div>
              
              {/* Liquidity flow lines */}
              <svg className="absolute inset-0 w-full h-full">
                <line x1="10%" y1="20%" x2="30%" y2="60%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="30%" y1="60%" x2="50%" y2="40%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="50%" y1="40%" x2="70%" y2="70%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="70%" y1="70%" x2="85%" y2="30%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              </svg>
              
              <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-white/50">
                Liquidity Flow Visualization
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 