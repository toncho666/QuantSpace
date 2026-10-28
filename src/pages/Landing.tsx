import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import { algorithms, subscriptionPlans, faqItems, DEMO_DISCLAIMER } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { StaggerContainer, StaggerItem } from '../components/Stagger';
import { AnimatedCounter } from '../components/AnimatedCounter';

function MiniChart({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ x: i, y: v }));
  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={chartData}>
        <Area type="monotone" dataKey="y" stroke="currentColor" fill="none" strokeWidth={1} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function Landing() {
  const { theme } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full py-20">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="mb-8"
              >
                <span className="label text-accent">Algorithmic Trading Platform</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="display-xl text-[clamp(3rem,8vw,7rem)] text-primary mb-8"
              >
                Trading<br />
                <span className="text-muted">without</span><br />
                illusions.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[17px] font-light leading-relaxed text-muted max-w-lg mb-10"
              >
                Professional algorithmic strategies with documented methodology. 
                Every metric calculated, every result auditable.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-6"
              >
                <Link
                  to="/algorithms"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium text-primary border-b border-primary pb-1 hover:border-accent hover:text-accent transition-colors"
                >
                  Explore algorithms
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <a
                  href="#results"
                  className="text-[13px] font-normal text-muted hover:text-primary transition-colors"
                >
                  View performance →
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="lg:col-span-4 lg:pl-12"
            >
              <div className="border-t border-base-theme pt-6">
                <div className="space-y-6">
                  {[
                    { label: 'Composite Return', value: 28.4, suffix: '%', prefix: '+' },
                    { label: 'Max Drawdown', value: 11.2, suffix: '%', prefix: '-' },
                    { label: 'Profit Factor', value: 1.94, decimals: 2 },
                    { label: 'Observation', value: 10, suffix: ' mo.' },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-baseline justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-muted">{stat.label}</span>
                      <span className="metric text-xl text-primary">
                        <AnimatedCounter 
                          value={stat.value} 
                          decimals={stat.decimals || 0} 
                          prefix={stat.prefix || ''} 
                          suffix={stat.suffix || ''} 
                        />
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] mt-6 text-subtle">
                  Synthetic demo data — not real trading results
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Algorithms */}
      <section className="py-32 bg-base-theme">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="label text-muted mb-4 block">Strategies</span>
                <h2 className="display-lg text-5xl lg:text-6xl text-primary">
                  Algorithms
                </h2>
              </div>
              <Link
                to="/algorithms"
                className="hidden md:inline-flex items-center gap-2 text-[13px] text-muted hover:text-primary transition-colors"
              >
                View all <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-px bg-base-theme" staggerDelay={0.1}>
            {algorithms.map(algo => (
              <StaggerItem key={algo.id}>
                <Link
                  to={`/algorithms/${algo.slug}`}
                  className="group block p-8 lg:p-10 bg-base-theme hover:bg-hover-theme transition-colors duration-500"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-light tracking-tight text-primary mb-2 group-hover:text-accent transition-colors">
                        {algo.name}
                      </h3>
                      <div className="flex items-center gap-3">
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
                    <div className="text-right">
                      <p className="metric text-2xl text-profit">+{algo.metrics.returnPct}%</p>
                    </div>
                  </div>

                  <p className="text-[13px] leading-relaxed mb-6 text-secondary">
                    {algo.description}
                  </p>

                  <div className="text-profit mb-6">
                    <MiniChart data={algo.equityCurve} />
                  </div>

                  <div className="grid grid-cols-4 gap-4 pt-6 border-t border-base-theme">
                    {[
                      { label: 'Trades', value: algo.metrics.totalTrades },
                      { label: 'Win Rate', value: `${algo.metrics.winRate}%` },
                      { label: 'PF', value: algo.metrics.profitFactor },
                      { label: 'Max DD', value: `-${algo.metrics.maxDrawdown}%` },
                    ].map((m, i) => (
                      <div key={i}>
                        <p className="text-[10px] uppercase tracking-wider text-muted mb-1">{m.label}</p>
                        <p className="metric text-sm text-secondary">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="py-32 bg-surface-theme">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-20">
              <span className="label text-muted mb-4 block">Performance</span>
              <h2 className="display-lg text-5xl lg:text-6xl text-primary max-w-2xl">
                Transparent<br />by design.
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="p-8 lg:p-12 border border-base-theme bg-base-theme">
              <div className="flex items-center gap-2 mb-12">
                <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                <span className="text-[11px] uppercase tracking-wider text-warning">Synthetic demo data</span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                {[
                  { label: 'Return', value: 28.4, prefix: '+', suffix: '%', large: true },
                  { label: 'Max Drawdown', value: 11.2, prefix: '-', suffix: '%', large: true },
                  { label: 'Sharpe', value: 1.72, decimals: 2, large: true },
                  { label: 'Trades', value: 826, large: true },
                  { label: 'Win Rate', value: 55.2, suffix: '%', decimals: 1 },
                  { label: 'Profit Factor', value: 1.94, decimals: 2 },
                  { label: 'Avg R:R', value: 2.4, suffix: ':1', decimals: 1 },
                  { label: 'Period', value: 10, suffix: ' mo.' },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-3">{stat.label}</p>
                    <p className={`metric ${stat.large ? 'text-4xl lg:text-5xl' : 'text-2xl'} text-primary`}>
                      <AnimatedCounter 
                        value={stat.value} 
                        decimals={stat.decimals || 0} 
                        prefix={stat.prefix || ''} 
                        suffix={stat.suffix || ''} 
                      />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 bg-base-theme">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-20">
              <span className="label text-muted mb-4 block">Process</span>
              <h2 className="display-lg text-5xl lg:text-6xl text-primary">
                How it works.
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-px">
            {[
              { num: '01', title: 'Choose Strategy', desc: 'Browse algorithms by market, style, and risk profile. Review full statistics.' },
              { num: '02', title: 'Study the Data', desc: 'Examine equity curves, trade history, drawdowns, and methodology.' },
              { num: '03', title: 'Connect Signals', desc: 'Receive signals via email, Telegram, API, or connect automated trading bot.' },
              { num: '04', title: 'Monitor Results', desc: 'Track performance in real-time with full analytics and trade journal.' },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="grid grid-cols-12 gap-8 py-10 border-b border-base-theme group">
                  <div className="col-span-2 md:col-span-1">
                    <span className="metric text-sm text-muted">{step.num}</span>
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="text-xl font-light text-primary group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-7 md:col-start-7">
                    <p className="text-[15px] font-light leading-relaxed text-secondary">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 bg-surface-theme">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-20">
              <span className="label text-muted mb-4 block">Pricing</span>
              <h2 className="display-lg text-5xl lg:text-6xl text-primary">
                Simple plans.
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-px bg-base-theme" staggerDelay={0.1}>
            {subscriptionPlans.map(plan => (
              <StaggerItem key={plan.id}>
                <div className={`p-8 lg:p-10 h-full flex flex-col bg-base-theme ${plan.highlighted ? 'ring-1 ring-accent/30' : ''}`}>
                  {plan.highlighted && (
                    <span className="label text-accent mb-6">Most popular</span>
                  )}
                  <h3 className="text-2xl font-light text-primary mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="metric text-4xl text-primary">${plan.price}</span>
                    <span className="text-[13px] text-muted">/month</span>
                  </div>
                  <ul className="space-y-3 mb-10 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] text-secondary">
                        <span className="w-1 h-1 rounded-full bg-subtle mt-1.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className={`block text-center py-3 rounded-full text-[13px] font-medium transition-colors ${
                      plan.highlighted
                        ? 'bg-primary hover:opacity-90'
                        : 'border border-base-theme text-primary hover:bg-hover-theme'
                    }`}
                  >
                    Get started
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-base-theme">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-16 text-center">
              <span className="label text-muted mb-4 block">FAQ</span>
              <h2 className="display-lg text-5xl text-primary">
                Questions.
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-px">
            {faqItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="border-b border-base-theme">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <span className="text-[15px] font-normal text-primary group-hover:text-accent transition-colors pr-8">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-4 h-4 text-muted" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[14px] leading-relaxed pb-6 text-secondary">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Risk disclaimer */}
      <section className="py-16 bg-surface-theme">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[12px] leading-relaxed text-subtle">
            Trading involves substantial risk of loss. Past performance is not indicative of future results. 
            All data shown is synthetic demo data for illustration purposes only.
          </p>
        </div>
      </section>
    </div>
  );
}
