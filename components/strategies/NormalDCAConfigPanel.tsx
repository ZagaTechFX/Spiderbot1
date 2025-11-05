import React from 'react';
import { NormalDCAConfig } from '../../types';
import Card from '../Card';

const InputField: React.FC<{ label: string, type?: string, value: any, onChange: (e: any) => void, unit?: string }> = ({ label, type = 'text', value, onChange, unit }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary">{label}</label>
        <div className="mt-1 flex items-center">
            <input type={type} value={value} onChange={onChange} className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
            {unit && <span className="ml-2 text-gray-500 dark:text-dark-text-secondary whitespace-nowrap">{unit}</span>}
        </div>
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

const MarketTypeSelector: React.FC<{ value: 'SPOT' | 'FUTURES'; onChange: (value: 'SPOT' | 'FUTURES') => void; }> = ({ value, onChange }) => (
    <div className="mb-6">
        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-2">Market Type</label>
        <div className="flex w-full bg-gray-100 dark:bg-dark-bg-secondary rounded-lg p-1">
            <button onClick={() => onChange('SPOT')} className={`w-full py-1.5 text-sm font-semibold rounded-md transition-colors ${value === 'SPOT' ? 'bg-white dark:bg-primary shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>SPOT</button>
            <button onClick={() => onChange('FUTURES')} className={`w-full py-1.5 text-sm font-semibold rounded-md transition-colors ${value === 'FUTURES' ? 'bg-white dark:bg-primary shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>FUTURES</button>
        </div>
    </div>
);

interface NormalDCAConfigPanelProps {
    config: NormalDCAConfig;
    onConfigChange: (newConfig: NormalDCAConfig) => void;
    onSave: () => void;
    onSaveTemplate: () => void;
}

const NormalDCAConfigPanel: React.FC<NormalDCAConfigPanelProps> = ({ config, onConfigChange, onSave, onSaveTemplate }) => {
    const handleChange = (field: keyof NormalDCAConfig) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | 'SPOT' | 'FUTURES') => {
        const value = e === 'SPOT' || e === 'FUTURES'
            ? e
            : e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
        onConfigChange({ ...config, [field]: value });
    };

    return (
        <Card>
            <h3 className="text-lg font-bold mb-4">Configure Normal DCA Bot</h3>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <MarketTypeSelector value={config.marketType} onChange={handleChange('marketType')} />
                
                <InputField label="Initial Buy Amount" type="number" value={config.initialBuy} onChange={handleChange('initialBuy')} unit="USDT" />
                <InputField label="Buy-In Callback" type="number" value={config.buyInCallback} onChange={handleChange('buyInCallback')} unit="%" />
                <InputField label="Take Profit Percentage" type="number" value={config.takeProfitPercentage} onChange={handleChange('takeProfitPercentage')} unit="%" />
                
                <InputField label="Safety Order Count" type="number" value={config.safetyOrderCount} onChange={handleChange('safetyOrderCount')} unit="orders" />
                <InputField label="Safety Order Step" type="number" value={config.safetyOrderStepPercentage} onChange={handleChange('safetyOrderStepPercentage')} unit="%" />
                <InputField label="Safety Order Volume Multiplier" type="number" value={config.safetyOrderVolumeMultiplier} onChange={handleChange('safetyOrderVolumeMultiplier')} unit="x" />
                
                <InputField label="Stop Loss Percentage" type="number" value={config.stopLossPercentage} onChange={handleChange('stopLossPercentage')} unit="%" />
                
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

export default NormalDCAConfigPanel;
