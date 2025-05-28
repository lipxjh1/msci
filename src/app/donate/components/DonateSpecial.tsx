"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { FaClock, FaGem, FaMoneyBillWave } from 'react-icons/fa';
import PaymentModal from './PaymentModal';

interface SpecialPackageProps {
  icon: React.ReactNode;
  title: string;
  price: string;
  description: string;
  benefits: string[];
  gradient: string;
  index: number;
  onOpenModal: () => void;
}

function SpecialPackage({ icon, title, price, description, benefits, gradient, index, onOpenModal }: SpecialPackageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="relative group"
    >
      {/* Card with gradient border */}
      <div className={`absolute inset-0 ${gradient} rounded-xl opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className="relative bg-gray-800 rounded-xl p-8 border border-gray-700 h-full">
        {/* Icon and title */}
        <div className={`w-16 h-16 flex items-center justify-center ${gradient} rounded-xl mb-6 text-white text-2xl`}>
          {icon}
        </div>
        
        <h3 className="font-orbitron font-bold text-2xl text-white mb-2">{title}</h3>
        <div className="text-cyan-400 font-bold mb-4">{price}</div>
        
        <p className="text-gray-300 mb-6">{description}</p>
        
        <ul className="space-y-3 mb-6">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-cyan-400 mr-2 mt-1">•</span>
              <span className="text-gray-300 text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
        
        <button 
          className={`w-full py-3 ${gradient} text-white font-medium rounded-lg transform hover:-translate-y-1 transition-transform duration-300`}
          onClick={onOpenModal}
        >
          Liên Hệ Ngay
        </button>
      </div>
    </motion.div>
  );
}

export default function DonateSpecial() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<null | {
    id: string;
    title: string;
    price: string;
    description: string;
  }>(null);
  
  const specialPackages = [
    {
      icon: <FaClock />,
      title: "Lifetime Subscription",
      price: "19,999,000 VNĐ",
      description: "Một lần đầu tư, trọn đời hưởng lợi với mọi nội dung hiện tại và tương lai của M-SCI.",
      benefits: [
        "Mọi nội dung hiện tại và tương lai",
        "VIP status không giới hạn",
        "Legacy account có thể thừa kế",
        "Priority access mọi tính năng",
        "Lifetime support premium"
      ],
      gradient: "bg-gradient-to-r from-cyan-500 to-blue-600"
    },
    {
      icon: <FaGem />,
      title: "Collector's Edition",
      price: "29,999,000 VNĐ",
      description: "Dành cho các nhà sưu tầm muốn sở hữu những vật phẩm vật lý độc đáo của M-SCI.",
      benefits: [
        "Limited edition figurines",
        "Signed art book",
        "Metal game case",
        "Soundtrack vinyl",
        "Developer commentary",
        "Making-of documentary"
      ],
      gradient: "bg-gradient-to-r from-purple-500 to-pink-600"
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Angel Investor",
      price: "200,000,000 VNĐ+",
      description: "Gói đặc biệt cho các nhà đầu tư thiên thần muốn hỗ trợ M-SCI từ giai đoạn đầu.",
      benefits: [
        "Equity stake negotiation",
        "Board observer rights",
        "Quarterly financials",
        "Exit strategy planning",
        "Follow-on investment rights",
        "Industry networking"
      ],
      gradient: "bg-gradient-to-r from-amber-500 to-orange-600"
    }
  ];
  
  // Handle opening modal for a specific package
  const handleOpenModal = (packageIndex: number) => {
    // Convert gradient class to background gradient for modal consistency
    const packageData = specialPackages[packageIndex];
    const selectedPackage = {
      id: packageData.title.replace(/\s+/g, '-').toUpperCase(), // Tạo ID từ tiêu đề
      title: packageData.title,
      price: packageData.price,
      description: packageData.description, // Sử dụng description từ dữ liệu gói
    };
    
    setSelectedPackage(selectedPackage);
    setModalOpen(true);
  };

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/particle_overlay.svg')] opacity-5 z-0"></div>
      <div className="absolute -top-60 -right-60 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-60 -left-60 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4">
            Gói <span className="text-cyan-400">Đặc Biệt</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Những gói độc đáo dưới đây được thiết kế cho những người muốn trải nghiệm M-SCI 
            theo cách riêng biệt, từ cam kết trọn đời đến cơ hội đầu tư chiến lược.
          </p>
        </motion.div>
        
        {/* Special packages grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialPackages.map((pack, index) => (
            <SpecialPackage
              key={index}
              icon={pack.icon}
              title={pack.title}
              price={pack.price}
              description={pack.description}
              benefits={pack.benefits}
              gradient={pack.gradient}
              index={index}
              onOpenModal={() => handleOpenModal(index)}
            />
          ))}
        </div>
        
        {/* Promotional image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 relative"
        >
          <div className="relative h-60 md:h-80 rounded-xl overflow-hidden">
            <Image
              src="/images/home/FS-img/free.png"
              alt="M-SCI Special Collection"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex items-center">
              <div className="p-8">
                <h3 className="text-white font-orbitron font-bold text-2xl md:text-3xl mb-4">
                  Trở Thành <span className="text-cyan-400">VIP Member</span>
                </h3>
                <p className="text-gray-300 max-w-md">
                  Đặc quyền không giới hạn, quyền lợi độc đáo và cơ hội tham gia vào quá trình
                  phát triển game. Nâng tầm trải nghiệm của bạn với M-SCI.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Special Package Modal */}
      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </section>
  );
} 