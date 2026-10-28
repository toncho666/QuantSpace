import { Link } from 'react-router-dom';
import { algorithms, DEMO_DISCLAIMER } from '../data/mockData';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { BentoCard } from '../components/BentoCard';
import { MetricCard } from '../components/MetricCard';
import { GradientMesh } from '../components/GradientMesh';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { ArrowRight, TrendingUp, Shield, Zap, BarChart3, Activity } from 'lucide-react';

function MiniChart({ data, color = '#10b981' }: { data: number[]; color?: string }) {
  const chartData = data.map((v, i) => ({ x: i, y: v }));
  const min = Math.min(...data);
  const max = Math.max(...data);
  const buffer = (max - min) * 0.15;
  
  return (
    <ResponsiveContainer width="100%" height={80}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis domain={[min - buffer, max + buffer]} hide />
        <Area type="monotone" dataKey="y" stroke={color} fill="url(#chartGradient)" strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function Landing() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Gradient Mesh */}
      <section className="relative min-h-[100vh] flex items-center">
        <GradientMesh />
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 w-full py-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="label text-accent-purple mb-6 inline-block">Algorithmic Trading Platform</span>
                <h1 className="display-hero text-[clamp(3rem,10vw,8rem)] mb-8">
                  Trade with<br />
                  <span className="bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan bg-clip-text text-transparent animate-gradient">
                    precision.
                  </span>
                </h1>
                <p className="text-xl font-light text-secondary max-w-xl mb-10 leading-relaxed">
                  Professional algorithmic strategies with 20+ advanced metrics. 
                  Transparent results, systematic approach, enterprise-grade infrastructure.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/algorithms">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-gradient px-8 py-4 rounded-full text-[15px] font-medium flex items-center gap-2"
                    >
                      Explore Algorithms <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link to="/compare">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass px-8 py-4 rounded-full text-[15px] font-medium text-primary"
                    >
                      Compare Strategies
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Hero Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  label="Total Return"
                  value="+28.4%"
                  change="+12.3% vs last month"
                  changeType="positive"
                  sparklineData={[100, 102, 105, 108, 112, 115, 118, 122, 125, 128]}
                  icon={<TrendingUp className="w-5 h-5 text-accent-purple" />}
                  delay={0.5}
                />
                <MetricCard
                  label="Sharpe Ratio"
                  value="1.94"
                  change="Top 10% performance"
                  changeType="positive"
                  sparklineData={[1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.85, 1.9, 1.94]}
                  icon={<BarChart3 className="w-5 h-5 text-accent-blue" />}
                  delay={0.6}
                />
                <MetricCard
                  label="Win Rate"
                  value="55.2%"
                  change="Across all strategies"
                  changeType="neutral"
                  sparklineData={[52, 53, 54, 54.5, 55, 55.1, 55.2]}
                  icon={<Activity className="w-5 h-5 text-accent-cyan" />}
                  delay={0.7}
                />
                <MetricCard
                  label="Active Algos"
                  value="10"
                  change="3 live, 7 paper"
                  changeType="neutral"
                  icon={<Zap className="w-5 h-5 text-accent-pink" />}
                  delay={0.8}
                />
              </div>
              <p className="text-[11px] mt-4 text-subtle text-center">
                {DEMO_DISCLAIMER}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid Algorithms */}
      <section className="py-32 relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-16">
              <span className="label text-muted mb-4 block">Strategies</span>
              <h2 className="display-lg text-5xl lg:text-6xl text-primary">
                10 algorithms.<br />
                Infinite possibilities.
              </h2>
            </div>
          </FadeIn>

          <div className="bento-grid">
            {/* Large featured card */}
            <BentoCard span="col-4" delay={0.1}>
              <div className="h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="label text-accent-purple mb-2 block">Featured</span>
                    <h3 className="text-3xl font-bold text-primary mb-2">{algorithms[7].name}</h3>
                    <p className="text-[13px] text-muted">{algorithms[7].strategyClass} • Live Trading</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold metric-gradient">+{algorithms[7].metrics.returnPct}%</p>
                    <p className="text-[11px] text-muted mt-1">{algorithms[7].metrics.observationPeriod}</p>
                  </div>
                </div>
                <p className="text-[14px] text-secondary mb-6 flex-1">{algorithms[7].description}</p>
                <div className="text-profit mb-6">
                  <MiniChart data={algorithms[7].equityCurve} />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-base-theme">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Sharpe</p>
                    <p className="metric text-lg text-primary">{algorithms[7].metrics.sharpeRatio}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Sortino</p>
                    <p className="metric text-lg text-primary">{algorithms[7].metrics.sortinoRatio}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Calmar</p>
                    <p className="metric text-lg text-primary">{algorithms[7].metrics.calmarRatio}</p>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Smaller cards */}
            {algorithms.slice(0, 4).map((algo, i) => (
              <BentoCard key={algo.id} span="col-2" delay={0.2 + i * 0.1}>
                <div className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-1">{algo.name}</h3>
                      <p className="text-[11px] text-muted">{algo.strategyClass}</p>
                    </div>
                    <p className="text-2xl font-bold metric-gradient">+{algo.metrics.returnPct}%</p>
                  </div>
                  <p className="text-[12px] text-secondary mb-4 flex-1 line-clamp-2">{algo.description}</p>
                  <div className="text-profit mb-4">
                    <MiniChart data={algo.equityCurve} />
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-base-theme">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted mb-0.5">Win Rate</p>
                      <p className="metric text-sm text-primary">{algo.metrics.winRate}%</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted mb-0.5">Profit Factor</p>
                      <p className="metric text-sm text-primary">{algo.metrics.profitFactor}</p>
                    </div>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="text-center mt-12">
              <Link to="/algorithms">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-8 py-4 rounded-full text-[15px] font-medium inline-flex items-center gap-2"
                >
                  View All Algorithms <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Advanced Metrics Showcase */}
      <section className="py-32 bg-surface-theme relative">
        <GradientMesh />
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="label text-muted mb-4 block">Analytics</span>
              <h2 className="display-lg text-5xl lg:text-6xl text-primary mb-6">
                20+ advanced metrics.
              </h2>
              <p className="text-xl font-light text-secondary max-w-2xl mx-auto">
                Go beyond basic returns. Analyze risk-adjusted performance with institutional-grade metrics.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Sharpe Ratio', value: '1.94', desc: 'Risk-adjusted return', icon: BarChart3 },
              { label: 'Sortino Ratio', value: '2.45', desc: 'Downside risk adjusted', icon: TrendingUp },
              { label: 'Calmar Ratio', value: '2.87', desc: 'Return vs max drawdown', icon: Shield },
              { label: 'Recovery Factor', value: '3.2', desc: 'Speed of recovery', icon: Activity },
              { label: 'Expectancy', value: '$0.40', desc: 'Average profit per trade', icon: TrendingUp },
              { label: 'Tail Ratio', value: '2.31', desc: 'Right vs left tail', icon: BarChart3 },
              { label: 'Risk of Ruin', value: '0.01%', desc: 'Probability of loss', icon: Shield },
              { label: 'Payoff Ratio', value: '2.15', desc: 'Avg win / avg loss', icon: Activity },
            ].map((metric, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass rounded-2xl p-6 h-full"
                >
                  <metric.icon className="w-8 h-8 text-accent-purple mb-4" />
                  <p className="label text-muted mb-2">{metric.label}</p>
                  <p className="text-4xl font-bold metric-gradient mb-2">{metric.value}</p>
                  <p className="text-[13px] text-secondary">{metric.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.8}>
            <div className="text-center mt-12">
              <Link to="/compare">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gradient px-8 py-4 rounded-full text-[15px] font-medium inline-flex items-center gap-2"
                >
                  Compare All Metrics <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="gradient-border p-12 lg:p-20 text-center">
              <h2 className="display-lg text-5xl lg:text-6xl text-primary mb-6">
                Ready to trade<br />with precision?
              </h2>
              <p className="text-xl font-light text-secondary max-w-2xl mx-auto mb-10">
                Join thousands of traders using systematic strategies with transparent results.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-gradient px-10 py-5 rounded-full text-[16px] font-medium"
                  >
                    Get Started Free
                  </motion.button>
                </Link>
                <Link to="/algorithms">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass px-10 py-5 rounded-full text-[16px] font-medium text-primary"
                  >
                    View Algorithms
                  </motion.button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
