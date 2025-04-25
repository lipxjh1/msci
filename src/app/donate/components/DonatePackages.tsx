"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaStar, FaCrown, FaShieldAlt, FaGem, FaMedal, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import PaymentModal from './PaymentModal';

// Định nghĩa interface cho gói donate
interface DonatePackage {
  id: string;
  title: string;
  price: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  color: string;
  recommended?: boolean;
  popular?: boolean;
}

// Component cho card gói donate
function PackageCard({ 
  pack, 
  isSelected, 
  onSelect,
  onOpenPayment,
  delay 
}: { 
  pack: DonatePackage; 
  isSelected: boolean; 
  onSelect: () => void;
  onOpenPayment: () => void;
  delay: number;
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          type: "spring",
          damping: 25,
          stiffness: 100,
          delay: delay * 0.15
        }
      });
    }
  }, [controls, isInView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className={`relative rounded-xl overflow-hidden ${isSelected ? 'scale-105 z-10' : 'scale-100 z-0'} transition-all duration-300`}
      onClick={onSelect}
    >
      {/* Gradient Border */}
      <div className={`absolute inset-0 p-0.5 rounded-xl ${isSelected ? `bg-gradient-to-br ${pack.color}` : 'bg-gray-700'}`}>
        <div className="absolute inset-0 rounded-xl bg-gray-800"></div>
      </div>
      
      {/* Badge */}
      {pack.recommended && (
        <div className="absolute -top-1 -right-1 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 blur-sm"></div>
            <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xs px-2 py-1 rounded font-bold">
              ĐỀ XUẤT
            </div>
          </div>
        </div>
      )}
      
      {pack.popular && (
        <div className="absolute -top-1 -right-1 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 blur-sm"></div>
            <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 text-white text-xs px-2 py-1 rounded font-bold">
              PHỔ BIẾN
            </div>
          </div>
        </div>
      )}
      
      <div className="relative p-6 flex flex-col h-full">
        {/* Icon và Title */}
        <div className="flex items-center mb-4">
          <div className={`text-2xl mr-3 ${isSelected ? pack.color.replace('from-', 'text-').split(' ')[0] : 'text-gray-400'}`}>
            {pack.icon}
          </div>
          <h3 className="font-orbitron font-bold text-white text-xl">{pack.title}</h3>
        </div>
        
        {/* Price */}
        <div className="mb-4">
          <div className={`text-2xl font-bold ${isSelected ? pack.color.replace('from-', 'text-').split(' ')[0] : 'text-white'}`}>
            {pack.price}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 text-sm mb-6">{pack.description}</p>
        
        {/* Features list */}
        <ul className="space-y-2 mb-6 flex-grow">
          {pack.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <span className={`mr-2 mt-1 ${isSelected ? pack.color.replace('from-', 'text-').split(' ')[0] : 'text-cyan-400'}`}>
                <FaStar className="h-4 w-4" />
              </span>
              <span className="text-gray-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenPayment();
          }}
          className={`w-full py-3 rounded-lg font-medium text-white ${
            isSelected 
              ? `bg-gradient-to-r ${pack.color} shadow-lg`
              : 'bg-gray-700 hover:bg-gray-600'
          } transition-all duration-300`}
        >
          Chọn Gói
        </button>
      </div>
    </motion.div>
  );
}

