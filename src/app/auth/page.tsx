'use client';

import { useState } from 'react';
import Image from 'next/image';
import LoginForm from '@/components/Auth/LoginForm';
import RegisterForm from '@/components/Auth/RegisterForm';
import Link from 'next/link';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-[var(--overwatch-black)] flex flex-col">
      {/* Header */}
      <header className="bg-[var(--overwatch-dark-blue)]/80 backdrop-blur-md border-b border-[var(--overwatch-blue)]/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-40">
              <Image
                src="/images/overwatch_logo.png"
                alt="Overwatch Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          
          <Link href="/" className="text-white hover:text-[var(--overwatch-blue)] transition-colors">
            Quay lại trang chủ
          </Link>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl bg-[#0A1622] rounded-xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-[var(--overwatch-blue)]/10">
          {/* Grid layout */}
          <div className="grid md:grid-cols-2 min-h-[600px]">
            {/* Left side - Image/Graphic */}
            <div className="relative hidden md:block bg-gradient-to-br from-[#1A3A63] to-[#0D1B2A]">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[var(--overwatch-blue)]/5 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute top-20 right-20 w-32 h-32 bg-[var(--overwatch-blue)]/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
              </div>
              <div className="relative h-full flex flex-col items-center justify-center text-center p-8 z-10">
                <div className="mb-6">
                  <Image
                    src="/images/overwatch_logo.png"
                    alt="Overwatch"
                    width={250}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {activeTab === 'login' ? 'Chào mừng trở lại!' : 'Tham gia với chúng tôi!'}
                </h3>
                <p className="text-white/70 max-w-sm">
                  {activeTab === 'login' 
                    ? 'Đăng nhập để trải nghiệm thế giới Overwatch và theo dõi tiến trình chiến đấu của bạn.' 
                    : 'Tạo tài khoản để bắt đầu hành trình trong thế giới Overwatch với hàng nghìn người chơi khác.'}
                </p>
              </div>
            </div>
            
            {/* Right side - Form */}
            <div className="p-8 flex flex-col">
              {/* Tab switching */}
              <div className="flex mb-8">
                <button 
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-3 text-center font-bold transition-colors border-b-2 ${
                    activeTab === 'login'
                      ? 'text-[var(--overwatch-blue)] border-[var(--overwatch-blue)]'
                      : 'text-white/50 border-transparent hover:text-white/70'
                  }`}
                >
                  Đăng Nhập
                </button>
                <button 
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-3 text-center font-bold transition-colors border-b-2 ${
                    activeTab === 'register'
                      ? 'text-[var(--overwatch-blue)] border-[var(--overwatch-blue)]'
                      : 'text-white/50 border-transparent hover:text-white/70'
                  }`}
                >
                  Đăng Ký
                </button>
              </div>
              
              {/* Display the appropriate form */}
              <div className="flex-grow flex items-center">
                {activeTab === 'login' ? (
                  <LoginForm onSwitchToRegister={() => setActiveTab('register')} />
                ) : (
                  <RegisterForm onSwitchToLogin={() => setActiveTab('login')} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#061018] py-4 text-center text-white/50 text-sm border-t border-[var(--overwatch-blue)]/10">
        <p>Đây là dự án clone với mục đích học tập, không phải trang web chính thức của Overwatch.</p>
      </footer>
    </div>
  );
} 