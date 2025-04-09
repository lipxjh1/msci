'use client';

import { useEffect, useRef, useState } from 'react';
import { TelegramAuthData } from '@/types/telegram';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface TelegramLoginButtonProps {
  botName: string;
  className?: string;
}

export default function TelegramLoginButton({
  botName,
  className = '',
}: TelegramLoginButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithTelegram } = useAuth();
  const router = useRouter();

  // Thêm hàm bypass đăng nhập với Telegram
  const handleBypassLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Bypassing Telegram login with mock data');
      
      // Tạo dữ liệu giả lập cho Telegram
      const mockData: TelegramAuthData = {
        id: Date.now(), // ID ngẫu nhiên
        first_name: "Telegram User",
        auth_date: Math.floor(Date.now() / 1000),
        hash: "bypass_login_hash"
      };
      
      const result = await signInWithTelegram(mockData);
      
      if (result?.success) {
        console.log('Bypass login successful, redirecting...');
        router.push('/');
      } else {
        setError(result?.error || 'Đăng nhập thất bại');
      }
    } catch (err: unknown) {
      console.error('Error during bypass login:', err);
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Setting up Telegram login with bot name:', botName);

      try {
        // Xóa script cũ nếu có
        const existingScript = document.getElementById('telegram-login-script');
        if (existingScript) {
          existingScript.remove();
        }

        if (!botName) {
          console.error('Bot name is missing or invalid');
          setError('Tên bot Telegram chưa được cấu hình');
          return;
        }

        // Tạo script mới
        const script = document.createElement('script');
        script.id = 'telegram-login-script';
        script.src = 'https://telegram.org/js/telegram-widget.js';
        script.async = true;
        
        script.onerror = (e) => {
          console.error('Error loading Telegram script:', e);
          setError('Không thể tải widget đăng nhập Telegram');
        };
        
        script.setAttribute('data-telegram-login', botName);
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-radius', '8');
        script.setAttribute('data-request-access', 'write');
        script.setAttribute('data-userpic', 'false');
        script.setAttribute('data-lang', 'vi');
        
        // QUAN TRỌNG: Sử dụng auth-url thay vì callback JavaScript
        script.setAttribute('data-auth-url', `${window.location.origin}/api/auth/telegram-callback`);
        
        console.log('Telegram auth URL:', `${window.location.origin}/api/auth/telegram-callback`);

        // Thêm script vào container
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(script);
        }
      } catch (err) {
        console.error('Error setting up Telegram login button:', err);
        setError('Lỗi cài đặt nút đăng nhập Telegram');
      }
    }
  }, [botName]);

  return (
    <div className={`${className} flex flex-col items-center`}>
      <div 
        ref={containerRef}
        className="telegram-login-container min-h-[48px] flex items-center justify-center"
      ></div>
      
      {/* Nút Bypass đăng nhập tạm thời */}
      <button
        onClick={handleBypassLogin}
        disabled={isLoading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full"
      >
        {isLoading ? 'Đang xử lý...' : 'Đăng nhập tạm thời (Bypass)'}
      </button>
      
      {error && (
        <div className="mt-2 text-sm text-red-500">
          Lỗi: {error}
        </div>
      )}
      
      {/* Fallback UI nếu script không tải được */}
      <noscript>
        <div className="flex items-center justify-center bg-[#2AABEE] hover:bg-[#229ED9] text-white py-2 px-4 rounded transition-colors cursor-pointer">
          <span>Đăng nhập với Telegram</span>
        </div>
      </noscript>
    </div>
  );
}

// Khai báo cho TypeScript
declare global {
  interface Window {
    onTelegramAuth: (user: TelegramAuthData) => void;
  }
} 