import { FormEvent, useState } from 'react';
import { taoAdminCon } from '@/tien_ich/nguoi_dung';

export default function TaoAdminConForm() {
  const [email, setEmail] = useState('');
  const [ten, setTen] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    // Kiểm tra xác nhận mật khẩu
    if (matKhau !== xacNhanMatKhau) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      setIsLoading(false);
      return;
    }
    
    try {
      await taoAdminCon(email, ten, matKhau);
      
      // Reset form
      setEmail('');
      setTen('');
      setMatKhau('');
      setXacNhanMatKhau('');
      
      setSuccess('Tạo admin con thành công!');
    } catch (err) {
      setError('Tạo admin con thất bại. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[var(--overwatch-dark-blue)]">
        Tạo Admin Con
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{success}</p>
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
        
        <div className="mb-4">
          <label htmlFor="ten" className="block text-gray-700 font-medium mb-2">
            Tên
          </label>
          <input
            type="text"
            id="ten"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--overwatch-blue)]"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-4">
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
            minLength={6}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={xacNhanMatKhau}
            onChange={(e) => setXacNhanMatKhau(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--overwatch-blue)]"
            required
            disabled={isLoading}
            minLength={6}
          />
        </div>
        
        <button
          type="submit"
          className={`w-full bg-[var(--overwatch-blue)] text-white font-bold py-2 px-4 rounded-md ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[var(--overwatch-dark-blue)]'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Đang xử lý...' : 'Tạo Admin Con'}
        </button>
      </form>
    </div>
  );
} 