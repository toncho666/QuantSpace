import { Link } from 'react-router-dom';
import { algorithms } from '../data/mockData';
import { formatPercent, formatRatio } from '../utils/format';
import { motion } from 'framer-motion';

export function Algorithms() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <span className="label text-muted mb-4 block">Catalog</span>
        <h1 className="display-lg text-5xl lg:text-6xl text-primary mb-4">
          Algorithms
        </h1>
        <p className="text-[15px] font-light text-secondary max-w-xl">
          Systematically developed strategies with full institutional metrics.
        </p>
      </motion.div>

      <div className="space-y-6">
        {algorithms.map((algo, i) => (
          <motion.div
            key={algo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/algorithms/${algo.id}`}
              className="block glass rounded-2xl p-8 hover:scale-[1.02] transition-transform"
            >
              <div className="grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-light text-primary mb-2">{algo.name}</h3>
                  <p className="text-[13px] text-secondary mb-3">{algo.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] uppercase tracking-wider text-muted">
                      {algo.strategyClass}
                    </span>
                    <span className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      algo.status === 'live' ? 'bg-profit/10 text-profit' :
                      algo.status === 'paper' ? 'bg-info/10 text-info' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {algo.status}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">CAGR</p>
                    <p className="metric text-lg text-profit">{formatPercent(algo.metrics.cagr, 1)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Sharpe</p>
                    <p className="metric text-lg text-primary">{formatRatio(algo.metrics.sharpeRatio)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Max DD</p>
                    <p className="metric text-lg text-loss">{formatPercent(-algo.metrics.maxDrawdown, 1)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Win Rate</p>
                    <p className="metric text-lg text-primary">{formatPercent(algo.metrics.winRate, 1)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Profit Factor</p>
                    <p className="metric text-lg text-primary">{formatRatio(algo.metrics.profitFactor)}</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
