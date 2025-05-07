'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaTrophy, FaUser, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const TournamentHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const handleDropdownToggle = (href: string) => {
    if (openDropdown === href) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(href);
    }
  };
  
  // Danh sách menu cho tournaments
  const menuItems = [
    { href: '/tournaments', label: 'Giải Đấu' },
    { href: '/tournaments/lich-thi-dau', label: 'Lịch Thi Đấu' },
    { href: '/tournaments/xep-hang', label: 'Xếp Hạng' },
    { href: '/tournaments/dang-ky', label: 'Đăng Ký' }
  ];
  
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md py-2 shadow-xl shadow-cyan-900/20' 
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center mr-10">
              <div className="relative h-8 w-20 mr-2">
                <Image
                  src="/images/overwatch_logo.png"
                  alt="M-SCI Logo"
                  fill
                  className="object-contain"
                  sizes="20rem"
                />
              </div>
            </Link>
            
            {/* Tiêu đề tournaments */}
            <Link href="/tournaments" className="flex items-center">
              <motion.div 
                className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center rounded-lg mr-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <FaTrophy className="text-white text-sm" />
              </motion.div>
              <div className="text-white font-bold text-lg">
                <span className="text-cyan-400">M-SCI</span> Tournaments
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm giải đấu..."
                className="bg-gray-800/60 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 w-64"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Navigation */}
            <nav className="flex space-x-1">
              {menuItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-gray-300 hover:text-white rounded-md text-sm font-medium"
                  whileHover={{ backgroundColor: 'rgba(8, 145, 178, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </div>
          
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <button className="flex items-center space-x-1 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200">
              <FaUser className="text-xs" />
              <span>Đăng Nhập</span>
            </button>
            <button className="lg:flex hidden items-center space-x-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200">
              <FaCalendarAlt className="text-xs" />
              <span>Lịch Thi Đấu</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default TournamentHeader; 