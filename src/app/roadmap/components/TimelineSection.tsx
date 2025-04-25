'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface MilestoneProps {
  year: string;
  title: string;
  items: {
    title: string;
    tasks: string[];
  }[];
  bgColor: string;
  borderColor: string;
  isActive: boolean;
  onClick: () => void;
}

const Milestone = ({ year, title, items, bgColor, borderColor, isActive, onClick }: MilestoneProps) => {
  return (
    <div 
      className={`relative mb-12 cursor-pointer transform transition-all duration-300 ${isActive ? 'scale-105' : 'hover:scale-102'}`}
      onClick={onClick}
    >
      {/* Vertical line */}
      {!isActive && (
        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-gray-500/50 to-transparent"></div>
      )}
      
      <div 
        className={`
          relative rounded-xl overflow-hidden transition-all duration-300
          ${isActive 
            ? `border-2 border-${borderColor} shadow-lg shadow-${borderColor}/30 mb-6` 
            : 'border border-white/10'}
        `}
      >
        {/* Background with gradient */}
        <div 
          className={`
            absolute inset-0 
            ${isActive 
              ? `bg-gradient-to-br from-${bgColor}/20 to-${bgColor}/5` 
              : 'bg-white/5'}
          `}
        ></div>
        
        {/* Year Badge */}
        <div 
          className={`
            absolute -top-4 left-5 px-4 py-1 rounded-full font-orbitron font-bold text-white text-sm
            ${isActive 
              ? `bg-${bgColor} shadow-md shadow-${bgColor}/50` 
              : 'bg-gray-700'}
          `}
        >
          {year}
        </div>
        
        {/* Content */}
        <div className="p-6 pt-8 relative z-10">
          <h3 className="font-orbitron text-xl font-bold text-white mb-3">{title}</h3>
          
          {isActive && (
            <div className="space-y-4 mt-6">
              {items.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                >
                  <h4 className="font-rajdhani text-lg font-bold text-white mb-2">{item.title}</h4>
                  <ul className="space-y-1">
                    {item.tasks.map((task, taskIndex) => (
                      <motion.li 
                        key={taskIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 + taskIndex * 0.05 }}
                        className="text-gray-300 flex items-start font-rajdhani"
                      >
                        <span className={`text-${borderColor} mr-2 text-lg`}>•</span>
                        <span>{task}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Indicator dot */}
      <div 
        className={`
          absolute left-5 top-6 w-3 h-3 rounded-full border transform translate-x-[0.5px] transition-all
          ${isActive 
            ? `bg-${bgColor} border-${borderColor} scale-150` 
            : 'bg-gray-600 border-gray-500'}
        `}
      ></div>
    </div>
  );
};

export default function TimelineSection() {
  const [activeYear, setActiveYear] = useState('2024');
  
  // Data cần hiển thị
  const milestones = [
    {
      year: '2024',
      title: 'KHỞI ĐỘNG & PHÁT TRIỂN',
      bgColor: 'blue-500',
      borderColor: 'blue-400',
      items: [
        {
          title: 'Q1-Q2 2024: Foundation Phase',
          tasks: [
            'Thành lập core team 20+ members',
            'Hoàn thiện game design document',
            'Phát triển prototype đầu tiên',
            'Phát triển 20 màn chơi đầu tiên',
            'Thiết kế 9 nhân vật cơ bản (3 class x 3 độ hiếm)',
            'Xây dựng hệ thống backend scalable'
          ]
        },
        {
          title: 'Q3-Q4 2024: Alpha & Soft Launch',
          tasks: [
            'Ra mắt Closed Alpha (1,000 người chơi)',
            'Hoàn thiện 50-100 màn chơi campaign',
            'Phát triển hệ thống Guild cơ bản',
            'Open Beta với 10,000+ người chơi',
            'Soft launch tại Việt Nam (50,000+ downloads)',
            'Battle Pass Season 1'
          ]
        }
      ]
    },
    {
      year: '2025',
      title: 'GLOBAL EXPANSION',
      bgColor: 'green-500',
      borderColor: 'green-400',
      items: [
        {
          title: 'Q1-Q2 2025: Official Launch',
          tasks: [
            'Global launch trên Android & iOS',
            'Đạt 500,000+ downloads',
            'Marketing campaign quốc tế',
            'Localization 5+ ngôn ngữ',
            'Chapter 2: Mars Invasion',
            '20+ nhân vật mới'
          ]
        },
        {
          title: 'Q3-Q4 2025: Feature Updates',
          tasks: [
            'PvP Arena mode',
            'World Boss raids',
            'Housing system',
            'Year-end festival event',
            'Merchandise launch',
            'Đạt 1 triệu active users'
          ]
        }
      ]
    },
    {
      year: '2026',
      title: 'SOUTHEAST ASIA DOMINATION',
      bgColor: 'purple-500',
      borderColor: 'purple-400',
      items: [
        {
          title: 'Q1-Q2 2026: Regional Expansion',
          tasks: [
            'Launch in 5+ SEA countries',
            'Local partnerships',
            'Regional tournaments',
            'Cultural content adaptation',
            'Local payment integration',
            'Regional marketing campaigns'
          ]
        },
        {
          title: 'Q3-Q4 2026: Platform Expansion',
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
    },
    {
      year: '2027',
      title: 'M-SCI UNIVERSE',
      bgColor: 'yellow-500',
      borderColor: 'yellow-400',
      items: [
        {
          title: 'Q1-Q2 2027: Franchise Development',
          tasks: [
            'M-SCI 2 announcement',
            'Spin-off games development',
            'Animated series production',
            'Comic/manga launch',
            'Novel series',
            'Expanded universe lore'
          ]
        },
        {
          title: 'Q3-Q4 2027: Technology Innovation',
          tasks: [
            'VR/AR integration',
            'AI-powered content',
            'Blockchain gaming 2.0',
            'Metaverse integration',
            'User-generated content',
            'Advanced social features'
          ]
        }
      ]
    },
    {
      year: '2028',
      title: 'GLOBAL LEADERSHIP',
      bgColor: 'red-500',
      borderColor: 'red-400',
      items: [
        {
          title: 'Q1-Q2 2028: Market Consolidation',
          tasks: [
            'Top 10 mobile game globally',
            '10M+ active users',
            'Major studio acquisitions',
            'Technology licensing',
            'Global esports circuit',
            'Educational partnerships'
          ]
        },
        {
          title: 'Q3-Q4 2028: Business Expansion',
          tasks: [
            'IPO preparation',
            'M&A opportunities',
            'Gaming platform launch',
            'Developer ecosystem',
            'Investment fund creation',
            'Industry standard setting'
          ]
        }
      ]
    },
    {
      year: '2029-2030',
      title: 'LEGACY BUILDING',
      bgColor: 'cyan-500',
      borderColor: 'cyan-400',
      items: [
        {
          title: '2029: Cultural Impact',
          tasks: [
            'Theme park development',
            'Movie adaptation',
            'Global brand recognition',
            'Educational programs',
            'Social impact initiatives',
            'Industry leadership'
          ]
        },
        {
          title: '2030: Future Vision',
          tasks: [
            'Next-gen gaming pioneer',
            '50M+ global users',
            'Multi-platform dominance',
            'Cultural phenomenon status',
            'Technology innovation leader',
            'Sustainable gaming ecosystem'
          ]
        }
      ]
    }
  ];

  return (
    <div className="py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="font-orbitron text-3xl font-bold text-white mb-4 cyber-halo">
          <span className="relative inline-block">
            LỘ TRÌNH PHÁT TRIỂN
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-rajdhani">
          Từ game Việt đến hiện tượng toàn cầu, đây là hành trình M-SCI sẽ đi qua từ 2024 đến 2030.
        </p>
      </div>
      
      {/* Timeline */}
      <div className="max-w-4xl mx-auto pl-12 pr-4 relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-6 bottom-0 w-0.5 bg-gradient-to-b from-gray-500 to-transparent"></div>
        
        {milestones.map((milestone, index) => (
          <Milestone
            key={index}
            year={milestone.year}
            title={milestone.title}
            items={milestone.items}
            bgColor={milestone.bgColor}
            borderColor={milestone.borderColor}
            isActive={activeYear === milestone.year}
            onClick={() => setActiveYear(milestone.year)}
          />
        ))}
      </div>
    </div>
  );
} 