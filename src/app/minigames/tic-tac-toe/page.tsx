import React from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// Sửa cách import để tương thích với Server Components
const TicTacToeGame = dynamic(
  () => import('@/modules/minigames/tic-tac-toe/TicTacToeGame'),
  { loading: () => <div className="p-8 text-center">Đang tải game...</div> }
);

export const metadata: Metadata = {
  title: 'Cờ Caro với Akane | Mini Games',
  description: 'Chơi cờ caro với Akane AI thông minh trên bàn cờ 9x9 với nhiều cấp độ khó.',
};

export default function TicTacToePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Cờ Caro với Akane</h1>
        <p className="text-gray-300">
          Chơi cờ caro với AI thông minh trên bàn cờ 9x9. Thử thách với các độ khó khác nhau!
        </p>
      </div>
      
      <TicTacToeGame />
    </div>
  );
} 