"use client";

import React from 'react';
import Image from 'next/image';

const StoryNotSelected: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="relative w-32 h-32 mx-auto mb-6">
        <Image 
          src="/images/overwatch_logo.png" 
          alt="Logo" 
          fill
          className="object-contain"
        />
      </div>
      <h2 className="text-2xl font-semibold mb-3">Chọn một truyện để bắt đầu đọc</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        Khám phá thế giới Overwatch thông qua những câu chuyện hấp dẫn và hành trình của các nhân vật
      </p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Thư giãn</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Tận hưởng những câu chuyện đầy cảm xúc trong thế giới Overwatch
          </p>
        </div>
        
        <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Khám phá</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Tìm hiểu sâu hơn về lịch sử và bối cảnh của thế giới trò chơi
          </p>
        </div>
        
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Cùng nhau đọc</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Chia sẻ trải nghiệm đọc truyện với cộng đồng fan Overwatch
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryNotSelected; 