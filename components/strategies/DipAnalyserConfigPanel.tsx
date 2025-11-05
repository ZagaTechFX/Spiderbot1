import React, { useState } from 'react';
import { DipAnalyserConfig } from '../../types';
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

const ToggleField: React.FC<{ label: string, enabled: boolean, onChange: (val: boolean) => void, helpText?: string }> = ({ label, enabled, onChange, helpText }) => (
    <div>
        <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">{label}</label>
            <ToggleSwitch enabled={enabled} onChange={onChange} />
        </div>
        {helpText && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{helpText}</p>}
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

interface DipAnalyserConfigPanelProps {
    config: DipAnalyserConfig;
    onConfigChange: (newConfig: DipAnalyserConfig) => void;
    onSave: () => void;
    onSaveTemplate: () => void;
}

const DipAnalyserConfigPanel: React.FC<DipAnalyserConfigPanelProps> = ({ config, onConfigChange, onSave, onSaveTemplate }) => {
    const [activeTab, setActiveTab] = useState('core');

    const handleChange = (field: keyof DipAnalyserConfig) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | boolean | 'SPOT' | 'FUTURES') => {
        const value = typeof e === 'boolean' || e === 'SPOT' || e === 'FUTURES'
            ? e
            : e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
        onConfigChange({ ...config, [field]: value });
    };

    const handleComponentChange = (component: keyof DipAnalyserConfig['dipScoreComponents']) => (enabled: boolean) => {
        onConfigChange({
            ...config,
            dipScoreComponents: {
                ...config.dipScoreComponents,
                [component]: enabled
            }
        });
    };

    const coreLogicContent = (
        <div className="space-y-4">
            <MarketTypeSelector value={config.marketType} onChange={handleChange('marketType')} />
            
            <div className="border dark:border-dark-border rounded-lg p-3 bg-gray-50 dark:bg-dark-bg-secondary">
                <label className="block text-sm font-medium mb-2 dark:text-white">Dip Score Components (Signal Weighting)</label>
                <div className="space-y-2">
                    <ToggleField label="RSI Divergence" enabled={config.dipScoreComponents.rsiDivergence} onChange={handleComponentChange('rsiDivergence')} />
                    <ToggleField label="Volume Spike" enabled={config.dipScoreComponents.volumeSpike} onChange={handleComponentChange('volumeSpike')} />
                    <ToggleField label="Price Level Test" enabled={config.dipScoreComponents.priceLevelTest} onChange={handleComponentChange('priceLevelTest')} />
                </div>
            </div>

            <InputField label="Score Threshold" type="number" value={config.scoreThreshold} onChange={handleChange('scoreThreshold')} unit="(0-100)" helpText="Minimum weighted score to confirm buy signal" />
            <InputField label="Minimum Dip Depth" type="number" value={config.minimumDipDepth} onChange={handleChange('minimumDipDepth')} unit="%" helpText="Required % drop from recent high" />
            <SelectField label="Timeframe for Analysis" value={config.timeframeForAnalysis} onChange={handleChange('timeframeForAnalysis')} helpText="Lookback period for 'recent high'">
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
                <option value="1D">1 Day</option>
            </SelectField>
            <SelectField label="Buy Aggression" value={config.buyAggression} onChange={handleChange('buyAggression')} helpText="Order execution speed">
                <option value="Conservative">Conservative (Limit Orders)</option>
                <option value="Moderate">Moderate</option>
                <option value="Aggressive">Aggressive (Market Orders)</option>
            </SelectField>
            <InputField label="Recovery Confirmation Filter" type="number" value={config.recoveryConfirmationFilter} onChange={handleChange('recoveryConfirmationFilter')} unit="%" helpText="% recovery before buy (prevents falling knife)" />
        </div>
    );

    const riskManagementContent = (
        <div className="space-y-4">
            <InputField label="Quick Profit Target" type="number" value={config.quickProfitTarget} onChange={handleChange('quickProfitTarget')} unit="%" helpText="Exit trap for initial bounce" />
            <ToggleField label="Progressive Stop" enabled={config.progressiveStop} onChange={handleChange('progressiveStop')} helpText="Lock in profits after quick profit hit" />
            {config.progressiveStop && (
                <InputField label="Progressive Stop Percentage" type="number" value={config.progressiveStopPercentage} onChange={handleChange('progressiveStopPercentage')} unit="%" />
            )}
            <InputField label="Maximum Concurrent Dips" type="number" value={config.maximumConcurrentDips} onChange={handleChange('maximumConcurrentDips')} unit="trades" helpText="Limit simultaneous dip trades" />
            <ToggleField label="Forced Accumulation Mode" enabled={config.forcedAccumulationMode} onChange={handleChange('forcedAccumulationMode')} helpText="Hard-lock to prevent sell orders" />
            <InputField label="Max Loss from Average Entry" type="number" value={config.maxLossFromAverageEntry} onChange={handleChange('maxLossFromAverageEntry')} unit="%" helpText="Strategy failsafe trigger" />
            <InputField label="Asset Allocation Hard Cap" type="number" value={config.assetAllocationHardCap} onChange={handleChange('assetAllocationHardCap')} unit="%" helpText="Max % of portfolio for this asset" />
            <InputField label="Portfolio Hedge Ratio Adjustment" type="number" value={config.portfolioHedgeRatioAdjustment} onChange={handleChange('portfolioHedgeRatioAdjustment')} unit="Δ" helpText="Delta offset for risk" />
        </div>
    );

    const executionContent = (
        <div className="space-y-4">
            <InputField label="Execution Slice Size" type="number" value={config.executionSliceSize} onChange={handleChange('executionSliceSize')} unit="$" helpText="Stealth trading - break into slices" />
            <InputField label="TWAP Horizon" type="number" value={config.twapHorizon} onChange={handleChange('twapHorizon')} unit="minutes" helpText="Time-weighted average price distribution" />
            <InputField label="Max Cumulative Slippage" type="number" value={config.maxCumulativeSlippage} onChange={handleChange('maxCumulativeSlippage')} unit="%" helpText="Per DCA tranche cost control" />
            <InputField label="DCA Tranche Size Multiplier" type="number" value={config.dcaTrancheSizeMultiplier} onChange={handleChange('dcaTrancheSizeMultiplier')} unit="x ATR" helpText="Risk-adjusted sizing based on volatility" />
            <ToggleField label="DCA Profit Exit Threshold" enabled={config.dcaProfitExitThreshold} onChange={handleChange('dcaProfitExitThreshold')} helpText="Selective profit-taking on latest tranche" />
            {config.dcaProfitExitThreshold && (
                <InputField label="DCA Profit Exit Percentage" type="number" value={config.dcaProfitExitPercentage} onChange={handleChange('dcaProfitExitPercentage')} unit="%" />
            )}
            <InputField label="Volume Participation Rate" type="number" value={config.volumeParticipationRate} onChange={handleChange('volumeParticipationRate')} unit="%" helpText="Market impact control" />
            <InputField label="Time-Based Dip Invalidation" type="number" value={config.timeBasedDipInvalidation} onChange={handleChange('timeBasedDipInvalidation')} unit="minutes" helpText="Stale signal timeout" />
        </div>
    );

    const complianceContent = (
        <div className="space-y-4">
            <ToggleField label="Liquidity Sweep Requirement" enabled={config.liquiditySweepRequirement} onChange={handleChange('liquiditySweepRequirement')} helpText="Smart Money filter - require stop sweep" />
            <InputField label="FVG Retracement Percentage" type="number" value={config.fvgRetracementPercentage} onChange={handleChange('fvgRetracementPercentage')} unit="% gap" helpText="Fair Value Gap anchor" />
            <InputField label="Order Block Proximity Filter" type="number" value={config.orderBlockProximityFilter} onChange={handleChange('orderBlockProximityFilter')} unit="x ATR" helpText="Demand zone entry distance" />
            <InputField label="Max Order Book Skew" type="number" value={config.maxOrderBookSkew} onChange={handleChange('maxOrderBookSkew')} unit="%" helpText="Liquidity/manipulation filter" />
            <InputField label="Min Asset Holding Quantity" type="number" value={config.minAssetHoldingQuantity} onChange={handleChange('minAssetHoldingQuantity')} helpText="Accumulation lock minimum" />
            <SelectField label="API Permission Validation" value={config.apiPermissionValidation} onChange={handleChange('apiPermissionValidation')}>
                <option value="Read-Only">Read-Only</option>
                <option value="Read/Trade">Read/Trade</option>
                <option value="Full">Full (Not Recommended)</option>
            </SelectField>
        </div>
    );

    const operationalContent = (
        <div className="space-y-3">
            <InputField label="Bot Health Check Interval" type="number" value={config.botHealthCheckInterval} onChange={handleChange('botHealthCheckInterval')} unit="minutes" helpText="Self-diagnostic frequency" />
            <ToggleField label="Auto-Pause on News Event" enabled={config.autoPauseOnNewsEvent} onChange={handleChange('autoPauseOnNewsEvent')} helpText="Halt trading around high-impact news" />
            {config.autoPauseOnNewsEvent && (
                <SelectField label="News Event Severity" value={config.newsEventSeverity} onChange={handleChange('newsEventSeverity')}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </SelectField>
            )}
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

    const adaptiveContent = (
        <div className="space-y-3">
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary italic">Advanced institutional-grade controls for professional traders</p>
        </div>
    );

    const tabs = [
        { id: 'core', label: 'Core Logic', content: coreLogicContent },
        { id: 'risk', label: 'Risk Management', content: riskManagementContent },
        { id: 'execution', label: 'Execution & TWAP', content: executionContent },
        { id: 'compliance', label: 'SMC & Compliance', content: complianceContent },
        { id: 'operational', label: 'Operational', content: operationalContent },
        { id: 'adaptive', label: 'Advanced', content: adaptiveContent },
    ];

    return (
        <StrategyConfigPanelLayout
            title="Configure Dip Analyser Bot"
            activeTab={activeTab}
            tabs={tabs}
            onTabChange={setActiveTab}
            onSave={onSave}
            onSaveTemplate={onSaveTemplate}
        />
    );
};

export default DipAnalyserConfigPanel;
