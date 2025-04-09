'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { TelegramAuthData } from '@/types/telegram';

interface TelegramLoginButtonProps {
  botName: string;
  className?: string;
}

export default function TelegramLoginButton({
  botName,
  className = '',
}: TelegramLoginButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { signInWithTelegram } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Setting up Telegram login with bot name:', botName);

      // Tạo function xử lý callback từ Telegram
      window.onTelegramAuth = (user: TelegramAuthData) => {
        console.log('Telegram auth callback received:', user);
        if (user) {
          setIsLoading(true);
          setError(null);
          
          signInWithTelegram(user)
            .then((result) => {
              console.log('Auth result:', result);
              if (result?.success) {
                console.log('Authentication successful, redirecting...');
                window.location.href = '/';
              } else if (result?.error) {
                console.error('Authentication failed:', result.error);
                setError(result.error);
              }
            })
            .catch((error) => {
              console.error('Error during Telegram auth:', error);
              setError(error instanceof Error ? error.message : 'Đăng nhập thất bại');
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      };

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
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        script.setAttribute('data-request-access', 'write');
        script.setAttribute('data-lang', 'vi');

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
  }, [botName, signInWithTelegram]);

  return (
    <div className={`${className} flex flex-col items-center`}>
      <div 
        ref={containerRef}
        className="telegram-login-container min-h-[48px] flex items-center justify-center"
      ></div>
      
      {isLoading && (
        <div className="mt-2 text-sm text-blue-600">
          Đang xử lý đăng nhập...
        </div>
      )}
      
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