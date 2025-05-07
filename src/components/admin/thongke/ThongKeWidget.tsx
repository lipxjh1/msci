'use client';

import { ThongKe } from './ThongKeTypes';

interface ThongKeWidgetProps {
  thongKe: ThongKe;
}

export default function ThongKeWidget({ thongKe }: ThongKeWidgetProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-6">
        <h3 className="text-lg mb-2">Tổng người dùng</h3>
        <p className="text-3xl font-bold">{thongKe.tong_nguoi_dung}</p>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg p-6">
        <h3 className="text-lg mb-2">Người dùng mới</h3>
        <p className="text-3xl font-bold">{thongKe.nguoi_dung_moi}</p>
      </div>
      <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg p-6">
        <h3 className="text-lg mb-2">Tổng lượt truy cập</h3>
        <p className="text-3xl font-bold">{thongKe.tong_luot_truy_cap}</p>
      </div>
      <div className="bg-gradient-to-r from-amber-500 to-amber-700 text-white rounded-lg p-6">
        <h3 className="text-lg mb-2">Lượt nhấp Play Now</h3>
        <p className="text-3xl font-bold">{thongKe.nut_play_now}</p>
      </div>
    </div>
  );
} 