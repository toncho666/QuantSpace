import { useTheme } from '../App';
import { algorithms, signals, bots } from '../data/mockData';
import { Users, BarChart3, Signal, CreditCard, Bot, AlertTriangle, Settings, Activity, Shield } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatPercent } from '../utils/format';

type AdminTab = 'overview' | 'users' | 'algorithms' | 'signals' | 'subscriptions' | 'bots' | 'system';

export function Admin() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const tabs: { id: AdminTab; label: string; icon: typeof Activity }[] = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'algorithms', label: 'Algorithms', icon: BarChart3 },
    { id: 'signals', label: 'Signals', icon: Signal },
    { id: 'subscriptions', label: 'Payments', icon: CreditCard },
    { id: 'bots', label: 'Bots', icon: Bot },
    { id: 'system', label: 'System', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen pt-16">
      {/* Sidebar */}
      <aside className={`hidden lg:flex flex-col w-56 shrink-0 border-r ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-4 h-4 text-loss" />
            <span className="text-[13px] font-medium text-primary">Admin</span>
          </div>
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
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile tabs */}
        <div className={`lg:hidden flex overflow-x-auto border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
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
          {/* Access Warning */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 mb-8 flex items-center gap-3 border ${isDark ? 'border-loss/20 bg-loss/5' : 'border-loss/20 bg-loss/5'}`}
          >
            <AlertTriangle className="w-4 h-4 text-loss shrink-0" />
            <p className="text-[11px] text-loss">Admin access demo — requires role verification on backend.</p>
          </motion.div>

          {activeTab === 'overview' && <AdminOverview isDark={isDark} />}
          {activeTab === 'users' && <AdminUsers isDark={isDark} />}
          {activeTab === 'algorithms' && <AdminAlgorithms isDark={isDark} />}
          {activeTab === 'signals' && <AdminSignals isDark={isDark} />}
          {activeTab === 'subscriptions' && <AdminSubscriptions isDark={isDark} />}
          {activeTab === 'bots' && <AdminBots isDark={isDark} />}
          {activeTab === 'system' && <AdminSystem isDark={isDark} />}
        </div>
      </div>
    </div>
  );
}

function AdminOverview({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-12">
      <div>
        <span className="label text-muted mb-4 block">System</span>
        <h2 className="display-md text-4xl text-primary">Overview</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
        {[
          { label: 'Total Users', value: '1,247', change: '+12%' },
          { label: 'Active Subs', value: '342', change: '+8%' },
          { label: 'MRR', value: '$48,290', change: '+15%' },
          { label: 'Active Signals', value: '7' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 ${isDark ? 'bg-base' : 'bg-light-base'}`}>
            <p className="text-[11px] uppercase tracking-wider text-muted mb-2">{stat.label}</p>
            <p className="metric text-3xl text-primary mb-1">{stat.value}</p>
            {'change' in stat && <p className="text-[11px] text-profit">{stat.change}</p>}
          </div>
        ))}
      </div>

      <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <h3 className="text-lg font-light text-primary mb-6">System Health</h3>
        <div className="space-y-4">
          {[
            { name: 'API Server', uptime: '99.97%' },
            { name: 'Signal Engine', uptime: '99.92%' },
            { name: 'Database', uptime: '100%' },
            { name: 'WebSocket', uptime: '99.88%' },
            { name: 'Payments', uptime: '99.99%' },
          ].map((service, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-profit" />
                <span className="text-[13px] text-secondary">{service.name}</span>
              </div>
              <span className="metric text-[12px] text-muted">{service.uptime}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminUsers({ isDark }: { isDark: boolean }) {
  const demoUsers = [
    { id: 1, name: 'Alex Chen', email: 'alex@example.com', plan: 'Professional', status: 'active' },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com', plan: 'Starter', status: 'active' },
    { id: 3, name: 'James Wilson', email: 'james@example.com', plan: 'Institutional', status: 'active' },
    { id: 4, name: 'Yuki Tanaka', email: 'yuki@example.com', plan: 'Free', status: 'inactive' },
    { id: 5, name: 'Sarah Miller', email: 'sarah@example.com', plan: 'Professional', status: 'active' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="label text-muted mb-4 block">Management</span>
        <h2 className="display-md text-4xl text-primary">Users</h2>
      </div>

      <div className={`border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-wider text-muted font-medium">User</th>
                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-wider text-muted font-medium">Plan</th>
                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-wider text-muted font-medium">Status</th>
                <th className="text-right px-6 py-4 text-[10px] uppercase tracking-wider text-muted font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoUsers.map(user => (
                <tr key={user.id} className={`border-b last:border-b-0 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                  <td className="px-6 py-4">
                    <p className="text-[13px] text-primary">{user.name}</p>
                    <p className="text-[11px] text-muted">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="tag text-secondary">{user.plan}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] uppercase tracking-wider ${user.status === 'active' ? 'text-profit' : 'text-muted'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[12px] text-secondary hover:text-accent transition-colors">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminAlgorithms({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-8">
      <div>
        <span className="label text-muted mb-4 block">Management</span>
        <h2 className="display-md text-4xl text-primary">Algorithms</h2>
      </div>

      <div className="space-y-px">
        {algorithms.map(algo => (
          <div key={algo.id} className={`p-6 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-light text-primary mb-1">{algo.name}</h3>
                <p className="text-[11px] text-muted">
                  {algo.strategyClass} • {algo.status} • {algo.metrics.totalTrades} trades
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`tag ${
                  algo.status === 'live' ? 'border-profit/30 text-profit' :
                  algo.status === 'paper' ? 'border-info/30 text-info' :
                  'border-warning/30 text-warning'
                }`}>{algo.status}</span>
                <button className="text-[12px] text-secondary hover:text-accent transition-colors">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSignals({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="label text-muted mb-4 block">Management</span>
          <h2 className="display-md text-4xl text-primary">Signals</h2>
        </div>
        <button className="btn-gradient px-6 py-3 rounded-full text-[13px] font-semibold">
          Publish Signal →
        </button>
      </div>

      <div className="space-y-px">
        {signals.map(sig => (
          <div key={sig.id} className={`p-6 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`text-[11px] uppercase tracking-wider px-2 py-1 rounded-full border ${sig.direction === 'LONG' ? 'border-profit/30 text-profit' : 'border-loss/30 text-loss'}`}>
                  {sig.direction}
                </span>
                <div>
                  <p className="text-[14px] text-primary">{sig.instrument}</p>
                  <p className="text-[11px] text-muted">{sig.algorithmName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`tag ${
                  sig.status === 'ACTIVE' ? 'border-info/30 text-info' :
                  sig.status === 'CLOSED' ? 'border-base-theme text-muted' :
                  'border-warning/30 text-warning'
                }`}>{sig.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSubscriptions({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-12">
      <div>
        <span className="label text-muted mb-4 block">Revenue</span>
        <h2 className="display-md text-4xl text-primary">Payments</h2>
      </div>

      <div className="grid grid-cols-3 gap-px bg-white/5">
        {[
          { label: 'MRR', value: '$48,290' },
          { label: 'Active Subs', value: '342' },
          { label: 'Churn Rate', value: '3.2%' },
        ].map((s, i) => (
          <div key={i} className={`p-6 ${isDark ? 'bg-base' : 'bg-light-base'}`}>
            <p className="text-[11px] uppercase tracking-wider text-muted mb-2">{s.label}</p>
            <p className="metric text-3xl text-primary">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminBots({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-8">
      <div>
        <span className="label text-muted mb-4 block">Marketplace</span>
        <h2 className="display-md text-4xl text-primary">Bots</h2>
      </div>

      <div className="space-y-px">
        {bots.map(bot => (
          <div key={bot.id} className={`p-6 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-light text-primary mb-1">
                  {bot.name} <span className="text-[11px] text-muted">v{bot.version}</span>
                </h3>
                <p className="text-[11px] text-muted">
                  {bot.category} • {bot.exchanges.join(', ')} • ${bot.price}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`tag ${
                  bot.status === 'available' ? 'border-profit/30 text-profit' :
                  bot.status === 'demo' ? 'border-info/30 text-info' :
                  'border-warning/30 text-warning'
                }`}>{bot.status}</span>
                <button className="text-[12px] text-secondary hover:text-accent transition-colors">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSystem({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-12">
      <div>
        <span className="label text-muted mb-4 block">Infrastructure</span>
        <h2 className="display-md text-4xl text-primary">System</h2>
      </div>

      <div className={`p-8 border ${isDark ? 'border-white/5 bg-base' : 'border-black/5 bg-light-base'}`}>
        <h3 className="text-lg font-light text-primary mb-6">Services</h3>
        <div className="space-y-4">
          {[
            { name: 'API Gateway', port: '8000' },
            { name: 'Signal Engine', port: '8001' },
            { name: 'WebSocket', port: '8002' },
            { name: 'Workers', port: '-' },
            { name: 'PostgreSQL', port: '5432' },
            { name: 'Redis', port: '6379' },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-profit" />
                <span className="text-[13px] text-secondary">{s.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="metric text-[11px] text-muted">:{s.port}</span>
                <span className="text-[11px] text-profit">Running</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
