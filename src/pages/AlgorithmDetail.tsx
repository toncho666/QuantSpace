import { useParams, Link } from 'react-router-dom';
import { algorithms, DEMO_DISCLAIMER } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ArrowLeft, TrendingUp, Shield, BarChart3, Activity, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { useState } from 'react';
import { DrawdownChart } from '../components/DrawdownChart';
import { MonthlyReturnsHeatmap } from '../components/MonthlyReturnsHeatmap';
import { RollingSharpeChart } from '../components/RollingSharpeChart';

type TabId = 'overview' | 'trades' | 'risk' | 'robustness' | 'technical';

export function AlgorithmDetail() {
  const { slug } = useParams();
  const algo = algorithms.find(a => a.slug === slug);
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  if (!algo) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-32 text-center">
        <h2 className="display-md text-4xl text-primary mb-4">Not found</h2>
        <Link to="/algorithms" className="text-[13px] text-muted hover:text-primary transition-colors">
          ← Back to algorithms
        </Link>
      </div>
    );
  }

  const chartData = algo.equityCurve.map((v, i) => ({ day: i + 1, equity: v }));
  
  // Generate drawdown curve if not present
  const drawdownData = algo.drawdownCurve.length > 0 
    ? algo.drawdownCurve 
    : algo.equityCurve.map((value, i) => {
        const peak = Math.max(...algo.equityCurve.slice(0, i + 1));
        return ((value - peak) / peak) * 100;
      });

  const tabs = [
    { id: 'overview' as TabId, label: 'Overview', icon: TrendingUp },
    { id: 'trades' as TabId, label: 'Trade Statistics', icon: Activity },
    { id: 'risk' as TabId, label: 'Risk Analysis', icon: Shield },
    { id: 'robustness' as TabId, label: 'Robustness', icon: BarChart3 },
    { id: 'technical' as TabId, label: 'Technical', icon: Activity },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
        <Link to="/algorithms" className="inline-flex items-center gap-2 text-[13px] text-muted hover:text-primary transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          All algorithms
        </Link>
      </motion.div>

      <FadeIn>
        <div className="grid lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border ${
                algo.status === 'live' ? 'border-profit/30 text-profit' :
                algo.status === 'paper' ? 'border-info/30 text-info' :
                'border-warning/30 text-warning'
              }`}>
                {algo.status}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-muted">{algo.strategyClass}</span>
            </div>
            <h1 className="display-lg text-5xl lg:text-6xl text-primary mb-6">
              {algo.name}
            </h1>
            <p className="text-[17px] font-light leading-relaxed text-secondary max-w-2xl">
              {algo.fullDescription}
            </p>
          </div>
          <div className="lg:col-span-4 lg:pl-8">
            <div className="border-t border-base-theme pt-6">
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Annual Return (CAGR)</p>
                <p className="metric text-4xl text-profit">+{algo.metrics.cagr}%</p>
                <p className="text-[11px] text-muted mt-1">{algo.metrics.observationPeriod}</p>
              </div>
              <Link to="/register" className="btn-cta block text-center py-4 rounded-full text-[15px] font-bold">
                Subscribe Now →
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Key Metrics Card */}
      <FadeIn delay={0.1}>
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Annual Return</p>
              <p className="metric text-2xl text-profit">+{algo.metrics.cagr}%</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Max Drawdown</p>
              <p className="metric text-2xl text-loss">-{algo.metrics.maxDrawdown}%</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Sharpe Ratio</p>
              <p className="metric text-2xl text-primary">{algo.metrics.sharpeRatio}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Profit Factor</p>
              <p className="metric text-2xl text-primary">{algo.metrics.profitFactor}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Win Rate</p>
              <p className="metric text-2xl text-primary">{algo.metrics.winRate}%</p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Regulatory Info */}
      <FadeIn delay={0.15}>
        <div className="p-4 mb-8 flex items-start gap-3 border border-warning/20 bg-warning/5 rounded-xl">
          <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-[13px] font-medium text-warning mb-1">
              Results Type: {algo.regulatoryInfo.resultType.toUpperCase()}
            </p>
            <p className="text-[12px] text-secondary leading-relaxed">
              {algo.regulatoryInfo.resultType === 'backtest' && 'Historical simulation based on past market data. Results are hypothetical and do not represent actual trading.'}
              {algo.regulatoryInfo.resultType === 'paper' && 'Paper trading results from simulated execution. May differ from live trading due to execution risk and market impact.'}
              {algo.regulatoryInfo.resultType === 'live' && 'Live trading results from actual market execution.'}
            </p>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px]">
              <div>
                <span className="text-muted">Test Period:</span>
                <p className="text-secondary">{algo.regulatoryInfo.testStartDate} → {algo.regulatoryInfo.testEndDate}</p>
              </div>
              <div>
                <span className="text-muted">Commission:</span>
                <p className="text-secondary">{algo.regulatoryInfo.commission}%</p>
              </div>
              <div>
                <span className="text-muted">Slippage:</span>
                <p className="text-secondary">{algo.regulatoryInfo.slippage}%</p>
              </div>
              <div>
                <span className="text-muted">Initial Capital:</span>
                <p className="text-secondary">${algo.regulatoryInfo.initialCapital.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Tabs */}
      <FadeIn delay={0.2}>
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'btn-gradient text-white'
                  : 'glass text-secondary hover:text-primary'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Equity Curve */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Equity Curve</h3>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-base)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(value) => value.toFixed(0)} />
                  <Tooltip contentStyle={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-base)', borderRadius: '8px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="equity" stroke="#10b981" fill="url(#equityGradient)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Drawdown Curve */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Drawdown Curve</h3>
              <DrawdownChart data={drawdownData} />
            </div>

            {/* Monthly Returns */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Monthly Returns</h3>
              <MonthlyReturnsHeatmap data={algo.monthlyReturns} />
            </div>

            {/* Rolling Sharpe */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Rolling Sharpe Ratio</h3>
              <RollingSharpeChart data={algo.rollingSharpe} />
            </div>
          </div>
        )}

        {activeTab === 'trades' && (
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-primary mb-6">Trade Statistics</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Trades', value: algo.metrics.totalTrades },
                { label: 'Win Rate', value: `${algo.metrics.winRate}%` },
                { label: 'Profit Factor', value: algo.metrics.profitFactor },
                { label: 'Expectancy', value: `$${algo.metrics.expectancy.toFixed(2)}` },
                { label: 'Avg Win', value: `+${algo.metrics.avgWin}%` },
                { label: 'Avg Loss', value: `${algo.metrics.avgLoss}%` },
                { label: 'Avg R-Multiple', value: algo.metrics.avgRMultiple },
                { label: 'Avg Duration', value: algo.metrics.avgTradeDuration },
                { label: 'Trades/Day', value: algo.metrics.tradesPerDay.toFixed(1) },
                { label: 'Trades/Month', value: algo.metrics.tradesPerMonth.toFixed(1) },
                { label: 'Cost/Trade', value: `$${algo.metrics.costPerTrade.toFixed(2)}` },
                { label: 'Max Consecutive Losses', value: algo.metrics.maxConsecutiveLosses },
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface-theme">
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">{m.label}</p>
                  <p className="metric text-xl text-primary">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-primary mb-6">Risk Analysis</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Max Drawdown', value: `-${algo.metrics.maxDrawdown}%` },
                { label: 'Current Drawdown', value: `-${algo.metrics.currentDrawdown}%` },
                { label: 'Avg Drawdown', value: `-${algo.metrics.avgDrawdown}%` },
                { label: 'Max DD Duration', value: `${algo.metrics.maxDrawdownDuration} days` },
                { label: 'Recovery Time', value: `${algo.metrics.recoveryTime} days` },
                { label: 'Volatility', value: `${algo.metrics.volatility}%` },
                { label: 'VaR (95%)', value: `${algo.metrics.var95}%` },
                { label: 'CVaR (95%)', value: `${algo.metrics.cvar95}%` },
                { label: 'Worst Day', value: `${algo.metrics.worstDay}%` },
                { label: 'Worst Week', value: `${algo.metrics.worstWeek}%` },
                { label: 'Worst Month', value: `${algo.metrics.worstMonth}%` },
                { label: 'Risk of Ruin', value: `${(algo.metrics.riskOfRuin * 100).toFixed(2)}%` },
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface-theme">
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">{m.label}</p>
                  <p className="metric text-xl text-primary">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'robustness' && (
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-primary mb-6">Robustness & Statistical Reliability</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'In-Sample Return', value: `+${algo.metrics.inSampleReturn}%` },
                { label: 'Out-of-Sample Return', value: `+${algo.metrics.outOfSampleReturn}%` },
                { label: 'Walk-Forward Return', value: `+${algo.metrics.walkForwardReturn}%` },
                { label: 'Monte Carlo (P50)', value: `+${algo.metrics.monteCarloP50}%` },
                { label: 'Monte Carlo (P5)', value: `+${algo.metrics.monteCarloP5}%` },
                { label: 'Parameter Sensitivity', value: algo.metrics.parameterSensitivity.toFixed(2) },
                { label: 'Top 10 Trades Contribution', value: `${algo.metrics.top10TradesContribution}%` },
                { label: 'Independent Observations', value: algo.metrics.independentObservations },
                { label: 'Overfitting Risk', value: algo.metrics.overfittingRisk.toUpperCase() },
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface-theme">
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">{m.label}</p>
                  <p className="metric text-xl text-primary">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Market Behavior</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Trend Performance', value: `${algo.metrics.trendPerformance > 0 ? '+' : ''}${algo.metrics.trendPerformance}%` },
                  { label: 'Flat Performance', value: `${algo.metrics.flatPerformance > 0 ? '+' : ''}${algo.metrics.flatPerformance}%` },
                  { label: 'High Vol Performance', value: `${algo.metrics.highVolPerformance > 0 ? '+' : ''}${algo.metrics.highVolPerformance}%` },
                  { label: 'Long Win Rate', value: `${algo.metrics.longWinRate}%` },
                  { label: 'Short Win Rate', value: `${algo.metrics.shortWinRate}%` },
                  { label: 'Avg Exposure', value: `${algo.metrics.avgExposure}%` },
                  { label: 'Avg Time in Position', value: algo.metrics.avgTimeInPosition },
                  { label: 'Best Session', value: algo.metrics.bestSession },
                ].map((m, i) => (
                  <div key={i} className="p-4 rounded-xl bg-surface-theme">
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-2">{m.label}</p>
                    <p className="metric text-xl text-primary">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Capital Efficiency</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Recommended Capital', value: `$${algo.metrics.recommendedCapital.toLocaleString()}` },
                  { label: 'Max Position Size', value: algo.metrics.maxPositionSize },
                  { label: 'Leverage', value: `${algo.metrics.leverage}x` },
                  { label: 'Margin Requirement', value: `$${algo.metrics.marginRequirement.toLocaleString()}` },
                  { label: 'Return on Capital', value: `${algo.metrics.returnOnCapital}%` },
                  { label: 'Return on Margin', value: `${algo.metrics.returnOnMargin}%` },
                  { label: 'Turnover', value: algo.metrics.turnover.toFixed(1) },
                  { label: 'Strategy Capacity', value: algo.metrics.strategyCapacity },
                ].map((m, i) => (
                  <div key={i} className="p-4 rounded-xl bg-surface-theme">
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-2">{m.label}</p>
                    <p className="metric text-xl text-primary">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Operational Reliability</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'System Uptime', value: `${algo.metrics.systemUptime}%` },
                  { label: 'Execution Errors', value: `${algo.metrics.executionErrors}%` },
                  { label: 'Signal Delay', value: `${algo.metrics.signalDelay} ms` },
                  { label: 'Missed Trades', value: algo.metrics.missedTrades },
                  { label: 'Model vs Actual Slippage', value: `${algo.metrics.modelVsActualSlippage}%` },
                  { label: 'Broker Stability', value: `${algo.metrics.brokerStability}%` },
                ].map((m, i) => (
                  <div key={i} className="p-4 rounded-xl bg-surface-theme">
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-2">{m.label}</p>
                    <p className="metric text-xl text-primary">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Pricing */}
      <FadeIn delay={0.6}>
        <div className="gradient-border p-12 mt-12 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Ready to start trading?</h2>
          {'monthly' in algo.pricing ? (
            <div className="flex justify-center gap-8 mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Monthly</p>
                <p className="metric text-4xl text-primary">${algo.pricing.monthly}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Annual</p>
                <p className="metric text-4xl text-primary">${algo.pricing.annual}</p>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">License</p>
              <p className="metric text-4xl text-primary">${algo.pricing.license}</p>
            </div>
          )}
          <Link to="/register" className="btn-cta inline-block px-12 py-5 rounded-full text-[17px] font-bold">
            Subscribe Now →
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
