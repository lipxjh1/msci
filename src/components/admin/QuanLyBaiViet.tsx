'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/tien_ich/supabase';
import type { BaiViet } from '@/loai/bai_viet';
import { useAuth } from '@/context/AuthContext';
import TinTucList from './tin-tuc-management/TinTucList';
import TinTucForm from './tin-tuc-management/TinTucForm';
import {
  getDanhSachTinTuc,
  deleteTinTuc,
  checkStorageBucket
} from './tin-tuc-management/TinTucService';
import { confirmDialog } from '@/tien_ich/giao_dien';

export default function QuanLyBaiViet() {
  const { adminInfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [danhSachBaiViet, setDanhSachBaiViet] = useState<BaiViet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBaiViet, setEditingBaiViet] = useState<BaiViet | null>(null);
  const [baiVietDangXoa, setBaiVietDangXoa] = useState<string | null>(null);
  const [loaiFilter, setLoaiFilter] = useState<string | null>(null);

  // Lấy danh sách bài viết và dữ liệu liên quan
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Đang tải dữ liệu bài viết...");
      
      // Tải dữ liệu từ service
      const baiVietData = await getDanhSachTinTuc();
      setDanhSachBaiViet(baiVietData);
      
      console.log("Đã tải được", baiVietData.length, "bài viết");
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu bài viết:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dữ liệu bài viết');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Thiết lập subscription để lắng nghe sự thay đổi từ bảng bai_viet
    console.log("Thiết lập subscription cho bảng bai_viet...");
    const subscription = supabase
      .channel('bai_viet_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'bai_viet'
      }, (payload) => {
        console.log('Có thay đổi trong bảng bai_viet:', payload);
        console.log('Loại thay đổi:', payload.eventType);
        console.log('Dữ liệu mới:', payload.new);
        
        // Tải lại dữ liệu khi có thay đổi
        loadData();
      })
      .subscribe((status) => {
        console.log("Trạng thái subscription:", status);
      });
    
    // Kiểm tra bucket có tồn tại không
    checkStorageBucket();
    
    // Cleanup khi component unmount
    return () => {
      console.log("Hủy subscription bai_viet_changes");
      subscription.unsubscribe();
    };
  }, []);

  // Lọc bài viết theo loại
  const filteredBaiViet = loaiFilter
    ? danhSachBaiViet.filter(bv => bv.loai === loaiFilter)
    : danhSachBaiViet;
    
  // Log thông tin về việc lọc để debug
  useEffect(() => {
    if (danhSachBaiViet.length > 0) {
      console.log("Tổng số bài viết:", danhSachBaiViet.length);
      console.log("Loại filter hiện tại:", loaiFilter || "Tất cả");
      console.log("Số bài viết sau khi lọc:", filteredBaiViet.length);
      
      // Log ra các loại bài viết hiện có trong danh sách
      const loaiHienCo = [...new Set(danhSachBaiViet.map(bv => bv.loai))];
      console.log("Các loại bài viết hiện có:", loaiHienCo);
    }
  }, [danhSachBaiViet, loaiFilter, filteredBaiViet]);

  // Xử lý mở form tạo mới hoặc chỉnh sửa
  const handleOpenForm = (baiViet?: BaiViet) => {
    if (baiViet) {
      console.log("Mở form chỉnh sửa bài viết:", baiViet);
      setEditingBaiViet(baiViet);
    } else {
      setEditingBaiViet(null);
    }
    setShowForm(true);
  };

  // Xử lý đóng form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBaiViet(null);
  };

  // Xử lý xóa bài viết
  const handleDeleteBaiViet = async (baiVietId: string, tieuDe: string) => {
    if (!await confirmDialog(`Bạn có chắc chắn muốn xóa bài viết "${tieuDe}"? Hành động này không thể hoàn tác.`)) {
      return;
    }
    
    setBaiVietDangXoa(baiVietId);
    
    try {
      await deleteTinTuc(baiVietId);
      
      // Tải lại danh sách bài viết sau khi xóa
      await loadData();
      
    } catch (err) {
      console.error('Lỗi khi xóa bài viết:', err);
      setError(`Lỗi khi xóa bài viết: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`);
      alert(`Lỗi khi xóa bài viết: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`);
    } finally {
      setBaiVietDangXoa(null);
    }
  };

  // Xử lý thay đổi bộ lọc loại bài viết
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoaiFilter(e.target.value || null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-700">Đang tải dữ liệu bài viết...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center text-red-500">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>Lỗi: {error}</span>
        </div>
        <div className="mt-4">
          <button
            onClick={loadData}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Kiểm tra quyền truy cập
  if (!adminInfo) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800">Quyền truy cập hạn chế</h3>
        <p className="mt-2 text-sm text-yellow-700">
          Bạn cần đăng nhập để quản lý bài viết.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header với nút thêm mới và bộ lọc */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Bài Viết</h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý danh sách bài viết và tin tức
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            onChange={handleFilterChange}
            value={loaiFilter || ''}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Tất cả loại</option>
            <option value="tin_tuc">Tin tức</option>
            <option value="cong_dong">Cộng đồng</option>
          </select>
          <button
            onClick={() => handleOpenForm()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Thêm Bài Viết Mới
          </button>
        </div>
      </div>

      {/* Danh sách Bài viết */}
      <TinTucList
        danhSachTinTuc={filteredBaiViet}
        onEdit={handleOpenForm}
        onDelete={handleDeleteBaiViet}
        tinTucDangXoa={baiVietDangXoa}
        isLoading={loading}
      />

      {/* Form thêm/sửa bài viết */}
      {showForm && (
        <TinTucForm
          editingTinTuc={editingBaiViet}
          onClose={handleCloseForm}
          onSuccess={loadData}
        />
      )}
    </div>
  );
} 