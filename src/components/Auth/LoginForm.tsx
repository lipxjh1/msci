import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import TelegramLoginButton from './TelegramLoginButton';

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithEmail, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInWithEmail(email, password);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="bg-[#0D1B2A] p-8 rounded-lg shadow-lg border border-[var(--overwatch-blue)]/20"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Đăng Nhập</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 text-red-200 rounded text-sm">
            {error}
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
        
        <div className="mb-6">
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
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-[var(--overwatch-blue)] to-blue-600 text-white font-bold rounded-md hover:from-blue-600 hover:to-[var(--overwatch-blue)] transition-all duration-300 shadow-lg shadow-blue-900/30 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
        
        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-[var(--overwatch-blue)]/20"></div>
          <span className="px-4 text-white/50 text-sm">hoặc</span>
          <div className="flex-grow h-px bg-[var(--overwatch-blue)]/20"></div>
        </div>
        
        {/* Telegram Login Button */}
        <div className="mb-6">
          <TelegramLoginButton 
            botName={process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || 'your_bot_name'} 
            className="w-full"
          />
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-white/60 text-sm">
            Chưa có tài khoản?{' '}
            <button 
              type="button"
              onClick={onSwitchToRegister}
              className="text-[var(--overwatch-blue)] hover:text-blue-400 font-medium"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      </form>
    </div>
  );
} 