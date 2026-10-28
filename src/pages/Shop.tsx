import { useTheme } from '../App';
import { bots } from '../data/mockData';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { StaggerContainer, StaggerItem } from '../components/Stagger';

export function Shop() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
      {/* Header */}
      <FadeIn>
        <div className="mb-16">
          <span className="label text-neutral-500 mb-4 block">Marketplace</span>
          <h1 className="display-lg text-5xl lg:text-6xl text-neutral-100 mb-4">
            Bot Shop
          </h1>
          <p className="text-[15px] font-light text-neutral-400 max-w-xl">
            Automated execution bots for systematic strategies.
          </p>
        </div>
      </FadeIn>

      {/* Notice */}
      <FadeIn delay={0.1}>
        <div className={`p-4 mb-12 flex items-start gap-3 border ${isDark ? 'border-info/20 bg-info/5' : 'border-info/20 bg-info/5'}`}>
          <AlertCircle className="w-4 h-4 text-info mt-0.5 shrink-0" />
          <div>
            <p className="text-[13px] font-medium text-neutral-200 mb-1">Exchange Integration Status</p>
            <p className={`text-[12px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Direct exchange connections are in development. Bots marked as "Demo" or "Coming Soon" are not yet connected to live trading infrastructure.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Bot Grid */}
      <StaggerContainer className="space-y-px" staggerDelay={0.1}>
        {bots.map(bot => (
          <StaggerItem key={bot.id}>
            <div className={`p-8 lg:p-10 border ${isDark ? 'border-white/5 bg-base hover:bg-white/[0.02]' : 'border-black/5 bg-light-base hover:bg-black/[0.02]'} transition-colors duration-300`}>
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Info */}
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-light text-neutral-100">{bot.name}</h3>
                    <span className="text-[11px] text-neutral-500">v{bot.version}</span>
                  </div>
                  <p className={`text-[13px] leading-relaxed mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {bot.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="tag text-neutral-400">{bot.category}</span>
                    <span className="tag text-neutral-400">{bot.exchanges[0]}</span>
                    <span className={`tag ${
                      bot.status === 'available' ? 'border-profit/30 text-profit' :
                      bot.status === 'demo' ? 'border-info/30 text-info' :
                      'border-warning/30 text-warning'
                    }`}>
                      {bot.status}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="lg:col-span-4">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">Return</p>
                      <p className="metric text-xl text-profit">+{bot.returnPct}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">Max DD</p>
                      <p className="metric text-xl text-loss">-{bot.maxDrawdown}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">Min Capital</p>
                      <p className="metric text-xl text-neutral-300">${bot.minCapital.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Price</p>
                    <p className="metric text-2xl text-neutral-100">${bot.price}</p>
                  </div>
                  <motion.button
                    whileHover={bot.status === 'available' ? { scale: 1.05 } : undefined}
                    whileTap={bot.status === 'available' ? { scale: 0.95 } : undefined}
                    disabled={bot.status !== 'available'}
                    className={`px-5 py-2 rounded-full text-[12px] font-medium transition-colors ${
                      bot.status === 'available'
                        ? 'bg-neutral-100 text-neutral-900 hover:bg-white'
                        : 'bg-white/5 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    {bot.status === 'available' ? 'Get' : bot.status === 'demo' ? 'Demo' : 'Soon'}
                  </motion.button>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Info */}
      <FadeIn delay={0.3}>
        <div className={`mt-16 p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
          <h3 className="text-lg font-light text-neutral-100 mb-6">About Trading Bots</h3>
          <div className={`text-[13px] space-y-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            <p>• All bots undergo rigorous paper trading validation before being made available for live use.</p>
            <p>• Exchange connections use API keys with restricted permissions (no withdrawal rights by default).</p>
            <p>• Built-in risk controls include max position size, daily loss limits, and emergency stop.</p>
            <p>• Bots can be paused or stopped at any time from your dashboard.</p>
            <p>• Performance data shown is from backtesting or paper trading — live results may vary.</p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
