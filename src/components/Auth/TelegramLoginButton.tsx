'use client';

import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Tạo function xử lý callback từ Telegram
      window.onTelegramAuth = (user: TelegramAuthData) => {
        console.log('Telegram auth success:', user);
        if (user) {
          signInWithTelegram(user)
            .then((result) => {
              console.log('Auth result:', result);
              if (result?.success) {
                window.location.href = '/';
              }
            })
            .catch((error) => {
              console.error('Error during Telegram auth:', error);
            });
        }
      };

      // Xóa script cũ nếu có
      const existingScript = document.getElementById('telegram-login-script');
      if (existingScript) {
        existingScript.remove();
      }

      // Tạo script mới
      const script = document.createElement('script');
      script.id = 'telegram-login-script';
      script.src = 'https://telegram.org/js/telegram-widget.js';
      script.async = true;
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
    }
  }, [botName, signInWithTelegram]);

  return (
    <div className={`${className} flex justify-center`}>
      <div 
        ref={containerRef}
        className="telegram-login-container"
      ></div>
      
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