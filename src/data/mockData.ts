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
  drawdownCurve: number[];
  monthlyReturns: number[][]; // [year][month]
  rollingSharpe: number[];
  lastUpdated: string;
  limitations: string[];
  signalLogic: string;
  regulatoryInfo: RegulatoryInfo;
}

export interface AlgorithmMetrics {
  // 1. Return
  totalReturn: number;
  cagr: number;
  netProfit: number;
  avgMonthlyReturn: number;
  avgAnnualReturn: number;
  profitableMonthsPct: number;
  returnAfterCosts: number;

  // 2. Risk
  maxDrawdown: number;
  maxDrawdownAmount: number;
  currentDrawdown: number;
  avgDrawdown: number;
  medianDrawdown: number;
  maxDrawdownDuration: number; // days
  recoveryTime: number; // days
  volatility: number;
  var95: number;
  cvar95: number;
  worstDay: number;
  worstWeek: number;
  worstMonth: number;
  maxConsecutiveLosses: number;
  riskOfRuin: number;

  // 3. Risk-adjusted Return
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  sterlingRatio: number;
  marRatio: number;
  returnToMaxDD: number;
  returnToAvgDD: number;

  // 4. Trade Statistics
  totalTrades: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  expectancy: number;
  avgWinLossRatio: number;
  avgRMultiple: number;
  avgTradeDuration: string;
  tradesPerDay: number;
  tradesPerMonth: number;
  costPerTrade: number;

  // 5. Robustness
  inSampleReturn: number;
  outOfSampleReturn: number;
  walkForwardReturn: number;
  monteCarloP50: number;
  monteCarloP5: number;
  parameterSensitivity: number;
  top10TradesContribution: number;
  independentObservations: number;
  overfittingRisk: 'low' | 'medium' | 'high';

  // 6. Market Behavior
  trendPerformance: number;
  flatPerformance: number;
  highVolPerformance: number;
  longWinRate: number;
  shortWinRate: number;
  avgExposure: number;
  avgTimeInPosition: string;
  bestSession: string;

  // 7. Capital Efficiency
  recommendedCapital: number;
  maxPositionSize: number;
  leverage: number;
  marginRequirement: number;
  returnOnCapital: number;
  returnOnMargin: number;
  turnover: number;
  slippageImpact: number;
  strategyCapacity: string;

  // 8. Operational Reliability
  systemUptime: number;
  executionErrors: number;
  signalDelay: number; // ms
  missedTrades: number;
  modelVsActualSlippage: number;
  brokerStability: number;

  // Legacy (for compatibility)
  returnPct: number;
  observationPeriod: string;
  avgRR: number;
  largestWin: number;
  largestLoss: number;
  consecutiveWins: number;
  skewness: number;
  kurtosis: number;
  standardDeviation: number;
  recoveryFactor: number;
  payoffRatio: number;
  tailRatio: number;
  commissionPct: number;
  slippagePct: number;
}

export interface RegulatoryInfo {
  resultType: 'backtest' | 'paper' | 'live';
  testStartDate: string;
  testEndDate: string;
  lastUpdated: string;
  commission: number;
  slippage: number;
  initialCapital: number;
  calculationMethod: string;
  leverageAssumption: number;
  limitations: string[];
  disclaimer: string;
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

// Generate ONLY GROWING equity curves
function generateGrowingEquityCurve(start: number, end: number, volatility: number, points: number): number[] {
  const curve: number[] = [start];
  const step = (end - start) / points;
  
  for (let i = 1; i < points; i++) {
    const growth = step + (Math.random() * volatility * 0.5);
    const noise = (Math.random() - 0.3) * volatility * 0.3;
    curve.push(curve[i - 1] + growth + noise);
  }
  
  curve.push(end);
  return curve;
}

// Generate drawdown curve (negative values)
function generateDrawdownCurve(equityCurve: number[], maxDD: number): number[] {
  const peak = equityCurve[0];
  return equityCurve.map((value, i) => {
    const currentPeak = Math.max(...equityCurve.slice(0, i + 1));
    const dd = ((value - currentPeak) / currentPeak) * 100;
    return Math.max(dd, -maxDD * (0.5 + Math.random() * 0.5));
  });
}

// Generate monthly returns (3 years x 12 months)
function generateMonthlyReturns(annualReturn: number): number[][] {
  const years = 3;
  const monthlyData: number[][] = [];
  const avgMonthly = Math.pow(1 + annualReturn / 100, 1/12) - 1;
  
  for (let y = 0; y < years; y++) {
    const yearData: number[] = [];
    for (let m = 0; m < 12; m++) {
      const variation = (Math.random() - 0.4) * 3;
      yearData.push(avgMonthly * 100 + variation);
    }
    monthlyData.push(yearData);
  }
  
  return monthlyData;
}

// Generate rolling Sharpe
function generateRollingSharpe(baseSharpe: number, points: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < points; i++) {
    const variation = (Math.random() - 0.5) * 0.8;
    data.push(Math.max(0, baseSharpe + variation));
  }
  return data;
}

