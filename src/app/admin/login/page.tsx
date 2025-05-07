'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/tien_ich/supabase';
import type { User } from '@supabase/supabase-js';

type AdminData = {
  vai_tro: 'super_admin' | 'admin_con';
  ten: string;
};

type DebugInfo = {
  authSuccess?: boolean;
  userId?: string;
  email?: string;
  dbCheckError?: string;
  dbQuery?: string;
  dbCheckSuccess?: boolean;
  adminData?: AdminData;
  repairing?: boolean;
  currentAuthUser?: User;
  repairError?: string;
  repairSuccess?: boolean;
  message?: string;
  repairAttemptError?: string;
  supabaseConfig?: {
    urlConfigured: boolean;
    keyLength: number;
  };
  supabaseConfigError?: boolean;
  urlConfigured?: boolean;
  keyConfigured?: boolean;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [formData, setFormData] = useState({
    email: 'vinh@gmail.com',
    password: 'Admin@123'
  });
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);

  // Kiểm tra session khi trang tải
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setLoginSuccess(true);
        router.push('/admin-dashboard');
      }
    };
    
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDebugInfo(null);
    setLoading(true);
    setLoginSuccess(false);

    // Kiểm tra biến môi trường Supabase trước khi kết nối
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    if (!supabaseUrl || !supabaseKey) {
      setError('Lỗi cấu hình: Biến môi trường Supabase chưa được thiết lập');
      setDebugInfo({
        supabaseConfigError: true,
        urlConfigured: !!supabaseUrl,
        keyConfigured: !!supabaseKey
      });
      setLoading(false);
      return;
    }

    try {
      // Đăng nhập với Supabase Auth
      console.log("Đang thử đăng nhập với:", formData.email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        console.error("Lỗi đăng nhập:", error);
        
        // Xử lý lỗi cụ thể
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Sai thông tin đăng nhập. Vui lòng kiểm tra email và mật khẩu.");
        } else if (error.message.includes("Email not confirmed")) {
          throw new Error("Email chưa được xác nhận. Vui lòng kiểm tra hộp thư và xác nhận email.");
        } else {
          throw error;
        }
      }

      if (!data.user) {
        throw new Error('Không có thông tin người dùng');
      }

      setDebugInfo({
        authSuccess: true,
        userId: data.user.id,
        email: data.user.email,
        supabaseConfig: {
          urlConfigured: true,
          keyLength: supabaseKey.length
        }
      });
      
      console.log("Đăng nhập thành công, kiểm tra quyền admin...");

      // Kiểm tra xem người dùng có phải là admin không
      const { data: adminData, error: adminError } = await supabase
        .from('nguoi_dung')
        .select('vai_tro, ten')
        .eq('id', data.user.id)
        .single();

      if (adminError) {
        console.error("Lỗi truy vấn bảng nguoi_dung:", adminError);
        setDebugInfo(prev => ({
          ...prev,
          dbCheckError: adminError.message,
          dbQuery: `SELECT vai_tro, ten FROM nguoi_dung WHERE id = '${data.user.id}'`
        }));
        throw adminError;
      }

      setDebugInfo(prev => ({
        ...prev,
        dbCheckSuccess: true,
        adminData
      }));

      if (!adminData || !['super_admin', 'admin_con'].includes(adminData.vai_tro)) {
        throw new Error('Bạn không có quyền truy cập trang admin');
      }

      // Đăng nhập thành công
      setLoginSuccess(true);
      console.log("Đăng nhập thành công, chuyển hướng đến trang admin...");
      
      // Chuyển hướng đến trang admin-dashboard sau 1 giây
      setTimeout(() => {
        router.push('/admin-dashboard');
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi đăng nhập';
      setError(errorMessage);
      
      // Kiểm tra và chèn bảng nguoi_dung nếu cần
      if (errorMessage.includes('không tìm thấy') || errorMessage.includes('not found')) {
        try {
          // Lấy user hiện tại
          const { data: userData } = await supabase.auth.getUser();
          if (userData.user) {
            setDebugInfo(prev => ({
              ...prev,
              repairing: true,
              currentAuthUser: userData.user
            }));
            
            // Thêm vào bảng nguoi_dung
            const { error: insertError } = await supabase
              .from('nguoi_dung')
              .insert({
                id: userData.user.id,
                email: userData.user.email,
                ten: 'Super Admin',
                vai_tro: 'super_admin',
                ngay_tao: new Date().toISOString()
              });
              
            if (insertError) {
              setDebugInfo(prev => ({
                ...prev,
                repairError: insertError.message
              }));
            } else {
              setDebugInfo(prev => ({
                ...prev,
                repairSuccess: true,
                message: 'Đã tự động sửa lỗi. Vui lòng thử đăng nhập lại.'
              }));
            }
          }
        } catch (repairError) {
          setDebugInfo(prev => ({
            ...prev,
            repairAttemptError: repairError instanceof Error ? repairError.message : 'Lỗi không xác định'
          }));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleManualRedirect = () => {
    router.push('/admin-dashboard');
  };

  // Tạo tài khoản admin mặc định
  const createAdminAccount = async () => {
    try {
      setIsCreatingAdmin(true);
      setError(null);
      
      // Đăng ký tài khoản mới trước
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });
      
      if (authError) {
        if (authError.message.includes("User already registered")) {
          // Nếu tài khoản đã tồn tại, tiếp tục kiểm tra và tạo trong bảng nguoi_dung
          console.log("Tài khoản đã tồn tại, đang đăng nhập...");
          const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
          });
          
          if (loginError) throw loginError;
          
          if (!loginData.user) {
            throw new Error('Không thể đăng nhập với tài khoản đã tạo');
          }
          
          // Sử dụng ID người dùng từ phiên đăng nhập thành công
          const userId = loginData.user.id;
          
          // Kiểm tra xem có tồn tại trong bảng nguoi_dung chưa
          const { data: existingUser } = await supabase
            .from('nguoi_dung')
            .select('id')
            .eq('id', userId)
            .single();
          
          if (existingUser) {
            setDebugInfo({
              repairSuccess: true,
              message: 'Tài khoản admin đã tồn tại. Vui lòng đăng nhập.'
            });
            return;
          }
          
          // Thêm vào bảng nguoi_dung
          const { error: insertError } = await supabase
            .from('nguoi_dung')
            .insert({
              id: userId,
              email: formData.email,
              ten: 'Super Admin',
              vai_tro: 'super_admin',
              ngay_tao: new Date().toISOString()
            });
            
          if (insertError) throw insertError;
          
          setDebugInfo({
            repairSuccess: true,
            message: 'Đã tạo thông tin admin thành công. Vui lòng đăng nhập lại.'
          });
          
        } else {
          throw authError;
        }
      } else {
        // Nếu đăng ký thành công, thêm vào bảng nguoi_dung
        const userId = authData.user?.id;
        
        if (!userId) {
          throw new Error('Không thể tạo tài khoản người dùng');
        }
        
        // Thêm vào bảng nguoi_dung
        const { error: insertError } = await supabase
          .from('nguoi_dung')
          .insert({
            id: userId,
            email: formData.email,
            ten: 'Super Admin',
            vai_tro: 'super_admin',
            ngay_tao: new Date().toISOString()
          });
          
        if (insertError) throw insertError;
        
        setDebugInfo({
          repairSuccess: true,
          message: 'Đã tạo tài khoản admin thành công. Vui lòng kiểm tra email để xác minh tài khoản.'
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo tài khoản admin';
      setError(`Lỗi khi tạo tài khoản admin: ${errorMessage}`);
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Vui lòng đăng nhập với tài khoản admin
          </p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {error}
                </h3>
                {debugInfo?.repairSuccess && (
                  <p className="mt-2 text-sm text-red-700">
                    {debugInfo.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {loginSuccess && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Đăng nhập thành công
                </h3>
                <p className="mt-2 text-sm text-green-700">
                  Đang chuyển hướng đến trang quản trị...
                </p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mật khẩu</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Mật khẩu"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={loading || loginSuccess || isCreatingAdmin}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                (loading || loginSuccess || isCreatingAdmin) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : loginSuccess ? (
                <span>Đăng nhập thành công</span>
              ) : (
                <span>Đăng nhập</span>
              )}
            </button>
            
            <button
              type="button"
              onClick={createAdminAccount}
              disabled={loading || loginSuccess || isCreatingAdmin}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                (loading || loginSuccess || isCreatingAdmin) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isCreatingAdmin ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang tạo tài khoản admin...</span>
                </>
              ) : (
                <span>Tạo tài khoản admin mặc định</span>
              )}
            </button>
            
            {debugInfo && debugInfo.dbCheckSuccess && (
              <button
                type="button"
                onClick={handleManualRedirect}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Chuyển hướng đến trang admin ngay
              </button>
            )}
            
            <a
              href="/admin/supabase-check"
              className="text-sm text-blue-600 hover:text-blue-800 text-center mt-1"
            >
              Gặp vấn đề khi đăng nhập? Kiểm tra kết nối Supabase
            </a>
          </div>
        </form>
        
        {debugInfo && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Thông tin gỡ lỗi:</h3>
            <pre className="text-xs overflow-auto max-h-48">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
            
            {debugInfo.dbCheckSuccess && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-700">
                  Nếu chuyển hướng tự động không hoạt động, bạn có thể nhấn nút &quot;Chuyển hướng đến trang admin ngay&quot; ở trên.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 