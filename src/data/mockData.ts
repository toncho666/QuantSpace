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
];
