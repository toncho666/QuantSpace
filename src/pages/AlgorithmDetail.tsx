import { useParams, Link } from 'react-router-dom';
import { algorithms, DEMO_DISCLAIMER } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';

export function AlgorithmDetail() {
  const { slug } = useParams();
  const algo = algorithms.find(a => a.slug === slug);

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

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
        <Link to="/algorithms" className="inline-flex items-center gap-2 text-[13px] text-muted hover:text-primary transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          All algorithms
        </Link>
      </motion.div>

      <FadeIn>
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
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
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Return</p>
                <p className="metric text-4xl text-profit">+{algo.metrics.returnPct}%</p>
                <p className="text-[11px] text-muted mt-1">{algo.metrics.observationPeriod}</p>
              </div>
              <Link to="/register" className="block text-center py-3 rounded-full text-[13px] font-medium bg-primary hover:opacity-90 transition-opacity">
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="p-4 mb-12 flex items-center gap-3 border border-warning/20 bg-warning/5">
          <span className="w-1.5 h-1.5 rounded-full bg-warning" />
          <p className="text-[12px] text-warning">{DEMO_DISCLAIMER}</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="p-8 lg:p-12 border border-base-theme bg-base-theme mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-light text-primary">Equity Curve</h2>
            <span className="text-[11px] text-muted">{algo.metrics.observationPeriod}</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-base)" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis 
                tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} 
                axisLine={false} 
                tickLine={false}
                domain={[
                  (dataMin: number) => dataMin - (Math.max(...algo.equityCurve) - dataMin) * 0.1,
                  (dataMax: number) => dataMax + (dataMax - Math.min(...algo.equityCurve)) * 0.1
                ]}
              />
              <Tooltip contentStyle={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-base)', borderRadius: '8px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="equity" stroke="#34d399" fill="none" strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-base-theme mb-12">
          {[
            { label: 'Total Trades', value: algo.metrics.totalTrades },
            { label: 'Win Rate', value: `${algo.metrics.winRate}%` },
            { label: 'Profit Factor', value: algo.metrics.profitFactor },
            { label: 'Max Drawdown', value: `-${algo.metrics.maxDrawdown}%` },
            { label: 'Avg R:R', value: `${algo.metrics.avgRR}:1` },
            { label: 'Sharpe Ratio', value: algo.metrics.sharpeRatio },
            { label: 'Avg Win', value: `+${algo.metrics.avgWin}%` },
            { label: 'Avg Loss', value: `-${algo.metrics.avgLoss}%` },
          ].map((m, i) => (
            <div key={i} className="p-6 bg-base-theme">
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">{m.label}</p>
              <p className="metric text-2xl text-primary">{m.value}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className="p-8 lg:p-12 border border-base-theme bg-base-theme mb-12">
          <h2 className="text-xl font-light text-primary mb-6">Signal Logic</h2>
          <p className="text-[15px] font-light leading-relaxed text-secondary">
            {algo.signalLogic}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.5}>
        <div className="p-8 lg:p-12 border border-base-theme bg-base-theme mb-12">
          <h2 className="text-xl font-light text-primary mb-6">Limitations</h2>
          <ul className="space-y-3">
            {algo.limitations.map((lim, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] text-secondary">
                <span className="w-1 h-1 rounded-full bg-subtle mt-2 shrink-0" />
                {lim}
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>

      <FadeIn delay={0.6}>
        <div className="p-8 lg:p-12 border border-accent/20 bg-accent/5">
          <h2 className="text-xl font-light text-primary mb-6">Pricing</h2>
          {'monthly' in algo.pricing ? (
            <div className="grid sm:grid-cols-2 gap-8 mb-8">
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
          <Link to="/register" className="inline-block px-8 py-3 rounded-full text-[13px] font-medium bg-primary hover:opacity-90 transition-opacity">
            Subscribe now
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
