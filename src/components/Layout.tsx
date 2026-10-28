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

  const navLinks = [
    { to: '/algorithms', label: 'Algorithms' },
    { to: '/shop', label: 'Bot Shop' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <div className="min-h-screen bg-base-theme text-primary">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-base-theme/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-[15px] font-medium tracking-tight text-primary">
                Quant<span className="text-accent">Space</span>
              </span>
            </Link>

            {!isDashboard && !isAuth && (
              <nav className="hidden md:flex items-center gap-10">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-[13px] font-normal tracking-wide transition-colors relative ${
                      location.pathname === link.to
                        ? 'text-primary'
                        : 'text-muted hover:text-primary'
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

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-hover-theme transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {!isDashboard && !isAuth && (
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    to="/login"
                    className="text-[13px] font-normal text-muted hover:text-primary transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="text-[13px] font-medium px-4 py-1.5 rounded-full bg-primary text-white hover:opacity-90 transition-opacity"
                  >
                    Get started
                  </Link>
                </div>
              )}

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

        <AnimatePresence>
          {mobileMenuOpen && !isDashboard && !isAuth && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="md:hidden border-t border-base-theme bg-base-theme overflow-hidden"
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
                      className="block text-lg font-light py-2 text-primary"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 flex gap-4">
                  <Link to="/login" className="text-sm text-primary">Sign in</Link>
                  <Link to="/register" className="text-sm font-medium px-4 py-1.5 rounded-full bg-primary text-white">Get started</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className={isDashboard || isAuth ? '' : 'pt-16'}>
        <Outlet />
      </main>

      {!isDashboard && !isAuth && (
        <footer className="border-t border-base-theme">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="col-span-2 md:col-span-1">
                <p className="text-[15px] font-medium tracking-tight mb-3 text-primary">
                  Quant<span className="text-accent">Space</span>
                </p>
                <p className="text-[13px] leading-relaxed text-muted">
                  Systematic algorithmic trading with transparent results.
                </p>
              </div>
              <div>
                <p className="label text-muted mb-4">Platform</p>
                <div className="space-y-3">
                  <Link to="/algorithms" className="block text-[13px] text-secondary hover:text-primary transition-colors">Algorithms</Link>
                  <Link to="/shop" className="block text-[13px] text-secondary hover:text-primary transition-colors">Bot Shop</Link>
                  <a href="#" className="block text-[13px] text-secondary hover:text-primary transition-colors">API</a>
                </div>
              </div>
              <div>
                <p className="label text-muted mb-4">Legal</p>
                <div className="space-y-3">
                  <a href="#" className="block text-[13px] text-secondary hover:text-primary transition-colors">Privacy</a>
                  <a href="#" className="block text-[13px] text-secondary hover:text-primary transition-colors">Terms</a>
                  <a href="#" className="block text-[13px] text-secondary hover:text-primary transition-colors">Risk Disclosure</a>
                </div>
              </div>
              <div>
                <p className="label text-muted mb-4">Contact</p>
                <div className="space-y-3">
                  <a href="#" className="block text-[13px] text-secondary hover:text-primary transition-colors">support@quantspace.io</a>
                  <a href="#" className="block text-[13px] text-secondary hover:text-primary transition-colors">Documentation</a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-base-theme">
              <p className="text-[11px] leading-relaxed max-w-3xl text-subtle">
                <span className="font-medium">Risk Disclosure:</span> Trading financial instruments involves substantial risk of loss. Past performance is not indicative of future results. Algorithmic trading results shown are based on historical backtesting and paper trading. Actual results may differ significantly. You should only trade with capital you can afford to lose. QuantSpace provides tools and analysis — not financial advice.
              </p>
              <p className="text-[11px] mt-4 text-subtle">
                © 2026 QuantSpace
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
