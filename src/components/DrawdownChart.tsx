import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface DrawdownChartProps {
  data: number[];
}

export function DrawdownChart({ data }: DrawdownChartProps) {
  const chartData = data.map((v, i) => ({ day: i, drawdown: v }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-base)" />
        <XAxis 
          dataKey="day" 
          tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} 
          axisLine={false} 
          tickLine={false}
        />
        <YAxis 
          tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} 
          axisLine={false} 
          tickLine={false}
          tickFormatter={(value) => `${value.toFixed(1)}%`}
        />
        <Tooltip 
          contentStyle={{ 
            background: 'var(--color-bg-elevated)', 
            border: '1px solid var(--color-border-base)', 
            borderRadius: '8px',
            fontSize: '12px'
          }}
          formatter={(value: number) => [`${value.toFixed(2)}%`, 'Drawdown']}
        />
        <Area 
          type="monotone" 
          dataKey="drawdown" 
          stroke="#ef4444" 
          fill="url(#drawdownGradient)" 
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
