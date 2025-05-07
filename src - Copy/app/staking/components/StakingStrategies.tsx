'use client';

export default function StakingStrategies() {
  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CHIẾN LƯỢC STAKING
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* For Beginners */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-green-500/50 transition-all shadow-lg hover:shadow-green-500/20 group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl"></div>
          
          <h3 className="text-xl text-green-400 font-semibold mb-4 font-rajdhani tracking-wide flex items-center relative z-10">
            <span className="inline-block w-8 h-8 mr-2 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </span>
            Cho Người Mới
          </h3>
          
          <div className="space-y-4 text-white relative z-10">
            <div className="flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-green-500/20 text-green-400 flex-shrink-0 font-bold">1</span>
              <div>
                <span className="font-medium font-rajdhani">Bắt đầu với gói Flexible để làm quen</span>
                <p className="text-white/70 text-sm mt-1">
                  Nhập thị trường với gói linh hoạt để hiểu cách hoạt động trước khi cam kết dài hạn.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-green-500/20 text-green-400 flex-shrink-0 font-bold">2</span>
              <div>
                <span className="font-medium font-rajdhani">Thử staking số lượng nhỏ trước</span>
                <p className="text-white/70 text-sm mt-1">
                  Stake một phần nhỏ tài sản để cảm nhận hệ thống và hiểu quy trình.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-green-500/20 text-green-400 flex-shrink-0 font-bold">3</span>
              <div>
                <span className="font-medium font-rajdhani">Tăng dần thời gian khóa để nhận APY cao hơn</span>
                <p className="text-white/70 text-sm mt-1">
                  Khi đã quen thuộc, hãy thử các gói staking dài hạn hơn với lợi suất tốt hơn.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-green-500/20 text-green-400 flex-shrink-0 font-bold">4</span>
              <div>
                <span className="font-medium font-rajdhani">Đa dạng hóa giữa token và NFT</span>
                <p className="text-white/70 text-sm mt-1">
                  Phân bổ tài sản giữa Token staking và NFT staking để tối đa hóa thu nhập.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-black/30 rounded-lg relative z-10 border border-green-500/20">
            <div className="flex items-center text-green-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium font-rajdhani">Tip cho người mới</span>
            </div>
            <p className="text-white/80 text-sm">
              Hãy tham gia Discord cộng đồng để nhận trợ giúp từ những người dùng có kinh nghiệm.
            </p>
          </div>
        </div>
        
        {/* For Investors */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-500/20 group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
          
          <h3 className="text-xl text-purple-400 font-semibold mb-4 font-rajdhani tracking-wide flex items-center relative z-10">
            <span className="inline-block w-8 h-8 mr-2 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
            Cho Nhà Đầu Tư
          </h3>
          
          <div className="space-y-4 text-white relative z-10">
            <div className="flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-purple-500/20 text-purple-400 flex-shrink-0 font-bold">1</span>
              <div>
                <span className="font-medium font-rajdhani">Phân bổ 60% vào gói dài hạn cho APY cao</span>
                <p className="text-white/70 text-sm mt-1">
                  Tối ưu lợi nhuận dài hạn bằng cách tập trung vào các gói 90-180 ngày với APY cao.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-purple-500/20 text-purple-400 flex-shrink-0 font-bold">2</span>
              <div>
                <span className="font-medium font-rajdhani">30% vào LP staking cho thu nhập tối đa</span>
                <p className="text-white/70 text-sm mt-1">
                  Cung cấp thanh khoản để nhận lợi nhuận cao nhất từ phí giao dịch và phần thưởng LP.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-purple-500/20 text-purple-400 flex-shrink-0 font-bold">3</span>
              <div>
                <span className="font-medium font-rajdhani">10% giữ flexible để linh hoạt</span>
                <p className="text-white/70 text-sm mt-1">
                  Duy trì một phần vốn trong gói linh hoạt để phản ứng nhanh với biến động thị trường.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-purple-500/20 text-purple-400 flex-shrink-0 font-bold">4</span>
              <div>
                <span className="font-medium font-rajdhani">Tái đầu tư phần thưởng để gộp lãi</span>
                <p className="text-white/70 text-sm mt-1">
                  Tận dụng sức mạnh của lãi kép bằng cách tái đầu tư thưởng thay vì rút ra.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-black/30 rounded-lg relative z-10 border border-purple-500/20">
            <div className="flex items-center text-purple-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="font-medium font-rajdhani">Pro Tip</span>
            </div>
            <p className="text-white/80 text-sm">
              Sử dụng chiến lược DCA (Dollar-Cost Averaging) khi market volatile để tối ưu hoá lợi nhuận.
            </p>
          </div>
        </div>
      </div>

      {/* Strategy Comparison */}
      <div className="mt-8 overflow-x-auto">
        <h3 className="text-lg text-white font-semibold mb-4 font-rajdhani">So Sánh Chiến Lược</h3>
        
        <table className="w-full min-w-full bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
          <thead>
            <tr className="bg-[var(--accent-blue-bright)]/20 text-white">
              <th className="py-3 px-4 text-left font-rajdhani font-medium">Chiến Lược</th>
              <th className="py-3 px-4 text-left font-rajdhani font-medium">Phù Hợp Với</th>
              <th className="py-3 px-4 text-left font-rajdhani font-medium">Rủi Ro</th>
              <th className="py-3 px-4 text-left font-rajdhani font-medium">Lợi Nhuận</th>
              <th className="py-3 px-4 text-left font-rajdhani font-medium">Tính Thanh Khoản</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            <tr className="hover:bg-white/10 transition-colors">
              <td className="py-3 px-4 text-white font-rajdhani">Flexible Staking</td>
              <td className="py-3 px-4 text-white font-rajdhani">Người mới, nhà đầu tư thận trọng</td>
              <td className="py-3 px-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Thấp</span>
              </td>
              <td className="py-3 px-4">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Trung bình thấp</span>
              </td>
              <td className="py-3 px-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Cao</span>
              </td>
            </tr>
            <tr className="hover:bg-white/10 transition-colors">
              <td className="py-3 px-4 text-white font-rajdhani">Long-term Token Staking</td>
              <td className="py-3 px-4 text-white font-rajdhani">Nhà đầu tư dài hạn</td>
              <td className="py-3 px-4">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Trung bình</span>
              </td>
              <td className="py-3 px-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Cao</span>
              </td>
              <td className="py-3 px-4">
                <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">Thấp</span>
              </td>
            </tr>
            <tr className="hover:bg-white/10 transition-colors">
              <td className="py-3 px-4 text-white font-rajdhani">NFT Staking</td>
              <td className="py-3 px-4 text-white font-rajdhani">Game players, NFT collectors</td>
              <td className="py-3 px-4">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Trung bình</span>
              </td>
              <td className="py-3 px-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Cao + Items</span>
              </td>
              <td className="py-3 px-4">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Trung bình</span>
              </td>
            </tr>
            <tr className="hover:bg-white/10 transition-colors">
              <td className="py-3 px-4 text-white font-rajdhani">LP Staking</td>
              <td className="py-3 px-4 text-white font-rajdhani">Nhà đầu tư có kinh nghiệm</td>
              <td className="py-3 px-4">
                <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">Cao</span>
              </td>
              <td className="py-3 px-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Rất cao</span>
              </td>
              <td className="py-3 px-4">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Trung bình</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 