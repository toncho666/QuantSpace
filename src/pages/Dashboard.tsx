import { signals, algorithms, DEMO_DISCLAIMER } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Activity, TrendingUp, AlertTriangle, Bell, Settings, BarChart3, Signal, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'overview' | 'signals' | 'analytics' | 'subscriptions' | 'settings';

export function Dashboard() {
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
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-base-theme bg-base-theme">
        <div className="p-6">
          <p className="label text-muted mb-4">Dashboard</p>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-normal transition-colors ${
                  activeTab === tab.id ? 'bg-hover-theme text-primary' : 'text-muted hover:text-primary hover:bg-hover-theme'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6">
          <div className="p-3 rounded-lg bg-surface-theme">
            <p className="text-[11px] uppercase tracking-wider text-muted mb-1">Account</p>
            <p className="text-[13px] text-secondary">Free tier</p>
          </div>
        </div>
      </aside>

      <div className="flex-1 overflow-auto">
        <div className={`lg:hidden flex overflow-x-auto border-b border-base-theme`}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-[13px] whitespace-nowrap border-b transition-colors ${
                activeTab === tab.id ? 'border-accent text-primary' : 'border-transparent text-muted'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 lg:p-12">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 mb-8 flex items-center gap-3 border border-warning/20 bg-warning/5">
            <span className="w-1.5 h-1.5 rounded-full bg-warning" />
            <p className="text-[11px] text-warning">{DEMO_DISCLAIMER}</p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'signals' && <SignalsTab />}
              {activeTab === 'analytics' && <AnalyticsTab />}
              {activeTab === 'subscriptions' && <SubscriptionsTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  const equityData = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, equity: 100 + (i * 0.3) + Math.sin(i * 0.5) * 2 + Math.random() }));

  return (
    <div className="space-y-12">
      <div>
        <span className="label text-muted mb-4 block">Dashboard</span>
        <h2 className="display-md text-4xl text-primary">Overview</h2>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-base-theme">
        {[
          { label: 'Active Signals', value: '2', icon: Signal },
          { label: 'Open Trades', value: '1', icon: TrendingUp },
          { label: 'Alerts', value: '3', icon: Bell },
          { label: 'Active Bots', value: '0', icon: Activity },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-base-theme">
            <stat.icon className="w-4 h-4 text-muted mb-3" />
            <p className="metric text-3xl text-primary mb-1">{stat.value}</p>
            <p className="text-[11px] uppercase tracking-wider text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="p-8 border border-base-theme bg-base-theme">
        <h3 className="text-lg font-light text-primary mb-6">Portfolio Equity</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={equityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-base)" />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-base)', borderRadius: '8px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="equity" stroke="#34d399" fill="none" strokeWidth={1.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="p-8 border border-base-theme bg-base-theme">
        <h3 className="text-lg font-light text-primary mb-6">Recent Signals</h3>
        <div className="space-y-px">
          {signals.slice(0, 3).map(sig => (
            <div key={sig.id} className="flex items-center justify-between py-4 border-b last:border-b-0 border-base-theme">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${sig.direction === 'LONG' ? 'bg-profit/10' : 'bg-loss/10'}`}>
                  {sig.direction === 'LONG' ? <ArrowUpRight className="w-4 h-4 text-profit" /> : <ArrowDownRight className="w-4 h-4 text-loss" />}
                </div>
                <div>
                  <p className="text-[14px] text-primary">{sig.instrument}</p>
                  <p className="text-[11px] text-muted">{sig.algorithmName} • {sig.timeframe}</p>
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

function SignalsTab() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? signals : signals.filter(s => s.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="label text-muted mb-4 block">Trading</span>
          <h2 className="display-md text-4xl text-primary">Signals</h2>
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2 rounded-full text-[13px] bg-surface-theme border border-base-theme text-primary">
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="TRIGGERED">Triggered</option>
          <option value="CLOSED">Closed</option>
          <option value="EXPIRED">Expired</option>
        </select>
      </div>

      <div className="space-y-px">
        {filtered.map(sig => (
          <div key={sig.id} className="p-6 border border-base-theme bg-base-theme">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${sig.direction === 'LONG' ? 'bg-profit/10' : 'bg-loss/10'}`}>
                  {sig.direction === 'LONG' ? <ArrowUpRight className="w-5 h-5 text-profit" /> : <ArrowDownRight className="w-5 h-5 text-loss" />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-lg font-light text-primary">{sig.instrument}</p>
                    <span className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${sig.direction === 'LONG' ? 'border-profit/30 text-profit' : 'border-loss/30 text-loss'}`}>
                      {sig.direction}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted">
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-base-theme">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Entry</p>
                <p className="metric text-sm text-secondary">{sig.entryPrice}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Stop Loss</p>
                <p className="metric text-sm text-loss">{sig.stopLoss}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Take Profit</p>
                <p className="metric text-sm text-profit">{sig.takeProfit[0]}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Published</p>
                <p className="metric text-sm text-secondary">{new Date(sig.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-12">
      <div>
        <span className="label text-muted mb-4 block">Performance</span>
        <h2 className="display-md text-4xl text-primary">Analytics</h2>
      </div>

      <div className="grid grid-cols-3 gap-px bg-base-theme">
        {[
          { label: 'Total P&L', value: '+12.4%', color: 'text-profit' },
          { label: 'Max Drawdown', value: '-4.2%', color: 'text-loss' },
          { label: 'Win Rate', value: '55.2%' },
        ].map((s, i) => (
          <div key={i} className="p-6 bg-base-theme">
            <p className="text-[11px] uppercase tracking-wider text-muted mb-2">{s.label}</p>
            <p className={`metric text-3xl ${s.color || 'text-primary'}`}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubscriptionsTab() {
  return (
    <div className="space-y-12">
      <div>
        <span className="label text-muted mb-4 block">Account</span>
        <h2 className="display-md text-4xl text-primary">Subscriptions</h2>
      </div>

      <div className="p-8 border border-base-theme bg-base-theme">
        <h3 className="text-lg font-light text-primary mb-4">Current Plan</h3>
        <div className="p-4 rounded-lg bg-surface-theme">
          <p className="text-[14px] text-secondary">Free Tier</p>
          <p className="text-[11px] text-muted mt-1">No active subscription</p>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-12">
      <div>
        <span className="label text-muted mb-4 block">Account</span>
        <h2 className="display-md text-4xl text-primary">Settings</h2>
      </div>

      <div className="p-8 border border-base-theme bg-base-theme">
        <h3 className="text-lg font-light text-primary mb-6">Profile</h3>
        <div className="space-y-5">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted mb-2 block">Name</label>
            <input type="text" defaultValue="Demo User" className="w-full px-4 py-3 rounded-full text-[14px] bg-surface-theme border border-base-theme text-primary focus:outline-none focus:border-accent/50" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted mb-2 block">Email</label>
            <input type="email" defaultValue="demo@quantspace.io" className="w-full px-4 py-3 rounded-full text-[14px] bg-surface-theme border border-base-theme text-primary focus:outline-none focus:border-accent/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
