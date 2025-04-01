import { AnhHung } from '@/loai';
import Image from 'next/image';
import Link from 'next/link';

interface TheAnhHungProps {
  anhHung: AnhHung;
}

export default function TheAnhHung({ anhHung }: TheAnhHungProps) {
  // Xác định màu sắc dựa trên độ hiếm
  const mauSacDoHiem = anhHung.do_hi_em?.mau_sac || '#4CAF50';
  
  return (
    <Link href={`/duong_dan/anh_hung/${anhHung.id}`} className="block">
      <div 
        className="rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
        style={{ borderColor: mauSacDoHiem, borderWidth: '2px' }}
      >
        <div className="relative w-full h-48">
          {anhHung.anh_dai_dien ? (
            <Image 
              src={anhHung.anh_dai_dien} 
              alt={anhHung.ten} 
              className="object-cover" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Không có ảnh</span>
            </div>
          )}
          
          {/* Badge vai trò */}
          <div 
            className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white"
            style={{ backgroundColor: mauSacDoHiem }}
          >
            {anhHung.vai_tro?.ten || 'Không xác định'}
          </div>
          
          {/* Badge độ hiếm */}
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-bold text-white bg-gray-800">
            {anhHung.do_hi_em?.ma || 'C'}
          </div>
        </div>
        
        <div className="p-4 bg-white">
          <h3 className="text-lg font-bold mb-1 truncate">{anhHung.ten}</h3>
          <p className="text-sm text-gray-500 truncate">{anhHung.dac_diem || 'Không có thông tin'}</p>
        </div>
      </div>
    </Link>
  );
} 