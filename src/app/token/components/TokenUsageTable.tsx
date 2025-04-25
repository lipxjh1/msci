'use client';

import { useRef, useEffect, useState } from 'react';
import { BiCheckCircle } from 'react-icons/bi';

interface TokenUsage {
  id: number;
  category: string;
  description: string;
  usesCases: string[];
}

const tokenUsages: TokenUsage[] = [
  {
    id: 1,
    category: 'In-Game',
    description: 'Các trường hợp sử dụng token trong game.',
    usesCases: [
      'Mua bán NFT character trên marketplace',
      'Giao dịch vật phẩm và trang bị',
      'Nâng cấp nhân vật',
      'Tham gia các sự kiện đặc biệt',
      'Đặt cược trong các trận đấu PvP'
    ]
  },
  {
    id: 2,
    category: 'Governance',
    description: 'Quyền quản trị cho người nắm giữ token.',
    usesCases: [
      'Bỏ phiếu cho các đề xuất phát triển game',
      'Quyết định tính năng mới',
      'Đề xuất thay đổi về kinh tế game',
      'Tham gia DAO (Tổ chức tự trị phi tập trung)',
      'Bầu cử hội đồng quản trị'
    ]
  },
  {
    id: 3,
    category: 'DeFi',
    description: 'Các tính năng tài chính phi tập trung.',
    usesCases: [
      'Staking với APY hấp dẫn (8-50%)',
      'Farming trong các liquidity pools',
      'Tham gia IDO của các dự án đối tác',
      'Vay mượn bằng $MSCI làm tài sản thế chấp',
      'Phần thưởng cho người cung cấp thanh khoản'
    ]
  },
  {
    id: 4,
    category: 'Ecosystem',
    description: 'Tương tác với hệ sinh thái rộng lớn hơn.',
    usesCases: [
      'Truy cập vào các game khác trong hệ sinh thái M-SCI',
      'Nhận phần thưởng giới thiệu',
      'Tham gia các sự kiện cộng đồng',
      'Mua merchandising và sản phẩm liên quan',
      'Quyền truy cập vào nền tảng streaming độc quyền'
    ]
  }
];

const TokenUsageTable = () => {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);

  // Animation khi chuyển category
  useEffect(() => {
    if (!isAnimating) return;
    
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 400);
    
    return () => clearTimeout(timer);
  }, [isAnimating]);

  const handleCategoryChange = (categoryId: number) => {
    if (categoryId === activeCategory) return;
    setIsAnimating(true);
    setActiveCategory(categoryId);
  };

  return (
    <div className="mb-20 animate-fade-in-section">
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CÁCH SỬ DỤNG TOKEN
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 shadow-xl overflow-hidden">
        {/* Category tabs */}
        <div className="flex flex-wrap border-b border-white/10">
          {tokenUsages.map(usage => (
            <button
              key={usage.id}
              onClick={() => handleCategoryChange(usage.id)}
              className={`font-rajdhani text-md md:text-lg font-medium px-4 py-3 transition-all duration-300 ${
                activeCategory === usage.id
                  ? 'text-white bg-[var(--accent-blue-bright)]/20 border-b-2 border-[var(--accent-blue-bright)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {usage.category}
            </button>
          ))}
        </div>
        
        {/* Content area */}
        <div className="p-6" ref={tableRef}>
          {tokenUsages.map(usage => (
            <div
              key={usage.id}
              className={`transition-opacity duration-300 ${
                activeCategory === usage.id
                  ? isAnimating
                    ? 'opacity-0'
                    : 'opacity-100 animate-fade-in-section'
                  : 'hidden'
              }`}
            >
              <p className="text-gray-300 font-rajdhani mb-6">
                {usage.description}
              </p>
              
              <div className="bg-[var(--accent-blue-bright)]/5 border border-[var(--accent-blue-bright)]/20 rounded-lg p-4">
                <ul className="space-y-4">
                  {usage.usesCases.map((useCase, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-3 font-rajdhani text-white/90 animate-slide-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <BiCheckCircle className="text-[var(--accent-blue-bright)] text-xl flex-shrink-0 mt-0.5 animate-pulse" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Bottom action */}
              <div className="mt-6 flex justify-end">
                <div className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors rounded-full px-4 py-2 feature-card">
                  <span className="text-[var(--accent-blue-bright)] font-rajdhani font-medium">
                    {usage.category === 'In-Game' && 'Tham gia game để trải nghiệm'}
                    {usage.category === 'Governance' && 'Tham gia DAO ngay hôm nay'}
                    {usage.category === 'DeFi' && 'Khám phá cơ hội staking'}
                    {usage.category === 'Ecosystem' && 'Tìm hiểu hệ sinh thái'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--accent-blue-bright)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom stats - Token metrics */}
        <div className="border-t border-white/10 p-6 bg-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="animate-fade-in-section" style={{ animationDelay: '100ms' }}>
              <p className="text-gray-400 font-rajdhani text-sm mb-1">Holders</p>
              <p className="text-white font-orbitron text-xl">10,650+</p>
            </div>
            <div className="animate-fade-in-section" style={{ animationDelay: '200ms' }}>
              <p className="text-gray-400 font-rajdhani text-sm mb-1">Transactions</p>
              <p className="text-white font-orbitron text-xl">132,450+</p>
            </div>
            <div className="animate-fade-in-section" style={{ animationDelay: '300ms' }}>
              <p className="text-gray-400 font-rajdhani text-sm mb-1">Staked MSCI</p>
              <p className="text-white font-orbitron text-xl">450M+</p>
            </div>
            <div className="animate-fade-in-section" style={{ animationDelay: '400ms' }}>
              <p className="text-gray-400 font-rajdhani text-sm mb-1">Token Price</p>
              <p className="text-white font-orbitron text-xl">$0.12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenUsageTable; 