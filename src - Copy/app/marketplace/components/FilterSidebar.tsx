'use client';

import React from 'react';
import { Sliders } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    type: string;
    rarity: string;
    priceRange: string;
    status: string;
  };
  setFilters: (filters: any) => void;
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  return (
    <div className="w-full lg:w-64 bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center">
          <Sliders className="mr-2" size={18} />
          Bộ lọc
        </h3>
        <button 
          className="text-sm text-blue-400 hover:text-blue-300"
          onClick={() => setFilters({
            type: 'all',
            rarity: 'all',
            priceRange: 'all',
            status: 'all',
          })}
        >
          Đặt lại
        </button>
      </div>

      <div className="space-y-6">
        {/* Loại vật phẩm */}
        <div>
          <h4 className="font-medium mb-2 text-gray-300">Loại</h4>
          <div className="space-y-1.5">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'character', label: 'Nhân vật' },
              { id: 'skin', label: 'Skin' },
              { id: 'item', label: 'Vật phẩm' },
              { id: 'nft', label: 'NFT' },
            ].map((type) => (
              <label key={type.id} className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  checked={filters.type === type.id}
                  onChange={() => handleFilterChange('type', type.id)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700"
                />
                <span className="text-sm">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Độ hiếm */}
        <div>
          <h4 className="font-medium mb-2 text-gray-300">Độ hiếm</h4>
          <div className="space-y-1.5">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'S', label: 'S - Huyền thoại' },
              { id: 'A', label: 'A - Sử thi' },
              { id: 'B', label: 'B - Hiếm' },
              { id: 'C', label: 'C - Phổ thông' },
            ].map((rarity) => (
              <label key={rarity.id} className="flex items-center">
                <input
                  type="radio"
                  name="rarity"
                  checked={filters.rarity === rarity.id}
                  onChange={() => handleFilterChange('rarity', rarity.id)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700"
                />
                <span className="text-sm">{rarity.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Khoảng giá */}
        <div>
          <h4 className="font-medium mb-2 text-gray-300">Khoảng giá</h4>
          <div className="space-y-1.5">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'under1k', label: 'Dưới 1,000 $MSCI' },
              { id: '1k-10k', label: '1,000 - 10,000 $MSCI' },
              { id: '10k-50k', label: '10,000 - 50,000 $MSCI' },
              { id: 'over50k', label: '50,000+ $MSCI' },
            ].map((price) => (
              <label key={price.id} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange === price.id}
                  onChange={() => handleFilterChange('priceRange', price.id)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700"
                />
                <span className="text-sm">{price.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Trạng thái */}
        <div>
          <h4 className="font-medium mb-2 text-gray-300">Trạng thái</h4>
          <div className="space-y-1.5">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'new', label: 'Mới' },
              { id: 'upgraded', label: 'Đã nâng cấp' },
              { id: 'limited', label: 'Limited Edition' },
            ].map((status) => (
              <label key={status.id} className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  checked={filters.status === status.id}
                  onChange={() => handleFilterChange('status', status.id)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700"
                />
                <span className="text-sm">{status.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 