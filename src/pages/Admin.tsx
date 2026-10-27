import { useTheme } from '../App';
import { algorithms, signals, bots } from '../data/mockData';
import { Users, BarChart3, Signal, CreditCard, Bot, AlertTriangle, Settings, Activity, Shield } from 'lucide-react';
import { useState } from 'react';

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
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className={`hidden lg:flex flex-col w-56 shrink-0 border-r ${isDark ? 'border-graphite-800 bg-navy-950' : 'border-graphite-200 bg-graphite-50'}`}>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-loss" />
            <span className="text-sm font-semibold">Admin Panel</span>
          </div>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? isDark ? 'bg-navy-900 text-navy-400' : 'bg-navy-50 text-navy-600'
                    : isDark ? 'text-graphite-400 hover:text-graphite-200 hover:bg-graphite-800' : 'text-graphite-600 hover:text-graphite-900 hover:bg-graphite-100'
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
        <div className={`lg:hidden flex overflow-x-auto border-b ${isDark ? 'border-graphite-800' : 'border-graphite-200'}`}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === tab.id ? 'border-navy-500 text-navy-400' : `border-transparent ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Access Warning */}
          <div className={`rounded-lg p-3 mb-6 flex items-center gap-2 ${isDark ? 'bg-loss/5 border border-loss/20' : 'bg-loss/5 border border-loss/20'}`}>
            <AlertTriangle className="w-4 h-4 text-loss shrink-0" />
            <p className="text-xs text-loss">Admin access demo — In production, this page requires admin role verification on the backend. All actions are audited.</p>
          </div>

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
    <div className="space-y-6">
      <h2 className="text-xl font-bold">System Overview</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '1,247', change: '+12%' },
          { label: 'Active Subscriptions', value: '342', change: '+8%' },
          { label: 'Monthly Revenue', value: '$48,290', change: '+15%' },
          { label: 'Active Signals', value: '7', change: '' },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-xl ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <p className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>{stat.label}</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold">{stat.value}</span>
              {stat.change && <span className="text-xs text-profit mb-1">{stat.change}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">System Health</h3>
        <div className="space-y-3">
          {[
            { name: 'API Server', status: 'healthy', uptime: '99.97%' },
            { name: 'Signal Engine', status: 'healthy', uptime: '99.92%' },
            { name: 'Database', status: 'healthy', uptime: '100%' },
            { name: 'WebSocket Service', status: 'healthy', uptime: '99.88%' },
            { name: 'Payment Processor', status: 'healthy', uptime: '99.99%' },
          ].map((service, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-profit" />
                <span className="text-sm">{service.name}</span>
              </div>
              <span className={`text-xs font-mono ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>{service.uptime}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminUsers({ isDark }: { isDark: boolean }) {
  const demoUsers = [
    { id: 1, name: 'Alex Chen', email: 'alex@example.com', plan: 'Professional', status: 'active', joined: '2025-11-15' },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com', plan: 'Starter', status: 'active', joined: '2025-12-01' },
    { id: 3, name: 'James Wilson', email: 'james@example.com', plan: 'Institutional', status: 'active', joined: '2025-10-20' },
    { id: 4, name: 'Yuki Tanaka', email: 'yuki@example.com', plan: 'Free', status: 'inactive', joined: '2026-01-05' },
    { id: 5, name: 'Sarah Miller', email: 'sarah@example.com', plan: 'Professional', status: 'active', joined: '2025-09-12' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">User Management</h2>
        <span className={`text-sm ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>{demoUsers.length} users (demo)</span>
      </div>
      <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={isDark ? 'bg-graphite-800/50' : 'bg-graphite-50'}>
                <th className="text-left px-4 py-3 font-medium text-graphite-500">User</th>
                <th className="text-left px-4 py-3 font-medium text-graphite-500">Plan</th>
                <th className="text-left px-4 py-3 font-medium text-graphite-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-graphite-500">Joined</th>
                <th className="text-right px-4 py-3 font-medium text-graphite-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoUsers.map(user => (
                <tr key={user.id} className={`border-t ${isDark ? 'border-graphite-800' : 'border-graphite-100'}`}>
                  <td className="px-4 py-3">
                    <p className="font-medium">{user.name}</p>
                    <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>{user.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-graphite-800 text-graphite-400' : 'bg-graphite-100 text-graphite-600'}`}>{user.plan}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${user.status === 'active' ? 'bg-profit/10 text-profit' : 'bg-graphite-700/50 text-graphite-500'}`}>{user.status}</span>
                  </td>
                  <td className={`px-4 py-3 font-mono text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>{user.joined}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs text-navy-400 hover:text-navy-300">Manage</button>
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
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Algorithm Management</h2>
      <div className="space-y-4">
        {algorithms.map(algo => (
          <div key={algo.id} className={`rounded-xl p-5 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{algo.name}</h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>
                  {algo.strategyClass} • {algo.status} • {algo.metrics.totalTrades} trades
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  algo.status === 'live' ? 'bg-profit/10 text-profit' :
                  algo.status === 'paper' ? 'bg-navy-400/10 text-navy-400' :
                  'bg-warning/10 text-warning'
                }`}>{algo.status}</span>
                <button className="text-xs text-navy-400 hover:text-navy-300 px-3 py-1 rounded border border-navy-800">Edit</button>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Signal Management</h2>
        <button className="px-4 py-2 rounded-lg bg-navy-500 text-white text-sm font-medium hover:bg-navy-600">
          Publish Signal
        </button>
      </div>
      <div className="space-y-3">
        {signals.map(sig => (
          <div key={sig.id} className={`rounded-xl p-4 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${sig.direction === 'LONG' ? 'bg-profit/10 text-profit' : 'bg-loss/10 text-loss'}`}>
                  {sig.direction}
                </span>
                <div>
                  <p className="text-sm font-medium">{sig.instrument}</p>
                  <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>{sig.algorithmName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  sig.status === 'ACTIVE' ? 'bg-navy-400/10 text-navy-400' :
                  sig.status === 'CLOSED' ? 'bg-graphite-700/50 text-graphite-400' :
                  'bg-warning/10 text-warning'
                }`}>{sig.status}</span>
                <button className="text-xs text-graphite-500 hover:text-graphite-300">⋯</button>
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
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Payments & Subscriptions</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'MRR', value: '$48,290' },
          { label: 'Active Subs', value: '342' },
          { label: 'Churn Rate', value: '3.2%' },
        ].map((s, i) => (
          <div key={i} className={`p-4 rounded-xl ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <p className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>{s.label}</p>
            <p className="text-2xl font-bold mt-1">{s.value}</p>
          </div>
        ))}
      </div>
      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Recent Payments</h3>
        <div className="space-y-3">
          {[
            { user: 'Alex Chen', plan: 'Professional', amount: '$149', date: '2026-01-20', status: 'completed' },
            { user: 'Maria Santos', plan: 'Starter', amount: '$49', date: '2026-01-19', status: 'completed' },
            { user: 'James Wilson', plan: 'Institutional', amount: '$399', date: '2026-01-18', status: 'completed' },
            { user: 'Sarah Miller', plan: 'Professional', amount: '$149', date: '2026-01-17', status: 'refunded' },
          ].map((p, i) => (
            <div key={i} className={`flex items-center justify-between py-2 border-b ${isDark ? 'border-graphite-800' : 'border-graphite-100'}`}>
              <div>
                <p className="text-sm font-medium">{p.user}</p>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>{p.plan} • {p.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono">{p.amount}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${p.status === 'completed' ? 'bg-profit/10 text-profit' : 'bg-warning/10 text-warning'}`}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminBots({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Bot Catalog Management</h2>
      <div className="space-y-4">
        {bots.map(bot => (
          <div key={bot.id} className={`rounded-xl p-5 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{bot.name} <span className={`text-xs font-normal ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>v{bot.version}</span></h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>
                  {bot.category} • {bot.exchanges.join(', ')} • ${bot.price}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  bot.status === 'available' ? 'bg-profit/10 text-profit' :
                  bot.status === 'demo' ? 'bg-navy-400/10 text-navy-400' :
                  'bg-warning/10 text-warning'
                }`}>{bot.status}</span>
                <button className="text-xs text-navy-400 hover:text-navy-300 px-3 py-1 rounded border border-navy-800">Edit</button>
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
    <div className="space-y-6">
      <h2 className="text-xl font-bold">System & Configuration</h2>
      
      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Service Status</h3>
        <div className="space-y-3">
          {[
            { name: 'API Gateway', status: 'Running', port: '8000' },
            { name: 'Signal Engine', status: 'Running', port: '8001' },
            { name: 'WebSocket Server', status: 'Running', port: '8002' },
            { name: 'Background Workers', status: 'Running', port: '-' },
            { name: 'PostgreSQL', status: 'Running', port: '5432' },
            { name: 'Redis', status: 'Running', port: '6379' },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-profit" />
                <span className="text-sm">{s.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-mono ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>:{s.port}</span>
                <span className="text-xs text-profit">{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Audit Log (Recent)</h3>
        <div className="space-y-2">
          {[
            { time: '14:32:01', action: 'Signal published', user: 'system', target: 'sig-001' },
            { time: '14:28:45', action: 'User subscription created', user: 'admin', target: 'user-042' },
            { time: '13:15:22', action: 'Algorithm metrics updated', user: 'system', target: 'algo-001' },
            { time: '12:00:00', action: 'Scheduled backtest completed', user: 'system', target: 'algo-003' },
            { time: '10:45:33', action: 'Payment webhook received', user: 'system', target: 'pay-128' },
          ].map((log, i) => (
            <div key={i} className={`flex items-center gap-4 text-xs py-2 border-b ${isDark ? 'border-graphite-800/50' : 'border-graphite-100'}`}>
              <span className="font-mono text-graphite-500">{log.time}</span>
              <span className="flex-1">{log.action}</span>
              <span className={isDark ? 'text-graphite-500' : 'text-graphite-500'}>{log.user}</span>
              <span className={`font-mono ${isDark ? 'text-graphite-600' : 'text-graphite-400'}`}>{log.target}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Configuration</h3>
        <div className="space-y-3">
          {[
            { key: 'MAX_SIGNALS_PER_DAY', value: '50' },
            { key: 'RATE_LIMIT_PER_MINUTE', value: '60' },
            { key: 'PAPER_TRADING_MODE', value: 'true' },
            { key: 'LIVE_TRADING_ENABLED', value: 'false' },
            { key: 'EMAIL_VERIFICATION_REQUIRED', value: 'true' },
          ].map((cfg, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm font-mono">{cfg.key}</span>
              <span className={`text-sm font-mono ${cfg.value === 'false' ? 'text-loss' : cfg.value === 'true' ? 'text-profit' : ''}`}>{cfg.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
