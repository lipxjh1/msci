'use client';

import { useEffect, useRef } from 'react';
import { FaTimes, FaCheck, FaMedal, FaClipboardList } from 'react-icons/fa';
import Image from 'next/image';

interface LevelProps {
  id: string;
  name: string;
  subtitle: string;
  requirement: string;
  badge: string;
  color: string;
  shadowColor: string;
  buttonColor: string;
  benefits: string[];
  description: string;
  requirements: string[];
  featured: boolean;
}

interface CreatorLevelPopupProps {
  level: LevelProps;
  onClose: () => void;
}

export default function CreatorLevelPopup({ level, onClose }: CreatorLevelPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // Xử lý đóng popup khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Xử lý đóng popup khi nhấn ESC
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    // Vô hiệu hóa cuộn trang khi popup đang mở
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Animation để popup hiển thị mượt mà
  useEffect(() => {
    const timer = setTimeout(() => {
      if (popupRef.current) {
        popupRef.current.classList.remove('opacity-0');
        popupRef.current.classList.remove('scale-95');
      }
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  // Lấy màu gradient đúng cho từng cấp độ
  const getBackgroundGradient = (colorClass: string) => {
    const colors = {
      'from-amber-700 to-amber-500': 'from-amber-700/10 to-amber-500/10',
      'from-gray-300 to-gray-400': 'from-gray-300/10 to-gray-400/10',
      'from-yellow-400 to-yellow-600': 'from-yellow-400/10 to-yellow-600/10',
      'from-blue-400 to-blue-600': 'from-blue-400/10 to-blue-600/10',
      'from-purple-500 to-purple-700': 'from-purple-500/10 to-purple-700/10'
    };
    
    // @ts-ignore
    return colors[colorClass] || 'from-blue-500/10 to-purple-500/10';
  };

  const getLevelColor = (id: string) => {
    const colors: { [key: string]: string } = {
      bronze: 'text-amber-500',
      silver: 'text-gray-300',
      gold: 'text-yellow-400',
      diamond: 'text-blue-400',
      legend: 'text-purple-400'
    };
    
    return colors[id] || 'text-white';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        ref={popupRef}
        className="w-full max-w-4xl bg-gradient-to-b from-[var(--overwatch-dark-blue)]/95 to-[var(--overwatch-black)]/95 rounded-xl border border-white/10 shadow-2xl transform transition-all duration-300 opacity-0 scale-95 overflow-hidden"
      >
        {/* Header & Close button */}
        <div className={`p-6 bg-gradient-to-r ${getBackgroundGradient(level.color)} relative`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <FaTimes />
          </button>

          <div className="flex items-center">
            <div className="relative w-20 h-20 mr-6 flex-shrink-0">
              <Image
                src={level.badge}
                alt={`${level.name} Badge`}
                fill
                className="object-contain"
              />
            </div>
            
            <div>
              <h2 className={`text-3xl font-bold ${getLevelColor(level.id)} mb-1 font-rajdhani`}>
                Cấp {level.name} - {level.subtitle}
              </h2>
              <p className="text-white/70">{level.requirement}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="md:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10 flex items-center">
                  <FaMedal className="mr-2 text-lg" /> Tổng Quan
                </h3>
                <p className="text-white/80">{level.description}</p>
              </div>

              {/* Requirements */}
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10 flex items-center">
                  <FaClipboardList className="mr-2 text-lg" /> Yêu Cầu
                </h3>
                <ul className="space-y-2">
                  {level.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-white/80">
                      <FaCheck className={`mt-1 flex-shrink-0 ${getLevelColor(level.id)}`} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Apply */}
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10">
                  Cách Đăng Ký
                </h3>
                <ol className="space-y-3 pl-6 list-decimal text-white/80">
                  <li>Hoàn thành đơn đăng ký trên trang Nhà Sáng Tạo</li>
                  <li>Cung cấp liên kết đến kênh/trang mạng xã hội của bạn</li>
                  <li>Mô tả nội dung bạn dự định tạo cho M-SCI</li>
                  <li>Nhóm của chúng tôi sẽ xem xét đơn đăng ký trong vòng 3-5 ngày làm việc</li>
                  <li>Sau khi được chấp thuận, bạn sẽ nhận được thông báo qua email</li>
                </ol>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Benefits */}
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10">
                  Quyền Lợi
                </h3>
                <ul className="space-y-2">
                  {level.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${level.color} flex-shrink-0 mt-1.5`}></span>
                      <span className="text-white/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10">
                  Câu Hỏi Thường Gặp
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-white font-medium mb-1">Tôi có thể thăng cấp không?</h4>
                    <p className="text-white/70 text-sm">Có, bạn sẽ được đánh giá để thăng cấp khi đạt được các mốc người theo dõi và hiệu suất.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Làm thế nào để nhận thanh toán?</h4>
                    <p className="text-white/70 text-sm">M-Coin sẽ được tự động gửi vào tài khoản của bạn vào ngày 15 hàng tháng.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Tôi có thể tạo nội dung gì?</h4>
                    <p className="text-white/70 text-sm">Bạn có thể tạo hướng dẫn, gameplay, nghệ thuật và nhiều nội dung khác theo hướng dẫn.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-center">
            <button className={`px-8 py-3 bg-gradient-to-r ${level.color} text-white rounded-md shadow-lg hover:brightness-110 transition-all duration-300`}>
              Đăng Ký Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 