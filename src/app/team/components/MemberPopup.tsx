import { TeamMember } from "../data";
import Image from "next/image";
import { useEffect, useRef } from "react";

// Tạo bản đồ màu sắc cho từng bộ phận
const departmentColors = {
  leadership: '#F44336', // đỏ
  creative: '#9C27B0',   // tím
  technical: '#2196F3',  // xanh dương
  operations: '#4CAF50', // xanh lá
  expansion: '#FF9800'   // cam
};

interface MemberPopupProps {
  member: TeamMember | null;
  onClose: () => void;
}

const MemberPopup = ({ member, onClose }: MemberPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Xử lý click bên ngoài popup để đóng
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Thêm sự kiện khi mở popup
    document.addEventListener("mousedown", handleClickOutside);
    // Disable scroll trên body
    document.body.style.overflow = "hidden";

    // Xóa sự kiện khi đóng popup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Bật lại scroll trên body
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  // Nếu không có member thì không hiển thị gì
  if (!member) return null;

  // Lấy màu dựa trên bộ phận
  const color = departmentColors[member.department as keyof typeof departmentColors] || '#2196F3';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        ref={popupRef}
        className="bg-[#0a141e] border border-white/10 rounded-xl overflow-hidden max-w-2xl w-full max-h-[90vh] shadow-2xl animate-scale-up relative"
      >
        {/* Nút đóng */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/20 backdrop-blur-sm p-2 rounded-full hover:bg-black/40 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Hình ảnh thành viên */}
          <div className="w-full md:w-2/5 relative h-72 md:h-auto">
            <Image
              src={member.image || '/images/team/placeholder.jpg'}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a141e] to-transparent md:bg-gradient-to-r"></div>
          </div>

          {/* Thông tin chi tiết */}
          <div className="w-full md:w-3/5 p-6 max-h-[70vh] md:max-h-[80vh] overflow-y-auto">
            {/* Badge bộ phận */}
            <div 
              className="inline-block px-3 py-1 rounded-md text-white text-sm font-medium mb-4"
              style={{ backgroundColor: `${color}30`, borderLeft: `3px solid ${color}` }}
            >
              {member.department.charAt(0).toUpperCase() + member.department.slice(1)}
            </div>

            <h2 className="text-3xl font-bold mb-1" style={{ color }}>
              {member.name}
            </h2>
            <p className="text-white/70 text-xl mb-6">{member.title}</p>

            {/* Achievements */}
            <div className="mb-6">
              <h3 className="text-white text-lg font-semibold mb-3">Achievements</h3>
              <ul className="space-y-3">
                {member.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div 
                      className="h-2 w-2 rounded-full mt-2" 
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-white/80">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote */}
            <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm">
              <blockquote className="italic text-white/80 text-lg">
                "{member.quote}"
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPopup; 