import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'M-SCI: Memory Connect Challenge',
  description: 'Connect matching symbol pairs to decrypt the X-Corp system control interface.',
};

export default function MemoryConnectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
} 