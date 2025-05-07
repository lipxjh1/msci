'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function TokenFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-[#041019] to-[#020A10] pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo và thông tin */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <Image 
                  src="/images/logo.png" 
                  alt="M-SCI Logo" 
                  width={120} 
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <p className="text-white/70 text-sm mb-4">
              Nền tảng Metaverse Gaming đầu tiên tích hợp hoàn toàn với Token Economy.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/msci_token" className="text-white/60 hover:text-[#FFD700] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="https://t.me/MSCIToken" className="text-white/60 hover:text-[#FFD700] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.372-12 12 0 6.627 5.374 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm-3.228 18c-.193 0-.39-.03-.581-.089-.243-.083-.417-.273-.477-.522l-.571-2.779c-.004-.013-.005-.026-.006-.039-.079-.433.329-.797.762-.797h1.428c.411 0 .78.257.926.643l.455 1.193c.079.209.283.348.507.348h2.571c.224 0 .428-.139.507-.348l.455-1.193c.146-.386.515-.643.926-.643h1.428c.433 0 .841.364.762.797-.001.013-.002.026-.006.039l-.571 2.779c-.06.249-.234.439-.477.522-.191.059-.388.089-.581.089h-7.028z" />
                </svg>
              </a>
              <a href="https://discord.gg/msci-game" className="text-white/60 hover:text-[#FFD700] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a href="https://medium.com/@msci-token" className="text-white/60 hover:text-[#FFD700] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Liên kết */}
          <div>
            <h4 className="font-rajdhani text-lg font-bold text-white mb-4">Khám Phá</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/game" className="text-white/70 hover:text-[#FFD700] transition-colors">
                  Game
                </Link>
              </li>
              <li>
                <Link href="/tokenomics" className="text-white/70 hover:text-[#FFD700] transition-colors">
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-white/70 hover:text-[#FFD700] transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-white/70 hover:text-[#FFD700] transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Tài liệu */}
          <div>
            <h4 className="font-rajdhani text-lg font-bold text-white mb-4">Tài Liệu</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/whitepaper" className="text-white/70 hover:text-[#FFD700] transition-colors">
                  Whitepaper
                </Link>
              </li>
              <li>
                <a href="/documents/tokenomics.pdf" className="text-white/70 hover:text-[#FFD700] transition-colors">
                  Tokenomics PDF
                </a>
              </li>
              <li>
                <a href="https://github.com/msci-token" className="text-white/70 hover:text-[#FFD700] transition-colors">
                  Smart Contracts
                </a>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-[#FFD700] transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Đăng ký */}
          <div>
            <h4 className="font-rajdhani text-lg font-bold text-white mb-4">Đăng Ký Nhận Tin</h4>
            <p className="text-white/70 text-sm mb-4">
              Nhận thông báo mới nhất về token M-SCI và game.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email của bạn"
                className="bg-white/5 border border-white/20 rounded-l-md px-4 py-2 text-white w-full focus:outline-none focus:border-[#FFD700]/50"
              />
              <button className="bg-[#FFD700] hover:bg-[#FFD700]/80 text-black font-medium px-4 py-2 rounded-r-md transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-white/10 mb-8"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {currentYear} M-SCI. Bảo lưu mọi quyền.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-white/50 text-sm hover:text-white/80 transition-colors">
              Chính sách Bảo mật
            </Link>
            <Link href="/terms" className="text-white/50 text-sm hover:text-white/80 transition-colors">
              Điều khoản Sử dụng
            </Link>
            <Link href="/contact" className="text-white/50 text-sm hover:text-white/80 transition-colors">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 