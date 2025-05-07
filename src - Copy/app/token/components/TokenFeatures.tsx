'use client';

import { useState } from 'react';
import { FaExchangeAlt, FaVoteYea, FaCoins, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    id: 1,
    title: 'Phương Tiện Giao Dịch',
    description: '$MSCI là đơn vị tiền tệ chính cho mọi giao dịch trong game: mua bán NFT, giao dịch vật phẩm, thanh toán phí dịch vụ và đặt cược trong các trận PvP.',
    icon: <FaExchangeAlt className="h-10 w-10" />,
    color: 'from-blue-500 to-cyan-400',
    iconBg: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Quản Trị (Governance)',
    description: 'Người nắm giữ $MSCI có quyền tham gia quản trị: bỏ phiếu cho các đề xuất phát triển game, quyết định tính năng mới và tham gia DAO.',
    icon: <FaVoteYea className="h-10 w-10" />,
    color: 'from-purple-500 to-indigo-400',
    iconBg: 'bg-purple-500'
  },
  {
    id: 3,
    title: 'Staking và Thu Nhập Thụ Động',
    description: 'Token $MSCI mang lại cơ hội tạo thu nhập thụ động: Staking với APY hấp dẫn, farming trong liquidity pools và phần thưởng cho người cung cấp thanh khoản.',
    icon: <FaCoins className="h-10 w-10" />,
    color: 'from-amber-500 to-yellow-400',
    iconBg: 'bg-amber-500'
  },
  {
    id: 4,
    title: 'Truy Cập Độc Quyền',
    description: 'Sở hữu $MSCI mở ra nhiều đặc quyền: early access cho các tính năng mới, tham gia beta testing, vé vào các sự kiện VIP và quyền mua NFT giới hạn.',
    icon: <FaLock className="h-10 w-10" />,
    color: 'from-red-500 to-pink-400',
    iconBg: 'bg-red-500'
  }
];

const TokenFeatures = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="mb-20 animate-fade-in-section">
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            GIẢI PHÁP TOÀN DIỆN
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <p className="text-center font-rajdhani text-lg text-gray-300 max-w-3xl mx-auto mb-16">
        $MSCI Token là trái tim của hệ sinh thái M-SCI, cung cấp nhiều lợi ích và tiện ích cho người chơi, nhà phát triển và nhà đầu tư.
      </p>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className={`feature-card relative overflow-hidden rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 p-6 shadow-lg transition-all duration-300 ${
              hoveredFeature === feature.id ? 'transform scale-[1.02]' : ''
            }`}
            onMouseEnter={() => setHoveredFeature(feature.id)}
            onMouseLeave={() => setHoveredFeature(null)}
            variants={itemVariants}
          >
            <div
              className={`absolute top-0 left-0 w-full h-full opacity-10 ${
                hoveredFeature === feature.id ? 'opacity-20' : ''
              } transition-opacity duration-300 bg-gradient-to-br ${feature.color}`}
            ></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className={`rounded-lg p-3 ${feature.iconBg} text-white flex-shrink-0 animate-pulse-glow`}>
                {feature.icon}
              </div>
              
              <div>
                <h3 className="font-rajdhani text-xl font-bold text-white mb-2 text-shadow-sm">{feature.title}</h3>
                <p className="font-rajdhani text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-10 text-center">
        <div className="inline-block px-5 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
          <p className="font-rajdhani text-white/80 text-sm">
            <span className="text-[var(--accent-blue-bright)] font-bold">$MSCI</span> được xây dựng trên nền tảng BNB Chain theo chuẩn BEP-20
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenFeatures; 