'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/tien_ich/supabase';
import type { AnhHung, VaiTro, DoHiEm } from '@/loai';
import HeroList from './hero-management/HeroList';
import HeroForm from './hero-management/HeroForm';
import {
  getDanhSachHero,
  getDanhSachVaiTro,
  getDanhSachDoHiem,
  deleteHero,
  checkStorageBucket
} from './hero-management/HeroService';
import { confirmDialog } from '@/tien_ich/giao_dien';

export default function QuanLyHero() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [danhSachHero, setDanhSachHero] = useState<AnhHung[]>([]);
  const [danhSachVaiTro, setDanhSachVaiTro] = useState<VaiTro[]>([]);
  const [danhSachDoHiem, setDanhSachDoHiem] = useState<DoHiEm[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHero, setEditingHero] = useState<AnhHung | null>(null);
  const [heroDangXoa, setHeroDangXoa] = useState<string | null>(null);

  // Lấy danh sách hero và dữ liệu liên quan
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Đang tải dữ liệu...");
      
      // Tải dữ liệu từ service
      const [vaiTroData, doHiemData, heroData] = await Promise.all([
        getDanhSachVaiTro(),
        getDanhSachDoHiem(),
        getDanhSachHero()
      ]);
      
      setDanhSachVaiTro(vaiTroData);
      setDanhSachDoHiem(doHiemData);
      setDanhSachHero(heroData);
      
      console.log("Đã tải được", heroData.length, "hero");
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Thiết lập subscription để lắng nghe sự thay đổi từ bảng anh_hung
    const subscription = supabase
      .channel('anh_hung_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'anh_hung' 
      }, () => {
        console.log('Có thay đổi trong bảng anh_hung, đang tải lại dữ liệu...');
        loadData();
      })
      .subscribe();
    
    // Kiểm tra bucket có tồn tại không
    checkStorageBucket();
    
    // Cleanup khi component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Xử lý mở form tạo mới hoặc chỉnh sửa
  const handleOpenForm = (hero?: AnhHung) => {
    if (hero) {
      console.log("Mở form chỉnh sửa hero:", hero);
      setEditingHero(hero);
    } else {
      setEditingHero(null);
    }
    setShowForm(true);
  };

  // Xử lý đóng form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingHero(null);
  };

  // Xử lý xóa hero
  const handleDeleteHero = async (heroId: string, heroName: string) => {
    if (!await confirmDialog(`Bạn có chắc chắn muốn xóa hero "${heroName}"? Hành động này không thể hoàn tác.`)) {
      return;
    }
    
    setHeroDangXoa(heroId);
    
    try {
      await deleteHero(heroId);
      
      // Tải lại danh sách hero sau khi xóa
      await loadData();
      
    } catch (err) {
      console.error('Lỗi khi xóa hero:', err);
      setError(`Lỗi khi xóa hero: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`);
      alert(`Lỗi khi xóa hero: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`);
    } finally {
      setHeroDangXoa(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-700">Đang tải dữ liệu hero...</span>
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

  return (
    <div className="space-y-6">
      {/* Header với nút thêm mới */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Hero</h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý danh sách hero và thuộc tính
          </p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Thêm Hero Mới
        </button>
      </div>

      {/* Danh sách Hero */}
      <HeroList
        danhSachHero={danhSachHero}
        onEdit={handleOpenForm}
        onDelete={handleDeleteHero}
        heroDangXoa={heroDangXoa}
        isLoading={loading}
      />

      {/* Form thêm/sửa hero */}
      {showForm && (
        <HeroForm
          danhSachVaiTro={danhSachVaiTro}
          danhSachDoHiem={danhSachDoHiem}
          editingHero={editingHero}
          onClose={handleCloseForm}
          onSuccess={loadData}
        />
      )}
    </div>
  );
} 