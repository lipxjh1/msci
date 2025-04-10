"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

export default function ThanhDieuHuongMobile() {
  const pathname = usePathname() || '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut, isAuthenticated, loading } = useAuth();
  
  // Theo dõi cuộn trang để thay đổi style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Danh sách menu
  const menuItems = [
    { href: '/', label: 'Trang chủ', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ) },
    { href: '/heroes', label: 'Anh hùng', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ) },
    { href: '/tin-tuc', label: 'Tin tức', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ) },
    { href: '/lien-he', label: 'Liên hệ', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ) },
    { href: '/co-che', label: 'Cơ chế', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ) },
  ];
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {/* Header trên cùng */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-gradient-to-r from-[#071323]/95 via-[#0c2341]/95 to-[#071323]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-2' 
            : 'bg-gradient-to-b from-black/70 to-transparent py-3'
        }`}
      >
        <div className="px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-9 w-9 mr-2">
              <Image
                src="/images/overwatch_logo.png"
                alt="Overwatch Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold text-white">OVERWATCH</span>
          </Link>
          
          {/* Menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-[#0c2341]/70 text-white border border-[#42abff]/30"
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            <div className="w-5 h-5 relative">
              <span 
                className={`absolute left-0 top-1/2 w-5 h-0.5 bg-white rounded transform transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'
                }`}
              ></span>
              <span 
                className={`absolute left-0 top-1/2 w-5 h-0.5 bg-white rounded transform transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span 
                className={`absolute left-0 top-1/2 w-5 h-0.5 bg-white rounded transform transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </header>

      {/* Drawer menu - full screen */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#071323]/98 backdrop-blur-md pt-16 pb-20 overflow-y-auto">
          {/* Header trong menu */}
          <div className="px-5 mb-8">
            <h2 className="text-xl font-bold text-white mb-2">Menu</h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#42abff] to-transparent"></div>
          </div>

          {/* Các mục menu */}
          <div className="px-5 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                  pathname === item.href 
                    ? 'bg-gradient-to-r from-[#0c2341] to-[#0a1a2e] text-[#42abff] border-l-2 border-[#42abff] shadow-[0_0_10px_rgba(66,171,255,0.2)]' 
                    : 'text-white/80 hover:bg-[#0c2341]/30 hover:text-white hover:border-l-2 hover:border-[#42abff]/30'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className={`mr-4 ${pathname === item.href ? 'text-[#42abff]' : 'text-white/70'}`}>{item.icon}</span>
                <span className="text-lg">{item.label}</span>
                
                {/* Indicator for active item */}
                {pathname === item.href && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-auto">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </Link>
            ))}
          </div>

          {/* Auth section */}
          <div className="mt-8 px-5 pt-6 border-t border-white/10">
            {!loading && (
              isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#42abff] to-[#0d47a1] flex items-center justify-center shadow-[0_0_15px_rgba(66,171,255,0.5)] border border-[#42abff]/50">
                      <span className="text-lg font-bold text-white">{user?.email?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium">{user?.email?.split('@')[0]}</p>
                      <p className="text-white/50 text-sm">Thành viên</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full py-3.5 rounded-xl text-base font-medium bg-[#0c2341]/80 border border-[#42abff]/30 text-white flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link
                    href="/auth"
                    className="w-full py-4 rounded-xl text-base font-medium bg-gradient-to-r from-[#42abff] to-[#1E40AF] text-white shadow-lg flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Đăng nhập
                  </Link>
                  <Link
                    href="/auth/register"
                    className="w-full py-3.5 rounded-xl text-base font-medium bg-transparent border border-[#42abff] text-white flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Đăng ký tài khoản
                  </Link>
                </div>
              )
            )}
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 px-5 py-4 text-center text-white/50 text-sm">
            <p>© 2024 Overwatch Clone</p>
          </div>
        </div>
      )}

      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#071323]/95 to-[#0c2341]/95 backdrop-blur-xl border-t border-[#42abff]/30 shadow-lg">
        <div className="grid grid-cols-5 h-16">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 ${
                pathname === item.href
                ? 'text-[#42abff]'
                : 'text-white/70 hover:text-white'
              }`}
            >
              <div className={`p-1.5 rounded-full ${pathname === item.href ? 'bg-[#0c2341] shadow-[0_0_10px_rgba(66,171,255,0.3)]' : ''}`}>
                {item.icon}
              </div>
              <span className="text-xs mt-0.5 font-medium">{item.label}</span>
              
              {/* Indicator for active page */}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-1/2 w-6 h-0.5 bg-[#42abff] rounded-full transform -translate-x-1/2"></span>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
} 