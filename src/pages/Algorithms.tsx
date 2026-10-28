import { Link } from 'react-router-dom';
import { algorithms } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';

function MiniChart({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ x: i, y: v }));
  const min = Math.min(...data);
  const max = Math.max(...data);
  const buffer = (max - min) * 0.15;
  
  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={chartData}>
        <YAxis domain={[min - buffer, max + buffer]} hide tickFormatter={(value) => value.toFixed(0)} />
        <Area type="monotone" dataKey="y" stroke="currentColor" fill="none" strokeWidth={1} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function Algorithms() {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [marketFilter, setMarketFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('returnPct');

  const filtered = algorithms.filter(a => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (riskFilter !== 'all' && a.riskProfile !== riskFilter) return false;
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (marketFilter !== 'all' && !a.markets.includes(marketFilter)) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'returnPct') return b.metrics.returnPct - a.metrics.returnPct;
    if (sortBy === 'sharpeRatio') return b.metrics.sharpeRatio - a.metrics.sharpeRatio;
    if (sortBy === 'winRate') return b.metrics.winRate - a.metrics.winRate;
    if (sortBy === 'profitFactor') return b.metrics.profitFactor - a.metrics.profitFactor;
    if (sortBy === 'maxDrawdown') return a.metrics.maxDrawdown - b.metrics.maxDrawdown;
    return 0;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
      <FadeIn>
        <div className="mb-16">
          <span className="label text-muted mb-4 block">Catalog</span>
          <h1 className="display-lg text-5xl lg:text-6xl text-primary mb-4">
            Algorithms
          </h1>
          <p className="text-[15px] font-light text-secondary max-w-xl mb-6">
            Systematically developed trading strategies with documented methodology.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-muted">
              Showing <span className="text-primary font-medium">{filtered.length}</span> of <span className="text-primary font-medium">{algorithms.length}</span> strategies
            </span>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-wrap items-center gap-4 mb-12 pb-8 border-b border-base-theme">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full text-[13px] bg-surface-theme border border-base-theme text-primary placeholder:text-subtle focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-muted" />
            <select
              value={riskFilter}
              onChange={e => setRiskFilter(e.target.value)}
              className="px-4 py-2.5 rounded-full text-[13px] bg-surface-theme border border-base-theme text-primary focus:outline-none focus:border-accent/50"
            >
              <option value="all">All Risk</option>
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-full text-[13px] bg-surface-theme border border-base-theme text-primary focus:outline-none focus:border-accent/50"
            >
              <option value="all">All Status</option>
              <option value="backtest">Backtest</option>
              <option value="paper">Paper</option>
              <option value="live">Live</option>
            </select>
            <select
              value={marketFilter}
              onChange={e => setMarketFilter(e.target.value)}
              className="px-4 py-2.5 rounded-full text-[13px] bg-surface-theme border border-base-theme text-primary focus:outline-none focus:border-accent/50"
            >
              <option value="all">All Markets</option>
              <option value="Futures">Futures</option>
              <option value="Crypto">Crypto</option>
              <option value="Forex">Forex</option>
              <option value="Equities">Equities</option>
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-full text-[13px] bg-surface-theme border border-base-theme text-primary focus:outline-none focus:border-accent/50"
            >
              <option value="returnPct">Sort: Return</option>
              <option value="sharpeRatio">Sort: Sharpe</option>
              <option value="winRate">Sort: Win Rate</option>
              <option value="profitFactor">Sort: Profit Factor</option>
              <option value="maxDrawdown">Sort: Lowest DD</option>
            </select>
          </div>
        </div>
      </FadeIn>

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
              className="group block py-8 border-b border-base-theme hover:bg-hover-theme transition-colors duration-300"
            >
              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-12 lg:col-span-5">
                  <h3 className="text-xl font-light text-primary group-hover:text-accent transition-colors mb-2">
                    {algo.name}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-secondary">
                    {algo.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[11px] uppercase tracking-wider text-muted">{algo.strategyClass}</span>
                    <span className="w-1 h-1 rounded-full bg-subtle" />
                    <span className={`text-[11px] uppercase tracking-wider ${
                      algo.status === 'live' ? 'text-profit' :
                      algo.status === 'paper' ? 'text-info' :
                      'text-warning'
                    }`}>
                      {algo.status}
                    </span>
                  </div>
                </div>

                <div className="col-span-6 lg:col-span-3 text-profit">
                  <MiniChart data={algo.equityCurve} />
                </div>

                <div className="col-span-6 lg:col-span-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Return</p>
                      <p className="metric text-lg text-profit">+{algo.metrics.returnPct}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Max DD</p>
                      <p className="metric text-lg text-loss">-{algo.metrics.maxDrawdown}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Win Rate</p>
                      <p className="metric text-lg text-secondary">{algo.metrics.winRate}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Profit Factor</p>
                      <p className="metric text-lg text-secondary">{algo.metrics.profitFactor}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-1 text-right">
                  <p className="metric text-sm text-muted">
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
          <p className="text-muted">No algorithms match your filters.</p>
        </div>
      )}
    </div>
  );
}
