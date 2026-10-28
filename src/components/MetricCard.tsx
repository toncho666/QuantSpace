import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  sparklineData?: number[];
  icon?: React.ReactNode;
  delay?: number;
}

export function MetricCard({ 
  label, 
  value, 
  change,
  changeType = 'neutral',
  sparklineData,
  icon,
  delay = 0
}: MetricCardProps) {
  const chartData = sparklineData?.map((v, i) => ({ x: i, y: v })) || [];
  
  const changeColors = {
    positive: 'text-profit',
    negative: 'text-loss',
    neutral: 'text-muted'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="label text-muted mb-2">{label}</p>
          <p className="text-3xl font-bold text-primary metric">{value}</p>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      
      {change && (
        <p className={`text-sm font-medium ${changeColors[changeType]} mb-3`}>
          {change}
        </p>
      )}
      
      {sparklineData && (
        <div className="h-12 -mx-2 -mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="y" 
                stroke="#10b981" 
                fill="url(#sparkGradient)" 
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
