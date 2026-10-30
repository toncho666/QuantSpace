import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';

interface RollingSharpeChartProps {
  data: number[];
}

export function RollingSharpeChart({ data }: RollingSharpeChartProps) {
  const chartData = data.map((v, i) => ({ day: i, sharpe: v }));
  const avgSharpe = data.reduce((sum, val) => sum + val, 0) / data.length;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <defs>
          <linearGradient id="sharpeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
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
          tickFormatter={(value) => value.toFixed(1)}
        />
        <Tooltip 
          contentStyle={{ 
            background: 'var(--color-bg-elevated)', 
            border: '1px solid var(--color-border-base)', 
            borderRadius: '8px',
            fontSize: '12px'
          }}
          formatter={(value: number) => [value.toFixed(2), 'Sharpe Ratio']}
        />
        <ReferenceLine 
          y={avgSharpe} 
          stroke="var(--color-text-muted)" 
          strokeDasharray="3 3"
          label={{ value: `Avg: ${avgSharpe.toFixed(2)}`, position: 'right', fill: 'var(--color-text-muted)', fontSize: 10 }}
        />
        <Line 
          type="monotone" 
          dataKey="sharpe" 
          stroke="url(#sharpeGradient)" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
