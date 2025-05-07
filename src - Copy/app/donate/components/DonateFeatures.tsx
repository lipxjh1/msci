"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaHandHoldingHeart, FaGamepad, FaTrophy, FaUserCheck } from 'react-icons/fa';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          type: "spring",
          damping: 20,
          stiffness: 100,
          delay: delay * 0.2
        }
      });
    }
  }, [controls, isInView, delay]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
    >
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
      
      <div className="text-cyan-400 text-4xl mb-4">{icon}</div>
      
      <h3 className="text-white font-orbitron font-bold text-xl mb-3">{title}</h3>
      
      <p className="text-gray-300 text-sm md:text-base">{description}</p>
    </motion.div>
  );
}

export default function DonateFeatures() {
  const features = [
    {
      icon: <FaHandHoldingHeart />,
      title: "Hỗ Trợ Game Việt",
      description: "Đóng góp vào sự phát triển của ngành công nghiệp game Việt Nam, giúp M-SCI vươn tầm quốc tế.",
      delay: 0
    },
    {
      icon: <FaGamepad />,
      title: "Trải Nghiệm Độc Quyền",
      description: "Nhận quyền truy cập sớm vào các tính năng mới, nội dung độc quyền và sự kiện đặc biệt.",
      delay: 1
    },
    {
      icon: <FaTrophy />,
      title: "Phần Thưởng Đặc Biệt",
      description: "Từ vật phẩm in-game độc quyền đến cơ hội tham gia vào quá trình phát triển game.",
      delay: 2
    },
    {
      icon: <FaUserCheck />,
      title: "Cộng Đồng Ưu Tú",
      description: "Trở thành thành viên của cộng đồng người chơi đặc biệt với nhiều đặc quyền riêng biệt.",
      delay: 3
    }
  ];

  return (
    <section className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-[url('/images/particle_overlay.png')] opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4">
            Tại Sao Nên <span className="text-cyan-400">Ủng Hộ M-SCI</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Khi bạn ủng hộ M-SCI, bạn không chỉ đang hỗ trợ một tựa game mà còn đồng hành cùng chúng tôi
            xây dựng nền tảng vững chắc cho ngành công nghiệp game Việt Nam.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
      
      {/* Animated divider */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient"></div>
      </div>
    </section>
  );
} 