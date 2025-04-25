'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import ScheduleModal from './ScheduleModal';

// Định nghĩa lại interface Event để phù hợp với ScheduleModal
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  host: string;
  capacity: string;
  description: string;
  type: 'online' | 'offline' | 'hybrid';
}

export default function CreatorBanner() {
  const [loaded, setLoaded] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Dữ liệu lịch định hướng
  const scheduleEvents: Event[] = [
    {
      id: '1',
      title: 'Workshop: Cách tạo video giới thiệu nhân vật M-SCI',
      date: '15/10/2023',
      time: '19:00 - 21:00',
      location: 'Discord Creator Channel',
      host: 'Minh Hùng - Creative Director',
      capacity: '50 người',
      description: 'Học cách tạo video giới thiệu nhân vật game với hiệu ứng chuyên nghiệp.',
      type: 'online'
    },
    {
      id: '2',
      title: 'Hướng dẫn sử dụng API và công cụ dữ liệu M-SCI',
      date: '22/10/2023',
      time: '19:00 - 21:00',
      location: 'Discord Creator Channel',
      host: 'Anh Tú - Lead Developer',
      capacity: '30 người',
      description: 'Khám phá cách truy xuất và sử dụng dữ liệu trò chơi thông qua API M-SCI.',
      type: 'online'
    },
    {
      id: '3',
      title: 'Offline Creator Meetup Hà Nội',
      date: '05/11/2023',
      time: '14:00 - 17:00',
      location: 'M-SCI Gaming Hub, Hà Nội',
      host: 'Team M-SCI',
      capacity: '20 người',
      description: 'Gặp gỡ trực tiếp với nhóm phát triển và các nhà sáng tạo nội dung khác.',
      type: 'offline'
    },
    {
      id: '4',
      title: 'Offline Creator Meetup TP.HCM',
      date: '12/11/2023',
      time: '14:00 - 17:00',
      location: 'M-SCI Gaming Center, TP.HCM',
      host: 'Team M-SCI',
      capacity: '20 người',
      description: 'Gặp gỡ trực tiếp với nhóm phát triển và các nhà sáng tạo nội dung khác.',
      type: 'offline'
    },
    {
      id: '5',
      title: 'Chiến lược phát triển kênh Youtube M-SCI',
      date: '20/11/2023',
      time: '19:00 - 21:00',
      location: 'Youtube Live & Discord',
      host: 'Hoàng Anh - Marketing Lead',
      capacity: 'Không giới hạn',
      description: 'Học các chiến lược tối ưu nội dung Youtube cho game M-SCI.',
      type: 'hybrid'
    },
    {
      id: '6',
      title: 'Sneak Peek: Cập nhật mùa mới M-SCI',
      date: '05/12/2023',
      time: '20:00 - 21:30',
      location: 'Discord Creator Channel',
      host: 'Tiến Anh - Game Director',
      capacity: '50 người',
      description: 'Xem trước các tính năng, nhân vật và cốt truyện mới.',
      type: 'online'
    }
  ];
  
  return (
    <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/overwatch_bg_2.jpg"
          alt="M-SCI Content Creators"
          fill
          sizes="100vw"
          priority
          className={`object-cover object-center transition-transform duration-1000 ${
            loaded ? 'scale-100 blur-0' : 'scale-110 blur-sm'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/30 via-[#041019]/50 to-[#041019]/90"></div>
      </div>
      
      {/* Animated overlay particles */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/particle_overlay.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-20">
        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="text-shadow-blue relative inline-block">
            CHƯƠNG TRÌNH NHÀ SÁNG TẠO NỘI DUNG
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h1>
        
        <div className={`max-w-xl mx-auto text-lg md:text-xl text-white/80 mb-8 transition-all duration-1000 delay-300 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Sáng Tạo - Kết Nối - Phát Triển Cùng M-SCI
        </div>
        
        <div className={`text-base md:text-lg text-white/70 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-500 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Chào mừng đến với Chương trình Nhà Sáng Tạo Nội Dung của M-SCI! Chúng tôi tin rằng những người sáng tạo nội dung là cầu nối quan trọng giữa game và cộng đồng. Hãy cùng chúng tôi xây dựng một cộng đồng game thủ sôi động và đam mê.
        </div>
        
        {/* Action Button */}
        <div className={`transition-all duration-1000 delay-700 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-lg transition-colors font-medium"
          >
            Xem Lịch Định Hướng
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-1000 delay-1000 ${
          loaded ? 'opacity-70' : 'opacity-0'
        }`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {/* Schedule Modal */}
      <Modal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Lịch Định Hướng Nhà Sáng Tạo"
        size="lg"
      >
        <ScheduleModal events={scheduleEvents} />
      </Modal>
    </div>
  );
} 