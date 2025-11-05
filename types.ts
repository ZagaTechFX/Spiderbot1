export type UTCTimestamp = number;

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

export interface NormalGridConfig {
    marketType: 'SPOT' | 'FUTURES';
    lowerPrice: number;
    upperPrice: number;
    gridCount: number;
    investmentAmount: number;
    gridSpacingType: 'Arithmetic' | 'Geometric';
    stopLossPrice: number;
    takeProfitPrice: number;
    leverage: number;
    marginMode: 'Isolated' | 'Cross';
}

export interface NormalDCAConfig {
    marketType: 'SPOT' | 'FUTURES';
    initialBuy: number;
    buyInCallback: number;
    takeProfitPercentage: number;
    safetyOrderCount: number;
    safetyOrderStepPercentage: number;
    safetyOrderVolumeMultiplier: number;
    stopLossPercentage: number;
    leverage: number;
    marginMode: 'Isolated' | 'Cross';
}

export interface TrendFollowingConfig {
    marketType: 'SPOT' | 'FUTURES';
    fastEMAPeriod: number;
    slowEMAPeriod: number;
    atrPeriod: number;
    atrMultiplier: number;
    positionSize: number;
    stopLossATRMultiplier: number;
    takeProfitATRMultiplier: number;
    trailingStopEnabled: boolean;
    leverage: number;
    marginMode: 'Isolated' | 'Cross';
}

export interface MeanReversionConfig {
    marketType: 'SPOT' | 'FUTURES';
    zScorePeriod: number;
    zScoreEntryThreshold: number;
    zScoreExitThreshold: number;
    rsiPeriod: number;
    rsiOversold: number;
    rsiOverbought: number;
    positionSize: number;
    stopLossPercentage: number;
    takeProfitPercentage: number;
    leverage: number;
    marginMode: 'Isolated' | 'Cross';
}

export interface VolatilityBreakoutConfig {
    marketType: 'SPOT' | 'FUTURES';
    breakoutIndicator: 'Donchian' | 'Keltner';
    lookbackPeriod: number;
    keltnerATRMultiplier: number;
    positionSize: number;
    stopLossPercentage: number;
    takeProfitPercentage: number;
    timeOfDayFilterEnabled: boolean;
    tradingHoursStart: string;
    tradingHoursEnd: string;
    leverage: number;
    marginMode: 'Isolated' | 'Cross';
}

export interface TradingViewWebhookConfig {
    marketType: 'SPOT' | 'FUTURES';
    webhookURL: string;
    alertParser: string;
    signalSourceTrustScore: number;
    maximumSlippage: number;
    orderTimeout: number;
    positionSizeOverride: 'Use Signal' | 'Fixed %';
    fixedPositionSize: number;
    dailyLossLimit: number;
    maxExchangeAPIRateUsage: number;
    orderTypeDefault: 'Market' | 'Limit' | 'Post Only Limit';
    maxOpenPositions: number;
    minimumPositionSize: number;
    takeProfitPercentage: number;
    stopLossPercentage: number;
    globalCapitalAllocation: number;
    maxPositionLeverage: number;
    dailyTradeCountLimit: number;
    ignoreTickersList: string;
    confirmationWebhookURL: string;
    logLevel: 'Info' | 'Debug' | 'Error';
    timeZoneSetting: string;
    partialFillHandling: 'Cancel Remainder' | 'Wait for Fill';
    cooldownPeriod: number;
    trailingStopActivation: number;
    maxDrawdown: number;
    exchangeTimeOffset: number;
    executionEnvironment: 'Live Trading' | 'Paper Trading';
    whitelistedIPAddresses: string;
    maxTradeFeePercentage: number;
    minimumProfitTarget: number;
    strategyTagID: string;
    accountMode: 'Single' | 'Master/Sub-Account';
    webhookRetryMechanism: 'Exponential Backoff' | 'Fixed Delay';
    leverage: number;
    marginMode: 'Isolated' | 'Cross';
}

