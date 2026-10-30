// Типы данных
export interface Algorithm {
  id: string;
  name: string;
  description: string;
  strategyClass: string;
  markets: string[];
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  status: 'backtest' | 'paper' | 'live';
  pricing: { monthly: number; annual?: number } | { license: number };
  metrics: AlgorithmMetrics;
  equityCurve: number[];
  drawdownCurve: number[];
  monthlyReturns: number[][];
  rollingSharpe: number[];
  lastUpdated: string;
  regulatoryInfo: RegulatoryInfo;
}

export interface AlgorithmMetrics {
  // 1. Return
  totalReturn: number;
  cagr: number;
  netProfit: number;
  avgMonthlyReturn: number;
  profitableMonthsPct: number;
  returnAfterCosts: number;

  // 2. Risk
  maxDrawdown: number;
  currentDrawdown: number;
  avgDrawdown: number;
  maxDrawdownDuration: number;
  recoveryTime: number;
  volatility: number;
  var95: number;
  cvar95: number;
  worstDay: number;
  worstWeek: number;
  worstMonth: number;
  maxConsecutiveLosses: number;
  riskOfRuin: number;

  // 3. Risk-adjusted
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  sterlingRatio: number;
  marRatio: number;

  // 4. Trade Statistics
  totalTrades: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  expectancy: number;
  avgRMultiple: number;
  avgTradeDuration: string;
  tradesPerDay: number;
  costPerTrade: number;

  // 5. Robustness
  inSampleReturn: number;
  outOfSampleReturn: number;
  walkForwardReturn: number;
  monteCarloP50: number;
  monteCarloP5: number;
  parameterSensitivity: number;
  top10TradesContribution: number;
  overfittingRisk: 'low' | 'medium' | 'high';

  // 6. Market Behavior
  trendPerformance: number;
  flatPerformance: number;
  highVolPerformance: number;
  longWinRate: number;
  shortWinRate: number;
  avgExposure: number;
  avgTimeInPosition: string;

  // 7. Capital Efficiency
  recommendedCapital: number;
  maxPositionSize: number;
  leverage: number;
  marginRequirement: number;
  returnOnCapital: number;
  strategyCapacity: string;

  // 8. Operational
  systemUptime: number;
  executionErrors: number;
  signalDelay: number;
  missedTrades: number;
  brokerStability: number;
}

export interface RegulatoryInfo {
  resultType: 'backtest' | 'paper' | 'live';
  testStartDate: string;
  testEndDate: string;
  commission: number;
  slippage: number;
  initialCapital: number;
  calculationMethod: string;
  leverageAssumption: number;
  disclaimer: string;
}

// Генерация данных
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

function generateDrawdownCurve(equityCurve: number[], maxDD: number): number[] {
  return equityCurve.map((value, i) => {
    const peak = Math.max(...equityCurve.slice(0, i + 1));
    const dd = ((value - peak) / peak) * 100;
    return Math.max(dd, -maxDD * (0.5 + Math.random() * 0.5));
  });
}

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

function generateRollingSharpe(baseSharpe: number, points: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < points; i++) {
    const variation = (Math.random() - 0.5) * 0.8;
    data.push(Math.max(0, baseSharpe + variation));
  }
  return data;
}

