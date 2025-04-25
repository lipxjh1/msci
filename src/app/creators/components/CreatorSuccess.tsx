'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { FaTrophy, FaUserAlt, FaPalette } from 'react-icons/fa';

export default function CreatorSuccess() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Dữ liệu của các nhà sáng tạo thành công
  const successStories = [
    {
      id: 1,
      name: '"Thầy Game"',
      followers: '500K người theo dõi',
      avatar: '/images/like.jpg',
      achievements: [
        'Kiếm được 5 triệu+ M-Coin',
        'Tạo series hướng dẫn chính thức',
        'Hiện là người sáng tạo toàn thời gian'
      ],
      icon: <FaUserAlt className="w-5 h-5 text-blue-400" />,
      color: 'blue'
    },
    {
      id: 2,
      name: '"Cao Thủ MSCI"',
      followers: '200K người theo dõi',
      avatar: '/images/new.jpg',
      achievements: [
        'Nội dung chiến thuật hàng đầu',
        'Tổ chức giải đấu cộng đồng',
        'Đại sứ thương hiệu'
      ],
      icon: <FaTrophy className="w-5 h-5 text-purple-400" />,
      color: 'purple'
    },
    {
      id: 3,
      name: '"Nghệ Thuật MSCI"',
      followers: '100K người theo dõi',
      avatar: '/images/free.jpg',
      achievements: [
        'Vẽ tranh và làm hoạt hình',
        'Thiết kế trang phục trong game',
        'Tác phẩm được đưa vào game'
      ],
      icon: <FaPalette className="w-5 h-5 text-pink-400" />,
      color: 'pink'
    }
  ];

  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-8">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CÂU CHUYỆN THÀNH CÔNG
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <p className="text-white/80 text-center max-w-3xl mx-auto mb-8">
        Những người sáng tạo nội dung hàng đầu đã thành công trong chương trình của chúng tôi. Họ không chỉ xây dựng cộng đồng người hâm mộ lớn mạnh mà còn phát triển sự nghiệp và thu nhập từ niềm đam mê.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={cardRef}>
        {successStories.map((creator) => (
          <div 
            key={creator.id}
            className={`bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-${creator.color}-500/50 transition-all shadow-lg hover:shadow-${creator.color}-500/20 group relative overflow-hidden`}
          >
            {/* Background glow effect */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl bg-${creator.color}-500/5 group-hover:bg-${creator.color}-500/10 transition-opacity duration-500`}></div>
            
            {/* Creator Avatar & Info */}
            <div className="flex flex-col items-center mb-6 relative z-10">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-white/20 group-hover:border-white/40 transition-all relative">
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl text-white font-semibold font-rajdhani tracking-wide text-center">
                {creator.name}
              </h3>
              <div className="text-white/60 text-sm mt-1 flex items-center gap-2">
                <span className={`inline-block p-1 bg-${creator.color}-500/20 rounded-full`}>
                  {creator.icon}
                </span>
                <span>{creator.followers}</span>
              </div>
            </div>
            
            {/* Achievements */}
            <div className="relative z-10">
              <h4 className={`text-${creator.color}-400 font-medium mb-3 border-b border-${creator.color}-500/20 pb-2`}>
                Thành tựu:
              </h4>
              <ul className="space-y-2">
                {creator.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full bg-${creator.color}-400 flex-shrink-0 mt-1.5`}></span>
                    <span className="text-white/80">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Quote */}
            <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
              <p className="text-white/60 text-sm italic">
                "M-SCI đã giúp tôi biến đam mê thành sự nghiệp thật sự. Cảm ơn cộng đồng tuyệt vời!"
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <button className="px-8 py-3 bg-gradient-to-r from-[var(--accent-blue-bright)]/20 to-purple-500/20 text-white rounded-md border border-[var(--accent-blue-bright)]/40 hover:bg-[var(--accent-blue-bright)]/30 transition-colors font-rajdhani tracking-wide">
          Xem Thêm Câu Chuyện Thành Công
        </button>
      </div>
    </div>
  );
} 