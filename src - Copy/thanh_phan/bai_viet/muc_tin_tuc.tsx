import { BaiViet } from '@/loai';
import Image from 'next/image';
import Link from 'next/link';

interface MucTinTucProps {
  baiViet: BaiViet;
}

export default function MucTinTuc({ baiViet }: MucTinTucProps) {
  // Format ngày tháng
  const ngayDang = baiViet.ngay_dang 
    ? new Date(baiViet.ngay_dang).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Không xác định';
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
      <Link href={`/duong_dan/tin_tuc/${baiViet.id}`}>
        <div className="relative h-48 w-full">
          {baiViet.anh_dai_dien ? (
            <Image 
              src={baiViet.anh_dai_dien} 
              alt={baiViet.tieu_de || 'Tin tức'} 
              className="object-cover" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Không có ảnh</span>
            </div>
          )}
          
          {/* Badge loại bài viết */}
          <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white bg-blue-600">
            {baiViet.loai === 'tin_tuc' ? 'Tin tức' : 'Cộng đồng'}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{baiViet.tieu_de || 'Không có tiêu đề'}</h3>
          
          <div className="text-sm text-gray-500 mb-2 flex items-center">
            <span className="mr-2">Đăng bởi: {baiViet.nguoi_dung?.ten || 'Admin'}</span>
            <span>•</span>
            <span className="ml-2">{ngayDang}</span>
          </div>
          
          <p className="text-gray-600 line-clamp-3">
            {baiViet.noi_dung || 'Không có nội dung'}
          </p>
        </div>
      </Link>
    </div>
  );
} 