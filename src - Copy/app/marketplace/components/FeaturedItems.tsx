'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import ItemDetailModal from './ItemDetailModal';

// Interface cho item
interface Item {
  id: number;
  name: string;
  type: string;
  rarity: string;
  price: number;
  image: string;
  status: string;
  description?: string;
}

const featuredItems = [
  {
    id: 1,
    name: 'Akane - Chiến binh Ánh sáng',
    type: 'Nhân vật',
    rarity: 'S',
    price: 50000,
    image: '/images/heroes/ui10.png',
    status: 'limited',
    description: 'Akane là nữ chiến binh siêu cấp với khả năng chiến đấu vượt trội. Sở hữu vũ khí hạng nặng và bộ giáp công nghệ M-SCI tiên tiến nhất, Akane là lựa chọn hàng đầu cho mọi đội hình.',
  },
  {
    id: 2,
    name: 'Alpha Bot X9',
    type: 'Vật phẩm',
    rarity: 'A',
    price: 15000,
    image: '/images/heroes/robot_4.png',
    status: 'limited',
    description: 'Robot chiến đấu tự động Alpha Bot X9 là sự kết hợp giữa trí thông minh nhân tạo và sức mạnh cơ học. Có thể hỗ trợ tấn công, phòng thủ và thu thập tài nguyên.',
  },
  {
    id: 3,
    name: 'Neuralink 2030',
    type: 'NFT',
    rarity: 'S',
    price: 35000,
    image: '/images/heroes/elon_musk.png',
    status: 'limited',
    description: 'NFT độc quyền giới hạn thể hiện bản thiết kế Neuralink 2030 - công nghệ kết nối não người với máy tính. Chỉ có 100 NFT được phát hành trên toàn thế giới.',
  },
];

export default function FeaturedItems() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openItemDetail = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeItemDetail = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center sm:text-left">
          🔥 Giao dịch nổi bật
        </h2>
        <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center text-sm">
          Xem tất cả <ArrowRight size={16} className="ml-1" />
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredItems.map((item) => (
          <div 
            key={item.id}
            className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden group hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
            onClick={() => openItemDetail(item)}
          >
            <div className="h-64 relative overflow-hidden">
              <Image 
                src={item.image}
                alt={item.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs rounded-full uppercase font-bold mb-2">
                  Hot
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  {item.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">
                    {item.type} • {item.rarity}
                  </span>
                  <span className="font-bold text-amber-400">{item.price.toLocaleString()} $MSCI</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  openItemDetail(item);
                }}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Item Detail Modal */}
      <ItemDetailModal 
        isOpen={isModalOpen}
        onClose={closeItemDetail}
        item={selectedItem}
      />
    </div>
  );
} 