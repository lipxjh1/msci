import Image from 'next/image';
import { TeamMember } from './data';

// Tạo bản đồ màu sắc cho từng bộ phận
const departmentColors = {
  leadership: '#F44336', // đỏ
  creative: '#9C27B0',   // tím
  technical: '#2196F3',  // xanh dương
  operations: '#4CAF50', // xanh lá
  expansion: '#FF9800'   // cam
};

// Component cho thẻ thành viên nhóm
const TeamMemberCard = ({ 
  member, 
  index, 
  onClick 
}: { 
  member: TeamMember; 
  index: number;
  onClick: () => void;
}) => {
  // Lấy màu dựa trên bộ phận
  const getColor = (dept: string): string => {
    return departmentColors[dept as keyof typeof departmentColors] || '#2196F3';
  };

  const color = getColor(member.department);
  
  const getDelay = (idx: number): string => {
    return `${(idx % 8) * 100}ms`;
  };

  return (
    <div 
      id={`team-card-${member.id}`}
      className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group animate-fadeIn cursor-pointer relative"
      style={{ 
        animationDelay: getDelay(index)
      }}
      onClick={onClick}
    >
      <div className="relative h-48">
        <Image
          src={member.image || '/images/team/placeholder.jpg'}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
        
        {/* Department badge */}
        <div className="absolute bottom-4 right-4 z-30">
          <div 
            className="p-2 px-3 backdrop-blur-sm rounded-md border"
            style={{ 
              backgroundColor: `${color}30`,
              borderColor: `${color}30`
            }}
          >
            <span 
              className="text-white font-medium text-sm"
            >
              {member.department.charAt(0).toUpperCase() + member.department.slice(1)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Member info container - chỉ hiển thị tên và chức vụ */}
      <div className="p-6">
        <h3 
          className="text-xl font-bold mb-2 group-hover:text-white transition-colors"
          style={{ color: color }}
        >
          {member.name}
        </h3>
        <p className="text-white/70">{member.title}</p>
      </div>

      {/* Hiệu ứng khi hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 pointer-events-none"></div>
      
      {/* Hiệu ứng nhấp nháy nút click */}
      <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-very-slow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default TeamMemberCard; 