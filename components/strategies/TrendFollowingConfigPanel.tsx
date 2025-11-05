import React from 'react';
import { TrendFollowingConfig } from '../../types';
import Card from '../Card';
import ToggleSwitch from '../ToggleSwitch';

const InputField: React.FC<{ label: string, type?: string, value: any, onChange: (e: any) => void, unit?: string, helpText?: string }> = ({ label, type = 'text', value, onChange, unit, helpText }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary">{label}</label>
        <div className="mt-1 flex items-center">
            <input type={type} value={value} onChange={onChange} className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
            {unit && <span className="ml-2 text-gray-500 dark:text-dark-text-secondary whitespace-nowrap">{unit}</span>}
        </div>
        {helpText && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{helpText}</p>}
    </div>
);

const SelectField: React.FC<{ label: string, value: any, onChange: (e: any) => void, children?: React.ReactNode }> = ({ label, value, onChange, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">{label}</label>
        <select value={value} onChange={onChange} className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary">
            {children}
        </select>
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
    <div className="mb-6">
        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-2">Market Type</label>
        <div className="flex w-full bg-gray-100 dark:bg-dark-bg-secondary rounded-lg p-1">
            <button onClick={() => onChange('SPOT')} className={`w-full py-1.5 text-sm font-semibold rounded-md transition-colors ${value === 'SPOT' ? 'bg-white dark:bg-primary shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>SPOT</button>
            <button onClick={() => onChange('FUTURES')} className={`w-full py-1.5 text-sm font-semibold rounded-md transition-colors ${value === 'FUTURES' ? 'bg-white dark:bg-primary shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>FUTURES</button>
        </div>
    </div>
);

interface TrendFollowingConfigPanelProps {
    config: TrendFollowingConfig;
    onConfigChange: (newConfig: TrendFollowingConfig) => void;
    onSave: () => void;
    onSaveTemplate: () => void;
}

const TrendFollowingConfigPanel: React.FC<TrendFollowingConfigPanelProps> = ({ config, onConfigChange, onSave, onSaveTemplate }) => {
    const handleChange = (field: keyof TrendFollowingConfig) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | boolean | 'SPOT' | 'FUTURES') => {
        const value = typeof e === 'boolean' || e === 'SPOT' || e === 'FUTURES'
            ? e
            : e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
        onConfigChange({ ...config, [field]: value });
    };

    return (
        <Card>
            <h3 className="text-lg font-bold mb-4">Configure Trend-Following Bot</h3>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-4">EMA Crossover strategy with ATR-based filters and trailing stops</p>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <MarketTypeSelector value={config.marketType} onChange={handleChange('marketType')} />
                
                <InputField label="Fast EMA Period" type="number" value={config.fastEMAPeriod} onChange={handleChange('fastEMAPeriod')} unit="periods" helpText="Short-term EMA (e.g., 12)" />
                <InputField label="Slow EMA Period" type="number" value={config.slowEMAPeriod} onChange={handleChange('slowEMAPeriod')} unit="periods" helpText="Long-term EMA (e.g., 26)" />
                
                <InputField label="ATR Period" type="number" value={config.atrPeriod} onChange={handleChange('atrPeriod')} unit="periods" helpText="Average True Range lookback" />
                <InputField label="ATR Multiplier" type="number" value={config.atrMultiplier} onChange={handleChange('atrMultiplier')} unit="x" helpText="Volatility filter threshold" />
                
                <InputField label="Position Size" type="number" value={config.positionSize} onChange={handleChange('positionSize')} unit="%" helpText="% of capital per trade" />
                
                <InputField label="Stop Loss (ATR Multiple)" type="number" value={config.stopLossATRMultiplier} onChange={handleChange('stopLossATRMultiplier')} unit="x ATR" helpText="Dynamic SL based on volatility" />
                <InputField label="Take Profit (ATR Multiple)" type="number" value={config.takeProfitATRMultiplier} onChange={handleChange('takeProfitATRMultiplier')} unit="x ATR" helpText="Dynamic TP based on volatility" />
                
                <ToggleField label="Trailing Stop Enabled" enabled={config.trailingStopEnabled} onChange={handleChange('trailingStopEnabled')} helpText="Lock in profits as trend continues" />
                
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
            <div className="mt-6 flex gap-3">
                <button onClick={onSaveTemplate} className="flex-1 py-2 text-sm font-semibold text-gray-700 dark:text-dark-text-secondary bg-gray-100 dark:bg-dark-bg-secondary rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                    Save as Template
                </button>
                <button onClick={onSave} className="flex-1 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover">
                    Save & Start Bot
                </button>
            </div>
        </Card>
    );
};

export default TrendFollowingConfigPanel;
