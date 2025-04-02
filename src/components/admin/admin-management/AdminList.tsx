import { NguoiDung } from '@/loai/nguoi_dung';
import { supabase } from '@/tien_ich/supabase';
import { useState } from 'react';

type AdminListProps = {
  danhSachAdmin: NguoiDung[];
  adminDangXoa: string | null;
  onXoaAdmin: (adminId: string) => Promise<void>;
  adminInfo: NguoiDung | null; // thông tin admin hiện tại
  onSuccess: () => Promise<void>;
};

export default function AdminList({
  danhSachAdmin,
  adminDangXoa,
  onXoaAdmin,
  adminInfo,
  onSuccess
}: AdminListProps) {
  const [adminDangKichHoat, setAdminDangKichHoat] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;
  
  // Filter admins based on search term
  const filteredAdmins = danhSachAdmin.filter(admin => 
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.vai_tro.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);
  
  // Xử lý kích hoạt admin (cho phép login không cần email confirm)
  const handleKichHoatAdmin = async (admin: NguoiDung) => {
    if (!window.confirm(`Bạn có chắc chắn muốn kích hoạt tài khoản cho ${admin.email}? Admin sẽ được đánh dấu là đã kích hoạt và có thể đăng nhập ngay.`)) {
      return;
    }
    
    setAdminDangKichHoat(admin.id);
    
    try {
      console.log(`Đang kích hoạt tài khoản cho admin ${admin.email}`);
      
      // Cập nhật trạng thái đã kích hoạt trong database
      const { error: updateError } = await supabase
        .from('nguoi_dung')
        .update({ da_kich_hoat: true })
        .eq('id', admin.id);
      
      if (updateError) {
        throw updateError;
      }
      
      // Load lại danh sách admin
      await onSuccess();
      
      alert(`Đã kích hoạt tài khoản cho ${admin.email} thành công!\n\nAdmin có thể đăng nhập ngay. Nếu gặp lỗi "Email not confirmed", hãy sử dụng tính năng Quên mật khẩu để tạo mật khẩu mới.`);
    } catch (err) {
      console.error('Lỗi khi kích hoạt admin:', err);
      alert(`Có lỗi xảy ra khi kích hoạt: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`);
    } finally {
      setAdminDangKichHoat(null);
    }
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Trước
          </button>
          <span className="text-sm text-gray-700">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">{indexOfFirstItem + 1}</span> đến{' '}
              <span className="font-medium">
                {Math.min(indexOfLastItem, filteredAdmins.length)}
              </span>{' '}
              trong tổng số <span className="font-medium">{filteredAdmins.length}</span> admin
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                <span className="sr-only">Trước</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => goToPage(number)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === number 
                      ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' 
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                <span className="sr-only">Sau</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      {/* Search bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Tìm kiếm admin..."
          />
        </div>
      </div>
    
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vai trò
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentAdmins.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  {searchTerm ? 'Không tìm thấy admin nào phù hợp.' : 'Chưa có admin nào. Hãy thêm admin mới.'}
                </td>
              </tr>
            ) : (
              currentAdmins.map((admin) => (
                <tr key={admin.id} className={admin.id === adminInfo?.id ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{admin.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{admin.ten}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        admin.vai_tro === 'super_admin' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {admin.vai_tro === 'super_admin' ? 'Super Admin' : 'Admin Con'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        admin.da_kich_hoat 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {admin.da_kich_hoat ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {/* Nút kích hoạt (chỉ hiển thị với admin con chưa kích hoạt) */}
                      {admin.vai_tro === 'admin_con' && !admin.da_kich_hoat && (
                        <button
                          onClick={() => handleKichHoatAdmin(admin)}
                          disabled={adminDangKichHoat === admin.id}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {adminDangKichHoat === admin.id ? 'Đang kích hoạt...' : 'Kích hoạt'}
                        </button>
                      )}
                      
                      {/* Nút xóa (chỉ hiển thị với admin con và không phải là admin hiện tại) */}
                      {admin.vai_tro === 'admin_con' && admin.id !== adminInfo?.id && (
                        <button
                          onClick={() => onXoaAdmin(admin.id)}
                          disabled={adminDangXoa === admin.id}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {adminDangXoa === admin.id ? 'Đang xóa...' : 'Xóa'}
                        </button>
                      )}
                      
                      {/* Hiển thị "Tài khoản hiện tại" nếu admin chính là người đang đăng nhập */}
                      {admin.id === adminInfo?.id && (
                        <span className="text-gray-500">Tài khoản hiện tại</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {renderPagination()}
      
      <div className="px-6 py-4 bg-gray-50">
        <div className="text-sm">
          <p className="font-medium text-gray-700">Lưu ý về việc tạo tài khoản admin con:</p>
          <ul className="mt-2 ml-5 list-disc text-gray-600">
            <li>Tài khoản admin con mới tạo cần được kích hoạt trước khi có thể đăng nhập.</li>
            <li>Nếu xóa tài khoản admin, tất cả dữ liệu liên quan sẽ bị xóa theo.</li>
            <li>Super Admin không thể bị xóa khỏi hệ thống.</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 