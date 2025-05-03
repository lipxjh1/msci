'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Tách và tái sử dụng các component con để giảm re-render
interface MilestoneProps {
  year: string;
  quarter: string;
  title: string;
  items: {
    title: string;
    tasks: string[];
  }[];
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: string;
  isActive: boolean;
  progressPercent: number;
  onClick: () => void;
}

const MilestoneTask = memo(({ task, textColor, delay }: { task: string; textColor: string; delay: number }) => (
  <motion.li 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2, delay: 0.3 + delay }}
    className="text-gray-300 flex items-start font-rajdhani text-sm md:text-base leading-relaxed"
  >
    <span className={`text-${textColor} mr-2 text-lg`}>•</span>
    <span>{task}</span>
  </motion.li>
));
MilestoneTask.displayName = 'MilestoneTask';

const MilestoneItem = memo(({ item, index, bgColor, borderColor, textColor }: { 
  item: { title: string; tasks: string[] }; 
  index: number; 
  bgColor: string; 
  borderColor: string;
  textColor: string;
}) => (
  <motion.div 
    key={index}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className={`bg-${bgColor}/10 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-${borderColor}/20 shadow-md`}
  >
    <h4 className="font-rajdhani text-xl font-bold text-white mb-3">{item.title}</h4>
    <ul className="space-y-3">
      {item.tasks.map((task, taskIndex) => (
        <MilestoneTask 
          key={taskIndex} 
          task={task} 
          textColor={textColor} 
          delay={taskIndex * 0.05} 
        />
      ))}
    </ul>
  </motion.div>
));
MilestoneItem.displayName = 'MilestoneItem';

