// Synthetic demo data — clearly marked as not real trading results
export const DEMO_DISCLAIMER = "All data shown is synthetic demo data for illustration purposes only. Not real trading results.";

export interface Algorithm {
  id: string;
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  strategyClass: string;
  markets: string[];
  timeframes: string[];
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  status: 'backtest' | 'paper' | 'live';
  pricing: { monthly: number; annual: number } | { license: number };
  metrics: AlgorithmMetrics;
  equityCurve: number[];
  lastUpdated: string;
  limitations: string[];
  signalLogic: string;
}

export interface AlgorithmMetrics {
  returnPct: number;
  maxDrawdown: number;
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  avgRR: number;
  observationPeriod: string;
  sharpeRatio: number;
  avgWin: number;
  avgLoss: number;
  commissionPct: number;
  slippagePct: number;
}

export interface Signal {
  id: string;
  algorithmId: string;
  algorithmName: string;
  instrument: string;
  timeframe: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  entryZone?: [number, number];
  stopLoss: number;
  takeProfit: number[];
  riskReward: number;
  createdAt: string;
  expiresAt: string;
  status: 'NEW' | 'ACTIVE' | 'TRIGGERED' | 'FILLED' | 'CLOSED' | 'CANCELLED' | 'EXPIRED';
  result?: number;
  invalidationReason?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'annual';
  features: string[];
  algorithms: string[];
  highlighted?: boolean;
}

export interface Bot {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  exchanges: string[];
  instruments: string[];
  timeframes: string[];
  minCapital: number;
  maxDrawdown: number;
  returnPct: number;
  price: number;
  licenseType: 'subscription' | 'lifetime' | 'signals';
  status: 'available' | 'coming_soon' | 'demo';
}

// Synthetic equity curves (normalized to 100 start)
function generateEquityCurve(start: number, end: number, volatility: number, points: number): number[] {
  const curve: number[] = [start];
  const step = (end - start) / points;
  for (let i = 1; i < points; i++) {
    const noise = (Math.random() - 0.5) * volatility;
    curve.push(curve[i - 1] + step + noise);
  }
  curve.push(end);
  return curve;
}

