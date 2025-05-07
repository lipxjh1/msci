import Link from 'next/link';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';

export default function ForumLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0d14]">
      <ThanhDieuHuongResponsive />
      <div className="pt-20">
        {children}
      </div>
    </div>
  );
} 