'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaCopy, FaCheckCircle, FaUsers, FaMedal } from 'react-icons/fa';

interface MyReferralsTabProps {
  referralCode: string;
  referralLink: string;
  onCopyCode: () => void;
  onCopyLink: () => void;
  copied: boolean;
}

export default function MyReferralsTab({
  referralCode,
  referralLink,
  onCopyCode,
  onCopyLink,
  copied
}: MyReferralsTabProps) {
  const [activeSection, setActiveSection] = useState<'statistics' | 'history'>('statistics');
  
  // Dữ liệu mẫu
  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarned: 6000,
    rankLevel: 'Bạc',
    nextLevel: 'Vàng',
    nextLevelThreshold: 16,
    referralsToNextLevel: 4
  };
  
  const referralHistory = [
    { id: 1, username: 'NguyenVanA', level: 15, status: 'active', joinDate: '15/04/2025', reward: 500 },
    { id: 2, username: 'TranThiB', level: 22, status: 'active', joinDate: '10/04/2025', reward: 500 },
    { id: 3, username: 'LeVanC', level: 8, status: 'pending', joinDate: '05/04/2025', reward: 0 },
    { id: 4, username: 'PhamThiD', level: 30, status: 'active', joinDate: '01/04/2025', reward: 500 },
    { id: 5, username: 'HoangVanE', level: 5, status: 'pending', joinDate: '28/03/2025', reward: 0 },
  ];
  
  return (
    <div className="text-white animate-fadeIn">
      <h3 className="text-2xl font-bold mb-6 text-center">Mã Giới Thiệu Của Tôi</h3>
      
      {/* Mã giới thiệu */}
      <div className="bg-white/5 p-6 rounded-lg border border-white/10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Mã Giới Thiệu Của Bạn</label>
            <div className="flex">
              <input 
                type="text" 
                value={referralCode} 
                readOnly 
                className="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-l-lg text-white focus:outline-none"
              />
              <button 
                onClick={onCopyCode} 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-r-lg transition-colors flex items-center"
              >
                {copied ? <FaCheckCircle className="mr-2" /> : <FaCopy className="mr-2" />}
                {copied ? 'Đã sao chép' : 'Sao chép'}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Link Giới Thiệu Của Bạn</label>
            <div className="flex">
              <input 
                type="text" 
                value={referralLink} 
                readOnly 
                className="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-l-lg text-white focus:outline-none truncate"
              />
              <button 
                onClick={onCopyLink} 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-r-lg transition-colors flex items-center"
              >
                {copied ? <FaCheckCircle className="mr-2" /> : <FaCopy className="mr-2" />}
                {copied ? 'Đã sao chép' : 'Sao chép'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-300 mb-4">Chia sẻ mã giới thiệu này với bạn bè để nhận phần thưởng</p>
          <div className="flex justify-center space-x-4">
            <button className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors">
              <span className="text-white font-bold">f</span>
            </button>
            <button className="w-10 h-10 bg-blue-400 hover:bg-blue-300 rounded-full flex items-center justify-center transition-colors">
              <span className="text-white font-bold">t</span>
            </button>
            <button className="w-10 h-10 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors">
              <span className="text-white font-bold">z</span>
            </button>
            <button className="w-10 h-10 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors">
              <span className="text-white font-bold">e</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Tab cho thống kê và lịch sử */}
      <div className="mb-6">
        <div className="flex justify-center mb-6">
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            <button
              onClick={() => setActiveSection('statistics')}
              className={`px-6 py-3 font-medium ${
                activeSection === 'statistics' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Thống Kê
            </button>
            <button
              onClick={() => setActiveSection('history')}
              className={`px-6 py-3 font-medium ${
                activeSection === 'history' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Lịch Sử Giới Thiệu
            </button>
          </div>
        </div>
        
        {/* Nội dung theo tab */}
        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          {activeSection === 'statistics' ? (
            <div>
              <h4 className="text-xl font-semibold mb-6 text-center">Thống Kê Giới Thiệu</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                  <p className="text-sm text-gray-300">Tổng số giới thiệu</p>
                  <p className="text-3xl font-bold text-white mt-2">{referralStats.totalReferrals}</p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                  <p className="text-sm text-gray-300">Giới thiệu hoạt động</p>
                  <p className="text-3xl font-bold text-white mt-2">{referralStats.activeReferrals}</p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                  <p className="text-sm text-gray-300">Gems đã nhận</p>
                  <p className="text-3xl font-bold text-white mt-2">{referralStats.totalEarned}</p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                  <p className="text-sm text-gray-300">Cấp bậc hiện tại</p>
                  <p className="text-3xl font-bold text-white mt-2">{referralStats.rankLevel}</p>
                </div>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 mb-6">
                <h5 className="font-semibold mb-3">Tiến trình cấp bậc</h5>
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-300">Cấp {referralStats.rankLevel}</span>
                  <div className="mx-4 flex-grow h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${(referralStats.totalReferrals / referralStats.nextLevelThreshold) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-300">Cấp {referralStats.nextLevel}</span>
                </div>
                <p className="text-sm text-gray-300 text-center">
                  Cần thêm {referralStats.referralsToNextLevel} người giới thiệu nữa để đạt cấp {referralStats.nextLevel}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h4 className="text-xl font-semibold mb-6 text-center">Lịch Sử Giới Thiệu</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead>
                    <tr className="bg-white/5 text-left">
                      <th className="px-4 py-3 text-sm font-medium text-gray-300">Người dùng</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-300">Cấp độ</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-300">Trạng thái</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-300">Ngày tham gia</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-300">Phần thưởng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {referralHistory.map(referral => (
                      <tr key={referral.id} className="hover:bg-white/5">
                        <td className="px-4 py-3 whitespace-nowrap">{referral.username}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{referral.level}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            referral.status === 'active' 
                              ? 'bg-green-900/30 text-green-400' 
                              : 'bg-yellow-900/30 text-yellow-400'
                          }`}>
                            {referral.status === 'active' ? 'Hoạt động' : 'Đang chờ'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{referral.joinDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {referral.reward > 0 ? `${referral.reward} Gems` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {referralHistory.length === 0 && (
                <div className="text-center py-8 text-gray-300">
                  Bạn chưa có người giới thiệu nào. Hãy chia sẻ mã giới thiệu của bạn để nhận phần thưởng!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 