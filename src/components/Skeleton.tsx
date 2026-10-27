import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className = '', width, height }: SkeletonProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded ${className}`}
      style={{ width, height }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
      <div className="w-full h-full bg-graphite-800/50" />
    </motion.div>
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={12}
          className={i === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl p-6 bg-graphite-900/50 border border-graphite-800">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2 flex-1">
          <Skeleton width={150} height={20} />
          <Skeleton width={100} height={12} />
        </div>
        <Skeleton width={60} height={24} />
      </div>
      <SkeletonText lines={2} className="mb-4" />
      <Skeleton height={60} className="mb-4" />
      <div className="grid grid-cols-4 gap-3 pt-4 border-t border-graphite-800/50">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <Skeleton width={40} height={10} />
            <Skeleton width={50} height={14} />
          </div>
        ))}
      </div>
    </div>
  );
}
