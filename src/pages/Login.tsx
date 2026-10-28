import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import { Eye, EyeOff } from 'lucide-react';
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
          <p className="text-[15px] font-medium tracking-tight mb-4">
            Quant<span className="text-accent">Space</span>
          </p>
          <h1 className="display-md text-4xl text-neutral-100 mb-3">Welcome back</h1>
          <p className="text-[14px] font-light text-neutral-500">
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="trader@example.com"
              className={`w-full px-4 py-3 rounded-full text-[14px] ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-neutral-100 placeholder:text-neutral-600' 
                  : 'bg-black/5 border-black/10 text-neutral-900 placeholder:text-neutral-400'
              } border focus:outline-none focus:border-accent/50 transition-colors`}
              required
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 pr-11 rounded-full text-[14px] ${
                  isDark 
                    ? 'bg-white/5 border-white/10 text-neutral-100 placeholder:text-neutral-600' 
                    : 'bg-black/5 border-black/10 text-neutral-900 placeholder:text-neutral-400'
                } border focus:outline-none focus:border-accent/50 transition-colors`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <label className="flex items-center gap-2 text-neutral-400 cursor-pointer">
              <input type="checkbox" className="rounded border-neutral-600" />
              Remember me
            </label>
            <a href="#" className="text-neutral-400 hover:text-neutral-200 transition-colors">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full text-[13px] font-medium bg-neutral-100 text-neutral-900 hover:bg-white transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-[13px] text-neutral-500 mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="text-neutral-200 hover:text-accent transition-colors">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
