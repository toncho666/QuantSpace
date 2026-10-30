import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import { BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../components/Toast';

export function Register() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '', agree: false });
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      showToast('error', 'Passwords do not match');
      return;
    }
    showToast('success', 'Demo: Registration successful!');
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
          <h1 className="display-md text-4xl text-primary mb-3">Create account</h1>
          <p className="text-[14px] font-light text-secondary">
            Start exploring systematic strategies
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted mb-2 block">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Trader"
              className="w-full px-4 py-3 rounded-full text-[14px] bg-surface-theme border border-base-theme text-primary placeholder:text-subtle focus:outline-none focus:border-accent/50 transition-colors"
              required
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted mb-2 block">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="trader@example.com"
              className="w-full px-4 py-3 rounded-full text-[14px] bg-surface-theme border border-base-theme text-primary placeholder:text-subtle focus:outline-none focus:border-accent/50 transition-colors"
              required
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted mb-2 block">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              placeholder="Min 8 characters"
              className="w-full px-4 py-3 rounded-full text-[14px] bg-surface-theme border border-base-theme text-primary placeholder:text-subtle focus:outline-none focus:border-accent/50 transition-colors"
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted mb-2 block">Confirm Password</label>
            <input
              type="password"
              value={formData.confirm}
              onChange={e => setFormData({ ...formData, confirm: e.target.value })}
              placeholder="Repeat password"
              className="w-full px-4 py-3 rounded-full text-[14px] bg-surface-theme border border-base-theme text-primary placeholder:text-subtle focus:outline-none focus:border-accent/50 transition-colors"
              required
            />
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agree}
              onChange={e => setFormData({ ...formData, agree: e.target.checked })}
              className="mt-1 rounded border-base-theme"
              required
            />
            <span className="text-[12px] text-secondary leading-relaxed">
              I agree to the Terms of Service and acknowledge the Risk Disclosure. Trading involves substantial risk of loss.
            </span>
          </label>
          <button
            type="submit"
            className="btn-cta w-full py-4 rounded-full text-[15px] font-bold"
          >
            Create Account →
          </button>
        </form>

        <p className="text-center text-[13px] text-secondary mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-accent transition-colors">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
