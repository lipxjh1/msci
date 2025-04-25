'use client';

export default function SafetySection() {
  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            AN TOÀN & BẢO MẬT
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Smart Contract Audit */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 group">
          <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-4 font-rajdhani tracking-wide flex items-center">
            <span className="inline-block w-8 h-8 mr-2 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            Smart Contract Audit
          </h3>
          
          <div className="space-y-4 text-white">
            <div className="flex items-start">
              <span className="inline-block w-6 h-6 mr-2 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <span className="font-medium font-rajdhani">Audited by CertiK</span>
                <span className="ml-2 text-xs text-green-400 underline cursor-pointer">View Report</span>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="inline-block w-6 h-6 mr-2 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <span className="font-medium font-rajdhani">100% on-chain transparency</span>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="inline-block w-6 h-6 mr-2 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <span className="font-medium font-rajdhani">Multi-sig wallet protection</span>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="inline-block w-6 h-6 mr-2 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <span className="font-medium font-rajdhani">Insurance fund coverage</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="bg-gradient-to-r from-green-500/5 to-green-500/10 p-4 rounded-lg border border-green-500/30">
                <div className="flex items-center mb-2">
                  <span className="inline-block w-6 h-6 mr-2 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="font-medium text-green-400">Audit Score: 95/100</span>
                </div>
                <div className="text-white/80 text-sm">
                  Smart contract đã được kiểm toán và đảm bảo không có lỗ hổng bảo mật nghiêm trọng.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Security Measures */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 group">
          <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-4 font-rajdhani tracking-wide flex items-center">
            <span className="inline-block w-8 h-8 mr-2 rounded-full bg-[var(--accent-blue-bright)]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            Biện Pháp Bảo Vệ
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani">2FA bắt buộc cho staking</div>
                <div className="text-white/60 text-sm">Xác thực 2 lớp để bảo vệ tài khoản của bạn.</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani">Withdrawal whitelist</div>
                <div className="text-white/60 text-sm">Chỉ địa chỉ đã được xác minh mới có thể rút token.</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani">Timelock cho unstaking</div>
                <div className="text-white/60 text-sm">24h delay trước khi unstake để ngăn chặn tấn công.</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium font-rajdhani">Emergency withdrawal</div>
                <div className="text-white/60 text-sm">Rút khẩn cấp trong trường hợp cần thiết (mất phần thưởng).</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Dashboard */}
      <div className="mt-8 p-4 bg-gradient-to-r from-[var(--accent-blue-bright)]/5 to-[var(--accent-blue-glow)]/10 rounded-lg border border-[var(--accent-blue-bright)]/20">
        <h3 className="text-lg text-white font-semibold mb-4 font-rajdhani">Bảng Điều Khiển An Ninh</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 p-3 rounded-lg">
            <div className="text-[var(--accent-blue-bright)] font-medium font-rajdhani mb-1">Total Value Locked</div>
            <div className="text-white text-xl font-bold">$24,567,890</div>
            <div className="flex items-center mt-2">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] rounded-full" style={{width: '92%'}}></div>
              </div>
              <span className="ml-2 text-xs text-white/80">92%</span>
            </div>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg">
            <div className="text-[var(--accent-blue-bright)] font-medium font-rajdhani mb-1">Security Score</div>
            <div className="text-white text-xl font-bold">95/100</div>
            <div className="flex items-center mt-2">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] rounded-full" style={{width: '95%'}}></div>
              </div>
              <span className="ml-2 text-xs text-white/80">95%</span>
            </div>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg">
            <div className="text-[var(--accent-blue-bright)] font-medium font-rajdhani mb-1">Insurance Fund</div>
            <div className="text-white text-xl font-bold">$1,250,000</div>
            <div className="flex items-center mt-2">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] rounded-full" style={{width: '78%'}}></div>
              </div>
              <span className="ml-2 text-xs text-white/80">78%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 