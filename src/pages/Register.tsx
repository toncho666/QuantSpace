import { Link } from 'react-router-dom';
import { useTheme } from '../App';
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
          <p className="text-[15px] font-medium tracking-tight mb-4">
            Quant<span className="text-accent">Space</span>
          </p>
          <h1 className="display-md text-4xl text-neutral-100 mb-3">Create account</h1>
          <p className="text-[14px] font-light text-neutral-500">
            Start exploring systematic strategies
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2 block">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Trader"
              className={`w-full px-4 py-3 rounded-full text-[14px] ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-neutral-100 placeholder:text-neutral-600' 
                  : 'bg-black/5 border-black/10 text-neutral-900 placeholder:text-neutral-400'
              } border focus:outline-none focus:border-accent/50 transition-colors`}
              required
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2 block">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
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
            <input
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              placeholder="Min 8 characters"
              className={`w-full px-4 py-3 rounded-full text-[14px] ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-neutral-100 placeholder:text-neutral-600' 
                  : 'bg-black/5 border-black/10 text-neutral-900 placeholder:text-neutral-400'
              } border focus:outline-none focus:border-accent/50 transition-colors`}
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2 block">Confirm Password</label>
            <input
              type="password"
              value={formData.confirm}
              onChange={e => setFormData({ ...formData, confirm: e.target.value })}
              placeholder="Repeat password"
              className={`w-full px-4 py-3 rounded-full text-[14px] ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-neutral-100 placeholder:text-neutral-600' 
                  : 'bg-black/5 border-black/10 text-neutral-900 placeholder:text-neutral-400'
              } border focus:outline-none focus:border-accent/50 transition-colors`}
              required
            />
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agree}
              onChange={e => setFormData({ ...formData, agree: e.target.checked })}
              className="mt-1 rounded border-neutral-600"
              required
            />
            <span className="text-[12px] text-neutral-400 leading-relaxed">
              I agree to the Terms of Service and acknowledge the Risk Disclosure. Trading involves substantial risk of loss.
            </span>
          </label>
          <button
            type="submit"
            className="w-full py-3 rounded-full text-[13px] font-medium bg-neutral-100 text-neutral-900 hover:bg-white transition-colors"
          >
            Create account
          </button>
        </form>

        <p className="text-center text-[13px] text-neutral-500 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-neutral-200 hover:text-accent transition-colors">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