export const algorithms: Algorithm[] = [
  {
    id: 'algo-001',
    slug: 'volume-profile-mean-reversion',
    name: 'VP Mean Reversion',
    description: 'Identifies value area extremes with volume profile confirmation. Targets reversion to POC on balance days.',
    fullDescription: 'This strategy identifies when price reaches Value Area High (VAH) or Value Area Low (VAL) during balance periods and looks for rejection signals to trade back toward the Point of Control (POC). It uses volume profile analysis, regime detection, and price action confirmation to filter high-probability setups.',
    strategyClass: 'Mean Reversion',
    markets: ['Futures', 'Crypto', 'Forex'],
    timeframes: ['15m', '1H', '4H'],
    riskProfile: 'moderate',
    status: 'paper',
    pricing: { monthly: 149, annual: 1490 },
    metrics: {
      returnPct: 23.4,
      maxDrawdown: 8.2,
      totalTrades: 142,
      winRate: 61.3,
      profitFactor: 1.87,
      avgRR: 2.1,
      observationPeriod: '8 months',
      sharpeRatio: 1.62,
      avgWin: 1.8,
      avgLoss: 0.95,
      commissionPct: 0.05,
      slippagePct: 0.03,
    },
    equityCurve: generateEquityCurve(100, 123.4, 3, 120),
    lastUpdated: '2026-01-15',
    limitations: ['Requires liquid instruments', 'Not suitable for trending markets', 'Minimum 4H daily screen time recommended'],
    signalLogic: 'Entry triggered when price rejects VAH/VAL with volume delta confirmation and regime filter showing balance.',
  },
  {
    id: 'algo-002',
    slug: 'trend-continuation-momentum',
    name: 'Trend Continuation',
    description: 'Captures trend continuation after healthy pullbacks in trending regimes. Uses market structure analysis.',
    fullDescription: 'Designed for trending market conditions, this algorithm identifies pullbacks that maintain market structure and enters on confirmation of trend continuation. Uses multi-timeframe analysis and volume confirmation.',
    strategyClass: 'Trend Following',
    markets: ['Futures', 'Crypto', 'Equities'],
    timeframes: ['1H', '4H', '1D'],
    riskProfile: 'moderate',
    status: 'paper',
    pricing: { monthly: 199, annual: 1990 },
    metrics: {
      returnPct: 34.7,
      maxDrawdown: 12.1,
      totalTrades: 87,
      winRate: 52.9,
      profitFactor: 2.14,
      avgRR: 3.2,
      observationPeriod: '10 months',
      sharpeRatio: 1.89,
      avgWin: 2.8,
      avgLoss: 1.3,
      commissionPct: 0.04,
      slippagePct: 0.05,
    },
    equityCurve: generateEquityCurve(100, 134.7, 4, 120),
    lastUpdated: '2026-01-12',
    limitations: ['Requires trending conditions', 'May underperform in choppy markets', 'Patience needed for setups'],
    signalLogic: 'Entry on pullback to key level with structure preservation, confirmed by volume and momentum indicators.',
  },
  {
    id: 'algo-003',
    slug: 'breakout-value-shift',
    name: 'Breakout Value Shift',
    description: 'Detects acceptance of price beyond Value Area with retest confirmation. Trades directional imbalances.',
    fullDescription: 'This strategy identifies when price breaks out of the value area and is accepted at new levels. It waits for a retest of the broken level before entering, reducing false breakout risk. Combines volume profile shifts with order flow analysis.',
    strategyClass: 'Breakout',
    markets: ['Futures', 'Crypto'],
    timeframes: ['15m', '1H', '4H'],
    riskProfile: 'aggressive',
    status: 'backtest',
    pricing: { license: 2499 },
    metrics: {
      returnPct: 41.2,
      maxDrawdown: 15.8,
      totalTrades: 63,
      winRate: 47.6,
      profitFactor: 2.41,
      avgRR: 3.8,
      observationPeriod: '12 months (backtest)',
      sharpeRatio: 1.45,
      avgWin: 3.5,
      avgLoss: 1.45,
      commissionPct: 0.06,
      slippagePct: 0.08,
    },
    equityCurve: generateEquityCurve(100, 141.2, 5, 120),
    lastUpdated: '2025-12-20',
    limitations: ['Backtest only — not yet validated in live markets', 'Higher drawdown expected', 'Requires fast execution'],
    signalLogic: 'Entry on retest of broken VAH/VAL after confirmed value area shift with volume expansion.',
  },
  {
    id: 'algo-004',
    slug: 'scalping-delta-divergence',
    name: 'Delta Divergence Scalp',
    description: 'Short-term scalping based on CVD divergences at key volume levels. Quick in-and-out with tight risk.',
    fullDescription: 'A high-frequency scalping strategy that identifies divergences between cumulative volume delta (CVD) and price action at significant volume profile levels. Targets small but consistent gains with strict risk management.',
    strategyClass: 'Scalping',
    markets: ['Futures', 'Crypto'],
    timeframes: ['1m', '5m', '15m'],
    riskProfile: 'aggressive',
    status: 'backtest',
    pricing: { monthly: 299, annual: 2990 },
    metrics: {
      returnPct: 18.9,
      maxDrawdown: 6.4,
      totalTrades: 534,
      winRate: 58.2,
      profitFactor: 1.52,
      avgRR: 1.4,
      observationPeriod: '6 months (backtest)',
      sharpeRatio: 2.1,
      avgWin: 0.6,
      avgLoss: 0.42,
      commissionPct: 0.12,
      slippagePct: 0.05,
    },
    equityCurve: generateEquityCurve(100, 118.9, 2, 120),
    lastUpdated: '2025-12-01',
    limitations: ['Backtest only', 'Requires low-latency execution', 'High commission sensitivity', 'Not for beginners'],
    signalLogic: 'Entry on CVD divergence at POC/VAH/VAL with immediate price rejection confirmation.',
  },
];

