import React, { useState } from 'react';
import { TradingViewWebhookConfig } from '../../types';
import StrategyConfigPanelLayout from '../StrategyConfigPanelLayout';
import ToggleSwitch from '../ToggleSwitch';

const InputField: React.FC<{ label: string, type?: string, value: any, onChange: (e: any) => void, unit?: string, helpText?: string }> = ({ label, type = 'text', value, onChange, unit, helpText }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
        <div className="flex items-center gap-2">
            <input type={type} value={value} onChange={onChange} className="flex-1 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg shadow-sm px-3 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-colors" />
            {unit && <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap text-sm font-medium">{unit}</span>}
        </div>
        {helpText && <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{helpText}</p>}
    </div>
);

const SelectField: React.FC<{ label: string, value: any, onChange: (e: any) => void, children?: React.ReactNode, helpText?: string }> = ({ label, value, onChange, children, helpText }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
        <select value={value} onChange={onChange} className="w-full bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg shadow-sm px-3 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-colors">
            {children}
        </select>
        {helpText && <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{helpText}</p>}
    </div>
);

const MarketTypeSelector: React.FC<{ value: 'SPOT' | 'FUTURES'; onChange: (value: 'SPOT' | 'FUTURES') => void; }> = ({ value, onChange }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-2">Market Type</label>
        <div className="flex w-full bg-gray-100 dark:bg-dark-bg-secondary rounded-lg p-1">
            <button onClick={() => onChange('SPOT')} className={`w-full py-1.5 text-sm font-semibold rounded-md transition-colors ${value === 'SPOT' ? 'bg-white dark:bg-primary shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>SPOT</button>
            <button onClick={() => onChange('FUTURES')} className={`w-full py-1.5 text-sm font-semibold rounded-md transition-colors ${value === 'FUTURES' ? 'bg-white dark:bg-primary shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>FUTURES</button>
        </div>
    </div>
);

interface TradingViewWebhookConfigPanelProps {
    config: TradingViewWebhookConfig;
    onConfigChange: (newConfig: TradingViewWebhookConfig) => void;
    onSave: () => void;
    onSaveTemplate: () => void;
}

const TradingViewWebhookConfigPanel: React.FC<TradingViewWebhookConfigPanelProps> = ({ config, onConfigChange, onSave, onSaveTemplate }) => {
    const [activeTab, setActiveTab] = useState('core');

    const handleChange = (field: keyof TradingViewWebhookConfig) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | 'SPOT' | 'FUTURES') => {
        const value = e === 'SPOT' || e === 'FUTURES'
            ? e
            : e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
        onConfigChange({ ...config, [field]: value });
    };

    const coreLogicContent = (
        <div className="space-y-4">
            <MarketTypeSelector value={config.marketType} onChange={handleChange('marketType')} />
            <InputField label="Webhook URL" type="text" value={config.webhookURL} onChange={handleChange('webhookURL')} helpText="Endpoint for receiving TradingView alerts" />
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Alert Parser (JSON Template)</label>
                <textarea
                    value={config.alertParser}
                    onChange={handleChange('alertParser')}
                    className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary text-sm font-mono"
                    rows={3}
                    placeholder='{"action": "{{strategy.order.action}}", "ticker": "{{ticker}}"}'
                />
                <p className="mt-1 text-xs text-gray-400">Defines how to extract action, ticker, and size from alerts</p>
            </div>
            <InputField label="Signal Source Trust Score" type="number" value={config.signalSourceTrustScore} onChange={handleChange('signalSourceTrustScore')} unit="(1-10)" helpText="Position sizing weighted by provider reliability" />
            <SelectField label="Position Size Override" value={config.positionSizeOverride} onChange={handleChange('positionSizeOverride')} helpText="Use signal or fixed % of capital">
                <option value="Use Signal">Use Signal</option>
                <option value="Fixed %">Fixed %</option>
            </SelectField>
            {config.positionSizeOverride === 'Fixed %' && (
                <InputField label="Fixed Position Size" type="number" value={config.fixedPositionSize} onChange={handleChange('fixedPositionSize')} unit="%" />
            )}
        </div>
    );

    const riskManagementContent = (
        <div className="space-y-4">
            <InputField label="Maximum Slippage" type="number" value={config.maximumSlippage} onChange={handleChange('maximumSlippage')} unit="%" helpText="Rejects fills worse than this threshold" />
            <InputField label="Daily Loss Limit" type="number" value={config.dailyLossLimit} onChange={handleChange('dailyLossLimit')} unit="%" helpText="Stops trading for 24h after loss limit" />
            <InputField label="Max Drawdown" type="number" value={config.maxDrawdown} onChange={handleChange('maxDrawdown')} unit="%" helpText="Global kill switch trigger" />
            <InputField label="Global Capital Allocation" type="number" value={config.globalCapitalAllocation} onChange={handleChange('globalCapitalAllocation')} unit="%" helpText="Max % of portfolio for this bot" />
            <InputField label="Max Position Leverage" type="number" value={config.maxPositionLeverage} onChange={handleChange('maxPositionLeverage')} unit="x" helpText="Caps leverage even if signal specifies higher" />
            <InputField label="Take Profit Percentage" type="number" value={config.takeProfitPercentage} onChange={handleChange('takeProfitPercentage')} unit="%" />
            <InputField label="Stop Loss Percentage" type="number" value={config.stopLossPercentage} onChange={handleChange('stopLossPercentage')} unit="%" />
            <InputField label="Trailing Stop Activation" type="number" value={config.trailingStopActivation} onChange={handleChange('trailingStopActivation')} unit="%" helpText="Profit % to activate trailing stop" />
        </div>
    );

    const executionContent = (
        <div className="space-y-4">
            <SelectField label="Order Type Default" value={config.orderTypeDefault} onChange={handleChange('orderTypeDefault')} helpText="Type used if signal doesn't specify">
                <option value="Market">Market</option>
                <option value="Limit">Limit</option>
                <option value="Post Only Limit">Post Only Limit</option>
            </SelectField>
            <InputField label="Order Timeout" type="number" value={config.orderTimeout} onChange={handleChange('orderTimeout')} unit="seconds" helpText="Cancel if not filled within time limit" />
            <InputField label="Max Open Positions" type="number" value={config.maxOpenPositions} onChange={handleChange('maxOpenPositions')} unit="positions" />
            <InputField label="Minimum Position Size" type="number" value={config.minimumPositionSize} onChange={handleChange('minimumPositionSize')} unit="USDT" helpText="Rejects signals below exchange minimum" />
            <InputField label="Daily Trade Count Limit" type="number" value={config.dailyTradeCountLimit} onChange={handleChange('dailyTradeCountLimit')} unit="trades" helpText="Prevents over-trading" />
            <InputField label="Cooldown Period" type="number" value={config.cooldownPeriod} onChange={handleChange('cooldownPeriod')} unit="seconds" helpText="Per-ticker re-entry delay after exit" />
            <SelectField label="Partial Fill Handling" value={config.partialFillHandling} onChange={handleChange('partialFillHandling')}>
                <option value="Cancel Remainder">Cancel Remainder</option>
                <option value="Wait for Fill">Wait for Fill</option>
            </SelectField>
        </div>
    );

    const complianceContent = (
        <div className="space-y-4">
            <SelectField label="Log Level" value={config.logLevel} onChange={handleChange('logLevel')} helpText="Verbosity of internal logging">
                <option value="Info">Info</option>
                <option value="Debug">Debug</option>
                <option value="Error">Error</option>
            </SelectField>
            <InputField label="Strategy Tag/ID" type="text" value={config.strategyTagID} onChange={handleChange('strategyTagID')} helpText="Unique identifier for tracking" />
            <InputField label="Ignore Tickers List" type="text" value={config.ignoreTickersList} onChange={handleChange('ignoreTickersList')} helpText="Comma-separated blacklist (e.g., BTC/USDT,ETH/USDT)" />
            <InputField label="Whitelisted IP Addresses" type="text" value={config.whitelistedIPAddresses} onChange={handleChange('whitelistedIPAddresses')} helpText="Only accept alerts from these IPs" />
            <InputField label="Max Trade Fee Percentage" type="number" value={config.maxTradeFeePercentage} onChange={handleChange('maxTradeFeePercentage')} unit="%" helpText="Rejects trades with fees exceeding limit" />
            <InputField label="Minimum Profit Target" type="number" value={config.minimumProfitTarget} onChange={handleChange('minimumProfitTarget')} unit="$" helpText="Ensures trades are financially viable" />
        </div>
    );

    const operationalContent = (
        <div className="space-y-3">
            <SelectField label="Execution Environment" value={config.executionEnvironment} onChange={handleChange('executionEnvironment')}>
                <option value="Live Trading">Live Trading</option>
                <option value="Paper Trading">Paper Trading</option>
            </SelectField>
            <InputField label="Max Exchange API Rate Usage" type="number" value={config.maxExchangeAPIRateUsage} onChange={handleChange('maxExchangeAPIRateUsage')} unit="%" helpText="Soft throttle to prevent connectivity issues" />
            <InputField label="Exchange Time Offset" type="number" value={config.exchangeTimeOffset} onChange={handleChange('exchangeTimeOffset')} unit="ms" helpText="Accounts for clock drift" />
            <InputField label="Confirmation Webhook URL" type="text" value={config.confirmationWebhookURL} onChange={handleChange('confirmationWebhookURL')} helpText="Optional endpoint for trade confirmations" />
            <SelectField label="Webhook Retry Mechanism" value={config.webhookRetryMechanism} onChange={handleChange('webhookRetryMechanism')}>
                <option value="Exponential Backoff">Exponential Backoff</option>
                <option value="Fixed Delay">Fixed Delay</option>
            </SelectField>
            <InputField label="Time Zone Setting" type="text" value={config.timeZoneSetting} onChange={handleChange('timeZoneSetting')} helpText="e.g., America/New_York, UTC" />
        </div>
    );

    const adaptiveContent = (
        <div className="space-y-3">
            <SelectField label="Account Mode" value={config.accountMode} onChange={handleChange('accountMode')}>
                <option value="Single">Single Account</option>
                <option value="Master/Sub-Account">Master/Sub-Account</option>
            </SelectField>
            {config.marketType === 'FUTURES' && (
                <>
                    <InputField label="Leverage" type="number" value={config.leverage} onChange={handleChange('leverage')} unit="x" />
                    <SelectField label="Margin Mode" value={config.marginMode} onChange={handleChange('marginMode')}>
                        <option value="Isolated">Isolated</option>
                        <option value="Cross">Cross</option>
                    </SelectField>
                </>
            )}
        </div>
    );

    const tabs = [
        { id: 'core', label: 'Core Logic', content: coreLogicContent },
        { id: 'risk', label: 'Risk Management', content: riskManagementContent },
        { id: 'execution', label: 'Execution', content: executionContent },
        { id: 'compliance', label: 'Compliance', content: complianceContent },
        { id: 'operational', label: 'Operational', content: operationalContent },
        { id: 'adaptive', label: 'Advanced', content: adaptiveContent },
    ];

    return (
        <StrategyConfigPanelLayout
            title="Configure TradingView Webhook Bot"
            activeTab={activeTab}
            tabs={tabs}
            onTabChange={setActiveTab}
            onSave={onSave}
            onSaveTemplate={onSaveTemplate}
        />
    );
};

export default TradingViewWebhookConfigPanel;
