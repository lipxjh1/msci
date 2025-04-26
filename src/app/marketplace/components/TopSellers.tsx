'use client';

import React from 'react';
import { Award, Star, TrendingUp, Users, Clock, Shield } from 'lucide-react';
import Image from 'next/image';

const topSellers = [
  {
    id: 1,
    name: 'ElonFanClub',
    transactions: 10234,
    rating: 99.9,
    badge: '🏆',
    avatar: '/images/heroes/elon_musk.png',
  },
  {
    id: 2,
    name: 'ProtocolTrader',
    transactions: 8567,
    rating: 99.7,
    badge: '🥈',
    avatar: '/images/heroes/ui 10.png',
  },
  {
    id: 3,
    name: 'MSCIWhale',
    transactions: 7890,
    rating: 99.5,
    badge: '🥉',
    avatar: '/images/heroes/idle10.png',
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
  return (
    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 to-blue-800/5"></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <Award className="mr-2 text-blue-400" size={20} />
          <h3 className="font-bold text-lg">👑 Top Người bán</h3>
        </div>
        
        <div className="space-y-3">
          {topSellers.map((seller) => (
            <div 
              key={seller.id}
              className="bg-gray-700/80 hover:bg-gray-600/80 rounded-lg p-3 flex items-center justify-between transition-colors group/seller"
            >
              <div className="flex items-center">
                <div className="relative mr-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={seller.avatar}
                      alt={seller.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  {seller.badge && (
                    <span className="absolute -top-1 -right-1 text-sm">
                      {seller.badge}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{seller.name}</h4>
                  <div className="flex items-center text-xs text-gray-400">
                    <Star size={10} className="text-yellow-400 mr-1" />
                    <span className="mr-2">{seller.rating}%</span>
                    <span>{seller.transactions.toLocaleString()} giao dịch</span>
                  </div>
                </div>
              </div>
              <button className="text-blue-400 hover:text-white text-sm py-1 px-3 rounded-full border border-blue-400 hover:bg-blue-600 hover:border-blue-600 transition-all group-hover/seller:shadow-lg group-hover/seller:shadow-blue-500/20">
                Xem
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-700">
          <h4 className="text-gray-300 text-sm font-medium mb-3">Power Seller Benefits</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-700/50 rounded p-2 flex items-start">
              <TrendingUp size={14} className="mr-2 text-green-400 mt-0.5" />
              <div>
                <h5 className="text-xs font-medium mb-1">Phí giao dịch thấp hơn</h5>
                <p className="text-xs text-gray-400">Giảm 50% phí giao dịch</p>
              </div>
            </div>
            <div className="bg-gray-700/50 rounded p-2 flex items-start">
              <Users size={14} className="mr-2 text-blue-400 mt-0.5" />
              <div>
                <h5 className="text-xs font-medium mb-1">Ưu tiên hiển thị</h5>
                <p className="text-xs text-gray-400">Tăng khả năng hiển thị</p>
              </div>
            </div>
            <div className="bg-gray-700/50 rounded p-2 flex items-start">
              <Clock size={14} className="mr-2 text-amber-400 mt-0.5" />
              <div>
                <h5 className="text-xs font-medium mb-1">Hỗ trợ VIP 24/7</h5>
                <p className="text-xs text-gray-400">Hỗ trợ ưu tiên 24h</p>
              </div>
            </div>
            <div className="bg-gray-700/50 rounded p-2 flex items-start">
              <Shield size={14} className="mr-2 text-purple-400 mt-0.5" />
              <div>
                <h5 className="text-xs font-medium mb-1">Bảo hiểm giao dịch</h5>
                <p className="text-xs text-gray-400">Bảo vệ khỏi lừa đảo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 