// Component Milestone được tối ưu hóa
const Milestone = memo(({ 
  year, 
  quarter, 
  title, 
  items, 
  bgColor, 
  textColor,
  borderColor, 
  icon,
  isActive, 
  progressPercent,
  onClick 
}: MilestoneProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative mb-16 cursor-pointer transform transition-all duration-300 ${isActive ? 'scale-105 z-10' : 'hover:scale-102 z-0'}`}
      onClick={onClick}
    >
      {/* Vertical line */}
      {!isActive && (
        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-gray-500/50 to-transparent"></div>
      )}
      
      <div 
        className={`
          relative rounded-xl overflow-hidden transition-all duration-500
          ${isActive 
            ? `border border-${borderColor} shadow-xl shadow-${bgColor}/20 mb-6` 
            : 'border border-white/10 hover:border-white/20'}
        `}
      >
        {/* Background with gradient & subtle pattern */}
        <div 
          className={`
            absolute inset-0 
            ${isActive 
              ? `bg-gradient-to-br from-${bgColor}/30 to-${bgColor}/5` 
              : 'bg-white/5'}
          `}
          style={{
            backgroundImage: isActive ? `url('/images/grid_pattern.svg')` : '',
            backgroundSize: '100px',
            backgroundBlendMode: 'overlay',
            opacity: isActive ? 0.1 : 0.05
          }}
        ></div>
        
        {/* Quarter Badge */}
        <div 
          className={`
            absolute -top-4 left-5 px-4 py-1 rounded-full font-orbitron font-bold text-white text-sm
            ${isActive 
              ? `bg-${bgColor} shadow-lg shadow-${bgColor}/50` 
              : 'bg-gray-700/80 backdrop-blur-sm'}
          `}
        >
          {quarter}
        </div>
        
        {/* Year Badge */}
        <div 
          className={`
            absolute -top-4 right-5 px-4 py-1 rounded-full font-orbitron font-bold text-sm backdrop-blur-sm
            ${isActive 
              ? `bg-${textColor} text-${bgColor} shadow-lg shadow-${textColor}/30` 
              : 'bg-gray-700/80 text-white'}
          `}
        >
          {year}
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8 pt-8 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            {/* Icon */}
            <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-${bgColor}/20 p-1.5`}>
              <Image 
                src={icon} 
                alt={title} 
                width={24} 
                height={24}
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <h3 className="font-orbitron text-xl md:text-2xl font-bold text-white break-words">{title}</h3>
          </div>
          
          {/* Progress bar - always visible */}
          <div className="mt-3 mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={`font-medium ${isActive ? `text-${textColor}` : 'text-gray-400'}`}>
                {isActive ? 'Tiến độ' : 'Tiến độ hoàn thành'}
              </span>
              <span className={`font-semibold ${isActive ? `text-${textColor}` : 'text-gray-400'}`}>
                {progressPercent}%
              </span>
            </div>
            <div className="h-2 w-full bg-gray-700/50 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full rounded-full bg-gradient-to-r from-${bgColor}/80 to-${bgColor}`}
              ></motion.div>
            </div>
          </div>
          
          {isActive && (
            <div className="space-y-4 mt-6">
              {items.map((item, index) => (
                <MilestoneItem 
                  key={index}
                  item={item}
                  index={index}
                  bgColor={bgColor}
                  borderColor={borderColor}
                  textColor={textColor}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Indicator dot */}
      <div 
        className={`
          absolute left-5 top-6 w-4 h-4 rounded-full border-2 transform translate-x-0 transition-all duration-500
          ${isActive 
            ? `bg-${bgColor} border-${textColor} scale-150 shadow-lg shadow-${bgColor}/50` 
            : 'bg-gray-600 border-gray-500'}
        `}
      >
        {/* Inner pulse animation for active dot */}
        {isActive && (
          <span className={`absolute inset-0 rounded-full animate-ping bg-${bgColor}/50`}></span>
        )}
      </div>
    </motion.div>
  );
});
Milestone.displayName = 'Milestone';

// Filter Button component
const FilterButton = memo(({ 
  milestone, 
  index, 
  isActive, 
  onClick 
}: { 
  milestone: any; 
  index: number; 
  isActive: boolean; 
  onClick: () => void; 
}) => (
  <motion.button
    key={`${milestone.year}-${milestone.quarter}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive 
        ? `bg-${milestone.bgColor} text-white shadow-lg shadow-${milestone.bgColor}/30` 
        : 'bg-white/10 text-gray-300 hover:bg-white/20'
    }`}
  >
    {milestone.year} {milestone.quarter}
  </motion.button>
));
FilterButton.displayName = 'FilterButton';

export default function TimelineSection() {
  const [activeYear, setActiveYear] = useState('2024-Q1');
  const [animationComplete, setAnimationComplete] = useState(false);
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  // Data cần hiển thị
  const milestones = [
    {
      year: '2024',
      quarter: 'Q1',
      title: 'KHỞI ĐỘNG',
      bgColor: 'blue-500',
      textColor: 'cyan-200',
      borderColor: 'blue-400',
      icon: '/images/home/FS-img/hero.png',
      progressPercent: 100,
      items: [
        {
          title: 'Hình thành nền tảng',
          tasks: [
            'Thành lập core team 20+ members',
            'Hoàn thiện game design document',
            'Phát triển prototype đầu tiên',
            'Thiết kế 3 nhân vật cơ bản',
            'Xây dựng hệ thống backend scalable'
          ]
        }
      ]
    },
    {
      year: '2024',
      quarter: 'Q2',
      title: 'PHÁT TRIỂN CORE',
      bgColor: 'blue-600',
      textColor: 'cyan-200',
      borderColor: 'blue-400',
      icon: '/images/heroes/uiux 1.png',
      progressPercent: 85,
      items: [
        {
          title: 'Core Game Development',
          tasks: [
            'Phát triển 20 màn chơi đầu tiên',
            'Thiết kế thêm 6 nhân vật mới',
            'Cân bằng gameplay cơ bản',
            'Xây dựng hệ thống tiến triển',
            'Tối ưu hóa engine game'
          ]
        }
      ]
    },
    {
      year: '2024',
      quarter: 'Q3',
      title: 'ALPHA TESTING',
      bgColor: 'indigo-500',
      textColor: 'purple-200',
      borderColor: 'indigo-400',
      icon: '/images/heroes/ui 2.png',
      progressPercent: 60,
      items: [
        {
          title: 'Testing & Refinement',
          tasks: [
            'Ra mắt Closed Alpha (1,000 người chơi)',
            'Hoàn thiện 50 màn chơi campaign',
            'Phát triển hệ thống Guild cơ bản',
            'Thu thập phản hồi người dùng',
            'Sửa lỗi và cải thiện trải nghiệm'
          ]
        }
      ]
    },
    {
      year: '2024',
      quarter: 'Q4',
      title: 'SOFT LAUNCH',
      bgColor: 'indigo-600',
      textColor: 'purple-200',
      borderColor: 'indigo-400',
      icon: '/images/heroes/uiux3.png',
      progressPercent: 40,
      items: [
        {
          title: 'Initial Public Release',
          tasks: [
            'Open Beta với 10,000+ người chơi',
            'Soft launch tại Việt Nam (50,000+ downloads)',
            'Battle Pass Season 1',
            'Hệ thống monetization cơ bản',
            'Live Ops đầu tiên',
            'Triển khai server khu vực'
          ]
        }
      ]
    },
    {
      year: '2025',
      quarter: 'Q1-Q2',
      title: 'GLOBAL EXPANSION',
      bgColor: 'emerald-500',
      textColor: 'green-200',
      borderColor: 'emerald-400',
      icon: '/images/heroes/ui 5.png',
      progressPercent: 20,
      items: [
        {
          title: 'Official Launch',
          tasks: [
            'Global launch trên Android & iOS',
            'Dự kiến 500,000+ downloads',
            'Marketing campaign quốc tế',
            'Localization 5+ ngôn ngữ',
            'Chapter 2: Mars Invasion',
            '20+ nhân vật mới'
          ]
        },
        {
          title: 'Expansion Features',
          tasks: [
            'PvP Arena mode',
            'Clan Wars system',
            'Advanced matchmaking',
            'Daily & weekly missions',
            'Achievement system',
            'Seasonal events'
          ]
        }
      ]
    },
    {
      year: '2025',
      quarter: 'Q3-Q4',
      title: 'ECOSYSTEM GROWTH',
      bgColor: 'green-600',
      textColor: 'green-200',
      borderColor: 'green-400',
      icon: '/images/heroes/ui7.png',
      progressPercent: 5,
      items: [
        {
          title: 'Feature Updates',
          tasks: [
            'World Boss raids',
            'Housing system',
            'Year-end festival event',
            'Merchandise launch',
            'Creator program',
            'Community tournaments'
          ]
        },
        {
          title: 'Business Development',
          tasks: [
            'Brand partnerships',
            'Cross-promotion campaigns',
            'Ad network integration',
            'Premium subscription options',
            'Analytics refinement',
            'User retention strategies'
          ]
        }
      ]
    },
    {
      year: '2026',
      quarter: 'Q1-Q2',
      title: 'SEA DOMINATION',
      bgColor: 'amber-500',
      textColor: 'yellow-200',
      borderColor: 'amber-400',
      icon: '/images/heroes/ui8.png',
      progressPercent: 0,
      items: [
        {
          title: 'Regional Expansion',
          tasks: [
            'Launch in 5+ SEA countries',
            'Local partnerships',
            'Regional tournaments',
            'Cultural content adaptation',
            'Local payment integration',
            'Regional marketing campaigns'
          ]
        }
      ]
    },
    {
      year: '2026',
      quarter: 'Q3-Q4',
      title: 'PLATFORM EXPANSION',
      bgColor: 'amber-600',
      textColor: 'yellow-200',
      borderColor: 'amber-400',
      icon: '/images/heroes/player_game_ui 9.png',
      progressPercent: 0,
      items: [
        {
          title: 'New Platforms',
          tasks: [
            'PC version launch',
            'Console version development',
            'Cross-platform play',
            'Enhanced graphics options',
            'Controller support',
            'Cloud gaming integration'
          ]
        }
      ]
    }
  ];

  // Xử lý click vào milestone bằng useCallback để tối ưu
  const handleMilestoneClick = useCallback((milestoneId: string) => {
    if (expandedMilestone === milestoneId) {
      setExpandedMilestone(null); // Thu gọn nếu đã mở
    } else {
      setExpandedMilestone(milestoneId); // Mở rộng nếu chưa mở
    }
  }, [expandedMilestone]);

  const handleFilterClick = useCallback((milestoneId: string) => {
    setActiveYear(milestoneId);
  }, []);

  // Tìm milestone active hiện tại
  const activeMilestone = milestones.find(
    milestone => `${milestone.year}-${milestone.quarter}` === activeYear
  );

  return (
    <section className="relative mb-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold font-orbitron text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            LỘ TRÌNH PHÁT TRIỂN
          </span>
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto font-rajdhani">
          Hành trình của M-SCI được lên kế hoạch cẩn thận với các cột mốc phát triển rõ ràng. 
          Chọn mỗi giai đoạn để xem chi tiết.
        </p>
      </motion.div>

      {/* Milestone Filter Buttons */}
      <div className="flex justify-center mb-10 flex-wrap gap-2">
        {milestones.map((milestone, index) => {
          const milestoneId = `${milestone.year}-${milestone.quarter}`;
          const isActive = activeYear === milestoneId;
          
          return (
            <FilterButton
              key={milestoneId}
              milestone={milestone}
              index={index}
              isActive={isActive}
              onClick={() => handleFilterClick(milestoneId)}
            />
          );
        })}
      </div>

      {/* Display only the selected milestone instead of all */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 bg-white/5 rounded-xl border border-white/10 p-6 md:p-8 shadow-xl backdrop-blur-sm">
        {activeMilestone && (
          <Milestone
            key={activeYear}
            year={activeMilestone.year}
            quarter={activeMilestone.quarter}
            title={activeMilestone.title}
            items={activeMilestone.items}
            bgColor={activeMilestone.bgColor}
            textColor={activeMilestone.textColor}
            borderColor={activeMilestone.borderColor}
            icon={activeMilestone.icon}
            isActive={true}
            progressPercent={activeMilestone.progressPercent}
            onClick={() => handleMilestoneClick(activeYear)}
          />
        )}
      </div>

      {/* Removed hero image */}

      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-1/3 h-1/3 bg-blue-500/20 rounded-full filter blur-[150px] -z-10"></div>
      <div className="absolute bottom-20 right-0 w-1/3 h-1/3 bg-purple-500/20 rounded-full filter blur-[150px] -z-10"></div>
    </section>
  );
} 