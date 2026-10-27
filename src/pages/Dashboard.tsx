import { useTheme } from '../App';
import { signals, algorithms, DEMO_DISCLAIMER } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { Activity, TrendingUp, AlertTriangle, Bell, Settings, BarChart3, Signal, Wallet, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useState } from 'react';

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
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className={`hidden lg:flex flex-col w-60 shrink-0 border-r ${isDark ? 'border-graphite-800 bg-navy-950' : 'border-graphite-200 bg-graphite-50'}`}>
        <div className="p-4">
          <p className={`text-xs font-medium uppercase tracking-wider mb-3 ${isDark ? 'text-graphite-600' : 'text-graphite-400'}`}>Dashboard</p>
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
        <div className="mt-auto p-4">
          <div className={`p-3 rounded-lg ${isDark ? 'bg-graphite-900/50' : 'bg-white'}`}>
            <p className="text-xs font-medium">Demo Account</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Free tier — no active subscriptions</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile tabs */}
        <div className={`lg:hidden flex overflow-x-auto border-b ${isDark ? 'border-graphite-800' : 'border-graphite-200'}`}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-navy-500 text-navy-400'
                  : `border-transparent ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Demo banner */}
          <div className={`rounded-lg p-3 mb-6 flex items-center gap-2 ${isDark ? 'bg-warning/5 border border-warning/20' : 'bg-warning/5 border border-warning/20'}`}>
            <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
            <p className="text-xs text-warning">{DEMO_DISCLAIMER}</p>
          </div>

          {activeTab === 'overview' && <OverviewTab isDark={isDark} />}
          {activeTab === 'signals' && <SignalsTab isDark={isDark} />}
          {activeTab === 'analytics' && <AnalyticsTab isDark={isDark} />}
          {activeTab === 'subscriptions' && <SubscriptionsTab isDark={isDark} />}
          {activeTab === 'settings' && <SettingsTab isDark={isDark} />}
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
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Signals', value: '2', icon: Signal, color: 'text-navy-400' },
          { label: 'Open Trades', value: '1', icon: TrendingUp, color: 'text-profit' },
          { label: 'Alerts', value: '3', icon: Bell, color: 'text-warning' },
          { label: 'Active Bots', value: '0', icon: Activity, color: 'text-graphite-400' },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-xl ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <div className="flex items-center justify-between">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className={`text-sm mt-2 ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Equity Chart */}
      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Portfolio Equity (Demo)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={equityData}>
            <defs>
              <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="equity" stroke="#6366f1" fill="url(#dashGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Signals */}
      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Recent Signals</h3>
        <div className="space-y-3">
          {signals.slice(0, 3).map(sig => (
            <div key={sig.id} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-graphite-800/50' : 'bg-graphite-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sig.direction === 'LONG' ? 'bg-profit/10' : 'bg-loss/10'}`}>
                  {sig.direction === 'LONG' ? <ArrowUpRight className="w-4 h-4 text-profit" /> : <ArrowDownRight className="w-4 h-4 text-loss" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{sig.instrument}</p>
                  <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>{sig.algorithmName} • {sig.timeframe}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  sig.status === 'ACTIVE' ? 'bg-navy-400/10 text-navy-400' :
                  sig.status === 'CLOSED' ? 'bg-graphite-700/50 text-graphite-400' :
                  sig.status === 'TRIGGERED' ? 'bg-profit/10 text-profit' :
                  'bg-graphite-700/50 text-graphite-500'
                }`}>{sig.status}</span>
              </div>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Trading Signals</h2>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className={`px-3 py-1.5 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200' : 'bg-graphite-50 border-graphite-300 text-graphite-900'} border`}
        >
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="TRIGGERED">Triggered</option>
          <option value="CLOSED">Closed</option>
          <option value="EXPIRED">Expired</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map(sig => (
          <div key={sig.id} className={`rounded-xl p-5 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sig.direction === 'LONG' ? 'bg-profit/10' : 'bg-loss/10'}`}>
                  {sig.direction === 'LONG' ? <ArrowUpRight className="w-5 h-5 text-profit" /> : <ArrowDownRight className="w-5 h-5 text-loss" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{sig.instrument}</p>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${sig.direction === 'LONG' ? 'bg-profit/10 text-profit' : 'bg-loss/10 text-loss'}`}>
                      {sig.direction}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      sig.status === 'ACTIVE' ? 'bg-navy-400/10 text-navy-400' :
                      sig.status === 'CLOSED' ? (sig.result && sig.result > 0 ? 'bg-profit/10 text-profit' : 'bg-graphite-700/50 text-graphite-400') :
                      sig.status === 'TRIGGERED' ? 'bg-profit/10 text-profit' :
                      'bg-graphite-700/50 text-graphite-500'
                    }`}>{sig.status}</span>
                  </div>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>
                    {sig.algorithmName} • {sig.timeframe} • R:R {sig.riskReward}
                  </p>
                </div>
              </div>
              {sig.result !== undefined && (
                <div className="text-right">
                  <p className={`font-semibold ${sig.result > 0 ? 'text-profit' : 'text-loss'}`}>
                    {sig.result > 0 ? '+' : ''}{sig.result}%
                  </p>
                  <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Result</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-graphite-800/50">
              <div>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Entry</p>
                <p className="text-sm font-mono">{sig.entryPrice}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Stop Loss</p>
                <p className="text-sm font-mono text-loss">{sig.stopLoss}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Take Profit</p>
                <p className="text-sm font-mono text-profit">{sig.takeProfit[0]}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>Published</p>
                <p className="text-sm font-mono">{new Date(sig.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            {sig.invalidationReason && (
              <p className={`text-xs mt-3 ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>
                Reason: {sig.invalidationReason}
              </p>
            )}
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

  const winLossData = [
    { name: 'Win', value: 55, fill: '#10b981' },
    { name: 'Loss', value: 45, fill: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Analytics</h2>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Total P&L', value: '+12.4%', color: 'text-profit' },
          { label: 'Max Drawdown', value: '-4.2%', color: 'text-loss' },
          { label: 'Win Rate', value: '55.2%', color: '' },
        ].map((s, i) => (
          <div key={i} className={`p-4 rounded-xl ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
            <p className={`text-sm ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Drawdown Chart */}
      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Drawdown (Demo)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={drawdownData}>
            <defs>
              <linearGradient id="ddGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="drawdown" stroke="#ef4444" fill="url(#ddGrad)" strokeWidth={1.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Win/Loss Distribution */}
      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Win/Loss Distribution</h3>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={winLossData}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance by Strategy */}
      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Performance by Strategy</h3>
        <div className="space-y-3">
          {algorithms.map(algo => (
            <div key={algo.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{algo.name}</p>
                <p className={`text-xs ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>{algo.strategyClass}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-profit">+{algo.metrics.returnPct}%</span>
                <span className="text-xs font-mono text-loss">-{algo.metrics.maxDrawdown}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SubscriptionsTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Subscriptions</h2>
      
      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-5 h-5 text-graphite-500" />
          <h3 className="font-semibold">Current Plan</h3>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-graphite-800/50' : 'bg-graphite-50'}`}>
          <p className="text-sm font-medium">Free Tier</p>
          <p className={`text-xs mt-1 ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>No active subscription</p>
        </div>
        <p className={`text-sm mt-4 ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
          Subscribe to access real-time trading signals, advanced analytics, and automated trading bots.
        </p>
      </div>

      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Payment History</h3>
        <p className={`text-sm ${isDark ? 'text-graphite-500' : 'text-graphite-500'}`}>No payments yet.</p>
      </div>
    </div>
  );
}

function SettingsTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Settings</h2>
      
      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Profile</h3>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-graphite-300' : 'text-graphite-700'}`}>Name</label>
            <input type="text" defaultValue="Demo User" className={`w-full px-4 py-2.5 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200' : 'bg-graphite-50 border-graphite-300 text-graphite-900'} border focus:outline-none focus:ring-2 focus:ring-navy-500/50`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-graphite-300' : 'text-graphite-700'}`}>Email</label>
            <input type="email" defaultValue="demo@quantspace.io" className={`w-full px-4 py-2.5 rounded-lg text-sm ${isDark ? 'bg-graphite-800 border-graphite-700 text-graphite-200' : 'bg-graphite-50 border-graphite-300 text-graphite-900'} border focus:outline-none focus:ring-2 focus:ring-navy-500/50`} />
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Notifications</h3>
        <div className="space-y-3">
          {['New signals', 'Signal updates', 'Trade closures', 'System alerts'].map((item, i) => (
            <label key={i} className="flex items-center justify-between">
              <span className={`text-sm ${isDark ? 'text-graphite-300' : 'text-graphite-700'}`}>{item}</span>
              <input type="checkbox" defaultChecked={i < 2} className="rounded" />
            </label>
          ))}
        </div>
      </div>

      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">API Keys</h3>
        <p className={`text-sm mb-4 ${isDark ? 'text-graphite-400' : 'text-graphite-600'}`}>
          API access requires an active subscription. Generate keys for programmatic signal access.
        </p>
        <button className="px-4 py-2 rounded-lg bg-graphite-800 text-graphite-300 text-sm font-medium hover:bg-graphite-700 transition-colors" disabled>
          Generate API Key (Requires Subscription)
        </button>
      </div>

      <div className={`rounded-xl p-6 ${isDark ? 'bg-graphite-900/50 border border-graphite-800' : 'bg-white border border-graphite-200'}`}>
        <h3 className="font-semibold mb-4">Security</h3>
        <div className="space-y-3">
          <button className={`w-full text-left px-4 py-3 rounded-lg text-sm ${isDark ? 'bg-graphite-800/50 hover:bg-graphite-800' : 'bg-graphite-50 hover:bg-graphite-100'} transition-colors`}>
            Change Password
          </button>
          <button className={`w-full text-left px-4 py-3 rounded-lg text-sm ${isDark ? 'bg-graphite-800/50 hover:bg-graphite-800' : 'bg-graphite-50 hover:bg-graphite-100'} transition-colors`}>
            Enable Two-Factor Authentication
          </button>
          <button className={`w-full text-left px-4 py-3 rounded-lg text-sm ${isDark ? 'bg-graphite-800/50 hover:bg-graphite-800' : 'bg-graphite-50 hover:bg-graphite-100'} transition-colors`}>
            Active Sessions
          </button>
        </div>
      </div>
    </div>
  );
}
