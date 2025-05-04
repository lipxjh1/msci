import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'M-SCI: Memory Connect Challenge',
  description: 'Kết nối các cặp biểu tượng giống nhau để truy cập vào hệ thống điều khiển của X-Corp.',
};

export default function MemoryConnectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
} 