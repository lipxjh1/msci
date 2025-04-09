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
  const [webhookStatus, setWebhookStatus] = useState<{
    ok: boolean;
    result?: {
      url?: string;
      has_custom_certificate?: boolean;
      pending_update_count?: number;
      last_error_date?: number;
      last_error_message?: string;
      max_connections?: number;
    };
    description?: string;
    error_code?: number;
  } | null>(null);
  const [showWebhookDetails, setShowWebhookDetails] = useState(false);
  const { signInWithTelegram } = useAuth();
  const router = useRouter();

  // Hàm kiểm tra webhook
  const checkWebhook = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = prompt('Nhập Telegram Bot Token để kiểm tra webhook:');
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      const response = await fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`);
      const data = await response.json();
      
      setWebhookStatus(data);
      setShowWebhookDetails(true);
    } catch (err) {
      console.error('Error checking webhook:', err);
      setError(err instanceof Error ? err.message : 'Lỗi kiểm tra webhook');
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm setup webhook
  const setupWebhook = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/setup-telegram-chats');
      const data = await response.json();
      
      if (data.success) {
        alert('Webhook đã được cài đặt thành công. Vui lòng thử lại đăng nhập Telegram.');
      } else {
        setError(data.error || 'Lỗi cài đặt webhook');
      }
    } catch (err) {
      console.error('Error setting up webhook:', err);
      setError(err instanceof Error ? err.message : 'Lỗi cài đặt webhook');
    } finally {
      setIsLoading(false);
    }
  };

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

        // Tạo callback function cho Telegram login
        window.onTelegramAuth = (user: TelegramAuthData) => {
          console.log('Telegram auth callback received:', user);
          setIsLoading(true);
          setError(null);
          
          signInWithTelegram(user)
            .then((result) => {
              console.log('Auth result:', result);
              if (result?.success) {
                console.log('Authentication successful, redirecting...');
                router.push('/');
              } else {
                console.error('Authentication failed:', result?.error);
                setError(result?.error || 'Đăng nhập thất bại');
              }
            })
            .catch((err) => {
              console.error('Error during Telegram auth:', err);
              setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
            })
            .finally(() => {
              setIsLoading(false);
            });
        };

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
        script.setAttribute('data-userpic', 'false');
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
  }, [botName, signInWithTelegram, router]);

  return (
    <div className={`${className} flex flex-col items-center`}>
      <div 
        ref={containerRef}
        className="telegram-login-container min-h-[48px] flex items-center justify-center mb-4"
      ></div>
      
      {/* Các nút chức năng */}
      <div className="flex flex-col gap-2 w-full">
        {/* Nút Bypass đăng nhập tạm thời */}
        <button
          onClick={handleBypassLogin}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full"
        >
          {isLoading ? 'Đang xử lý...' : 'Đăng nhập tạm thời (Bypass)'}
        </button>
        
        {/* Nút cài đặt webhook */}
        <button
          onClick={setupWebhook}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full"
        >
          {isLoading ? 'Đang xử lý...' : 'Cài đặt Webhook'}
        </button>
        
        {/* Nút kiểm tra webhook */}
        <button
          onClick={checkWebhook}
          disabled={isLoading}
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full"
        >
          {isLoading ? 'Đang xử lý...' : 'Kiểm tra Webhook'}
        </button>
      </div>
      
      {/* Hiển thị lỗi */}
      {error && (
        <div className="mt-3 p-3 bg-red-100 border border-red-300 text-red-800 rounded text-sm w-full">
          Lỗi: {error}
        </div>
      )}
      
      {/* Hiển thị thông tin webhook */}
      {showWebhookDetails && webhookStatus && (
        <div className="mt-3 p-3 bg-gray-100 border border-gray-300 text-gray-800 rounded text-sm w-full overflow-auto max-h-[200px]">
          <h4 className="font-bold mb-1">Thông tin Webhook:</h4>
          <pre>{JSON.stringify(webhookStatus, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Khai báo cho TypeScript
declare global {
  interface Window {
    onTelegramAuth: (user: TelegramAuthData) => void;
  }
} 