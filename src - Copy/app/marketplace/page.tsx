'use client';

import React, { useState } from 'react';
import MarketplaceHeader from './components/MarketplaceHeader';
import FeaturedItems from './components/FeaturedItems';
import CategoryList from './components/CategoryList';
import ItemsList from './components/ItemsList';
import FilterSidebar from './components/FilterSidebar';
import MarketStats from './components/MarketStats';
import TopSellers from './components/TopSellers';

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    rarity: 'all',
    priceRange: 'all',
    status: 'all',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <MarketplaceHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <FeaturedItems />
        
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
            🏪 Danh mục Giao dịch
          </h2>
          <CategoryList 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar 
            filters={filters}
            setFilters={setFilters}
          />
          
          <div className="flex-1">
            <ItemsList 
              category={activeCategory}
              searchQuery={searchQuery}
              filters={filters}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <MarketStats />
          <TopSellers />
        </div>
      </main>
      
      <footer className="bg-gray-900 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <p className="text-sm">Tải ngay ứng dụng M-SCI Market để giao dịch mọi lúc mọi nơi!</p>
            <div className="flex justify-center gap-4 mt-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                App Store
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Google Play
              </button>
            </div>
          </div>
          <p className="text-gray-400 text-sm">© 2025 M-SCI Marketplace. Giao dịch an toàn - Giá trị thực.</p>
        </div>
      </footer>
    </div>
  );
} 