// Примеры алгоритмов
export const algorithms: Algorithm[] = [
  {
    id: 'algo-001',
    name: 'VP Mean Reversion',
    description: 'Identifies value area extremes with volume profile confirmation',
    strategyClass: 'Mean Reversion',
    markets: ['Futures', 'Crypto'],
    riskProfile: 'moderate',
    status: 'paper',
    pricing: { monthly: 149, annual: 1490 },
    metrics: {
      totalReturn: 23.4,
      cagr: 18.7,
      netProfit: 23400,
      avgMonthlyReturn: 1.8,
      profitableMonthsPct: 68,
      returnAfterCosts: 21.8,
      maxDrawdown: 8.2,
      currentDrawdown: 2.1,
      avgDrawdown: 3.4,
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
      sharpeRatio: 1.62,
      sortinoRatio: 2.14,
      calmarRatio: 2.85,
      sterlingRatio: 2.12,
      marRatio: 2.85,
      totalTrades: 142,
      winRate: 61.3,
      avgWin: 1.8,
      avgLoss: 0.95,
      profitFactor: 1.87,
      expectancy: 0.16,
      avgRMultiple: 1.2,
      avgTradeDuration: '4.2 hours',
      tradesPerDay: 0.6,
      costPerTrade: 12.5,
      inSampleReturn: 28.4,
      outOfSampleReturn: 18.4,
      walkForwardReturn: 16.8,
      monteCarloP50: 21.2,
      monteCarloP5: 12.4,
      parameterSensitivity: 0.15,
      top10TradesContribution: 28,
      overfittingRisk: 'low',
      trendPerformance: -2.4,
      flatPerformance: 18.7,
      highVolPerformance: 8.2,
      longWinRate: 63.2,
      shortWinRate: 59.4,
      avgExposure: 45,
      avgTimeInPosition: '4.2 hours',
      recommendedCapital: 25000,
      maxPositionSize: 5,
      leverage: 2,
      marginRequirement: 5000,
      returnOnCapital: 93.6,
      strategyCapacity: '$500k',
      systemUptime: 99.8,
      executionErrors: 0.2,
      signalDelay: 45,
      missedTrades: 1,
      brokerStability: 99.5,
    },
    equityCurve: generateGrowingEquityCurve(100, 123.4, 2, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(18.7),
    rollingSharpe: generateRollingSharpe(1.62, 120),
    lastUpdated: '2026-01-15',
    regulatoryInfo: {
      resultType: 'paper',
      testStartDate: '2025-05-01',
      testEndDate: '2026-01-15',
      commission: 0.05,
      slippage: 0.03,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 2,
      disclaimer: 'Paper trading results may differ from live execution',
    },
  },
  {
    id: 'algo-002',
    name: 'Trend Continuation',
    description: 'Captures trend continuation after healthy pullbacks',
    strategyClass: 'Trend Following',
    markets: ['Futures', 'Crypto'],
    riskProfile: 'moderate',
    status: 'paper',
    pricing: { monthly: 199, annual: 1990 },
    metrics: {
      totalReturn: 34.7,
      cagr: 28.1,
      netProfit: 34700,
      avgMonthlyReturn: 2.6,
      profitableMonthsPct: 72,
      returnAfterCosts: 32.8,
      maxDrawdown: 12.1,
      currentDrawdown: 3.8,
      avgDrawdown: 5.2,
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
      totalTrades: 87,
      winRate: 52.9,
      avgWin: 2.8,
      avgLoss: 1.3,
      profitFactor: 2.14,
      expectancy: 0.40,
      avgRMultiple: 1.8,
      avgTradeDuration: '2.3 days',
      tradesPerDay: 0.3,
      costPerTrade: 18.5,
      inSampleReturn: 42.1,
      outOfSampleReturn: 27.4,
      walkForwardReturn: 24.8,
      monteCarloP50: 31.2,
      monteCarloP5: 18.4,
      parameterSensitivity: 0.22,
      top10TradesContribution: 35,
      overfittingRisk: 'low',
      trendPerformance: 28.4,
      flatPerformance: -4.2,
      highVolPerformance: 12.8,
      longWinRate: 54.8,
      shortWinRate: 51.0,
      avgExposure: 68,
      avgTimeInPosition: '2.3 days',
      recommendedCapital: 50000,
      maxPositionSize: 10,
      leverage: 3,
      marginRequirement: 15000,
      returnOnCapital: 69.4,
      strategyCapacity: '$2M',
      systemUptime: 99.9,
      executionErrors: 0.1,
      signalDelay: 52,
      missedTrades: 0,
      brokerStability: 99.8,
    },
    equityCurve: generateGrowingEquityCurve(100, 134.7, 3, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(28.1),
    rollingSharpe: generateRollingSharpe(1.89, 120),
    lastUpdated: '2026-01-12',
    regulatoryInfo: {
      resultType: 'paper',
      testStartDate: '2025-03-01',
      testEndDate: '2026-01-12',
      commission: 0.04,
      slippage: 0.05,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 3,
      disclaimer: 'Paper trading results may differ from live execution',
    },
  },
  {
    id: 'algo-003',
    name: 'Breakout Value Shift',
    description: 'Detects acceptance of price beyond Value Area with retest confirmation',
    strategyClass: 'Breakout',
    markets: ['Futures', 'Crypto'],
    riskProfile: 'aggressive',
    status: 'backtest',
    pricing: { license: 2499 },
    metrics: {
      totalReturn: 41.2,
      cagr: 34.8,
      netProfit: 41200,
      avgMonthlyReturn: 2.9,
      profitableMonthsPct: 65,
      returnAfterCosts: 38.4,
      maxDrawdown: 15.8,
      currentDrawdown: 5.2,
      avgDrawdown: 7.4,
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
      totalTrades: 63,
      winRate: 47.6,
      avgWin: 3.5,
      avgLoss: 1.45,
      profitFactor: 2.41,
      expectancy: 0.65,
      avgRMultiple: 2.2,
      avgTradeDuration: '6.8 hours',
      tradesPerDay: 0.2,
      costPerTrade: 24.5,
      inSampleReturn: 52.4,
      outOfSampleReturn: 30.1,
      walkForwardReturn: 26.8,
      monteCarloP50: 36.4,
      monteCarloP5: 18.2,
      parameterSensitivity: 0.35,
      top10TradesContribution: 42,
      overfittingRisk: 'medium',
      trendPerformance: 32.8,
      flatPerformance: -8.4,
      highVolPerformance: 18.2,
      longWinRate: 49.2,
      shortWinRate: 46.0,
      avgExposure: 52,
      avgTimeInPosition: '6.8 hours',
      recommendedCapital: 75000,
      maxPositionSize: 15,
      leverage: 4,
      marginRequirement: 25000,
      returnOnCapital: 54.9,
      strategyCapacity: '$1M',
      systemUptime: 99.7,
      executionErrors: 0.3,
      signalDelay: 38,
      missedTrades: 2,
      brokerStability: 99.2,
    },
    equityCurve: generateGrowingEquityCurve(100, 141.2, 4, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(34.8),
    rollingSharpe: generateRollingSharpe(1.45, 120),
    lastUpdated: '2025-12-20',
    regulatoryInfo: {
      resultType: 'backtest',
      testStartDate: '2024-12-01',
      testEndDate: '2025-12-20',
      commission: 0.06,
      slippage: 0.08,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 4,
      disclaimer: 'Backtest results are hypothetical and do not represent actual trading',
    },
  },
  {
    id: 'algo-004',
    name: 'Delta Divergence Scalp',
    description: 'Short-term scalping based on CVD divergences at key volume levels',
    strategyClass: 'Scalping',
    markets: ['Futures', 'Crypto'],
    riskProfile: 'aggressive',
    status: 'backtest',
    pricing: { monthly: 299, annual: 2990 },
    metrics: {
      totalReturn: 18.9,
      cagr: 15.2,
      netProfit: 18900,
      avgMonthlyReturn: 1.4,
      profitableMonthsPct: 75,
      returnAfterCosts: 16.2,
      maxDrawdown: 6.4,
      currentDrawdown: 1.8,
      avgDrawdown: 2.6,
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
      totalTrades: 534,
      winRate: 58.2,
      avgWin: 0.6,
      avgLoss: 0.42,
      profitFactor: 1.52,
      expectancy: 0.035,
      avgRMultiple: 0.8,
      avgTradeDuration: '12 minutes',
      tradesPerDay: 2.9,
      costPerTrade: 8.5,
      inSampleReturn: 24.8,
      outOfSampleReturn: 13.4,
      walkForwardReturn: 11.8,
      monteCarloP50: 16.2,
      monteCarloP5: 8.4,
      parameterSensitivity: 0.28,
      top10TradesContribution: 18,
      overfittingRisk: 'low',
      trendPerformance: 8.4,
      flatPerformance: 12.8,
      highVolPerformance: 15.2,
      longWinRate: 59.8,
      shortWinRate: 56.6,
      avgExposure: 35,
      avgTimeInPosition: '12 minutes',
      recommendedCapital: 50000,
      maxPositionSize: 20,
      leverage: 5,
      marginRequirement: 10000,
      returnOnCapital: 37.8,
      strategyCapacity: '$300k',
      systemUptime: 99.95,
      executionErrors: 0.05,
      signalDelay: 12,
      missedTrades: 3,
      brokerStability: 99.9,
    },
    equityCurve: generateGrowingEquityCurve(100, 118.9, 1.5, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(15.2),
    rollingSharpe: generateRollingSharpe(2.1, 120),
    lastUpdated: '2025-12-01',
    regulatoryInfo: {
      resultType: 'backtest',
      testStartDate: '2025-06-01',
      testEndDate: '2025-12-01',
      commission: 0.12,
      slippage: 0.05,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 5,
      disclaimer: 'Backtest results are hypothetical',
    },
  },
  {
    id: 'algo-005',
    name: 'Statistical Arbitrage',
    description: 'Pairs trading strategy exploiting mean reversion between correlated assets',
    strategyClass: 'Statistical Arbitrage',
    markets: ['Equities', 'Crypto'],
    riskProfile: 'conservative',
    status: 'paper',
    pricing: { monthly: 199, annual: 1990 },
    metrics: {
      totalReturn: 15.8,
      cagr: 12.8,
      netProfit: 15800,
      avgMonthlyReturn: 1.2,
      profitableMonthsPct: 78,
      returnAfterCosts: 14.2,
      maxDrawdown: 4.2,
      currentDrawdown: 1.2,
      avgDrawdown: 1.8,
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
      totalTrades: 287,
      winRate: 64.1,
      avgWin: 1.2,
      avgLoss: 0.65,
      profitFactor: 1.95,
      expectancy: 0.055,
      avgRMultiple: 1.4,
      avgTradeDuration: '1.8 days',
      tradesPerDay: 1.2,
      costPerTrade: 15.5,
      inSampleReturn: 19.4,
      outOfSampleReturn: 12.2,
      walkForwardReturn: 10.8,
      monteCarloP50: 13.8,
      monteCarloP5: 7.2,
      parameterSensitivity: 0.18,
      top10TradesContribution: 22,
      overfittingRisk: 'low',
      trendPerformance: 8.2,
      flatPerformance: 14.8,
      highVolPerformance: 6.4,
      longWinRate: 65.8,
      shortWinRate: 62.4,
      avgExposure: 85,
      avgTimeInPosition: '1.8 days',
      recommendedCapital: 100000,
      maxPositionSize: 25,
      leverage: 2,
      marginRequirement: 50000,
      returnOnCapital: 15.8,
      strategyCapacity: '$5M',
      systemUptime: 99.9,
      executionErrors: 0.1,
      signalDelay: 65,
      missedTrades: 1,
      brokerStability: 99.7,
    },
    equityCurve: generateGrowingEquityCurve(100, 115.8, 1.2, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(12.8),
    rollingSharpe: generateRollingSharpe(2.34, 120),
    lastUpdated: '2026-01-18',
    regulatoryInfo: {
      resultType: 'paper',
      testStartDate: '2024-11-01',
      testEndDate: '2026-01-18',
      commission: 0.08,
      slippage: 0.04,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 2,
      disclaimer: 'Paper trading results may differ from live execution',
    },
  },
  {
    id: 'algo-006',
    name: 'Volatility Breakout',
    description: 'Captures explosive moves after volatility compression',
    strategyClass: 'Volatility',
    markets: ['Futures', 'Crypto', 'Forex'],
    riskProfile: 'moderate',
    status: 'paper',
    pricing: { monthly: 179, annual: 1790 },
    metrics: {
      totalReturn: 28.3,
      cagr: 22.8,
      netProfit: 28300,
      avgMonthlyReturn: 2.1,
      profitableMonthsPct: 70,
      returnAfterCosts: 26.1,
      maxDrawdown: 9.8,
      currentDrawdown: 3.2,
      avgDrawdown: 4.5,
      maxDrawdownDuration: 28,
      recoveryTime: 22,
      volatility: 14.2,
      var95: 2.2,
      cvar95: 2.9,
      worstDay: -2.9,
      worstWeek: -5.8,
      worstMonth: -8.9,
      maxConsecutiveLosses: 5,
      riskOfRuin: 0.015,
      sharpeRatio: 1.78,
      sortinoRatio: 2.34,
      calmarRatio: 2.89,
      sterlingRatio: 2.28,
      marRatio: 2.89,
      totalTrades: 156,
      winRate: 51.9,
      avgWin: 2.4,
      avgLoss: 1.15,
      profitFactor: 2.08,
      expectancy: 0.18,
      avgRMultiple: 1.6,
      avgTradeDuration: '8.4 hours',
      tradesPerDay: 0.5,
      costPerTrade: 16.5,
      inSampleReturn: 34.2,
      outOfSampleReturn: 22.4,
      walkForwardReturn: 19.8,
      monteCarloP50: 25.2,
      monteCarloP5: 14.2,
      parameterSensitivity: 0.25,
      top10TradesContribution: 32,
      overfittingRisk: 'low',
      trendPerformance: 24.8,
      flatPerformance: -2.4,
      highVolPerformance: 16.2,
      longWinRate: 53.2,
      shortWinRate: 50.6,
      avgExposure: 58,
      avgTimeInPosition: '8.4 hours',
      recommendedCapital: 60000,
      maxPositionSize: 12,
      leverage: 3,
      marginRequirement: 18000,
      returnOnCapital: 47.2,
      strategyCapacity: '$1.5M',
      systemUptime: 99.85,
      executionErrors: 0.15,
      signalDelay: 42,
      missedTrades: 1,
      brokerStability: 99.6,
    },
    equityCurve: generateGrowingEquityCurve(100, 128.3, 2.5, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(22.8),
    rollingSharpe: generateRollingSharpe(1.78, 120),
    lastUpdated: '2026-01-10',
    regulatoryInfo: {
      resultType: 'paper',
      testStartDate: '2025-02-01',
      testEndDate: '2026-01-10',
      commission: 0.05,
      slippage: 0.06,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 3,
      disclaimer: 'Paper trading results may differ from live execution',
    },
  },
  {
    id: 'algo-007',
    name: 'Grid Market Making',
    description: 'Automated market making with dynamic grid spacing',
    strategyClass: 'Market Making',
    markets: ['Crypto'],
    riskProfile: 'conservative',
    status: 'backtest',
    pricing: { license: 1999 },
    metrics: {
      totalReturn: 22.1,
      cagr: 17.8,
      netProfit: 22100,
      avgMonthlyReturn: 1.7,
      profitableMonthsPct: 82,
      returnAfterCosts: 19.8,
      maxDrawdown: 5.6,
      currentDrawdown: 1.5,
      avgDrawdown: 2.2,
      maxDrawdownDuration: 18,
      recoveryTime: 12,
      volatility: 6.8,
      var95: 0.8,
      cvar95: 1.1,
      worstDay: -1.1,
      worstWeek: -2.2,
      worstMonth: -3.4,
      maxConsecutiveLosses: 3,
      riskOfRuin: 0.003,
      sharpeRatio: 2.67,
      sortinoRatio: 3.45,
      calmarRatio: 3.95,
      sterlingRatio: 3.12,
      marRatio: 3.95,
      totalTrades: 1847,
      winRate: 72.3,
      avgWin: 0.35,
      avgLoss: 0.28,
      profitFactor: 1.68,
      expectancy: 0.012,
      avgRMultiple: 0.6,
      avgTradeDuration: '3.2 minutes',
      tradesPerDay: 6.2,
      costPerTrade: 5.5,
      inSampleReturn: 28.4,
      outOfSampleReturn: 17.8,
      walkForwardReturn: 15.2,
      monteCarloP50: 19.8,
      monteCarloP5: 11.2,
      parameterSensitivity: 0.22,
      top10TradesContribution: 15,
      overfittingRisk: 'low',
      trendPerformance: 12.4,
      flatPerformance: 18.2,
      highVolPerformance: 8.4,
      longWinRate: 73.8,
      shortWinRate: 70.8,
      avgExposure: 92,
      avgTimeInPosition: '3.2 minutes',
      recommendedCapital: 80000,
      maxPositionSize: 30,
      leverage: 2,
      marginRequirement: 40000,
      returnOnCapital: 27.6,
      strategyCapacity: '$800k',
      systemUptime: 99.98,
      executionErrors: 0.02,
      signalDelay: 8,
      missedTrades: 0,
      brokerStability: 99.95,
    },
    equityCurve: generateGrowingEquityCurve(100, 122.1, 1, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(17.8),
    rollingSharpe: generateRollingSharpe(2.67, 120),
    lastUpdated: '2025-12-15',
    regulatoryInfo: {
      resultType: 'backtest',
      testStartDate: '2025-04-01',
      testEndDate: '2025-12-15',
      commission: 0.10,
      slippage: 0.02,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 2,
      disclaimer: 'Backtest results are hypothetical',
    },
  },
  {
    id: 'algo-008',
    name: 'Momentum Trend',
    description: 'Classic trend following using moving average crossovers',
    strategyClass: 'Trend Following',
    markets: ['Futures', 'Crypto', 'Forex', 'Equities'],
    riskProfile: 'moderate',
    status: 'live',
    pricing: { monthly: 249, annual: 2490 },
    metrics: {
      totalReturn: 38.7,
      cagr: 31.2,
      netProfit: 38700,
      avgMonthlyReturn: 2.8,
      profitableMonthsPct: 68,
      returnAfterCosts: 36.2,
      maxDrawdown: 14.2,
      currentDrawdown: 4.8,
      avgDrawdown: 6.2,
      maxDrawdownDuration: 38,
      recoveryTime: 32,
      volatility: 16.9,
      var95: 2.8,
      cvar95: 3.6,
      worstDay: -3.6,
      worstWeek: -7.4,
      worstMonth: -11.8,
      maxConsecutiveLosses: 7,
      riskOfRuin: 0.012,
      sharpeRatio: 1.62,
      sortinoRatio: 2.18,
      calmarRatio: 2.73,
      sterlingRatio: 2.15,
      marRatio: 2.73,
      totalTrades: 94,
      winRate: 48.9,
      avgWin: 3.8,
      avgLoss: 1.65,
      profitFactor: 2.31,
      expectancy: 0.41,
      avgRMultiple: 2.0,
      avgTradeDuration: '3.5 days',
      tradesPerDay: 0.3,
      costPerTrade: 22.5,
      inSampleReturn: 48.2,
      outOfSampleReturn: 29.4,
      walkForwardReturn: 26.8,
      monteCarloP50: 34.2,
      monteCarloP5: 19.8,
      parameterSensitivity: 0.28,
      top10TradesContribution: 38,
      overfittingRisk: 'low',
      trendPerformance: 32.4,
      flatPerformance: -6.8,
      highVolPerformance: 14.2,
      longWinRate: 50.2,
      shortWinRate: 47.6,
      avgExposure: 72,
      avgTimeInPosition: '3.5 days',
      recommendedCapital: 70000,
      maxPositionSize: 14,
      leverage: 3,
      marginRequirement: 21000,
      returnOnCapital: 55.3,
      strategyCapacity: '$3M',
      systemUptime: 99.92,
      executionErrors: 0.08,
      signalDelay: 58,
      missedTrades: 1,
      brokerStability: 99.85,
    },
    equityCurve: generateGrowingEquityCurve(100, 138.7, 3.5, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(31.2),
    rollingSharpe: generateRollingSharpe(1.62, 120),
    lastUpdated: '2026-01-20',
    regulatoryInfo: {
      resultType: 'live',
      testStartDate: '2024-08-01',
      testEndDate: '2026-01-20',
      commission: 0.04,
      slippage: 0.07,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 3,
      disclaimer: 'Live trading results with actual market execution',
    },
  },
  {
    id: 'algo-009',
    name: 'RSI Mean Reversion',
    description: 'Counter-trend strategy using RSI extremes',
    strategyClass: 'Mean Reversion',
    markets: ['Forex', 'Equities'],
    riskProfile: 'moderate',
    status: 'paper',
    pricing: { monthly: 129, annual: 1290 },
    metrics: {
      totalReturn: 19.4,
      cagr: 15.6,
      netProfit: 19400,
      avgMonthlyReturn: 1.5,
      profitableMonthsPct: 72,
      returnAfterCosts: 17.8,
      maxDrawdown: 7.3,
      currentDrawdown: 2.4,
      avgDrawdown: 3.2,
      maxDrawdownDuration: 20,
      recoveryTime: 16,
      volatility: 10.5,
      var95: 1.5,
      cvar95: 2.0,
      worstDay: -2.0,
      worstWeek: -4.2,
      worstMonth: -6.4,
      maxConsecutiveLosses: 4,
      riskOfRuin: 0.01,
      sharpeRatio: 1.89,
      sortinoRatio: 2.52,
      calmarRatio: 2.66,
      sterlingRatio: 2.12,
      marRatio: 2.66,
      totalTrades: 312,
      winRate: 68.7,
      avgWin: 1.1,
      avgLoss: 0.73,
      profitFactor: 1.72,
      expectancy: 0.062,
      avgRMultiple: 1.1,
      avgTradeDuration: '5.6 hours',
      tradesPerDay: 1.0,
      costPerTrade: 11.5,
      inSampleReturn: 24.2,
      outOfSampleReturn: 14.8,
      walkForwardReturn: 13.2,
      monteCarloP50: 17.2,
      monteCarloP5: 9.8,
      parameterSensitivity: 0.20,
      top10TradesContribution: 24,
      overfittingRisk: 'low',
      trendPerformance: 6.8,
      flatPerformance: 16.4,
      highVolPerformance: 10.2,
      longWinRate: 70.2,
      shortWinRate: 67.2,
      avgExposure: 48,
      avgTimeInPosition: '5.6 hours',
      recommendedCapital: 40000,
      maxPositionSize: 8,
      leverage: 2,
      marginRequirement: 12000,
      returnOnCapital: 48.5,
      strategyCapacity: '$1.2M',
      systemUptime: 99.88,
      executionErrors: 0.12,
      signalDelay: 48,
      missedTrades: 1,
      brokerStability: 99.75,
    },
    equityCurve: generateGrowingEquityCurve(100, 119.4, 1.8, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(15.6),
    rollingSharpe: generateRollingSharpe(1.89, 120),
    lastUpdated: '2026-01-05',
    regulatoryInfo: {
      resultType: 'paper',
      testStartDate: '2024-12-01',
      testEndDate: '2026-01-05',
      commission: 0.05,
      slippage: 0.04,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 2,
      disclaimer: 'Paper trading results may differ from live execution',
    },
  },
  {
    id: 'algo-010',
    name: 'Carry Trade FX',
    description: 'Long-term forex strategy exploiting interest rate differentials',
    strategyClass: 'Carry Trade',
    markets: ['Forex'],
    riskProfile: 'conservative',
    status: 'live',
    pricing: { monthly: 179, annual: 1790 },
    metrics: {
      totalReturn: 12.8,
      cagr: 10.2,
      netProfit: 12800,
      avgMonthlyReturn: 1.0,
      profitableMonthsPct: 75,
      returnAfterCosts: 11.8,
      maxDrawdown: 6.1,
      currentDrawdown: 1.8,
      avgDrawdown: 2.8,
      maxDrawdownDuration: 25,
      recoveryTime: 20,
      volatility: 9.8,
      var95: 1.4,
      cvar95: 1.8,
      worstDay: -1.8,
      worstWeek: -3.6,
      worstMonth: -5.4,
      maxConsecutiveLosses: 3,
      riskOfRuin: 0.008,
      sharpeRatio: 1.45,
      sortinoRatio: 1.98,
      calmarRatio: 2.10,
      sterlingRatio: 1.68,
      marRatio: 2.10,
      totalTrades: 47,
      winRate: 72.3,
      avgWin: 2.8,
      avgLoss: 1.48,
      profitFactor: 1.89,
      expectancy: 0.27,
      avgRMultiple: 1.5,
      avgTradeDuration: '18 days',
      tradesPerDay: 0.08,
      costPerTrade: 28.5,
      inSampleReturn: 16.4,
      outOfSampleReturn: 9.8,
      walkForwardReturn: 8.4,
      monteCarloP50: 11.2,
      monteCarloP5: 6.4,
      parameterSensitivity: 0.15,
      top10TradesContribution: 28,
      overfittingRisk: 'low',
      trendPerformance: 10.8,
      flatPerformance: 8.4,
      highVolPerformance: 4.2,
      longWinRate: 74.2,
      shortWinRate: 70.4,
      avgExposure: 95,
      avgTimeInPosition: '18 days',
      recommendedCapital: 150000,
      maxPositionSize: 40,
      leverage: 2,
      marginRequirement: 75000,
      returnOnCapital: 8.5,
      strategyCapacity: '$10M',
      systemUptime: 99.95,
      executionErrors: 0.05,
      signalDelay: 72,
      missedTrades: 0,
      brokerStability: 99.9,
    },
    equityCurve: generateGrowingEquityCurve(100, 112.8, 1.5, 120),
    drawdownCurve: [],
    monthlyReturns: generateMonthlyReturns(10.2),
    rollingSharpe: generateRollingSharpe(1.45, 120),
    lastUpdated: '2026-01-15',
    regulatoryInfo: {
      resultType: 'live',
      testStartDate: '2024-01-01',
      testEndDate: '2026-01-15',
      commission: 0.03,
      slippage: 0.05,
      initialCapital: 100000,
      calculationMethod: 'Time-weighted return',
      leverageAssumption: 2,
      disclaimer: 'Live trading results with actual market execution',
    },
  },
];

// Bot interface
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

// Signal interface
export interface Signal {
  id: string;
  algorithmId: string;
  algorithmName: string;
  instrument: string;
  timeframe: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  stopLoss: number;
  takeProfit: number[];
  riskReward: number;
  createdAt: string;
  expiresAt: string;
  status: 'NEW' | 'ACTIVE' | 'TRIGGERED' | 'FILLED' | 'CLOSED' | 'CANCELLED' | 'EXPIRED';
  result?: number;
}

// Subscription Plan interface
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'annual';
  features: string[];
  algorithms: string[];
  highlighted?: boolean;
}

// Bots data
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
  {
    id: 'bot-002',
    name: 'Trend Rider',
    version: '1.4.2',
    description: 'Automated trend-following execution with dynamic position sizing.',
    category: 'Trend Following',
    exchanges: ['Binance', 'Bybit', 'OKX'],
    instruments: ['BTC/USDT', 'ETH/USDT'],
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
    description: 'High-speed execution engine for breakout strategies.',
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
  {
    id: 'bot-004',
    name: 'Scalp Master',
    version: '1.2.0',
    description: 'Ultra-low latency scalping bot for high-frequency strategies.',
    category: 'Scalping',
    exchanges: ['Binance Futures', 'Bybit'],
    instruments: ['Crypto Perpetuals', 'ES', 'NQ'],
    timeframes: ['1m', '5m', '15m'],
    minCapital: 20000,
    maxDrawdown: 6.4,
    returnPct: 18.9,
    price: 199,
    licenseType: 'subscription',
    status: 'demo',
  },
  {
    id: 'bot-005',
    name: 'Stat Arb Pro',
    version: '2.0.0',
    description: 'Market-neutral pairs trading with automatic hedging.',
    category: 'Statistical Arbitrage',
    exchanges: ['Interactive Brokers', 'Binance'],
    instruments: ['Equities', 'Crypto'],
    timeframes: ['1H', '4H', '1D'],
    minCapital: 50000,
    maxDrawdown: 4.2,
    returnPct: 15.8,
    price: 299,
    licenseType: 'subscription',
    status: 'available',
  },
];

// Signals data
export const signals: Signal[] = [
  {
    id: 'sig-001',
    algorithmId: 'algo-001',
    algorithmName: 'VP Mean Reversion',
    instrument: 'ES',
    timeframe: '1H',
    direction: 'LONG',
    entryPrice: 4892.5,
    stopLoss: 4878.0,
    takeProfit: [4910.0, 4925.0, 4940.0],
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
    algorithmId: 'algo-003',
    algorithmName: 'Breakout Value Shift',
    instrument: 'NQ',
    timeframe: '15m',
    direction: 'SHORT',
    entryPrice: 17245.0,
    stopLoss: 17280.0,
    takeProfit: [17180.0, 17120.0],
    riskReward: 2.0,
    createdAt: '2026-01-19T16:00:00Z',
    expiresAt: '2026-01-19T22:00:00Z',
    status: 'CLOSED',
    result: 1.8,
  },
  {
    id: 'sig-004',
    algorithmId: 'algo-005',
    algorithmName: 'Statistical Arbitrage',
    instrument: 'BTC/ETH',
    timeframe: '4H',
    direction: 'LONG',
    entryPrice: 15.2,
    stopLoss: 14.8,
    takeProfit: [15.8, 16.2],
    riskReward: 2.5,
    createdAt: '2026-01-20T12:00:00Z',
    expiresAt: '2026-01-21T12:00:00Z',
    status: 'ACTIVE',
  },
  {
    id: 'sig-005',
    algorithmId: 'algo-008',
    algorithmName: 'Momentum Trend',
    instrument: 'EUR/USD',
    timeframe: '1D',
    direction: 'LONG',
    entryPrice: 1.0845,
    stopLoss: 1.0780,
    takeProfit: [1.0920, 1.0980],
    riskReward: 2.8,
    createdAt: '2026-01-18T00:00:00Z',
    expiresAt: '2026-01-25T00:00:00Z',
    status: 'TRIGGERED',
  },
];

// Subscription plans
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
    algorithms: ['algo-001', 'algo-002'],
    highlighted: true,
  },
  {
    id: 'plan-institutional',
    name: 'Institutional',
    price: 399,
    period: 'monthly',
    features: ['All algorithms', 'Full API access', 'Dedicated support'],
    algorithms: ['algo-001', 'algo-002'],
  },
];
