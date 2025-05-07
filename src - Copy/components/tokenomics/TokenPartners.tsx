'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Partner {
  name: string;
  logo: string;
  type: 'exchange' | 'technology';
  description: string;
}

export default function TokenPartners() {
  const [activeType, setActiveType] = useState<'exchange' | 'technology'>('exchange');
  
  const partners: Partner[] = [
    {
      name: 'Binance',
      logo: '/images/partners/binance.png',
      type: 'exchange',
      description: 'Strategic listing partner'
    },
    {
      name: 'OKX',
      logo: '/images/partners/okx.png',
      type: 'exchange',
      description: 'Liquidity provider'
    },
    {
      name: 'Gate.io',
      logo: '/images/partners/gate.png',
      type: 'exchange',
      description: 'IEO platform'
    },
    {
      name: 'PancakeSwap',
      logo: '/images/partners/pancakeswap.png',
      type: 'exchange',
      description: 'Primary DEX'
    },
    {
      name: 'Chainlink',
      logo: '/images/partners/chainlink.png',
      type: 'technology',
      description: 'Oracle services'
    },
    {
      name: 'Polygon',
      logo: '/images/partners/polygon.png',
      type: 'technology',
      description: 'Layer 2 scaling'
    },
    {
      name: 'CertiK',
      logo: '/images/partners/certik.png',
      type: 'technology',
      description: 'Security audit'
    },
    {
      name: 'The Graph',
      logo: '/images/partners/thegraph.png',
      type: 'technology',
      description: 'Data indexing'
    }
  ];

  return (
    <section className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl card-neon">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            ĐỐI TÁC CHIẾN LƯỢC
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      {/* Tab Switching */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md backdrop-blur-md bg-black/20 border border-white/10 p-1">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeType === 'exchange'
              ? 'bg-blue-500/20 text-white border border-blue-500'
              : 'text-white/70 hover:bg-white/5 border border-transparent'
            }`}
            onClick={() => setActiveType('exchange')}
          >
            Exchange Partners
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeType === 'technology'
              ? 'bg-purple-500/20 text-white border border-purple-500'
              : 'text-white/70 hover:bg-white/5 border border-transparent'
            }`}
            onClick={() => setActiveType('technology')}
          >
            Technology Partners
          </button>
        </div>
      </div>
      
      {/* Partners Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {partners
          .filter(partner => partner.type === activeType)
          .map((partner, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 flex flex-col items-center text-center transition-all hover:bg-white/10 group"
            >
              <div className="relative h-16 w-16 mb-4 grayscale group-hover:grayscale-0 transition-all">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Fallback if image is missing */}
                  <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">{partner.name.substring(0, 2)}</span>
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-white text-lg mb-2">{partner.name}</h3>
              <p className="text-white/60 text-sm">{partner.description}</p>
              
              {/* Hover effect */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs px-3 py-1 rounded-full text-white bg-white/10 inline-block">
                  {activeType === 'exchange' ? 'Exchange' : 'Technology'} Partner
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Partnership Benefits */}
      <div className="mt-12 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
        <h3 className="font-rajdhani text-xl font-bold text-[#FFD700] mb-6 text-center">Lợi Ích Từ Đối Tác</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-5 rounded-lg border border-white/10">
            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-medium text-white mb-2">Thanh Khoản Mạnh Mẽ</h4>
            <p className="text-white/70 text-sm">Hợp tác với các sàn giao dịch hàng đầu đảm bảo thanh khoản sâu và ổn định cho token, giảm thiểu slippage và tăng cường trải nghiệm giao dịch.</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-5 rounded-lg border border-white/10">
            <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-medium text-white mb-2">Bảo Mật Cao Cấp</h4>
            <p className="text-white/70 text-sm">Hợp tác với CertiK đảm bảo các hợp đồng thông minh và cơ sở hạ tầng blockchain của chúng tôi được kiểm tra và bảo mật ở mức cao nhất.</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#041019] to-[#0D2538] p-5 rounded-lg border border-white/10">
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-medium text-white mb-2">Khả Năng Mở Rộng</h4>
            <p className="text-white/70 text-sm">Hợp tác với Polygon cho phép chúng tôi xây dựng trên các giải pháp Layer 2, đảm bảo giao dịch nhanh chóng, phí thấp và tính bền vững.</p>
          </div>
        </div>
      </div>
      
      {/* Partnership CTAs */}
      <div className="mt-8 text-center">
        <p className="text-white/70 text-sm max-w-2xl mx-auto mb-6">
          Chúng tôi đang tìm kiếm các đối tác chiến lược để cùng xây dựng tương lai của gaming phi tập trung.
          Nếu quan tâm đến việc hợp tác, hãy liên hệ với chúng tôi qua các kênh bên dưới.
        </p>
        
        <div className="flex justify-center gap-4">
          <a 
            href="mailto:partnerships@msci.game" 
            className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white transition-colors"
          >
            partnerships@msci.game
          </a>
          <a 
            href="https://t.me/MSCIToken" 
            className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white transition-colors"
          >
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
} 