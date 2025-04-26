'use client';

import React from 'react';
import Image from 'next/image';

const featuredItems = [
  {
    id: 1,
    name: 'Akane - Chiến binh Ánh sáng',
    type: 'Nhân vật',
    rarity: 'Legendary',
    price: 50000,
    image: '/images/heroes/ui 10.png',
    hotLabel: 'HOT',
  },
  {
    id: 2,
    name: 'Alice - Nữ thần Băng giá',
    type: 'Nhân vật',
    rarity: 'Epic',
    price: 15000,
    image: '/images/heroes/idle10.png',
    hotLabel: 'RARE',
  },
  {
    id: 3,
    name: 'Protocol X Skin Series',
    type: 'Skin',
    rarity: 'Rare',
    price: 5000,
    image: '/images/heroes/robot_3.png',
    hotLabel: 'NEW',
  },
  {
    id: 4,
    name: 'Bộ sưu tập Elon\'s Legacy',
    type: 'Bộ sưu tập',
    rarity: 'Limited',
    price: 100000,
    image: '/images/heroes/elon_musk.png',
    hotLabel: 'LIMITED',
  },
];

export default function FeaturedItems() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        🔥 Giao dịch nổi bật
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <div 
            key={item.id}
            className="relative bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
          >
            <div className="absolute top-2 right-2 z-10">
              <span className={`
                inline-block px-2 py-1 rounded text-xs font-bold
                ${item.hotLabel === 'HOT' ? 'bg-red-600' : ''}
                ${item.hotLabel === 'RARE' ? 'bg-purple-600' : ''}
                ${item.hotLabel === 'NEW' ? 'bg-green-600' : ''}
                ${item.hotLabel === 'LIMITED' ? 'bg-amber-600' : ''}
              `}>
                {item.hotLabel}
              </span>
            </div>
            
            <div className="h-48 relative overflow-hidden">
              <Image 
                src={item.image}
                alt={item.name}
                fill
                className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">
                {item.name}
              </h3>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-400">
                  {item.type} • {item.rarity}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-400">
                  {item.price.toLocaleString()} $MSCI
                </span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded-full transition-colors">
                  Xem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 