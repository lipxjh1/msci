'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TechCommunitySection() {
  const [activeTab, setActiveTab] = useState('tech');

  const techData = [
    {
      year: '2024',
      items: [
        'Unity Engine optimization',
        'AWS cloud infrastructure',
        'Basic blockchain integration',
        'Analytics & monitoring',
        'CI/CD pipeline'
      ]
    },
    {
      year: '2025',
      items: [
        'Microservices architecture',
        'Multi-region deployment',
        'Advanced AI systems',
        'Real-time multiplayer',
        'Advanced security'
      ]
    },
    {
      year: '2026-2027',
      items: [
        'Custom game engine',
        'Distributed systems',
        'Machine learning integration',
        'Cross-platform technology',
        'Metaverse ready'
      ]
    },
    {
      year: '2028-2030',
      items: [
        'Quantum-ready infrastructure',
        'Neural interface research',
        'Advanced AR/VR systems',
        'Sustainable computing',
        'Next-gen networking'
      ]
    }
  ];

  const communityData = [
    {
      year: '2024',
      title: 'Community Growth',
      value: '50,000+ members',
      items: [
        'Discord server launch',
        'Alpha & beta tester programs',
        'Community events calendar',
        'User feedback integration',
        'Initial influencer partnerships'
      ]
    },
    {
      year: '2025',
      title: 'Community Growth',
      value: '500,000+ members',
      items: [
        'SDK & API release',
        'Developer portal launch',
        'Multi-language forums',
        'Regional community managers',
        'Content creator program'
      ]
    },
    {
      year: '2026-2027',
      title: 'Community Growth',
      value: '5M+ members',
      items: [
        'Mod support & integration',
        'Community-driven content',
        'Global player conventions',
        'Player council establishment',
        'Advanced analytics dashboard'
      ]
    },
    {
      year: '2028+',
      title: 'Community Growth',
      value: '10M+ global community',
      items: [
        'Developer fund',
        'UGC marketplace',
        'Advanced social features',
        'Cross-game integrations',
        'Community-driven governance'
      ]
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-3xl font-bold text-white mb-4 cyber-halo">
            <span className="relative inline-block">
              CÔNG NGHỆ & CỘNG ĐỒNG
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-rajdhani">
            Chúng tôi xây dựng nền tảng công nghệ tiên tiến và cộng đồng người chơi toàn cầu.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xl bg-white/10 backdrop-blur-sm">
            <button
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeTab === 'tech' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              onClick={() => setActiveTab('tech')}
            >
              Công Nghệ
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeTab === 'community' 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              onClick={() => setActiveTab('community')}
            >
              Cộng Đồng
            </button>
          </div>
        </div>

        {/* Tech Section */}
        {activeTab === 'tech' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techData.map((period, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300"
              >
                <div className="mb-4 flex items-center">
                  <div className="p-2 rounded-lg bg-blue-500/20 mr-3">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="font-orbitron text-lg font-bold text-white">{period.year}</h3>
                </div>
                
                <ul className="space-y-2">
                  {period.items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + itemIndex * 0.05 }}
                      className="flex items-start font-rajdhani text-gray-300"
                    >
                      <span className="text-blue-400 mr-2 mt-1">•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}

        {/* Community Section */}
        {activeTab === 'community' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityData.map((period, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-300"
              >
                <div className="mb-4 flex items-center">
                  <div className="p-2 rounded-lg bg-green-500/20 mr-3">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-orbitron text-lg font-bold text-white">{period.year}</h3>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-400 text-sm">{period.title}</p>
                  <p className="text-xl font-bold text-green-400">{period.value}</p>
                </div>
                
                <ul className="space-y-2">
                  {period.items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + itemIndex * 0.05 }}
                      className="flex items-start font-rajdhani text-gray-300"
                    >
                      <span className="text-green-400 mr-2 mt-1">•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tech Infrastructure Visualization - Chỉ hiển thị khi tab Tech được chọn */}
        {activeTab === 'tech' && (
          <div className="mt-16">
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="font-orbitron text-xl font-bold text-white mb-6 text-center">Kiến Trúc Hạ Tầng</h3>
              
              <div className="relative h-96 w-full">
                {/* Visualization */}
                <div className="absolute inset-0 bg-[url('/images/tech_infrastructure.jpg')] bg-cover bg-center opacity-20 rounded-lg"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20"></div>
                    <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  
                  {/* Connections */}
                  <div className="absolute top-1/4 left-1/3 w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-1/4 right-1/3 w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  
                  <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50%" y1="50%" x2="33%" y2="25%" stroke="rgba(74, 222, 128, 0.5)" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="67%" y2="75%" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="75%" y2="33%" stroke="rgba(248, 113, 113, 0.5)" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="25%" y2="67%" stroke="rgba(250, 204, 21, 0.5)" strokeWidth="1" strokeDasharray="5,5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Community Visualization - Chỉ hiển thị khi tab Community được chọn */}
        {activeTab === 'community' && (
          <div className="mt-16">
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="font-orbitron text-xl font-bold text-white mb-6 text-center">Ecosystem Tương Tác</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-lg p-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-rajdhani text-lg font-bold text-white mb-2">Người chơi</h4>
                  <ul className="text-center text-gray-300 font-rajdhani space-y-1">
                    <li>Game mobile & PC</li>
                    <li>Events & tournaments</li>
                    <li>Guild system</li>
                    <li>Rewards program</li>
                    <li>Content creation</li>
                  </ul>
                </div>
                
                <div className="bg-white/10 rounded-lg p-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h4 className="font-rajdhani text-lg font-bold text-white mb-2">Nhà phát triển</h4>
                  <ul className="text-center text-gray-300 font-rajdhani space-y-1">
                    <li>SDK & API access</li>
                    <li>Developer portal</li>
                    <li>Mod support</li>
                    <li>UGC marketplace</li>
                    <li>Developer fund</li>
                  </ul>
                </div>
                
                <div className="bg-white/10 rounded-lg p-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-rajdhani text-lg font-bold text-white mb-2">Đối tác</h4>
                  <ul className="text-center text-gray-300 font-rajdhani space-y-1">
                    <li>Influencer program</li>
                    <li>Brand collaborations</li>
                    <li>Esports organizations</li>
                    <li>Ecosystem integrations</li>
                    <li>Strategic investments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 