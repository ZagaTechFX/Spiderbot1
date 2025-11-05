import React, { useState } from 'react';
import { SignalBotConfig } from '../../types';
import StrategyConfigPanelLayout from '../StrategyConfigPanelLayout';
import ToggleSwitch from '../ToggleSwitch';

const InputField: React.FC<{ label: string, type?: string, value: any, onChange: (e: any) => void, unit?: string, helpText?: string, placeholder?: string, min?: string, max?: string, step?: string }> = ({ label, type = 'text', value, onChange, unit, helpText, placeholder, min, max, step }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
        <div className="flex items-center gap-2">
            <input 
                type={type} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                className="flex-1 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg shadow-sm px-3 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-colors" 
            />
            {unit && <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap text-sm font-medium">{unit}</span>}
        </div>
        {helpText && <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{helpText}</p>}
    </div>
);

const SelectField: React.FC<{ label: string, value: any, onChange: (e: any) => void, children?: React.ReactNode, helpText?: string }> = ({ label, value, onChange, children, helpText }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
        <select 
            value={value} 
            onChange={onChange} 
            className="w-full bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg shadow-sm px-3 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-colors"
        >
            {children}
        </select>
        {helpText && <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{helpText}</p>}
    </div>
);

interface SignalBotConfigPanelProps {
    config: SignalBotConfig;
    onConfigChange: (config: SignalBotConfig) => void;
    onSave: () => void;
    onSaveTemplate: () => void;
}

const SignalBotConfigPanel: React.FC<SignalBotConfigPanelProps> = ({ config, onConfigChange, onSave, onSaveTemplate }) => {
    const [activeTab, setActiveTab] = useState('basic');

    const handleChange = (field: keyof SignalBotConfig) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
        onConfigChange({ ...config, [field]: value });
    };

    const basicSignalContent = (
        <div className="space-y-4">
            <SelectField label="Signal Source" value={config.signalSource} onChange={handleChange('signalSource')} helpText="Platform where signals are received">
                <option value="Telegram">Telegram</option>
                <option value="Discord">Discord</option>
                <option value="API">API</option>
                <option value="Custom">Custom</option>
            </SelectField>
            <InputField label="Message Parser (Regex)" type="text" value={config.messageParser} onChange={handleChange('messageParser')} placeholder="^(BUY|SELL)\s+(\w+)\s+@\s+([\d.]+)" helpText="Custom regex pattern to extract action, asset, and price from signal" />
            <InputField label="Provider Trust Score (1-10)" type="number" value={config.providerTrustScore} onChange={handleChange('providerTrustScore')} min="1" max="10" step="0.1" helpText="Dynamic position sizing based on provider's historical performance" />
            <InputField label="Signal Verification Delay" type="number" value={config.signalVerificationDelay} onChange={handleChange('signalVerificationDelay')} unit="seconds" helpText="Wait time to check for signal correction/retraction before executing" />
            <InputField label="Maximum Positions" type="number" value={config.maximumPositions} onChange={handleChange('maximumPositions')} helpText="Hard limit on concurrent open trades" />
            <InputField label="Correlation Limit" type="number" value={config.correlationLimit} onChange={handleChange('correlationLimit')} unit="%" helpText="Prevent trading correlated assets simultaneously above this threshold" />
            <div className="flex items-center justify-between py-2">
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Auto-Stop on Provider Error</label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Stop bot on excessive invalid signals</p>
                </div>
                <ToggleSwitch
                    checked={config.autoStopOnProviderError}
                    onChange={(checked) => onConfigChange({ ...config, autoStopOnProviderError: checked })}
                />
            </div>
            <InputField label="Max Order Deviation" type="number" value={config.maxOrderDeviation} onChange={handleChange('maxOrderDeviation')} unit="%" helpText="Reject trade if market price deviates from signal price by this %" />
            <InputField label="Signal Re-entry Delay" type="number" value={config.signalReentryDelay} onChange={handleChange('signalReentryDelay')} unit="minutes" helpText="Wait time per asset before accepting new signals after trade close" />
            <SelectField label="TP/SL Overwrite Policy" value={config.tpSlOverwrite} onChange={handleChange('tpSlOverwrite')} helpText="Control whether bot can override signal TP/SL levels">
                <option value="Allow">Allow Override</option>
                <option value="Reject">Reject Override</option>
                <option value="Only If Worse">Only If Worse</option>
            </SelectField>
            <InputField label="Signal Parsing Failure Limit" type="number" value={config.signalParsingFailureLimit} onChange={handleChange('signalParsingFailureLimit')} helpText="Consecutive parsing failures before halting" />
        </div>
    );

    const executionContent = (
        <div className="space-y-4">
            <SelectField label="Order Type Preference" value={config.orderTypePreference} onChange={handleChange('orderTypePreference')} helpText="Limit is safer, Market is faster but risks slippage">
                <option value="Limit">Limit</option>
                <option value="Market">Market</option>
                <option value="Post-Only Limit">Post-Only Limit</option>
                <option value="IOC">IOC (Immediate or Cancel)</option>
                <option value="FOK">FOK (Fill or Kill)</option>
            </SelectField>
            <InputField label="Slippage Tolerance" type="number" value={config.slippageTolerance} onChange={handleChange('slippageTolerance')} unit="%" helpText="Max acceptable price difference between intended and actual fill" />
            <InputField label="Fill-or-Kill Timeout" type="number" value={config.fillOrKillTimeout} onChange={handleChange('fillOrKillTimeout')} unit="ms" helpText="Maximum wait time for FOK/IOC orders before auto-cancel" />
            <SelectField label="Dynamic Position Sizing Logic" value={config.dynamicPositionSizing} onChange={handleChange('dynamicPositionSizing')} helpText="Capital allocation method per trade">
                <option value="Fixed Amt">Fixed Amount</option>
                <option value="% of Balance">% of Balance</option>
                <option value="Kelly Criterion">Kelly Criterion</option>
                <option value="VaR">VaR (Value at Risk)</option>
            </SelectField>
            <SelectField label="Partial Fill Policy" value={config.partialFillPolicy} onChange={handleChange('partialFillPolicy')} helpText="Action when limit order is only partially filled">
                <option value="Hold">Hold</option>
                <option value="Cancel Remaining">Cancel Remaining</option>
                <option value="Re-Price Limit">Re-Price Limit</option>
            </SelectField>
            <InputField label="Max Slippage per Position" type="number" value={config.maxSlippagePerPosition} onChange={handleChange('maxSlippagePerPosition')} unit="%" helpText="Cumulative slippage cap for entire trade lifecycle" />
            <InputField label="Trade Execution Window Max Latency" type="number" value={config.tradeExecutionWindowMaxLatency} onChange={handleChange('tradeExecutionWindowMaxLatency')} unit="ms" helpText="Max acceptable delay from signal processing to order acceptance" />
            <InputField label="Order Routing Destination Override" type="text" value={config.orderRoutingDestinationOverride} onChange={handleChange('orderRoutingDestinationOverride')} placeholder="Leave empty for auto-routing" helpText="Force all orders to specific exchange/venue (Exchange ID)" />
        </div>
    );

    const riskContent = (
        <div className="space-y-4">
            <InputField label="Max Portfolio Drawdown" type="number" value={config.maxPortfolioDrawdown} onChange={handleChange('maxPortfolioDrawdown')} unit="%" helpText="Halt all trading if portfolio drops this % from peak" />
            <InputField label="Max Daily Loss" type="number" value={config.maxDailyLoss} onChange={handleChange('maxDailyLoss')} unit="$" helpText="Hard cap on daily losses; triggers auto-stop" />
            <InputField label="Max Weekly Loss" type="number" value={config.maxWeeklyLoss} onChange={handleChange('maxWeeklyLoss')} unit="$" helpText="Hard cap on weekly losses" />
            <InputField label="Max Adverse Excursion (MAE) Limit" type="number" value={config.maxAdverseExcursion} onChange={handleChange('maxAdverseExcursion')} unit="%" helpText="Max intra-trade loss before force-close regardless of SL" />
            <SelectField label="Exposure Netting Mode" value={config.exposureNettingMode} onChange={handleChange('exposureNettingMode')} helpText="How to calculate total exposure across correlated positions">
                <option value="Gross">Gross</option>
                <option value="Net">Net</option>
                <option value="Delta-Adjusted">Delta-Adjusted</option>
            </SelectField>
            <InputField label="Max Volatility Filter (ATR)" type="number" value={config.maxVolatilityFilter} onChange={handleChange('maxVolatilityFilter')} unit="$" helpText="Reject trades if ATR volatility exceeds this threshold" />
            <InputField label="Correlation Check Lookback Window" type="text" value={config.correlationCheckLookbackWindow} onChange={handleChange('correlationCheckLookbackWindow')} placeholder="30 Days / 60 Mins" helpText="Time window for calculating asset correlation" />
            <InputField label="Leverage" type="number" value={config.leverage} onChange={handleChange('leverage')} min="1" max="125" />
            <SelectField label="Margin Mode" value={config.marginMode} onChange={handleChange('marginMode')}>
                <option value="Isolated">Isolated</option>
                <option value="Cross">Cross</option>
            </SelectField>
        </div>
    );

    const complianceContent = (
        <div className="space-y-4">
            <SelectField label="Audit Log Verbosity Level" value={config.auditLogVerbosity} onChange={handleChange('auditLogVerbosity')} helpText="Level of detail logged for every action">
                <option value="Minimal">Minimal</option>
                <option value="Standard">Standard</option>
                <option value="Detailed">Detailed</option>
                <option value="Full">Full (Required for Institutional Audits)</option>
            </SelectField>
            <InputField label="Asset Whitelist" type="text" value={config.assetWhitelist} onChange={handleChange('assetWhitelist')} placeholder="BTC,ETH,SOL,BNB (comma-separated)" helpText="Pre-approved assets authorized for trading" />
            <InputField label="Time-of-Day Trading Window" type="text" value={config.timeOfDayTradingWindow} onChange={handleChange('timeOfDayTradingWindow')} placeholder="09:30-16:00 EST" helpText="Authorized trading hours for new orders" />
            <InputField label="Market Data Tolerance" type="number" value={config.marketDataTolerance} onChange={handleChange('marketDataTolerance')} unit="%" helpText="Max allowed deviation of current market price from signal price" />
            <InputField label="Order/Trade Ratio Limit" type="number" value={config.orderTradeRatioLimit} onChange={handleChange('orderTradeRatioLimit')} helpText="Max ratio of orders placed to trades executed (MiFID II/SEC Rule 15c3-5)" />
            <InputField label="Strategy Version Lock" type="text" value={config.strategyVersionLock} onChange={handleChange('strategyVersionLock')} placeholder="v3.1.2_QC" helpText="Locks bot to specific auditable strategy version" />
            <InputField label="Trade Identifier Tag" type="text" value={config.tradeIdentifierTag} onChange={handleChange('tradeIdentifierTag')} placeholder="ACCT123_SIGNALBOT_Q1" helpText="Unique tag for regulatory reporting (CAT/MiFID II)" />
            <InputField label="Min. Exchange Liquidity" type="number" value={config.minExchangeLiquidity} onChange={handleChange('minExchangeLiquidity')} unit="$" helpText="Minimum 24h trading volume required to trade an asset" />
            <InputField label="Post-Trade Compliance Delay" type="number" value={config.postTradeComplianceDelay} onChange={handleChange('postTradeComplianceDelay')} unit="ms" helpText="Delay after fill before accepting new signals" />
            <InputField label="Audit Log Retention Period" type="number" value={config.auditLogRetentionPeriod} onChange={handleChange('auditLogRetentionPeriod')} unit="days" helpText="Minimum required audit log storage period (e.g., 1825 for 5 years)" />
        </div>
    );

    const monitoringContent = (
        <div className="space-y-4">
            <InputField label="Data Feed Latency Threshold" type="number" value={config.dataFeedLatencyThreshold} onChange={handleChange('dataFeedLatencyThreshold')} unit="ms" helpText="Pause trading if market data is older than this" />
            <InputField label="Max API Request Rate (per min)" type="number" value={config.maxAPIRequestRate} onChange={handleChange('maxAPIRequestRate')} helpText="Limit orders/cancellations to avoid rate-limiting" />
            <InputField label="Emergency Kill Switch API Key" type="password" value={config.emergencyKillSwitchKey} onChange={handleChange('emergencyKillSwitchKey')} placeholder="Enter emergency key" helpText="Secondary key to instantly cancel all orders and close positions" />
            <SelectField label="P&L Reporting Frequency" value={config.pnlReportingFrequency} onChange={handleChange('pnlReportingFrequency')} helpText="How often to calculate and report P&L metrics">
                <option value="Real-Time">Real-Time</option>
                <option value="1min">1 Minute</option>
                <option value="5min">5 Minutes</option>
                <option value="EOD">End of Day</option>
            </SelectField>
            <SelectField label="Circuit Breaker Response" value={config.circuitBreakerResponse} onChange={handleChange('circuitBreakerResponse')} helpText="Bot's automated response when circuit breaker is triggered">
                <option value="Cancel All">Cancel All Orders</option>
                <option value="Pause New">Pause New Orders</option>
                <option value="Reduce-Only">Reduce-Only Mode</option>
            </SelectField>
            <InputField label="External Risk System Heartbeat Timeout" type="number" value={config.externalRiskSystemHeartbeatTimeout} onChange={handleChange('externalRiskSystemHeartbeatTimeout')} unit="seconds" helpText="Max time gap since last risk system heartbeat before pause" />
            <InputField label="Vendor Signal License Key" type="password" value={config.vendorSignalLicenseKey} onChange={handleChange('vendorSignalLicenseKey')} placeholder="Enter license key" helpText="Token required to decrypt/validate signal provider's feed" />
        </div>
    );

    const advancedContent = (
        <div className="space-y-4">
            <InputField label="Strategy Confidence Score Threshold (0.0-1.0)" type="number" value={config.strategyConfidenceScoreThreshold} onChange={handleChange('strategyConfidenceScoreThreshold')} min="0" max="1" step="0.01" helpText="Only execute if strategy's live performance score exceeds this" />
            <InputField label="Out-of-Sample Failure Threshold" type="number" value={config.outOfSampleFailureThreshold} onChange={handleChange('outOfSampleFailureThreshold')} helpText="Consecutive trade failures before forcing paper-trading mode" />
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-2">Required Data Fields</label>
                <div className="grid grid-cols-2 gap-2">
                    {['Asset', 'Action', 'Price', 'Stop-Loss', 'Timestamp', 'Context ID'].map((field) => (
                        <label key={field} className="flex items-center space-x-2 text-sm">
                            <input
                                type="checkbox"
                                checked={config.requiredDataFields.includes(field)}
                                onChange={(e) => {
                                    const newFields = e.target.checked
                                        ? [...config.requiredDataFields, field]
                                        : config.requiredDataFields.filter(f => f !== field);
                                    onConfigChange({ ...config, requiredDataFields: newFields });
                                }}
                                className="rounded text-primary focus:ring-primary"
                            />
                            <span className="text-gray-700 dark:text-dark-text-secondary">{field}</span>
                        </label>
                    ))}
                </div>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Mandatory fields in signal message; reject if any missing</p>
            </div>
        </div>
    );

    const tabs = [
        { id: 'basic', label: 'Basic Signal', content: basicSignalContent },
        { id: 'execution', label: 'Execution', content: executionContent },
        { id: 'risk', label: 'Risk & Limits', content: riskContent },
        { id: 'compliance', label: 'Compliance', content: complianceContent },
        { id: 'monitoring', label: 'Monitoring', content: monitoringContent },
        { id: 'advanced', label: 'Advanced', content: advancedContent }
    ];

    return (
        <StrategyConfigPanelLayout
            title="Signal Bot Configuration"
            activeTab={activeTab}
            tabs={tabs}
            onTabChange={setActiveTab}
            onSave={onSave}
            onSaveTemplate={onSaveTemplate}
        />
    );
};

export default SignalBotConfigPanel;
