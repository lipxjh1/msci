import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { signUpWithEmail, loading, error } = useAuth();

  const validatePasswords = () => {
    if (password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }
    
    if (password !== confirmPassword) {
      setPasswordError('Mật khẩu không khớp');
      return false;
    }
    
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }
    
    await signUpWithEmail(email, password);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="bg-[#0D1B2A] p-8 rounded-lg shadow-lg border border-[var(--overwatch-blue)]/20"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Đăng Ký</h2>
        
        {(error || passwordError) && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 text-red-200 rounded text-sm">
            {error || passwordError}
          </div>
        )}
        
        <div className="mb-4">
          <label 
            htmlFor="email" 
            className="block text-white/80 text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-[#1E2D40] border border-[var(--overwatch-blue)]/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[var(--overwatch-blue)] transition duration-200"
            placeholder="your.email@example.com"
          />
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="password" 
            className="block text-white/80 text-sm font-medium mb-2"
          >
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-[#1E2D40] border border-[var(--overwatch-blue)]/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[var(--overwatch-blue)] transition duration-200"
            placeholder="•••••••••••"
          />
          <p className="mt-1 text-xs text-white/60">Mật khẩu phải có ít nhất 6 ký tự</p>
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="confirmPassword" 
            className="block text-white/80 text-sm font-medium mb-2"
          >
            Xác nhận mật khẩu
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 bg-[#1E2D40] border border-[var(--overwatch-blue)]/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[var(--overwatch-blue)] transition duration-200"
            placeholder="•••••••••••"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-[var(--overwatch-blue)] to-blue-600 text-white font-bold rounded-md hover:from-blue-600 hover:to-[var(--overwatch-blue)] transition-all duration-300 shadow-lg shadow-blue-900/30 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
        
        <div className="mt-4 text-center">
          <p className="text-white/60 text-sm">
            Đã có tài khoản?{' '}
            <button 
              type="button"
              onClick={onSwitchToLogin}
              className="text-[var(--overwatch-blue)] hover:text-blue-400 font-medium"
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </form>
    </div>
  );
} 