export const signals: Signal[] = [
  {
    id: 'sig-001',
    algorithmId: 'algo-001',
    algorithmName: 'VP Mean Reversion',
    instrument: 'ES (E-mini S&P 500)',
    timeframe: '1H',
    direction: 'LONG',
    entryPrice: 4892.50,
    entryZone: [4888, 4895],
    stopLoss: 4878.00,
    takeProfit: [4910.00, 4925.00, 4940.00],
    riskReward: 2.3,
    createdAt: '2026-01-20T14:30:00Z',
    expiresAt: '2026-01-20T20:00:00Z',
    status: 'ACTIVE',
  },
  {
    id: 'sig-002',
    algorithmId: 'algo-002',
    algorithmName: 'Trend Continuation',
    instrument: 'BTC/USDT',
    timeframe: '4H',
    direction: 'LONG',
    entryPrice: 42150,
    stopLoss: 41200,
    takeProfit: [44000, 45500],
    riskReward: 3.1,
    createdAt: '2026-01-20T08:00:00Z',
    expiresAt: '2026-01-22T08:00:00Z',
    status: 'TRIGGERED',
  },
  {
    id: 'sig-003',
    algorithmId: 'algo-001',
    algorithmName: 'VP Mean Reversion',
    instrument: 'NQ (E-mini Nasdaq)',
    timeframe: '15m',
    direction: 'SHORT',
    entryPrice: 17245.00,
    stopLoss: 17280.00,
    takeProfit: [17180.00, 17120.00],
    riskReward: 2.0,
    createdAt: '2026-01-19T16:00:00Z',
    expiresAt: '2026-01-19T22:00:00Z',
    status: 'CLOSED',
    result: 1.8,
  },
  {
    id: 'sig-004',
    algorithmId: 'algo-003',
    algorithmName: 'Breakout Value Shift',
    instrument: 'CL (Crude Oil)',
    timeframe: '1H',
    direction: 'SHORT',
    entryPrice: 73.45,
    stopLoss: 74.20,
    takeProfit: [72.00, 70.80],
    riskReward: 2.8,
    createdAt: '2026-01-19T10:00:00Z',
    expiresAt: '2026-01-19T18:00:00Z',
    status: 'EXPIRED',
    invalidationReason: 'Price did not reach entry zone before expiration',
  },
  {
    id: 'sig-005',
    algorithmId: 'algo-002',
    algorithmName: 'Trend Continuation',
    instrument: 'ETH/USDT',
    timeframe: '4H',
    direction: 'LONG',
    entryPrice: 2280,
    stopLoss: 2210,
    takeProfit: [2420, 2550],
    riskReward: 2.5,
    createdAt: '2026-01-18T12:00:00Z',
    expiresAt: '2026-01-21T12:00:00Z',
    status: 'CLOSED',
    result: 2.1,
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter',
    price: 49,
    period: 'monthly',
    features: ['1 algorithm access', 'Daily signal delivery', 'Basic analytics', 'Email notifications', 'Signal history (30 days)'],
    algorithms: ['algo-001'],
  },
  {
    id: 'plan-pro',
    name: 'Professional',
    price: 149,
    period: 'monthly',
    features: ['3 algorithm access', 'Real-time signals', 'Advanced analytics', 'All notification channels', 'Full signal history', 'API access (limited)', 'Priority support'],
    algorithms: ['algo-001', 'algo-002', 'algo-003'],
    highlighted: true,
  },
  {
    id: 'plan-institutional',
    name: 'Institutional',
    price: 399,
    period: 'monthly',
    features: ['All algorithms', 'Real-time signals + WebSocket', 'Full analytics suite', 'Custom alerts', 'Unlimited history', 'Full API access', 'Dedicated support', 'Custom strategy requests'],
    algorithms: ['algo-001', 'algo-002', 'algo-003', 'algo-004'],
  },
];

export const bots: Bot[] = [
  {
    id: 'bot-001',
    name: 'VP AutoTrader',
    version: '2.1.0',
    description: 'Automated execution of VP Mean Reversion signals. Connects to supported exchanges for hands-free trading.',
    category: 'Mean Reversion',
    exchanges: ['Binance Futures', 'Bybit', 'Interactive Brokers'],
    instruments: ['Crypto Perpetuals', 'ES', 'NQ'],
    timeframes: ['15m', '1H'],
    minCapital: 5000,
    maxDrawdown: 8.2,
    returnPct: 23.4,
    price: 99,
    licenseType: 'subscription',
    status: 'demo',
  },
  {
    id: 'bot-002',
    name: 'Trend Rider',
    version: '1.4.2',
    description: 'Automated trend-following execution with dynamic position sizing and trailing stops.',
    category: 'Trend Following',
    exchanges: ['Binance', 'Bybit', 'OKX'],
    instruments: ['BTC/USDT', 'ETH/USDT', 'Major pairs'],
    timeframes: ['1H', '4H', '1D'],
    minCapital: 10000,
    maxDrawdown: 12.1,
    returnPct: 34.7,
    price: 149,
    licenseType: 'subscription',
    status: 'coming_soon',
  },
  {
    id: 'bot-003',
    name: 'Breakout Executor',
    version: '1.0.0',
    description: 'High-speed execution engine for breakout strategies. Optimized for low-latency environments.',
    category: 'Breakout',
    exchanges: ['Binance Futures'],
    instruments: ['Crypto Perpetuals'],
    timeframes: ['15m', '1H'],
    minCapital: 15000,
    maxDrawdown: 15.8,
    returnPct: 41.2,
    price: 2499,
    licenseType: 'lifetime',
    status: 'coming_soon',
  },
];

export const faqItems = [
  {
    question: 'Are these real trading results?',
    answer: 'Our platform clearly distinguishes between backtest results, paper trading, and live trading. Each algorithm page shows the data source and methodology. Past performance does not guarantee future results.',
  },
  {
    question: 'How are signals delivered?',
    answer: 'Signals are delivered via email, push notifications, Telegram, and our API. Real-time subscribers also get WebSocket updates with minimal latency.',
  },
  {
    question: 'Can I automate trading with your signals?',
    answer: 'Yes. Our Trading Bot Shop offers automated execution bots that connect to supported exchanges. Some strategies also offer API-only access for custom integrations.',
  },
  {
    question: 'What markets do you cover?',
    answer: 'We currently cover crypto perpetuals, CME futures (ES, NQ, CL, GC), and select forex pairs. New markets are added based on strategy requirements.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 14-day money-back guarantee on all subscription plans. License purchases are non-refundable after activation.',
  },
  {
    question: 'Do you guarantee profits?',
    answer: 'No. Trading involves substantial risk of loss. Our algorithms are tools that provide systematic analysis — they do not guarantee profits. Always trade within your risk tolerance.',
  },
];
