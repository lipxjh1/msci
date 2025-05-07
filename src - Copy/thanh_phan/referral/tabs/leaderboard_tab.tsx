'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

export default function LeaderboardTab() {
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('month');
  
  // Dữ liệu mẫu cho bảng xếp hạng
  const leaderboardData = {
    week: [
      { rank: 1, avatar: '/images/avatars/avatar1.jpg', username: 'DragonSlayer', referrals: 25, reward: '5000 Gems' },
      { rank: 2, avatar: '/images/avatars/avatar2.jpg', username: 'ProGamer123', referrals: 18, reward: '3000 Gems' },
      { rank: 3, avatar: '/images/avatars/avatar3.jpg', username: 'MasterChief', referrals: 15, reward: '2000 Gems' },
      { rank: 4, avatar: '/images/avatars/avatar4.jpg', username: 'NinjaWarrior', referrals: 12, reward: '1500 Gems' },
      { rank: 5, avatar: '/images/avatars/avatar5.jpg', username: 'ShadowHunter', referrals: 10, reward: '1000 Gems' },
      { rank: 6, avatar: '/images/avatars/avatar6.jpg', username: 'TitanFall', referrals: 8, reward: '800 Gems' },
      { rank: 7, avatar: '/images/avatars/avatar7.jpg', username: 'DarkKnight', referrals: 7, reward: '700 Gems' },
      { rank: 8, avatar: '/images/avatars/avatar8.jpg', username: 'LegendaryHero', referrals: 6, reward: '600 Gems' },
      { rank: 9, avatar: '/images/avatars/avatar9.jpg', username: 'PhoenixRise', referrals: 5, reward: '500 Gems' },
      { rank: 10, avatar: '/images/avatars/avatar10.jpg', username: 'StarLord', referrals: 4, reward: '400 Gems' },
    ],
    month: [
      { rank: 1, avatar: '/images/avatars/avatar3.jpg', username: 'MasterChief', referrals: 85, reward: '15000 Gems' },
      { rank: 2, avatar: '/images/avatars/avatar1.jpg', username: 'DragonSlayer', referrals: 72, reward: '10000 Gems' },
      { rank: 3, avatar: '/images/avatars/avatar5.jpg', username: 'ShadowHunter', referrals: 65, reward: '8000 Gems' },
      { rank: 4, avatar: '/images/avatars/avatar2.jpg', username: 'ProGamer123', referrals: 58, reward: '6000 Gems' },
      { rank: 5, avatar: '/images/avatars/avatar4.jpg', username: 'NinjaWarrior', referrals: 50, reward: '5000 Gems' },
      { rank: 6, avatar: '/images/avatars/avatar7.jpg', username: 'DarkKnight', referrals: 45, reward: '4500 Gems' },
      { rank: 7, avatar: '/images/avatars/avatar6.jpg', username: 'TitanFall', referrals: 38, reward: '3800 Gems' },
      { rank: 8, avatar: '/images/avatars/avatar9.jpg', username: 'PhoenixRise', referrals: 32, reward: '3200 Gems' },
      { rank: 9, avatar: '/images/avatars/avatar10.jpg', username: 'StarLord', referrals: 29, reward: '2900 Gems' },
      { rank: 10, avatar: '/images/avatars/avatar8.jpg', username: 'LegendaryHero', referrals: 25, reward: '2500 Gems' },
    ],
    all: [
      { rank: 1, avatar: '/images/avatars/avatar5.jpg', username: 'ShadowHunter', referrals: 320, reward: '50000 Gems' },
      { rank: 2, avatar: '/images/avatars/avatar3.jpg', username: 'MasterChief', referrals: 290, reward: '35000 Gems' },
      { rank: 3, avatar: '/images/avatars/avatar1.jpg', username: 'DragonSlayer', referrals: 265, reward: '25000 Gems' },
      { rank: 4, avatar: '/images/avatars/avatar7.jpg', username: 'DarkKnight', referrals: 230, reward: '20000 Gems' },
      { rank: 5, avatar: '/images/avatars/avatar2.jpg', username: 'ProGamer123', referrals: 210, reward: '18000 Gems' },
      { rank: 6, avatar: '/images/avatars/avatar4.jpg', username: 'NinjaWarrior', referrals: 190, reward: '15000 Gems' },
      { rank: 7, avatar: '/images/avatars/avatar9.jpg', username: 'PhoenixRise', referrals: 175, reward: '13000 Gems' },
      { rank: 8, avatar: '/images/avatars/avatar6.jpg', username: 'TitanFall', referrals: 160, reward: '12000 Gems' },
      { rank: 9, avatar: '/images/avatars/avatar10.jpg', username: 'StarLord', referrals: 145, reward: '10000 Gems' },
      { rank: 10, avatar: '/images/avatars/avatar8.jpg', username: 'LegendaryHero', referrals: 130, reward: '9000 Gems' },
    ]
  };
  
  // Thông tin người dùng hiện tại
  const currentUser = {
    rank: 42,
    username: 'MSCI-XYZ789',
    referrals: 8,
    reward: '800 Gems'
  };
  
  // Chọn dữ liệu hiển thị tương ứng với period
  const displayData = leaderboardData[period];
  
  return (
    <div className="text-white animate-fadeIn">
      <h3 className="text-2xl font-bold mb-6 text-center">Bảng Xếp Hạng Giới Thiệu</h3>
      
      {/* Thời gian */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setPeriod('week')}
            className={`px-5 py-2 text-sm font-medium rounded-l-lg ${
              period === 'week' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Tuần Này
          </button>
          <button
            type="button"
            onClick={() => setPeriod('month')}
            className={`px-5 py-2 text-sm font-medium ${
              period === 'month' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Tháng Này
          </button>
          <button
            type="button"
            onClick={() => setPeriod('all')}
            className={`px-5 py-2 text-sm font-medium rounded-r-lg ${
              period === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Tất Cả
          </button>
        </div>
      </div>
      
      {/* Top 3 người dùng */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Vị trí thứ 2 */}
        <div className="order-2 md:order-1">
          <div className="bg-white/5 rounded-lg border border-white/10 p-6 text-center relative pt-12">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center">
                <FaMedal className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mb-3 relative w-16 h-16 mx-auto">
              <Image 
                src={displayData[1].avatar}
                alt={displayData[1].username}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h4 className="text-xl font-semibold mb-1">{displayData[1].username}</h4>
            <p className="text-gray-300 text-sm mb-2">Top 2</p>
            <div className="bg-white/5 rounded-lg p-2">
              <p className="text-sm">Giới thiệu: <span className="font-semibold">{displayData[1].referrals}</span></p>
              <p className="text-sm">Phần thưởng: <span className="text-yellow-400">{displayData[1].reward}</span></p>
            </div>
          </div>
        </div>
        
        {/* Vị trí thứ 1 */}
        <div className="order-1 md:order-2">
          <div className="bg-white/5 rounded-lg border border-yellow-500/30 p-6 text-center relative pt-12 transform md:scale-110 z-10">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center">
                <FaTrophy className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="mb-3 relative w-20 h-20 mx-auto">
              <Image 
                src={displayData[0].avatar}
                alt={displayData[0].username}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h4 className="text-xl font-semibold mb-1">{displayData[0].username}</h4>
            <p className="text-yellow-400 text-sm mb-2">Top 1</p>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-sm">Giới thiệu: <span className="font-semibold">{displayData[0].referrals}</span></p>
              <p className="text-sm">Phần thưởng: <span className="text-yellow-400">{displayData[0].reward}</span></p>
            </div>
          </div>
        </div>
        
        {/* Vị trí thứ 3 */}
        <div className="order-3">
          <div className="bg-white/5 rounded-lg border border-white/10 p-6 text-center relative pt-12">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 rounded-full bg-amber-700 flex items-center justify-center">
                <FaAward className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mb-3 relative w-16 h-16 mx-auto">
              <Image 
                src={displayData[2].avatar}
                alt={displayData[2].username}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h4 className="text-xl font-semibold mb-1">{displayData[2].username}</h4>
            <p className="text-gray-300 text-sm mb-2">Top 3</p>
            <div className="bg-white/5 rounded-lg p-2">
              <p className="text-sm">Giới thiệu: <span className="font-semibold">{displayData[2].referrals}</span></p>
              <p className="text-sm">Phần thưởng: <span className="text-yellow-400">{displayData[2].reward}</span></p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bảng xếp hạng top 4-10 */}
      <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden mb-8">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Thứ hạng
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Người chơi
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Giới thiệu
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Phần thưởng
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-white/5">
            {displayData.slice(3).map((user, index) => (
              <tr key={user.rank} className="hover:bg-white/10">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {user.rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 relative">
                      <Image
                        src={user.avatar}
                        alt={user.username}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {user.referrals}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">
                  {user.reward}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Vị trí của người dùng hiện tại */}
      <div className="bg-purple-900/20 rounded-lg border border-purple-500/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="px-3 py-1 text-sm font-semibold text-white bg-purple-600 rounded-lg">
              #{currentUser.rank}
            </span>
            <span className="ml-4 font-medium text-white">{currentUser.username}</span>
          </div>
          <div className="flex items-center space-x-6">
            <div>
              <span className="text-gray-300 text-sm">Giới thiệu:</span>
              <span className="ml-2 font-semibold text-white">{currentUser.referrals}</span>
            </div>
            <div>
              <span className="text-gray-300 text-sm">Phần thưởng:</span>
              <span className="ml-2 font-semibold text-yellow-400">{currentUser.reward}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 