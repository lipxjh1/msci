import { useState, useEffect } from 'react';
import { useSupabase } from '@/context/SupabaseContext';
import { User } from '@supabase/supabase-js';
import { TelegramAuthData } from '@/types/telegram';

export function useAuth() {
  const supabase = useSupabase();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra nếu đã có người dùng đăng nhập
    const checkUser = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Đã xảy ra lỗi khi kiểm tra trạng thái đăng nhập');
        }
      } finally {
        setLoading(false);
      }
    };

    // Chạy kiểm tra ban đầu
    checkUser();

    // Thiết lập lắng nghe sự thay đổi trạng thái xác thực
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
    });

    // Clean up
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  // Đăng nhập với email và mật khẩu
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Đăng nhập thất bại');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Đăng ký với email và mật khẩu
  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Đăng ký thất bại');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Đăng nhập bằng Telegram
  const signInWithTelegram = async (telegramData: TelegramAuthData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Executing signInWithTelegram with data:', JSON.stringify(telegramData, null, 2));
      
      // Xác thực dữ liệu từ Telegram callback với backend
      const response = await fetch('/api/auth/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramData),
      });
      
      const data = await response.json();
      console.log('Telegram auth response:', JSON.stringify(data, null, 2));
      
      if (!response.ok) {
        console.error('Authentication failed:', data.error);
        throw new Error(data.error || 'Đăng nhập bằng Telegram thất bại');
      }

      if (!data.success) {
        console.error('Authentication failed:', data.error);
        throw new Error(data.error || 'Đăng nhập bằng Telegram thất bại');
      }

      // Sử dụng access token từ backend để đăng nhập vào Supabase
      if (data.session) {
        console.log('Setting session in client...');
        const { error } = await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });
        
        if (error) {
          console.error('Error setting session:', error);
          throw error;
        }
        
        // Refresh user data
        const { data: userData } = await supabase.auth.getUser();
        setUser(userData.user);
        
        console.log('Session set successfully');
        return { success: true };
      } else {
        console.error('No session data received from server');
        throw new Error('Không nhận được dữ liệu phiên đăng nhập');
      }
    } catch (error) {
      console.error('Error in signInWithTelegram:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Đăng nhập bằng Telegram thất bại');
      }
      return { success: false, error: error instanceof Error ? error.message : 'Đăng nhập thất bại' };
    } finally {
      setLoading(false);
    }
  };

  // Đăng xuất
  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Đăng xuất thất bại');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithTelegram,
    signOut,
    isAuthenticated: !!user
  };
} 