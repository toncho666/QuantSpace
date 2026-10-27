import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import { algorithms } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Filter, Search } from 'lucide-react';
import { useState } from 'react';

function MiniChart({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ x: i, y: v }));
  return (
    <ResponsiveContainer width="100%" height={50}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="algoGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="y" stroke="#10b981" fill="url(#algoGrad)" strokeWidth={1.5} dot={false} />
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
  const [marketFilter, setMarketFilter] = useState<string>('all');

  const filtered = algorithms.filter(a => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (riskFilter !== 'all' && a.riskProfile !== riskFilter) return false;
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (marketFilter !== 'all' && !a.markets.includes(marketFilter)) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Trading Algorithms</h1>
        <p className={`mt-2 ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
          Browse our catalog of systematically developed trading strategies.
        </p>
      </div>

      {/* Filters */}
      <div className={`rounded-xl p-4 mb-8 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-500" />
            <input
              type="text"
              placeholder="Search algorithms..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200 placeholder:text-graphite-600' : 'bg-graphite-50 border-graphite-300 text-graphite-900 placeholder:text-graphite-400'} border focus:outline-none focus:ring-2 focus:ring-navy-500/50`}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-graphite-500" />
            <select
              value={riskFilter}
              onChange={e => setRiskFilter(e.target.value)}
              className={`px-3 py-2 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200' : 'bg-graphite-50 border-graphite-300 text-graphite-900'} border focus:outline-none`}
            >
              <option value="all">All Risk</option>
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className={`px-3 py-2 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200' : 'bg-graphite-50 border-graphite-300 text-graphite-900'} border focus:outline-none`}
            >
              <option value="all">All Status</option>
              <option value="backtest">Backtest</option>
              <option value="paper">Paper Trading</option>
              <option value="live">Live</option>
            </select>
            <select
              value={marketFilter}
              onChange={e => setMarketFilter(e.target.value)}
              className={`px-3 py-2 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200' : 'bg-graphite-50 border-graphite-300 text-graphite-900'} border focus:outline-none`}
            >
              <option value="all">All Markets</option>
              <option value="Futures">Futures</option>
              <option value="Crypto">Crypto</option>
              <option value="Forex">Forex</option>
              <option value="Equities">Equities</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map(algo => (
          <Link
            key={algo.id}
            to={`/algorithms/${algo.slug}`}
            className={`group rounded-xl p-6 transition-all hover:scale-[1.01] ${isDark ? 'bg-graphite-900/50 border border-graphite-800 hover:border-graphite-700' : 'bg-white border border-graphite-200 hover:border-graphite-300 shadow-sm'}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold">{algo.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-graphite-800 text-graphite-400' : 'bg-graphite-100 text-graphite-600'}`}>
                    {algo.strategyClass}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    algo.status === 'live' ? 'bg-profit/10 text-profit' :
                    algo.status === 'paper' ? 'bg-navy-400/10 text-navy-400' :
                    'bg-warning/10 text-warning'
                  }`}>
                    {algo.status === 'backtest' ? 'Backtest' : algo.status === 'paper' ? 'Paper' : 'Live'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-graphite-800 text-graphite-500' : 'bg-graphite-100 text-graphite-500'}`}>
                    {algo.riskProfile}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-profit font-semibold text-lg">+{algo.metrics.returnPct}%</p>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>{algo.metrics.observationPeriod}</p>
              </div>
            </div>
            <p className={`text-sm mb-4 ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
              {algo.description}
            </p>
            <MiniChart data={algo.equityCurve} />
            <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-graphite-800/50">
              <div>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Trades</p>
                <p className="text-sm font-medium">{algo.metrics.totalTrades}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Win Rate</p>
                <p className="text-sm font-medium">{algo.metrics.winRate}%</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>PF</p>
                <p className="text-sm font-medium">{algo.metrics.profitFactor}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Max DD</p>
                <p className="text-sm font-medium text-loss">-{algo.metrics.maxDrawdown}%</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-graphite-800/50">
              <div className="flex gap-1 flex-wrap">
                {algo.markets.slice(0, 3).map(m => (
                  <span key={m} className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-graphite-800 text-graphite-500' : 'bg-graphite-100 text-graphite-500'}`}>{m}</span>
                ))}
              </div>
              <span className="text-sm font-medium text-navy-400">
                {'monthly' in algo.pricing ? `$${algo.pricing.monthly}/mo` : `$${algo.pricing.license} license`}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className={isDark ? 'text-graphite-500' : 'text-graphite-500'}>No algorithms match your filters.</p>
        </div>
      )}
    </div>
  );
}
