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
      
      // Xác thực dữ liệu từ Telegram callback với backend
      const response = await fetch('/api/auth/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Đăng nhập bằng Telegram thất bại');
      }

      // Sử dụng access token từ backend để đăng nhập vào Supabase
      if (data.session) {
        const { error } = await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });
        
        if (error) throw error;
      }
      
      return data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Đăng nhập bằng Telegram thất bại');
      }
      return null;
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