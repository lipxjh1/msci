'use client';

import React from 'react';
import Image from 'next/image';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Hướng dẫn chơi</h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 relative flex-shrink-0">
              <Image 
                src="/images/minigam/1.png" 
                alt="Hình ảnh minh họa" 
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Mục tiêu</h3>
              <p>Kết nối các cặp hình ảnh giống nhau bằng đường thẳng có tối đa 3 khúc ngoặt.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 relative flex-shrink-0 flex items-center justify-center">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 w-12 h-12 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">?</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Cách chơi</h3>
              <p>Nhấp vào các thẻ để lật chúng. Tìm các cặp hình ảnh giống nhau và kết nối chúng
              theo đường đi hợp lệ. Nếu có đường đi, cặp thẻ sẽ biến mất.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 relative flex-shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-blue-500">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Thời gian</h3>
              <p>Bạn có 3 phút để hoàn thành trò chơi. Thời gian sẽ được hiển thị ở phía trên bảng chơi.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 relative flex-shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-yellow-500">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Điểm số</h3>
              <p>Bạn sẽ nhận được điểm số dựa trên số cặp đã ghép và thời gian còn lại. Ghép càng nhiều cặp càng nhanh, điểm số càng cao.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal; 