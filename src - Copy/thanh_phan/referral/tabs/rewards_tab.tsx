'use client';

import Image from 'next/image';
import { FaGift, FaCoins, FaUserFriends, FaGem } from 'react-icons/fa';

export default function RewardsTab() {
  return (
    <div className="text-white animate-fadeIn">
      <h3 className="text-2xl font-bold mb-6 text-center">Phần Thưởng Giới Thiệu</h3>
      
      <div className="mb-8">
        <p className="text-center text-gray-300 mb-6 max-w-3xl mx-auto">
          Giới thiệu bạn bè tham gia để nhận ngay những phần thưởng đặc biệt sau. Phần thưởng sẽ tăng theo số lượng người bạn giới thiệu thành công.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Phần thưởng cho người giới thiệu */}
        <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
          <div className="bg-purple-900/30 p-4 text-center">
            <h4 className="text-xl font-bold">Phần Thưởng Cho Bạn</h4>
            <p className="text-sm text-gray-300">Khi giới thiệu thành công</p>
          </div>
          
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-600/20 rounded-full flex-shrink-0 flex items-center justify-center text-purple-400">
                  <FaCoins size={20} />
                </div>
                <div>
                  <h5 className="font-semibold mb-1">500 Gems</h5>
                  <p className="text-sm text-gray-300">Cho mỗi người bạn giới thiệu thành công</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-600/20 rounded-full flex-shrink-0 flex items-center justify-center text-purple-400">
                  <FaGift size={20} />
                </div>
                <div>
                  <h5 className="font-semibold mb-1">Skin Độc Quyền</h5>
                  <p className="text-sm text-gray-300">Khi giới thiệu được 5 người chơi mới</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-600/20 rounded-full flex-shrink-0 flex items-center justify-center text-purple-400">
                  <FaGem size={20} />
                </div>
                <div>
                  <h5 className="font-semibold mb-1">Nhân Vật Hiếm</h5>
                  <p className="text-sm text-gray-300">Khi giới thiệu được 10 người chơi mới</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-600/20 rounded-full flex-shrink-0 flex items-center justify-center text-purple-400">
                  <FaGem size={20} />
                </div>
                <div>
                  <h5 className="font-semibold mb-1">10% Hoa Hồng</h5>
                  <p className="text-sm text-gray-300">Từ các giao dịch mua game của người được giới thiệu</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Phần thưởng cho người được giới thiệu */}
        <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
          <div className="bg-purple-900/30 p-4 text-center">
            <h4 className="text-xl font-bold">Phần Thưởng Cho Bạn Bè</h4>
            <p className="text-sm text-gray-300">Khi tham gia qua mã giới thiệu</p>
          </div>
          
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-600/20 rounded-full flex-shrink-0 flex items-center justify-center text-purple-400">
                  <FaCoins size={20} />
                </div>
                <div>
                  <h5 className="font-semibold mb-1">300 Gems</h5>
                  <p className="text-sm text-gray-300">Ngay khi đăng ký và đạt cấp độ 10</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-600/20 rounded-full flex-shrink-0 flex items-center justify-center text-purple-400">
                  <FaGift size={20} />
                </div>
                <div>
                  <h5 className="font-semibold mb-1">Gói Starter Pack</h5>
                  <p className="text-sm text-gray-300">Bao gồm vật phẩm, trang bị và nhân vật cơ bản</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-600/20 rounded-full flex-shrink-0 flex items-center justify-center text-purple-400">
                  <FaUserFriends size={20} />
                </div>
                <div>
                  <h5 className="font-semibold mb-1">Huy Hiệu Đặc Biệt</h5>
                  <p className="text-sm text-gray-300">Huy hiệu độc quyền dành cho người chơi thông qua giới thiệu</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-600/20 rounded-full flex-shrink-0 flex items-center justify-center text-purple-400">
                  <FaGem size={20} />
                </div>
                <div>
                  <h5 className="font-semibold mb-1">10% Giảm Giá</h5>
                  <p className="text-sm text-gray-300">Cho lần nạp đầu tiên trong game</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Phần thưởng theo cấp độ - Bảng tiến trình */}
      <div className="bg-white/5 rounded-lg border border-white/10 p-6 mb-6">
        <h4 className="text-xl font-bold mb-4 text-center">Phần Thưởng Theo Cấp Bậc</h4>
        <p className="text-center text-gray-300 mb-6">Càng giới thiệu nhiều, phần thưởng càng lớn!</p>
        
        <div className="space-y-6">
          {/* Cấp bậc Đồng */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-semibold flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-amber-700 mr-2"></span>
                Cấp Đồng
              </h5>
              <span className="text-sm bg-white/10 px-2 py-1 rounded">1-5 người</span>
            </div>
            <p className="text-sm text-gray-300">500 Gems cho mỗi người + Skin Độc Quyền</p>
          </div>
          
          {/* Cấp bậc Bạc */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-semibold flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
                Cấp Bạc
              </h5>
              <span className="text-sm bg-white/10 px-2 py-1 rounded">6-15 người</span>
            </div>
            <p className="text-sm text-gray-300">700 Gems cho mỗi người + Nhân Vật Hiếm + Đặc quyền VIP</p>
          </div>
          
          {/* Cấp bậc Vàng */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-semibold flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                Cấp Vàng
              </h5>
              <span className="text-sm bg-white/10 px-2 py-1 rounded">16-30 người</span>
            </div>
            <p className="text-sm text-gray-300">1000 Gems cho mỗi người + Gói Premium + 15% hoa hồng</p>
          </div>
          
          {/* Cấp bậc Kim Cương */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-semibold flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
                Cấp Kim Cương
              </h5>
              <span className="text-sm bg-white/10 px-2 py-1 rounded">31+ người</span>
            </div>
            <p className="text-sm text-gray-300">1500 Gems cho mỗi người + Đặc quyền Cống Hiến + 20% hoa hồng</p>
          </div>
        </div>
      </div>
    </div>
  );
} 