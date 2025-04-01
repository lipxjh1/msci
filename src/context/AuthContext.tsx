'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/tien_ich/supabase';
import type { User } from '@supabase/supabase-js';
import type { NguoiDung } from '@/loai';

type AuthContextType = {
  user: User | null;
  adminInfo: NguoiDung | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  adminInfo: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminInfo, setAdminInfo] = useState<NguoiDung | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lắng nghe sự thay đổi trạng thái auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Lấy thông tin admin từ database
          const { data } = await supabase
            .from('nguoi_dung')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          setAdminInfo(data);
        } else {
          setAdminInfo(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, adminInfo, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 