import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import { algorithms, subscriptionPlans, faqItems, DEMO_DISCLAIMER } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowRight, Shield, Zap, BarChart3, Clock, TrendingUp, Check, ChevronDown, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((v, i) => ({ x: i, y: v }));
  return (
    <ResponsiveContainer width="100%" height={60}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="y" stroke={color} fill={`url(#grad-${color})`} strokeWidth={1.5} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function HeroChart() {
  const data = Array.from({ length: 60 }, (_, i) => ({
    x: i,
    y: 100 + (i * 0.5) + Math.sin(i * 0.3) * 3 + Math.random() * 2,
  }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="y" stroke="#6366f1" fill="url(#heroGrad)" strokeWidth={2} dot={false} />
        <Tooltip
          contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
          labelStyle={{ color: '#94a3b8' }}
          itemStyle={{ color: '#e2e8f0' }}
          formatter={(value: number) => [value.toFixed(2), 'Equity']}
          labelFormatter={() => ''}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function Landing() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6 ${isDark ? 'bg-navy-900/50 text-navy-300 border border-navy-800' : 'bg-navy-50 text-navy-700 border border-navy-200'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-profit animate-pulse" />
                Paper trading active — results are synthetic demo data
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Systematic Trading,{' '}
                <span className="gradient-text">Transparent Results</span>
              </h1>
              <p className={`mt-6 text-lg leading-relaxed max-w-xl ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
                Professional algorithmic trading signals backed by rigorous quantitative research. 
                Every metric is calculated, documented, and auditable. No black boxes, no fake promises.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/algorithms"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy-500 text-white font-medium hover:bg-navy-600 transition-colors"
                >
                  Explore Algorithms <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#results"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border transition-colors ${isDark ? 'border-graphite-700 hover:bg-graphite-800' : 'border-graphite-300 hover:bg-graphite-50'}`}
                >
                  View Results
                </a>
              </div>
            </div>
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-graphite-50 border border-graphite-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>DEMO Equity Curve</p>
                  <p className="text-lg font-semibold">Synthetic Performance</p>
                </div>
                <div className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-warning/10 text-warning' : 'bg-warning/10 text-warning'}`}>
                  Not Real Data
                </div>
              </div>
              <HeroChart />
              <p className={`text-xs mt-3 ${isDark ? 'text-graphite-600' : 'text-graphite-400'}`}>
                {DEMO_DISCLAIMER}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section className={`py-20 ${isDark ? 'bg-navy-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Trading Algorithms</h2>
            <p className={`mt-3 text-lg ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
              Each strategy is independently developed, backtested, and monitored.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {algorithms.map(algo => (
              <Link
                key={algo.id}
                to={`/algorithms/${algo.slug}`}
                className={`group rounded-xl p-6 transition-all hover:scale-[1.01] ${isDark ? 'bg-graphite-900/50 border border-graphite-800 hover:border-graphite-700' : 'bg-white border border-graphite-200 hover:border-graphite-300 shadow-sm'}`}
              >
                <div className="flex items-start justify-between mb-4">
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
                        {algo.status === 'backtest' ? 'Backtest' : algo.status === 'paper' ? 'Paper Trading' : 'Live'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-profit font-semibold">+{algo.metrics.returnPct}%</p>
                    <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Return</p>
                  </div>
                </div>
                <p className={`text-sm mb-4 ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
                  {algo.description}
                </p>
                <MiniChart data={algo.equityCurve} color="#10b981" />
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-graphite-800/50">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Max DD</p>
                    <p className="text-sm font-medium text-loss">-{algo.metrics.maxDrawdown}%</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Win Rate</p>
                    <p className="text-sm font-medium">{algo.metrics.winRate}%</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Profit Factor</p>
                    <p className="text-sm font-medium">{algo.metrics.profitFactor}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className={`py-20 ${isDark ? 'bg-graphite-900/30' : 'bg-graphite-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Transparent Performance</h2>
            <p className={`mt-3 text-lg ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
              All metrics are calculated using standardized methodology with documented assumptions.
            </p>
          </div>
          <div className={`rounded-xl p-6 sm:p-8 ${isDark ? 'bg-navy-950 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-sm text-warning font-medium">All data below is synthetic demo data</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Composite Return', value: '+28.4%', sub: '12-month period' },
                { label: 'Max Drawdown', value: '-11.2%', sub: 'Peak to trough' },
                { label: 'Sharpe Ratio', value: '1.72', sub: 'Risk-adjusted' },
                { label: 'Total Trades', value: '826', sub: 'All algorithms' },
                { label: 'Avg Win Rate', value: '55.2%', sub: 'Across strategies' },
                { label: 'Profit Factor', value: '1.94', sub: 'Gross P&L ratio' },
                { label: 'Avg R:R', value: '2.4:1', sub: 'Reward to risk' },
                { label: 'Observation', value: '10 mo.', sub: 'Paper trading' },
              ].map((stat, i) => (
                <div key={i} className={`p-4 rounded-lg ${isDark ? 'bg-graphite-900/50' : 'bg-graphite-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-graphite-600' : 'text-graphite-400'}`}>{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={`py-20 ${isDark ? 'bg-navy-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BarChart3, title: 'Choose Strategy', desc: 'Browse algorithms by market, style, and risk profile. Review full statistics before subscribing.' },
              { icon: Shield, title: 'Study the Data', desc: 'Examine equity curves, trade history, drawdowns, and methodology. Understand the risks.' },
              { icon: Zap, title: 'Connect Signals', desc: 'Receive signals via email, Telegram, API, or connect an automated trading bot.' },
              { icon: Clock, title: 'Monitor Results', desc: 'Track performance in real-time. Full analytics dashboard with trade journal and risk metrics.' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-navy-900 text-navy-400' : 'bg-navy-50 text-navy-600'}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className={`py-20 ${isDark ? 'bg-graphite-900/30' : 'bg-graphite-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why QuantSpace</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: 'Systematic Approach', desc: 'Every decision is rule-based and backtested. No discretion, no emotions.' },
              { icon: BarChart3, title: 'Transparent Statistics', desc: 'Full methodology documentation. Separate backtest, paper, and live results.' },
              { icon: Shield, title: 'Risk Management', desc: 'Position sizing, max drawdown limits, and correlation controls built into every strategy.' },
              { icon: Clock, title: 'Signal History', desc: 'Complete audit trail of every signal published. Timestamps, modifications, and outcomes.' },
              { icon: Zap, title: 'Automation', desc: 'Connect bots for automated execution or use API for custom integrations.' },
              { icon: Check, title: 'No Guarantees', desc: 'We show real data, not marketing promises. Trading involves risk of loss.' },
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-xl ${isDark ? 'bg-navy-950 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
                <item.icon className="w-5 h-5 text-navy-400 mb-3" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`py-20 ${isDark ? 'bg-navy-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Simple Pricing</h2>
            <p className={`mt-3 text-lg ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
              Choose the plan that fits your trading style.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {subscriptionPlans.map(plan => (
              <div
                key={plan.id}
                className={`rounded-xl p-6 ${
                  plan.highlighted
                    ? 'ring-2 ring-navy-500 ' + (isDark ? 'bg-navy-900/50' : 'bg-navy-50/50')
                    : isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'
                }`}
              >
                {plan.highlighted && (
                  <span className="text-xs font-medium text-navy-400 mb-2 block">Most Popular</span>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className={`text-sm ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-profit mt-0.5 shrink-0" />
                      <span className={isDark ? 'text-graphite-300' : 'text-graphite-700'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`mt-6 block text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    plan.highlighted
                      ? 'bg-navy-500 text-white hover:bg-navy-600'
                      : isDark ? 'bg-graphite-800 hover:bg-graphite-700 text-graphite-200' : 'bg-graphite-100 hover:bg-graphite-200 text-graphite-900'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`py-20 ${isDark ? 'bg-graphite-900/30' : 'bg-graphite-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className={`rounded-xl overflow-hidden ${isDark ? 'bg-navy-950 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-sm">{item.question}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? 'rotate-180' : ''} ${isDark ? 'text-graphite-500' : 'text-graphite-400'}`} />
                </button>
                {openFaq === i && (
                  <div className={`px-5 pb-5 text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Disclaimer */}
      <section className={`py-12 ${isDark ? 'bg-navy-950 border-t border-graphite-800' : 'bg-white border-t border-graphite-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-5 h-5 text-warning mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Risk Disclosure</h3>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-graphite-500' : 'text-graphite-600'}`}>
            Trading financial instruments involves substantial risk of loss and is not suitable for all investors. 
            Past performance is not indicative of future results. Algorithmic trading results shown on this platform 
            are based on historical backtesting and paper trading — actual results may differ significantly due to 
            market conditions, execution quality, slippage, and other factors. You should only trade with capital 
            you can afford to lose. QuantSpace provides tools and analysis — not financial advice.
          </p>
        </div>
      </section>
    </div>
  );
}
