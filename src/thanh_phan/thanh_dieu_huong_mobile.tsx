"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { FiChevronDown, FiSearch, FiUser, FiGlobe, FiX, FiChevronRight } from 'react-icons/fi';

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

export default function ThanhDieuHuongMobile() {
  const pathname = usePathname() || '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { user, signOut, isAuthenticated, loading } = useAuth();
  const lastScrollY = useRef(0);
  
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
      
      // Đóng menu khi cuộn nếu đang mở
      if (mobileMenuOpen && Math.abs(currentScrollY - lastScrollY.current) > 30) {
        setMobileMenuOpen(false);
      }
      
      // Ẩn/hiện thanh điều hướng khi cuộn
      if (currentScrollY > 100) {
        // Cuộn xuống - ẩn thanh điều hướng
        if (currentScrollY > lastScrollY.current) {
          setHideNav(true);
        } 
        // Cuộn lên - hiện thanh điều hướng
        else {
          setHideNav(false);
        }
      } else {
        setHideNav(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

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
  
  const handleSignOut = async () => {
    await signOut();
  };

  const handleSubmenuToggle = (href: string) => {
    if (activeSubmenu === href) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(href);
    }
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
    <>
      {/* Header trên cùng */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hideNav && !mobileMenuOpen
            ? '-translate-y-full opacity-0' 
            : 'translate-y-0 opacity-100'
        } ${
          scrolled 
            ? 'bg-[#16181D]/95 backdrop-blur-xl shadow-lg py-2 border-b border-gray-700/50' 
            : 'bg-[#16181D] py-3'
        }`}
      >
        <div className="px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-20">
              <Image
                src="/images/overwatch_logo.png"
                alt="M-SCI Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <button className="p-2 text-gray-300 hover:text-white">
              <FiSearch className="w-5 h-5" />
            </button>
            
            {/* Language Button */}
            <button className="p-2 text-gray-300 hover:text-white">
              <FiGlobe className="w-5 h-5" />
            </button>
            
            {/* Menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-[#212330] text-white border border-gray-700/50"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {mobileMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <div className="w-5 h-5 relative">
                  <span 
                    className="absolute left-0 top-1/2 w-5 h-0.5 bg-white rounded transform -translate-y-1"
                  ></span>
                  <span 
                    className="absolute left-0 top-1/2 w-5 h-0.5 bg-white rounded"
                  ></span>
                  <span 
                    className="absolute left-0 top-1/2 w-5 h-0.5 bg-white rounded transform translate-y-1"
                  ></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer menu - full screen */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#16181D]/98 backdrop-blur-md pt-16 pb-20 overflow-y-auto">
          {/* User/Auth Section */}
          {!loading && (
            <div className="px-5 mb-6">
              {isAuthenticated ? (
                <div className="flex items-center justify-between bg-[#1E212B] p-4 rounded-lg mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#42ABFF] flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{user?.email?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium">{user?.email?.split('@')[0]}</p>
                      <p className="text-gray-400 text-sm">Thành viên</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-1.5 text-sm text-white bg-red-500/20 hover:bg-red-500/30 rounded"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/auth"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#1E212B] text-white border border-gray-700/30"
                  >
                    <FiUser className="w-5 h-5" />
                    <span>Đăng nhập / Đăng ký</span>
                  </Link>
                  <Link
                    href="/auth"
                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-[#FF7D00] text-white font-medium"
                  >
                    Play Now
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gray-700/30 mx-5 mb-4"></div>

          {/* Menu List */}
          <div className="px-4">
            {menuItems.map((item) => (
              <div key={item.href} className="mb-2">
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => handleSubmenuToggle(item.href)}
                      className={`flex items-center justify-between w-full px-4 py-3.5 text-base font-medium rounded-lg ${
                        isActiveMenu(item.href) || activeSubmenu === item.href
                          ? 'bg-[#292D3E] text-white' 
                          : 'text-gray-300 hover:bg-[#1E212B]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <FiChevronDown 
                        className={`transition-transform duration-200 ${
                          activeSubmenu === item.href ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Submenu */}
                    {item.submenu && (
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          activeSubmenu === item.href 
                            ? 'max-h-96 opacity-100 mt-1 mb-3' 
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="ml-4 pl-4 border-l border-gray-700/30 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`flex items-center justify-between px-4 py-3 rounded-md text-sm ${
                                isActiveSubmenu(subItem.href) 
                                  ? 'bg-[#1E2027] text-white' 
                                  : 'text-gray-300 hover:bg-[#1E2027]/50'
                              } ${subItem.comingSoon ? 'opacity-60' : ''}`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span className="flex items-center">
                                {subItem.label}
                                {subItem.comingSoon && (
                                  <span className="ml-2 text-xs bg-gray-600/70 text-gray-200 px-1.5 py-0.5 rounded-sm">Soon</span>
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
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between w-full px-4 py-3.5 text-base font-medium rounded-lg ${
                      isActiveMenu(item.href) 
                        ? 'bg-[#292D3E] text-white' 
                        : 'text-gray-300 hover:bg-[#1E212B]'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <FiChevronRight className="w-5 h-5 text-gray-500" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Links */}
          <div className="px-5 mt-8 pt-4 border-t border-gray-700/30">
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-gray-400 text-sm hover:text-white">Quyền riêng tư</Link>
              <Link href="/legal" className="text-gray-400 text-sm hover:text-white">Pháp lý</Link>
              <Link href="/terms" className="text-gray-400 text-sm hover:text-white">Điều khoản</Link>
              <Link href="/cookies" className="text-gray-400 text-sm hover:text-white">Cài đặt Cookie</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 