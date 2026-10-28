import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Layout() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');
  const isAuth = location.pathname === '/login' || location.pathname === '/register';
  const isDark = theme === 'dark';

  const navLinks = [
    { to: '/algorithms', label: 'Algorithms' },
    { to: '/shop', label: 'Bot Shop' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-base text-neutral-100' : 'bg-light-base text-neutral-900'}`}>
      {/* Header — minimal, editorial */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-base/80' : 'bg-light-base/80'} backdrop-blur-xl`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo — text only, editorial */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-[15px] font-medium tracking-tight">
                Quant<span className="text-accent">Space</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            {!isDashboard && !isAuth && (
              <nav className="hidden md:flex items-center gap-10">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-[13px] font-normal tracking-wide transition-colors relative ${
                      location.pathname === link.to
                        ? 'text-neutral-100'
                        : isDark ? 'text-neutral-500 hover:text-neutral-200' : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    {link.label}
                    {location.pathname === link.to && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-[21px] left-0 right-0 h-[0.5px] bg-accent"
                      />
                    )}
                  </Link>
                ))}
              </nav>
            )}

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {!isDashboard && !isAuth && (
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    to="/login"
                    className={`text-[13px] font-normal ${isDark ? 'text-neutral-400 hover:text-neutral-100' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="text-[13px] font-medium px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-900 hover:bg-white transition-colors"
                  >
                    Get started
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              {!isDashboard && !isAuth && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && !isDashboard && !isAuth && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`md:hidden border-t ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'} overflow-hidden`}
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-lg font-light py-2"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 flex gap-4">
                  <Link to="/login" className="text-sm">Sign in</Link>
                  <Link to="/register" className="text-sm font-medium px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-900">Get started</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className={isDashboard || isAuth ? '' : 'pt-16'}>
        <Outlet />
      </main>

      {/* Footer — minimal, editorial */}
      {!isDashboard && !isAuth && (
        <footer className={`border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="col-span-2 md:col-span-1">
                <p className="text-[15px] font-medium tracking-tight mb-3">
                  Quant<span className="text-accent">Space</span>
                </p>
                <p className={`text-[13px] leading-relaxed ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                  Systematic algorithmic trading with transparent results.
                </p>
              </div>
              <div>
                <p className="label text-neutral-500 mb-4">Platform</p>
                <div className="space-y-3">
                  <Link to="/algorithms" className={`block text-[13px] ${isDark ? 'text-neutral-400 hover:text-neutral-100' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}>Algorithms</Link>
                  <Link to="/shop" className={`block text-[13px] ${isDark ? 'text-neutral-400 hover:text-neutral-100' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}>Bot Shop</Link>
                  <a href="#" className={`block text-[13px] ${isDark ? 'text-neutral-400 hover:text-neutral-100' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}>API</a>
                </div>
              </div>
              <div>
                <p className="label text-neutral-500 mb-4">Legal</p>
                <div className="space-y-3">
                  <a href="#" className={`block text-[13px] ${isDark ? 'text-neutral-400 hover:text-neutral-100' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}>Privacy</a>
                  <a href="#" className={`block text-[13px] ${isDark ? 'text-neutral-400 hover:text-neutral-100' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}>Terms</a>
                  <a href="#" className={`block text-[13px] ${isDark ? 'text-neutral-400 hover:text-neutral-100' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}>Risk Disclosure</a>
                </div>
              </div>
              <div>
                <p className="label text-neutral-500 mb-4">Contact</p>
                <div className="space-y-3">
                  <a href="#" className={`block text-[13px] ${isDark ? 'text-neutral-400 hover:text-neutral-100' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}>support@quantspace.io</a>
                  <a href="#" className={`block text-[13px] ${isDark ? 'text-neutral-400 hover:text-neutral-100' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}>Documentation</a>
                </div>
              </div>
            </div>

            {/* Risk disclosure */}
            <div className={`pt-8 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
              <p className={`text-[11px] leading-relaxed max-w-3xl ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
                <span className="font-medium">Risk Disclosure:</span> Trading financial instruments involves substantial risk of loss. Past performance is not indicative of future results. Algorithmic trading results shown are based on historical backtesting and paper trading. Actual results may differ significantly. You should only trade with capital you can afford to lose. QuantSpace provides tools and analysis — not financial advice.
              </p>
              <p className={`text-[11px] mt-4 ${isDark ? 'text-neutral-700' : 'text-neutral-400'}`}>
                © 2026 QuantSpace
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
