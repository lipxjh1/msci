"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaHandshake, FaChartLine, FaGlobe, FaBuilding, FaLightbulb } from 'react-icons/fa';
import PartnershipModal from './PartnershipModal';

interface PartnershipCardProps {
  title: string;
  price: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
  color: string;
  index: number;
  onOpenModal: () => void;
}

function PartnershipCard({ title, price, icon, description, benefits, color, index, onOpenModal }: PartnershipCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl group relative"
    >
      {/* Glowing border on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 rounded-xl ${color} opacity-20 blur-sm`}></div>
      </div>
      
      {/* Content container */}
      <div className="relative p-8">
        {/* Icon and title */}
        <div className="flex items-center mb-6">
          <div className={`text-3xl mr-4 ${color.replace('bg-gradient-to-br', 'text').split(' ')[1]}`}>{icon}</div>
          <div>
            <h3 className="font-orbitron font-bold text-white text-2xl">{title}</h3>
            <div className="text-cyan-400 font-medium mt-1">{price}</div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 mb-6">{description}</p>
        
        {/* Benefits */}
        <h4 className="font-orbitron font-bold text-white mb-3">Quyền lợi:</h4>
        <ul className="space-y-2 mb-6">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start">
              <span className={`mr-2 mt-1 ${color.replace('bg-gradient-to-br', 'text').split(' ')[1]}`}>•</span>
              <span className="text-gray-300 text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
        
        {/* Button */}
        <button 
          className={`w-full py-3 rounded-lg font-medium text-white ${color} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
          onClick={onOpenModal}
        >
          Liên Hệ Đối Tác
        </button>
      </div>
    </motion.div>
  );
}

export default function DonatePartnership() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPartnership, setSelectedPartnership] = useState<null | {
    title: string;
    price: string;
    benefits: string[];
    color: string;
  }>(null);
  
  // Uncomment the following code to automatically open modal on page load (for testing only)
  /*
  useEffect(() => {
    // Automatically open modal after 1.5 seconds for testing
    const timer = setTimeout(() => {
      handleOpenModal(0); // Open the first partnership modal
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  */
  
  const partnerships = [
    {
      title: "Brand Integration",
      price: "100,000,000 VNĐ+",
      icon: <FaBuilding />,
      description: "Gói này dành cho các doanh nghiệp muốn tích hợp thương hiệu vào M-SCI một cách tự nhiên và hiệu quả.",
      benefits: [
        "Tích hợp sâu vào gameplay",
        "Events và tournaments độc quyền",
        "Co-branded merchandise",
        "Marketing campaigns tích hợp",
        "Product placement thông minh"
      ],
      color: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      title: "Strategic Partner",
      price: "500,000,000 VNĐ+",
      icon: <FaHandshake />,
      description: "Dành cho các tập đoàn muốn trở thành đối tác chiến lược lâu dài của M-SCI.",
      benefits: [
        "Joint venture opportunities",
        "Revenue sharing models",
        "Market exclusivity",
        "Technology exchange",
        "Co-development rights",
        "Board representation"
      ],
      color: "bg-gradient-to-br from-purple-500 to-indigo-600"
    },
    {
      title: "Global Publisher",
      price: "Thỏa thuận đặc biệt",
      icon: <FaGlobe />,
      description: "Gói đặc biệt cho các nhà phát hành quốc tế muốn đưa M-SCI đến với game thủ toàn cầu.",
      benefits: [
        "Regional publishing rights",
        "Localization partnership",
        "Distribution networks",
        "Marketing collaboration",
        "Revenue sharing tiers",
        "Expansion co-development"
      ],
      color: "bg-gradient-to-br from-amber-500 to-orange-600"
    }
  ];
  
  // Handle opening modal for a specific partnership
  const handleOpenModal = (partnershipIndex: number) => {
    setSelectedPartnership(partnerships[partnershipIndex]);
    setModalOpen(true);
  };

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/particle_overlay.svg')] opacity-5 z-0"></div>
      <div className="absolute -right-40 -top-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center p-3 bg-gray-800/90 backdrop-blur-sm rounded-xl text-cyan-400 text-4xl w-16 h-16 mx-auto">
              <FaLightbulb />
            </div>
          </div>
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4">
            Gói <span className="text-cyan-400">Doanh Nghiệp & Đối Tác</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Những gói đặc biệt này được thiết kế cho các doanh nghiệp và đối tác muốn đồng hành cùng M-SCI,
            tận dụng cơ hội marketing và phát triển kinh doanh độc đáo trong ngành công nghiệp game.
          </p>
        </motion.div>
        
        {/* Partnership cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnerships.map((partnership, index) => (
            <PartnershipCard
              key={index}
              title={partnership.title}
              price={partnership.price}
              icon={partnership.icon}
              description={partnership.description}
              benefits={partnership.benefits}
              color={partnership.color}
              index={index}
              onOpenModal={() => handleOpenModal(index)}
            />
          ))}
        </div>
        
        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            <span className="text-white font-semibold">Lưu ý:</span> Các gói đối tác có thể được tùy chỉnh theo nhu cầu cụ thể của doanh nghiệp.
            Vui lòng liên hệ đội ngũ phát triển kinh doanh của chúng tôi để được tư vấn chi tiết.
          </p>
        </motion.div>
      </div>
      
      {/* Partnership Modal */}
      <PartnershipModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        partnershipType={selectedPartnership}
      />
    </section>
  );
} 