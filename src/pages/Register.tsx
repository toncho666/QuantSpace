import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import { BarChart3 } from 'lucide-react';
import { useState } from 'react';

export function Register() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '', agree: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      alert('Passwords do not match');
      return;
    }
    alert('Demo: Registration would be processed here. In production, email verification would be required.');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="w-8 h-8 text-navy-400" />
          </div>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className={`mt-2 text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
            Start exploring systematic trading strategies
          </p>
        </div>

        <form onSubmit={handleSubmit} className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200 shadow-sm'}`}>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-graphite-300' : 'text-graphite-700'}`}>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Trader"
                className={`w-full px-4 py-2.5 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200 placeholder:text-graphite-600' : 'bg-graphite-50 border-graphite-300 text-graphite-900 placeholder:text-graphite-400'} border focus:outline-none focus:ring-2 focus:ring-navy-500/50`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-graphite-300' : 'text-graphite-700'}`}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="trader@example.com"
                className={`w-full px-4 py-2.5 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200 placeholder:text-graphite-600' : 'bg-graphite-50 border-graphite-300 text-graphite-900 placeholder:text-graphite-400'} border focus:outline-none focus:ring-2 focus:ring-navy-500/50`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-graphite-300' : 'text-graphite-700'}`}>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                placeholder="Min 8 characters"
                className={`w-full px-4 py-2.5 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200 placeholder:text-graphite-600' : 'bg-graphite-50 border-graphite-300 text-graphite-900 placeholder:text-graphite-400'} border focus:outline-none focus:ring-2 focus:ring-navy-500/50`}
                required
                minLength={8}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-graphite-300' : 'text-graphite-700'}`}>Confirm Password</label>
              <input
                type="password"
                value={formData.confirm}
                onChange={e => setFormData({ ...formData, confirm: e.target.value })}
                placeholder="Repeat password"
                className={`w-full px-4 py-2.5 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200 placeholder:text-graphite-600' : 'bg-graphite-50 border-graphite-300 text-graphite-900 placeholder:text-graphite-400'} border focus:outline-none focus:ring-2 focus:ring-navy-500/50`}
                required
              />
            </div>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={formData.agree}
                onChange={e => setFormData({ ...formData, agree: e.target.checked })}
                className="mt-1 rounded border-graphite-600"
                required
              />
              <span className={`text-xs ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
                I agree to the Terms of Service and acknowledge the Risk Disclosure. I understand that trading involves substantial risk of loss.
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-2.5 rounded-lg bg-navy-500 text-white font-medium text-sm hover:bg-navy-600 transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className={`text-center text-sm mt-6 ${isDark ? 'text-graphite-500' : 'text-graphite-600'}`}>
          Already have an account?{' '}
          <Link to="/login" className="text-navy-400 hover:text-navy-300 font-medium">Sign in</Link>
        </p>

        <div className={`mt-8 p-4 rounded-lg text-center ${isDark ? 'bg-graphite-900/30' : 'bg-graphite-50'}`}>
          <p className={`text-xs ${isDark ? 'text-graphite-600' : 'text-graphite-400'}`}>
            Demo mode — registration is simulated. In production, email verification, password hashing (bcrypt), and rate limiting would be enforced.
          </p>
        </div>
      </div>
    </div>
  );
}
