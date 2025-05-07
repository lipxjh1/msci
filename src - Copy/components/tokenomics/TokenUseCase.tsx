'use client';

export default function TokenUseCase() {
  return (
    <section className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl card-neon">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            USE CASES
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* In-game use cases */}
        <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl card-neon">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFD700]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 7H7v6h6V7z" />
                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-rajdhani text-2xl font-bold text-[#FFD700]">Trong Game</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-4 rounded-lg border border-white/10">
              <div className="flex items-start gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FFD700]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">Marketplace</span>
              </div>
              <p className="text-white/70 text-sm">Mua/bán nhân vật và items trong game sử dụng token $MSCI</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-4 rounded-lg border border-white/10">
              <div className="flex items-start gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FFD700]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">Nâng cấp Hero</span>
              </div>
              <p className="text-white/70 text-sm">Tiến hóa và nâng cấp nhân vật, mở khóa kỹ năng mới</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-4 rounded-lg border border-white/10">
              <div className="flex items-start gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FFD700]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">Guild Wars</span>
              </div>
              <p className="text-white/70 text-sm">Tham gia guild và đóng phí thành viên, chiến đấu trong guild wars</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-4 rounded-lg border border-white/10">
              <div className="flex items-start gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FFD700]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">PvP Battles</span>
              </div>
              <p className="text-white/70 text-sm">Đặt cược trong các trận đấu PvP và tournament với phần thưởng lớn</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-4 rounded-lg border border-white/10">
              <div className="flex items-start gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FFD700]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">VIP Access</span>
              </div>
              <p className="text-white/70 text-sm">Mở khóa nội dung độc quyền, map và nhiệm vụ đặc biệt</p>
            </div>
          </div>
        </div>
        
        {/* Out-game use cases */}
        <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl card-neon">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-rajdhani text-2xl font-bold text-blue-500">Ngoài Game</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-4 rounded-lg border border-white/10">
              <div className="flex items-start gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">Governance</span>
              </div>
              <p className="text-white/70 text-sm">Quyền biểu quyết đối với các quyết định phát triển game và hệ sinh thái</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-4 rounded-lg border border-white/10">
              <div className="flex items-start gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">Staking & Farming</span>
              </div>
              <p className="text-white/70 text-sm">Khóa token để nhận lãi suất và farming thêm token từ các pool</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-4 rounded-lg border border-white/10">
              <div className="flex items-start gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">NFT Marketplace</span>
              </div>
              <p className="text-white/70 text-sm">Giao dịch NFT trong hệ sinh thái và trên các sàn thứ cấp</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-4 rounded-lg border border-white/10">
              <div className="flex items-start gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">Community Treasury</span>
              </div>
              <p className="text-white/70 text-sm">Đề xuất và bỏ phiếu các khoản chi từ quỹ phát triển cộng đồng</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-4 rounded-lg border border-white/10">
              <div className="flex items-start gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">Partner Ecosystem</span>
              </div>
              <p className="text-white/70 text-sm">Đặc quyền và ưu đãi từ các đối tác trong hệ sinh thái M-SCI</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive Ecosystem Visualization */}
      <div className="mt-10 p-6 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 card-neon">
        <h3 className="font-rajdhani text-2xl font-bold text-center text-[#FFD700] mb-6">Hệ Sinh Thái $MSCI</h3>
        
        <div className="relative h-64 md:h-80">
          {/* Center node - Token */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 rounded-full bg-[#FFD700]/20 border border-[#FFD700] flex items-center justify-center z-20 relative">
              <div className="text-center">
                <span className="font-bold text-white">$MSCI</span>
                <div className="text-xs text-white/70">Token</div>
              </div>
              
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full bg-[#FFD700]/10 animate-ping"></div>
            </div>
          </div>
          
          {/* Game Node */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
              <div className="text-center">
                <span className="text-xs font-bold text-white">Game</span>
              </div>
            </div>
          </div>
          
          {/* DeFi Node */}
          <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
              <div className="text-center">
                <span className="text-xs font-bold text-white">DeFi</span>
              </div>
            </div>
          </div>
          
          {/* NFT Node */}
          <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center">
              <div className="text-center">
                <span className="text-xs font-bold text-white">NFT</span>
              </div>
            </div>
          </div>
          
          {/* Governance Node */}
          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
              <div className="text-center">
                <span className="text-xs font-bold text-white">DAO</span>
              </div>
            </div>
          </div>
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full z-10 stroke-[1.5]">
            {/* Game to Token */}
            <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="rgba(72, 187, 120, 0.5)" />
            {/* DeFi to Token */}
            <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="rgba(66, 153, 225, 0.5)" />
            {/* NFT to Token */}
            <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="rgba(159, 122, 234, 0.5)" />
            {/* Governance to Token */}
            <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="rgba(245, 101, 101, 0.5)" />
            
            {/* Animation dots moving along lines */}
            <circle className="animate-moving-dot" r="2" fill="#48BB78">
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M25%,25% 50%,50%"
              />
            </circle>
            
            <circle className="animate-moving-dot" r="2" fill="#4299E1">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M75%,25% 50%,50%"
              />
            </circle>
            
            <circle className="animate-moving-dot" r="2" fill="#9F7AEA">
              <animateMotion
                dur="3.5s"
                repeatCount="indefinite"
                path="M25%,75% 50%,50%"
              />
            </circle>
            
            <circle className="animate-moving-dot" r="2" fill="#F56565">
              <animateMotion
                dur="4.5s"
                repeatCount="indefinite"
                path="M75%,75% 50%,50%"
              />
            </circle>
          </svg>
        </div>
      </div>
    </section>
  );
} 