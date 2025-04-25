'use client';

export default function AdditionalRewards() {
  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            PHẦN THƯỞNG BỔ SUNG
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Staking Milestones */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 group">
          <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-4 font-rajdhani tracking-wide flex items-center">
            <span className="inline-block w-8 h-8 mr-2 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            Staking Milestones
          </h3>
          
          <div className="space-y-4">
            {/* Timeline item */}
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="w-0.5 h-full bg-green-400/30"></div>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani">30 ngày liên tục</div>
                <div className="text-green-400 text-sm">Badge "Dedicated Staker"</div>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <div className="w-0.5 h-full bg-blue-400/30"></div>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani">90 ngày liên tục</div>
                <div className="text-blue-400 text-sm">Title "Diamond Hands"</div>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                <div className="w-0.5 h-full bg-purple-400/30"></div>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani">180 ngày liên tục</div>
                <div className="text-purple-400 text-sm">NFT Avatar độc quyền</div>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani">365 ngày liên tục</div>
                <div className="text-yellow-400 text-sm">Lifetime VIP status</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Referral Bonus */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 group">
          <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-4 font-rajdhani tracking-wide flex items-center">
            <span className="inline-block w-8 h-8 mr-2 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
            Referral Bonus
          </h3>
          
          <div className="space-y-4 text-white">
            <div className="flex items-start">
              <span className="inline-block w-6 h-6 mr-2 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
              <div>
                <span className="font-medium font-rajdhani">Giới thiệu bạn bè staking:</span>
                <span className="ml-2 text-[var(--accent-blue-bright)]">+2% APY cho cả hai</span>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="inline-block w-6 h-6 mr-2 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
              <div>
                <span className="font-medium font-rajdhani">Top referrer hàng tháng:</span>
                <span className="ml-2 text-[var(--accent-blue-bright)]">Double rewards</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="bg-gradient-to-r from-[var(--accent-blue-bright)]/10 to-[var(--accent-blue-glow)]/10 p-4 rounded-lg">
                <div className="font-medium mb-2 font-rajdhani">Tạo link giới thiệu của bạn</div>
                <div className="flex">
                  <input 
                    type="text" 
                    readOnly 
                    value="https://msci.game/ref/your-username" 
                    className="flex-grow bg-black/40 text-white/70 border border-white/30 rounded-l-md p-2 text-sm focus:outline-none"
                  />
                  <button className="bg-[var(--accent-blue-bright)] hover:bg-[var(--accent-blue-bright)]/90 text-white font-medium px-4 rounded-r-md transition-colors text-sm whitespace-nowrap">
                    Sao chép
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Early Bird Rewards */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 group">
          <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-4 font-rajdhani tracking-wide flex items-center">
            <span className="inline-block w-8 h-8 mr-2 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Early Bird Rewards
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center p-3 bg-white/5 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white font-bold text-lg">1K</span>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani">1000 người stake đầu tiên</div>
                <div className="text-[var(--accent-blue-bright)] text-sm">+10% APY</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-white/5 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white font-bold text-sm">WEEK 1</span>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani">Stake trong tuần đầu ra mắt</div>
                <div className="text-[var(--accent-blue-bright)] text-sm">NFT kỷ niệm</div>
              </div>
            </div>
            
            <div className="mt-2 text-white/70 text-sm italic">
              * Chương trình Early Bird đã kết thúc. Theo dõi các sự kiện đặc biệt tới đây!
            </div>
          </div>
        </div>
        
        {/* Active Promotions */}
        <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-500/20 group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <h3 className="text-xl text-purple-400 font-semibold mb-4 font-rajdhani tracking-wide flex items-center relative z-10">
            <span className="inline-block w-8 h-8 mr-2 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </span>
            Khuyến Mãi Hiện Tại
          </h3>
          
          <div className="bg-purple-500/5 rounded-lg p-4 mb-4 relative z-10 border border-purple-500/20">
            <div className="flex justify-between items-start mb-2">
              <div className="text-white font-bold font-rajdhani">Valentine Boost</div>
              <div className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full text-xs">Hot!</div>
            </div>
            <p className="text-white/80 text-sm mb-3">Stake trong tháng 2 và nhận boost 14% APY trong 14 ngày.</p>
            <div className="text-purple-300 text-xs">Còn lại: 9 ngày</div>
          </div>
          
          <div className="bg-blue-500/5 rounded-lg p-4 relative z-10 border border-blue-500/20">
            <div className="flex justify-between items-start mb-2">
              <div className="text-white font-bold font-rajdhani">Governance Vote Bonus</div>
              <div className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-xs">New</div>
            </div>
            <p className="text-white/80 text-sm mb-3">Tham gia bỏ phiếu quản trị và nhận thêm 5% APY trong 30 ngày.</p>
            <div className="text-blue-300 text-xs">Còn lại: 21 ngày</div>
          </div>
        </div>
      </div>
    </div>
  );
} 