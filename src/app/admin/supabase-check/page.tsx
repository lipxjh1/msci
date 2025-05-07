'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/tien_ich/supabase';

export default function SupabaseCheckPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('Đang kiểm tra kết nối...');
  const [configInfo, setConfigInfo] = useState<string | null>(null);
  const [apiKeyInfo, setApiKeyInfo] = useState<string | null>(null);
  const [testQueryResult, setTestQueryResult] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Kiểm tra cấu hình Supabase
  useEffect(() => {
    const checkConfig = () => {
      // Hiển thị thông tin URL Supabase
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
      
      if (supabaseUrl) {
        setConfigInfo(`URL Supabase: ${supabaseUrl}`);
      } else {
        setConfigInfo('NEXT_PUBLIC_SUPABASE_URL chưa được cấu hình');
      }
      
      if (supabaseKey) {
        // Hiển thị 5 ký tự đầu và 5 ký tự cuối của API key để bảo mật
        const keyLength = supabaseKey.length;
        if (keyLength > 10) {
          const maskedKey = supabaseKey.substring(0, 5) + '...' + supabaseKey.substring(keyLength - 5);
          setApiKeyInfo(`API Key: ${maskedKey} (${keyLength} ký tự)`);
        } else {
          setApiKeyInfo(`API Key: [quá ngắn] (${keyLength} ký tự)`);
        }
      } else {
        setApiKeyInfo('NEXT_PUBLIC_SUPABASE_ANON_KEY chưa được cấu hình');
      }
    };
    
    checkConfig();
  }, []);

  // Kiểm tra kết nối đến Supabase
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setLoading(true);
        
        // Kiểm tra kết nối bằng cách truy vấn đơn giản
        const { data, error } = await supabase
          .from('vai_tro')
          .select('*')
          .limit(1);
        
        if (error) {
          throw error;
        }
        
        setIsConnected(true);
        setConnectionStatus('Kết nối thành công đến Supabase!');
        setTestQueryResult(`Kết quả truy vấn: ${JSON.stringify(data)}`);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
        setConnectionStatus('Lỗi kết nối đến Supabase');
        setError(errorMessage);
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkConnection();
  }, []);

  // Kiểm tra trực tiếp bảng nguoi_dung
  const checkNguoiDungTable = async () => {
    try {
      setLoading(true);
      
      // Thử lấy dữ liệu từ bảng nguoi_dung
      const { data, error } = await supabase
        .from('nguoi_dung')
        .select('*')
        .limit(5);
      
      if (error) throw error;
      
      setTestQueryResult(`Dữ liệu bảng nguoi_dung: ${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      setError(`Lỗi khi truy vấn bảng nguoi_dung: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Thử tạo tài khoản admin nếu chưa có
  const createAdminAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Kiểm tra đã có session chưa
      const { data: sessionData } = await supabase.auth.getSession();
      let userId = sessionData.session?.user.id;
      
      // Nếu chưa đăng nhập, thử đăng ký tài khoản mới
      if (!userId) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: 'vinh@gmail.com',
          password: 'Admin@123'
        });
        
        if (authError) throw authError;
        
        userId = authData.user?.id;
        
        if (!userId) {
          throw new Error('Không thể tạo tài khoản người dùng');
        }
      }
      
      // Thêm vào bảng nguoi_dung
      const { data, error } = await supabase
        .from('nguoi_dung')
        .insert({
          id: userId,
          email: 'vinh@gmail.com',
          ten: 'Super Admin',
          vai_tro: 'super_admin',
          ngay_tao: new Date().toISOString()
        })
        .select();
      
      if (error) throw error;
      
      setTestQueryResult(`Đã tạo tài khoản admin: ${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      setError(`Lỗi khi tạo tài khoản admin: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Kiểm tra kết nối Supabase</h1>
        
        <div className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Thông tin cấu hình</h2>
          <div className="space-y-2">
            <p className={!configInfo || configInfo.includes('chưa được cấu hình') ? 'text-red-600' : 'text-green-600'}>
              {configInfo || 'Đang kiểm tra...'}
            </p>
            <p className={!apiKeyInfo || apiKeyInfo.includes('chưa được cấu hình') ? 'text-red-600' : 'text-green-600'}>
              {apiKeyInfo || 'Đang kiểm tra...'}
            </p>
          </div>
        </div>
        
        <div className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Trạng thái kết nối</h2>
          <p className={isConnected ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
            {connectionStatus}
          </p>
          {error && (
            <div className="mt-2 p-3 bg-red-50 text-red-800 rounded">
              <p className="font-medium">Lỗi:</p>
              <p className="whitespace-pre-wrap">{error}</p>
            </div>
          )}
        </div>
        
        {testQueryResult && (
          <div className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold mb-2">Kết quả truy vấn</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-60">
              {testQueryResult}
            </pre>
          </div>
        )}
        
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={checkNguoiDungTable}
            disabled={loading || !isConnected}
            className={`py-2 px-4 rounded font-medium ${
              loading || !isConnected ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Kiểm tra bảng nguoi_dung
          </button>
          
          <button
            onClick={createAdminAccount}
            disabled={loading || !isConnected}
            className={`py-2 px-4 rounded font-medium ${
              loading || !isConnected ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            Tạo tài khoản admin mặc định
          </button>
          
          <a
            href="/admin/login"
            className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded text-center font-medium mt-2"
          >
            Quay lại trang đăng nhập
          </a>
        </div>
      </div>
    </div>
  )
} 