'use client';

import { useState, useEffect } from 'react';
import { NguoiDung } from '@/loai/nguoi_dung';
import { useAuth } from '@/context/AuthContext';
import AdminList from './admin-management/AdminList';
import AdminForm from './admin-management/AdminForm';
import {
  getDanhSachAdmin,
  deleteAdminCon
} from './admin-management/AdminService';
import { confirmDialog } from '@/tien_ich/giao_dien';

export default function QuanLyAdmin() {
  const { adminInfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [danhSachAdmin, setDanhSachAdmin] = useState<NguoiDung[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [adminDangXoa, setAdminDangXoa] = useState<string | null>(null);

  // Lấy danh sách admin
  const loadAdminList = async () => {
    try {
      setLoading(true);
      const admins = await getDanhSachAdmin();
      setDanhSachAdmin(admins);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách admin');
      console.error('Lỗi khi tải danh sách admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminList();
  }, []);

  // Xử lý xóa admin
  const handleXoaAdmin = async (adminId: string) => {
    if (!await confirmDialog('Bạn có chắc chắn muốn xóa admin này? Hành động này sẽ xóa tất cả bài viết và đội hình liên quan.')) return;
    
    setError(null);
    setAdminDangXoa(adminId);
    
    try {
      const result = await deleteAdminCon(adminId);
      
      // Tải lại danh sách admin
      await loadAdminList();

      if (result && result.success) {
        const email = result.adminData?.email || 'Admin';
        alert(`Đã xóa ${email} và dữ liệu liên quan thành công! Lưu ý: Tài khoản vẫn còn trong Supabase Authentication và cần được xóa thủ công từ Supabase Dashboard.`);
      }
    } catch (err) {
      console.error('Lỗi khi xóa admin:', err);
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      setError(`Có lỗi xảy ra khi xóa admin: ${errorMessage}`);
      alert(`Có lỗi xảy ra khi xóa admin: ${errorMessage}`);
    } finally {
      setAdminDangXoa(null);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex items-center">
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-gray-700">Đang tải danh sách admin...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center text-red-500">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <span>Lỗi: {error}</span>
      </div>
    </div>
  );

  if (!adminInfo || adminInfo.vai_tro !== 'super_admin') {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800">Quyền truy cập hạn chế</h3>
        <p className="mt-2 text-sm text-yellow-700">
          Bạn cần có quyền Super Admin để quản lý tài khoản admin.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header với nút thêm mới */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Admin</h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý tài khoản admin và phân quyền
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Thêm Admin Mới
        </button>
      </div>

      {/* Danh sách Admin */}
      <AdminList
        danhSachAdmin={danhSachAdmin}
        adminDangXoa={adminDangXoa}
        onXoaAdmin={handleXoaAdmin}
        adminInfo={adminInfo}
        onSuccess={loadAdminList}
      />

      {/* Form tạo admin mới */}
      {showForm && (
        <AdminForm
          onClose={() => setShowForm(false)}
          onSuccess={loadAdminList}
        />
      )}
    </div>
  );
} 