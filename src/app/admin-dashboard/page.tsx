'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/tien_ich/supabase';
import QuanLyAdmin from '@/components/admin/QuanLyAdmin';
import Link from 'next/link';
import type { Session } from '@supabase/supabase-js';
import { AuthProvider } from '@/context/AuthContext';

type AdminInfo = {
  id: string;
  email: string;
  ten: string;
  vai_tro: 'super_admin' | 'admin_con';
  ngay_tao: string;
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setSession(data.session);
        
        if (data.session) {
          // Lấy thông tin admin
          const { data: adminData, error: adminError } = await supabase
            .from('nguoi_dung')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
          
          if (adminError) throw adminError;
          setAdminInfo(adminData);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    
    getSession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg max-w-md w-full">
          <h1 className="text-xl font-bold text-red-700 mb-2">Lỗi</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex flex-col space-y-2">
            <Link 
              href="/admin/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
            >
              Quay lại trang đăng nhập
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg max-w-md w-full">
          <h1 className="text-xl font-bold text-yellow-700 mb-2">Chưa đăng nhập</h1>
          <p className="text-yellow-600 mb-4">Vui lòng đăng nhập để tiếp tục.</p>
          <div className="flex flex-col space-y-2">
            <Link 
              href="/admin/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!adminInfo || !['super_admin', 'admin_con'].includes(adminInfo.vai_tro)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg max-w-md w-full">
          <h1 className="text-xl font-bold text-red-700 mb-2">Không có quyền truy cập</h1>
          <p className="text-red-600 mb-4">Bạn không có quyền truy cập trang quản trị.</p>
          <p className="text-sm text-gray-500 mb-4">Thông tin tài khoản:</p>
          <pre className="bg-gray-100 p-2 rounded text-xs mb-4 overflow-auto">
            {JSON.stringify({
              id: session.user.id,
              email: session.user.email,
              adminInfo: adminInfo || 'Không có'
            }, null, 2)}
          </pre>
          <div className="flex flex-col space-y-2">
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/admin/login';
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <main>
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {adminInfo.email} ({adminInfo.vai_tro === 'super_admin' ? 'Super Admin' : 'Admin Con'})
                </span>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = '/admin/login';
                  }}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <QuanLyAdmin />
      </main>
    </AuthProvider>
  );
} 