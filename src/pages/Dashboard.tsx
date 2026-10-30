import { useTheme } from '../App';
import { Activity, TrendingUp, AlertTriangle, Bell, Settings, BarChart3, Signal, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPercent, formatMoney, formatNumber } from '../utils/format';

type Tab = 'overview' | 'signals' | 'analytics' | 'subscriptions' | 'settings';

export function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs: { id: Tab; label: string; icon: typeof Activity }[] = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'signals', label: 'Signals', icon: Signal },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'subscriptions', label: 'Subscriptions', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
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
              {activeTab === 'settings' && <SettingsTab isDark={isDark} />}
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
          { label: 'Active Signals', value: '2', icon: Signal },
          { label: 'Open Trades', value: '1', icon: TrendingUp },
          { label: 'Alerts', value: '3', icon: Bell },
          { label: 'Active Bots', value: '0', icon: Activity },
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
          {[
            { instrument: 'ES', algo: 'VP Mean Reversion', timeframe: '1H', direction: 'LONG', status: 'ACTIVE' },
            { instrument: 'BTC/USDT', algo: 'Trend Continuation', timeframe: '4H', direction: 'LONG', status: 'TRIGGERED' },
            { instrument: 'NQ', algo: 'VP Mean Reversion', timeframe: '15m', direction: 'SHORT', status: 'CLOSED' },
          ].map((sig, i) => (
            <div key={i} className={`flex items-center justify-between py-4 border-b last:border-b-0 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${sig.direction === 'LONG' ? 'bg-profit/10' : 'bg-loss/10'}`}>
                  {sig.direction === 'LONG' ? <ArrowUpRight className="w-4 h-4 text-profit" /> : <ArrowDownRight className="w-4 h-4 text-loss" />}
                </div>
                <div>
                  <p className="text-[14px] text-primary">{sig.instrument}</p>
                  <p className="text-[11px] text-muted">{sig.algo} • {sig.timeframe}</p>
                </div>
              </div>
              <span className={`text-[11px] uppercase tracking-wider px-2 py-1 rounded-full border ${
                sig.status === 'ACTIVE' ? 'border-info/30 text-info' :
                sig.status === 'CLOSED' ? 'border-base-theme text-muted' :
                sig.status === 'TRIGGERED' ? 'border-profit/30 text-profit' :
                'border-base-theme text-muted'
              }`}>{sig.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SignalsTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-8">
      <div>
        <span className="label text-muted mb-4 block">Trading</span>
        <h2 className="display-md text-4xl text-primary">Signals</h2>
      </div>
      <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <p className="text-secondary">No active signals at the moment.</p>
      </div>
    </div>
  );
}

function AnalyticsTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-12">
      <div>
        <span className="label text-muted mb-4 block">Performance</span>
        <h2 className="display-md text-4xl text-primary">Analytics</h2>
      </div>
      <div className="grid grid-cols-3 gap-px bg-white/5">
        {[
          { label: 'Total P&L', value: '+12.4%', color: 'text-profit' },
          { label: 'Max Drawdown', value: '-4.2%', color: 'text-loss' },
          { label: 'Win Rate', value: '55.2%' },
        ].map((s, i) => (
          <div key={i} className={`p-6 ${isDark ? 'bg-base' : 'bg-light-base'}`}>
            <p className="text-[11px] uppercase tracking-wider text-muted mb-2">{s.label}</p>
            <p className={`metric text-3xl ${s.color || 'text-primary'}`}>{s.value}</p>
          </div>
        ))}
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

function SettingsTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-12">
      <div>
        <span className="label text-muted mb-4 block">Account</span>
        <h2 className="display-md text-4xl text-primary">Settings</h2>
      </div>
      <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <h3 className="text-lg font-light text-primary mb-6">Profile</h3>
        <div className="space-y-5">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted mb-2 block">Name</label>
            <input type="text" defaultValue="Demo User" className={`w-full px-4 py-3 rounded-full text-[14px] ${isDark ? 'bg-white/5 border-white/10 text-primary' : 'bg-black/5 border-black/10 text-primary'} border focus:outline-none focus:border-accent/50`} />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted mb-2 block">Email</label>
            <input type="email" defaultValue="demo@quantspace.io" className={`w-full px-4 py-3 rounded-full text-[14px] ${isDark ? 'bg-white/5 border-white/10 text-primary' : 'bg-black/5 border-black/10 text-primary'} border focus:outline-none focus:border-accent/50`} />
          </div>
        </div>
      </div>
    </div>
  );
}
