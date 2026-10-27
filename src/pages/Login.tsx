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
    // In production, this would call the auth API
    showToast('info', 'Demo mode: Authentication is simulated. In production, this connects to a secure backend.');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <BarChart3 className="w-8 h-8 text-navy-400" />
            </motion.div>
          </div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className={`mt-2 text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
            Sign in to access your trading dashboard
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200 shadow-sm'}`}
        >
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-graphite-300' : 'text-graphite-700'}`}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="trader@example.com"
                className={`w-full px-4 py-2.5 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200 placeholder:text-graphite-600' : 'bg-graphite-50 border-graphite-300 text-graphite-900 placeholder:text-graphite-400'} border focus:outline-none focus:ring-2 focus:ring-navy-500/50`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-graphite-300' : 'text-graphite-700'}`}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 pr-10 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200 placeholder:text-graphite-600' : 'bg-graphite-50 border-graphite-300 text-graphite-900 placeholder:text-graphite-400'} border focus:outline-none focus:ring-2 focus:ring-navy-500/50`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-graphite-600" />
                <span className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>Remember me</span>
              </label>
              <a href="#" className="text-sm text-navy-400 hover:text-navy-300">Forgot password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-2.5 rounded-lg bg-navy-500 text-white font-medium text-sm hover:bg-navy-600 transition-colors"
          >
            Sign In
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-center text-sm mt-6 ${isDark ? 'text-graphite-500' : 'text-graphite-600'}`}
        >
          Don't have an account?{' '}
          <Link to="/register" className="text-navy-400 hover:text-navy-300 font-medium">Create one</Link>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-8 p-4 rounded-lg text-center ${isDark ? 'bg-graphite-900/30' : 'bg-graphite-50'}`}
        >
          <p className={`text-xs ${isDark ? 'text-graphite-600' : 'text-graphite-400'}`}>
            Demo mode — authentication is simulated. In production, this connects to a secure backend with JWT sessions, rate limiting, and 2FA support.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
