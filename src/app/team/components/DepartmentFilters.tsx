import React from 'react';

interface DepartmentFiltersProps {
  selectedDepartment: string | null;
  setSelectedDepartment: (department: string | null) => void;
}

const departments = [
  { id: 'leadership', name: 'Ban Lãnh Đạo', color: 'var(--accent-gold)' },
  { id: 'creative', name: 'Đội Sáng Tạo', color: 'var(--accent-purple)' },
  { id: 'technical', name: 'Đội Kỹ Thuật', color: 'var(--accent-blue-bright)' },
  { id: 'operations', name: 'Đội Vận Hành', color: 'var(--accent-green)' },
  { id: 'expansion', name: 'Đội Mở Rộng', color: 'var(--accent-orange)' }
];

const DepartmentFilters = ({ selectedDepartment, setSelectedDepartment }: DepartmentFiltersProps) => {
  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
             BỘ PHẬN
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setSelectedDepartment(null)}
          className={`px-6 py-3 text-sm font-medium font-rajdhani tracking-wider transition-all duration-300 
            ${selectedDepartment === null 
            ? 'text-white border-2 border-[var(--accent-blue-bright)] shadow-lg shadow-[var(--accent-blue-glow)]/40 transform scale-105 button-cyber clip-hexagon hexagon-corner-flash bg-[var(--accent-blue-bright)]/20' 
            : 'bg-white/5 text-white/90 hover:bg-[var(--accent-blue-bright)]/10 hover:text-white hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/20 border border-white/20 hover:border-[var(--accent-blue-bright)]/70 button-cyber clip-hexagon'
          }`}
        >
          Tất Cả
        </button>
        
        {departments.map((department) => (
          <button
            key={department.id}
            onClick={() => setSelectedDepartment(department.id)}
            className={`px-6 py-3 text-sm font-medium font-rajdhani tracking-wider transition-all duration-300 
              ${selectedDepartment === department.id 
                ? `text-white border-2 border-[${department.color}] shadow-lg shadow-[${department.color}]/40 transform scale-105 button-cyber clip-hexagon hexagon-corner-flash bg-[${department.color}]/20` 
                : `bg-white/5 text-white/90 hover:bg-[${department.color}]/10 hover:text-white hover:shadow-lg hover:shadow-[${department.color}]/20 border border-white/20 hover:border-[${department.color}]/70 button-cyber clip-hexagon`
              }`}
          >
            {department.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentFilters; 