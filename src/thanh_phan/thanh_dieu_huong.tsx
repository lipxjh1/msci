"use client";

/* Component thanh điều hướng */ 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

export default function ThanhDieuHuong() {
  const pathname = usePathname() || '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [activeMenu, setActiveMenu] = useState('/');
  const highlighterRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<Record<string, HTMLElement | null>>({});
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cập nhật menu active khi chuyển trang
  useEffect(() => {
    if (pathname) {
      setActiveMenu(pathname);
      
      // Đặt position của highlighter khi chuyển trang
      if (highlighterRef.current && menuRefs.current[pathname]) {
        const menuItem = menuRefs.current[pathname];
        if (menuItem) {
          const rect = menuItem.getBoundingClientRect();
          highlighterRef.current.style.width = `${rect.width}px`;
          highlighterRef.current.style.left = `${menuItem.offsetLeft}px`;
          highlighterRef.current.style.opacity = '1';
        }
      }
    }
  }, [pathname]);

  // Xử lý khi hover vào menu
  const handleMenuHover = (href: string) => {
    if (highlighterRef.current && menuRefs.current[href]) {
      const menuItem = menuRefs.current[href];
      if (menuItem) {
        const rect = menuItem.getBoundingClientRect();
        highlighterRef.current.style.width = `${rect.width}px`;
        highlighterRef.current.style.left = `${menuItem.offsetLeft}px`;
        highlighterRef.current.style.opacity = '1';
        highlighterRef.current.style.backgroundColor = 'rgba(66, 171, 255, 0.4)';
        highlighterRef.current.style.boxShadow = '0 0 15px 2px rgba(66, 171, 255, 0.6)';
      }
    }
  };

  // Xử lý khi rời chuột khỏi menu
  const handleMenuLeave = () => {
    if (highlighterRef.current && menuRefs.current[activeMenu]) {
      const menuItem = menuRefs.current[activeMenu];
      if (menuItem) {
        const rect = menuItem.getBoundingClientRect();
        highlighterRef.current.style.width = `${rect.width}px`;
        highlighterRef.current.style.left = `${menuItem.offsetLeft}px`;
        highlighterRef.current.style.backgroundColor = 'rgba(66, 171, 255, 0.5)';
        highlighterRef.current.style.boxShadow = '0 0 10px 1px rgba(66, 171, 255, 0.4)';
      }
    }
  };
  
  // Danh sách menu
  const menuItems = [
    { href: '/', label: 'Trang Chủ', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1.5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ) },
    { href: '/heroes', label: 'Anh Hùng', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1.5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ) },
    { href: '/tin-tuc', label: 'Tin Tức', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1.5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ) },
    { href: '/shop', label: 'Shop', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1.5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ) },
    { href: '/lien-he', label: 'Liên Hệ', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1.5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ) },
    { href: '/co-che', label: 'Cơ chế', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1.5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ) },
  ];
  
  const handleSignOut = async () => {
    await signOut();
  };

  // Function để định nghĩa tham chiếu menu cho TypeScript
  const setMenuRef = (el: HTMLElement | null, href: string) => {
    menuRefs.current[href] = el;
  };
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hideNav 
          ? '-translate-y-full opacity-0' 
          : 'translate-y-0 opacity-100'
      } ${
        scrolled 
          ? 'bg-gradient-to-r from-[#071323]/95 via-[#0c2341]/95 to-[#071323]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-2 border-b border-[#42abff]/30' 
          : 'bg-gradient-to-b from-black/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-20 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>
          <div className="absolute top-0 right-1/4 w-20 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-70"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#42abff]/40 to-transparent"></div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="relative h-12 w-12 mr-3 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/overwatch_logo.png"
                  alt="Overwatch Logo"
                  fill
                  className="object-contain animate-pulse-slow"
                />
                <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold text-white animate-text-neon relative">
                OVERWATCH
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#42abff] to-transparent group-hover:w-full transition-all duration-500"></span>
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#42abff]/30 blur-sm group-hover:w-full transition-all duration-700 delay-200"></span>
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1 relative">
            {/* Menu highlighter */}
            <div 
              ref={highlighterRef}
              className="absolute h-full rounded-full bg-[#42abff]/40 backdrop-blur-sm -z-10 transition-all duration-300 opacity-0 shadow-[0_0_10px_rgba(66,171,255,0.3)]"
            ></div>
            
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => setMenuRef(el, item.href)}
                onMouseEnter={() => handleMenuHover(item.href)}
                onMouseLeave={handleMenuLeave}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 mx-1 flex items-center relative group ${
                  pathname === item.href 
                    ? 'text-white font-bold text-shadow-neon' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span className={`flex items-center ${pathname === item.href ? 'neon-flicker' : ''}`}>
                  {item.icon}
                  {item.label}
                </span>
                
                {/* Hiệu ứng glow khi hover trên active item */}
                {pathname === item.href && (
                  <>
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_12px_3px_rgba(66,171,255,0.7)] transition-opacity duration-300"></span>
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#42abff] blur-sm opacity-70"></span>
                  </>
                )}
              </Link>
            ))}

            {/* Auth buttons */}
            {!loading && (
              isAuthenticated ? (
                <div className="flex items-center ml-4 pl-3 border-l border-[#42abff]/20">
                  <div className="relative group">
                    <span className="text-white/80 text-sm mr-3 flex items-center">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#42abff] to-[#0d47a1] flex items-center justify-center mr-2 shadow-[0_0_15px_rgba(66,171,255,0.5)] border border-[#42abff]/50">
                        <span className="text-xs font-bold">{user?.email?.charAt(0).toUpperCase()}</span>
                      </div>
                      {user?.email?.split('@')[0]}
                    </span>
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#42abff]/50 group-hover:w-full transition-all duration-300"></span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm bg-[#0c2341]/80 border border-[#42abff]/30 text-white hover:bg-[#0c2341] hover:border-[#42abff]/70 transition-all duration-300 hover:shadow-[0_0_15px_rgba(66,171,255,0.5)] relative group overflow-hidden"
                  >
                    <span className="relative z-10">Đăng Xuất</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#42abff]/20 to-transparent -translate-x-full group-hover:animate-shimmer-button"></span>
                  </button>
                </div>
              ) : (
                <div className="relative ml-4 pl-4 border-l border-[#42abff]/20 flex items-center">
                  <Link
                    href="/auth/register"
                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#0c2341]/40 border border-[#42abff]/30 text-white hover:border-[#42abff]/70 hover:text-[#42abff] transition-all duration-300 mr-2 hover:shadow-[0_0_12px_rgba(66,171,255,0.4)] relative overflow-hidden group"
                  >
                    <span className="relative z-10">Đăng Ký</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#42abff]/10 to-transparent -translate-x-full group-hover:animate-shimmer-button"></span>
                  </Link>
                  <Link
                    href="/auth"
                    className="px-6 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-[#42abff] to-[#1E40AF] text-white shadow-[0_0_20px_rgba(66,171,255,0.4)] hover:shadow-[0_0_25px_rgba(66,171,255,0.6)] transition-all duration-300 hover:translate-y-[-1px] relative overflow-hidden group animate-pulse-subtle"
                  >
                    <span className="relative z-10 flex items-center neon-flicker">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Đăng Nhập
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer-button-fast"></span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:animate-slide-x"></span>
                  </Link>
                </div>
              )
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            {!loading && !isAuthenticated && (
              <Link
                href="/auth"
                className="mr-2 px-4 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-[#42abff] to-[#1E40AF] text-white shadow-[0_0_15px_rgba(66,171,255,0.3)] relative overflow-hidden group"
              >
                <span className="relative z-10 neon-flicker">Đăng Nhập</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer-button"></span>
              </Link>
            )}
            
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-[#0c2341]/50 hover:shadow-[0_0_15px_rgba(66,171,255,0.3)] relative z-10 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Mở menu</span>
              {/* Icon menu với hiệu ứng */}
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute left-0 top-1/2 block w-6 h-0.5 bg-white rounded transform transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                  }`}
                ></span>
                <span 
                  className={`absolute left-0 top-1/2 block w-6 h-0.5 bg-white rounded transform transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span 
                  className={`absolute left-0 top-1/2 block w-6 h-0.5 bg-white rounded transform transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100 border-t border-[#42abff]/30' : 'max-h-0 opacity-0 border-none'
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-4 space-y-1 backdrop-blur-xl bg-gradient-to-b from-[#071323]/95 to-[#050e1b]/95">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                pathname === item.href 
                  ? 'bg-gradient-to-r from-[#0c2341] to-[#0a1a2e] text-[#42abff] border-l-2 border-[#42abff] shadow-[0_0_10px_rgba(66,171,255,0.2)]' 
                  : 'text-white/80 hover:bg-[#0c2341]/30 hover:text-white hover:border-l-2 hover:border-[#42abff]/30'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className={`mr-3 ${pathname === item.href ? 'text-[#42abff]' : 'text-white/70'}`}>{item.icon}</span>
              {item.label}
              
              {/* Arrow indicator for active item */}
              {pathname === item.href && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-auto animate-pulse-slow">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </Link>
          ))}
          
          {/* Đăng xuất nếu đã đăng nhập (mobile) */}
          {!loading && isAuthenticated && (
            <div className="pt-2 mt-2 border-t border-[#42abff]/20">
              <div className="px-4 py-2 text-sm text-white/60">
                Đăng nhập với tài khoản:
                <div className="font-semibold text-white mt-1 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#42abff] to-[#0d47a1] flex items-center justify-center mr-2 shadow-[0_0_10px_rgba(66,171,255,0.4)]">
                    <span className="text-xs font-bold">{user?.email?.charAt(0).toUpperCase()}</span>
                  </div>
                  {user?.email}
                </div>
              </div>
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 text-white/80 hover:bg-[#391d1d] hover:text-red-400 hover:shadow-[0_0_10px_rgba(220,38,38,0.2)] group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-3 group-hover:text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Đăng Xuất
              </button>
            </div>
          )}
          
          {/* Đăng ký nếu chưa đăng nhập (mobile) */}
          {!loading && !isAuthenticated && (
            <div className="pt-2 mt-2 border-t border-[#42abff]/20 flex flex-col space-y-2">
              <Link
                href="/auth/register"
                className="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 bg-[#0c2341]/50 text-white hover:bg-[#0c2341]/70 hover:shadow-[0_0_10px_rgba(66,171,255,0.3)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Đăng Ký Tài Khoản
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}