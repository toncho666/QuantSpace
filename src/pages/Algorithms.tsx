import { useState } from 'react';
import { Link } from 'react-router-dom';
import { algorithms } from '../data/mockData';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { formatPercent, formatRatio } from '../utils/format';

export function Algorithms() {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [marketFilter, setMarketFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('cagr');

  const filtered = algorithms
    .filter(algo => {
      if (search && !algo.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (riskFilter !== 'all' && algo.riskProfile !== riskFilter) return false;
      if (statusFilter !== 'all' && algo.status !== statusFilter) return false;
      if (marketFilter !== 'all' && !algo.markets.includes(marketFilter)) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'cagr':
          return b.metrics.cagr - a.metrics.cagr;
        case 'sharpe':
          return b.metrics.sharpeRatio - a.metrics.sharpeRatio;
        case 'winRate':
          return b.metrics.winRate - a.metrics.winRate;
        case 'profitFactor':
          return b.metrics.profitFactor - a.metrics.profitFactor;
        case 'maxDrawdown':
          return a.metrics.maxDrawdown - b.metrics.maxDrawdown;
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="label text-muted mb-4 block">Catalog</span>
        <h1 className="display-lg text-5xl lg:text-6xl text-primary mb-4">
          Algorithms
        </h1>
        <p className="text-[15px] font-light text-secondary max-w-xl">
          Systematically developed strategies with full institutional metrics.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="w-4 h-4 text-muted" />
          <span className="text-[13px] font-medium text-primary">Filters</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search algorithms..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-[13px] bg-surface-theme border border-base-theme text-primary placeholder:text-subtle focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          {/* Risk Profile */}
          <select
            value={riskFilter}
            onChange={e => setRiskFilter(e.target.value)}
            className="px-4 py-2.5 rounded-full text-[13px] bg-surface-theme border border-base-theme text-primary focus:outline-none focus:border-accent/50"
          >
            <option value="all">All Risk Profiles</option>
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-full text-[13px] bg-surface-theme border border-base-theme text-primary focus:outline-none focus:border-accent/50"
          >
            <option value="all">All Status</option>
            <option value="backtest">Backtest</option>
            <option value="paper">Paper Trading</option>
            <option value="live">Live</option>
          </select>

          {/* Market */}
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
        </div>

        {/* Sort */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-base-theme">
          <span className="text-[13px] text-muted">Sort by:</span>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'cagr', label: 'CAGR' },
              { value: 'sharpe', label: 'Sharpe' },
              { value: 'winRate', label: 'Win Rate' },
              { value: 'profitFactor', label: 'Profit Factor' },
              { value: 'maxDrawdown', label: 'Lowest DD' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1.5 rounded-full text-[12px] transition-colors ${
                  sortBy === option.value
                    ? 'btn-gradient text-white'
                    : 'bg-surface-theme text-secondary hover:text-primary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 pt-4 border-t border-base-theme">
          <p className="text-[13px] text-muted">
            Showing <span className="text-primary font-medium">{filtered.length}</span> of{' '}
            <span className="text-primary font-medium">{algorithms.length}</span> strategies
          </p>
        </div>
      </motion.div>

      {/* Algorithms List */}
      <div className="space-y-6">
        {filtered.map((algo, i) => (
          <motion.div
            key={algo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/algorithms/${algo.id}`}
              className="block glass rounded-2xl p-8 hover:scale-[1.02] transition-transform"
            >
              <div className="grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-light text-primary mb-2">{algo.name}</h3>
                  <p className="text-[13px] text-secondary mb-3">{algo.description}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[11px] uppercase tracking-wider text-muted">
                      {algo.strategyClass}
                    </span>
                    <span className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      algo.status === 'live' ? 'bg-profit/10 text-profit' :
                      algo.status === 'paper' ? 'bg-info/10 text-info' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {algo.status}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-muted">
                      {algo.riskProfile}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">CAGR</p>
                    <p className="metric text-lg text-profit">{formatPercent(algo.metrics.cagr, 1)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Sharpe</p>
                    <p className="metric text-lg text-primary">{formatRatio(algo.metrics.sharpeRatio)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Max DD</p>
                    <p className="metric text-lg text-loss">{formatPercent(-algo.metrics.maxDrawdown, 1)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Win Rate</p>
                    <p className="metric text-lg text-primary">{formatPercent(algo.metrics.winRate, 1)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Profit Factor</p>
                    <p className="metric text-lg text-primary">{formatRatio(algo.metrics.profitFactor)}</p>
                  </div>
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
