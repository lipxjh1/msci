'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  FaShieldAlt, 
  FaChartLine, 
  FaUsers, 
  FaHandshake 
} from 'react-icons/fa';

// Thông tin các nhà đầu tư
const investors = [
  {
    id: 1,
    name: 'Sequoia Capital SEA',
    logo: 'https://via.placeholder.com/100x100.png?text=Sequoia'
  },
  {
    id: 2,
    name: 'Andreessen Horowitz',
    logo: 'https://via.placeholder.com/100x100.png?text=a16z'
  },
  {
    id: 3,
    name: 'Animoca Brands',
    logo: 'https://via.placeholder.com/100x100.png?text=Animoca'
  },
  {
    id: 4,
    name: 'Binance Labs',
    logo: 'https://via.placeholder.com/100x100.png?text=Binance'
  }
];

// Lý do đầu tư
const investmentReasons = [
  {
    id: 1,
    title: 'Tiềm Năng Tăng Trưởng',
    description: 'Thị trường gaming trị giá $200 tỷ USD với xu hướng GameFi đang phát triển mạnh. Đội ngũ phát triển giàu kinh nghiệm và công nghệ tiên tiến.',
    icon: <FaChartLine className="h-6 w-6" />,
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 2,
    title: 'Tokenomics Vững Chắc',
    description: 'Cung cố định, không phát hành thêm. Cơ chế đốt token hiệu quả. Vesting schedule chặt chẽ và use cases đa dạng.',
    icon: <FaShieldAlt className="h-6 w-6" />,
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 3,
    title: 'Cộng Đồng Mạnh Mẽ',
    description: '50,000+ pre-registrations. Cộng đồng sôi nổi trên các mạng xã hội. Hỗ trợ từ các KOLs gaming và eSports.',
    icon: <FaUsers className="h-6 w-6" />,
    color: 'from-purple-500 to-indigo-400'
  },
  {
    id: 4,
    title: 'Đối Tác Chiến Lược',
    description: 'Hợp tác với các thương hiệu gaming lớn. Quan hệ đối tác với các sàn giao dịch và các dự án blockchain hàng đầu.',
    icon: <FaHandshake className="h-6 w-6" />,
    color: 'from-red-500 to-pink-400'
  }
];

// Bảng rủi ro
const risks = [
  {
    id: 1,
    risk: 'Biến động thị trường crypto',
    solution: 'Đa dạng hóa nguồn thu, reserve fund để ổn định giá token'
  },
  {
    id: 2,
    risk: 'Cạnh tranh trong ngành game',
    solution: 'Liên tục đổi mới, lắng nghe phản hồi người dùng, chất lượng gameplay là ưu tiên số 1'
  },
  {
    id: 3,
    risk: 'Rủi ro kỹ thuật và bảo mật',
    solution: 'Audit smart contract thường xuyên, bảo hiểm cho tài sản người dùng'
  },
  {
    id: 4,
    risk: 'Thay đổi quy định pháp luật',
    solution: 'Tuân thủ pháp luật, team pháp lý riêng, làm việc với cơ quan quản lý'
  }
];

const InvestmentInfo = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="mb-20 animate-fade-in-section">
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            TẠI SAO ĐẦU TƯ VÀO $MSCI?
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      {/* Investment Reasons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {investmentReasons.map((reason) => (
          <div
            key={reason.id}
            className="feature-card relative backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-5 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-white/20"
            onMouseEnter={() => setHovered(reason.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={`absolute inset-0 opacity-10 ${
                hovered === reason.id ? 'opacity-20' : ''
              } transition-opacity duration-300 bg-gradient-to-br ${reason.color}`}
            ></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${reason.color} text-white animate-pulse-glow`}>
                  {reason.icon}
                </div>
                
                <div>
                  <h3 className="font-rajdhani text-xl font-bold text-white mb-2">{reason.title}</h3>
                  <p className="font-rajdhani text-gray-300">{reason.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Investors Section */}
      <div className="mb-16">
        <h3 className="font-rajdhani text-2xl font-bold text-white text-center mb-8">
          <span className="text-shadow-sm relative inline-block">
            Được Hỗ Trợ Bởi Các Nhà Đầu Tư Hàng Đầu
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)]/40 to-transparent"></div>
          </span>
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {investors.map((investor) => (
            <div key={investor.id} className="text-center animate-fade-in-section" style={{animationDelay: `${investor.id * 100}ms`}}>
              <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 transition-transform duration-300 hover:scale-110 animate-pulse-glow">
                <Image
                  src={investor.logo}
                  alt={investor.name}
                  fill
                  sizes="(max-width: 768px) 5rem, 6rem"
                  className="object-contain"
                />
              </div>
              <p className="font-rajdhani text-gray-300 text-sm">{investor.name}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Risk Management */}
      <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 shadow-xl">
        <h3 className="font-rajdhani text-2xl font-bold text-white mb-6">Quản Lý Rủi Ro</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-left font-rajdhani font-bold text-white">Rủi Ro</th>
                <th className="py-3 px-4 text-left font-rajdhani font-bold text-white">Biện Pháp Giảm Thiểu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {risks.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors token-table-row">
                  <td className="py-3 px-4 font-rajdhani text-white/80">{item.risk}</td>
                  <td className="py-3 px-4 font-rajdhani text-white/80">{item.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-[var(--accent-blue-bright)]/10 border border-[var(--accent-blue-bright)]/20 rounded-lg">
          <p className="font-rajdhani text-white/80 text-sm italic">
            <span className="text-[var(--accent-blue-bright)] font-semibold">Lưu ý:</span> Đầu tư vào cryptocurrency luôn tiềm ẩn rủi ro. Vui lòng nghiên cứu kỹ trước khi đưa ra quyết định đầu tư.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentInfo; 