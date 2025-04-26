'use client';

import React from 'react';
import Image from 'next/image';

interface ItemsListProps {
  category: string;
  searchQuery: string;
  filters: {
    type: string;
    rarity: string;
    priceRange: string;
    status: string;
  };
}

// Mock data với các ảnh thật
const characters = [
  {
    id: 1,
    name: 'Akane - Nữ thần Súng máy',
    type: 'character',
    rarity: 'S',
    price: 45000,
    image: '/images/heroes/ui 10.png',
    status: 'new',
  },
  {
    id: 2,
    name: 'Alice - Thiện xạ Băng giá',
    type: 'character',
    rarity: 'S',
    price: 38000,
    image: '/images/heroes/idle10.png',
    status: 'upgraded',
  },
  {
    id: 3,
    name: 'Caitlyn - Pháo thủ Hỏa ngục',
    type: 'character',
    rarity: 'S',
    price: 42000,
    image: '/images/heroes/player_game_ui 9.png',
    status: 'limited',
  },
  {
    id: 4,
    name: 'Victoria - Nữ chiến binh Quý tộc',
    type: 'character',
    rarity: 'A',
    price: 8000,
    image: '/images/heroes/ui 6.png',
    status: 'new',
  },
  {
    id: 5,
    name: 'Elizabeth - Giáo sư Bắn tỉa',
    type: 'character',
    rarity: 'A',
    price: 7500,
    image: '/images/heroes/ui11.png',
    status: 'upgraded',
  },
  {
    id: 6,
    name: 'Alexandra - Đại úy Pháo binh',
    type: 'character',
    rarity: 'A',
    price: 9000,
    image: '/images/heroes/ui7.png',
    status: 'limited',
  },
];

const skins = [
  {
    id: 101,
    name: 'Protocol X - Akane',
    type: 'skin',
    rarity: 'S',
    price: 12000,
    image: '/images/heroes/uiux 1.png',
    status: 'limited',
  },
  {
    id: 102,
    name: 'Protocol X - Alice',
    type: 'skin',
    rarity: 'S',
    price: 11000,
    image: '/images/heroes/uiux3.png',
    status: 'limited',
  },
  {
    id: 103,
    name: 'Kẻ Thăng Thiên - Caitlyn',
    type: 'skin',
    rarity: 'A',
    price: 5000,
    image: '/images/heroes/ui 2.png',
    status: 'new',
  },
];

const items = [
  {
    id: 201,
    name: 'MSCI Memory',
    type: 'item',
    rarity: 'B',
    price: 150,
    image: '/images/heroes/drone 1.png',
    status: 'new',
  },
  {
    id: 202,
    name: 'DOGE Energy',
    type: 'item',
    rarity: 'B',
    price: 120,
    image: '/images/heroes/drone_2.png',
    status: 'new',
  },
  {
    id: 203,
    name: 'DOGE Shield',
    type: 'item',
    rarity: 'A',
    price: 500,
    image: '/images/heroes/robot_4.png',
    status: 'limited',
  },
];

const nfts = [
  {
    id: 301,
    name: 'Hiện vật Cổ đại',
    type: 'nft',
    rarity: 'S',
    price: 25000,
    image: '/images/heroes/robot bc.png',
    status: 'limited',
  },
  {
    id: 302,
    name: 'Neuralink Prototype',
    type: 'nft',
    rarity: 'S',
    price: 35000,
    image: '/images/heroes/elon_musk.png',
    status: 'limited',
  },
];

// Combine all items
const allItems = [...characters, ...skins, ...items, ...nfts];

export default function ItemsList({ category, searchQuery, filters }: ItemsListProps) {
  // Get items based on category
  let displayItems = allItems;
  
  if (category === 'characters') {
    displayItems = characters;
  } else if (category === 'skins') {
    displayItems = skins;
  } else if (category === 'items') {
    displayItems = items;
  } else if (category === 'nfts') {
    displayItems = nfts;
  }
  
  // Apply filters
  let filteredItems = displayItems.filter(item => {
    // Search query filter
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Type filter
    if (filters.type !== 'all' && item.type !== filters.type) {
      return false;
    }
    
    // Rarity filter
    if (filters.rarity !== 'all' && item.rarity !== filters.rarity) {
      return false;
    }
    
    // Price range filter
    if (filters.priceRange !== 'all') {
      if (filters.priceRange === 'under1k' && item.price >= 1000) return false;
      if (filters.priceRange === '1k-10k' && (item.price < 1000 || item.price > 10000)) return false;
      if (filters.priceRange === '10k-50k' && (item.price < 10000 || item.price > 50000)) return false;
      if (filters.priceRange === 'over50k' && item.price < 50000) return false;
    }
    
    // Status filter
    if (filters.status !== 'all' && item.status !== filters.status) {
      return false;
    }
    
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">
          {filteredItems.length} kết quả
        </h3>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-400">Sắp xếp:</span>
          <select className="bg-gray-700 text-white text-sm rounded border border-gray-600 px-2 py-1">
            <option>Mới nhất</option>
            <option>Giá: Thấp đến cao</option>
            <option>Giá: Cao đến thấp</option>
            <option>Độ hiếm</option>
          </select>
        </div>
      </div>
      
      {filteredItems.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h3 className="text-xl font-medium mb-2">Không tìm thấy kết quả</h3>
          <p className="text-gray-400">Vui lòng thử tìm kiếm hoặc bộ lọc khác</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="h-48 relative overflow-hidden">
                <Image 
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-md">
                    {item.name}
                  </h3>
                  <span className={`
                    text-xs px-1.5 py-0.5 rounded font-semibold
                    ${item.rarity === 'S' ? 'bg-amber-600' : ''}
                    ${item.rarity === 'A' ? 'bg-purple-600' : ''}
                    ${item.rarity === 'B' ? 'bg-blue-600' : ''}
                    ${item.rarity === 'C' ? 'bg-green-600' : ''}
                  `}>
                    {item.rarity}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-gray-400">
                    {item.type === 'character' ? 'Nhân vật' : 
                     item.type === 'skin' ? 'Skin' : 
                     item.type === 'item' ? 'Vật phẩm' : 'NFT'}
                  </span>
                  <span className={`
                    text-xs
                    ${item.status === 'new' ? 'text-green-400' : 
                     item.status === 'upgraded' ? 'text-blue-400' : 
                     'text-amber-400'}
                  `}>
                    {item.status === 'new' ? 'Mới' : 
                     item.status === 'upgraded' ? 'Đã nâng cấp' : 
                     'Limited'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400">
                    {item.price.toLocaleString()} $MSCI
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded-full transition-colors">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 