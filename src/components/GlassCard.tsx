import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}

export function GlassCard({ 
  children, 
  className = '',
  strong = false
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`${strong ? 'glass-strong' : 'glass'} rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
