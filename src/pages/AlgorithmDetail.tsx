import { useParams, Link } from 'react-router-dom';
import { algorithms } from '../data/mockData';
import { formatPercent, formatMoney, formatNumber, formatRatio } from '../utils/format';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

type TabId = 'overview' | 'trades' | 'risk' | 'robustness' | 'technical';

export function AlgorithmDetail() {
  const { slug } = useParams();
  const algo = algorithms.find(a => a.id === slug);
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  if (!algo) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-32 text-center">
        <h2 className="text-4xl text-primary mb-4">Not found</h2>
        <Link to="/algorithms" className="text-muted hover:text-primary">← Back</Link>
      </div>
    );
  }

  const chartData = algo.equityCurve.map((v, i) => ({ day: i, equity: v }));

  const tabs = [
    { id: 'overview' as TabId, label: 'Overview' },
    { id: 'trades' as TabId, label: 'Trade Statistics' },
    { id: 'risk' as TabId, label: 'Risk Analysis' },
    { id: 'robustness' as TabId, label: 'Robustness' },
    { id: 'technical' as TabId, label: 'Technical' },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
      <Link to="/algorithms" className="inline-flex items-center gap-2 text-[13px] text-muted hover:text-primary mb-12">
        <ArrowLeft className="w-4 h-4" />
        All algorithms
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="grid lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-[11px] uppercase tracking-wider px-3 py-1 rounded-full ${
                algo.status === 'live' ? 'bg-profit/10 text-profit' :
                algo.status === 'paper' ? 'bg-info/10 text-info' :
                'bg-warning/10 text-warning'
              }`}>
                {algo.status}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-muted">{algo.strategyClass}</span>
            </div>
            <h1 className="display-lg text-5xl lg:text-6xl text-primary mb-6">{algo.name}</h1>
            <p className="text-[17px] font-light text-secondary">{algo.description}</p>
          </div>
          <div className="lg:col-span-4">
            <div className="border-t border-base-theme pt-6">
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Annual Return (CAGR)</p>
              <p className="metric text-4xl text-profit">{formatPercent(algo.metrics.cagr, 1)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Annual Return</p>
              <p className="metric text-2xl text-profit">{formatPercent(algo.metrics.cagr, 1)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Max Drawdown</p>
              <p className="metric text-2xl text-loss">{formatPercent(-algo.metrics.maxDrawdown, 1)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Sharpe Ratio</p>
              <p className="metric text-2xl text-primary">{formatRatio(algo.metrics.sharpeRatio)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Profit Factor</p>
              <p className="metric text-2xl text-primary">{formatRatio(algo.metrics.profitFactor)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Win Rate</p>
              <p className="metric text-2xl text-primary">{formatPercent(algo.metrics.winRate, 1)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id ? 'btn-gradient text-white' : 'glass text-secondary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {activeTab === 'overview' && (
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-primary mb-6">Equity Curve</h3>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-base)" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatNumber(v, 0)} />
                <Tooltip formatter={(value: number) => [formatNumber(value, 2), 'Equity']} />
                <Area type="monotone" dataKey="equity" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'trades' && (
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-primary mb-6">Trade Statistics</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Total Trades</p>
                <p className="metric text-xl text-primary">{formatNumber(algo.metrics.totalTrades, 0)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Win Rate</p>
                <p className="metric text-xl text-primary">{formatPercent(algo.metrics.winRate, 1)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Profit Factor</p>
                <p className="metric text-xl text-primary">{formatRatio(algo.metrics.profitFactor)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Expectancy</p>
                <p className="metric text-xl text-primary">{formatMoney(algo.metrics.expectancy * 1000, 0)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg Win</p>
                <p className="metric text-xl text-profit">{formatPercent(algo.metrics.avgWin, 2)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg Loss</p>
                <p className="metric text-xl text-loss">{formatPercent(-algo.metrics.avgLoss, 2)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg R-Multiple</p>
                <p className="metric text-xl text-primary">{formatRatio(algo.metrics.avgRMultiple)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Trades/Day</p>
                <p className="metric text-xl text-primary">{formatNumber(algo.metrics.tradesPerDay, 1)}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-primary mb-6">Risk Analysis</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Max Drawdown</p>
                <p className="metric text-xl text-loss">{formatPercent(-algo.metrics.maxDrawdown, 1)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Current DD</p>
                <p className="metric text-xl text-loss">{formatPercent(-algo.metrics.currentDrawdown, 1)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Volatility</p>
                <p className="metric text-xl text-primary">{formatPercent(algo.metrics.volatility, 1)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">VaR (95%)</p>
                <p className="metric text-xl text-primary">{formatPercent(algo.metrics.var95, 1)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Worst Day</p>
                <p className="metric text-xl text-loss">{formatPercent(algo.metrics.worstDay, 1)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Worst Week</p>
                <p className="metric text-xl text-loss">{formatPercent(algo.metrics.worstWeek, 1)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Risk of Ruin</p>
                <p className="metric text-xl text-primary">{formatPercent(algo.metrics.riskOfRuin * 100, 2)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Max Consecutive Losses</p>
                <p className="metric text-xl text-primary">{formatNumber(algo.metrics.maxConsecutiveLosses, 0)}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'robustness' && (
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-primary mb-6">Robustness</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">In-Sample</p>
                <p className="metric text-xl text-profit">{formatPercent(algo.metrics.inSampleReturn, 1)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Out-of-Sample</p>
                <p className="metric text-xl text-profit">{formatPercent(algo.metrics.outOfSampleReturn, 1)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Walk-Forward</p>
                <p className="metric text-xl text-profit">{formatPercent(algo.metrics.walkForwardReturn, 1)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Monte Carlo (P50)</p>
                <p className="metric text-xl text-primary">{formatPercent(algo.metrics.monteCarloP50, 1)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Overfitting Risk</p>
                <p className="metric text-xl text-primary">{algo.metrics.overfittingRisk.toUpperCase()}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Market Behavior</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Trend Performance</p>
                  <p className="metric text-xl text-primary">{formatPercent(algo.metrics.trendPerformance, 1)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Flat Performance</p>
                  <p className="metric text-xl text-primary">{formatPercent(algo.metrics.flatPerformance, 1)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Long Win Rate</p>
                  <p className="metric text-xl text-primary">{formatPercent(algo.metrics.longWinRate, 1)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Short Win Rate</p>
                  <p className="metric text-xl text-primary">{formatPercent(algo.metrics.shortWinRate, 1)}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Capital Efficiency</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Recommended Capital</p>
                  <p className="metric text-xl text-primary">{formatMoney(algo.metrics.recommendedCapital)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Leverage</p>
                  <p className="metric text-xl text-primary">{formatNumber(algo.metrics.leverage, 0)}x</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Return on Capital</p>
                  <p className="metric text-xl text-primary">{formatPercent(algo.metrics.returnOnCapital, 1)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Strategy Capacity</p>
                  <p className="metric text-xl text-primary">{algo.metrics.strategyCapacity}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Operational</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">System Uptime</p>
                  <p className="metric text-xl text-primary">{formatPercent(algo.metrics.systemUptime, 1)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Signal Delay</p>
                  <p className="metric text-xl text-primary">{formatNumber(algo.metrics.signalDelay, 0)} ms</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Missed Trades</p>
                  <p className="metric text-xl text-primary">{formatNumber(algo.metrics.missedTrades, 0)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Broker Stability</p>
                  <p className="metric text-xl text-primary">{formatPercent(algo.metrics.brokerStability, 1)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
