'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/tien_ich/supabase';
import { useRouter } from 'next/navigation';

type AdminInfo = {
  id: string;
  email: string;
  ten: string;
  vai_tro: 'super_admin' | 'admin_con';
  ngay_tao: string;
};

type AuthContextType = {
  adminInfo: AdminInfo | null;
  loading: boolean;
  error: string | null;
  refreshAdminInfo: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  adminInfo: null,
  loading: true,
  error: null,
  refreshAdminInfo: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const refreshAdminInfo = async () => {
    try {
      setLoading(true);
      
      // Kiểm tra session
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        setAdminInfo(null);
        return;
      }
      
      // Lấy thông tin admin
      const { data, error } = await supabase
        .from('nguoi_dung')
        .select('*')
        .eq('id', sessionData.session.user.id)
        .single();
      
      if (error) throw error;
      
      if (!data || !['super_admin', 'admin_con'].includes(data.vai_tro)) {
        setAdminInfo(null);
      } else {
        setAdminInfo(data as AdminInfo);
      }
      
      setError(null);
    } catch (err) {
      console.error('Lỗi khi tải thông tin admin:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
      setAdminInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAdminInfo(null);
    router.push('/admin/login');
  };

  useEffect(() => {
    refreshAdminInfo();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          refreshAdminInfo();
        } else if (event === 'SIGNED_OUT') {
          setAdminInfo(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ adminInfo, loading, error, refreshAdminInfo, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
} 