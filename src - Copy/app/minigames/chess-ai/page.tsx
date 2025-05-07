import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trang đã bị xóa | Overwatch Mini Games',
  description: 'Trang này đã bị xóa theo yêu cầu'
}

export default function ChessAIPage() {
  return (
    <div className="min-h-screen w-full py-10 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Trang đã bị xóa</h1>
        <p className="text-gray-600">Trò chơi này đã bị xóa theo yêu cầu.</p>
      </div>
    </div>
  )
} 