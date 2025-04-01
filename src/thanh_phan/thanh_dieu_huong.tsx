"use client";

/* Component thanh điều hướng */ 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
// import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

export default function ThanhDieuHuong() {
  const pathname = usePathname();
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
    { href: '/', label: 'Trang Chủ' },
    { href: '/heroes', label: 'Anh Hùng' },
    { href: '/tin-tuc', label: 'Tin Tức' },
    { href: '/lien-he', label: 'Liên Hệ' },
    { href: '/co-che', label: 'Cơ chế' },
  ];
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0a141e]/90 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="relative h-10 w-10 mr-3">
               {/*} <Image
                  src="/images/overwatch_logo.png"
                  alt="Overwatch Logo"
                  fill
                  className="object-contain"
                />  */}
              </div>
              <span className="text-xl font-bold text-white animate-title-glow">OVERWATCH</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 mx-1
                  ${pathname === item.href 
                    ? 'bg-gradient-to-r from-[#F44336] to-[#e53935] text-white shadow-lg shadow-red-500/20' 
                    : 'text-white hover:bg-white/10 hover:text-[#F44336]'}
                `}
              >
                {item.label}
              </Link>
            ))}

            {/* Auth buttons */}
            {!loading && (
              isAuthenticated ? (
                <div className="flex items-center ml-2">
                  <span className="text-white/80 text-sm mr-2">
                    {user?.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition-all"
                  >
                    Đăng Xuất
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="px-6 py-2 ml-2 rounded-full text-sm font-medium bg-gradient-to-r from-[var(--overwatch-orange)] to-[#f57c00] text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all"
                >
                  Đăng Nhập
                </Link>
              )
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            {!loading && !isAuthenticated && (
              <Link
                href="/auth"
                className="mr-2 px-4 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-[var(--overwatch-orange)] to-[#f57c00] text-white shadow-md shadow-orange-500/20"
              >
                Đăng Nhập
              </Link>
            )}
            
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-white/10"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Mở menu</span>
              {/* Icon menu */}
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-4 space-y-1 backdrop-blur-md bg-[#0a141e]/90">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                ${pathname === item.href 
                  ? 'bg-gradient-to-r from-[#F44336] to-[#e53935] text-white' 
                  : 'text-white hover:bg-white/10 hover:text-[#F44336]'}
              `}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Đăng xuất nếu đã đăng nhập (mobile) */}
          {!loading && isAuthenticated && (
            <button
              onClick={handleSignOut}
              className="w-full text-left block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 text-white hover:bg-white/10 hover:text-[#F44336]"
            >
              Đăng Xuất ({user?.email?.split('@')[0]})
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}