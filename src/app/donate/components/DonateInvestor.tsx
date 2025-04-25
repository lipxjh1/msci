"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { FaGavel, FaHandshake, FaNetworkWired, FaChartBar } from 'react-icons/fa';
import PartnershipModal from './PartnershipModal';

// Component cho mỗi quyền lợi nhà đầu tư
function InvestorBenefitCard({ title, icon, benefits, index }: { 
  title: string; 
  icon: React.ReactNode; 
  benefits: string[];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="text-cyan-400 text-2xl mr-3">
            {icon}
          </div>
          <h3 className="font-orbitron text-white font-bold text-xl">{title}</h3>
        </div>
        
        <ul className="space-y-2">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-cyan-400 mr-2 mt-1">•</span>
              <span className="text-gray-300 text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function DonateInvestor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  
  const investorBenefits = [
    {
      title: "Dịch Vụ Tư Vấn Cao Cấp",
      icon: <FaGavel />,
      benefits: [
        "Tư vấn pháp lý từ công ty luật hàng đầu",
        "Tư vấn thuế và tối ưu hóa đầu tư",
        "Tư vấn chiến lược M&A"
      ]
    },
    {
      title: "Ưu Đãi Đầu Tư",
      icon: <FaHandshake />,
      benefits: [
        "Quyền ưu tiên trong các vòng gọi vốn sau",
        "Giá ưu đãi khi mua thêm cổ phần",
        "Bảo vệ chống pha loãng"
      ]
    },
    {
      title: "Networking Độc Quyền",
      icon: <FaNetworkWired />,
      benefits: [
        "Tham gia các sự kiện đầu tư cấp cao",
        "Kết nối với các nhà đầu tư khác",
        "Cơ hội hợp tác kinh doanh"
      ]
    },
    {
      title: "Báo Cáo Chuyên Sâu",
      icon: <FaChartBar />,
      benefits: [
        "Báo cáo tài chính chi tiết hàng tháng",
        "Phân tích thị trường và cạnh tranh",
        "Dự báo tăng trưởng và rủi ro"
      ]
    }
  ];
  
  const investorModalInfo = {
    title: "Investor Relations",
    price: "5 tỷ VNĐ+",
    benefits: [
      "Ownership stake in M-SCI",
      "Quarterly financial reports",
      "Direct access to founding team",
      "Priority investment in future rounds",
      "Board seat (for major investors)",
      "Strategic partnership opportunities",
      "Early access to new projects",
      "VIP events and networking"
    ],
    color: "bg-gradient-to-br from-blue-600 to-cyan-600"
  };

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/particle_overlay.svg')] opacity-5 z-0"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      {/* Animated lines */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute top-2/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left column - Text content */}
          <div className="lg:w-1/2">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-6">
                Quyền Lợi <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-500">Đặc Biệt</span><br />
                Dành Cho Nhà Đầu Tư Lớn
              </h2>
              
              <p className="text-gray-300 mb-8">
                Chúng tôi hiểu rằng các nhà đầu tư lớn cần được đối xử đặc biệt. M-SCI cam kết mang lại
                những quyền lợi riêng biệt, bảo vệ lợi ích và tối đa hóa tiềm năng đầu tư của bạn.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8"
              >
                <button 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105"
                  onClick={() => setModalOpen(true)}
                >
                  Liên Hệ Bộ Phận Đầu Tư
                </button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right column - Image */}
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative h-72 md:h-96 w-full"
            >
              <Image
                src="/images/home/FS-img/play_g.png"
                alt="Nhà đầu tư"
                fill
                style={{ objectFit: 'contain' }}
                className="drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]"
              />
            </motion.div>
          </div>
        </div>
        
        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {investorBenefits.map((benefit, index) => (
            <InvestorBenefitCard
              key={index}
              title={benefit.title}
              icon={benefit.icon}
              benefits={benefit.benefits}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* Investor Modal */}
      <PartnershipModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        partnershipType={investorModalInfo}
      />
    </section>
  );
} 