export default function DonatePackages() {
  // Danh sách các gói donate
  const packages: DonatePackage[] = [
    {
      id: "basic",
      title: "Supporter Pack",
      price: "99,000 VNĐ",
      icon: <FaUser />,
      description: "Gói dành cho những người muốn bắt đầu hành trình cùng M-SCI.",
      features: [
        "Huy hiệu \"Early Supporter\"",
        "1,000 M-Coin",
        "Tên trong \"Bảng Vàng Tri Ân\"",
      ],
      color: "from-blue-400 to-cyan-500",
      popular: true
    },
    {
      id: "friend",
      title: "Friend Pack",
      price: "299,000 VNĐ",
      icon: <FaShieldAlt />,
      description: "Dành cho những người muốn trở thành một phần tích cực của cộng đồng M-SCI.",
      features: [
        "3,000 M-Coin",
        "Battle Pass 1 mùa",
        "Skin \"Pioneer\" độc quyền",
        "Discord role \"Founding Friend\"",
      ],
      color: "from-green-400 to-emerald-500",
      recommended: true
    },
    {
      id: "hero",
      title: "Hero Pack",
      price: "599,000 VNĐ",
      icon: <FaMedal />,
      description: "Dành cho những người muốn đóng vai trò tích cực hơn trong việc định hình tương lai của M-SCI.",
      features: [
        "6,000 M-Coin",
        "Battle Pass Premium",
        "2 Hero cấp A",
        "Khung avatar \"Hero's Journey\"",
        "Quyền tham gia khảo sát độc quyền",
      ],
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: "creator",
      title: "Creator's Bundle",
      price: "999,000 VNĐ",
      icon: <FaCrown />,
      description: "Biến bạn từ người chơi thành người đồng sáng tạo với M-SCI.",
      features: [
        "10,000 M-Coin",
        "Battle Pass Ultimate 1 năm",
        "Quyền bình chọn tính năng mới",
        "Discord dev channel",
        "Danh hiệu \"Game Creator\"",
        "Workshop hàng tháng với design team",
      ],
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "elite",
      title: "Elite Package",
      price: "2,999,000 VNĐ",
      icon: <FaGem />,
      description: "Dành cho những người muốn trở thành hạt nhân của cộng đồng M-SCI.",
      features: [
        "30,000 M-Coin",
        "Tất cả Battle Pass vĩnh viễn",
        "Full bộ skin hiện tại",
        "1 Hero S ngẫu nhiên",
        "Early access mọi tính năng",
        "Elite Lounge trong Discord",
        "Tham gia Elite Council",
      ],
      color: "from-rose-500 to-pink-600"
    },
  ];

  // State để lưu gói được chọn
  const [selectedPackage, setSelectedPackage] = useState("friend");
  const [activeCategory, setActiveCategory] = useState("basic");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPackageForPayment, setSelectedPackageForPayment] = useState<{
    id: string;
    title: string;
    price: string;
    description: string;
  } | null>(null);

  const categories = [
    { id: "basic", name: "Cơ Bản" },
    { id: "premium", name: "Cao Cấp" },
    { id: "vip", name: "VIP" },
  ];

  // Handle payment
  const handleOpenPayment = (packageId: string) => {
    const selectedPack = packages.find(p => p.id === packageId);
    if (selectedPack) {
      setSelectedPackageForPayment({
        id: selectedPack.id,
        title: selectedPack.title,
        price: selectedPack.price,
        description: selectedPack.description
      });
      setIsPaymentModalOpen(true);
    }
  };

  return (
    <section id="donate-packages" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/images/particle_overlay.png')] opacity-10 z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4"
          >
            Các <span className="text-cyan-400">Gói Donate</span> Của Chúng Tôi
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Mỗi gói donate không chỉ đơn thuần là một giao dịch tài chính, mà là một cam kết, 
            một lời hứa về sự đồng hành trong hành trình kiến tạo nên một biểu tượng mới cho game Việt.
          </motion.p>
        </div>
        
        {/* Package grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {packages.map((pack, index) => (
            <PackageCard
              key={pack.id}
              pack={pack}
              isSelected={selectedPackage === pack.id}
              onSelect={() => setSelectedPackage(pack.id)}
              onOpenPayment={() => handleOpenPayment(pack.id)}
              delay={index}
            />
          ))}
        </div>

        {/* More packages button */}
        <div className="text-center mt-10">
          <Link href="/donate/premium-packages">
            <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors inline-flex items-center">
              <span>Xem Thêm Các Gói Cao Cấp</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedPackage={selectedPackageForPayment}
      />
    </section>
  );
} 