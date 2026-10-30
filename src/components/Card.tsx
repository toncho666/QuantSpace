import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useTheme } from '../App';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = true, onClick }: CardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      className={`rounded-xl ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200 shadow-sm'} ${className}`}
      whileHover={hover ? { 
        scale: 1.02, 
        y: -4,
        boxShadow: isDark 
          ? '0 20px 40px -10px rgba(0, 0, 0, 0.5)' 
          : '0 20px 40px -10px rgba(0, 0, 0, 0.1)'
      } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function GlowCard({ children, className = '', color = '#6366f1' }: GlowCardProps) {
  return (
    <div className={`relative group ${className}`}>
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: `radial-gradient(circle at center, ${color}20, transparent 70%)` }}
      />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
