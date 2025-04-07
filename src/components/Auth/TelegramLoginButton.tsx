import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { TelegramAuthData } from '@/types/telegram';
import Image from 'next/image';

interface TelegramLoginButtonProps {
  botName: string;
  buttonSize?: 'large' | 'medium' | 'small';
  cornerRadius?: number;
  requestAccess?: 'write' | 'read';
  usePic?: boolean;
  className?: string;
}

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: TelegramAuthData) => void;
    };
  }
}

export default function TelegramLoginButton({
  botName,
  buttonSize = 'medium',
  cornerRadius = 10,
  requestAccess = 'write',
  usePic = true,
  className = '',
}: TelegramLoginButtonProps) {
  const { signInWithTelegram } = useAuth();
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Đảm bảo script được thêm vào chỉ một lần
    const telegramScript = document.getElementById('telegram-login-script');
    
    if (!telegramScript) {
      // Thêm callback function cho Telegram
      window.TelegramLoginWidget = {
        dataOnauth: (user: TelegramAuthData) => {
          signInWithTelegram(user);
        },
      };

      // Tạo script element
      const script = document.createElement('script');
      script.id = 'telegram-login-script';
      script.src = 'https://telegram.org/js/telegram-widget.js';
      script.async = true;
      script.setAttribute('data-telegram-login', botName);
      script.setAttribute('data-size', buttonSize);
      script.setAttribute('data-radius', cornerRadius.toString());
      script.setAttribute('data-request-access', requestAccess);
      script.setAttribute('data-userpic', usePic.toString());
      script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
      script.setAttribute('data-lang', 'vi');
      
      // Thêm script vào container
      if (buttonRef.current) {
        buttonRef.current.appendChild(script);
      }
      
      return () => {
        script.remove();
      };
    }
  }, [botName, buttonSize, cornerRadius, requestAccess, usePic, signInWithTelegram]);
  
  return (
    <div 
      ref={buttonRef} 
      className={`relative flex justify-center items-center ${className}`}
    >
      {/* Fallback khi script chưa load hoặc bị chặn */}
      <div className="flex items-center justify-center bg-[#2AABEE] hover:bg-[#229ED9] text-white py-2 px-4 rounded transition-colors cursor-pointer">
        <Image
          src="/images/telegram-logo.png"
          alt="Telegram"
          width={24}
          height={24}
          className="mr-2"
        />
        <span>Đăng nhập với Telegram</span>
      </div>
    </div>
  );
} 