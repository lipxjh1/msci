'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/tien_ich/supabase';
import QuanLyAdmin from '@/components/admin/QuanLyAdmin';
import QuanLyHero from '@/components/admin/QuanLyHero';
import QuanLyBaiViet from '@/components/admin/QuanLyBaiViet';
import ChatbotManagement from '@/components/admin/chatbot-management/ChatbotManagement';
import QuanLyThongKe from '@/components/admin/QuanLyThongKe';
import QuanLySocialLinks from '@/components/admin/QuanLySocialLinks';
import { AuthProvider, useAuth } from '@/context/AuthContext';

function AdminDashboardContent() {
  const { adminInfo, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  useEffect(() => {
    // Nếu không có thông tin admin sau khi đã load xong, chuyển về trang login
    if (!loading && !adminInfo) {
      router.push('/admin/login');
    }
  }, [adminInfo, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-700">Đang tải trang quản trị...</p>
        </div>
      </div>
    );
  }

  if (!adminInfo) {
    return null; // Sẽ được redirect bởi useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Trang quản trị Admin
          </h1>
          <div className="flex items-center gap-4">
            {adminInfo && (
              <div className="text-right">
                <p className="text-sm text-gray-700">Xin chào, {adminInfo.ten}</p>
                <p className="text-xs text-gray-500">{adminInfo.vai_tro === 'super_admin' ? 'Admin cấp cao' : 'Admin thường'}</p>
              </div>
            )}
            <button
              onClick={signOut}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Bảng điều khiển */}
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`${
                  activeTab === 'dashboard'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('quan-ly-admin')}
                className={`${
                  activeTab === 'quan-ly-admin'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Quản lý Admin
              </button>
              <button
                onClick={() => setActiveTab('quan-ly-hero')}
                className={`${
                  activeTab === 'quan-ly-hero'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Quản lý Anh Hùng
              </button>
              <button
                onClick={() => setActiveTab('quan-ly-bai-viet')}
                className={`${
                  activeTab === 'quan-ly-bai-viet'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Quản lý Bài Viết
              </button>
              <button
                onClick={() => setActiveTab('quan-ly-chatbot')}
                className={`${
                  activeTab === 'quan-ly-chatbot'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Quản lý Chatbot
              </button>
              <button
                onClick={() => setActiveTab('quan-ly-socials')}
                className={`${
                  activeTab === 'quan-ly-socials'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Mạng xã hội
              </button>
              <button
                onClick={() => setActiveTab('thong-ke')}
                className={`${
                  activeTab === 'thong-ke'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Thống kê
              </button>
            </nav>
          </div>

          {/* Nội dung tab */}
          <div className="bg-white p-6 rounded-lg shadow">
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Chào mừng đến với trang quản trị!</h2>
                <p className="mb-4">Bạn đã đăng nhập thành công với quyền admin.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-medium text-blue-800 mb-2">Quản lý Anh Hùng</h3>
                    <p className="text-sm text-blue-600 mb-4">Thêm, sửa, xóa thông tin anh hùng</p>
                    <button 
                      onClick={() => setActiveTab('quan-ly-hero')}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                    >
                      Truy cập
                    </button>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="text-lg font-medium text-green-800 mb-2">Quản lý Bài Viết</h3>
                    <p className="text-sm text-green-600 mb-4">Thêm, sửa, xóa bài viết và tin tức</p>
                    <button 
                      onClick={() => setActiveTab('quan-ly-bai-viet')}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                    >
                      Truy cập
                    </button>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="text-lg font-medium text-purple-800 mb-2">Mạng xã hội</h3>
                    <p className="text-sm text-purple-600 mb-4">Quản lý liên kết mạng xã hội</p>
                    <button 
                      onClick={() => setActiveTab('quan-ly-socials')}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
                    >
                      Truy cập
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quan-ly-admin' && (
              <div>
                <QuanLyAdmin />
              </div>
            )}
            
            {activeTab === 'quan-ly-hero' && (
              <div>
                <QuanLyHero />
              </div>
            )}
            
            {activeTab === 'quan-ly-bai-viet' && (
              <div>
                <QuanLyBaiViet />
              </div>
            )}
            
            {activeTab === 'quan-ly-chatbot' && (
              <div>
                <ChatbotManagement />
              </div>
            )}
            
            {activeTab === 'quan-ly-socials' && (
              <div>
                <QuanLySocialLinks />
              </div>
            )}
            
            {activeTab === 'thong-ke' && (
              <div>
                <QuanLyThongKe />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AuthProvider>
      <AdminDashboardContent />
    </AuthProvider>
  );
} 