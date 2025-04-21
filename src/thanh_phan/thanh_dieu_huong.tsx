"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { FiChevronDown, FiSearch, FiUser, FiGlobe } from 'react-icons/fi';

// Định nghĩa cấu trúc của menu và submenu
type SubMenuItem = {
  href: string;
  label: string;
  badge?: string;
  badgeColor?: string;
  comingSoon?: boolean;
};

type MenuItem = {
  href: string;
  label: string;
  hasDropdown: boolean;
  submenu?: SubMenuItem[];
};

export default function ThanhDieuHuong() {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user, signOut, isAuthenticated, loading } = useAuth();
  const lastScrollY = useRef(0);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  // Theo dõi cuộn trang để thay đổi style và ẩn/hiện thanh điều hướng
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Đặt trạng thái cuộn
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Ẩn/hiện thanh điều hướng khi cuộn
      if (currentScrollY > 100) {
        // Cuộn xuống
        if (currentScrollY > lastScrollY.current) {
          setHideNav(true);
        } 
        // Cuộn lên
        else {
          setHideNav(false);
        }
      } else {
        setHideNav(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Click outside to close dropdown
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

  // Danh sách menu chính
  const menuItems: MenuItem[] = [
    { 
      href: '/game', 
      label: 'GAME', 
      hasDropdown: true,
      submenu: [
        { href: '/', label: 'Trang Chủ (Home)' },
        { href: '/heroes', label: 'Anh Hùng (Heroes)' },
        { href: '/story', label: 'Cốt Truyện (Story)' },
        { href: '/co-che', label: 'Cơ Chế (Gameplay)' },
        { href: '/gacha', label: 'Gacha (Summon)', comingSoon: true },
        { href: '/events', label: 'Sự Kiện (Events)' },
        { href: '/guild', label: 'Guild (Guilds)', comingSoon: true },
        { href: '/download', label: 'Tải Game (Download)', badge: 'NEW', badgeColor: 'bg-orange-500' }
      ]
    },
    { 
      href: '/marketplace', 
      label: 'MARKETPLACE', 
      hasDropdown: false,
    },
    { 
      href: '/community', 
      label: 'COMMUNITY', 
      hasDropdown: true,
      submenu: [
        { href: '/tin-tuc', label: 'Tin Tức (News)' },
        { href: '/forum', label: 'Diễn Đàn (Forum)', comingSoon: true },
        { href: '/social', label: 'Social Hub' },
        { href: '/tournaments', label: 'Esports/Tournaments', comingSoon: true },
        { href: '/creators', label: 'Content Creator', comingSoon: true },
        { href: '/hall-of-fame', label: 'Hall of Fame', comingSoon: true }
      ]
    },
    { 
      href: '/invest', 
      label: 'INVEST & DONATE', 
      hasDropdown: true,
      submenu: [
        { href: '/token', label: '$MSCI Token', comingSoon: true },
        { href: '/tokenomics', label: 'Tokenomics', comingSoon: true },
        { href: '/donate', label: 'Donation Packages', badge: 'VIP', badgeColor: 'bg-purple-600' },
        { href: '/roadmap', label: 'Roadmap' },
        { href: '/referral', label: 'Referral Program', comingSoon: true },
        { href: '/staking', label: 'Staking & Rewards', comingSoon: true },
        { href: '/partners', label: 'Partners & Backers' }
      ]
    },
    { 
      href: '/about', 
      label: 'ABOUT', 
      hasDropdown: true,
      submenu: [
        { href: '/about-us', label: 'Về M-SCI (About Us)' },
        { href: '/team', label: 'Đội Ngũ (Team)' },
        { href: '/careers', label: 'Tuyển Dụng (Careers)' },
        { href: '/press', label: 'Press Kit' },
        { href: '/lien-he', label: 'Liên Hệ (Contact)' }
      ]
    },
    { 
      href: '/support', 
      label: 'SUPPORT', 
      hasDropdown: false
    }
  ];

  const handleDropdownToggle = (href: string) => {
    if (openDropdown === href) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(href);
    }
  };
  
  const handleSignOut = async () => {
    await signOut();
  };

  // Phát hiện đường dẫn hiện tại để highlight menu đang active
  const isActiveMenu = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Phát hiện đường dẫn hiện tại cho submenu
  const isActiveSubmenu = (href: string) => {
    return pathname === href;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hideNav 
          ? '-translate-y-full opacity-0' 
          : 'translate-y-0 opacity-100'
      } ${
        scrolled 
          ? 'bg-[#16181D]/95 backdrop-blur-xl shadow-lg py-1 border-b border-gray-700/50' 
          : 'bg-[#16181D] py-1'
      }`}
    >
      <div className="max-w-7xl mx-auto relative flex items-center justify-between">
        {/* Logo và Menu chính */}
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center px-4 py-1 group">
            <div className="relative h-9 w-24 mr-2 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/overwatch_logo.png"
                alt="M-SCI Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          
          {/* Separator */}
          <div className="h-8 w-px bg-gray-700/50 mx-1"></div>
          
          {/* Main Menu Items */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div 
                key={item.href}
                className="relative group"
                ref={(el) => { dropdownRefs.current[item.href] = el; }}
              >
                {item.hasDropdown ? (
                  <button
                    onClick={() => handleDropdownToggle(item.href)}
                    className={`flex items-center px-3 py-5 text-sm font-medium transition-colors ${
                      isActiveMenu(item.href) || openDropdown === item.href
                        ? 'text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <FiChevronDown className={`ml-1 w-4 h-4 transition-transform ${openDropdown === item.href ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-5 text-sm font-medium transition-colors ${
                      isActiveMenu(item.href)
                        ? 'text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
                
                {/* Dropdown for menu with submenu */}
                {item.hasDropdown && item.submenu && (
                  <div 
                    className={`absolute left-0 w-64 bg-[#1A1C21] border border-gray-700/50 shadow-lg rounded-b-md overflow-hidden transition-all origin-top ${
                      openDropdown === item.href
                        ? 'opacity-100 scale-y-100 translate-y-0' 
                        : 'opacity-0 scale-y-90 translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                            isActiveSubmenu(subItem.href)
                              ? 'bg-[#2D3748] text-white' 
                              : 'text-gray-300 hover:bg-[#2D3748] hover:text-white'
                          } ${subItem.comingSoon ? 'opacity-70' : ''}`}
                        >
                          <span className="flex items-center">
                            {subItem.label}
                            {subItem.comingSoon && (
                              <span className="ml-2 text-xs bg-gray-600 text-gray-200 px-1.5 py-0.5 rounded-sm">Soon</span>
                            )}
                          </span>
                          {subItem.badge && (
                            <span className={`text-xs ${subItem.badgeColor || 'bg-blue-600'} text-white px-1.5 py-0.5 rounded-sm font-medium`}>
                              {subItem.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Right side actions: Search, Language, Account */}
        <div className="flex items-center space-x-1 pr-4">
          {/* Search Button */}
          <button className="p-2.5 text-gray-300 hover:text-white transition-colors">
            <FiSearch className="w-5 h-5" />
          </button>
          
          {/* Language Selector */}
          <button className="p-2.5 text-gray-300 hover:text-white transition-colors">
            <FiGlobe className="w-5 h-5" />
          </button>
          
          {/* Account Section */}
          {!loading && (
            isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 hover:text-white text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-[#42ABFF] flex items-center justify-center">
                    <span className="text-sm font-bold">{user?.email?.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="hidden sm:inline-block">Account</span>
                  <FiChevronDown className="w-4 h-4" />
                </button>
                
                {/* Account Dropdown */}
                <div className="absolute right-0 w-48 bg-[#1A1C21] border border-gray-700/50 shadow-lg rounded-md opacity-0 scale-95 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all origin-top-right">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-700/50">
                      <p className="text-white font-medium">{user?.email?.split('@')[0]}</p>
                      <p className="text-xs text-gray-400">Thành viên</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2D3748] hover:text-white">
                      Hồ sơ
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2D3748] hover:text-white">
                      Cài đặt
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2D3748] hover:text-white"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Link
                  href="/auth"
                  className="flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors mr-1"
                >
                  <FiUser className="w-5 h-5 mr-1.5" />
                  <span className="hidden sm:inline-block font-medium">Account</span>
                </Link>
                
                <Link
                  href="/auth"
                  className="ml-2 px-5 py-1.5 rounded bg-[#FF7D00] hover:bg-[#FF5500] transition-colors text-white font-medium text-sm"
                >
                  Play Now
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
} 