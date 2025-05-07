"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MilestoneProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

function Milestone({ year, title, description, index }: MilestoneProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex flex-col md:flex-row md:items-center gap-6 p-6"
    >
      {/* Timeline line and dot */}
      <div className="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 to-blue-600 hidden md:block"></div>
      
      {/* Year */}
      <div className="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/10 z-10">
        <span className="font-orbitron font-bold text-2xl text-white">{year}</span>
      </div>
      
      {/* Content */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 flex-grow ml-0 md:ml-6">
        <h3 className="font-orbitron font-bold text-white text-xl mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

export default function DonateVision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const milestones = [
    {
      year: "2024-2025",
      title: "Ra mắt M-SCI và đạt 1 triệu người chơi",
      description: "Chúng tôi sẽ tạo nên cú hích đầu tiên cho thị trường game Việt Nam với việc ra mắt M-SCI và đạt cột mốc 1 triệu người chơi, đặt nền móng vững chắc cho các bước phát triển tiếp theo."
    },
    {
      year: "2026",
      title: "Mở rộng sang thị trường Đông Nam Á",
      description: "Sau khi chinh phục thị trường nội địa, M-SCI sẽ vươn ra khỏi biên giới Việt Nam, tiếp cận thị trường Đông Nam Á với hơn 650 triệu dân và nền kinh tế game đang phát triển mạnh mẽ."
    },
    {
      year: "2027",
      title: "Phát triển M-SCI Universe với nhiều tựa game",
      description: "Từ nền tảng thành công của tựa game đầu tiên, chúng tôi sẽ mở rộng vũ trụ M-SCI với nhiều tựa game đa dạng thể loại, tạo nên một hệ sinh thái game Việt Nam toàn diện và sâu rộng."
    }
  ];

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/particle_overlay.png')] opacity-5 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-gray-800/50 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4">
            Tầm Nhìn <span className="text-cyan-400">Tương Lai</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            M-SCI không chỉ là một tựa game - đó là khởi đầu của một hệ sinh thái game Việt Nam mới. 
            Với sự hỗ trợ của cộng đồng và các nhà đầu tư, chúng tôi hướng đến tương lai đầy hứa hẹn:
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {milestones.map((milestone, index) => (
            <Milestone
              key={index}
              year={milestone.year}
              title={milestone.title}
              description={milestone.description}
              index={index}
            />
          ))}
        </div>
        
        {/* Vision statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md p-8 rounded-2xl max-w-3xl mx-auto border border-gray-700">
            <h3 className="font-orbitron font-bold text-2xl text-white mb-4">
              Cùng Nhau <span className="text-cyan-400">Xây Dựng Tương Lai</span>
            </h3>
            <p className="text-gray-300">
              Mỗi đóng góp của bạn, dù lớn hay nhỏ, đều là những viên gạch quan trọng trong việc xây dựng 
              nền móng vững chắc cho tương lai của game Việt Nam. Hãy đồng hành cùng chúng tôi 
              để biến tầm nhìn này thành hiện thực và đưa ngành công nghiệp game Việt Nam 
              vươn tầm thế giới.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 