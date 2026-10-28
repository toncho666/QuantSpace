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
  // Basic metrics
  returnPct: number;
  maxDrawdown: number;
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  avgRR: number;
  observationPeriod: string;
  
  // Advanced risk metrics
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  recoveryFactor: number;
  
  // Statistical metrics
  expectancy: number;
  skewness: number;
  kurtosis: number;
  standardDeviation: number;
  
  // Trade metrics
  avgWin: number;
  avgLoss: number;
  largestWin: number;
  largestLoss: number;
  avgHoldingPeriod: string;
  consecutiveWins: number;
  consecutiveLosses: number;
  
  // Risk metrics
  riskOfRuin: number;
  payoffRatio: number;
  tailRatio: number;
  
  // Costs
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

// Generate ONLY GROWING equity curves (no drawdowns)
function generateGrowingEquityCurve(start: number, end: number, volatility: number, points: number): number[] {
  const curve: number[] = [start];
  const step = (end - start) / points;
  
  for (let i = 1; i < points; i++) {
    // Always positive growth with small variations
    const growth = step + (Math.random() * volatility * 0.5);
    const noise = (Math.random() - 0.3) * volatility * 0.3; // Slight bias toward positive
    curve.push(curve[i - 1] + growth + noise);
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
      sortinoRatio: 2.14,
      calmarRatio: 2.85,
      recoveryFactor: 3.2,
      expectancy: 0.16,
      skewness: 0.42,
      kurtosis: 2.8,
      standardDeviation: 12.4,
      avgWin: 1.8,
      avgLoss: 0.95,
      largestWin: 4.2,
      largestLoss: -1.8,
      avgHoldingPeriod: '4.2 hours',
      consecutiveWins: 7,
      consecutiveLosses: 3,
      riskOfRuin: 0.02,
      payoffRatio: 1.89,
      tailRatio: 1.67,
      commissionPct: 0.05,
      slippagePct: 0.03,
    },
    equityCurve: generateGrowingEquityCurve(100, 123.4, 2, 120),
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
      sortinoRatio: 2.45,
      calmarRatio: 2.87,
      recoveryFactor: 2.9,
      expectancy: 0.40,
      skewness: 0.68,
      kurtosis: 3.1,
      standardDeviation: 15.2,
      avgWin: 2.8,
      avgLoss: 1.3,
      largestWin: 6.8,
      largestLoss: -2.4,
      avgHoldingPeriod: '2.3 days',
      consecutiveWins: 5,
      consecutiveLosses: 4,
      riskOfRuin: 0.01,
      payoffRatio: 2.15,
      tailRatio: 2.31,
      commissionPct: 0.04,
      slippagePct: 0.05,
    },
    equityCurve: generateGrowingEquityCurve(100, 134.7, 3, 120),
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
      sortinoRatio: 1.92,
      calmarRatio: 2.61,
      recoveryFactor: 2.4,
      expectancy: 0.65,
      skewness: 0.95,
      kurtosis: 3.8,
      standardDeviation: 18.7,
      avgWin: 3.5,
      avgLoss: 1.45,
      largestWin: 8.2,
      largestLoss: -3.1,
      avgHoldingPeriod: '6.8 hours',
      consecutiveWins: 4,
      consecutiveLosses: 5,
      riskOfRuin: 0.03,
      payoffRatio: 2.41,
      tailRatio: 2.65,
      commissionPct: 0.06,
      slippagePct: 0.08,
    },
    equityCurve: generateGrowingEquityCurve(100, 141.2, 4, 120),
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
      sortinoRatio: 2.78,
      calmarRatio: 2.95,
      recoveryFactor: 3.8,
      expectancy: 0.035,
      skewness: 0.28,
      kurtosis: 2.4,
      standardDeviation: 8.9,
      avgWin: 0.6,
      avgLoss: 0.42,
      largestWin: 1.4,
      largestLoss: -0.85,
      avgHoldingPeriod: '12 minutes',
      consecutiveWins: 12,
      consecutiveLosses: 6,
      riskOfRuin: 0.005,
      payoffRatio: 1.43,
      tailRatio: 1.24,
      commissionPct: 0.12,
      slippagePct: 0.05,
    },
    equityCurve: generateGrowingEquityCurve(100, 118.9, 1.5, 120),
    lastUpdated: '2025-12-01',
    limitations: ['Backtest only', 'Requires low-latency execution', 'High commission sensitivity', 'Not for beginners'],
    signalLogic: 'Entry on CVD divergence at POC/VAH/VAL with immediate price rejection confirmation.',
  },
  {
    id: 'algo-005',
    slug: 'statistical-arbitrage-pairs',
    name: 'Statistical Arbitrage',
    description: 'Pairs trading strategy exploiting mean reversion between correlated assets. Market-neutral approach.',
    fullDescription: 'This market-neutral strategy identifies pairs of highly correlated assets that temporarily diverge from their historical relationship. It enters long the underperformer and short the outperformer, profiting from mean reversion while maintaining minimal market exposure.',
    strategyClass: 'Statistical Arbitrage',
    markets: ['Equities', 'Crypto'],
    timeframes: ['1H', '4H', '1D'],
    riskProfile: 'conservative',
    status: 'paper',
    pricing: { monthly: 199, annual: 1990 },
    metrics: {
      returnPct: 15.8,
      maxDrawdown: 4.2,
      totalTrades: 287,
      winRate: 64.1,
      profitFactor: 1.95,
      avgRR: 1.8,
      observationPeriod: '14 months',
      sharpeRatio: 2.34,
      sortinoRatio: 3.12,
      calmarRatio: 3.76,
      recoveryFactor: 4.5,
      expectancy: 0.055,
      skewness: 0.35,
      kurtosis: 2.6,
      standardDeviation: 7.2,
      avgWin: 1.2,
      avgLoss: 0.65,
      largestWin: 2.8,
      largestLoss: -1.2,
      avgHoldingPeriod: '1.8 days',
      consecutiveWins: 9,
      consecutiveLosses: 4,
      riskOfRuin: 0.008,
      payoffRatio: 1.85,
      tailRatio: 1.72,
      commissionPct: 0.08,
      slippagePct: 0.04,
    },
    equityCurve: generateGrowingEquityCurve(100, 115.8, 1.2, 120),
    lastUpdated: '2026-01-18',
    limitations: ['Requires simultaneous execution on both legs', 'Correlation breakdown risk', 'Lower absolute returns'],
    signalLogic: 'Entry when z-score of spread exceeds 2 standard deviations with correlation > 0.85 over 60-day window.',
  },
  {
    id: 'algo-006',
    slug: 'volatility-breakout',
    name: 'Volatility Breakout',
    description: 'Captures explosive moves after volatility compression. Uses ATR and Bollinger Band squeeze detection.',
    fullDescription: 'This strategy identifies periods of low volatility (Bollinger Band squeeze) followed by expansion. It enters in the direction of the breakout with momentum confirmation, targeting the full range of the volatility expansion cycle.',
    strategyClass: 'Volatility',
    markets: ['Futures', 'Crypto', 'Forex'],
    timeframes: ['15m', '1H', '4H'],
    riskProfile: 'moderate',
    status: 'paper',
    pricing: { monthly: 179, annual: 1790 },
    metrics: {
      returnPct: 28.3,
      maxDrawdown: 9.8,
      totalTrades: 156,
      winRate: 51.9,
      profitFactor: 2.08,
      avgRR: 2.9,
      observationPeriod: '11 months',
      sharpeRatio: 1.78,
      sortinoRatio: 2.34,
      calmarRatio: 2.89,
      recoveryFactor: 3.1,
      expectancy: 0.18,
      skewness: 0.72,
      kurtosis: 3.2,
      standardDeviation: 13.8,
      avgWin: 2.4,
      avgLoss: 1.15,
      largestWin: 5.6,
      largestLoss: -2.1,
      avgHoldingPeriod: '8.4 hours',
      consecutiveWins: 6,
      consecutiveLosses: 4,
      riskOfRuin: 0.015,
      payoffRatio: 2.09,
      tailRatio: 2.18,
      commissionPct: 0.05,
      slippagePct: 0.06,
    },
    equityCurve: generateGrowingEquityCurve(100, 128.3, 2.5, 120),
    lastUpdated: '2026-01-10',
    limitations: ['False breakouts in choppy markets', 'Requires patience for setups', 'Position sizing critical'],
    signalLogic: 'Entry on Bollinger Band squeeze release with ATR expansion > 150% of 20-period average and volume confirmation.',
  },
  {
    id: 'algo-007',
    slug: 'market-making-grid',
    name: 'Grid Market Making',
    description: 'Automated market making with dynamic grid spacing. Profits from bid-ask spread in ranging markets.',
    fullDescription: 'This strategy places multiple limit orders above and below current price in a grid pattern. It profits from the bid-ask spread as price oscillates within a range. Grid spacing adjusts dynamically based on volatility and order book depth.',
    strategyClass: 'Market Making',
    markets: ['Crypto'],
    timeframes: ['1m', '5m', '15m'],
    riskProfile: 'conservative',
    status: 'backtest',
    pricing: { license: 1999 },
    metrics: {
      returnPct: 22.1,
      maxDrawdown: 5.6,
      totalTrades: 1847,
      winRate: 72.3,
      profitFactor: 1.68,
      avgRR: 0.8,
      observationPeriod: '8 months (backtest)',
      sharpeRatio: 2.67,
      sortinoRatio: 3.45,
      calmarRatio: 3.95,
      recoveryFactor: 5.2,
      expectancy: 0.012,
      skewness: 0.18,
      kurtosis: 2.2,
      standardDeviation: 6.8,
      avgWin: 0.35,
      avgLoss: 0.28,
      largestWin: 0.85,
      largestLoss: -0.52,
      avgHoldingPeriod: '3.2 minutes',
      consecutiveWins: 24,
      consecutiveLosses: 8,
      riskOfRuin: 0.003,
      payoffRatio: 1.25,
      tailRatio: 1.12,
      commissionPct: 0.10,
      slippagePct: 0.02,
    },
    equityCurve: generateGrowingEquityCurve(100, 122.1, 1, 120),
    lastUpdated: '2025-12-15',
    limitations: ['Backtest only', 'Inventory risk in trending markets', 'Requires significant capital', 'High trade frequency'],
    signalLogic: 'Dynamic grid placement based on order book imbalance, volatility regime, and spread analysis.',
  },
  {
    id: 'algo-008',
    slug: 'momentum-trend-following',
    name: 'Momentum Trend',
    description: 'Classic trend following using moving average crossovers and momentum oscillators. Captures major moves.',
    fullDescription: 'This strategy identifies strong trending markets using multiple timeframe moving average alignment and momentum indicators. It enters on pullbacks in established trends and uses trailing stops to maximize profit capture.',
    strategyClass: 'Trend Following',
    markets: ['Futures', 'Crypto', 'Forex', 'Equities'],
    timeframes: ['4H', '1D'],
    riskProfile: 'moderate',
    status: 'live',
    pricing: { monthly: 249, annual: 2490 },
    metrics: {
      returnPct: 38.7,
      maxDrawdown: 14.2,
      totalTrades: 94,
      winRate: 48.9,
      profitFactor: 2.31,
      avgRR: 3.5,
      observationPeriod: '18 months',
      sharpeRatio: 1.62,
      sortinoRatio: 2.18,
      calmarRatio: 2.73,
      recoveryFactor: 2.7,
      expectancy: 0.41,
      skewness: 0.85,
      kurtosis: 3.5,
      standardDeviation: 16.9,
      avgWin: 3.8,
      avgLoss: 1.65,
      largestWin: 9.2,
      largestLoss: -2.8,
      avgHoldingPeriod: '3.5 days',
      consecutiveWins: 5,
      consecutiveLosses: 5,
      riskOfRuin: 0.012,
      payoffRatio: 2.30,
      tailRatio: 2.48,
      commissionPct: 0.04,
      slippagePct: 0.07,
    },
    equityCurve: generateGrowingEquityCurve(100, 138.7, 3.5, 120),
    lastUpdated: '2026-01-20',
    limitations: ['Whipsaws in ranging markets', 'Requires patience', 'Lower win rate but high R:R', 'Not for short-term traders'],
    signalLogic: 'Entry on 20/50 EMA crossover with RSI > 50 and ADX > 25, confirmed by higher timeframe trend alignment.',
  },
  {
    id: 'algo-009',
    slug: 'mean-reversion-rsi',
    name: 'RSI Mean Reversion',
    description: 'Counter-trend strategy using RSI extremes and support/resistance levels. High win rate, lower R:R.',
    fullDescription: 'This strategy identifies overbought/oversold conditions using RSI combined with key support/resistance levels. It enters counter-trend positions when RSI reaches extreme levels (below 30 or above 70) at significant price levels, targeting mean reversion.',
    strategyClass: 'Mean Reversion',
    markets: ['Forex', 'Equities'],
    timeframes: ['15m', '1H', '4H'],
    riskProfile: 'moderate',
    status: 'paper',
    pricing: { monthly: 129, annual: 1290 },
    metrics: {
      returnPct: 19.4,
      maxDrawdown: 7.3,
      totalTrades: 312,
      winRate: 68.7,
      profitFactor: 1.72,
      avgRR: 1.5,
      observationPeriod: '13 months',
      sharpeRatio: 1.89,
      sortinoRatio: 2.52,
      calmarRatio: 2.66,
      recoveryFactor: 3.4,
      expectancy: 0.062,
      skewness: 0.48,
      kurtosis: 2.9,
      standardDeviation: 10.5,
      avgWin: 1.1,
      avgLoss: 0.73,
      largestWin: 2.6,
      largestLoss: -1.4,
      avgHoldingPeriod: '5.6 hours',
      consecutiveWins: 11,
      consecutiveLosses: 4,
      riskOfRuin: 0.01,
      payoffRatio: 1.51,
      tailRatio: 1.42,
      commissionPct: 0.05,
      slippagePct: 0.04,
    },
    equityCurve: generateGrowingEquityCurve(100, 119.4, 1.8, 120),
    lastUpdated: '2026-01-05',
    limitations: ['Counter-trend risk in strong trends', 'Requires clear S/R levels', 'Not suitable for trending markets'],
    signalLogic: 'Entry when RSI < 30 at support or RSI > 70 at resistance with bullish/bearish divergence confirmation.',
  },
  {
    id: 'algo-010',
    slug: 'carry-trade-forex',
    name: 'Carry Trade FX',
    description: 'Long-term forex strategy exploiting interest rate differentials. Low frequency, steady returns.',
    fullDescription: 'This strategy goes long high-yielding currencies and short low-yielding currencies, profiting from the interest rate differential (carry). Positions are held for weeks to months with careful risk management and correlation monitoring.',
    strategyClass: 'Carry Trade',
    markets: ['Forex'],
    timeframes: ['1D', '1W'],
    riskProfile: 'conservative',
    status: 'live',
    pricing: { monthly: 179, annual: 1790 },
    metrics: {
      returnPct: 12.8,
      maxDrawdown: 6.1,
      totalTrades: 47,
      winRate: 72.3,
      profitFactor: 1.89,
      avgRR: 2.1,
      observationPeriod: '24 months',
      sharpeRatio: 1.45,
      sortinoRatio: 1.98,
      calmarRatio: 2.10,
      recoveryFactor: 2.5,
      expectancy: 0.27,
      skewness: 0.52,
      kurtosis: 2.7,
      standardDeviation: 9.8,
      avgWin: 2.8,
      avgLoss: 1.48,
      largestWin: 6.4,
      largestLoss: -2.2,
      avgHoldingPeriod: '18 days',
      consecutiveWins: 8,
      consecutiveLosses: 3,
      riskOfRuin: 0.008,
      payoffRatio: 1.89,
      tailRatio: 1.78,
      commissionPct: 0.03,
      slippagePct: 0.05,
    },
    equityCurve: generateGrowingEquityCurve(100, 112.8, 1.5, 120),
    lastUpdated: '2026-01-15',
    limitations: ['Slow returns', 'Currency crisis risk', 'Requires large capital', 'Interest rate changes impact'],
    signalLogic: 'Entry on interest rate differential > 3% with positive carry and favorable technical setup on weekly chart.',
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
    algorithms: ['algo-001', 'algo-002', 'algo-003', 'algo-004', 'algo-005', 'algo-006', 'algo-007', 'algo-008', 'algo-009', 'algo-010'],
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
