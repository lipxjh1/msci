'use client';

import React from 'react';
import Image from 'next/image';
import { X, Star, Award, Clock, BarChart2, Users, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface SellerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: Seller | null;
}

export default function SellerDetailModal({ isOpen, onClose, seller }: SellerDetailModalProps) {
  if (!seller) return null;

  // Mô tả mặc định nếu không có
  const description = seller.description || `${seller.name} là một trong những người bán hàng đầu trên M-SCI Marketplace với ${seller.transactions.toLocaleString()} giao dịch thành công và tỷ lệ đánh giá tích cực ${seller.rating}%.`;

  // Danh sách sản phẩm bán gần đây (giả định)
  const recentItems = [
    { name: `Vật phẩm MSCI #${Math.floor(Math.random() * 1000)}`, price: 1200 + Math.floor(Math.random() * 5000), time: '2 giờ trước' },
    { name: `Nhân vật Hiếm #${Math.floor(Math.random() * 100)}`, price: 8000 + Math.floor(Math.random() * 10000), time: '1 ngày trước' },
    { name: `Skin Giới hạn #${Math.floor(Math.random() * 50)}`, price: 5000 + Math.floor(Math.random() * 7000), time: '3 ngày trước' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header với nút đóng */}
              <div className="relative p-6 flex items-center gap-4 border-b border-gray-800">
                <div className="relative h-20 w-20 rounded-full overflow-hidden">
                  <Image 
                    src={seller.avatar}
                    alt={seller.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-white">{seller.name}</h2>
                    {seller.badge && (
                      <span className="text-2xl" title="Huy hiệu">{seller.badge}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 text-amber-400 mt-1">
                    <Star size={16} fill="currentColor" />
                    <span className="font-medium">{seller.rating}% đánh giá tích cực</span>
                  </div>
                </div>
                
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Thông tin người bán */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-300">{description}</p>
                </div>
                
                {/* Thống kê */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                    <ShoppingBag className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                    <div className="text-xl font-bold">{seller.transactions.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Giao dịch</div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                    <div className="text-xl font-bold">2+ năm</div>
                    <div className="text-xs text-gray-400">Thời gian hoạt động</div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                    <BarChart2 className="w-6 h-6 mx-auto mb-2 text-green-400" />
                    <div className="text-xl font-bold">Top {seller.id}</div>
                    <div className="text-xs text-gray-400">Xếp hạng</div>
                  </div>
                </div>
                
                {/* Sản phẩm bán gần đây */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3 text-lg">Sản phẩm bán gần đây</h3>
                  <div className="space-y-2">
                    {recentItems.map((item, index) => (
                      <div key={index} className="bg-gray-800/30 p-3 rounded-lg flex justify-between items-center">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.time}</div>
                        </div>
                        <div className="text-amber-400 font-bold">
                          {item.price.toLocaleString()} $MSCI
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex-grow flex items-center justify-center gap-2 transition-colors">
                    <Users size={16} />
                    Theo dõi
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex-grow flex items-center justify-center gap-2 transition-colors">
                    <Award size={16} />
                    Xem sản phẩm
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 