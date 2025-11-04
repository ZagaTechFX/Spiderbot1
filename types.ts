import { UTCTimestamp } from 'lightweight-charts';

export type Theme = 'light' | 'dark';
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
  email: string;
  avatarUrl: string;
  kycStatus: 'Verified' | 'Pending' | 'Rejected' | 'Not Submitted';
  subscriptionPlan: string;
  lastLogin: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface KpiCardData {
    title: string;
    value: string;
    change?: string;
    changeType?: 'increase' | 'decrease';
    icon: string;
}

export interface ActivePosition {
    symbol: string;
    entryPrice: number;
    quantity: number;
    currentPrice: number;
    pnl: number;
    position: 'Long' | 'Short';
    exchange: string;
}

export interface TradeHistory {
    symbol: string;
    entryPrice: number;
    exitPrice: number;
    quantity: number;
    pnl: number;
    position: 'Long' | 'Short';
    date: string;
    mode: 'Demo' | 'Real';
    strategy: string;
}

export interface Exchange {
    name: string;
    logo: string;
    connected: boolean;
    permissions: string[];
    requiredPermissions: string[];
}

export interface KycApplication {
    userId: string;
    userEmail: string;
    tier: string;
    documentType: string;
    timeInQueue: string;
    status: 'Pending' | 'In Progress' | 'Requires Resubmission' | 'Failed' | 'Approved';
    riskScore: 'Low' | 'Medium' | 'High';
    submittedDate: string;
}

export interface InvestmentGoal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: string;
}

export interface MasterTrader {
  id: string;
  name: string;
  avatarUrl: string;
  pnl: number; 
  maxDrawdown: number;
  winRate: number;
  aumCopied: number;
  strategy: string;
}

export interface CopiedTrade {
  id: string;
  masterTraderId: string;
  masterTraderName: string;
  masterTraderAvatarUrl: string;
  strategy: string;
  symbol: string;
  position: 'Long' | 'Short';
  pnl: number;
  timestamp: string;
}

export interface OptimizationResult {
  timeframe: string;
  totalReturn: number;
  maxDrawdown: number;
  winRate: number;
  robustnessScore: number;
  trades: number;
  weeklyProfitability: number;
  sharpeRatio: number;
}

export interface MonthlyReturn {
    month: string;
    return: number;
}

export type CandlestickData = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
  value?: number;
  color?: string;
};

export type ChartOHLCV = {
    open?: number;
    high?: number;
    low?: number;
    close?: number;
    volume?: number;
    change?: number;
    changePercent?: number;
};


// Admin Types
export interface SystemHealth {
    name: string;
    status: 'ok' | 'warning' | 'error';
    metric: string;
}

export interface AdminBotInfo {
    botId: string;
    userId: string;
    strategy: string;
    pair: string;
    status: 'Active' | 'Paused' | 'Error';
    pnl: number;
    drawdown: number;
}

export interface SystemAlert {
  id: string;
  severity: 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: string;
}

export interface AuditLog {
    id: string;
    timestamp: string;
    adminUser: string;
    ipAddress: string;
    action: string;
    details: string;
}

export interface AdminInboxItem {
    id: string;
    type: 'Approval' | 'Alert' | 'Task';
    title: string;
    description: string;
    timestamp: string;
    isRead: boolean;
}

export interface BotHealth {
    botId: string;
    userId: string;
    strategy: string;
    status: 'Healthy' | 'Warning' | 'Critical';
    lastHeartbeat: string;
}

export interface FeatureFlag {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
}


// Strategy Types
export interface DcaConfig {
    // Market Type
    marketType: 'SPOT' | 'FUTURES';

    // Entry Logic
    startOrderType: 'MARKET' | 'LIMIT';
    initialBuy: number;
    openPositionDoubled: boolean;
    timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
    startCondition: string; // e.g., 'RSI < 30'
    buyInCallback: number;
    
    // Take Profit
    tpBasis: '% by Average Price' | '% by Base Order Value';
    wholePositionTPRatio: number;
    wholePositionTPCallback: number;
    subPositionTPCallback: number;
    tpRule: '1st & last TP' | 'Combined TP' | 'TP all';

    // Safety Orders (SO)
    marginCallLimit: number;
    marginCallDrop: number;
    multipleBuyRatio: number;
    soScalingType: 'Geometric' | 'Arithmetic';
    maxSOPriceDeviation: number;
    maxActiveSOs: number;
    soPriceStepMultiplier: number;

    // Re-entry
    rebuy: number;
    rebuyCallbackRatio: number;

    // Risk Control
    maxLossSL: number;
    trailingSL: boolean;
    trailingSLCallback: number;
    cooldownPeriod: number; // in hours
    maxDrawdownLimit: number;

    // Deployment & Automation
    totalUsedUSDT: number;
    maxTradesPerDay: number;
    tradingWindowStart: string; // HH:MM
    tradingWindowEnd: string; // HH:MM
    reinvestProfit: boolean;

    // Futures/Margin
    leverage: number;
    marginMode: 'Isolated' | 'Cross';
}


export interface GridConfig {
    // Basic Grid Settings
    marketType: 'SPOT' | 'FUTURES';
    rangeType: 'Manual' | 'AI_OPTIMIZED';
    aiModel: 'notebook' | 'princeton';
    analysisPeriod: number;
    lowerPrice: number;
    upperPrice: number;
    gridCount: number;
    investmentAmount: number;
    
    // Grid Logic & Execution
    gridSpacingType: 'Arithmetic' | 'Geometric';
    startCondition: string;
    pumpProtection: boolean;
    timeframeForPumpDump: number; // in minutes
    
