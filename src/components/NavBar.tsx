"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiChevronDown, 
  FiSearch, 
  FiUser, 
  FiGlobe, 
  FiMenu, 
  FiX,
  FiBell,
  FiShoppingCart
} from 'react-icons/fi';
import { RiSparklingFill } from 'react-icons/ri';

// Định nghĩa các loại menu
type SubMenuItem = {
  href: string;
  label: string;
  badge?: string;
  badgeColor?: string;
  comingSoon?: boolean;
  isNew?: boolean;
};

type MenuItem = {
  href: string;
  label: string;
  hasDropdown: boolean;
  submenu?: SubMenuItem[];
};

// Danh sách các menu
const menuItems: MenuItem[] = [
  { 
    href: '/game', 
    label: 'GAME', 
    hasDropdown: true,
    submenu: [
      { href: '/', label: 'Home' },
      { href: '/heroes', label: 'Heroes' },
      { href: '/story', label: 'Story' },
      { href: '/co-che', label: 'Gameplay' },
      { href: '/gacha', label: 'Gacha (Summon)' },
      { href: '/minigames', label: 'Mini Games', badge: 'NEW', badgeColor: 'bg-blue-500', isNew: true },
      { href: '/download', label: 'Download Game', badge: 'HOT', badgeColor: 'bg-orange-500', isNew: true }
    ]
  },
  { 
    href: '/coming-soon', 
    label: 'MARKETPLACE', 
    hasDropdown: false
  },
  { 
    href: '/community', 
    label: 'COMMUNITY', 
    hasDropdown: true,
    submenu: [
      { href: '/tin-tuc', label: 'News' },
      { href: '/forum-coming-soon', label: 'Forum' },
      { href: '/social-hub-coming-soon', label: 'Social Hub' },
      { href: '/tournaments-coming-soon', label: 'Tournaments' },
      { href: '/creators', label: 'Content Creator' },
      { href: '/hall-of-fame-coming-soon', label: 'Hall of Fame' }
    ]
  },
  { 
    href: '/invest', 
    label: 'INVEST & DONATE', 
    hasDropdown: true,
    submenu: [
      { href: '/token-coming-soon', label: '$MSCI Token' },
      { href: '/tokenomics-coming-soon', label: 'Tokenomics' },
      { href: '/donate-coming-soon', label: 'Donation Packages', badge: 'VIP', badgeColor: 'bg-purple-600' },
      { href: '/roadmap', label: 'Roadmap' },
      { href: '/referral', label: 'Referral Program' },
      { href: '/staking-coming-soon', label: 'Staking & Rewards' },
      { href: '/partners', label: 'Partners & Backers' }
    ]
  },
  { 
    href: '/about', 
    label: 'ABOUT', 
    hasDropdown: true,
    submenu: [
      { href: '/about-us', label: 'About Us' },
      { href: '/team', label: 'Team' },
      { href: '/careers', label: 'Careers' },
      { href: '/press', label: 'Press Kit' },
      { href: '/lien-he', label: 'Contact' }
    ]
  },
  { 
    href: '/support', 
    label: 'SUPPORT', 
    hasDropdown: false
  }
];

