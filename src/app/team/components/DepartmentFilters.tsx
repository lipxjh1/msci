import React from 'react';

interface DepartmentFiltersProps {
  selectedDepartment: string | null;
  setSelectedDepartment: (department: string | null) => void;
}

// Các bộ phận và màu sắc tương ứng
const departments = [
  { id: 'leadership', name: 'Leadership', color: '#F44336' },
  { id: 'creative', name: 'Creative Team', color: '#9C27B0' },
  { id: 'technical', name: 'Technical Team', color: '#2196F3' },
  { id: 'operations', name: 'Operations Team', color: '#4CAF50' },
  { id: 'expansion', name: 'Expansion Team', color: '#FF9800' }
];

const DepartmentFilters = ({ selectedDepartment, setSelectedDepartment }: DepartmentFiltersProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
      {departments.map((department) => (
        <div 
          key={department.id}
          className={`bg-[#1a2634]/60 backdrop-blur-md border rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform cursor-pointer group ${
            selectedDepartment === department.id 
              ? 'border-white/20 -translate-y-1' 
              : 'border-white/5 hover:-translate-y-1'
          }`}
          onClick={() => setSelectedDepartment(selectedDepartment === department.id ? null : department.id)}
        >
          <div className="p-6 text-center">
            <div 
              className={`w-16 h-16 mx-auto rounded-full mb-4 flex items-center justify-center transition-all duration-300 ${
                selectedDepartment === department.id 
                  ? 'bg-opacity-30' 
                  : 'bg-opacity-20 group-hover:bg-opacity-30'
              }`}
              style={{ 
                backgroundColor: `${department.color}30`,
                border: selectedDepartment === department.id ? `2px solid ${department.color}` : '2px solid transparent',
                boxShadow: selectedDepartment === department.id ? `0 0 15px ${department.color}50` : 'none'
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: department.color }}
                className="transition-transform duration-300 group-hover:scale-110"
              >
                {department.id === 'leadership' && (
                  <>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </>
                )}
                {department.id === 'creative' && (
                  <>
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </>
                )}
                {department.id === 'technical' && (
                  <>
                    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
                    <path d="M9 10h6" />
                    <path d="M12 7v6" />
                  </>
                )}
                {department.id === 'operations' && (
                  <>
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </>
                )}
                {department.id === 'expansion' && (
                  <>
                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                    <path d="m7.5 4.27 9 5.15" />
                    <path d="M3.29 7 12 12l8.71-5" />
                    <path d="M12 22V12" />
                    <circle cx="18.5" cy="15.5" r="2.5" />
                    <path d="M20.27 17.27 22 19" />
                  </>
                )}
              </svg>
            </div>
            
            <h3 
              className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                selectedDepartment === department.id ? 'text-white' : 'text-white/80 group-hover:text-white'
              }`}
            >
              {department.name}
            </h3>
            
            <p className="text-white/50 text-sm mb-4">
              {getDescription(department.id)}
            </p>
            
            <div 
              className="inline-block px-4 py-2 text-sm font-medium rounded-md transition-all duration-300"
              style={{ 
                backgroundColor: selectedDepartment === department.id ? `${department.color}30` : 'transparent',
                border: selectedDepartment === department.id ? `1px solid ${department.color}` : '1px solid rgba(255,255,255,0.1)',
                color: selectedDepartment === department.id ? department.color : 'rgba(255,255,255,0.7)'
              }}
            >
              {selectedDepartment === department.id ? 'Selected' : 'View members'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Hàm trả về mô tả ngắn gọn cho mỗi bộ phận
function getDescription(departmentId: string): string {
  switch (departmentId) {
    case 'leadership':
      return 'Founders and visionaries of the team';
    case 'creative':
      return 'Designers, storytellers, and creative content experts';
    case 'technical':
      return 'Developers, engineers, and technology specialists';
    case 'operations':
      return 'Community managers, support, and quality assurance';
    case 'expansion':
      return 'Market expansion and strategic partnership builders';
    default:
      return '';
  }
}

export default DepartmentFilters; 