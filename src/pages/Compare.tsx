import { useState } from 'react';
import { algorithms } from '../data/mockData';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Check, X } from 'lucide-react';

type SortMetric = 'returnPct' | 'sharpeRatio' | 'sortinoRatio' | 'calmarRatio' | 'winRate' | 'profitFactor' | 'maxDrawdown';

export function Compare() {
  const [selectedAlgos, setSelectedAlgos] = useState<string[]>(['algo-001', 'algo-002', 'algo-008']);
  const [sortMetric, setSortMetric] = useState<SortMetric>('sharpeRatio');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  const toggleAlgo = (id: string) => {
    setSelectedAlgos(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const filteredAlgos = algorithms.filter(a => {
    if (riskFilter !== 'all' && a.riskProfile !== riskFilter) return false;
    return true;
  });

  const sortedAlgos = [...filteredAlgos].sort((a, b) => {
    return (b.metrics[sortMetric] as number) - (a.metrics[sortMetric] as number);
  });

  const selectedData = algorithms.filter(a => selectedAlgos.includes(a.id));

  // Radar chart data
  const radarData = [
    { metric: 'Return', ...Object.fromEntries(selectedData.map(a => [a.name, a.metrics.returnPct / 50 * 100])) },
    { metric: 'Sharpe', ...Object.fromEntries(selectedData.map(a => [a.name, a.metrics.sharpeRatio / 3 * 100])) },
    { metric: 'Win Rate', ...Object.fromEntries(selectedData.map(a => [a.name, a.metrics.winRate])) },
    { metric: 'Profit Factor', ...Object.fromEntries(selectedData.map(a => [a.name, a.metrics.profitFactor / 3 * 100])) },
    { metric: 'Recovery', ...Object.fromEntries(selectedData.map(a => [a.name, a.metrics.recoveryFactor / 5 * 100])) },
    { metric: 'Calmar', ...Object.fromEntries(selectedData.map(a => [a.name, a.metrics.calmarRatio / 4 * 100])) },
  ];

  const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <FadeIn>
          <div className="mb-12">
            <span className="label text-muted mb-4 block">Analytics</span>
            <h1 className="display-lg text-5xl lg:text-6xl text-primary mb-4">
              Compare Algorithms
            </h1>
            <p className="text-[17px] font-light text-secondary max-w-2xl">
              Advanced comparison with 20+ analytical metrics. Select up to 5 algorithms to compare side-by-side.
            </p>
          </div>
        </FadeIn>

        {/* Selection */}
        <FadeIn delay={0.1}>
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-primary">Select Algorithms</h3>
              <div className="flex items-center gap-2 ml-auto">
                <label className="text-[13px] text-muted">Filter by risk:</label>
                <select
                  value={riskFilter}
                  onChange={e => setRiskFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-[13px] bg-surface-theme border border-base-theme text-primary"
                >
                  <option value="all">All</option>
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {filteredAlgos.map(algo => (
                <button
                  key={algo.id}
                  onClick={() => toggleAlgo(algo.id)}
                  disabled={!selectedAlgos.includes(algo.id) && selectedAlgos.length >= 5}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedAlgos.includes(algo.id)
                      ? 'border-accent-purple bg-accent-purple/10'
                      : 'border-base-theme bg-base-theme hover:border-strong-theme'
                  } ${!selectedAlgos.includes(algo.id) && selectedAlgos.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-medium text-primary">{algo.name}</span>
                    {selectedAlgos.includes(algo.id) ? (
                      <Check className="w-4 h-4 text-accent-purple" />
                    ) : (
                      <X className="w-4 h-4 text-muted" />
                    )}
                  </div>
                  <p className="text-[11px] text-muted">{algo.strategyClass}</p>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Radar Chart Comparison */}
        {selectedData.length > 0 && (
          <FadeIn delay={0.2}>
            <div className="glass rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Performance Radar</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--color-border-base)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                  <PolarRadiusAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
                  {selectedData.map((algo, i) => (
                    <Radar
                      key={algo.id}
                      name={algo.name}
                      dataKey={algo.name}
                      stroke={colors[i]}
                      fill={colors[i]}
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  ))}
                  <Tooltip 
                    contentStyle={{ 
                      background: 'var(--color-bg-elevated)', 
                      border: '1px solid var(--color-border-base)', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-4 mt-6">
                {selectedData.map((algo, i) => (
                  <div key={algo.id} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
                    <span className="text-[13px] text-secondary">{algo.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Equity Curves Comparison */}
        {selectedData.length > 0 && (
          <FadeIn delay={0.3}>
            <div className="glass rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Equity Curves</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart>
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(value) => value.toString()}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} 
                    axisLine={false} 
                    tickLine={false}
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => value.toFixed(0)}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'var(--color-bg-elevated)', 
                      border: '1px solid var(--color-border-base)', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                    formatter={(value: number) => [value.toFixed(2)]}
                  />
                  {selectedData.map((algo, i) => {
                    const chartData = algo.equityCurve.map((v, idx) => ({ day: idx, [algo.name]: v }));
                    return (
                      <Area
                        key={algo.id}
                        type="monotone"
                        dataKey={algo.name}
                        data={chartData}
                        stroke={colors[i]}
                        fill={colors[i]}
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    );
                  })}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </FadeIn>
        )}

        {/* Detailed Metrics Table */}
        <FadeIn delay={0.4}>
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-primary">Detailed Metrics</h3>
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-muted">Sort by:</label>
                <select
                  value={sortMetric}
                  onChange={e => setSortMetric(e.target.value as SortMetric)}
                  className="px-3 py-1.5 rounded-lg text-[13px] bg-surface-theme border border-base-theme text-primary"
                >
                  <option value="sharpeRatio">Sharpe Ratio</option>
                  <option value="sortinoRatio">Sortino Ratio</option>
                  <option value="calmarRatio">Calmar Ratio</option>
                  <option value="returnPct">Return %</option>
                  <option value="winRate">Win Rate</option>
                  <option value="profitFactor">Profit Factor</option>
                  <option value="maxDrawdown">Max Drawdown</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-base-theme">
                    <th className="text-left py-3 px-4 text-[11px] uppercase tracking-wider text-muted font-medium">Algorithm</th>
                    <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider text-muted font-medium">Return</th>
                    <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider text-muted font-medium">Sharpe</th>
                    <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider text-muted font-medium">Sortino</th>
                    <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider text-muted font-medium">Calmar</th>
                    <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider text-muted font-medium">Win Rate</th>
                    <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider text-muted font-medium">Profit Factor</th>
                    <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider text-muted font-medium">Max DD</th>
                    <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider text-muted font-medium">Recovery</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAlgos.map((algo, i) => (
                    <motion.tr
                      key={algo.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-base-theme hover:bg-hover-theme transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-[14px] font-medium text-primary">{algo.name}</p>
                          <p className="text-[11px] text-muted">{algo.strategyClass}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right metric text-profit">+{algo.metrics.returnPct}%</td>
                      <td className="py-4 px-4 text-right metric text-secondary">{algo.metrics.sharpeRatio}</td>
                      <td className="py-4 px-4 text-right metric text-secondary">{algo.metrics.sortinoRatio}</td>
                      <td className="py-4 px-4 text-right metric text-secondary">{algo.metrics.calmarRatio}</td>
                      <td className="py-4 px-4 text-right metric text-secondary">{algo.metrics.winRate}%</td>
                      <td className="py-4 px-4 text-right metric text-secondary">{algo.metrics.profitFactor}</td>
                      <td className="py-4 px-4 text-right metric text-loss">-{algo.metrics.maxDrawdown}%</td>
                      <td className="py-4 px-4 text-right metric text-secondary">{algo.metrics.recoveryFactor}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
