import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Layout() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/algorithms', label: 'Algorithms' },
    { to: '/compare', label: 'Compare' },
    { to: '/shop', label: 'Bot Shop' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <div className="min-h-screen bg-base-theme text-primary">
      <header className="fixed top-0 left-0 right-0 z-50 bg-base-theme/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-[15px] font-medium tracking-tight text-primary">
                Quant<span className="text-accent-purple">Space</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-[13px] font-normal tracking-wide transition-colors relative ${
                    location.pathname === link.to ? 'text-primary' : 'text-muted hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-hover-theme transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <Link
                to="/algorithms"
                className="btn-gradient text-[13px] font-semibold px-5 py-2 rounded-full"
              >
                Get Started →
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-base-theme bg-base-theme"
            >
              <div className="px-6 py-4 space-y-3">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-[15px] text-primary py-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-base-theme mt-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-4">
                <span className="text-[15px] font-medium tracking-tight text-primary">
                  Quant<span className="text-accent-purple">Space</span>
                </span>
              </div>
              <p className="text-[13px] text-muted leading-relaxed">
                Professional algorithmic trading platform with institutional-grade analytics.
              </p>
            </div>

            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-muted mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><Link to="/algorithms" className="text-[13px] text-secondary hover:text-primary transition-colors">Algorithms</Link></li>
                <li><Link to="/compare" className="text-[13px] text-secondary hover:text-primary transition-colors">Compare</Link></li>
                <li><Link to="/shop" className="text-[13px] text-secondary hover:text-primary transition-colors">Bot Shop</Link></li>
                <li><Link to="/dashboard" className="text-[13px] text-secondary hover:text-primary transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-muted mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[13px] text-secondary hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-[13px] text-secondary hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="#" className="text-[13px] text-secondary hover:text-primary transition-colors">Trading Guide</a></li>
                <li><a href="#" className="text-[13px] text-secondary hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-muted mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[13px] text-secondary hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-[13px] text-secondary hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-[13px] text-secondary hover:text-primary transition-colors">Risk Disclosure</a></li>
                <li><a href="#" className="text-[13px] text-secondary hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-base-theme">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-[12px] text-muted">
                © 2026 QuantSpace. All rights reserved.
              </p>
              <p className="text-[11px] text-muted max-w-2xl text-right">
                <strong>Risk Disclosure:</strong> Trading financial instruments involves substantial risk of loss. Past performance does not guarantee future results. All data shown is synthetic demo data for illustration purposes only.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
