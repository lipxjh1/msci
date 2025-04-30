'use client';

import dynamic from 'next/dynamic';

// Sử dụng dynamic import để tránh lỗi SSR với các thành phần sử dụng window/document
const ChessGameWithNoSSR = dynamic(
  () => import('../../../modules/minigames/chess-ai/ChessGame').then(mod => mod.ChessGame),
  { ssr: false }
);

export default function ChessGameClient() {
  return <ChessGameWithNoSSR />;
} 