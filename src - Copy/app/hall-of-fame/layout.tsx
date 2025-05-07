import type { Metadata } from 'next';
import { ReactNode } from 'react';

// Sử dụng fonts của hệ thống thay vì font tùy chỉnh
const fontClasses = {
  spaceGrotesk: 'font-sans',
  cyber: 'font-mono'
};

export const metadata: Metadata = {
  title: 'Hall of Fame | M-SCI',
  description: 'Đại Sảnh Danh Vọng M-SCI - Nơi vinh danh những cá nhân và tổ chức đã có đóng góp xuất sắc cho sự phát triển của game.',
  metadataBase: new URL('https://m-sci.com'),
  openGraph: {
    title: 'Hall of Fame | M-SCI',
    description: 'Khám phá những huyền thoại đã góp phần tạo nên lịch sử M-SCI.',
    url: 'https://m-sci.com/hall-of-fame',
    siteName: 'M-SCI Game',
    images: [
      {
        url: '/images/hall-of-fame-og.jpg',
        width: 1200,
        height: 630,
        alt: 'M-SCI Hall of Fame',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function HallOfFameLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-hidden bg-black">
      {children}
    </div>
  );
} 