export default function NavBar() {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const lastScrollY = useRef(0);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  // Phát hiện thiết bị di động
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Hiệu ứng cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current + 10) {
          setHideNav(true);
        } else if (currentScrollY < lastScrollY.current - 10) {
          setHideNav(false);
        }
      } else {
        setHideNav(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Đóng dropdown khi click ra ngoài
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const dropdown = dropdownRefs.current[openDropdown];
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // Xử lý mở/đóng dropdown
  const handleDropdownToggle = (href: string) => {
    if (openDropdown === href) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(href);
    }
  };
  
  // Kiểm tra đường dẫn hiện tại
  const isActiveMenu = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Kiểm tra đường dẫn subitem
  const isActiveSubmenu = (href: string) => {
    return pathname === href;
  };
  
  // Mở/đóng menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Animation variants cho Framer Motion
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }
    },
    exit: { 
      y: -100, 
      opacity: 0,
      transition: { 
        ease: "easeInOut", 
        duration: 0.3 
      }
    }
  };
  
  const dropdownVariants = {
    closed: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      } 
    },
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05
      } 
    }
  };
  
  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };
  
  const mobileMenuVariants = {
    closed: {
      x: "100%",
      opacity: 0.5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07
      }
    }
  };
  
  const mobileItemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <>
      {/* Desktop & Tablet Nav */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled ? 'bg-black/75 backdrop-blur-xl border-b border-purple-900/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-gradient-to-b from-black/90 to-transparent'
        }`}
        initial="hidden"
        animate={hideNav ? "exit" : "visible"}
        variants={navVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="group flex items-center">
                <motion.div 
                  className="relative h-9 w-24"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src="/images/overwatch_logo.png"
                    alt="M-SCI Logo"
                    fill
                    className="object-contain"
                    sizes="24rem"
                    priority
                  />
                </motion.div>
                <motion.span 
                  className="hidden md:inline-block ml-2 text-xs bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  AAA SCI
                </motion.span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:items-center">
              <div className="flex space-x-1">
                {menuItems.map((item) => (
                  <div 
                    key={item.href}
                    className="relative"
                    ref={(el) => { dropdownRefs.current[item.href] = el; }}
                  >
                    {item.hasDropdown ? (
                      <>
                        <motion.button
                          onClick={() => handleDropdownToggle(item.href)}
                          className={`group flex items-center px-3 py-5 text-sm font-medium ${
                            isActiveMenu(item.href) || openDropdown === item.href
                              ? 'text-white' 
                              : 'text-gray-300 hover:text-white'
                          }`}
                          whileHover={{ y: -1 }}
                          whileTap={{ y: 1 }}
                        >
                          <span className="relative">
                            {item.label}
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full ${
                              isActiveMenu(item.href) || openDropdown === item.href ? 'w-full' : 'w-0'
                            }`}></span>
                          </span>
                          <motion.span
                            animate={{ rotate: openDropdown === item.href ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FiChevronDown className="ml-1 w-4 h-4" />
                          </motion.span>
                        </motion.button>
                        
                        <AnimatePresence>
                          {openDropdown === item.href && (
                            <motion.div 
                              className="absolute left-0 w-64 bg-gradient-to-b from-[#1E1F2A] to-[#141419] backdrop-blur-md border border-purple-900/20 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.7)] rounded-xl overflow-hidden z-50 mt-1"
                              initial="closed"
                              animate="open"
                              exit="closed"
                              variants={dropdownVariants}
                            >
                              <div className="py-3 px-1">
                                {item.submenu?.map((subitem) => (
                                  <motion.div key={subitem.href} variants={itemVariants}>
                                    <Link
                                      href={subitem.href}
                                      className={`relative group flex items-center justify-between px-4 py-2.5 mx-1 text-sm rounded-lg transition-all duration-200 ${
                                        isActiveSubmenu(subitem.href) 
                                          ? 'bg-purple-800/30 text-white' 
                                          : 'text-gray-300 hover:bg-purple-800/20 hover:text-white'
                                      }`}
                                      onClick={() => setOpenDropdown(null)}
                                    >
                                      <span className="flex items-center">
                                        {subitem.isNew && (
                                          <RiSparklingFill className="mr-1.5 text-yellow-400" />
                                        )}
                                        {subitem.label}
                                      </span>
                                      
                                      {subitem.badge && (
                                        <span className={`ml-2 px-1.5 py-0.5 text-[10px] font-bold text-white rounded ${subitem.badgeColor || 'bg-blue-500'}`}>
                                          {subitem.badge}
                                        </span>
                                      )}
                                      
                                      {subitem.comingSoon && (
                                        <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium text-white rounded bg-gray-700">
                                          Sắp Ra Mắt
                                        </span>
                                      )}
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <motion.div
                        whileHover={{ y: -1 }}
                        whileTap={{ y: 1 }}
                      >
                        <Link
                          href={item.href}
                          className={`group relative flex items-center px-3 py-5 text-sm font-medium ${
                            isActiveMenu(item.href)
                              ? 'text-white' 
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <span className="relative">
                            {item.label}
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full ${
                              isActiveMenu(item.href) ? 'w-full' : 'w-0'
                            }`}></span>
                          </span>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center">
              {/* Search Button */}
              <motion.button 
                className="p-2 text-gray-300 hover:text-white mr-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiSearch className="w-5 h-5" />
              </motion.button>
              
              {/* Language */}
              <motion.button 
                className="p-2 text-gray-300 hover:text-white mr-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiGlobe className="w-5 h-5" />
              </motion.button>
              
              {/* User */}
              <Link href="/auth" className="hidden md:flex items-center ml-2">
                <motion.button 
                  className="flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium shadow-xl shadow-blue-900/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiUser className="w-4 h-4 mr-1.5" />
                  <span>Play Now</span>
                </motion.button>
              </Link>
              
              {/* Mobile menu button */}
              <div className="lg:hidden ml-3">
                <motion.button
                  className="p-2 rounded-full bg-purple-900/30 text-white border border-purple-800/30"
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMobileMenu}
                >
                  {mobileMenuOpen ? (
                    <FiX className="w-5 h-5" />
                  ) : (
                    <FiMenu className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 lg:hidden bg-black/95 backdrop-blur-lg pt-16 pb-20 overflow-y-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="px-6 py-6">
              <div className="mt-6 mb-8 flex justify-center">
                <Link href="/auth">
                  <motion.button 
                    className="flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-blue-900/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiUser className="w-5 h-5 mr-2" />
                    <span>Play Now</span>
                  </motion.button>
                </Link>
              </div>
              
              <motion.div className="space-y-3">
                {menuItems.map((item) => (
                  <motion.div 
                    key={item.href}
                    variants={mobileItemVariants}
                  >
                    {item.hasDropdown ? (
                      <div className="py-2">
                        <button
                          onClick={() => handleDropdownToggle(item.href)}
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-xl ${
                            isActiveMenu(item.href) || openDropdown === item.href
                              ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-white border border-purple-800/20' 
                              : 'text-gray-300 hover:bg-gray-800/50'
                          }`}
                        >
                          <span className="text-base font-medium">{item.label}</span>
                          <motion.span
                            animate={{ rotate: openDropdown === item.href ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FiChevronDown className="ml-1 w-5 h-5" />
                          </motion.span>
                        </button>
                        
                        <AnimatePresence>
                          {openDropdown === item.href && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 ml-4 pl-4 border-l border-purple-800/30 space-y-1">
                                {item.submenu?.map((subitem) => (
                                  <motion.div 
                                    key={subitem.href}
                                    variants={mobileItemVariants}
                                  >
                                    <Link
                                      href={subitem.href}
                                      className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg ${
                                        isActiveSubmenu(subitem.href)
                                          ? 'bg-purple-900/30 text-white' 
                                          : 'text-gray-300 hover:bg-gray-800/30 hover:text-white'
                                      }`}
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      <span className="flex items-center">
                                        {subitem.isNew && (
                                          <RiSparklingFill className="mr-1.5 text-yellow-400" />
                                        )}
                                        {subitem.label}
                                      </span>
                                      
                                      <div className="flex items-center">
                                        {subitem.badge && (
                                          <span className={`ml-2 px-1.5 py-0.5 text-xs font-medium text-white rounded ${subitem.badgeColor || 'bg-blue-500'}`}>
                                            {subitem.badge}
                                          </span>
                                        )}
                                        
                                        {subitem.comingSoon && (
                                          <span className="ml-2 px-1.5 py-0.5 text-xs font-medium text-white rounded bg-gray-700">
                                            Sắp Ra Mắt
                                          </span>
                                        )}
                                      </div>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl ${
                          isActiveMenu(item.href)
                            ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-white border border-purple-800/20' 
                            : 'text-gray-300 hover:bg-gray-800/50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-base font-medium">{item.label}</span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-12 pt-6 border-t border-gray-800">
                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    href="/support" 
                    className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-900/30"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiBell className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-400">Notifications</span>
                  </Link>
                  <Link 
                    href="/store" 
                    className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-900/30"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiShoppingCart className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-400">Store</span>
                  </Link>
                </div>
                
                <div className="mt-8 flex justify-center space-x-6">
                  <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-300">
                    Privacy
                  </Link>
                  <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-300">
                    Terms
                  </Link>
                  <Link href="/legal" className="text-sm text-gray-500 hover:text-gray-300">
                    Legal
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 