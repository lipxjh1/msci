import Image from 'next/image';
import { TeamMember } from './data';

// Component for team member card
const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  // Determine color based on department
  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case 'leadership':
        return 'var(--accent-gold)';
      case 'creative':
        return 'var(--accent-purple)';
      case 'technical':
        return 'var(--accent-blue-bright)';
      case 'operations':
        return 'var(--accent-green)';
      case 'expansion':
        return 'var(--accent-orange)';
      default:
        return 'var(--accent-blue-bright)';
    }
  };

  const departmentColor = getDepartmentColor(member.department);

  return (
    <div 
      className="relative h-full rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform-gpu hover:shadow-xl animate-fadeIn card-neon"
      style={{ 
        animationDelay: `${index * 50}ms`
      }}
    >
      {/* Member Image */}
      <div className="relative h-60 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
        <Image
          src={member.image || '/images/team/placeholder.jpg'}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Department badge - top right corner */}
        <div className="absolute top-3 right-3 z-30">
          <div 
            className="px-3 py-1 rounded-full text-sm font-medium font-rajdhani flex items-center gap-1.5 backdrop-blur-sm button-cyber"
            style={{ 
              backgroundColor: `${departmentColor}30`,
              borderRight: `3px solid ${departmentColor}`
            }}
          >
            <span 
              className="inline-block h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: departmentColor }}
            ></span>
            <span className="text-white">{member.department.charAt(0).toUpperCase() + member.department.slice(1)}</span>
          </div>
        </div>
      </div>
      
      {/* Member info container */}
      <div className="p-5 bg-gradient-to-b from-[#041019] to-[#071b29] h-[calc(100%-15rem)]">
        <h3 className="font-rajdhani text-xl font-bold text-white tracking-wide mb-1 text-shadow-blue">{member.name}</h3>
        <p className="font-rajdhani text-sm text-[var(--accent-blue-bright)] mb-4">{member.title}</p>
        
        {/* Achievements */}
        <ul className="space-y-2 mb-4 text-white/80 text-sm">
          {member.achievements.map((achievement, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="inline-block h-2 w-2 rounded-full mt-1.5" style={{ backgroundColor: departmentColor }}></span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
        
        {/* Quote */}
        <div className="border-l-2 pl-3 italic text-sm text-white/70 mt-auto" style={{ borderColor: departmentColor }}>
          "{member.quote}"
        </div>
      </div>
      
      {/* Corner decoration - top left */}
      <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-16 h-16 -translate-x-8 -translate-y-8 rotate-45 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ 
            background: `linear-gradient(135deg, ${departmentColor}, transparent)`
          }}
        ></div>
      </div>
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ 
          boxShadow: `inset 0 0 20px 5px ${departmentColor}40`
        }}
      ></div>
    </div>
  );
};

export default TeamMemberCard; 