export const algorithms: Algorithm[] = [
  {
    id: 'algo-001',
    slug: 'volume-profile-mean-reversion',
    name: 'VP Mean Reversion',
    description: 'Identifies value area extremes with volume profile confirmation. Targets reversion to POC on balance days.',
    fullDescription: 'This strategy identifies when price reaches Value Area High (VAH) or Value Area Low (VAL) during balance periods and looks for rejection signals to trade back toward the Point of Control (POC).',
    strategyClass: 'Mean Reversion',
    markets: ['Futures', 'Crypto', 'Forex'],
    timeframes: ['15m', '1H', '4H'],
    riskProfile: 'moderate',
    status: 'paper',
    pricing: { monthly: 149, annual: 1490 },
    metrics: {
      // 1. Return
      totalReturn: 23.4,
      cagr: 18.7,
      netProfit: 23400,
      avgMonthlyReturn: 1.8,
      avgAnnualReturn: 21.6,
      profitableMonthsPct: 68,
      returnAfterCosts: 21.8,

      // 2. Risk
      maxDrawdown: 8.2,
      maxDrawdownAmount: 1640,
      currentDrawdown: 2.1,
      avgDrawdown: 3.4,
      medianDrawdown: 2.8,
      maxDrawdownDuration: 23,
      recoveryTime: 18,
      volatility: 12.4,
      var95: 1.8,
      cvar95: 2.4,
      worstDay: -2.1,
      worstWeek: -4.2,
      worstMonth: -6.8,
      maxConsecutiveLosses: 5,
      riskOfRuin: 0.02,

      // 3. Risk-adjusted
      sharpeRatio: 1.62,
      sortinoRatio: 2.14,
      calmarRatio: 2.85,
      sterlingRatio: 2.12,
      marRatio: 2.85,
      returnToMaxDD: 2.85,
      returnToAvgDD: 6.88,

      // 4. Trade Statistics
      totalTrades: 142,
      winRate: 61.3,
      avgWin: 1.8,
      avgLoss: 0.95,
      profitFactor: 1.87,
      expectancy: 0.16,
      avgWinLossRatio: 1.89,
      avgRMultiple: 1.2,
      avgTradeDuration: '4.2 hours',
      tradesPerDay: 0.6,
      tradesPerMonth: 17.8,
      costPerTrade: 12.5,

      // 5. Robustness
      inSampleReturn: 28.4,
      outOfSampleReturn: 18.4,
      walkForwardReturn: 16.8,
      monteCarloP50: 21.2,
      monteCarloP5: 12.4,
      parameterSensitivity: 0.15,
      top10TradesContribution: 28,
      independentObservations: 142,
      overfittingRisk: 'low',

      // 6. Market Behavior
      trendPerformance: -2.4,
      flatPerformance: 18.7,
      highVolPerformance: 8.2,
      longWinRate: 63.2,
      shortWinRate: 59.4,
      avgExposure: 45,
      avgTimeInPosition: '4.2 hours',
      bestSession: 'US Open',

      // 7. Capital Efficiency
      recommendedCapital: 25000,
      maxPositionSize: 5,
      leverage: 2,
      marginRequirement: 5000,
      returnOnCapital: 93.6,
      returnOnMargin: 468,
      turnover: 2.8,
      slippageImpact: 0.3,
      strategyCapacity: '$500k',

      // 8. Operational
      systemUptime: 99.8,
      executionErrors: 0.2,
      signalDelay: 45,
      missedTrades: 1,
      modelVsActualSlippage: 0.15,
      brokerStability: 99.5,

      // Legacy
      returnPct: 23.4,
      observationPeriod: '8 months',
      avgRR: 2.1,
      largestWin: 4.2,
      largestLoss: -1.8,
      consecutiveWins: 7,
      skewness: 0.42,
      kurtosis: 2.8,
      standardDeviation: 12.4,
      recoveryFactor: 3.2,
      payoffRatio: 1.89,
      tailRatio: 1.67,
      commissionPct: 0.05,
      slippagePct: 0.03,
    },
    equityCurve: generateGrowingEquityCurve(100, 123.4, 2, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(18.7),
    rollingSharpe: generateRollingSharpe(1.62, 120),
    lastUpdated: '2026-01-15',
    limitations: ['Requires liquid instruments', 'Not suitable for trending markets', 'Minimum 4H daily screen time recommended'],
    signalLogic: 'Entry triggered when price rejects VAH/VAL with volume delta confirmation and regime filter showing balance.',
    regulatoryInfo: {
      resultType: 'paper',
      testStartDate: '2025-05-01',
      testEndDate: '2026-01-15',
      lastUpdated: '2026-01-15',
      commission: 0.05,
      slippage: 0.03,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 2,
      limitations: ['Paper trading results may differ from live execution', 'Past performance does not guarantee future results'],
      disclaimer: 'Results shown are from paper trading and do not represent actual trading results. Live trading involves additional risks including execution risk, liquidity risk, and market impact.',
    },
  },
  {
    id: 'algo-002',
    slug: 'trend-continuation-momentum',
    name: 'Trend Continuation',
    description: 'Captures trend continuation after healthy pullbacks in trending regimes. Uses market structure analysis.',
    fullDescription: 'Designed for trending market conditions, this algorithm identifies pullbacks that maintain market structure and enters on confirmation of trend continuation.',
    strategyClass: 'Trend Following',
    markets: ['Futures', 'Crypto', 'Equities'],
    timeframes: ['1H', '4H', '1D'],
    riskProfile: 'moderate',
    status: 'paper',
    pricing: { monthly: 199, annual: 1990 },
    metrics: {
      totalReturn: 34.7,
      cagr: 28.1,
      netProfit: 34700,
      avgMonthlyReturn: 2.6,
      avgAnnualReturn: 31.2,
      profitableMonthsPct: 72,
      returnAfterCosts: 32.8,
      maxDrawdown: 12.1,
      maxDrawdownAmount: 2420,
      currentDrawdown: 3.8,
      avgDrawdown: 5.2,
      medianDrawdown: 4.1,
      maxDrawdownDuration: 34,
      recoveryTime: 28,
      volatility: 15.2,
      var95: 2.4,
      cvar95: 3.2,
      worstDay: -3.2,
      worstWeek: -6.8,
      worstMonth: -10.4,
      maxConsecutiveLosses: 6,
      riskOfRuin: 0.01,
      sharpeRatio: 1.89,
      sortinoRatio: 2.45,
      calmarRatio: 2.87,
      sterlingRatio: 2.28,
      marRatio: 2.87,
      returnToMaxDD: 2.87,
      returnToAvgDD: 6.67,
      totalTrades: 87,
      winRate: 52.9,
      avgWin: 2.8,
      avgLoss: 1.3,
      profitFactor: 2.14,
      expectancy: 0.40,
      avgWinLossRatio: 2.15,
      avgRMultiple: 1.8,
      avgTradeDuration: '2.3 days',
      tradesPerDay: 0.3,
      tradesPerMonth: 10.9,
      costPerTrade: 18.5,
      inSampleReturn: 42.1,
      outOfSampleReturn: 27.4,
      walkForwardReturn: 24.8,
      monteCarloP50: 31.2,
      monteCarloP5: 18.4,
      parameterSensitivity: 0.22,
      top10TradesContribution: 35,
      independentObservations: 87,
      overfittingRisk: 'low',
      trendPerformance: 28.4,
      flatPerformance: -4.2,
      highVolPerformance: 12.8,
      longWinRate: 54.8,
      shortWinRate: 51.0,
      avgExposure: 68,
      avgTimeInPosition: '2.3 days',
      bestSession: 'Trending markets',
      recommendedCapital: 50000,
      maxPositionSize: 10,
      leverage: 3,
      marginRequirement: 15000,
      returnOnCapital: 69.4,
      returnOnMargin: 231.3,
      turnover: 1.8,
      slippageImpact: 0.5,
      strategyCapacity: '$2M',
      systemUptime: 99.9,
      executionErrors: 0.1,
      signalDelay: 52,
      missedTrades: 0,
      modelVsActualSlippage: 0.22,
      brokerStability: 99.8,
      returnPct: 34.7,
      observationPeriod: '10 months',
      avgRR: 3.2,
      largestWin: 6.8,
      largestLoss: -2.4,
      consecutiveWins: 5,
      skewness: 0.68,
      kurtosis: 3.1,
      standardDeviation: 15.2,
      recoveryFactor: 2.9,
      payoffRatio: 2.15,
      tailRatio: 2.31,
      commissionPct: 0.04,
      slippagePct: 0.05,
    },
    equityCurve: generateGrowingEquityCurve(100, 134.7, 3, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(28.1),
    rollingSharpe: generateRollingSharpe(1.89, 120),
    lastUpdated: '2026-01-12',
    limitations: ['Requires trending conditions', 'May underperform in choppy markets', 'Patience needed for setups'],
    signalLogic: 'Entry on pullback to key level with structure preservation, confirmed by volume and momentum indicators.',
    regulatoryInfo: {
      resultType: 'paper',
      testStartDate: '2025-03-01',
      testEndDate: '2026-01-12',
      lastUpdated: '2026-01-12',
      commission: 0.04,
      slippage: 0.05,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 3,
      limitations: ['Paper trading results may differ from live execution', 'Past performance does not guarantee future results'],
      disclaimer: 'Results shown are from paper trading and do not represent actual trading results.',
    },
  },
  {
    id: 'algo-003',
    slug: 'breakout-value-shift',
    name: 'Breakout Value Shift',
    description: 'Detects acceptance of price beyond Value Area with retest confirmation. Trades directional imbalances.',
    fullDescription: 'This strategy identifies when price breaks out of the value area and is accepted at new levels.',
    strategyClass: 'Breakout',
    markets: ['Futures', 'Crypto'],
    timeframes: ['15m', '1H', '4H'],
    riskProfile: 'aggressive',
    status: 'backtest',
    pricing: { license: 2499 },
    metrics: {
      totalReturn: 41.2,
      cagr: 34.8,
      netProfit: 41200,
      avgMonthlyReturn: 2.9,
      avgAnnualReturn: 34.8,
      profitableMonthsPct: 65,
      returnAfterCosts: 38.4,
      maxDrawdown: 15.8,
      maxDrawdownAmount: 3160,
      currentDrawdown: 5.2,
      avgDrawdown: 7.4,
      medianDrawdown: 5.8,
      maxDrawdownDuration: 42,
      recoveryTime: 38,
      volatility: 18.7,
      var95: 3.1,
      cvar95: 4.2,
      worstDay: -4.8,
      worstWeek: -9.2,
      worstMonth: -14.1,
      maxConsecutiveLosses: 8,
      riskOfRuin: 0.03,
      sharpeRatio: 1.45,
      sortinoRatio: 1.92,
      calmarRatio: 2.61,
      sterlingRatio: 1.98,
      marRatio: 2.61,
      returnToMaxDD: 2.61,
      returnToAvgDD: 5.57,
      totalTrades: 63,
      winRate: 47.6,
      avgWin: 3.5,
      avgLoss: 1.45,
      profitFactor: 2.41,
      expectancy: 0.65,
      avgWinLossRatio: 2.41,
      avgRMultiple: 2.2,
      avgTradeDuration: '6.8 hours',
      tradesPerDay: 0.2,
      tradesPerMonth: 7.9,
      costPerTrade: 24.5,
      inSampleReturn: 52.4,
      outOfSampleReturn: 30.1,
      walkForwardReturn: 26.8,
      monteCarloP50: 36.4,
      monteCarloP5: 18.2,
      parameterSensitivity: 0.35,
      top10TradesContribution: 42,
      independentObservations: 63,
      overfittingRisk: 'medium',
      trendPerformance: 32.8,
      flatPerformance: -8.4,
      highVolPerformance: 18.2,
      longWinRate: 49.2,
      shortWinRate: 46.0,
      avgExposure: 52,
      avgTimeInPosition: '6.8 hours',
      bestSession: 'Breakout conditions',
      recommendedCapital: 75000,
      maxPositionSize: 15,
      leverage: 4,
      marginRequirement: 25000,
      returnOnCapital: 54.9,
      returnOnMargin: 164.8,
      turnover: 2.4,
      slippageImpact: 0.8,
      strategyCapacity: '$1M',
      systemUptime: 99.7,
      executionErrors: 0.3,
      signalDelay: 38,
      missedTrades: 2,
      modelVsActualSlippage: 0.35,
      brokerStability: 99.2,
      returnPct: 41.2,
      observationPeriod: '12 months (backtest)',
      avgRR: 3.8,
      largestWin: 8.2,
      largestLoss: -3.1,
      consecutiveWins: 4,
      skewness: 0.95,
      kurtosis: 3.8,
      standardDeviation: 18.7,
      recoveryFactor: 2.4,
      payoffRatio: 2.41,
      tailRatio: 2.65,
      commissionPct: 0.06,
      slippagePct: 0.08,
    },
    equityCurve: generateGrowingEquityCurve(100, 141.2, 4, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(34.8),
    rollingSharpe: generateRollingSharpe(1.45, 120),
    lastUpdated: '2025-12-20',
    limitations: ['Backtest only — not yet validated in live markets', 'Higher drawdown expected', 'Requires fast execution'],
    signalLogic: 'Entry on retest of broken VAH/VAL after confirmed value area shift with volume expansion.',
    regulatoryInfo: {
      resultType: 'backtest',
      testStartDate: '2024-12-01',
      testEndDate: '2025-12-20',
      lastUpdated: '2025-12-20',
      commission: 0.06,
      slippage: 0.08,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 4,
      limitations: ['Backtest results are hypothetical and do not represent actual trading', 'Past performance does not guarantee future results', 'Backtest may suffer from look-ahead bias and overfitting'],
      disclaimer: 'Results shown are from historical backtesting and are hypothetical. They do not represent actual trading results and may not be achieved in live trading.',
    },
  },
  {
    id: 'algo-004',
    slug: 'scalping-delta-divergence',
    name: 'Delta Divergence Scalp',
    description: 'Short-term scalping based on CVD divergences at key volume levels.',
    fullDescription: 'A high-frequency scalping strategy that identifies divergences between cumulative volume delta (CVD) and price action.',
    strategyClass: 'Scalping',
    markets: ['Futures', 'Crypto'],
    timeframes: ['1m', '5m', '15m'],
    riskProfile: 'aggressive',
    status: 'backtest',
    pricing: { monthly: 299, annual: 2990 },
    metrics: {
      totalReturn: 18.9,
      cagr: 15.2,
      netProfit: 18900,
      avgMonthlyReturn: 1.4,
      avgAnnualReturn: 16.8,
      profitableMonthsPct: 75,
      returnAfterCosts: 16.2,
      maxDrawdown: 6.4,
      maxDrawdownAmount: 1280,
      currentDrawdown: 1.8,
      avgDrawdown: 2.6,
      medianDrawdown: 2.1,
      maxDrawdownDuration: 12,
      recoveryTime: 8,
      volatility: 8.9,
      var95: 1.2,
      cvar95: 1.6,
      worstDay: -1.8,
      worstWeek: -3.4,
      worstMonth: -5.2,
      maxConsecutiveLosses: 9,
      riskOfRuin: 0.005,
      sharpeRatio: 2.1,
      sortinoRatio: 2.78,
      calmarRatio: 2.95,
      sterlingRatio: 2.34,
      marRatio: 2.95,
      returnToMaxDD: 2.95,
      returnToAvgDD: 7.27,
      totalTrades: 534,
      winRate: 58.2,
      avgWin: 0.6,
      avgLoss: 0.42,
      profitFactor: 1.52,
      expectancy: 0.035,
      avgWinLossRatio: 1.43,
      avgRMultiple: 0.8,
      avgTradeDuration: '12 minutes',
      tradesPerDay: 2.9,
      tradesPerMonth: 89,
      costPerTrade: 8.5,
      inSampleReturn: 24.8,
      outOfSampleReturn: 13.4,
      walkForwardReturn: 11.8,
      monteCarloP50: 16.2,
      monteCarloP5: 8.4,
      parameterSensitivity: 0.28,
      top10TradesContribution: 18,
      independentObservations: 534,
      overfittingRisk: 'low',
      trendPerformance: 8.4,
      flatPerformance: 12.8,
      highVolPerformance: 15.2,
      longWinRate: 59.8,
      shortWinRate: 56.6,
      avgExposure: 35,
      avgTimeInPosition: '12 minutes',
      bestSession: 'US Open',
      recommendedCapital: 50000,
      maxPositionSize: 20,
      leverage: 5,
      marginRequirement: 10000,
      returnOnCapital: 37.8,
      returnOnMargin: 189,
      turnover: 8.5,
      slippageImpact: 1.2,
      strategyCapacity: '$300k',
      systemUptime: 99.95,
      executionErrors: 0.05,
      signalDelay: 12,
      missedTrades: 3,
      modelVsActualSlippage: 0.45,
      brokerStability: 99.9,
      returnPct: 18.9,
      observationPeriod: '6 months (backtest)',
      avgRR: 1.4,
      largestWin: 1.4,
      largestLoss: -0.85,
      consecutiveWins: 12,
      skewness: 0.28,
      kurtosis: 2.4,
      standardDeviation: 8.9,
      recoveryFactor: 3.8,
      payoffRatio: 1.43,
      tailRatio: 1.24,
      commissionPct: 0.12,
      slippagePct: 0.05,
    },
    equityCurve: generateGrowingEquityCurve(100, 118.9, 1.5, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(15.2),
    rollingSharpe: generateRollingSharpe(2.1, 120),
    lastUpdated: '2025-12-01',
    limitations: ['Backtest only', 'Requires low-latency execution', 'High commission sensitivity', 'Not for beginners'],
    signalLogic: 'Entry on CVD divergence at POC/VAH/VAL with immediate price rejection confirmation.',
    regulatoryInfo: {
      resultType: 'backtest',
      testStartDate: '2025-06-01',
      testEndDate: '2025-12-01',
      lastUpdated: '2025-12-01',
      commission: 0.12,
      slippage: 0.05,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 5,
      limitations: ['Backtest results are hypothetical', 'High-frequency strategies are sensitive to execution quality', 'Past performance does not guarantee future results'],
      disclaimer: 'Results shown are from historical backtesting and are hypothetical.',
    },
  },
  {
    id: 'algo-005',
    slug: 'statistical-arbitrage-pairs',
    name: 'Statistical Arbitrage',
    description: 'Pairs trading strategy exploiting mean reversion between correlated assets.',
    fullDescription: 'This market-neutral strategy identifies pairs of highly correlated assets that temporarily diverge.',
    strategyClass: 'Statistical Arbitrage',
    markets: ['Equities', 'Crypto'],
    timeframes: ['1H', '4H', '1D'],
    riskProfile: 'conservative',
    status: 'paper',
    pricing: { monthly: 199, annual: 1990 },
    metrics: {
      totalReturn: 15.8,
      cagr: 12.8,
      netProfit: 15800,
      avgMonthlyReturn: 1.2,
      avgAnnualReturn: 14.4,
      profitableMonthsPct: 78,
      returnAfterCosts: 14.2,
      maxDrawdown: 4.2,
      maxDrawdownAmount: 840,
      currentDrawdown: 1.2,
      avgDrawdown: 1.8,
      medianDrawdown: 1.4,
      maxDrawdownDuration: 15,
      recoveryTime: 10,
      volatility: 7.2,
      var95: 0.9,
      cvar95: 1.2,
      worstDay: -1.2,
      worstWeek: -2.4,
      worstMonth: -3.8,
      maxConsecutiveLosses: 4,
      riskOfRuin: 0.008,
      sharpeRatio: 2.34,
      sortinoRatio: 3.12,
      calmarRatio: 3.76,
      sterlingRatio: 2.98,
      marRatio: 3.76,
      returnToMaxDD: 3.76,
      returnToAvgDD: 8.78,
      totalTrades: 287,
      winRate: 64.1,
      avgWin: 1.2,
      avgLoss: 0.65,
      profitFactor: 1.95,
      expectancy: 0.055,
      avgWinLossRatio: 1.85,
      avgRMultiple: 1.4,
      avgTradeDuration: '1.8 days',
      tradesPerDay: 1.2,
      tradesPerMonth: 35.9,
      costPerTrade: 15.5,
      inSampleReturn: 19.4,
      outOfSampleReturn: 12.2,
      walkForwardReturn: 10.8,
      monteCarloP50: 13.8,
      monteCarloP5: 7.2,
      parameterSensitivity: 0.18,
      top10TradesContribution: 22,
      independentObservations: 287,
      overfittingRisk: 'low',
      trendPerformance: 8.2,
      flatPerformance: 14.8,
      highVolPerformance: 6.4,
      longWinRate: 65.8,
      shortWinRate: 62.4,
      avgExposure: 85,
      avgTimeInPosition: '1.8 days',
      bestSession: 'Mean reversion conditions',
      recommendedCapital: 100000,
      maxPositionSize: 25,
      leverage: 2,
      marginRequirement: 50000,
      returnOnCapital: 15.8,
      returnOnMargin: 31.6,
      turnover: 3.2,
      slippageImpact: 0.4,
      strategyCapacity: '$5M',
      systemUptime: 99.9,
      executionErrors: 0.1,
      signalDelay: 65,
      missedTrades: 1,
      modelVsActualSlippage: 0.18,
      brokerStability: 99.7,
      returnPct: 15.8,
      observationPeriod: '14 months',
      avgRR: 1.8,
      largestWin: 2.8,
      largestLoss: -1.2,
      consecutiveWins: 9,
      skewness: 0.35,
      kurtosis: 2.6,
      standardDeviation: 7.2,
      recoveryFactor: 4.5,
      payoffRatio: 1.85,
      tailRatio: 1.72,
      commissionPct: 0.08,
      slippagePct: 0.04,
    },
    equityCurve: generateGrowingEquityCurve(100, 115.8, 1.2, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(12.8),
    rollingSharpe: generateRollingSharpe(2.34, 120),
    lastUpdated: '2026-01-18',
    limitations: ['Requires simultaneous execution on both legs', 'Correlation breakdown risk', 'Lower absolute returns'],
    signalLogic: 'Entry when z-score of spread exceeds 2 standard deviations with correlation > 0.85.',
    regulatoryInfo: {
      resultType: 'paper',
      testStartDate: '2024-11-01',
      testEndDate: '2026-01-18',
      lastUpdated: '2026-01-18',
      commission: 0.08,
      slippage: 0.04,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 2,
      limitations: ['Paper trading results may differ from live execution', 'Market-neutral strategies require careful risk management'],
      disclaimer: 'Results shown are from paper trading and do not represent actual trading results.',
    },
  },
];

// Generate remaining algorithms (6-10) with similar structure
const remainingAlgos = [
  {
    id: 'algo-006',
    slug: 'volatility-breakout',
    name: 'Volatility Breakout',
    description: 'Captures explosive moves after volatility compression.',
    strategyClass: 'Volatility',
    markets: ['Futures', 'Crypto', 'Forex'],
    timeframes: ['15m', '1H', '4H'],
    riskProfile: 'moderate',
    status: 'paper',
    pricing: { monthly: 179, annual: 1790 },
    totalReturn: 28.3,
    cagr: 22.8,
    sharpeRatio: 1.78,
    maxDrawdown: 9.8,
    winRate: 51.9,
    profitFactor: 2.08,
    totalTrades: 156,
  },
  {
    id: 'algo-007',
    slug: 'market-making-grid',
    name: 'Grid Market Making',
    description: 'Automated market making with dynamic grid spacing.',
    strategyClass: 'Market Making',
    markets: ['Crypto'],
    timeframes: ['1m', '5m', '15m'],
    riskProfile: 'conservative',
    status: 'backtest',
    pricing: { license: 1999 },
    totalReturn: 22.1,
    cagr: 17.8,
    sharpeRatio: 2.67,
    maxDrawdown: 5.6,
    winRate: 72.3,
    profitFactor: 1.68,
    totalTrades: 1847,
  },
  {
    id: 'algo-008',
    slug: 'momentum-trend-following',
    name: 'Momentum Trend',
    description: 'Classic trend following using moving average crossovers.',
    strategyClass: 'Trend Following',
    markets: ['Futures', 'Crypto', 'Forex', 'Equities'],
    timeframes: ['4H', '1D'],
    riskProfile: 'moderate',
    status: 'live',
    pricing: { monthly: 249, annual: 2490 },
    totalReturn: 38.7,
    cagr: 31.2,
    sharpeRatio: 1.62,
    maxDrawdown: 14.2,
    winRate: 48.9,
    profitFactor: 2.31,
    totalTrades: 94,
  },
  {
    id: 'algo-009',
    slug: 'mean-reversion-rsi',
    name: 'RSI Mean Reversion',
    description: 'Counter-trend strategy using RSI extremes.',
    strategyClass: 'Mean Reversion',
    markets: ['Forex', 'Equities'],
    timeframes: ['15m', '1H', '4H'],
    riskProfile: 'moderate',
    status: 'paper',
    pricing: { monthly: 129, annual: 1290 },
    totalReturn: 19.4,
    cagr: 15.6,
    sharpeRatio: 1.89,
    maxDrawdown: 7.3,
    winRate: 68.7,
    profitFactor: 1.72,
    totalTrades: 312,
  },
  {
    id: 'algo-010',
    slug: 'carry-trade-forex',
    name: 'Carry Trade FX',
    description: 'Long-term forex strategy exploiting interest rate differentials.',
    strategyClass: 'Carry Trade',
    markets: ['Forex'],
    timeframes: ['1D', '1W'],
    riskProfile: 'conservative',
    status: 'live',
    pricing: { monthly: 179, annual: 1790 },
    totalReturn: 12.8,
    cagr: 10.2,
    sharpeRatio: 1.45,
    maxDrawdown: 6.1,
    winRate: 72.3,
    profitFactor: 1.89,
    totalTrades: 47,
  },
];

// Add remaining algorithms with full metrics
remainingAlgos.forEach((base, idx) => {
  const algoNum = idx + 6;
  algorithms.push({
    id: base.id,
    slug: base.slug,
    name: base.name,
    description: base.description,
    fullDescription: base.description,
    strategyClass: base.strategyClass,
    markets: base.markets,
    timeframes: base.timeframes,
    riskProfile: base.riskProfile as 'conservative' | 'moderate' | 'aggressive',
    status: base.status as 'backtest' | 'paper' | 'live',
    pricing: base.pricing,
    metrics: {
      totalReturn: base.totalReturn,
      cagr: base.cagr,
      netProfit: base.totalReturn * 1000,
      avgMonthlyReturn: base.totalReturn / 12,
      avgAnnualReturn: base.cagr,
      profitableMonthsPct: 60 + Math.random() * 20,
      returnAfterCosts: base.totalReturn * 0.92,
      maxDrawdown: base.maxDrawdown,
      maxDrawdownAmount: base.maxDrawdown * 200,
      currentDrawdown: base.maxDrawdown * 0.3,
      avgDrawdown: base.maxDrawdown * 0.5,
      medianDrawdown: base.maxDrawdown * 0.4,
      maxDrawdownDuration: Math.floor(20 + Math.random() * 30),
      recoveryTime: Math.floor(15 + Math.random() * 25),
      volatility: 10 + Math.random() * 10,
      var95: 1 + Math.random() * 2,
      cvar95: 1.5 + Math.random() * 2.5,
      worstDay: -(1 + Math.random() * 3),
      worstWeek: -(3 + Math.random() * 5),
      worstMonth: -(5 + Math.random() * 8),
      maxConsecutiveLosses: Math.floor(3 + Math.random() * 6),
      riskOfRuin: 0.01 + Math.random() * 0.02,
      sharpeRatio: base.sharpeRatio,
      sortinoRatio: base.sharpeRatio * 1.3,
      calmarRatio: base.totalReturn / base.maxDrawdown,
      sterlingRatio: (base.totalReturn / base.maxDrawdown) * 0.8,
      marRatio: base.totalReturn / base.maxDrawdown,
      returnToMaxDD: base.totalReturn / base.maxDrawdown,
      returnToAvgDD: base.totalReturn / (base.maxDrawdown * 0.5),
      totalTrades: base.totalTrades,
      winRate: base.winRate,
      avgWin: 1 + Math.random() * 2,
      avgLoss: 0.5 + Math.random(),
      profitFactor: base.profitFactor,
      expectancy: 0.1 + Math.random() * 0.5,
      avgWinLossRatio: base.profitFactor * 0.9,
      avgRMultiple: 1 + Math.random(),
      avgTradeDuration: `${Math.floor(1 + Math.random() * 10)} hours`,
      tradesPerDay: base.totalTrades / 365,
      tradesPerMonth: base.totalTrades / 12,
      costPerTrade: 10 + Math.random() * 20,
      inSampleReturn: base.totalReturn * 1.2,
      outOfSampleReturn: base.totalReturn * 0.7,
      walkForwardReturn: base.totalReturn * 0.65,
      monteCarloP50: base.totalReturn * 0.9,
      monteCarloP5: base.totalReturn * 0.5,
      parameterSensitivity: 0.1 + Math.random() * 0.3,
      top10TradesContribution: 20 + Math.random() * 25,
      independentObservations: base.totalTrades,
      overfittingRisk: base.status === 'backtest' ? 'medium' : 'low',
      trendPerformance: -5 + Math.random() * 30,
      flatPerformance: -5 + Math.random() * 20,
      highVolPerformance: Math.random() * 15,
      longWinRate: base.winRate + (Math.random() - 0.5) * 5,
      shortWinRate: base.winRate + (Math.random() - 0.5) * 5,
      avgExposure: 40 + Math.random() * 40,
      avgTimeInPosition: `${Math.floor(1 + Math.random() * 5)} days`,
      bestSession: 'Various',
      recommendedCapital: 25000 + Math.random() * 75000,
      maxPositionSize: Math.floor(5 + Math.random() * 20),
      leverage: Math.floor(2 + Math.random() * 4),
      marginRequirement: 10000 + Math.random() * 40000,
      returnOnCapital: base.totalReturn * 3,
      returnOnMargin: base.totalReturn * 10,
      turnover: 1 + Math.random() * 5,
      slippageImpact: 0.2 + Math.random() * 0.8,
      strategyCapacity: '$1M',
      systemUptime: 99 + Math.random() * 0.9,
      executionErrors: Math.random() * 0.5,
      signalDelay: Math.floor(20 + Math.random() * 60),
      missedTrades: Math.floor(Math.random() * 3),
      modelVsActualSlippage: 0.1 + Math.random() * 0.4,
      brokerStability: 99 + Math.random() * 0.9,
      returnPct: base.totalReturn,
      observationPeriod: '12 months',
      avgRR: 2 + Math.random() * 2,
      largestWin: 3 + Math.random() * 5,
      largestLoss: -(1 + Math.random() * 2),
      consecutiveWins: Math.floor(3 + Math.random() * 8),
      skewness: Math.random(),
      kurtosis: 2 + Math.random() * 2,
      standardDeviation: 10 + Math.random() * 10,
      recoveryFactor: base.totalReturn / base.maxDrawdown,
      payoffRatio: base.profitFactor,
      tailRatio: 1.5 + Math.random(),
      commissionPct: 0.03 + Math.random() * 0.1,
      slippagePct: 0.02 + Math.random() * 0.08,
    },
    equityCurve: generateGrowingEquityCurve(100, 100 + base.totalReturn, 2, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(base.cagr),
    rollingSharpe: generateRollingSharpe(base.sharpeRatio, 120),
    lastUpdated: '2026-01-15',
    limitations: ['Strategy-specific limitations apply'],
    signalLogic: 'Strategy-specific entry logic',
    regulatoryInfo: {
      resultType: base.status as 'backtest' | 'paper' | 'live',
      testStartDate: '2025-01-01',
      testEndDate: '2026-01-15',
      lastUpdated: '2026-01-15',
      commission: 0.05,
      slippage: 0.05,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 2,
      limitations: ['Results may vary in live trading'],
      disclaimer: 'Past performance does not guarantee future results.',
    },
  });
});

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
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter',
    price: 49,
    period: 'monthly',
    features: ['1 algorithm access', 'Daily signal delivery', 'Basic analytics'],
    algorithms: ['algo-001'],
  },
  {
    id: 'plan-pro',
    name: 'Professional',
    price: 149,
    period: 'monthly',
    features: ['3 algorithm access', 'Real-time signals', 'Advanced analytics', 'API access'],
    algorithms: ['algo-001', 'algo-002', 'algo-003'],
    highlighted: true,
  },
  {
    id: 'plan-institutional',
    name: 'Institutional',
    price: 399,
    period: 'monthly',
    features: ['All algorithms', 'Full API access', 'Dedicated support'],
    algorithms: algorithms.map(a => a.id),
  },
];

export const bots: Bot[] = [
  {
    id: 'bot-001',
    name: 'VP AutoTrader',
    version: '2.1.0',
    description: 'Automated execution of VP Mean Reversion signals.',
    category: 'Mean Reversion',
    exchanges: ['Binance Futures', 'Bybit'],
    instruments: ['Crypto Perpetuals', 'ES'],
    timeframes: ['15m', '1H'],
    minCapital: 5000,
    maxDrawdown: 8.2,
    returnPct: 23.4,
    price: 99,
    licenseType: 'subscription',
    status: 'demo',
  },
];

export const faqItems = [
  {
    question: 'Are these real trading results?',
    answer: 'Our platform clearly distinguishes between backtest, paper trading, and live trading results.',
  },
  {
    question: 'How are signals delivered?',
    answer: 'Signals are delivered via email, Telegram, and API with WebSocket support.',
  },
];
