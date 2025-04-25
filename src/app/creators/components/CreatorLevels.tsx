'use client';

import { useState } from 'react';
import Image from 'next/image';
import CreatorLevelPopup from './CreatorLevelPopup';

export default function CreatorLevels() {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const levels = [
    {
      id: 'bronze',
      name: 'Đồng',
      subtitle: 'Người Sáng Tạo Mới',
      requirement: '1.000+ người theo dõi',
      badge: '/images/badge-1.svg',
      color: 'from-amber-700 to-amber-500',
      shadowColor: 'shadow-amber-600/30',
      buttonColor: 'bg-amber-500/20 text-amber-500 border-amber-500/40 hover:bg-amber-500/30',
      benefits: [
        'Huy hiệu Nhà Sáng Tạo trong game',
        '5.000 M-Coin mỗi tháng',
        'Truy cập sớm nội dung mới',
        'Kênh riêng trên Discord'
      ],
      description: 'Cấp độ Đồng là điểm khởi đầu hoàn hảo cho người sáng tạo nội dung mới. Bạn sẽ nhận được các công cụ cơ bản và phần thưởng để bắt đầu hành trình của mình.',
      requirements: [
        'Có ít nhất 1.000 người theo dõi trên một nền tảng',
        'Đăng ít nhất 2 nội dung mỗi tháng',
        'Tuân thủ các hướng dẫn nội dung'
      ],
      featured: false
    },
    {
      id: 'silver',
      name: 'Bạc',
      subtitle: 'Người Sáng Tạo Chuyên Nghiệp',
      requirement: '10.000+ người theo dõi',
      badge: '/images/badge-2.svg',
      color: 'from-gray-300 to-gray-400',
      shadowColor: 'shadow-gray-400/40',
      buttonColor: 'bg-gray-500/20 text-gray-300 border-gray-400/40 hover:bg-gray-500/30',
      benefits: [
        'Tất cả quyền lợi cấp Đồng',
        '20.000 M-Coin mỗi tháng',
        'Trang phục độc quyền cho người sáng tạo',
        'Hỗ trợ ưu tiên',
        'Tham gia thử nghiệm beta'
      ],
      description: 'Cấp độ Bạc dành cho những người sáng tạo nội dung đang phát triển mạnh. Với quyền lợi mở rộng và cơ hội tiếp cận nội dung độc quyền.',
      requirements: [
        'Có ít nhất 10.000 người theo dõi trên một nền tảng',
        'Đăng ít nhất 4 nội dung mỗi tháng',
        'Đạt 50.000+ lượt xem hàng tháng',
        'Tham gia các sự kiện cộng đồng'
      ],
      featured: false
    },
    {
      id: 'gold',
      name: 'Vàng',
      subtitle: 'Người Sáng Tạo Chuyên Gia',
      requirement: '50.000+ người theo dõi',
      badge: '/images/badge-3.svg',
      color: 'from-yellow-400 to-yellow-600',
      shadowColor: 'shadow-yellow-500/40',
      buttonColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40 hover:bg-yellow-500/30',
      benefits: [
        'Tất cả quyền lợi cấp Bạc',
        '50.000 M-Coin mỗi tháng',
        'Vật phẩm tùy chỉnh trong game',
        'Liên lạc trực tiếp với đội ngũ phát triển',
        'Cơ hội nội dung được tài trợ'
      ],
      description: 'Cấp độ Vàng dành cho những nhà sáng tạo nội dung có tầm ảnh hưởng lớn. Bạn sẽ có cơ hội tham gia vào quá trình phát triển và được tài trợ cho nội dung.',
      requirements: [
        'Có ít nhất 50.000 người theo dõi trên một nền tảng',
        'Đăng ít nhất 6 nội dung mỗi tháng',
        'Đạt 200.000+ lượt xem hàng tháng',
        'Tham gia phát triển cộng đồng'
      ],
      featured: true
    },
    {
      id: 'diamond',
      name: 'Kim Cương',
      subtitle: 'Người Sáng Tạo Ưu Tú',
      requirement: '100.000+ người theo dõi',
      badge: '/images/badge-3.svg', // Sử dụng badge-3 tạm thời
      color: 'from-blue-400 to-blue-600',
      shadowColor: 'shadow-blue-500/40',
      buttonColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40 hover:bg-blue-500/30',
      benefits: [
        'Tất cả quyền lợi cấp Vàng',
        '100.000 M-Coin mỗi tháng',
        'NPC mang tên bạn trong game',
        'Chia sẻ doanh thu từ sự kiện đặc biệt',
        'Quyền truy cập VIP mọi sự kiện'
      ],
      description: 'Cấp độ Kim Cương là dành cho những nhà sáng tạo hàng đầu. Bạn sẽ trở thành một phần của game với quyền lợi độc quyền và thu nhập ổn định.',
      requirements: [
        'Có ít nhất 100.000 người theo dõi trên một nền tảng',
        'Đăng ít nhất 8 nội dung chất lượng cao mỗi tháng',
        'Đạt 500.000+ lượt xem hàng tháng',
        'Tham gia đại diện thương hiệu'
      ],
      featured: false
    },
    {
      id: 'legend',
      name: 'Huyền Thoại',
      subtitle: 'Người Sáng Tạo Huyền Thoại',
      requirement: '500.000+ người theo dõi',
      badge: '/images/badge-3.svg', // Sử dụng badge-3 tạm thời
      color: 'from-purple-500 to-purple-700',
      shadowColor: 'shadow-purple-600/40',
      buttonColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40 hover:bg-purple-500/30',
      benefits: [
        'Tất cả quyền lợi cấp Kim Cương',
        '200.000 M-Coin mỗi tháng',
        'Đồng thiết kế nội dung game',
        'Cơ hội sở hữu cổ phần (tùy thỏa thuận)',
        'Hợp đồng đại sứ thương hiệu'
      ],
      description: 'Cấp độ Huyền Thoại là đỉnh cao của chương trình. Bạn không chỉ là người sáng tạo nội dung mà còn là đối tác chiến lược của M-SCI với cơ hội đồng phát triển game.',
      requirements: [
        'Có ít nhất 500.000 người theo dõi trên một nền tảng',
        'Tạo nội dung độc quyền cho M-SCI',
        'Đạt 2.000.000+ lượt xem hàng tháng',
        'Ảnh hưởng lớn đến cộng đồng game'
      ],
      featured: false
    }
  ];

  const handleOpenPopup = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const handleClosePopup = () => {
    setSelectedLevel(null);
  };

  return (
    <>
      <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
        <div className="flex justify-center mb-8">
          <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
            <span className="text-shadow-blue relative inline-block">
              CẤP ĐỘ NHÀ SÁNG TẠO
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {levels.map((level) => (
            <div 
              key={level.id}
              className={`bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-${level.id}-500/50 transition-all shadow-lg hover:${level.shadowColor} group relative overflow-hidden`}
              onMouseEnter={() => setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(null)}
            >
              {/* Background glow effect */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl bg-gradient-to-br ${level.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Badge and Title */}
              <div className="flex flex-col items-center mb-4 relative">
                <div className="relative w-16 h-16 mb-3">
                  <Image
                    src={level.badge}
                    alt={`${level.name} Badge`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className={`text-xl font-semibold font-rajdhani tracking-wide text-center relative`}>
                  <span className={`bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                    {level.name} - {level.subtitle}
                  </span>
                </h3>
                <div className="text-white/60 text-sm mt-1 text-center">
                  {level.requirement}
                </div>
              </div>
              
              {/* Benefits */}
              <ul className="space-y-2 text-white/80 min-h-[180px]">
                {level.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-baseline gap-2">
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${level.color} flex-shrink-0 mt-1.5`}></span>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              {/* Apply button */}
              <div className={`mt-6 transition-all duration-300 ${hoveredLevel === level.id ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1'}`}>
                <button 
                  onClick={() => handleOpenPopup(level.id)}
                  className={`w-full py-2 ${level.buttonColor} rounded-md border transition-all duration-300 font-rajdhani tracking-wide font-medium`}
                >
                  Xem Chi Tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {selectedLevel && (
        <CreatorLevelPopup 
          level={levels.find(level => level.id === selectedLevel)!} 
          onClose={handleClosePopup} 
        />
      )}
    </>
  );
} 