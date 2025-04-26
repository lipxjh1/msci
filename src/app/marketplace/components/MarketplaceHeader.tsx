'use client';

import React from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';

interface MarketplaceHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function MarketplaceHeader({ searchQuery, setSearchQuery }: MarketplaceHeaderProps) {
  return (
    <div className="relative py-12 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/overwatch_bg_2.jpg"
          alt="Marketplace background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            CHỢ M-SCI 🛒
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Nơi mua bán tài sản số, nhân vật và vật phẩm độc quyền trong vũ trụ M-SCI
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm vật phẩm, nhân vật, skin..."
              className="w-full py-3 px-5 pl-12 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 text-gray-400" size={20} />
            <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 ease-in-out shadow-lg shadow-blue-500/20">
              🔍 Tìm
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <button className="bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700 text-sm text-gray-300 py-1 px-3 rounded-full border border-gray-700">
              Nhân vật S
            </button>
            <button className="bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700 text-sm text-gray-300 py-1 px-3 rounded-full border border-gray-700">
              Skin Limited
            </button>
            <button className="bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700 text-sm text-gray-300 py-1 px-3 rounded-full border border-gray-700">
              NFT Độc quyền
            </button>
            <button className="bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700 text-sm text-gray-300 py-1 px-3 rounded-full border border-gray-700">
              Dưới 5000 $MSCI
            </button>
            <button className="bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700 text-sm text-gray-300 py-1 px-3 rounded-full border border-gray-700">
              Mới nhất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 