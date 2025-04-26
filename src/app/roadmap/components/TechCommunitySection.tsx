'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FeatureCard = ({ icon, title, description, gradient, delay }: { 
  icon: string;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 h-full"
    >
      <div className={`relative p-6 h-full bg-gradient-to-br ${gradient}`}>
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center p-2.5">
            <Image 
              src={icon} 
              alt={title}
              width={28}
              height={28}
              className="w-7 h-7 object-contain" 
            />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        
        <p className="text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default function TechCommunitySection() {
  const features = [
    {
      icon: '/images/heroes/ui 5.png',
      title: 'Sáng Tạo Công Nghệ',
      description: 'M-SCI tiên phong với các công nghệ hiện đại nhất, từ trí tuệ nhân tạo đến hệ thống vật lý nâng cao.',
      gradient: 'from-blue-900/10 to-blue-800/5'
    },
    {
      icon: '/images/heroes/player_0_gameplay_idle.png',
      title: 'Xây Dựng Cộng Đồng',
      description: 'Chúng tôi đặt cộng đồng người chơi làm trọng tâm, với mục tiêu tạo ra hệ sinh thái sống động xung quanh M-SCI.',
      gradient: 'from-purple-900/10 to-purple-800/5'
    },
    {
      icon: '/images/home/FS-img/free.png',
      title: 'Mô Hình Kinh Doanh',
      description: 'M-SCI hướng đến mô hình Free-to-Play công bằng, với monetization phi cưỡng chế và tập trung vào trải nghiệm người dùng.',
      gradient: 'from-amber-900/10 to-amber-800/5'
    },
    {
      icon: '/images/heroes/ui 2.png',
      title: 'Esports Ecosystem',
      description: 'M-SCI được thiết kế từ đầu để phát triển thành một tựa game esports hàng đầu khu vực Đông Nam Á và toàn cầu.',
      gradient: 'from-emerald-900/10 to-emerald-800/5'
    }
  ];

  return (
    <section className="relative backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 shadow-xl p-6">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10"></div>
        <Image
          src="/images/grid_pattern.svg"
          alt="Background Pattern"
          fill
          className="object-cover opacity-[0.03]"
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold font-orbitron text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-500">
            CỘNG ĐỒNG & CÔNG NGHỆ
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-rajdhani">
          Cộng đồng và công nghệ là hai trụ cột chính trong hành trình phát triển của M-SCI.
          Chúng tôi tập trung vào việc xây dựng mối quan hệ bền vững với người chơi và sáng
          tạo liên tục.
        </p>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            gradient={feature.gradient}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>
      
      {/* Tech Partners Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-10"
      >
        <h3 className="text-xl font-bold text-white mb-6 text-center">Đối Tác Công Nghệ</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 flex items-center justify-center h-20">
              <div className="h-12 w-full relative">
                <Image 
                  src="/images/overwatch_logo.png" 
                  alt="Tech Partner" 
                  fill
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Community Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6 text-center">Tiến Độ Phát Triển Cộng Đồng</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="inline-flex mb-2 w-16 h-16 rounded-full bg-green-500/20 items-center justify-center">
              <Image 
                src="/images/heroes/robot bc.png" 
                alt="Discord Members"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <h4 className="text-2xl font-bold text-white">10K+</h4>
            <p className="text-gray-400 text-sm">Discord Members</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex mb-2 w-16 h-16 rounded-full bg-blue-500/20 items-center justify-center">
              <Image 
                src="/images/heroes/drone 1.png" 
                alt="Twitter Followers"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <h4 className="text-2xl font-bold text-white">5K+</h4>
            <p className="text-gray-400 text-sm">Twitter Followers</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex mb-2 w-16 h-16 rounded-full bg-purple-500/20 items-center justify-center">
              <Image 
                src="/images/heroes/player_0_ui_idle.png" 
                alt="Tester Community"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <h4 className="text-2xl font-bold text-white">1K+</h4>
            <p className="text-gray-400 text-sm">Alpha Testers</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex mb-2 w-16 h-16 rounded-full bg-amber-500/20 items-center justify-center">
              <Image 
                src="/images/heroes/uiux 1.png" 
                alt="Community Feedback"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <h4 className="text-2xl font-bold text-white">300+</h4>
            <p className="text-gray-400 text-sm">Bản Cập Nhật</p>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-1/4 h-1/4 bg-emerald-500/20 rounded-full filter blur-[80px] -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-1/4 h-1/4 bg-green-500/20 rounded-full filter blur-[80px] -z-10"></div>
    </section>
  );
} 