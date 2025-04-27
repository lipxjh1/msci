'use client';

import React, { useState } from 'react';
import { Award, Star, TrendingUp, Users, Clock, Shield } from 'lucide-react';
import Image from 'next/image';
import SellerDetailModal from './SellerDetailModal';

// Interface cho seller
interface Seller {
  id: number;
  name: string;
  transactions: number;
  rating: number;
  badge: string;
  avatar: string;
  description?: string;
}

const topSellers = [
  {
    id: 1,
    name: 'ElonFanClub',
    transactions: 10234,
    rating: 99.9,
    badge: '🏆',
    avatar: '/images/heroes/elon_musk.png',
    description: 'ElonFanClub là người bán hàng đầu chuyên về các NFT và vật phẩm liên quan đến công nghệ M-SCI cao cấp. Là một trong những người bán đầu tiên và uy tín nhất trên nền tảng.',
  },
  {
    id: 2,
    name: 'ProtocolTrader',
    transactions: 8567,
    rating: 99.7,
    badge: '🥈',
    avatar: '/images/heroes/ui 10.png',
    description: 'ProtocolTrader chuyên cung cấp nhân vật và skin độc quyền với mức giá hợp lý. Luôn đảm bảo giao dịch an toàn và nhanh chóng.',
  },
  {
    id: 3,
    name: 'MSCIWhale',
    transactions: 7890,
    rating: 99.5,
    badge: '🥉',
    avatar: '/images/heroes/idle10.png',
    description: 'MSCIWhale là một trong những người nắm giữ lượng token MSCI lớn nhất hệ thống. Chuyên mua bán các vật phẩm hiếm và độc quyền.',
  },
  {
    id: 4,
    name: 'AliceCollector',
    transactions: 6543,
    rating: 99.3,
    badge: '',
    avatar: '/images/heroes/ui11.png',
  },
  {
    id: 5,
    name: 'NFTHunter',
    transactions: 5421,
    rating: 99.1,
    badge: '',
    avatar: '/images/heroes/ui7.png',
  },
];

export default function TopSellers() {
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSellerDetail = (seller: Seller) => {
    setSelectedSeller(seller);
    setIsModalOpen(true);
  };

  const closeSellerDetail = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <Award className="text-amber-400" size={24} />
        <h2 className="text-xl font-bold">👑 Top Người bán</h2>
      </div>
      
      <div className="space-y-4">
        {topSellers.slice(0, 3).map((seller) => (
          <div 
            key={seller.id}
            className="flex items-center justify-between bg-gray-800/70 p-3 rounded-lg hover:bg-gray-700/70 transition-colors cursor-pointer"
            onClick={() => openSellerDetail(seller)}
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-gray-600">
                <Image 
                  src={seller.avatar}
                  alt={seller.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{seller.name}</span>
                  <span title="Huy hiệu">{seller.badge}</span>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <Star size={12} className="text-amber-400 mr-1" fill="currentColor" />
                  {seller.rating}% • {seller.transactions.toLocaleString()} giao dịch
                </div>
              </div>
            </div>
            
            <button 
              className="bg-blue-600/80 hover:bg-blue-600 text-white text-sm py-1 px-4 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                openSellerDetail(seller);
              }}
            >
              Xem
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button 
          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          onClick={() => openSellerDetail(topSellers[0])}
        >
          Xem tất cả người bán
        </button>
      </div>

      {/* Seller Detail Modal */}
      <SellerDetailModal 
        isOpen={isModalOpen}
        onClose={closeSellerDetail}
        seller={selectedSeller}
      />
    </div>
  );
} 