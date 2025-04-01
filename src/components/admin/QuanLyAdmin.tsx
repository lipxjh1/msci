'use client';

import { useState, useEffect } from 'react';
import {
  layDanhSachAdmin,
  taoAdminCon,
  xoaAdminCon,
  khoiTaoCotDaKichHoat
} from '@/tien_ich/nguoi_dung';
import type { NguoiDung } from '@/loai/nguoi_dung';
import { useAuth } from '@/context/AuthContext';

export default function QuanLyAdmin() {
  const { adminInfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [danhSachAdmin, setDanhSachAdmin] = useState<NguoiDung[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [adminDangXoa, setAdminDangXoa] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    ten: '',
    password: 'Admin@123' // Mật khẩu mặc định
  });

  // Lấy danh sách admin
  const loadAdminList = async () => {
    try {
      // Đảm bảo cột da_kich_hoat tồn tại trong bảng
      await khoiTaoCotDaKichHoat();
      
      const admins = await layDanhSachAdmin();
      setDanhSachAdmin(admins);
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

  // Xử lý tạo admin mới
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      // Kiểm tra form
      if (!formData.email || !formData.ten || !formData.password) {
        throw new Error('Vui lòng điền đầy đủ thông tin');
      }

      // Tạo admin con
      await taoAdminCon(formData.email, formData.ten, formData.password);

      // Reset form
      setFormData({
        email: '',
        ten: '',
        password: 'Admin@123'
      });

      // Load lại danh sách admin
      await loadAdminList();
    } catch (error) {
      console.error('Lỗi khi tạo admin:', error);
      setError(error instanceof Error ? error.message : 'Lỗi không xác định');
    }
  };

  // Xử lý xóa admin
  const handleXoaAdmin = async (adminId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa admin này? Hành động này sẽ xóa tất cả bài viết và đội hình liên quan.')) return;
    
    setError(null);
    setAdminDangXoa(adminId);
    
    try {
      const result = await xoaAdminCon(adminId);
      
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
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

        {/* Form tạo admin mới */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Đóng</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <h3 className="text-base font-semibold leading-6 text-gray-900">
                        Tạo Admin Mới
                      </h3>
                      <div className="mt-4">
                        <form onSubmit={handleSubmit}>
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="ten" className="block text-sm font-medium text-gray-700">
                                Tên
                              </label>
                              <input
                                type="text"
                                id="ten"
                                value={formData.ten}
                                onChange={e => setFormData({...formData, ten: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mật khẩu
                              </label>
                              <input
                                type="text" 
                                id="password"
                                value={formData.password}
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                required
                              />
                              <p className="mt-1 text-xs text-gray-500">Mật khẩu mặc định: Admin@123</p>
                            </div>
                          </div>
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
                            >
                              Tạo
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowForm(false)}
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            >
                              Hủy
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bảng danh sách admin */}
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-center text-yellow-700">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p><span className="font-medium">Lưu ý:</span>
                    <span className="ml-1">Khi xóa admin, hệ thống sẽ xóa tất cả bài viết và đội hình liên quan. Tài khoản vẫn còn trong Supabase Authentication và cần được xóa thủ công từ Supabase Dashboard.</span></p>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Tên
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Vai Trò
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Ngày Tạo
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Thao tác</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {danhSachAdmin.map((admin) => (
                      <tr key={admin.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {admin.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {admin.ten}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            admin.vai_tro === 'super_admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {admin.vai_tro === 'super_admin' ? 'Super Admin' : 'Admin Con'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(admin.ngay_tao).toLocaleString('vi-VN')}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex space-x-3 justify-end">
                            {admin.vai_tro === 'admin_con' && (
                              <>
                                <button
                                  onClick={() => handleXoaAdmin(admin.id)}
                                  disabled={adminDangXoa === admin.id}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  {adminDangXoa === admin.id ? 'Đang xóa...' : 'Xóa'}
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 