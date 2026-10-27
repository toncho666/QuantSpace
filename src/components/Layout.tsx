import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { Moon, Sun, Menu, X, BarChart3 } from 'lucide-react';
import { useState } from 'react';

export function Layout() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');
  const isAuth = location.pathname === '/login' || location.pathname === '/register';

  const navLinks = [
    { to: '/algorithms', label: 'Algorithms' },
    { to: '/shop', label: 'Bot Shop' },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-navy-950 text-graphite-200' : 'bg-white text-graphite-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-navy-950/80' : 'bg-white/80'} backdrop-blur-xl border-b ${theme === 'dark' ? 'border-graphite-800' : 'border-graphite-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-navy-400" />
              <span className="text-lg font-semibold tracking-tight">QuantSpace</span>
            </Link>

            {/* Desktop Nav */}
            {!isDashboard && !isAuth && (
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'text-navy-400'
                        : theme === 'dark' ? 'text-graphite-400 hover:text-graphite-200' : 'text-graphite-600 hover:text-graphite-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-graphite-800' : 'hover:bg-graphite-100'}`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {!isDashboard && !isAuth && (
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    to="/login"
                    className={`text-sm font-medium ${theme === 'dark' ? 'text-graphite-400 hover:text-graphite-200' : 'text-graphite-600 hover:text-graphite-900'}`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-medium px-4 py-2 rounded-lg bg-navy-500 text-white hover:bg-navy-600 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              {!isDashboard && !isAuth && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && !isDashboard && !isAuth && (
          <div className={`md:hidden border-t ${theme === 'dark' ? 'border-graphite-800 bg-navy-950' : 'border-graphite-200 bg-white'}`}>
            <div className="px-4 py-4 space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-graphite-800 flex gap-3">
                <Link to="/login" className="text-sm font-medium py-2">Sign In</Link>
                <Link to="/register" className="text-sm font-medium px-4 py-2 rounded-lg bg-navy-500 text-white">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      {!isDashboard && !isAuth && (
        <footer className={`border-t ${theme === 'dark' ? 'border-graphite-800 bg-navy-950' : 'border-graphite-200 bg-graphite-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-navy-400" />
                  <span className="font-semibold">QuantSpace</span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-graphite-500' : 'text-graphite-600'}`}>
                  Systematic algorithmic trading platform with transparent results and professional-grade tools.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-3">Platform</h4>
                <div className="space-y-2">
                  <Link to="/algorithms" className={`block text-sm ${theme === 'dark' ? 'text-graphite-500 hover:text-graphite-300' : 'text-graphite-600 hover:text-graphite-900'}`}>Algorithms</Link>
                  <Link to="/shop" className={`block text-sm ${theme === 'dark' ? 'text-graphite-500 hover:text-graphite-300' : 'text-graphite-600 hover:text-graphite-900'}`}>Bot Shop</Link>
                  <a href="#" className={`block text-sm ${theme === 'dark' ? 'text-graphite-500 hover:text-graphite-300' : 'text-graphite-600 hover:text-graphite-900'}`}>API Docs</a>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-3">Legal</h4>
                <div className="space-y-2">
                  <a href="#" className={`block text-sm ${theme === 'dark' ? 'text-graphite-500 hover:text-graphite-300' : 'text-graphite-600 hover:text-graphite-900'}`}>Privacy Policy</a>
                  <a href="#" className={`block text-sm ${theme === 'dark' ? 'text-graphite-500 hover:text-graphite-300' : 'text-graphite-600 hover:text-graphite-900'}`}>Terms of Service</a>
                  <a href="#" className={`block text-sm ${theme === 'dark' ? 'text-graphite-500 hover:text-graphite-300' : 'text-graphite-600 hover:text-graphite-900'}`}>Risk Disclosure</a>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-3">Contact</h4>
                <div className="space-y-2">
                  <a href="#" className={`block text-sm ${theme === 'dark' ? 'text-graphite-500 hover:text-graphite-300' : 'text-graphite-600 hover:text-graphite-900'}`}>support@quantspace.io</a>
                  <a href="#" className={`block text-sm ${theme === 'dark' ? 'text-graphite-500 hover:text-graphite-300' : 'text-graphite-600 hover:text-graphite-900'}`}>Documentation</a>
                </div>
              </div>
            </div>
            <div className={`mt-8 pt-8 border-t ${theme === 'dark' ? 'border-graphite-800' : 'border-graphite-200'}`}>
              <p className={`text-xs ${theme === 'dark' ? 'text-graphite-600' : 'text-graphite-500'}`}>
                <strong>Risk Disclosure:</strong> Trading financial instruments involves substantial risk of loss and is not suitable for all investors. 
                Past performance is not indicative of future results. The content on this platform is for informational purposes only and does not constitute financial advice. 
                Algorithmic trading results shown are based on historical data and backtesting — actual results may vary significantly.
              </p>
              <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-graphite-700' : 'text-graphite-400'}`}>
                © 2026 QuantSpace. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
