'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import ScheduleModal from './ScheduleModal';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaUsers, FaInfoCircle, FaArrowRight } from 'react-icons/fa';

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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  
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

  const openEventDetails = (event: Event) => {
    setSelectedEvent(event);
  };

  const getFilteredEvents = () => {
    if (activeTab === 'all') return scheduleEvents;
    return scheduleEvents.filter(event => event.type === activeTab);
  };
  
  const getEventTypeColor = (type: 'online' | 'offline' | 'hybrid') => {
    switch(type) {
      case 'online':
        return 'bg-blue-500 text-blue-100';
      case 'offline':
        return 'bg-purple-500 text-purple-100';
      case 'hybrid':
        return 'bg-green-500 text-green-100';
      default:
        return 'bg-gray-500 text-gray-100';
    }
  };

  const getEventTypeName = (type: 'online' | 'offline' | 'hybrid') => {
    switch(type) {
      case 'online':
        return 'Trực tuyến';
      case 'offline':
        return 'Trực tiếp';
      case 'hybrid':
        return 'Kết hợp';
      default:
        return 'Không xác định';
    }
  };
  
  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-[#041019] to-[#05080F] overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/particle_overlay.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block">
            LỊCH ĐỊNH HƯỚNG NHÀ SÁNG TẠO
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-lg">
            Tham gia các sự kiện đào tạo, hướng dẫn và gặp gỡ cộng đồng
          </p>
        </div>
        
        {/* Filter tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'all' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('all')}
            >
              Tất cả
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'online' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('online')}
            >
              Trực tuyến
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'offline' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('offline')}
            >
              Trực tiếp
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'hybrid' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('hybrid')}
            >
              Kết hợp
            </button>
          </div>
        </div>
        
        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {getFilteredEvents().map((event) => (
            <div 
              key={event.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/20 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                    {getEventTypeName(event.type)}
                  </span>
                  <span className="text-gray-400 text-sm">{event.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-5">
                  <div className="flex items-center text-gray-400 text-sm">
                    <FaClock className="mr-2 text-blue-400" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <FaMapMarkerAlt className="mr-2 text-blue-400" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <FaUser className="mr-2 text-blue-400" />
                    {event.host}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <FaUsers className="mr-2 text-blue-400" />
                    {event.capacity}
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-5">
                  {event.description}
                </p>
                
                <button 
                  onClick={() => openEventDetails(event)}
                  className="w-full py-2 mt-2 bg-blue-500/20 text-blue-400 border border-blue-500/40 hover:bg-blue-500/30 rounded-md transition-colors flex items-center justify-center"
                >
                  <span>Chi tiết</span>
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Event detail modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
            <div 
              className="w-full max-w-2xl bg-gradient-to-b from-[#041019]/95 to-[#05080F]/95 rounded-xl border border-white/10 shadow-2xl transform transition-all duration-300 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-6 ${getEventTypeColor(selectedEvent.type)} relative`}>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                >
                  ✕
                </button>
                
                <h3 className="text-xl font-bold text-white mb-1">
                  {selectedEvent.title}
                </h3>
                <p className="text-sm opacity-80">{getEventTypeName(selectedEvent.type)} • {selectedEvent.date}</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaClock className="mr-3 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-400">Thời gian</p>
                        <p className="text-white">{selectedEvent.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-3 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-400">Địa điểm</p>
                        <p className="text-white">{selectedEvent.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaUser className="mr-3 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-400">Host</p>
                        <p className="text-white">{selectedEvent.host}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="mr-3 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-400">Số lượng</p>
                        <p className="text-white">{selectedEvent.capacity}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg mb-6">
                  <div className="flex items-start">
                    <FaInfoCircle className="mr-3 text-blue-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Mô tả</p>
                      <p className="text-white">{selectedEvent.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between gap-4">
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                  >
                    Đóng
                  </button>
                  <button 
                    className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-md transition-colors"
                  >
                    Đăng ký tham gia
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* View all button */}
        <div className="text-center mt-8">
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105 transform font-medium flex items-center mx-auto"
          >
            <FaCalendarAlt className="mr-2" />
            Xem tất cả lịch trình
          </button>
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
    </section>
  );
} 