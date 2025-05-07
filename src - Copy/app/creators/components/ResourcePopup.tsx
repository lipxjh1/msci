'use client';

import { useEffect, useRef } from 'react';
import { FaTimes, FaDownload, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';

interface ResourceItem {
  title: string;
  description: string;
}

interface ResourceDetails {
  title: string;
  description: string;
  items: ResourceItem[];
  downloadSize: string;
  format: string;
  updateFrequency: string;
}

interface ResourceProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  buttonColor: string;
  details: ResourceDetails;
}

interface ResourcePopupProps {
  resource: ResourceProps;
  onClose: () => void;
}

export default function ResourcePopup({ resource, onClose }: ResourcePopupProps) {
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

  // Lấy màu cho từng loại tài nguyên
  const getResourceColors = (id: string) => {
    const colors: { [key: string]: { bg: string, text: string, border: string } } = {
      design: { 
        bg: 'bg-blue-500/10', 
        text: 'text-blue-400',
        border: 'border-blue-500/30'
      },
      analytics: { 
        bg: 'bg-purple-500/10', 
        text: 'text-purple-400',
        border: 'border-purple-500/30'
      },
      coding: { 
        bg: 'bg-green-500/10', 
        text: 'text-green-400',
        border: 'border-green-500/30'
      },
      content: { 
        bg: 'bg-amber-500/10', 
        text: 'text-amber-400',
        border: 'border-amber-500/30'
      }
    };
    
    return colors[id] || { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' };
  };

  const colors = getResourceColors(resource.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        ref={popupRef}
        className="w-full max-w-4xl bg-gradient-to-b from-[var(--overwatch-dark-blue)]/95 to-[var(--overwatch-black)]/95 rounded-xl border border-white/10 shadow-2xl transform transition-all duration-300 opacity-0 scale-95 overflow-hidden"
      >
        {/* Header & Close button */}
        <div className={`p-6 ${colors.bg} relative`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <FaTimes />
          </button>

          <div className="flex items-center">
            <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mr-6 flex-shrink-0`}>
              {resource.icon}
            </div>
            
            <div>
              <h2 className={`text-3xl font-bold ${colors.text} mb-1 font-rajdhani`}>
                {resource.details.title}
              </h2>
              <p className="text-white/70">{resource.details.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Item List */}
            <div className="md:col-span-2 space-y-4">
              {resource.details.items.map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-white/5 rounded-lg p-4 border border-white/10 hover:${colors.border} transition-colors group cursor-pointer`}
                >
                  <h3 className={`font-medium ${colors.text} mb-1 group-hover:text-white transition-colors`}>
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right column - Details & Download */}
            <div className="space-y-6">
              {/* Resource Details */}
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-xl text-white font-medium mb-4 pb-2 border-b border-white/10">
                  Thông Tin Chi Tiết
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <FaDownload className={`mt-1 ${colors.text} flex-shrink-0`} />
                    <div>
                      <h4 className="text-white font-medium">Kích thước tải xuống</h4>
                      <p className="text-white/70 text-sm">{resource.details.downloadSize}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <FaInfoCircle className={`mt-1 ${colors.text} flex-shrink-0`} />
                    <div>
                      <h4 className="text-white font-medium">Định dạng</h4>
                      <p className="text-white/70 text-sm">{resource.details.format}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <FaCalendarAlt className={`mt-1 ${colors.text} flex-shrink-0`} />
                    <div>
                      <h4 className="text-white font-medium">Tần suất cập nhật</h4>
                      <p className="text-white/70 text-sm">{resource.details.updateFrequency}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Download Access */}
              <div className={`bg-white/5 rounded-lg p-5 border ${colors.border}`}>
                <h3 className="text-xl text-white font-medium mb-3">
                  Truy Cập Tài Nguyên
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Tài nguyên này được cung cấp miễn phí cho tất cả các nhà sáng tạo nội dung đã đăng ký.
                </p>
                <button className={`w-full py-3 ${resource.buttonColor} rounded-md transition-all duration-300 flex items-center justify-center gap-2`}>
                  <FaDownload className="w-4 h-4" />
                  <span>Tải Xuống Ngay</span>
                </button>
              </div>
              
              {/* Support */}
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-2">Cần hỗ trợ?</h3>
                <p className="text-white/70 text-sm">
                  Nếu bạn gặp vấn đề khi sử dụng tài nguyên này, vui lòng liên hệ với đội hỗ trợ người sáng tạo nội dung của chúng tôi.
                </p>
                <button className="w-full py-2 mt-3 bg-white/10 text-white/80 hover:text-white hover:bg-white/20 rounded-md border border-white/20 transition-colors text-sm">
                  Liên Hệ Hỗ Trợ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 