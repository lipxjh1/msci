'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="fixed top-0 right-0 w-full h-full z-0 opacity-20 pointer-events-none">
        <Image
          src="/images/particle_overlay.png"
          alt="Background texture"
          fill
          className="object-cover"
        />
      </div>
      
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 py-3 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-blue-400 transition-colors flex items-center">
                <Image 
                  src="/images/overwatch_logo.png" 
                  alt="M-SCI Logo" 
                  width={32} 
                  height={32} 
                  className="mr-2"
                />
                <span className="font-bold text-xl">M-SCI</span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/marketplace" className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
                  Marketplace
                </Link>
                <Link href="/heroes" className="text-gray-300 hover:text-white transition-colors">
                  Nhân vật
                </Link>
                <Link href="/shop" className="text-gray-300 hover:text-white transition-colors">
                  Cửa hàng
                </Link>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                  Sự kiện
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="hidden sm:flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-full text-sm transition-colors border border-gray-700">
                <span>500</span>
                <span className="text-amber-400">$MSCI</span>
              </button>
              
              <div className="hidden sm:flex items-center space-x-4">
                <button className="text-gray-300 hover:text-white transition-colors relative group">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
                  <span className="absolute top-full right-0 mt-1 w-4 h-4 bg-gray-800 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  <div className="absolute top-full right-0 mt-3 w-64 bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <h4 className="font-medium text-sm border-b border-gray-700 pb-2 mb-2">Thông báo</h4>
                    <div className="text-xs text-gray-400">Không có thông báo mới</div>
                  </div>
                </button>
                <button className="text-gray-300 hover:text-white transition-colors relative group">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-3 h-3 flex items-center justify-center text-[10px]">2</span>
                </button>
                <button className="text-gray-300 hover:text-white transition-colors">
                  <User size={20} />
                </button>
              </div>
              
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-300 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/90 backdrop-blur-md border-b border-gray-800 fixed left-0 right-0 z-40">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/marketplace" 
                className="text-blue-400 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link 
                href="/heroes" 
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nhân vật
              </Link>
              <Link 
                href="/shop" 
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cửa hàng
              </Link>
              <Link 
                href="/events" 
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sự kiện
              </Link>
              
              <div className="flex items-center justify-between py-2">
                <button className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-full text-sm transition-colors border border-gray-700">
                  <span>500</span>
                  <span className="text-amber-400">$MSCI</span>
                </button>
                
                <div className="flex items-center space-x-4">
                  <button className="text-gray-300 hover:text-white transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
                  </button>
                  <button className="text-gray-300 hover:text-white transition-colors relative">
                    <ShoppingCart size={20} />
                    <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-3 h-3 flex items-center justify-center text-[10px]">2</span>
                  </button>
                  <button className="text-gray-300 hover:text-white transition-colors">
                    <User size={20} />
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
      
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
} 