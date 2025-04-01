import { FormEvent, useState } from 'react';
import { taoBaiViet } from '@/tien_ich/api';
import { useRouter } from 'next/navigation';
import { layThongTinNguoiDung } from '@/tien_ich/supabase';

export default function DangBaiForm() {
  const [tieuDe, setTieuDe] = useState('');
  const [noiDung, setNoiDung] = useState('');
  const [anhDaiDien, setAnhDaiDien] = useState('');
  const [loaiBaiViet, setLoaiBaiViet] = useState<'tin_tuc' | 'cong_dong'>('tin_tuc');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Lấy thông tin người dùng hiện tại
      const nguoiDung = await layThongTinNguoiDung();
      
      if (!nguoiDung || !nguoiDung.id) {
        throw new Error('Bạn cần đăng nhập để đăng bài.');
      }
      
      await taoBaiViet({
        tieu_de: tieuDe,
        noi_dung: noiDung,
        anh_dai_dien: anhDaiDien,
        loai: loaiBaiViet,
        nguoi_dung_id: nguoiDung.id
      });
      
      // Điều hướng về trang tin tức hoặc cộng đồng dựa trên loại bài viết
      router.push(loaiBaiViet === 'tin_tuc' ? '/duong_dan/tin_tuc' : '/duong_dan/cong_dong');
    } catch (err) {
      setError('Đăng bài thất bại. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[var(--overwatch-dark-blue)]">
        Đăng Bài Mới
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Loại bài viết
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="tin_tuc"
                checked={loaiBaiViet === 'tin_tuc'}
                onChange={() => setLoaiBaiViet('tin_tuc')}
                className="h-4 w-4 text-[var(--overwatch-blue)]"
                disabled={isLoading}
              />
              <span className="ml-2">Tin tức</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="cong_dong"
                checked={loaiBaiViet === 'cong_dong'}
                onChange={() => setLoaiBaiViet('cong_dong')}
                className="h-4 w-4 text-[var(--overwatch-blue)]"
                disabled={isLoading}
              />
              <span className="ml-2">Cộng đồng</span>
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="tieu_de" className="block text-gray-700 font-medium mb-2">
            Tiêu đề
          </label>
          <input
            type="text"
            id="tieu_de"
            value={tieuDe}
            onChange={(e) => setTieuDe(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--overwatch-blue)]"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="anh_dai_dien" className="block text-gray-700 font-medium mb-2">
            URL ảnh đại diện
          </label>
          <input
            type="text"
            id="anh_dai_dien"
            value={anhDaiDien}
            onChange={(e) => setAnhDaiDien(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--overwatch-blue)]"
            placeholder="https://example.com/image.jpg"
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="noi_dung" className="block text-gray-700 font-medium mb-2">
            Nội dung
          </label>
          <textarea
            id="noi_dung"
            value={noiDung}
            onChange={(e) => setNoiDung(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--overwatch-blue)] min-h-[200px]"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            disabled={isLoading}
          >
            Hủy
          </button>
          
          <button
            type="submit"
            className={`bg-[var(--overwatch-blue)] text-white font-bold py-2 px-4 rounded-md ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[var(--overwatch-dark-blue)]'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng bài'}
          </button>
        </div>
      </form>
    </div>
  );
} 