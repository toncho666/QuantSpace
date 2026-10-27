import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../App';
import { algorithms, DEMO_DISCLAIMER } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AlertTriangle, ArrowLeft, Check, Clock } from 'lucide-react';

export function AlgorithmDetail() {
  const { slug } = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const algo = algorithms.find(a => a.slug === slug);

  if (!algo) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Algorithm not found</h2>
        <Link to="/algorithms" className="text-navy-400 mt-4 inline-block">← Back to algorithms</Link>
      </div>
    );
  }

  const chartData = algo.equityCurve.map((v, i) => ({ day: i + 1, equity: v }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <Link to="/algorithms" className={`inline-flex items-center gap-2 text-sm mb-6 ${isDark ? 'text-graphite-400 hover:text-graphite-200' : 'text-graphite-600 hover:text-graphite-900'}`}>
        <ArrowLeft className="w-4 h-4" /> Back to Algorithms
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{algo.name}</h1>
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              algo.status === 'live' ? 'bg-profit/10 text-profit' :
              algo.status === 'paper' ? 'bg-navy-400/10 text-navy-400' :
              'bg-warning/10 text-warning'
            }`}>
              {algo.status === 'backtest' ? 'Backtest Only' : algo.status === 'paper' ? 'Paper Trading' : 'Live'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-graphite-800 text-graphite-400' : 'bg-graphite-100 text-graphite-600'}`}>{algo.strategyClass}</span>
            <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-graphite-800 text-graphite-400' : 'bg-graphite-100 text-graphite-600'}`}>{algo.riskProfile} risk</span>
            {algo.markets.map(m => (
              <span key={m} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-graphite-800 text-graphite-500' : 'bg-graphite-100 text-graphite-500'}`}>{m}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <Link to="/register" className="px-5 py-2.5 rounded-lg bg-navy-500 text-white font-medium text-sm hover:bg-navy-600 transition-colors">
            Subscribe
          </Link>
        </div>
      </div>

      {/* Demo Warning */}
      <div className={`rounded-lg p-4 mb-8 flex items-start gap-3 ${isDark ? 'bg-warning/5 border border-warning/20' : 'bg-warning/5 border border-warning/20'}`}>
        <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
        <p className="text-sm text-warning">{DEMO_DISCLAIMER}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <h2 className="text-lg font-semibold mb-3">Strategy Description</h2>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
              {algo.fullDescription}
            </p>
            <h3 className="text-sm font-semibold mt-4 mb-2">Signal Logic</h3>
            <p className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>{algo.signalLogic}</p>
          </div>

          {/* Equity Curve */}
          <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Equity Curve</h2>
              <span className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>{algo.metrics.observationPeriod}</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="detailGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: isDark ? '#64748b' : '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: isDark ? '#64748b' : '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: isDark ? '#1e293b' : '#fff', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: number) => [value.toFixed(2), 'Equity']}
                />
                <Area type="monotone" dataKey="equity" stroke="#10b981" fill="url(#detailGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Trade History Sample */}
          <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <h2 className="text-lg font-semibold mb-4">Recent Trades (Demo)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-graphite-800' : 'border-graphite-200'}`}>
                    <th className="text-left py-2 font-medium text-graphite-500">Date</th>
                    <th className="text-left py-2 font-medium text-graphite-500">Instrument</th>
                    <th className="text-left py-2 font-medium text-graphite-500">Dir</th>
                    <th className="text-right py-2 font-medium text-graphite-500">Entry</th>
                    <th className="text-right py-2 font-medium text-graphite-500">Exit</th>
                    <th className="text-right py-2 font-medium text-graphite-500">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: '2026-01-19', inst: 'ES', dir: 'LONG', entry: '4892.50', exit: '4918.00', pnl: '+0.52%' },
                    { date: '2026-01-18', inst: 'NQ', dir: 'SHORT', entry: '17245', exit: '17190', pnl: '+0.32%' },
                    { date: '2026-01-17', inst: 'ES', dir: 'LONG', entry: '4870.00', exit: '4855.00', pnl: '-0.31%' },
                    { date: '2026-01-16', inst: 'CL', dir: 'SHORT', entry: '73.45', exit: '72.10', pnl: '+1.84%' },
                    { date: '2026-01-15', inst: 'BTC', dir: 'LONG', entry: '42150', exit: '42890', pnl: '+1.76%' },
                  ].map((trade, i) => (
                    <tr key={i} className={`border-b ${isDark ? 'border-graphite-800/50' : 'border-graphite-100'}`}>
                      <td className="py-2.5 font-mono text-xs">{trade.date}</td>
                      <td className="py-2.5">{trade.inst}</td>
                      <td className="py-2.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${trade.dir === 'LONG' ? 'bg-profit/10 text-profit' : 'bg-loss/10 text-loss'}`}>
                          {trade.dir}
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-mono text-xs">{trade.entry}</td>
                      <td className="py-2.5 text-right font-mono text-xs">{trade.exit}</td>
                      <td className={`py-2.5 text-right font-mono text-xs font-medium ${trade.pnl.startsWith('+') ? 'text-profit' : 'text-loss'}`}>{trade.pnl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Limitations */}
          <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <h2 className="text-lg font-semibold mb-3">Limitations & Considerations</h2>
            <ul className="space-y-2">
              {algo.limitations.map((lim, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-graphite-500 mt-1">•</span>
                  <span className={isDark ? 'text-graphite-400' : 'text-graphite-600'}>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metrics */}
          <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <h3 className="font-semibold mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              {[
                { label: 'Return', value: `+${algo.metrics.returnPct}%`, color: 'text-profit' },
                { label: 'Max Drawdown', value: `-${algo.metrics.maxDrawdown}%`, color: 'text-loss' },
                { label: 'Total Trades', value: algo.metrics.totalTrades.toString(), color: '' },
                { label: 'Win Rate', value: `${algo.metrics.winRate}%`, color: '' },
                { label: 'Profit Factor', value: algo.metrics.profitFactor.toString(), color: '' },
                { label: 'Avg R:R', value: `${algo.metrics.avgRR}:1`, color: '' },
                { label: 'Sharpe Ratio', value: algo.metrics.sharpeRatio.toString(), color: '' },
                { label: 'Avg Win', value: `+${algo.metrics.avgWin}%`, color: 'text-profit' },
                { label: 'Avg Loss', value: `-${algo.metrics.avgLoss}%`, color: 'text-loss' },
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>{m.label}</span>
                  <span className={`text-sm font-medium font-mono ${m.color}`}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Test Parameters */}
          <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <h3 className="font-semibold mb-4">Test Parameters</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>Commission</span>
                <span className="text-sm font-mono">{algo.metrics.commissionPct}%</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>Slippage</span>
                <span className="text-sm font-mono">{algo.metrics.slippagePct}%</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>Timeframes</span>
                <span className="text-sm">{algo.timeframes.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>Last Updated</span>
                <span className="text-sm font-mono">{algo.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className={`rounded-xl p-6 ${isDark ? 'bg-navy-900/30 border border-navy-800' : 'bg-navy-50 border border-navy-200'}`}>
            <h3 className="font-semibold mb-4">Pricing</h3>
            {'monthly' in algo.pricing ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>Monthly</span>
                  <span className="text-lg font-bold">${algo.pricing.monthly}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>Annual</span>
                  <span className="text-lg font-bold">${algo.pricing.annual}</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <span className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>License</span>
                <span className="text-lg font-bold">${algo.pricing.license}</span>
              </div>
            )}
            <Link to="/register" className="mt-4 block text-center py-2.5 rounded-lg bg-navy-500 text-white font-medium text-sm hover:bg-navy-600 transition-colors">
              Subscribe Now
            </Link>
          </div>

          {/* Status */}
          <div className={`rounded-xl p-4 flex items-center gap-3 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-graphite-50 border border-graphite-200'}`}>
            <Clock className="w-4 h-4 text-graphite-500" />
            <div>
              <p className="text-sm font-medium">Data Status</p>
              <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>
                {algo.status === 'backtest' ? 'Historical backtest — not validated in live markets' :
                 algo.status === 'paper' ? 'Paper trading — no real capital at risk' :
                 'Live trading — real execution'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
