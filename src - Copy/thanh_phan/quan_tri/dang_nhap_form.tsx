import { FormEvent, useState } from 'react';
import { dangNhap } from '@/tien_ich/supabase';
import { useRouter } from 'next/navigation';

export default function DangNhapForm() {
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await dangNhap(email, matKhau);
      router.push('/duong_dan/quan_tri');
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-[var(--overwatch-dark-blue)]">
        Đăng Nhập Quản Trị
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--overwatch-blue)]"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--overwatch-blue)]"
            required
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          className={`w-full bg-[var(--overwatch-blue)] text-white font-bold py-2 px-4 rounded-md ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[var(--overwatch-dark-blue)]'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Đang xử lý...' : 'Đăng Nhập'}
        </button>
      </form>
    </div>
  );
} 