    // Advanced Trailing Controls
    trailingUp: boolean;
    trailingUpPercentage: number;
    trailingDown: boolean;
    trailingDownPercentage: number;
    stopLossTrailing: boolean;
    stopLossTrailingPercentage: number;
    
    // Risk & Inventory Management
    stopLossPrice: number;
    rangeBreakoutAction: 'Stop Bot' | 'Stop & Sell' | 'Convert to DCA';
    maxInventoryLimit: number; // In base currency amount
    
    // Profit & Automation
    compoundingProfit: boolean;
    gridRedeploymentStrategy: 'Pause' | 'Auto-Restart Same' | 'Auto-Restart New AI';

    // Futures Trading
    orderDirection: 'Neutral' | 'Long' | 'Short';
    leverageRatio: number;
    marginMode: 'Isolated' | 'Cross';
    autoMarginTransfer: boolean;
    hedgeGridToggle: boolean;
}

export interface AlgoStrategyConfig {
    marketType: 'SPOT' | 'FUTURES';
    
    // Core Logic
    model: 'Trend-Following' | 'Mean Reversion' | 'Volatility Breakout' | 'Pairs/Stat-Arb';
    primaryEntrySignal: string;
    confirmationFilter: string;
    regimeFilter: 'ADX' | 'Volatility' | 'None';

    // Universal Risk
    atrMultiplierForStops: number;
    maxHoldingPeriod: number;
    useVolatilityFilter: boolean;
    volatilityFilterATR: number;
    useCorrelationAwareness: boolean;

    // Pairs Specific
    pairSelection: string;
    zScoreEntry: number;
    zScoreExit: number;
    useStructuralBreakDetection: boolean;

    // Execution & Order Management
    maxPositionSize: number;
    maxDailyLoss: number;
    maxWeeklyLoss: number;
    slippageTolerance: number;
    orderType: 'Market' | 'Limit' | 'IOC' | 'FOK';
    partialFillHandling: 'Wait' | 'Cancel Remainder';
    
    // Advanced Risk & System Health
    circuitBreakerEnabled: boolean;
    maxOpenPositions: number;
    useTimeOfDayFilter: boolean;
    tradingHoursStart: string;
    tradingHoursEnd: string;
    tradeVelocityLimit: number;
    commissionFeeModel: 'Fixed' | 'Maker/Taker Tiers';
    commissionFee: number;
    
    // Compliance and Reporting
    allocationBucket: string;
    auditLogVerbosity: 'Low' | 'Medium' | 'High';
    postTradeReportingFlag: boolean;
    
    // Portfolio-Level Risk
    maxPortfolioDrawdown: number;
    varLimit: number;
    maxPortfolioLeverage: number;
    liquidityDepthThreshold: number;
    interStrategyCorrelationFilter: number;
    
    // Operational & System Health
    globalKillSwitch: boolean;
    dataFeedLatencyThreshold: number;
    connectivityFailureRetries: number;
    connectivityRetryDelay: number;
    maxOrderCancelRate: number;
    
    // Post-Trade & Compliance
    slippageReportDeviation: number;
    tradeAuditTrailLevel: 'Minimal' | 'Decision-Level' | 'Full Tick';
    backtestLiveSkewThreshold: number;
    
    // Strategy Adaptivity and Calibration
    useAdaptiveParameters: boolean;
    adaptiveParameterRange: number;
    marketRegimeSwitchThreshold: number;
    performanceDegradationAction: 'Alert' | 'Pause' | 'Re-calibrate';
    walkForwardAnalysisPeriod: number;
    
    // Portfolio Construction & Aggregation
    targetPortfolioBeta: number;
    assetClassExposureCap: number;
    riskBasedCapitalAllocation: 'Equal-Weight' | 'Risk-Parity' | 'Kelly';
    dynamicRebalanceThreshold: number;
    rebalanceTimeInterval: string;
    
    // System Integrity and Emergency
    gracefulShutdownMode: boolean;
    hardwareLatencyAlert: number;
    
    // Model Risk and Decay Management
    modelValidationFrequency: 'Daily' | 'Weekly' | 'Monthly';
    outOfSamplePerformanceThreshold: number;
    strategyDecommissioningLogic: number;
    parameterStabilityMetric: number;
    tradeRationaleLoggingDetail: 'Minimal' | 'Decision Tree' | 'Full Feature Set';
    
    // Futures/Margin
    leverage: number;
    marginMode: 'Isolated' | 'Cross';
}

export type StrategyType = 'Advanced DCA' | 'Advanced Grid' | 'Signal Bot' | 'Quantitative Strategy';

export interface UserStrategy {
    id: string;
    name: string;
    type: StrategyType;
    pair: string;
    status: 'Active' | 'Paused' | 'Error';
    pnl: number;
    config: DcaConfig | GridConfig | AlgoStrategyConfig | any;
}

export interface StrategyTemplate {
    id: string;
    name: string;
    type: StrategyType;
    config: DcaConfig | GridConfig | AlgoStrategyConfig | any;
}

// Arbitrage Types
export interface ArbitrageOpportunity {
  id: string;
  path: string; // e.g., "USDT -> BTC -> ETH -> USDT"
  exchanges: string; // e.g., "Binance / KuCoin"
  profit: number; // as percentage
  timestamp: number;
}

export interface ActiveArbitrage {
  id: string;
  path: string;
  status: string; // e.g., "Executing Leg 1/3"
  startTime: string;
}

export interface ArbitrageTradeHistory {
  id: string;
  timestamp: string;
  path: string;
  profit: number; // in USD
  fees: number;
  netProfit: number;
}

export interface ArbitrageConfig {
    capitalAllocation: number;
    minReturnThreshold: number;
    maxDrawdown: number;
    includedAssets: string[];
}