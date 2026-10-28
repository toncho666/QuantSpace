import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Algorithms } from './pages/Algorithms';
import { AlgorithmDetail } from './pages/AlgorithmDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Shop } from './pages/Shop';
import { Admin } from './pages/Admin';
import { Compare } from './pages/Compare';
import { ToastProvider } from './components/Toast';
import { ScrollProgress } from './components/ScrollProgress';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

function App() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ToastProvider>
        <BrowserRouter>
          <ScrollProgress />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/algorithms" element={<Algorithms />} />
              <Route path="/algorithms/:slug" element={<AlgorithmDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/compare" element={<Compare />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeContext.Provider>
  );
}

export default App;
