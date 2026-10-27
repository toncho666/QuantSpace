import { useTheme } from '../App';
import { bots } from '../data/mockData';
import { Bot, Clock, Shield, Zap, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { StaggerContainer, StaggerItem } from '../components/Stagger';

export function Shop() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Trading Bot Shop</h1>
          <p className={`mt-2 text-lg ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
            Automated execution bots for systematic strategies.
          </p>
        </div>
      </FadeIn>

      {/* Notice */}
      <FadeIn delay={0.1}>
        <div className={`rounded-lg p-4 mb-8 flex items-start gap-3 ${isDark ? 'bg-navy-900/30 border border-navy-800' : 'bg-navy-50 border border-navy-200'}`}>
          <AlertCircle className="w-5 h-5 text-navy-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium">Exchange Integration Status</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
              Direct exchange connections are currently in development. Bots marked as "Demo" or "Coming Soon" are not yet connected to live trading infrastructure. 
              All automated trading requires paper trading validation first.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Bot Grid */}
      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.15}>
        {bots.map(bot => (
          <StaggerItem key={bot.id}>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`rounded-xl p-6 h-full ${isDark ? 'bg-graphite-900/50 border border-graphite-800 hover:border-navy-800' : 'bg-white border border-graphite-200 shadow-sm hover:border-navy-300'} transition-colors`}
            >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{bot.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-graphite-800 text-graphite-500' : 'bg-graphite-100 text-graphite-500'}`}>
                    v{bot.version}
                  </span>
                </div>
                <p className={`text-xs mt-1 ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>{bot.category}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded font-medium ${
                bot.status === 'available' ? 'bg-profit/10 text-profit' :
                bot.status === 'demo' ? 'bg-navy-400/10 text-navy-400' :
                'bg-warning/10 text-warning'
              }`}>
                {bot.status === 'available' ? 'Available' : bot.status === 'demo' ? 'Demo' : 'Coming Soon'}
              </span>
            </div>

            {/* Description */}
            <p className={`text-sm mb-4 ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
              {bot.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className={`p-2 rounded-lg text-center ${isDark ? 'bg-graphite-800/50' : 'bg-graphite-50'}`}>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Return</p>
                <p className="text-sm font-semibold text-profit">+{bot.returnPct}%</p>
              </div>
              <div className={`p-2 rounded-lg text-center ${isDark ? 'bg-graphite-800/50' : 'bg-graphite-50'}`}>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Max DD</p>
                <p className="text-sm font-semibold text-loss">-{bot.maxDrawdown}%</p>
              </div>
              <div className={`p-2 rounded-lg text-center ${isDark ? 'bg-graphite-800/50' : 'bg-graphite-50'}`}>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Min Capital</p>
                <p className="text-sm font-semibold">${bot.minCapital.toLocaleString()}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-graphite-500" />
                <span className={`text-xs ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
                  {bot.exchanges.join(', ')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-graphite-500" />
                <span className={`text-xs ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
                  {bot.timeframes.join(', ')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-graphite-500" />
                <span className={`text-xs ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
                  {bot.licenseType === 'subscription' ? 'Monthly subscription' : bot.licenseType === 'lifetime' ? 'Lifetime license' : 'Signal access'}
                </span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className={`pt-4 border-t ${isDark ? 'border-graphite-800' : 'border-graphite-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold">${bot.price}</span>
                  <span className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>
                    {bot.licenseType === 'subscription' ? '/month' : bot.licenseType === 'lifetime' ? ' one-time' : '/month'}
                  </span>
                </div>
                <motion.button
                  whileHover={bot.status === 'available' ? { scale: 1.05 } : undefined}
                  whileTap={bot.status === 'available' ? { scale: 0.95 } : undefined}
                  disabled={bot.status !== 'available'}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    bot.status === 'available'
                      ? 'bg-navy-500 text-white hover:bg-navy-600'
                      : 'bg-graphite-800 text-graphite-500 cursor-not-allowed'
                  }`}
                >
                  {bot.status === 'available' ? 'Get Bot' : bot.status === 'demo' ? 'Try Demo' : 'Notify Me'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerContainer>

      {/* Info Section */}
      <FadeIn delay={0.3}>
        <div className={`mt-12 rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
          <h3 className="font-semibold mb-3">About Trading Bots</h3>
          <div className={`text-sm space-y-2 ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              • All bots undergo rigorous paper trading validation before being made available for live use.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              • Exchange connections use API keys with restricted permissions (no withdrawal rights by default).
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              • Built-in risk controls include max position size, daily loss limits, and emergency stop.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              • Bots can be paused or stopped at any time from your dashboard.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              • Performance data shown is from backtesting or paper trading — live results may vary.
            </motion.p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
