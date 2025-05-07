"use client";

import React from 'react';
import { FaStar, FaCrown, FaShieldAlt, FaGem, FaMedal, FaUser, FaArrowLeft, FaHeart, FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PaymentModal from '../components/PaymentModal';
import DonateNowModal from './DonateNowModal';
import LearnMoreModal from './LearnMoreModal';

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

export default function PremiumPackagesPage() {
  // Danh sách tất cả các gói donate
  const allPackages: DonatePackage[] = [
    {
      id: "starter",
      title: "Starter Pack",
      price: "49,000 VNĐ",
      icon: <FaUser />,
      description: "Gói khởi đầu dành cho những người mới tham gia cộng đồng M-SCI.",
      features: [
        "500 M-Coin",
        "Huy hiệu \"M-SCI Beginner\"",
        "Quyền truy cập kênh Discord cơ bản",
      ],
      color: "from-gray-400 to-gray-600",
    },
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
    {
      id: "platinum",
      title: "Platinum Supporter",
      price: "4,999,000 VNĐ",
      icon: <FaGem />,
      description: "Gói cao cấp dành cho những người muốn đóng góp lớn vào sự phát triển của M-SCI.",
      features: [
        "50,000 M-Coin",
        "Tất cả Battle Pass vĩnh viễn",
        "Full bộ skin hiện tại và tương lai",
        "2 Hero S tùy chọn",
        "Tên trong credits của game",
        "Quyền tham gia cuộc họp phát triển hàng quý",
        "Platinum Badge độc quyền",
        "Ưu tiên thử nghiệm tính năng mới",
      ],
      color: "from-indigo-400 to-purple-700"
    },
    {
      id: "diamond",
      title: "Diamond Benefactor",
      price: "9,999,000 VNĐ",
      icon: <FaGem />,
      description: "Dành cho những người đam mê và tin tưởng vào tầm nhìn của M-SCI.",
      features: [
        "100,000 M-Coin",
        "Tất cả nội dung game mở khóa vĩnh viễn",
        "Tên trong phần credits và trang chủ game",
        "Quyền đề xuất và bình chọn tính năng mới",
        "1 buổi trò chuyện trực tiếp với team phát triển",
        "Cơ hội thiết kế 1 item trong game",
        "Vị trí trong Diamond Council",
        "Đặc quyền tham gia sự kiện offline",
      ],
      color: "from-sky-400 to-blue-700"
    }
  ];

  // State
  const [selectedPackage, setSelectedPackage] = React.useState("friend");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = React.useState(false);
  const [selectedPackageForPayment, setSelectedPackageForPayment] = React.useState<{
    id: string;
    title: string;
    price: string;
    description: string;
  } | null>(null);
  const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = React.useState(false);

  // Handle payment
  const handleOpenPayment = (packageId: string) => {
    const selectedPack = allPackages.find(p => p.id === packageId);
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
  
  // Handle donate now
  const handleOpenDonateModal = () => {
    const randomPack = allPackages[Math.floor(Math.random() * allPackages.length)];
    setSelectedPackageForPayment({
      id: randomPack.id,
      title: randomPack.title,
      price: randomPack.price,
      description: randomPack.description
    });
    setIsDonateModalOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-900 overflow-hidden py-8">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/images/particle_overlay.svg')] opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <Link href="/donate" className="flex items-center text-white hover:text-cyan-400 transition-colors">
            <FaArrowLeft className="mr-2" />
            <span>Quay lại trang Donate</span>
          </Link>
          
          <button
            onClick={() => setIsLearnMoreModalOpen(true)}
            className="flex items-center text-white hover:text-cyan-400 transition-colors"
          >
            <FaInfoCircle className="mr-2" />
            <span>Tìm Hiểu Thêm</span>
          </button>
        </div>

        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-orbitron font-bold text-3xl md:text-5xl text-white mb-6"
          >
            Tất Cả <span className="text-cyan-400">Các Gói Hỗ Trợ</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Dưới đây là danh sách đầy đủ tất cả các gói hỗ trợ M-SCI, từ gói cơ bản đến những gói cao cấp với nhiều đặc quyền độc đáo.
          </motion.p>
        </div>
        
        {/* Package grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allPackages.map((pack, index) => (
            <div key={pack.id} className="transform transition-all duration-300 hover:scale-105">
              <div className={`relative rounded-xl overflow-hidden bg-gray-800 h-full ${selectedPackage === pack.id ? 'border-2 border-cyan-400' : 'border border-gray-700'}`}>
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
              
                <div className="p-6 flex flex-col h-full">
                  {/* Icon và Title */}
                  <div className="flex items-center mb-4">
                    <div className={`text-2xl mr-3 ${pack.color.replace('from-', 'text-').split(' ')[0]}`}>
                      {pack.icon}
                    </div>
                    <h3 className="font-orbitron font-bold text-white text-xl">{pack.title}</h3>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className={`text-2xl font-bold ${pack.color.replace('from-', 'text-').split(' ')[0]}`}>
                      {pack.price}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4">{pack.description}</p>
                  
                  {/* Features */}
                  <div className="mb-6 flex-grow">
                    <h4 className="text-white font-semibold mb-2">Quyền lợi:</h4>
                    <ul className="space-y-2">
                      {pack.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Button */}
                  <button
                    onClick={() => handleOpenPayment(pack.id)}
                    className={`w-full py-3 bg-gradient-to-r ${pack.color} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    Chọn Gói Này
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA trên trang - Donate Now button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="relative py-12 px-6 rounded-2xl overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20"></div>
            <div className="absolute inset-0 bg-gray-800 opacity-80"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <h2 className="font-orbitron text-white text-3xl md:text-4xl font-bold mb-4">
                Cùng Nhau <span className="text-cyan-400">Kiến Tạo Tương Lai</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Mỗi đóng góp từ bạn đều góp phần vào sứ mệnh đưa game Việt Nam vươn tầm quốc tế. 
                Hãy là một phần của hành trình này cùng M-SCI.
              </p>
              <button
                onClick={handleOpenDonateModal}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
              >
                <FaHeart className="mr-2" />
                Donate Ngay
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          selectedPackage={selectedPackageForPayment}
        />
      )}
      
      {/* Donate Now Modal */}
      <DonateNowModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        package={selectedPackageForPayment}
      />
      
      {/* Learn More Modal */}
      <LearnMoreModal
        isOpen={isLearnMoreModalOpen}
        onClose={() => setIsLearnMoreModalOpen(false)}
      />
    </main>
  );
} 