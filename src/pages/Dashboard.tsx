import { useTheme } from '../App';
import { signals, algorithms, DEMO_DISCLAIMER } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { Activity, TrendingUp, AlertTriangle, Bell, Settings, BarChart3, Signal, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
          <p className="label text-neutral-500 mb-4">Dashboard</p>
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
            <p className="text-[11px] text-warning">{DEMO_DISCLAIMER}</p>
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
  const equityData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    equity: 100 + (i * 0.3) + Math.sin(i * 0.5) * 2 + Math.random(),
  }));

  return (
    <div className="space-y-12">
      <div>
        <span className="label text-neutral-500 mb-4 block">Dashboard</span>
        <h2 className="display-md text-4xl text-neutral-100">Overview</h2>
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
            <p className="metric text-3xl text-neutral-100 mb-1">{stat.value}</p>
            <p className="text-[11px] uppercase tracking-wider text-neutral-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Equity Chart */}
      <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <h3 className="text-lg font-light text-neutral-100 mb-6">Portfolio Equity</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={equityData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#737373' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#737373' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: isDark ? '#171717' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, borderRadius: '8px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="equity" stroke="#34d399" fill="none" strokeWidth={1.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Signals */}
      <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <h3 className="text-lg font-light text-neutral-100 mb-6">Recent Signals</h3>
        <div className="space-y-px">
          {signals.slice(0, 3).map(sig => (
            <div key={sig.id} className={`flex items-center justify-between py-4 border-b last:border-b-0 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${sig.direction === 'LONG' ? 'bg-profit/10' : 'bg-loss/10'}`}>
                  {sig.direction === 'LONG' ? <ArrowUpRight className="w-4 h-4 text-profit" /> : <ArrowDownRight className="w-4 h-4 text-loss" />}
                </div>
                <div>
                  <p className="text-[14px] text-neutral-200">{sig.instrument}</p>
                  <p className="text-[11px] text-neutral-500">{sig.algorithmName} • {sig.timeframe}</p>
                </div>
              </div>
              <span className={`text-[11px] uppercase tracking-wider px-2 py-1 rounded-full border ${
                sig.status === 'ACTIVE' ? 'border-info/30 text-info' :
                sig.status === 'CLOSED' ? 'border-white/10 text-neutral-500' :
                sig.status === 'TRIGGERED' ? 'border-profit/30 text-profit' :
                'border-white/10 text-neutral-500'
              }`}>{sig.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SignalsTab({ isDark }: { isDark: boolean }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? signals : signals.filter(s => s.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="label text-neutral-500 mb-4 block">Trading</span>
          <h2 className="display-md text-4xl text-neutral-100">Signals</h2>
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className={`px-4 py-2 rounded-full text-[13px] ${isDark ? 'bg-white/5 border-white/10 text-neutral-100' : 'bg-black/5 border-black/10 text-neutral-900'} border`}
        >
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="TRIGGERED">Triggered</option>
          <option value="CLOSED">Closed</option>
          <option value="EXPIRED">Expired</option>
        </select>
      </div>

      <div className="space-y-px">
        {filtered.map(sig => (
          <div key={sig.id} className={`p-6 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${sig.direction === 'LONG' ? 'bg-profit/10' : 'bg-loss/10'}`}>
                  {sig.direction === 'LONG' ? <ArrowUpRight className="w-5 h-5 text-profit" /> : <ArrowDownRight className="w-5 h-5 text-loss" />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-lg font-light text-neutral-100">{sig.instrument}</p>
                    <span className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${sig.direction === 'LONG' ? 'border-profit/30 text-profit' : 'border-loss/30 text-loss'}`}>
                      {sig.direction}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    {sig.algorithmName} • {sig.timeframe} • R:R {sig.riskReward}
                  </p>
                </div>
              </div>
              {sig.result !== undefined && (
                <div className="text-right">
                  <p className={`metric text-2xl ${sig.result > 0 ? 'text-profit' : 'text-loss'}`}>
                    {sig.result > 0 ? '+' : ''}{sig.result}%
                  </p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Entry</p>
                <p className="metric text-sm text-neutral-300">{sig.entryPrice}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Stop Loss</p>
                <p className="metric text-sm text-loss">{sig.stopLoss}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Take Profit</p>
                <p className="metric text-sm text-profit">{sig.takeProfit[0]}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Published</p>
                <p className="metric text-sm text-neutral-300">{new Date(sig.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsTab({ isDark }: { isDark: boolean }) {
  const drawdownData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    drawdown: -(Math.random() * 5 + Math.sin(i * 0.3) * 2),
  }));

  return (
    <div className="space-y-12">
      <div>
        <span className="label text-neutral-500 mb-4 block">Performance</span>
        <h2 className="display-md text-4xl text-neutral-100">Analytics</h2>
      </div>

      <div className="grid grid-cols-3 gap-px bg-white/5">
        {[
          { label: 'Total P&L', value: '+12.4%', color: 'text-profit' },
          { label: 'Max Drawdown', value: '-4.2%', color: 'text-loss' },
          { label: 'Win Rate', value: '55.2%' },
        ].map((s, i) => (
          <div key={i} className={`p-6 ${isDark ? 'bg-base' : 'bg-light-base'}`}>
            <p className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2">{s.label}</p>
            <p className={`metric text-3xl ${s.color || 'text-neutral-100'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <h3 className="text-lg font-light text-neutral-100 mb-6">Drawdown</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={drawdownData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#737373' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#737373' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: isDark ? '#171717' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, borderRadius: '8px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="drawdown" stroke="#f87171" fill="none" strokeWidth={1.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SubscriptionsTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-12">
      <div>
        <span className="label text-neutral-500 mb-4 block">Account</span>
        <h2 className="display-md text-4xl text-neutral-100">Subscriptions</h2>
      </div>

      <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <h3 className="text-lg font-light text-neutral-100 mb-4">Current Plan</h3>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
          <p className="text-[14px] text-neutral-200">Free Tier</p>
          <p className="text-[11px] text-neutral-500 mt-1">No active subscription</p>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-12">
      <div>
        <span className="label text-neutral-500 mb-4 block">Account</span>
        <h2 className="display-md text-4xl text-neutral-100">Settings</h2>
      </div>

      <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <h3 className="text-lg font-light text-neutral-100 mb-6">Profile</h3>
        <div className="space-y-5">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2 block">Name</label>
            <input type="text" defaultValue="Demo User" className={`w-full px-4 py-3 rounded-full text-[14px] ${isDark ? 'bg-white/5 border-white/10 text-neutral-100' : 'bg-black/5 border-black/10 text-neutral-900'} border focus:outline-none focus:border-accent/50`} />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2 block">Email</label>
            <input type="email" defaultValue="demo@quantspace.io" className={`w-full px-4 py-3 rounded-full text-[14px] ${isDark ? 'bg-white/5 border-white/10 text-neutral-100' : 'bg-black/5 border-black/10 text-neutral-900'} border focus:outline-none focus:border-accent/50`} />
          </div>
        </div>
      </div>
    </div>
  );
}
