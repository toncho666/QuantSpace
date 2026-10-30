import { useTheme } from '../App';
import { Activity, TrendingUp, AlertTriangle, Bell, BarChart3, Signal, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPercent, formatMoney, formatNumber, formatRatio } from '../utils/format';
import { signals } from '../data/mockData';

type Tab = 'overview' | 'signals' | 'analytics' | 'subscriptions';
type AnalyticsTab = 'return' | 'risk' | 'riskAdjusted' | 'trades' | 'robustness' | 'market' | 'capital' | 'operational';

export function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs: { id: Tab; label: string; icon: typeof Activity }[] = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'signals', label: 'Signals', icon: Signal },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'subscriptions', label: 'Subscriptions', icon: Wallet },
  ];

  return (
    <div className="flex min-h-screen pt-16">
      {/* Sidebar */}
      <aside className={`hidden lg:flex flex-col w-56 shrink-0 border-r ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <div className="p-6">
          <p className="label text-muted mb-4">Dashboard</p>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-normal transition-colors ${
                  activeTab === tab.id
                    ? isDark ? 'bg-white/5 text-neutral-100' : 'bg-black/5 text-neutral-900'
                    : isDark ? 'text-neutral-500 hover:text-neutral-200 hover:bg-white/[0.02]' : 'text-neutral-600 hover:text-neutral-900 hover:bg-black/[0.02]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6">
          <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
            <p className="text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Account</p>
            <p className="text-[13px] text-neutral-300">Free tier</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile tabs */}
        <div className={`lg:hidden flex overflow-x-auto border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-[13px] whitespace-nowrap border-b transition-colors ${
                activeTab === tab.id
                  ? 'border-accent text-neutral-100'
                  : `border-transparent ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 lg:p-12">
          {/* Demo banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 mb-8 flex items-center gap-3 border ${isDark ? 'border-warning/20 bg-warning/5' : 'border-warning/20 bg-warning/5'}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-warning" />
            <p className="text-[11px] text-warning">All data shown is synthetic demo data for illustration purposes only.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && <OverviewTab isDark={isDark} />}
              {activeTab === 'signals' && <SignalsTab isDark={isDark} />}
              {activeTab === 'analytics' && <AnalyticsTab isDark={isDark} />}
              {activeTab === 'subscriptions' && <SubscriptionsTab isDark={isDark} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-12">
      <div>
        <span className="label text-muted mb-4 block">Dashboard</span>
        <h2 className="display-md text-4xl text-primary">Overview</h2>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
        {[
          { label: 'Active Signals', value: '5', icon: Signal },
          { label: 'Open Trades', value: '3', icon: TrendingUp },
          { label: 'Alerts', value: '7', icon: Bell },
          { label: 'Active Bots', value: '2', icon: Activity },
        ].map((stat, i) => (
          <div key={i} className={`p-6 ${isDark ? 'bg-base' : 'bg-light-base'}`}>
            <stat.icon className="w-4 h-4 text-neutral-500 mb-3" />
            <p className="metric text-3xl text-primary mb-1">{stat.value}</p>
            <p className="text-[11px] uppercase tracking-wider text-neutral-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Signals */}
      <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <h3 className="text-lg font-light text-primary mb-6">Recent Signals</h3>
        <div className="space-y-px">
          {signals.slice(0, 6).map((sig, i) => (
            <div key={sig.id} className={`flex items-center justify-between py-4 border-b last:border-b-0 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${sig.direction === 'LONG' ? 'bg-profit/10' : 'bg-loss/10'}`}>
                  {sig.direction === 'LONG' ? <ArrowUpRight className="w-4 h-4 text-profit" /> : <ArrowDownRight className="w-4 h-4 text-loss" />}
                </div>
                <div>
                  <p className="text-[14px] text-primary">{sig.instrument}</p>
                  <p className="text-[11px] text-muted">{sig.algorithmName} • {sig.timeframe}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {sig.result !== undefined && (
                  <span className={`metric text-[13px] ${sig.result > 0 ? 'text-profit' : 'text-loss'}`}>
                    {sig.result > 0 ? '+' : ''}{formatPercent(sig.result, 1)}
                  </span>
                )}
                <span className={`text-[11px] uppercase tracking-wider px-2 py-1 rounded-full border ${
                  sig.status === 'ACTIVE' ? 'border-info/30 text-info' :
                  sig.status === 'CLOSED' ? 'border-base-theme text-muted' :
                  sig.status === 'TRIGGERED' ? 'border-profit/30 text-profit' :
                  'border-base-theme text-muted'
                }`}>{sig.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SignalsTab({ isDark }: { isDark: boolean }) {
  const [filter, setFilter] = useState<string>('all');
  
  const filteredSignals = filter === 'all' ? signals : signals.filter(s => s.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="label text-muted mb-4 block">Trading</span>
          <h2 className="display-md text-4xl text-primary">Signals</h2>
          <p className="text-[13px] text-secondary mt-2">
            Showing <span className="text-primary font-medium">{filteredSignals.length}</span> of <span className="text-primary font-medium">{signals.length}</span> signals
          </p>
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className={`px-4 py-2 rounded-full text-[13px] ${isDark ? 'bg-white/5 border-white/10 text-primary' : 'bg-black/5 border-black/10 text-primary'} border`}
        >
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="TRIGGERED">Triggered</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredSignals.map(sig => (
          <div key={sig.id} className={`p-6 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${sig.direction === 'LONG' ? 'bg-profit/10' : 'bg-loss/10'}`}>
                  {sig.direction === 'LONG' ? <ArrowUpRight className="w-5 h-5 text-profit" /> : <ArrowDownRight className="w-5 h-5 text-loss" />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-lg font-light text-primary">{sig.instrument}</p>
                    <span className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${sig.direction === 'LONG' ? 'border-profit/30 text-profit' : 'border-loss/30 text-loss'}`}>
                      {sig.direction}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted">
                    {sig.algorithmName} • {sig.timeframe} • R:R {formatRatio(sig.riskReward)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {sig.result !== undefined && (
                  <div className="text-right">
                    <p className={`metric text-2xl ${sig.result > 0 ? 'text-profit' : 'text-loss'}`}>
                      {sig.result > 0 ? '+' : ''}{formatPercent(sig.result, 1)}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted">Result</p>
                  </div>
                )}
                <span className={`text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                  sig.status === 'ACTIVE' ? 'border-info/30 text-info' :
                  sig.status === 'CLOSED' ? 'border-base-theme text-muted' :
                  sig.status === 'TRIGGERED' ? 'border-profit/30 text-profit' :
                  'border-base-theme text-muted'
                }`}>{sig.status}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-base-theme">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Entry</p>
                <p className="metric text-sm text-secondary">{formatNumber(sig.entryPrice, 2)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Stop Loss</p>
                <p className="metric text-sm text-loss">{formatNumber(sig.stopLoss, 2)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Take Profit</p>
                <p className="metric text-sm text-profit">{formatNumber(sig.takeProfit[0], 2)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Published</p>
                <p className="metric text-sm text-secondary">{new Date(sig.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsTab({ isDark }: { isDark: boolean }) {
  const [analyticsTab, setAnalyticsTab] = useState<AnalyticsTab>('return');

  const analyticsTabs: { id: AnalyticsTab; label: string }[] = [
    { id: 'return', label: '1. Return' },
    { id: 'risk', label: '2. Risk' },
    { id: 'riskAdjusted', label: '3. Risk-Adjusted' },
    { id: 'trades', label: '4. Trade Stats' },
    { id: 'robustness', label: '5. Robustness' },
    { id: 'market', label: '6. Market Behavior' },
    { id: 'capital', label: '7. Capital Efficiency' },
    { id: 'operational', label: '8. Operational' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="label text-muted mb-4 block">Performance</span>
        <h2 className="display-md text-4xl text-primary">Analytics</h2>
        <p className="text-[13px] text-secondary mt-2">Institutional-grade metrics across 8 categories</p>
      </div>

      {/* Analytics Sub-tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {analyticsTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setAnalyticsTab(tab.id)}
            className={`px-4 py-2 rounded-full text-[12px] font-medium whitespace-nowrap transition-all ${
              analyticsTab === tab.id
                ? 'btn-gradient text-white'
                : 'glass text-secondary hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Analytics Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={analyticsTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {analyticsTab === 'return' && <ReturnMetrics isDark={isDark} />}
          {analyticsTab === 'risk' && <RiskMetrics isDark={isDark} />}
          {analyticsTab === 'riskAdjusted' && <RiskAdjustedMetrics isDark={isDark} />}
          {analyticsTab === 'trades' && <TradeMetrics isDark={isDark} />}
          {analyticsTab === 'robustness' && <RobustnessMetrics isDark={isDark} />}
          {analyticsTab === 'market' && <MarketMetrics isDark={isDark} />}
          {analyticsTab === 'capital' && <CapitalMetrics isDark={isDark} />}
          {analyticsTab === 'operational' && <OperationalMetrics isDark={isDark} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ReturnMetrics({ isDark }: { isDark: boolean }) {
  return (
    <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
      <h3 className="text-xl font-semibold text-primary mb-6">1. Доходность (Return)</h3>
      <p className="text-[13px] text-secondary mb-6">Сколько заработал алгоритм и насколько стабильно он это делает</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Total Return</p>
          <p className="metric text-xl text-profit">+23.4%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">CAGR</p>
          <p className="metric text-xl text-primary">18.7%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Net Profit</p>
          <p className="metric text-xl text-primary">$23,400</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg Monthly Return</p>
          <p className="metric text-xl text-primary">1.8%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg Annual Return</p>
          <p className="metric text-xl text-primary">21.6%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Profitable Months</p>
          <p className="metric text-xl text-primary">68%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Return After Costs</p>
          <p className="metric text-xl text-primary">21.8%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Monthly Returns</p>
          <p className="metric text-xl text-primary">See Heatmap</p>
        </div>
      </div>
    </div>
  );
}

function RiskMetrics({ isDark }: { isDark: boolean }) {
  return (
    <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
      <h3 className="text-xl font-semibold text-primary mb-6">2. Риск и просадки (Risk)</h3>
      <p className="text-[13px] text-secondary mb-6">Какие потери инвестор может испытывать на пути к прибыли</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Max Drawdown</p>
          <p className="metric text-xl text-loss">-8.2%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Max DD Amount</p>
          <p className="metric text-xl text-loss">-$1,640</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Current Drawdown</p>
          <p className="metric text-xl text-loss">-2.1%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg Drawdown</p>
          <p className="metric text-xl text-primary">3.4%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Median Drawdown</p>
          <p className="metric text-xl text-primary">2.8%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Max DD Duration</p>
          <p className="metric text-xl text-primary">23 days</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Recovery Time</p>
          <p className="metric text-xl text-primary">18 days</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Volatility</p>
          <p className="metric text-xl text-primary">12.4%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">VaR (95%)</p>
          <p className="metric text-xl text-primary">1.8%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">CVaR (95%)</p>
          <p className="metric text-xl text-primary">2.4%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Worst Day</p>
          <p className="metric text-xl text-loss">-2.1%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Worst Week</p>
          <p className="metric text-xl text-loss">-4.2%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Worst Month</p>
          <p className="metric text-xl text-loss">-6.8%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Max Consecutive Losses</p>
          <p className="metric text-xl text-primary">5</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Risk of Ruin</p>
          <p className="metric text-xl text-primary">2.00%</p>
        </div>
      </div>
    </div>
  );
}

function RiskAdjustedMetrics({ isDark }: { isDark: boolean }) {
  return (
    <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
      <h3 className="text-xl font-semibold text-primary mb-6">3. Эффективность с поправкой на риск</h3>
      <p className="text-[13px] text-secondary mb-6">Сколько доходности стратегия приносит относительно принятого риска</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Sharpe Ratio</p>
          <p className="metric text-xl text-primary">1.62</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Sortino Ratio</p>
          <p className="metric text-xl text-primary">2.14</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Calmar Ratio</p>
          <p className="metric text-xl text-primary">2.85</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Sterling Ratio</p>
          <p className="metric text-xl text-primary">2.12</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">MAR Ratio</p>
          <p className="metric text-xl text-primary">2.85</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Return / Max DD</p>
          <p className="metric text-xl text-primary">2.85</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Return / Avg DD</p>
          <p className="metric text-xl text-primary">6.88</p>
        </div>
      </div>
    </div>
  );
}

function TradeMetrics({ isDark }: { isDark: boolean }) {
  return (
    <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
      <h3 className="text-xl font-semibold text-primary mb-6">4. Статистика сделок</h3>
      <p className="text-[13px] text-secondary mb-6">За счёт чего формируется прибыль и насколько выгодна отдельная сделка</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Total Trades</p>
          <p className="metric text-xl text-primary">142</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Win Rate</p>
          <p className="metric text-xl text-primary">61.3%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg Win</p>
          <p className="metric text-xl text-profit">+1.80%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg Loss</p>
          <p className="metric text-xl text-loss">-0.95%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Profit Factor</p>
          <p className="metric text-xl text-primary">1.87</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Expectancy</p>
          <p className="metric text-xl text-primary">$0.16</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg Win/Loss Ratio</p>
          <p className="metric text-xl text-primary">1.89</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg R-Multiple</p>
          <p className="metric text-xl text-primary">1.20</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg Trade Duration</p>
          <p className="metric text-xl text-primary">4.2 hours</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Trades/Day</p>
          <p className="metric text-xl text-primary">0.6</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Trades/Month</p>
          <p className="metric text-xl text-primary">17.8</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Cost/Trade</p>
          <p className="metric text-xl text-primary">$12.50</p>
        </div>
      </div>
    </div>
  );
}

function RobustnessMetrics({ isDark }: { isDark: boolean }) {
  return (
    <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
      <h3 className="text-xl font-semibold text-primary mb-6">5. Устойчивость и надёжность</h3>
      <p className="text-[13px] text-secondary mb-6">Насколько результат воспроизводим, а не получен случайно</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">In-Sample Return</p>
          <p className="metric text-xl text-profit">+28.4%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Out-of-Sample Return</p>
          <p className="metric text-xl text-profit">+18.4%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Walk-Forward Return</p>
          <p className="metric text-xl text-profit">+16.8%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Monte Carlo (P50)</p>
          <p className="metric text-xl text-primary">+21.2%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Monte Carlo (P5)</p>
          <p className="metric text-xl text-primary">+12.4%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Parameter Sensitivity</p>
          <p className="metric text-xl text-primary">0.15</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Top 10 Trades Contribution</p>
          <p className="metric text-xl text-primary">28%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Independent Observations</p>
          <p className="metric text-xl text-primary">142</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Overfitting Risk</p>
          <p className="metric text-xl text-profit">LOW</p>
        </div>
      </div>
    </div>
  );
}

function MarketMetrics({ isDark }: { isDark: boolean }) {
  return (
    <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
      <h3 className="text-xl font-semibold text-primary mb-6">6. Рыночное поведение</h3>
      <p className="text-[13px] text-secondary mb-6">В каких условиях стратегия работает, а в каких теряет эффективность</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Trend Performance</p>
          <p className="metric text-xl text-loss">-2.4%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Flat Performance</p>
          <p className="metric text-xl text-profit">+18.7%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">High Vol Performance</p>
          <p className="metric text-xl text-profit">+8.2%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Long Win Rate</p>
          <p className="metric text-xl text-primary">63.2%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Short Win Rate</p>
          <p className="metric text-xl text-primary">59.4%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg Exposure</p>
          <p className="metric text-xl text-primary">45%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Avg Time in Position</p>
          <p className="metric text-xl text-primary">4.2 hours</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Best Session</p>
          <p className="metric text-xl text-primary">US Open</p>
        </div>
      </div>
    </div>
  );
}

function CapitalMetrics({ isDark }: { isDark: boolean }) {
  return (
    <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
      <h3 className="text-xl font-semibold text-primary mb-6">7. Эффективность капитала</h3>
      <p className="text-[13px] text-secondary mb-6">Сколько капитала требуется и какие ограничения возникают при масштабировании</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Recommended Capital</p>
          <p className="metric text-xl text-primary">$25,000</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Max Position Size</p>
          <p className="metric text-xl text-primary">5</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Leverage</p>
          <p className="metric text-xl text-primary">2x</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Margin Requirement</p>
          <p className="metric text-xl text-primary">$5,000</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Return on Capital</p>
          <p className="metric text-xl text-primary">93.6%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Return on Margin</p>
          <p className="metric text-xl text-primary">468.0%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Turnover</p>
          <p className="metric text-xl text-primary">2.8</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Slippage Impact</p>
          <p className="metric text-xl text-primary">0.3%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Strategy Capacity</p>
          <p className="metric text-xl text-primary">$500k</p>
        </div>
      </div>
    </div>
  );
}

function OperationalMetrics({ isDark }: { isDark: boolean }) {
  return (
    <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
      <h3 className="text-xl font-semibold text-primary mb-6">8. Эксплуатационная надёжность</h3>
      <p className="text-[13px] text-secondary mb-6">Можно ли реально запустить алгоритм без технических сбоев</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">System Uptime</p>
          <p className="metric text-xl text-primary">99.8%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Execution Errors</p>
          <p className="metric text-xl text-primary">0.2%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Signal Delay</p>
          <p className="metric text-xl text-primary">45 ms</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Missed Trades</p>
          <p className="metric text-xl text-primary">1</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Model vs Actual Slippage</p>
          <p className="metric text-xl text-primary">0.15%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Broker Stability</p>
          <p className="metric text-xl text-primary">99.5%</p>
        </div>
      </div>
    </div>
  );
}

function SubscriptionsTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-12">
      <div>
        <span className="label text-muted mb-4 block">Account</span>
        <h2 className="display-md text-4xl text-primary">Subscriptions</h2>
      </div>

      <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <h3 className="text-lg font-light text-primary mb-4">Current Plan</h3>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
          <p className="text-[14px] text-secondary">Free Tier</p>
          <p className="text-[11px] text-muted mt-1">No active subscription</p>
        </div>
      </div>
    </div>
  );
}
