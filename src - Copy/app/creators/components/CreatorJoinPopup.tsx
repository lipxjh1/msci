'use client';

import { useEffect, useRef } from 'react';
import { FaTimes, FaCheckCircle, FaUserPlus, FaRocket, FaPencilAlt } from 'react-icons/fa';
import Image from 'next/image';

interface JoinStepType {
  id: 'register' | 'onboarding' | 'create';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  steps: string[];
}

interface CreatorJoinPopupProps {
  joinStep: JoinStepType;
  onClose: () => void;
}

export default function CreatorJoinPopup({ joinStep, onClose }: CreatorJoinPopupProps) {
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

  // Lấy màu cho các loại bước
  const getStepColor = (id: string) => {
    switch (id) {
      case 'register':
        return {
          bg: 'from-blue-700/10 to-blue-500/10',
          text: 'text-blue-400',
          border: 'border-blue-500/50',
          button: 'from-blue-600 to-blue-500',
          icon: <FaUserPlus className="text-blue-400 w-7 h-7" />
        };
      case 'onboarding':
        return {
          bg: 'from-purple-700/10 to-purple-500/10',
          text: 'text-purple-400',
          border: 'border-purple-500/50',
          button: 'from-purple-600 to-purple-500',
          icon: <FaRocket className="text-purple-400 w-7 h-7" />
        };
      case 'create':
        return {
          bg: 'from-yellow-700/10 to-yellow-500/10',
          text: 'text-yellow-400',
          border: 'border-yellow-500/50',
          button: 'from-yellow-600 to-yellow-500',
          icon: <FaPencilAlt className="text-yellow-400 w-7 h-7" />
        };
      default:
        return {
          bg: 'from-blue-700/10 to-blue-500/10',
          text: 'text-blue-400',
          border: 'border-blue-500/50',
          button: 'from-blue-600 to-blue-500',
          icon: <FaUserPlus className="text-blue-400 w-7 h-7" />
        };
    }
  };

  const stepColor = getStepColor(joinStep.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        ref={popupRef}
        className="w-full max-w-4xl bg-gradient-to-b from-[var(--overwatch-dark-blue)]/95 to-[var(--overwatch-black)]/95 rounded-xl border border-white/10 shadow-2xl transform transition-all duration-300 opacity-0 scale-95 overflow-hidden"
      >
        {/* Header & Close button */}
        <div className={`p-6 bg-gradient-to-r ${stepColor.bg} relative`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <FaTimes />
          </button>

          <div className="flex items-center">
            <div className="relative w-16 h-16 mr-6 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center">
              {stepColor.icon}
            </div>
            
            <div>
              <h2 className={`text-3xl font-bold ${stepColor.text} mb-1 font-rajdhani`}>
                {joinStep.title}
              </h2>
              <p className="text-white/70">{joinStep.subtitle}</p>
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
                  <FaRocket className="mr-2 text-lg" /> Tổng Quan
                </h3>
                <p className="text-white/80">{joinStep.description}</p>
              </div>

              {/* Steps */}
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10 flex items-center">
                  <FaCheckCircle className="mr-2 text-lg" /> Các Bước Thực Hiện
                </h3>
                <ol className="space-y-3 pl-6 list-decimal text-white/80">
                  {joinStep.steps.map((step, index) => (
                    <li key={index} className="text-white/80">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Tips */}
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10">
                  Lời Khuyên
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${stepColor.button} flex-shrink-0 mt-1.5`}></span>
                    <span className="text-white/80">Chuẩn bị kỹ lưỡng tất cả tài liệu trước khi bắt đầu.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${stepColor.button} flex-shrink-0 mt-1.5`}></span>
                    <span className="text-white/80">Đọc kỹ hướng dẫn để đảm bảo quy trình suôn sẻ.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${stepColor.button} flex-shrink-0 mt-1.5`}></span>
                    <span className="text-white/80">Thường xuyên kiểm tra email để không bỏ lỡ thông báo quan trọng.</span>
                  </li>
                </ul>
              </div>

              {/* FAQ */}
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10">
                  Câu Hỏi Thường Gặp
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-white font-medium mb-1">Mất bao lâu để được phê duyệt?</h4>
                    <p className="text-white/70 text-sm">Thông thường mất từ 3-5 ngày làm việc để đơn đăng ký của bạn được xem xét.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Tôi cần bao nhiêu người theo dõi?</h4>
                    <p className="text-white/70 text-sm">Tối thiểu 1.000 người theo dõi trên một nền tảng mạng xã hội.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Có phí tham gia không?</h4>
                    <p className="text-white/70 text-sm">Không, chương trình Nhà sáng tạo M-SCI hoàn toàn miễn phí.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-center">
            <a 
              href="/creators/register" 
              className={`px-8 py-3 bg-gradient-to-r ${stepColor.button} text-white rounded-md shadow-lg hover:brightness-110 transition-all duration-300`}
            >
              Bắt Đầu Ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 