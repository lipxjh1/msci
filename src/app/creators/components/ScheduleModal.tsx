'use client';

import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';

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

interface ScheduleModalProps {
  events: Event[];
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ events }) => {
  // Nhóm sự kiện theo tháng
  const groupedEvents = events.reduce((acc: Record<string, Event[]>, event) => {
    const month = new Date(event.date).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {});

  // State để quản lý form đăng ký
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    socialLink: '',
    experience: '',
    reason: ''
  });

  // Xử lý mở form đăng ký
  const handleOpenRegistration = (event: Event) => {
    setSelectedEvent(event);
    setShowRegistrationForm(true);
  };

  // Xử lý đóng form đăng ký
  const handleCloseRegistration = () => {
    setShowRegistrationForm(false);
    setSelectedEvent(null);
  };

  // Xử lý thay đổi input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Xử lý gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý logic gửi form đăng ký ở đây
    console.log('Form submitted:', { event: selectedEvent, formData });
    
    // Đóng form sau khi gửi
    alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
    handleCloseRegistration();
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      socialLink: '',
      experience: '',
      reason: ''
    });
  };

  return (
    <div className="text-white">
      <p className="text-white/80 mb-6">
        Tham gia cộng đồng người sáng tạo nội dung và chia sẻ niềm đam mê của bạn với cộng đồng. Ấn vào để ra bảng định hướng.
      </p>
      
      <div className="space-y-8">
        {Object.entries(groupedEvents).map(([month, monthEvents]) => (
          <div key={month} className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-400 pb-2 border-b border-white/10">
              {month}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {monthEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-blue-400/30 transition-all hover:shadow-blue-400/10 shadow-lg"
                >
                  <h4 className="text-lg font-medium text-white mb-2">{event.title}</h4>
                  
                  <div className="space-y-2 text-white/70 text-sm">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-400 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaClock className="text-blue-400 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-400 flex-shrink-0" />
                      <span>{event.location}</span>
                      <span className={`ml-2 text-xs py-0.5 px-2 rounded-full ${
                        event.type === 'online' 
                          ? 'bg-green-500/20 text-green-400' 
                          : event.type === 'offline' 
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {event.type === 'online' ? 'Trực tuyến' : event.type === 'offline' ? 'Trực tiếp' : 'Kết hợp'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaChalkboardTeacher className="text-blue-400 flex-shrink-0" />
                      <span>{event.host}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-blue-400 flex-shrink-0" />
                      <span>{event.capacity}</span>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-white/80 text-sm">{event.description}</p>
                  
                  <div className="mt-4">
                    <button 
                      onClick={() => handleOpenRegistration(event)}
                      className="w-full py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/40 rounded transition-colors">
                      Lịch Định Hướng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Form đăng ký modal */}
      {showRegistrationForm && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#041019] border border-white/10 rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar animate-modalFadeIn">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Đăng Ký Tham Gia</h3>
              <button 
                onClick={handleCloseRegistration}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-blue-400">{selectedEvent.title}</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-white/70">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-blue-400 flex-shrink-0" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-blue-400 flex-shrink-0" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-blue-400 flex-shrink-0" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-white/80 text-sm mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white/80 text-sm mb-1">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-white/80 text-sm mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="socialLink" className="block text-white/80 text-sm mb-1">Liên kết mạng xã hội</label>
                  <input
                    type="url"
                    id="socialLink"
                    name="socialLink"
                    value={formData.socialLink}
                    onChange={handleInputChange}
                    placeholder="Facebook, Youtube, ..."
                    className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-white/80 text-sm mb-1">Kinh nghiệm sáng tạo nội dung <span className="text-red-500">*</span></label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-blue-400 focus:outline-none"
                >
                  <option value="" className="text-black">Chọn mức độ kinh nghiệm</option>
                  <option value="beginner" className="text-black">Mới bắt đầu (dưới 1 năm)</option>
                  <option value="intermediate" className="text-black">Đã có kinh nghiệm (1-3 năm)</option>
                  <option value="advanced" className="text-black">Có nhiều kinh nghiệm (trên 3 năm)</option>
                </select>
              </div>

              <div>
                <label htmlFor="reason" className="block text-white/80 text-sm mb-1">Lý do bạn muốn tham gia <span className="text-red-500">*</span></label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div className="text-sm text-white/60">
                <p>Các trường đánh dấu <span className="text-red-500">*</span> là bắt buộc</p>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCloseRegistration}
                  className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Xác Nhận Đăng Ký
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleModal; 