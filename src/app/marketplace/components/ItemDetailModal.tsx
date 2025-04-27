'use client';

import React from 'react';
import Image from 'next/image';
import { X, ShoppingCart, Shield, Award, Clock, Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface ItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
}

export default function ItemDetailModal({ isOpen, onClose, item }: ItemDetailModalProps) {
  if (!item) return null;

  const statusText = 
    item.status === 'new' ? 'Mới' : 
    item.status === 'upgraded' ? 'Đã nâng cấp' : 
    'Limited';

  const statusColors = {
    new: 'text-green-400',
    upgraded: 'text-blue-400',
    limited: 'text-amber-400'
  };

  const rarityColors = {
    S: 'bg-amber-600',
    A: 'bg-purple-600',
    B: 'bg-blue-600',
    C: 'bg-green-600'
  };

  const typeText = 
    item.type === 'character' ? 'Nhân vật' : 
    item.type === 'skin' ? 'Skin' : 
    item.type === 'item' ? 'Vật phẩm' : 'NFT';

  // Mô tả mặc định nếu không có
  const description = item.description || `${item.name} là một ${typeText.toLowerCase()} ${item.rarity === 'S' ? 'cực kỳ hiếm' : item.rarity === 'A' ? 'rất hiếm' : item.rarity === 'B' ? 'hiếm' : 'thông thường'} trong vũ trụ M-SCI. ${item.status === 'limited' ? 'Đây là vật phẩm giới hạn, số lượng có hạn.' : ''}`;

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
              className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header với nút đóng */}
              <div className="relative">
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nội dung modal */}
              <div className="flex flex-col md:flex-row">
                {/* Hình ảnh */}
                <div className="md:w-1/2 h-64 md:h-auto relative">
                  <Image 
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent md:bg-gradient-to-r"></div>
                </div>

                {/* Thông tin */}
                <div className="md:w-1/2 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold text-white">{item.name}</h2>
                    <span className={`text-sm px-2 py-1 rounded font-semibold ${rarityColors[item.rarity as keyof typeof rarityColors]}`}>
                      {item.rarity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-400">{typeText}</span>
                    <span className="text-gray-500">•</span>
                    <span className={statusColors[item.status as keyof typeof statusColors]}>
                      {statusText}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-300">{description}</p>
                  </div>

                  <div className="mb-6 bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Info size={16} />
                      Thông tin thêm
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Shield size={16} className="text-blue-400" />
                        <span>Đã xác minh bởi M-SCI</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Award size={16} className="text-amber-400" />
                        <span>Độ hiếm: {item.rarity}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock size={16} className="text-purple-400" />
                        <span>Đăng bán: 3 ngày trước</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-green-400" />
                        <span>Có thể giao dịch ngay</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-amber-400 font-bold text-2xl">
                      {item.price.toLocaleString()} $MSCI
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                      <ShoppingCart size={18} />
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 