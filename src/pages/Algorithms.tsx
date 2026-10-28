import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import { algorithms } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';

function MiniChart({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ x: i, y: v }));
  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={chartData}>
        <Area type="monotone" dataKey="y" stroke="currentColor" fill="none" strokeWidth={1} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function Algorithms() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = algorithms.filter(a => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (riskFilter !== 'all' && a.riskProfile !== riskFilter) return false;
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
      {/* Header */}
      <FadeIn>
        <div className="mb-16">
          <span className="label text-neutral-500 mb-4 block">Catalog</span>
          <h1 className="display-lg text-5xl lg:text-6xl text-neutral-100 mb-4">
            Algorithms
          </h1>
          <p className="text-[15px] font-light text-neutral-400 max-w-xl">
            Systematically developed trading strategies with documented methodology.
          </p>
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.1}>
        <div className={`flex flex-wrap items-center gap-4 mb-12 pb-8 border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`w-full pl-11 pr-4 py-2.5 rounded-full text-[13px] ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-neutral-100 placeholder:text-neutral-600' 
                  : 'bg-black/5 border-black/10 text-neutral-900 placeholder:text-neutral-400'
              } border focus:outline-none focus:border-accent/50 transition-colors`}
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
            <select
              value={riskFilter}
              onChange={e => setRiskFilter(e.target.value)}
              className={`px-4 py-2.5 rounded-full text-[13px] ${
                isDark ? 'bg-white/5 border-white/10 text-neutral-100' : 'bg-black/5 border-black/10 text-neutral-900'
              } border focus:outline-none focus:border-accent/50`}
            >
              <option value="all">All Risk</option>
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className={`px-4 py-2.5 rounded-full text-[13px] ${
                isDark ? 'bg-white/5 border-white/10 text-neutral-100' : 'bg-black/5 border-black/10 text-neutral-900'
              } border focus:outline-none focus:border-accent/50`}
            >
              <option value="all">All Status</option>
              <option value="backtest">Backtest</option>
              <option value="paper">Paper</option>
              <option value="live">Live</option>
            </select>
          </div>
        </div>
      </FadeIn>

      {/* Results */}
      <div className="space-y-px">
        {filtered.map((algo, i) => (
          <motion.div
            key={algo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/algorithms/${algo.slug}`}
              className={`group block py-8 border-b ${isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-black/5 hover:bg-black/[0.02]'} transition-colors duration-300`}
            >
              <div className="grid grid-cols-12 gap-6 items-center">
                {/* Name & Description */}
                <div className="col-span-12 lg:col-span-5">
                  <h3 className="text-xl font-light text-neutral-100 group-hover:text-accent transition-colors mb-2">
                    {algo.name}
                  </h3>
                  <p className={`text-[13px] leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {algo.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-500">{algo.strategyClass}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span className={`text-[11px] uppercase tracking-wider ${
                      algo.status === 'live' ? 'text-profit' :
                      algo.status === 'paper' ? 'text-info' :
                      'text-warning'
                    }`}>
                      {algo.status}
                    </span>
                  </div>
                </div>

                {/* Chart */}
                <div className="col-span-6 lg:col-span-3 text-profit">
                  <MiniChart data={algo.equityCurve} />
                </div>

                {/* Metrics */}
                <div className="col-span-6 lg:col-span-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Return</p>
                      <p className="metric text-lg text-profit">+{algo.metrics.returnPct}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Max DD</p>
                      <p className="metric text-lg text-loss">-{algo.metrics.maxDrawdown}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Win Rate</p>
                      <p className="metric text-lg text-neutral-300">{algo.metrics.winRate}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Profit Factor</p>
                      <p className="metric text-lg text-neutral-300">{algo.metrics.profitFactor}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-12 lg:col-span-1 text-right">
                  <p className="metric text-sm text-neutral-400">
                    {'monthly' in algo.pricing ? `$${algo.pricing.monthly}` : `$${algo.pricing.license}`}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-neutral-500">No algorithms match your filters.</p>
        </div>
      )}
    </div>
  );
}
