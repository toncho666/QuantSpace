import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  span?: 'col-2' | 'col-3' | 'col-4' | 'col-6' | 'row-2';
  delay?: number;
}

export function BentoCard({ 
  children, 
  className = '', 
  span = 'col-2',
  delay = 0 
}: BentoCardProps) {
  const spanClasses = {
    'col-2': 'md:col-span-2',
    'col-3': 'md:col-span-3',
    'col-4': 'md:col-span-4',
    'col-6': 'md:col-span-6',
    'row-2': 'md:row-span-2',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`bento-card ${spanClasses[span]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
