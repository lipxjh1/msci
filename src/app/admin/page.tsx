'use client';

import QuanLyAdmin from '@/components/admin/QuanLyAdmin';
import { useAuth } from '@/context/AuthContext';

export default function AdminPage() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main>
      <QuanLyAdmin />
    </main>
  );
} 