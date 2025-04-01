import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Quản lý Admin - Clone Overwatch',
  description: 'Trang quản lý admin của hệ thống Clone Overwatch',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
} 