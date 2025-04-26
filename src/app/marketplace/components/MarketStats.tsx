'use client';

import React from 'react';
import { BarChart3, TrendingUp, Clock, DollarSign, LineChart } from 'lucide-react';

export default function MarketStats() {
  return (
    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-indigo-800/5"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BarChart3 className="mr-2 text-blue-400" size={20} />
            <h3 className="font-bold text-lg">📊 Thống kê Thị trường</h3>
          </div>
          <div className="flex space-x-2">
            <button className="text-xs bg-gray-700 hover:bg-gray-600 py-1 px-2 rounded text-gray-400 hover:text-white transition-colors">24h</button>
            <button className="text-xs bg-blue-600 py-1 px-2 rounded text-white">7d</button>
            <button className="text-xs bg-gray-700 hover:bg-gray-600 py-1 px-2 rounded text-gray-400 hover:text-white transition-colors">30d</button>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-gray-300 text-sm mb-3 flex items-center">
              <DollarSign size={14} className="mr-1" />
              Giá Trung bình
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/80 rounded p-3 relative overflow-hidden group">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-400">Nhân vật Huyền thoại</span>
                  <span className="text-xs text-green-400 flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    5.2%
                  </span>
                </div>
                <p className="font-bold text-amber-400">42,500 $MSCI</p>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600 group-hover:bg-gray-500 transition-colors">
                  <div className="absolute bottom-0 left-0 w-3/4 h-1 bg-green-500"></div>
                </div>
              </div>
              
              <div className="bg-gray-700/80 rounded p-3 relative overflow-hidden group">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-400">Nhân vật Sử thi</span>
                  <span className="text-xs text-green-400 flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    2.8%
                  </span>
                </div>
                <p className="font-bold text-amber-400">8,200 $MSCI</p>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600 group-hover:bg-gray-500 transition-colors">
                  <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-green-500"></div>
                </div>
              </div>
              
              <div className="bg-gray-700/80 rounded p-3 relative overflow-hidden group">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-400">Skin Limited</span>
                  <span className="text-xs text-green-400 flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    15.7%
                  </span>
                </div>
                <p className="font-bold text-amber-400">12,300 $MSCI</p>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600 group-hover:bg-gray-500 transition-colors">
                  <div className="absolute bottom-0 left-0 w-5/6 h-1 bg-green-500"></div>
                </div>
              </div>
              
              <div className="bg-gray-700/80 rounded p-3 relative overflow-hidden group">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-400">MSCI Memory</span>
                  <span className="text-xs text-red-400 flex items-center">
                    <TrendingUp size={12} className="mr-1 transform rotate-180" />
                    1.2%
                  </span>
                </div>
                <p className="font-bold text-amber-400">150 $MSCI</p>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600 group-hover:bg-gray-500 transition-colors">
                  <div className="absolute bottom-0 left-0 w-1/4 h-1 bg-red-500"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-300 text-sm mb-3 flex items-center">
              <LineChart size={14} className="mr-1" />
              Volume Giao dịch
            </h4>
            <div className="bg-gray-700/80 rounded-lg p-3 mb-3">
              <div className="h-20 flex items-end justify-between px-2">
                <div className="h-1/3 w-1 bg-blue-500 rounded-t"></div>
                <div className="h-1/2 w-1 bg-blue-500 rounded-t"></div>
                <div className="h-2/3 w-1 bg-blue-500 rounded-t"></div>
                <div className="h-1/2 w-1 bg-blue-500 rounded-t"></div>
                <div className="h-full w-1 bg-blue-400 rounded-t"></div>
                <div className="h-3/4 w-1 bg-blue-500 rounded-t"></div>
                <div className="h-1/2 w-1 bg-blue-500 rounded-t"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-gray-700/80 rounded p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock size={10} className="mr-1 text-gray-400" />
                  <span className="text-xs text-gray-400">24h</span>
                </div>
                <p className="font-bold">2.3M $MSCI</p>
              </div>
              
              <div className="bg-gray-700/80 rounded p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock size={10} className="mr-1 text-gray-400" />
                  <span className="text-xs text-gray-400">7 ngày</span>
                </div>
                <p className="font-bold">15.6M $MSCI</p>
              </div>
              
              <div className="bg-gray-700/80 rounded p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock size={10} className="mr-1 text-gray-400" />
                  <span className="text-xs text-gray-400">30 ngày</span>
                </div>
                <p className="font-bold">78.4M $MSCI</p>
              </div>
              
              <div className="bg-gray-700/80 rounded p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp size={10} className="mr-1 text-gray-400" />
                  <span className="text-xs text-gray-400">Tổng</span>
                </div>
                <p className="font-bold">567.8M $MSCI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 