export interface DipAnalyserConfig {
    marketType: 'SPOT' | 'FUTURES';
    dipScoreComponents: {
        rsiDivergence: boolean;
        volumeSpike: boolean;
        priceLevelTest: boolean;
    };
    scoreThreshold: number;
    minimumDipDepth: number;
    timeframeForAnalysis: '1h' | '4h' | '1D';
    buyAggression: 'Conservative' | 'Moderate' | 'Aggressive';
    quickProfitTarget: number;
    progressiveStop: boolean;
    progressiveStopPercentage: number;
    maximumConcurrentDips: number;
    forcedAccumulationMode: boolean;
    recoveryConfirmationFilter: number;
    liquiditySweepRequirement: boolean;
    fvgRetracementPercentage: number;
    orderBlockProximityFilter: number;
    maxOrderBookSkew: number;
    executionSliceSize: number;
    twapHorizon: number;
    maxCumulativeSlippage: number;
    dcaTrancheSizeMultiplier: number;
    dcaProfitExitThreshold: boolean;
    dcaProfitExitPercentage: number;
    portfolioHedgeRatioAdjustment: number;
    maxLossFromAverageEntry: number;
    assetAllocationHardCap: number;
    botHealthCheckInterval: number;
    apiPermissionValidation: 'Read-Only' | 'Read/Trade' | 'Full';
    autoPauseOnNewsEvent: boolean;
    newsEventSeverity: 'Low' | 'Medium' | 'High';
    volumeParticipationRate: number;
    timeBasedDipInvalidation: number;
    minAssetHoldingQuantity: number;
    leverage: number;
    marginMode: 'Isolated' | 'Cross';
}

export interface SignalBotConfig {
    marketType: 'SPOT' | 'FUTURES';
    signalSource: 'Telegram' | 'Discord' | 'API' | 'Custom';
    messageParser: string;
    providerTrustScore: number;
    signalVerificationDelay: number;
    maximumPositions: number;
    correlationLimit: number;
    autoStopOnProviderError: boolean;
    maxOrderDeviation: number;
    maxPortfolioDrawdown: number;
    auditLogVerbosity: 'Minimal' | 'Standard' | 'Detailed' | 'Full';
    assetWhitelist: string;
    timeOfDayTradingWindow: string;
    maxDailyLoss: number;
    maxWeeklyLoss: number;
    orderTypePreference: 'Limit' | 'Market' | 'Post-Only Limit' | 'IOC' | 'FOK';
    slippageTolerance: number;
    fillOrKillTimeout: number;
    dynamicPositionSizing: 'Fixed Amt' | '% of Balance' | 'Kelly Criterion' | 'VaR';
    dataFeedLatencyThreshold: number;
    maxAPIRequestRate: number;
    emergencyKillSwitchKey: string;
    signalReentryDelay: number;
    tpSlOverwrite: 'Allow' | 'Reject' | 'Only If Worse';
    partialFillPolicy: 'Hold' | 'Cancel Remaining' | 'Re-Price Limit';
    marketDataTolerance: number;
    orderTradeRatioLimit: number;
    strategyVersionLock: string;
    tradeIdentifierTag: string;
    pnlReportingFrequency: 'Real-Time' | '1min' | '5min' | 'EOD';
    vendorSignalLicenseKey: string;
    minExchangeLiquidity: number;
    postTradeComplianceDelay: number;
    circuitBreakerResponse: 'Cancel All' | 'Pause New' | 'Reduce-Only';
    requiredDataFields: string[];
    exposureNettingMode: 'Gross' | 'Net' | 'Delta-Adjusted';
    maxVolatilityFilter: number;
    maxSlippagePerPosition: number;
    strategyConfidenceScoreThreshold: number;
    auditLogRetentionPeriod: number;
    correlationCheckLookbackWindow: string;
    externalRiskSystemHeartbeatTimeout: number;
    orderRoutingDestinationOverride: string;
    signalParsingFailureLimit: number;
    tradeExecutionWindowMaxLatency: number;
    maxAdverseExcursion: number;
    outOfSampleFailureThreshold: number;
    leverage: number;
    marginMode: 'Isolated' | 'Cross';
}

export type StrategyType = 'Advanced DCA' | 'Advanced Grid' | 'Signal Bot' | 'Quantitative Strategy' | 'Normal Grid' | 'Normal DCA' | 'TradingView Webhook Bot' | 'Dip Analyser Bot' | 'Trend-Following Bot' | 'Mean Reversion Bot' | 'Volatility Breakout Bot';

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