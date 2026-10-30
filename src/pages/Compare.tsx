import { useState } from 'react';
import { algorithms } from '../data/mockData';
import { formatPercent, formatRatio } from '../utils/format';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function Compare() {
  const [selected, setSelected] = useState<string[]>([algorithms[0].id, algorithms[1].id, algorithms[7].id, algorithms[4].id, algorithms[11].id]);

  const toggleAlgo = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id].slice(0, 5)
    );
  };

  const selectedAlgos = algorithms.filter(a => selected.includes(a.id));
  const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <span className="label text-muted mb-4 block">Analytics</span>
        <h1 className="display-lg text-5xl lg:text-6xl text-primary mb-4">Compare Algorithms</h1>
        <p className="text-[17px] font-light text-secondary">Select up to 5 algorithms to compare.</p>
      </motion.div>

      {/* Selection */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="glass rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-primary mb-4">Select Algorithms</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {algorithms.map(algo => (
              <button
                key={algo.id}
                onClick={() => toggleAlgo(algo.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selected.includes(algo.id)
                    ? 'border-accent-purple bg-accent-purple/10'
                    : 'border-base-theme bg-base-theme'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-medium text-primary">{algo.name}</span>
                  {selected.includes(algo.id) && <Check className="w-4 h-4 text-accent-purple" />}
                </div>
                <p className="text-[11px] text-muted">{algo.strategyClass}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Comparison Table */}
      {selectedAlgos.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-primary mb-6">Detailed Metrics</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-base-theme">
                    <th className="text-left py-3 px-4 text-[11px] uppercase tracking-wider text-muted">Metric</th>
                    {selectedAlgos.map((algo, i) => (
                      <th key={algo.id} className="text-right py-3 px-4 text-[11px] uppercase tracking-wider text-muted">
                        <span style={{ color: colors[i] }}>{algo.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-base-theme">
                    <td className="py-4 px-4 text-[13px] text-secondary">CAGR</td>
                    {selectedAlgos.map(algo => (
                      <td key={algo.id} className="py-4 px-4 text-right metric text-profit">
                        {formatPercent(algo.metrics.cagr, 1)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-base-theme">
                    <td className="py-4 px-4 text-[13px] text-secondary">Sharpe Ratio</td>
                    {selectedAlgos.map(algo => (
                      <td key={algo.id} className="py-4 px-4 text-right metric text-primary">
                        {formatRatio(algo.metrics.sharpeRatio)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-base-theme">
                    <td className="py-4 px-4 text-[13px] text-secondary">Max Drawdown</td>
                    {selectedAlgos.map(algo => (
                      <td key={algo.id} className="py-4 px-4 text-right metric text-loss">
                        {formatPercent(-algo.metrics.maxDrawdown, 1)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-base-theme">
                    <td className="py-4 px-4 text-[13px] text-secondary">Win Rate</td>
                    {selectedAlgos.map(algo => (
                      <td key={algo.id} className="py-4 px-4 text-right metric text-primary">
                        {formatPercent(algo.metrics.winRate, 1)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-base-theme">
                    <td className="py-4 px-4 text-[13px] text-secondary">Profit Factor</td>
                    {selectedAlgos.map(algo => (
                      <td key={algo.id} className="py-4 px-4 text-right metric text-primary">
                        {formatRatio(algo.metrics.profitFactor)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-base-theme">
                    <td className="py-4 px-4 text-[13px] text-secondary">Total Trades</td>
                    {selectedAlgos.map(algo => (
                      <td key={algo.id} className="py-4 px-4 text-right metric text-primary">
                        {algo.metrics.totalTrades}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
