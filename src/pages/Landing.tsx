import { Link } from 'react-router-dom';
import { algorithms } from '../data/mockData';
import { formatPercent, formatMoney, formatNumber, formatRatio } from '../utils/format';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center gradient-mesh">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full py-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="label text-accent-purple mb-6 inline-block">
                  Algorithmic Trading Platform
                </span>
                <h1 className="display-hero text-[clamp(3rem,10vw,7rem)] mb-8">
                  Trade with<br />
                  <span className="bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan bg-clip-text text-transparent">
                    precision.
                  </span>
                </h1>
                <p className="text-xl font-light text-secondary max-w-xl mb-10">
                  Professional algorithmic strategies with 60+ institutional metrics.
                  Transparent results, systematic approach.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/algorithms">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-cta px-10 py-5 rounded-full text-[17px] font-semibold flex items-center gap-3"
                    >
                      Explore Algorithms <ArrowRight className="w-6 h-6" />
                    </motion.button>
                  </Link>
                  <Link to="/compare">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass px-8 py-5 rounded-full text-[15px] font-medium text-primary"
                    >
                      Compare Strategies
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5"
            >
              <div className="grid grid-cols-2 gap-4">
                {algorithms.slice(0, 4).map((algo, i) => (
                  <motion.div
                    key={algo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="glass rounded-2xl p-6"
                  >
                    <p className="label text-muted mb-2">{algo.name}</p>
                    <p className="text-3xl font-bold metric-gradient mb-1">
                      {formatPercent(algo.metrics.cagr, 1)}
                    </p>
                    <p className="text-[11px] text-muted">CAGR</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-32 bg-surface-theme">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="label text-muted mb-4 block">Analytics</span>
            <h2 className="display-lg text-5xl lg:text-6xl text-primary">
              60+ metrics per strategy
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Sharpe Ratio', value: formatRatio(1.94) },
              { label: 'Max Drawdown', value: formatPercent(-8.2, 1) },
              { label: 'Win Rate', value: formatPercent(55.2, 1) },
              { label: 'Profit Factor', value: formatRatio(2.15) },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <p className="label text-muted mb-2">{metric.label}</p>
                <p className="text-4xl font-bold metric-gradient">{metric.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-border p-12 lg:p-20 text-center"
          >
            <h2 className="display-lg text-5xl lg:text-6xl text-primary mb-6">
              Ready to trade?
            </h2>
            <p className="text-xl font-light text-secondary max-w-2xl mx-auto mb-10">
              Start with institutional-grade analytics today.
            </p>
            <Link to="/algorithms">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cta px-12 py-6 rounded-full text-[18px] font-bold"
              >
                Get Started Free →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
