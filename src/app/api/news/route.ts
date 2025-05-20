import { NextResponse } from 'next/server';
import { BaiViet } from '@/types/bai_viet';

export async function GET() {
  // Dữ liệu mẫu cho tin tức
  const sampleNews: BaiViet[] = [
    {
      id: '1',
      tieu_de: 'Ra mắt phiên bản cập nhật mới cho M-SCI',
      noi_dung: 'Phiên bản cập nhật mới nhất mang đến nhiều tính năng thú vị và cải tiến đáng kể cho trải nghiệm người chơi.',
      anh_dai_dien: '/images/overwatch_bg_2.jpg',
      loai: 'tin_tuc',
      nguoi_dung_id: 'admin',
      ngay_dang: new Date(2023, 10, 15).toISOString(),
    },
    {
      id: '2',
      tieu_de: 'Sự kiện World Boss mùa hè sắp diễn ra',
      noi_dung: 'Chuẩn bị cho sự kiện World Boss lớn nhất năm với nhiều phần thưởng hấp dẫn và thử thách mới.',
      anh_dai_dien: '/images/overwatch_bg_2.jpg',
      loai: 'tin_tuc',
      nguoi_dung_id: 'admin',
      ngay_dang: new Date(2023, 10, 10).toISOString(),
    },
    {
      id: '3',
      tieu_de: 'Nhân vật mới: Inferno - Chiến binh của lửa',
      noi_dung: 'Chào mừng Inferno, nhân vật mới nhất gia nhập đội ngũ chiến binh với khả năng kiểm soát lửa và sát thương diện rộng.',
      anh_dai_dien: '/images/like.jpg',
      loai: 'tin_tuc',
      nguoi_dung_id: 'admin',
      ngay_dang: new Date(2023, 10, 5).toISOString(),
    },
    {
      id: '4',
      tieu_de: 'Giải đấu Guild War mùa 5 chính thức bắt đầu',
      noi_dung: 'Các guild hàng đầu sẽ đối đầu trong giải đấu mùa 5 với phần thưởng và danh hiệu độc quyền.',
      anh_dai_dien: '/images/new.jpg',
      loai: 'cong_dong',
      nguoi_dung_id: 'admin',
      ngay_dang: new Date(2023, 9, 28).toISOString(),
    },
    {
      id: '5',
      tieu_de: 'Mã quà tặng tháng 11 đã sẵn sàng',
      noi_dung: 'Nhận ngay mã quà tặng tháng 11 với nhiều vật phẩm giá trị và tài nguyên hiếm trong game.',
      anh_dai_dien: '/images/free.jpg',
      loai: 'tin_tuc',
      nguoi_dung_id: 'admin',
      ngay_dang: new Date(2023, 9, 20).toISOString(),
    }
  ];

  // Trả về dữ liệu dưới dạng JSON
  return NextResponse.json(sampleNews);
} 