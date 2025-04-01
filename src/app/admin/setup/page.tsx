'use client';

import { useState } from 'react';
import Link from 'next/link';

type SetupResult = {
  message: string;
  email?: string;
  password?: string;
  id?: string;
};

export default function AdminSetupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SetupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function setupAdmin() {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/setup-admin');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra khi thiết lập admin');
      }
      
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Thiết lập tài khoản Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Trang này sẽ thiết lập tài khoản Super Admin trong hệ thống
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
              </div>
            </div>
          </div>
        )}
        
        {result && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  {result.message}
                </h3>
                {result.email && (
                  <div className="mt-2 text-sm text-green-700">
                    <p>Email: {result.email}</p>
                    {result.password && <p>Mật khẩu: {result.password}</p>}
                    <p>ID: {result.id}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={setupAdmin}
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Đang thiết lập...' : 'Thiết lập Super Admin'}
          </button>
          
          <Link 
            href="/admin/login"
            className="text-center text-sm text-blue-600 hover:text-blue-800"
          >
            Quay lại trang đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
} 