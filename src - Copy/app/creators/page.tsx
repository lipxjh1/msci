'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram, FaArrowRight, FaAngleDown, FaUsers, FaAward, FaTrophy } from 'react-icons/fa';
import CreatorBanner from './components/CreatorBanner';
import CreatorLevels from './components/CreatorLevels';
import CreatorRewards from './components/CreatorRewards';
import CreatorResources from './components/CreatorResources';
import CreatorGuidelines from './components/CreatorGuidelines';
import CreatorJoin from './components/CreatorJoin';
import CreatorPartners from './components/CreatorPartners';
import CreatorSuccess from './components/CreatorSuccess';
import CreatorCommunity from './components/CreatorCommunity';
import CreatorFAQ from './components/CreatorFAQ';
import CreatorContact from './components/CreatorContact';

export default function CreatorsPage() {
  const [loaded, setLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('creators-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Chỉ tạo các hiệu ứng nền một lần
  const backgroundEffects = useMemo(() => {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid_pattern.svg')] bg-repeat opacity-10"></div>
        
        {/* Biểu tượng nền - số lượng giảm để tối ưu */}
        <div className="absolute -top-10 -left-10 w-80 h-80 opacity-5">
          <div className="absolute top-20 left-20 text-blue-400 w-10 h-10 animate-float"></div>
          <div className="absolute top-40 left-40 text-yellow-400 w-8 h-8 animate-float-delay"></div>
        </div>
        
        <div className="absolute -top-10 -right-10 w-80 h-80 opacity-5">
          <div className="absolute top-30 right-40 text-purple-400 w-9 h-9 animate-float-delay-2"></div>
          <div className="absolute top-50 right-20 text-red-400 w-7 h-7 animate-float-delay-3"></div>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#041019] to-[#05080F] text-white overflow-hidden">
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 10s ease-in-out infinite 1s;
        }
        
        .animate-float-delay-2 {
          animation: float 9s ease-in-out infinite 0.5s;
        }
        
        .animate-float-delay-3 {
          animation: float 11s ease-in-out infinite 1.5s;
        }
        
        @keyframes pulse-glow {
          0% { opacity: 0.2; }
          50% { opacity: 0.4; }
          100% { opacity: 0.2; }
        }
        
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.3);
        }
        
        .neon-line {
          height: 1px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0), 
            rgba(59, 130, 246, 0.5), 
            rgba(59, 130, 246, 0));
          animation: pulse-glow 3s infinite;
        }
        
        .cyber-dots {
          background-image: radial-gradient(
            rgba(59, 130, 246, 0.2) 1px, 
            transparent 1px
          );
          background-size: 20px 20px;
        }
      `}</style>
      
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Hero Section - Smaller like sample */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#041019]/60 via-[#041019]/70 to-[#041019]/95">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/overwatch_bg_2.jpg"
            alt="M-SCI Creator Program"
            fill
            priority
            className="object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/60 via-[#041019]/70 to-[#041019]/95"></div>
        </div>
        
        {/* Render optimized background effects */}
        {backgroundEffects}
        
        {/* Header Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                CHƯƠNG TRÌNH NHÀ SÁNG TẠO
              </span>
              <br />
              <span className="text-white">M-SCI</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6">
              Tham gia cộng đồng sáng tạo nội dung, kiếm thu nhập và xây dựng thương hiệu cá nhân cùng M-SCI
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/creators/register"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105 transform"
            >
              ĐĂNG KÝ NGAY <FaArrowRight className="ml-1" />
            </Link>
            <button 
              onClick={scrollToContent}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2 hover:border-white/30"
            >
              TÌM HIỂU THÊM <FaAngleDown className="ml-1" />
            </button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-effect p-5 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/20 group">
              <div className="text-3xl font-bold text-blue-400 mb-1 flex items-center">
                <FaUsers className="mr-2 text-blue-500 opacity-80" /> 500+
              </div>
              <div className="text-gray-300 text-sm">Nhà sáng tạo</div>
            </div>
            <div className="glass-effect p-5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 group">
              <div className="text-3xl font-bold text-purple-400 mb-1 flex items-center">
                <FaAward className="mr-2 text-purple-500 opacity-80" /> 1.5M+
              </div>
              <div className="text-gray-300 text-sm">Người theo dõi</div>
            </div>
            <div className="glass-effect p-5 rounded-xl border border-white/10 hover:border-yellow-500/50 transition-all hover:shadow-lg hover:shadow-yellow-500/20 group">
              <div className="text-3xl font-bold text-yellow-400 mb-1 flex items-center">
                <FaTrophy className="mr-2 text-yellow-500 opacity-80" /> 200M
              </div>
              <div className="text-gray-300 text-sm">M-Coin thưởng</div>
            </div>
          </div>
        </div>
      </div>

      <div id="creators-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Neon line separator */}
        <div className="neon-line w-full mb-12"></div>
        
        {/* Creator Levels Section */}
        <CreatorLevels />
        
        <div className="neon-line w-full my-12"></div>
        
        {/* Creator Rewards System */}
        <div className="mb-24 mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block">
              PHẦN THƯỞNG HẤP DẪN
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-lg">
              Tham gia chương trình để nhận những phần thưởng độc quyền và thu nhập ổn định
            </p>
          </div>
          <CreatorRewards />
        </div>
        
        <div className="neon-line w-full my-12"></div>
        
        {/* Creator Resources & Tools */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block">
              CÔNG CỤ & TÀI NGUYÊN
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-lg">
              Chúng tôi cung cấp mọi thứ bạn cần để tạo nội dung chất lượng
            </p>
          </div>
          <CreatorResources />
        </div>
        
        <div className="neon-line w-full my-12"></div>
        
        {/* Content Guidelines */}
        <CreatorGuidelines />
        
        <div className="neon-line w-full my-12"></div>
        
        {/* How to Join */}
        <div className="mb-24 mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block">
              CÁCH THAM GIA
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-lg">
              Chỉ vài bước đơn giản để trở thành Nhà Sáng Tạo M-SCI chính thức
            </p>
          </div>
          <CreatorJoin />
        </div>
        
        <div className="neon-line w-full my-12"></div>
        
        {/* Strategic Partners */}
        <CreatorPartners />
        
        <div className="neon-line w-full my-12"></div>
        
        {/* Success Stories */}
        <div className="mb-24 mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block">
              CÂU CHUYỆN THÀNH CÔNG
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-lg">
              Những nhà sáng tạo đã thành công và phát triển cùng M-SCI
            </p>
          </div>
          <CreatorSuccess />
        </div>
        
        <div className="neon-line w-full my-12"></div>
        
        {/* Creator Community */}
        <CreatorCommunity />
        
        <div className="neon-line w-full my-12"></div>
        
        {/* FAQ Section */}
        <div className="mb-24 mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block">
              CÂU HỎI THƯỜNG GẶP
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-lg">
              Giải đáp những thắc mắc phổ biến về chương trình
            </p>
          </div>
          <CreatorFAQ />
        </div>
        
        <div className="neon-line w-full my-12"></div>
        
        {/* Contact Section */}
        <CreatorContact />
      </div>
      
      {/* Join Us Footer - Modern Design */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#041019]/70 to-[#05080F]/90 py-16">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/particle_overlay.png"
            alt=""
            fill
            sizes="100vw" 
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            TRỞ THÀNH NHÀ SÁNG TẠO NỘI DUNG <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              M-SCI NGAY HÔM NAY!
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Tham gia cùng hàng trăm nhà sáng tạo tài năng và phát triển sự nghiệp của bạn
          </p>
          
          <Link 
            href="/creators/register"
            className="mb-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105 transform group"
          >
            ĐĂNG KÝ NGAY <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex justify-center space-x-4 mt-8">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 flex items-center justify-center text-white transition-all hover:scale-110 transform border border-white/20 hover:border-blue-500/0">
              <FaFacebookF size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 flex items-center justify-center text-white transition-all hover:scale-110 transform border border-white/20 hover:border-blue-500/0">
              <FaTwitter size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 flex items-center justify-center text-white transition-all hover:scale-110 transform border border-white/20 hover:border-blue-500/0">
              <FaYoutube size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 flex items-center justify-center text-white transition-all hover:scale-110 transform border border-white/20 hover:border-blue-500/0">
              <FaDiscord size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 flex items-center justify-center text-white transition-all hover:scale-110 transform border border-white/20 hover:border-blue-500/0">
              <FaTelegram size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 