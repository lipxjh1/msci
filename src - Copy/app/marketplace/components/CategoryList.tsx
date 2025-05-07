'use client';

import React from 'react';

interface CategoryListProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'Tất cả', icon: '🌐' },
  { id: 'characters', name: 'Nhân vật', icon: '👤' },
  { id: 'skins', name: 'Trang phục & Skin', icon: '👕' },
  { id: 'items', name: 'Vật phẩm Đặc biệt', icon: '🛡️' },
  { id: 'nfts', name: 'NFT Độc quyền', icon: '🖼️' },
];

export default function CategoryList({ activeCategory, setActiveCategory }: CategoryListProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-2 min-w-max pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              flex items-center py-2 px-4 rounded-full transition-all
              ${activeCategory === category.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}
            `}
          >
            <span className="mr-2">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 