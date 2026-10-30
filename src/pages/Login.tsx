import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import { BarChart3, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../components/Toast';

export function Login() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('info', 'Demo mode: Authentication is simulated.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="w-8 h-8 text-accent-purple" />
          </div>
          <h1 className="display-md text-4xl text-primary mb-3">Welcome back</h1>
          <p className="text-[14px] font-light text-secondary">
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="trader@example.com"
              className="w-full px-4 py-3 rounded-full text-[14px] bg-surface-theme border border-base-theme text-primary placeholder:text-subtle focus:outline-none focus:border-accent/50 transition-colors"
              required
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 rounded-full text-[14px] bg-surface-theme border border-base-theme text-primary placeholder:text-subtle focus:outline-none focus:border-accent/50 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <label className="flex items-center gap-2 text-secondary cursor-pointer">
              <input type="checkbox" className="rounded border-base-theme" />
              Remember me
            </label>
            <a href="#" className="text-secondary hover:text-primary transition-colors">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="btn-cta w-full py-4 rounded-full text-[15px] font-bold"
          >
            Sign In →
          </button>
        </form>

        <p className="text-center text-[13px] text-secondary mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-accent transition-colors">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
