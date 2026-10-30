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
    </div>
  );
}
