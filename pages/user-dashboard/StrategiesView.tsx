
import React, { useState, useContext } from 'react';
import Card from '../../components/Card';
import ToggleSwitch from '../../components/ToggleSwitch';
import { UserStrategy, StrategyTemplate, DcaConfig, GridConfig, AlgoStrategyConfig, CandlestickData, StrategyType, NormalGridConfig, NormalDCAConfig, TrendFollowingConfig, MeanReversionConfig, VolatilityBreakoutConfig, TradingViewWebhookConfig, DipAnalyserConfig, SignalBotConfig, UTCTimestamp } from '../../types';
import Icon from '../../components/Icon';
import TradingViewWidget from '../../components/TradingViewWidget';
import { ThemeContext } from '../../App';
import NormalGridConfigPanel from '../../components/strategies/NormalGridConfigPanel';
import NormalDCAConfigPanel from '../../components/strategies/NormalDCAConfigPanel';
import TrendFollowingConfigPanel from '../../components/strategies/TrendFollowingConfigPanel';
import MeanReversionConfigPanel from '../../components/strategies/MeanReversionConfigPanel';
import VolatilityBreakoutConfigPanel from '../../components/strategies/VolatilityBreakoutConfigPanel';
import TradingViewWebhookConfigPanel from '../../components/strategies/TradingViewWebhookConfigPanel';
import DipAnalyserConfigPanel from '../../components/strategies/DipAnalyserConfigPanel';
import SignalBotConfigPanel from '../../components/strategies/SignalBotConfigPanel';

// --- MOCK DATA ---
const mockUserStrategies: UserStrategy[] = [
    { id: 'us-1', name: 'BTC Aggressive DCA', type: 'Advanced DCA', pair: 'BTC/USDT', status: 'Active', pnl: 125.50, config: { marketType: 'FUTURES', initialBuy: 20, openPositionDoubled: true, marginCallLimit: 10, marginCallDrop: 1.5, multipleBuyRatio: 1.5, wholePositionTPRatio: 1.2, wholePositionTPCallback: 0.2, tpRule: 'Combined TP', timeframe: '4h', startOrderType: 'MARKET', startCondition: 'RSI < 30', buyInCallback: 0.5, tpBasis: '% by Average Price', subPositionTPCallback: 1.5, soScalingType: 'Geometric', maxSOPriceDeviation: 15, maxActiveSOs: 3, soPriceStepMultiplier: 1.3, rebuy: 1.3, rebuyCallbackRatio: 1.3, maxLossSL: 25, trailingSL: true, trailingSLCallback: 2, cooldownPeriod: 4, maxDrawdownLimit: 50, totalUsedUSDT: 1000, maxTradesPerDay: 10, tradingWindowStart: '00:00', tradingWindowEnd: '23:59', reinvestProfit: true, leverage: 5, marginMode: 'Isolated' } },
    { id: 'us-2', name: 'ETH Stable Grid', type: 'Advanced Grid', pair: 'ETH/USDT', status: 'Active', pnl: 88.20, config: { marketType: 'SPOT', rangeType: 'AI_OPTIMIZED', aiModel: 'notebook', analysisPeriod: 90, lowerPrice: 3500, upperPrice: 4000, gridCount: 50, investmentAmount: 2000, gridSpacingType: 'Geometric', startCondition: 'None', pumpProtection: true, timeframeForPumpDump: 15, trailingUp: true, trailingUpPercentage: 2, trailingDown: false, trailingDownPercentage: 2, stopLossTrailing: true, stopLossTrailingPercentage: 5, stopLossPrice: 3300, rangeBreakoutAction: 'Stop Bot', maxInventoryLimit: 0.5, compoundingProfit: true, gridRedeploymentStrategy: 'Auto-Restart New AI', orderDirection: 'Neutral', leverageRatio: 1, marginMode: 'Cross', autoMarginTransfer: false, hedgeGridToggle: false } },
    { id: 'us-3', name: 'SOL Scalper Signals', type: 'Signal Bot', pair: 'SOL/USDT', status: 'Paused', pnl: -15.80, config: {} },
    { id: 'us-4', name: 'BTC Cautious DCA', type: 'Advanced DCA', pair: 'BTC/USDT', status: 'Error', pnl: -45.10, config: { marketType: 'SPOT', initialBuy: 10, openPositionDoubled: false, marginCallLimit: 5, marginCallDrop: 2, multipleBuyRatio: 1.2, wholePositionTPRatio: 2, wholePositionTPCallback: 0.5, tpRule: '1st & last TP', timeframe: '4h', startOrderType: 'LIMIT', startCondition: 'None', buyInCallback: 0.2, tpBasis: '% by Base Order Value', subPositionTPCallback: 2, soScalingType: 'Arithmetic', maxSOPriceDeviation: 20, maxActiveSOs: 2, soPriceStepMultiplier: 1.5, rebuy: 2, rebuyCallbackRatio: 0.5, maxLossSL: 15, trailingSL: false, trailingSLCallback: 5, cooldownPeriod: 24, maxDrawdownLimit: 30, totalUsedUSDT: 500, maxTradesPerDay: 2, tradingWindowStart: '09:00', tradingWindowEnd: '17:00', reinvestProfit: false, leverage: 1, marginMode: 'Cross' } },
];

const strategyMarketplace = [
    { type: 'Advanced DCA', description: 'A robust strategy that averages down your entry price by placing subsequent buy orders if the price moves against you.', icon: 'arrowDown' },
    { type: 'Advanced Grid', description: 'Uses manual or AI-powered ranges to set up a grid of buy and sell orders to profit from volatility.', icon: 'bot' },
    { type: 'Normal Grid', description: 'Simplified grid trading bot with basic upper/lower price range and grid count settings for range-bound markets.', icon: 'bot' },
    { type: 'Normal DCA', description: 'Basic dollar-cost averaging bot with simple safety orders and take profit settings for accumulation strategies.', icon: 'arrowDown' },
    { type: 'Quantitative Strategy', description: 'Deploys advanced algorithmic models like trend-following, mean reversion, or statistical arbitrage.', icon: 'beaker' },
    { type: 'Signal Bot', description: 'Executes trades based on external signals from sources like TradingView, Telegram, or custom APIs with institutional-grade controls.', icon: 'trades' },
    { type: 'TradingView Webhook Bot', description: 'Automated trading bot that receives and executes TradingView alerts via webhook with advanced risk management and execution controls.', icon: 'bell' },
    { type: 'Dip Analyser Bot', description: 'Institutional dip-buying strategy with Smart Money Concepts, structural filters, TWAP execution, and forced accumulation mode.', icon: 'chart' },
    { type: 'Trend-Following Bot', description: 'EMA Crossover strategy with ATR-based filters and trailing stops for capturing sustained market trends.', icon: 'trending' },
    { type: 'Mean Reversion Bot', description: 'Z-Score and RSI-based mean reversion strategy for trading oversold/overbought conditions in ranging markets.', icon: 'activity' },
    { type: 'Volatility Breakout Bot', description: 'Donchian/Keltner channel breakout strategy with time-of-day filters for capturing volatility expansion moves.', icon: 'lightning' },
];

const mockStrategyTemplates: StrategyTemplate[] = [
    { id: 'st-1', name: 'Safe BTC DCA', type: 'Advanced DCA', config: { marketType: 'SPOT', initialBuy: 10, openPositionDoubled: false, marginCallLimit: 5, marginCallDrop: 2, multipleBuyRatio: 1.2, wholePositionTPRatio: 2, wholePositionTPCallback: 0.5, tpRule: '1st & last TP', timeframe: '4h', startOrderType: 'LIMIT', startCondition: 'None', buyInCallback: 0.2, tpBasis: '% by Base Order Value', subPositionTPCallback: 2, soScalingType: 'Arithmetic', maxSOPriceDeviation: 20, maxActiveSOs: 2, soPriceStepMultiplier: 1.5, rebuy: 2, rebuyCallbackRatio: 0.5, maxLossSL: 15, trailingSL: false, trailingSLCallback: 5, cooldownPeriod: 24, maxDrawdownLimit: 30, totalUsedUSDT: 500, maxTradesPerDay: 2, tradingWindowStart: '09:00', tradingWindowEnd: '17:00', reinvestProfit: false, leverage: 1, marginMode: 'Cross' } },
    { id: 'st-2', name: 'Volatile ETH Grid', type: 'Advanced Grid', config: { marketType: 'FUTURES', rangeType: 'Manual', lowerPrice: 3000, upperPrice: 4500, gridCount: 100, investmentAmount: 1500, gridSpacingType: 'Geometric', leverageRatio: 5, stopLossPrice: 2800, orderDirection: 'Long', marginMode: 'Isolated', hedgeGridToggle: true } },
];

// Generate mock candlestick data
const generateCandlestickData = (startTime: number, numPoints: number): CandlestickData[] => {
    let price = 68000;
    let currentTime = startTime;
    const data: CandlestickData[] = [];
    for (let i = 0; i < numPoints; i++) {
        const open = price + (Math.random() - 0.5) * 200;
        const close = open + (Math.random() - 0.5) * 500;
        const high = Math.max(open, close) + Math.random() * 100;
        const low = Math.min(open, close) - Math.random() * 100;
        const value = 1000 + Math.random() * 2000;
        const color = close >= open ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.6)';

        data.push({ time: Math.floor(currentTime / 1000) as UTCTimestamp, open, high, low, close, value, color });
        price = close;
        currentTime += 4 * 60 * 60 * 1000; // 4 hour candles
    }
    return data;
};
const mockCandlestickData = generateCandlestickData(new Date().getTime() - 365 * 24 * 60 * 60 * 1000, 500);

const mockRsiData = mockCandlestickData.map(d => ({
    time: d.time,
    value: 30 + Math.random() * 40,
}));


// --- HELPER COMPONENTS (defined outside to prevent re-renders) ---
const InputField: React.FC<{ label: string, type?: string, value: any, onChange: (e: any) => void, unit?: string, placeholder?: string, helpText?: string }> = ({ label, type = 'text', value, onChange, unit, placeholder, helpText }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary">{label}</label>
        <div className="mt-1 flex items-center">
            <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
            {unit && <span className="ml-2 text-gray-500 dark:text-dark-text-secondary whitespace-nowrap">{unit}</span>}
        </div>
        {helpText && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{helpText}</p>}
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

const SelectField: React.FC<{ label: string, value: any, onChange: (e: any) => void, children?: React.ReactNode }> = ({ label, value, onChange, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">{label}</label>
        <select value={value} onChange={onChange} className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary">
            {children}
        </select>
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <details className="group" open>
        <summary className="text-md font-semibold cursor-pointer py-2 text-gray-700 dark:text-dark-text group-open:border-b dark:border-dark-border mb-4">{title}</summary>
        <div className="space-y-4 animate-fadeIn">{children}</div>
    </details>
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


// --- CONFIGURATION PANELS ---
const DcaBotConfigPanel: React.FC<{ config: DcaConfig; onConfigChange: (newConfig: DcaConfig) => void; onSave: () => void; onSaveTemplate: () => void; }> = ({ config, onConfigChange, onSave, onSaveTemplate }) => {
    
    const handleChange = (field: keyof DcaConfig) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | boolean | 'SPOT' | 'FUTURES') => {
        const value = typeof e === 'boolean' || e === 'SPOT' || e === 'FUTURES'
            ? e 
            : e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
        onConfigChange({ ...config, [field]: value });
    };

    return (
        <Card>
            <h3 className="text-lg font-bold mb-4">Configure Advanced DCA Bot</h3>
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                
                <MarketTypeSelector value={config.marketType} onChange={handleChange('marketType')} />

                <Section title="Entry Logic">
                    <SelectField label="Start Order Type" value={config.startOrderType} onChange={handleChange('startOrderType')}>
                        <option value="MARKET">MARKET (Prioritize Speed)</option>
                        <option value="LIMIT">LIMIT (Prioritize Price)</option>
                    </SelectField>
                    <InputField label="First Buy in amount" type="number" value={config.initialBuy} onChange={handleChange('initialBuy')} unit="USDT" helpText="The initial capital to start the position."/>
                    <ToggleField label="Open position doubled" enabled={config.openPositionDoubled} onChange={handleChange('openPositionDoubled')} />
                    <SelectField label="Timeframe (for Indicators)" value={config.timeframe} onChange={handleChange('timeframe')}>
                        {['1m', '5m', '15m', '1h', '4h', '1d'].map(tf => <option key={tf} value={tf}>{tf}</option>)}
                    </SelectField>
                    <InputField label="Start Condition / Signal" value={config.startCondition} onChange={handleChange('startCondition')} helpText="e.g., RSI < 30, MACD cross, etc. Use 'None' to start immediately." />
                    <InputField label="Buy in callback" type="number" value={config.buyInCallback} onChange={handleChange('buyInCallback')} unit="%" helpText="Trailing buy to optimize entry timing." />
                </Section>
                <Section title="Take Profit">
                    <SelectField label="Take Profit Basis" value={config.tpBasis} onChange={handleChange('tpBasis')}>
                        <option value="% by Average Price">% by Average Price (DCA Default)</option>
                        <option value="% by Base Order Value">% by Base Order Value</option>
                    </SelectField>
                    <InputField label="Whole position take profit" type="number" value={config.wholePositionTPRatio} onChange={handleChange('wholePositionTPRatio')} unit="%" />
                    <InputField label="Whole position TP callback" type="number" value={config.wholePositionTPCallback} onChange={handleChange('wholePositionTPCallback')} unit="%" helpText="Trailing stop for the main profit target."/>
                    <InputField label="Sub-position TP callback" type="number" value={config.subPositionTPCallback} onChange={handleChange('subPositionTPCallback')} unit="%" helpText="Trailing stop for individual safety orders." />
                    <SelectField label="Set TP Rules" value={config.tpRule} onChange={handleChange('tpRule')}>
                        {['Combined TP', '1st & last TP', 'TP all'].map(rule => <option key={rule} value={rule}>{rule}</option>)}
                    </SelectField>
                </Section>
                <Section title="Safety Orders (SO) Logic">
                    <InputField label="Margin call limit" type="number" value={config.marginCallLimit} onChange={handleChange('marginCallLimit')} helpText="Maximum number of safety orders." />
                    <InputField label="Margin Call Drop" type="number" value={config.marginCallDrop} onChange={handleChange('marginCallDrop')} unit="%" helpText="Price drop to trigger the next SO."/>
                    <InputField label="Multiple Buy in ratio" type="number" value={config.multipleBuyRatio} onChange={handleChange('multipleBuyRatio')} unit="x" helpText="Multiplier to increase the size of each subsequent SO." />
                    <SelectField label="SO Scaling Type" value={config.soScalingType} onChange={handleChange('soScalingType')}>
                        <option value="Geometric">Geometric (Linear drop %)</option>
                        <option value="Arithmetic">Arithmetic (Progressive drop %)</option>
                    </SelectField>
                    <InputField label="SO Price Step Multiplier" type="number" value={config.soPriceStepMultiplier} onChange={handleChange('soPriceStepMultiplier')} unit="x" helpText="Widens the grid between subsequent SOs." />
                    <InputField label="Maximum SO Price Deviation" type="number" value={config.maxSOPriceDeviation} onChange={handleChange('maxSOPriceDeviation')} unit="%" helpText="Hard floor for safety orders from initial buy."/>
                    <InputField label="Max Active SOs" type="number" value={config.maxActiveSOs} onChange={handleChange('maxActiveSOs')} helpText="Limits simultaneous safety orders." />
                </Section>
                 <Section title="Risk Control">
                    <InputField label="Max Loss Stop-Loss (SL)" type="number" value={config.maxLossSL} onChange={handleChange('maxLossSL')} unit="%" helpText="Global hard stop if total loss reaches this %." />
                    <ToggleField label="Trailing Stop-Loss (TSL)" enabled={config.trailingSL} onChange={handleChange('trailingSL')} />
                    {config.trailingSL && <InputField label="TSL Callback" type="number" value={config.trailingSLCallback} onChange={handleChange('trailingSLCallback')} unit="%" helpText="Callback for the trailing stop-loss." />}
                    <InputField label="Cooldown Period After SL" type="number" value={config.cooldownPeriod} onChange={handleChange('cooldownPeriod')} unit="hours" helpText="Wait period before restarting after a stop-loss." />
                    <InputField label="Max Drawdown Limit / Cycle" type="number" value={config.maxDrawdownLimit} onChange={handleChange('maxDrawdownLimit')} unit="%" helpText="Stops a single bot cycle if floating loss reaches this %." />
                </Section>
                <Section title="Deployment & Automation">
                    <InputField label="Total Used Capital" type="number" value={config.totalUsedUSDT} onChange={handleChange('totalUsedUSDT')} unit="USDT" helpText="Total capital dedicated to this bot." />
                    <InputField label="Max Trades Per Day" type="number" value={config.maxTradesPerDay} onChange={handleChange('maxTradesPerDay')} helpText="0 for unlimited." />
                    <ToggleField label="Reinvest Profit" enabled={config.reinvestProfit} onChange={handleChange('reinvestProfit')} helpText="Enable compounding returns."/>
                </Section>
                 
                {config.marketType === 'FUTURES' && (
                    <Section title="Futures / Margin Settings">
                        <InputField label="Leverage Ratio" type="number" value={config.leverage} onChange={handleChange('leverage')} unit="x" />
                         <SelectField label="Margin Mode" value={config.marginMode} onChange={handleChange('marginMode')}>
                            <option value="Cross">Cross</option>
                            <option value="Isolated">Isolated</option>
                        </SelectField>
                    </Section>
                )}
            </div>
            <div className="mt-6 flex space-x-2">
                <button onClick={onSaveTemplate} className="flex-1 bg-gray-200 dark:bg-dark-bg-secondary py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700">Save as Template</button>
                <button onClick={onSave} className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover">Save & Start</button>
            </div>
        </Card>
    );
};

const GridBotConfigPanel: React.FC<{ config: GridConfig; onConfigChange: (newConfig: GridConfig) => void; onSave: () => void; onSaveTemplate: () => void; }> = ({ config, onConfigChange, onSave, onSaveTemplate }) => {
    
    const handleChange = (field: keyof GridConfig) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | boolean | 'SPOT' | 'FUTURES') => {
        const value = typeof e === 'boolean' || e === 'SPOT' || e === 'FUTURES'
            ? e
            : e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
        onConfigChange({ ...config, [field]: value });
    };
    
    return (
        <Card>
            <h3 className="text-lg font-bold mb-4">Configure Advanced Grid Bot</h3>
            
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                
                <MarketTypeSelector value={config.marketType} onChange={handleChange('marketType')} />

                <Section title="Basic Grid Settings">
                     <SelectField label="Range Type" value={config.rangeType} onChange={handleChange('rangeType')}>
                        <option value="AI_OPTIMIZED">AI Optimized</option>
                        <option value="Manual">Manual</option>
                    </SelectField>
                    {config.rangeType === 'AI_OPTIMIZED' ? (
                        <>
                            <SelectField label="AI Model" value={config.aiModel} onChange={handleChange('aiModel')}>
                                <option value="notebook">Notebook (Spot)</option>
                                <option value="princeton">Princeton (Futures)</option>
                            </SelectField>
                            <InputField label="Analysis Period" type="number" value={config.analysisPeriod} onChange={handleChange('analysisPeriod')} unit="days" />
                        </>
                    ) : (
                         <div className="grid grid-cols-2 gap-4">
                            <InputField label="Lower Price" type="number" value={config.lowerPrice} onChange={handleChange('lowerPrice')} />
                            <InputField label="Upper Price" type="number" value={config.upperPrice} onChange={handleChange('upperPrice')} />
                        </div>
                    )}
                    <InputField label="Grid Count" type="number" value={config.gridCount} onChange={handleChange('gridCount')} />
                    <InputField label="Total Investment" type="number" value={config.investmentAmount} onChange={handleChange('investmentAmount')} unit="USDT" />
                </Section>

                <Section title="Grid Logic & Execution">
                    <SelectField label="Grid Spacing Type" value={config.gridSpacingType} onChange={handleChange('gridSpacingType')}>
                        <option value="Arithmetic">Arithmetic (Equal Price Difference)</option>
                        <option value="Geometric">Geometric (Equal % Difference)</option>
                    </SelectField>
                    <InputField label="Start Condition" value={config.startCondition} onChange={handleChange('startCondition')} helpText="e.g., RSI < 30. Use 'None' to start immediately." />
                    <ToggleField label="Pump Protection" enabled={config.pumpProtection} onChange={handleChange('pumpProtection')} />
                    <InputField label="Timeframe for Pump/Dump" type="number" value={config.timeframeForPumpDump} onChange={handleChange('timeframeForPumpDump')} unit="minutes" />
                </Section>
                
                <Section title="Advanced Trailing Controls">
                    <ToggleField label="Trailing Up" enabled={config.trailingUp} onChange={handleChange('trailingUp')} helpText="Moves the entire grid up if price breaks the upper range." />
                    {config.trailingUp && <InputField label="Trailing Up By" type="number" value={config.trailingUpPercentage} onChange={handleChange('trailingUpPercentage')} unit="%" />}
                     <ToggleField label="Trailing Down" enabled={config.trailingDown} onChange={handleChange('trailingDown')} helpText="Moves the entire grid down." />
                    {config.trailingDown && <InputField label="Trailing Down By" type="number" value={config.trailingDownPercentage} onChange={handleChange('trailingDownPercentage')} unit="%" />}
                    <ToggleField label="Stop Loss Trailing" enabled={config.stopLossTrailing} onChange={handleChange('stopLossTrailing')} />
                    {config.stopLossTrailing && <InputField label="Trailing SL %" type="number" value={config.stopLossTrailingPercentage} onChange={handleChange('stopLossTrailingPercentage')} unit="%" />}
                </Section>
                
                <Section title="Risk & Inventory Management">
                    <InputField label="Stop-Loss Price" type="number" value={config.stopLossPrice} onChange={handleChange('stopLossPrice')} />
                    <SelectField label="Range Breakout Action" value={config.rangeBreakoutAction} onChange={handleChange('rangeBreakoutAction')}>
                        <option value="Stop Bot">Stop Bot</option>
                        <option value="Stop & Sell">Stop Bot & Sell Inventory</option>
                        <option value="Convert to DCA">Convert to DCA Bot</option>
                    </SelectField>
                    <InputField label="Max Inventory Limit" type="number" value={config.maxInventoryLimit} onChange={handleChange('maxInventoryLimit')} helpText="In base currency, e.g., max 0.5 BTC. 0 for unlimited." />
                </Section>
                
                <Section title="Profit & Automation">
                    <ToggleField label="Compounding Profit" enabled={config.compoundingProfit} onChange={handleChange('compoundingProfit')} helpText="Automatically roll profits back into the total investment." />
                    <SelectField label="Grid Re-Deployment Strategy" value={config.gridRedeploymentStrategy} onChange={handleChange('gridRedeploymentStrategy')}>
                        <option value="Pause">Pause and Notify</option>
                        <option value="Auto-Restart Same">Auto-Restart with Same Settings</option>
                        <option value="Auto-Restart New AI">Auto-Restart with New AI-Optimized Range</option>
                    </SelectField>
                </Section>

                {config.marketType === 'FUTURES' && (
                    <Section title="Futures Trading">
                        <SelectField label="Order Direction" value={config.orderDirection} onChange={handleChange('orderDirection')}>
                            <option value="Neutral">Neutral</option>
                            <option value="Long">Long</option>
                            <option value="Short">Short</option>
                        </SelectField>
                        <InputField label="Leverage Ratio" type="number" value={config.leverageRatio} onChange={handleChange('leverageRatio')} unit="x" />
                        <SelectField label="Margin Mode" value={config.marginMode} onChange={handleChange('marginMode')}>
                            <option value="Cross">Cross</option>
                            <option value="Isolated">Isolated</option>
                        </SelectField>
                        <p className="text-sm">Est. Liquidation Price: <span className="font-bold text-warning">$55,123.45</span></p>
                        <ToggleField label="Auto Margin Transfer" enabled={config.autoMarginTransfer} onChange={handleChange('autoMarginTransfer')} />
                        <ToggleField label="Hedge Grid Toggle (Two-Way Grid)" enabled={config.hedgeGridToggle} onChange={handleChange('hedgeGridToggle')} />
                    </Section>
                )}
            </div>
             <div className="mt-6 flex space-x-2">
                <button onClick={onSaveTemplate} className="flex-1 bg-gray-200 dark:bg-dark-bg-secondary py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700">Save as Template</button>
                <button onClick={onSave} className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover">Save & Start</button>
            </div>
        </Card>
    );
};

const QuantitativeStrategyConfigPanel: React.FC<{ config: AlgoStrategyConfig; onConfigChange: (newConfig: AlgoStrategyConfig) => void; onSave: () => void; onSaveTemplate: () => void; }> = ({ config, onConfigChange, onSave, onSaveTemplate }) => {
    const [activeCategory, setActiveCategory] = useState<'core' | 'risk' | 'execution' | 'compliance' | 'operational' | 'adaptive'>('core');
    
    const handleChange = (field: keyof AlgoStrategyConfig) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | boolean | 'SPOT' | 'FUTURES') => {
        const value = typeof e === 'boolean' || e === 'SPOT' || e === 'FUTURES'
            ? e 
            : e.target.type === 'checkbox' ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
            : e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
        onConfigChange({ ...config, [field]: value });
    };

    const categories = [
        { id: 'core', label: 'Core Logic', icon: 'beaker' },
        { id: 'risk', label: 'Risk Management', icon: 'shield' },
        { id: 'execution', label: 'Execution', icon: 'flash' },
        { id: 'compliance', label: 'Compliance', icon: 'file' },
        { id: 'operational', label: 'Operational', icon: 'settings' },
        { id: 'adaptive', label: 'Adaptive & Model Risk', icon: 'trending' },
    ];

    return (
        <Card>
            <h3 className="text-lg font-bold mb-4">Institutional Algorithmic Strategy</h3>
            
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id as any)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                            activeCategory === cat.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        <Icon name={cat.icon} className="h-4 w-4" />
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
                <MarketTypeSelector value={config.marketType} onChange={handleChange('marketType')} />

                {activeCategory === 'core' && (
                    <>
                        <Section title="Core Strategy Logic">
                            <SelectField label="Algorithmic Model" value={config.model} onChange={handleChange('model')}>
                                <option value="Trend-Following">Trend-Following</option>
                                <option value="Mean Reversion">Mean Reversion</option>
                                <option value="Volatility Breakout">Volatility Breakout</option>
                                <option value="Pairs/Stat-Arb">Pairs/Stat-Arb</option>
                            </SelectField>
                            <InputField label="Primary Entry Signal" value={config.primaryEntrySignal} onChange={handleChange('primaryEntrySignal')} helpText="e.g., EMA 50 cross EMA 200" />
                            <InputField label="Confirmation Filter" value={config.confirmationFilter} onChange={handleChange('confirmationFilter')} helpText="e.g., ATR > 10 or RSI < 30" />
                            <SelectField label="Regime Filter" value={config.regimeFilter} onChange={handleChange('regimeFilter')}>
                                <option value="None">None</option>
                                <option value="ADX">ADX</option>
                                <option value="Volatility">Volatility</option>
                            </SelectField>
                        </Section>
                        {config.model === 'Pairs/Stat-Arb' && (
                            <Section title="Pairs Trading Settings">
                                <InputField label="Pair Selection" value={config.pairSelection} onChange={handleChange('pairSelection')} helpText="e.g., BTC/USDT,ETH/USDT" />
                                <InputField label="Z-Score Entry" type="number" value={config.zScoreEntry} onChange={handleChange('zScoreEntry')} step="0.1" />
                                <InputField label="Z-Score Exit" type="number" value={config.zScoreExit} onChange={handleChange('zScoreExit')} step="0.1" />
                                <ToggleField label="Structural Break Detection" enabled={config.useStructuralBreakDetection} onChange={handleChange('useStructuralBreakDetection')} />
                            </Section>
                        )}
                    </>
                )}

                {activeCategory === 'risk' && (
                    <>
                        <Section title="Universal Risk Controls">
                            <InputField label="ATR Multiplier for Stops" type="number" value={config.atrMultiplierForStops} onChange={handleChange('atrMultiplierForStops')} step="0.1" helpText="Volatility-adjusted stops" />
                            <InputField label="Max Holding Period" type="number" value={config.maxHoldingPeriod} onChange={handleChange('maxHoldingPeriod')} unit="days" />
                            <ToggleField label="Extreme Volatility Filter" enabled={config.useVolatilityFilter} onChange={handleChange('useVolatilityFilter')} />
                            {config.useVolatilityFilter && (
                                <InputField label="Volatility Filter ATR Multiple" type="number" value={config.volatilityFilterATR} onChange={handleChange('volatilityFilterATR')} step="0.1" />
                            )}
                            <ToggleField label="Correlation Awareness" enabled={config.useCorrelationAwareness} onChange={handleChange('useCorrelationAwareness')} />
                        </Section>
                        <Section title="Portfolio-Level Risk">
                            <InputField label="Max Portfolio Drawdown" type="number" value={config.maxPortfolioDrawdown} onChange={handleChange('maxPortfolioDrawdown')} unit="%" helpText="Auto-halts all strategies" />
                            <InputField label="Value at Risk (VaR) Limit" type="number" value={config.varLimit} onChange={handleChange('varLimit')} unit="USD" />
                            <InputField label="Max Portfolio Leverage" type="number" value={config.maxPortfolioLeverage} onChange={handleChange('maxPortfolioLeverage')} unit="x" step="0.1" />
                            <InputField label="Liquidity Depth Threshold" type="number" value={config.liquidityDepthThreshold} onChange={handleChange('liquidityDepthThreshold')} unit="USD" helpText="Min order book depth" />
                            <InputField label="Inter-Strategy Correlation Limit" type="number" value={config.interStrategyCorrelationFilter} onChange={handleChange('interStrategyCorrelationFilter')} step="0.01" helpText="Max 0.0-1.0" />
                        </Section>
                        <Section title="Portfolio Construction">
                            <InputField label="Target Portfolio Beta" type="number" value={config.targetPortfolioBeta} onChange={handleChange('targetPortfolioBeta')} step="0.1" helpText="vs. benchmark" />
                            <InputField label="Asset Class Exposure Cap" type="number" value={config.assetClassExposureCap} onChange={handleChange('assetClassExposureCap')} unit="%" />
                            <SelectField label="Capital Allocation Method" value={config.riskBasedCapitalAllocation} onChange={handleChange('riskBasedCapitalAllocation')}>
                                <option value="Equal-Weight">Equal-Weight</option>
                                <option value="Risk-Parity">Risk-Parity</option>
                                <option value="Kelly">Kelly Criterion</option>
                            </SelectField>
                            <InputField label="Dynamic Rebalance Threshold" type="number" value={config.dynamicRebalanceThreshold} onChange={handleChange('dynamicRebalanceThreshold')} unit="%" />
                            <InputField label="Rebalance Time Interval" value={config.rebalanceTimeInterval} onChange={handleChange('rebalanceTimeInterval')} helpText="e.g., daily, weekly, monthly" />
                        </Section>
                    </>
                )}

                {activeCategory === 'execution' && (
                    <>
                        <Section title="Execution & Order Management">
                            <InputField label="Max Position Size" type="number" value={config.maxPositionSize} onChange={handleChange('maxPositionSize')} unit="USD" />
                            <InputField label="Max Daily Loss" type="number" value={config.maxDailyLoss} onChange={handleChange('maxDailyLoss')} unit="USD" />
                            <InputField label="Max Weekly Loss" type="number" value={config.maxWeeklyLoss} onChange={handleChange('maxWeeklyLoss')} unit="USD" />
                            <InputField label="Slippage Tolerance" type="number" value={config.slippageTolerance} onChange={handleChange('slippageTolerance')} unit="%" step="0.01" />
                            <SelectField label="Default Order Type" value={config.orderType} onChange={handleChange('orderType')}>
                                <option value="Market">Market</option>
                                <option value="Limit">Limit</option>
                                <option value="IOC">Immediate-or-Cancel (IOC)</option>
                                <option value="FOK">Fill-or-Kill (FOK)</option>
                            </SelectField>
                            <SelectField label="Partial Fill Handling" value={config.partialFillHandling} onChange={handleChange('partialFillHandling')}>
                                <option value="Wait">Wait for Complete Fill</option>
                                <option value="Cancel Remainder">Cancel Remainder</option>
                            </SelectField>
                        </Section>
                        <Section title="Advanced Risk & System Health">
                            <ToggleField label="Circuit Breaker" enabled={config.circuitBreakerEnabled} onChange={handleChange('circuitBreakerEnabled')} helpText="Monitors exchange halts" />
                            <InputField label="Max Open Positions" type="number" value={config.maxOpenPositions} onChange={handleChange('maxOpenPositions')} helpText="Total across all bots" />
                            <ToggleField label="Time-of-Day Filter" enabled={config.useTimeOfDayFilter} onChange={handleChange('useTimeOfDayFilter')} />
                            {config.useTimeOfDayFilter && (
                                <>
                                    <InputField label="Trading Hours Start" type="time" value={config.tradingHoursStart} onChange={handleChange('tradingHoursStart')} />
                                    <InputField label="Trading Hours End" type="time" value={config.tradingHoursEnd} onChange={handleChange('tradingHoursEnd')} />
                                </>
                            )}
                            <InputField label="Trade Velocity Limit" type="number" value={config.tradeVelocityLimit} onChange={handleChange('tradeVelocityLimit')} unit="orders/min" />
                            <SelectField label="Commission Fee Model" value={config.commissionFeeModel} onChange={handleChange('commissionFeeModel')}>
                                <option value="Fixed">Fixed Rate</option>
                                <option value="Maker/Taker Tiers">Maker/Taker Tiers</option>
                            </SelectField>
                            <InputField label="Commission Fee" type="number" value={config.commissionFee} onChange={handleChange('commissionFee')} unit="%" step="0.001" />
                        </Section>
                    </>
                )}

                {activeCategory === 'compliance' && (
                    <>
                        <Section title="Compliance & Reporting">
                            <InputField label="Allocation Bucket ID" value={config.allocationBucket} onChange={handleChange('allocationBucket')} helpText="e.g., Fund A, Desk B" />
                            <SelectField label="Audit Log Verbosity" value={config.auditLogVerbosity} onChange={handleChange('auditLogVerbosity')}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </SelectField>
                            <ToggleField label="Post-Trade Reporting Flag" enabled={config.postTradeReportingFlag} onChange={handleChange('postTradeReportingFlag')} />
                        </Section>
                        <Section title="Post-Trade & Compliance">
                            <InputField label="Slippage Report Deviation" type="number" value={config.slippageReportDeviation} onChange={handleChange('slippageReportDeviation')} unit="%" helpText="Alert threshold" />
                            <SelectField label="Trade Audit Trail Level" value={config.tradeAuditTrailLevel} onChange={handleChange('tradeAuditTrailLevel')}>
                                <option value="Minimal">Minimal</option>
                                <option value="Decision-Level">Decision-Level</option>
                                <option value="Full Tick">Full Tick Data</option>
                            </SelectField>
                            <InputField label="Backtest/Live Skew Threshold" type="number" value={config.backtestLiveSkewThreshold} onChange={handleChange('backtestLiveSkewThreshold')} unit="%" helpText="Model drift warning" />
                        </Section>
                    </>
                )}

                {activeCategory === 'operational' && (
                    <>
                        <Section title="Operational & System Health">
                            <ToggleField label="Global Kill Switch" enabled={config.globalKillSwitch} onChange={handleChange('globalKillSwitch')} helpText="Emergency stop all trading" />
                            <InputField label="Data Feed Latency Threshold" type="number" value={config.dataFeedLatencyThreshold} onChange={handleChange('dataFeedLatencyThreshold')} unit="ms" />
                            <InputField label="Connectivity Failure Retries" type="number" value={config.connectivityFailureRetries} onChange={handleChange('connectivityFailureRetries')} />
                            <InputField label="Retry Delay" type="number" value={config.connectivityRetryDelay} onChange={handleChange('connectivityRetryDelay')} unit="seconds" />
                            <InputField label="Max Order Cancel Rate" type="number" value={config.maxOrderCancelRate} onChange={handleChange('maxOrderCancelRate')} unit="/min" />
                        </Section>
                        <Section title="System Integrity & Emergency">
                            <ToggleField label="Graceful Shutdown Mode" enabled={config.gracefulShutdownMode} onChange={handleChange('gracefulShutdownMode')} helpText="Stop new entries, let exits run" />
                            <InputField label="Hardware Latency Alert" type="number" value={config.hardwareLatencyAlert} onChange={handleChange('hardwareLatencyAlert')} unit="ms" helpText="CPU/network ping threshold" />
                        </Section>
                    </>
                )}

                {activeCategory === 'adaptive' && (
                    <>
                        <Section title="Strategy Adaptivity">
                            <ToggleField label="Adaptive Parameters" enabled={config.useAdaptiveParameters} onChange={handleChange('useAdaptiveParameters')} helpText="Auto-adjust parameters" />
                            {config.useAdaptiveParameters && (
                                <>
                                    <InputField label="Adaptive Parameter Range" type="number" value={config.adaptiveParameterRange} onChange={handleChange('adaptiveParameterRange')} unit="%" helpText="Max adjustment range" />
                                    <InputField label="Market Regime Switch Threshold" type="number" value={config.marketRegimeSwitchThreshold} onChange={handleChange('marketRegimeSwitchThreshold')} helpText="e.g., ADX level" />
                                </>
                            )}
                            <SelectField label="Performance Degradation Action" value={config.performanceDegradationAction} onChange={handleChange('performanceDegradationAction')}>
                                <option value="Alert">Alert Only</option>
                                <option value="Pause">Pause Strategy</option>
                                <option value="Re-calibrate">Auto Re-calibrate</option>
                            </SelectField>
                            <InputField label="Walk-Forward Analysis Period" type="number" value={config.walkForwardAnalysisPeriod} onChange={handleChange('walkForwardAnalysisPeriod')} unit="days" />
                        </Section>
                        <Section title="Model Risk & Decay Management">
                            <SelectField label="Model Validation Frequency" value={config.modelValidationFrequency} onChange={handleChange('modelValidationFrequency')}>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </SelectField>
                            <InputField label="Out-of-Sample Performance Threshold" type="number" value={config.outOfSamplePerformanceThreshold} onChange={handleChange('outOfSamplePerformanceThreshold')} unit="%" helpText="Min % of backtest Sharpe" />
                            <InputField label="Strategy Decommissioning Logic" type="number" value={config.strategyDecommissioningLogic} onChange={handleChange('strategyDecommissioningLogic')} helpText="Consecutive negative periods" />
                            <InputField label="Parameter Stability Metric (PSI)" type="number" value={config.parameterStabilityMetric} onChange={handleChange('parameterStabilityMetric')} step="0.01" helpText="Max drift threshold" />
                            <SelectField label="Trade Rationale Logging" value={config.tradeRationaleLoggingDetail} onChange={handleChange('tradeRationaleLoggingDetail')}>
                                <option value="Minimal">Minimal</option>
                                <option value="Decision Tree">Decision Tree</option>
                                <option value="Full Feature Set">Full Feature Set</option>
                            </SelectField>
                        </Section>
                    </>
                )}

                {config.marketType === 'FUTURES' && (
                    <Section title="Futures / Margin Settings">
                        <InputField label="Leverage Ratio" type="number" value={config.leverage} onChange={handleChange('leverage')} unit="x" step="0.1" />
                        <SelectField label="Margin Mode" value={config.marginMode} onChange={handleChange('marginMode')}>
                            <option value="Cross">Cross Margin</option>
                            <option value="Isolated">Isolated Margin</option>
                        </SelectField>
                    </Section>
                )}
            </div>
            
            <div className="mt-6 flex space-x-2">
                <button onClick={onSaveTemplate} className="flex-1 bg-gray-200 dark:bg-dark-bg-secondary py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700">Save as Template</button>
                <button onClick={onSave} className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover">Save & Start</button>
            </div>
        </Card>
    );
};


// --- MODALS ---
const ComparisonModal: React.FC<{ strategyIds: string[]; onClose: () => void }> = ({ strategyIds, onClose }) => {
    const strategiesToCompare = mockUserStrategies.filter(s => strategyIds.includes(s.id));
    
    const allConfigKeys = Array.from(new Set(strategiesToCompare.flatMap(s => Object.keys(s.config))));

    const renderValue = (value: any) => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }
        if (value === undefined || value === null) {
            return <span className="text-gray-400">N/A</span>;
        }
        return String(value);
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Compare Strategies</h2>
                    <button onClick={onClose}><Icon name="cross" /></button>
                </div>
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-dark-bg-secondary">
                                <th className="p-2 text-left font-semibold sticky left-0 bg-gray-50 dark:bg-dark-bg-secondary">Parameter</th>
                                {strategiesToCompare.map(s => <th key={s.id} className="p-2 text-center font-semibold">{s.name}</th>)}
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-dark-border">
                             {/* General Info */}
                            <tr className="font-bold bg-gray-100 dark:bg-dark-bg-secondary/50"><td colSpan={strategiesToCompare.length + 1} className="p-2 sticky left-0 bg-gray-100 dark:bg-dark-bg-secondary/50">General</td></tr>
                            <tr><td className="p-2 font-medium sticky left-0 bg-white dark:bg-dark-card">Type</td>{strategiesToCompare.map(s => <td key={s.id} className="p-2 text-center">{s.type}</td>)}</tr>
                            <tr><td className="p-2 font-medium sticky left-0 bg-white dark:bg-dark-card">Pair</td>{strategiesToCompare.map(s => <td key={s.id} className="p-2 text-center">{s.pair}</td>)}</tr>
                            <tr><td className="p-2 font-medium sticky left-0 bg-white dark:bg-dark-card">Status</td>{strategiesToCompare.map(s => <td key={s.id} className="p-2 text-center">{s.status}</td>)}</tr>
                            <tr><td className="p-2 font-medium sticky left-0 bg-white dark:bg-dark-card">PnL</td>{strategiesToCompare.map(s => <td key={s.id} className={`p-2 text-center font-semibold ${s.pnl >= 0 ? 'text-success' : 'text-danger'}`}>{s.pnl.toFixed(2)} USDT</td>)}</tr>

                            {/* Configuration */}
                            <tr className="font-bold bg-gray-100 dark:bg-dark-bg-secondary/50"><td colSpan={strategiesToCompare.length + 1} className="p-2 sticky left-0 bg-gray-100 dark:bg-dark-bg-secondary/50">Configuration</td></tr>
                            {allConfigKeys.map(key => (
                                <tr key={key}>
                                    <td className="p-2 font-medium sticky left-0 bg-white dark:bg-dark-card capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                                    {strategiesToCompare.map(s => (
                                        <td key={s.id} className="p-2 text-center">
                                            {renderValue((s.config as any)[key])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

// --- MAIN VIEW ---
const StrategiesView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'my' | 'market' | 'templates'>('my');
    const [userStrategies, setUserStrategies] = useState<UserStrategy[]>(mockUserStrategies);
    const [templates, setTemplates] = useState<StrategyTemplate[]>(mockStrategyTemplates);

    // State for creation/editing flow
    const [view, setView] = useState<'list' | 'config'>('list');
    const [editingStrategy, setEditingStrategy] = useState<UserStrategy | null>(null);
    const [currentConfig, setCurrentConfig] = useState<any | null>(null);
    const [selectedStrategyType, setSelectedStrategyType] = useState<StrategyType | null>(null);
    const [currentPair, setCurrentPair] = useState('BTC/USDT');

    // State for comparison
    const [comparingIds, setComparingIds] = useState<string[]>([]);
    const [isComparing, setIsComparing] = useState(false);

    const { theme } = useContext(ThemeContext);
    
    const getDefaultConfig = (type: StrategyType): any => {
        switch (type) {
            case 'Normal Grid':
                return { marketType: 'SPOT', lowerPrice: 60000, upperPrice: 70000, gridCount: 20, investmentAmount: 1000, gridSpacingType: 'Arithmetic', stopLossPrice: 58000, takeProfitPrice: 72000, leverage: 1, marginMode: 'Isolated' } as NormalGridConfig;
            case 'Normal DCA':
                return { marketType: 'SPOT', initialBuy: 100, buyInCallback: 2, takeProfitPercentage: 3, safetyOrderCount: 5, safetyOrderStepPercentage: 2, safetyOrderVolumeMultiplier: 1.5, stopLossPercentage: 10, leverage: 1, marginMode: 'Isolated' } as NormalDCAConfig;
            case 'Trend-Following Bot':
                return { marketType: 'SPOT', fastEMAPeriod: 12, slowEMAPeriod: 26, atrPeriod: 14, atrMultiplier: 1.5, positionSize: 5, stopLossATRMultiplier: 2, takeProfitATRMultiplier: 3, trailingStopEnabled: true, leverage: 1, marginMode: 'Isolated' } as TrendFollowingConfig;
            case 'Mean Reversion Bot':
                return { marketType: 'SPOT', zScorePeriod: 20, zScoreEntryThreshold: 2, zScoreExitThreshold: 0.5, rsiPeriod: 14, rsiOversold: 30, rsiOverbought: 70, positionSize: 5, stopLossPercentage: 5, takeProfitPercentage: 5, leverage: 1, marginMode: 'Isolated' } as MeanReversionConfig;
            case 'Volatility Breakout Bot':
                return { marketType: 'SPOT', breakoutIndicator: 'Donchian', lookbackPeriod: 20, keltnerATRMultiplier: 2, positionSize: 5, stopLossPercentage: 3, takeProfitPercentage: 6, timeOfDayFilterEnabled: false, tradingHoursStart: '09:00', tradingHoursEnd: '16:00', leverage: 1, marginMode: 'Isolated' } as VolatilityBreakoutConfig;
            case 'TradingView Webhook Bot':
                return { marketType: 'SPOT', webhookURL: '', alertParser: '{"action": "{{strategy.order.action}}", "ticker": "{{ticker}}"}', signalSourceTrustScore: 7, maximumSlippage: 0.5, orderTimeout: 30, positionSizeOverride: 'Use Signal', fixedPositionSize: 5, dailyLossLimit: 5, maxExchangeAPIRateUsage: 80, orderTypeDefault: 'Market', maxOpenPositions: 5, minimumPositionSize: 10, takeProfitPercentage: 5, stopLossPercentage: 3, globalCapitalAllocation: 50, maxPositionLeverage: 5, dailyTradeCountLimit: 20, ignoreTickersList: '', confirmationWebhookURL: '', logLevel: 'Info', timeZoneSetting: 'UTC', partialFillHandling: 'Wait for Fill', cooldownPeriod: 300, trailingStopActivation: 2, maxDrawdown: 20, exchangeTimeOffset: 0, executionEnvironment: 'Paper Trading', whitelistedIPAddresses: '', maxTradeFeePercentage: 0.1, minimumProfitTarget: 5, strategyTagID: '', accountMode: 'Single', webhookRetryMechanism: 'Exponential Backoff', leverage: 1, marginMode: 'Isolated' } as TradingViewWebhookConfig;
            case 'Dip Analyser Bot':
                return { marketType: 'SPOT', dipScoreComponents: { rsiDivergence: true, volumeSpike: true, priceLevelTest: true }, scoreThreshold: 70, minimumDipDepth: 5, timeframeForAnalysis: '4h', buyAggression: 'Moderate', quickProfitTarget: 3, progressiveStop: true, progressiveStopPercentage: 1.5, maximumConcurrentDips: 3, forcedAccumulationMode: false, recoveryConfirmationFilter: 10, liquiditySweepRequirement: false, fvgRetracementPercentage: 50, orderBlockProximityFilter: 1, maxOrderBookSkew: 65, executionSliceSize: 100, twapHorizon: 15, maxCumulativeSlippage: 0.2, dcaTrancheSizeMultiplier: 0.5, dcaProfitExitThreshold: false, dcaProfitExitPercentage: 3, portfolioHedgeRatioAdjustment: 0.1, maxLossFromAverageEntry: 15, assetAllocationHardCap: 30, botHealthCheckInterval: 15, apiPermissionValidation: 'Read/Trade', autoPauseOnNewsEvent: false, newsEventSeverity: 'High', volumeParticipationRate: 1, timeBasedDipInvalidation: 30, minAssetHoldingQuantity: 0, leverage: 1, marginMode: 'Isolated' } as DipAnalyserConfig;
            case 'Signal Bot':
                return { marketType: 'SPOT', signalSource: 'Telegram', messageParser: '^(BUY|SELL)\\s+(\\w+)\\s+@\\s+([\\d.]+)', providerTrustScore: 7, signalVerificationDelay: 5, maximumPositions: 5, correlationLimit: 75, autoStopOnProviderError: true, maxOrderDeviation: 2, maxPortfolioDrawdown: 20, auditLogVerbosity: 'Standard', assetWhitelist: 'BTC,ETH,SOL,BNB', timeOfDayTradingWindow: '00:00-23:59', maxDailyLoss: 1000, maxWeeklyLoss: 5000, orderTypePreference: 'Limit', slippageTolerance: 0.5, fillOrKillTimeout: 5000, dynamicPositionSizing: '% of Balance', dataFeedLatencyThreshold: 1000, maxAPIRequestRate: 60, emergencyKillSwitchKey: '', signalReentryDelay: 15, tpSlOverwrite: 'Allow', partialFillPolicy: 'Hold', marketDataTolerance: 2, orderTradeRatioLimit: 20, strategyVersionLock: 'v1.0.0', tradeIdentifierTag: 'SIGNAL_BOT_1', pnlReportingFrequency: 'Real-Time', vendorSignalLicenseKey: '', minExchangeLiquidity: 1000000, postTradeComplianceDelay: 500, circuitBreakerResponse: 'Pause New', requiredDataFields: ['Asset', 'Action', 'Price'], exposureNettingMode: 'Net', maxVolatilityFilter: 100, maxSlippagePerPosition: 1, strategyConfidenceScoreThreshold: 0.6, auditLogRetentionPeriod: 1825, correlationCheckLookbackWindow: '30 Days', externalRiskSystemHeartbeatTimeout: 60, orderRoutingDestinationOverride: '', signalParsingFailureLimit: 5, tradeExecutionWindowMaxLatency: 1000, maxAdverseExcursion: 10, outOfSampleFailureThreshold: 3, leverage: 1, marginMode: 'Isolated' } as SignalBotConfig;
            default:
                return {};
        }
    };
    
    const handleSelectForCompare = (id: string) => {
        setComparingIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handlePauseResume = (id: string) => {
        setUserStrategies(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' } : s));
    };
    
    const getChartVisualizations = () => {
        if (!currentConfig) return {};
        
        if (selectedStrategyType === 'Advanced Grid') {
            const gridConfig = currentConfig as GridConfig;
            const gridLines = [];
            
            if (gridConfig.gridCount > 0 && gridConfig.upperPrice > gridConfig.lowerPrice) {
                 const step = (gridConfig.upperPrice - gridConfig.lowerPrice) / gridConfig.gridCount;
                 for (let i = 0; i <= gridConfig.gridCount; i++) {
                    gridLines.push({ price: gridConfig.lowerPrice + i * step, color: 'rgba(160, 174, 192, 0.5)', label: `Lvl ${i}` });
                }
            }

            if (gridConfig.lowerPrice) gridLines.push({ price: gridConfig.lowerPrice, color: '#10b981', label: 'Lower Price' });
            if (gridConfig.upperPrice) gridLines.push({ price: gridConfig.upperPrice, color: '#ef4444', label: 'Upper Price' });
            if(gridConfig.stopLossPrice > 0) {
                 gridLines.push({ price: gridConfig.stopLossPrice, color: '#f59e0b', label: 'Stop Loss' });
            }
            return { gridLines };
        }
        
        if (selectedStrategyType === 'Advanced DCA') {
             return { rsiData: mockRsiData };
        }

        return {};
    };

    const startCreation = (type: StrategyType, initialConf: any = {}) => {
        setSelectedStrategyType(type);
        const config = Object.keys(initialConf).length > 0 ? initialConf : getDefaultConfig(type);
        setCurrentConfig(config);
        setView('config');
        setCurrentPair('BTC/USDT');
    };
    
    const handleUseTemplate = (template: StrategyTemplate) => {
        startCreation(template.type, template.config);
    };

    const handleEditStrategy = (strategy: UserStrategy) => {
        setEditingStrategy(strategy);
        startCreation(strategy.type, strategy.config);
        setCurrentPair(strategy.pair);
    };
    
    const handleSaveStrategy = () => {
        if (!currentConfig || !selectedStrategyType) return;
        if (editingStrategy) {
            setUserStrategies(prev => prev.map(s => s.id === editingStrategy.id ? { ...s, pair: currentPair, config: currentConfig } : s));
        } else {
             const newStrategy: UserStrategy = {
                id: `us-${Date.now()}`, name: `New ${selectedStrategyType}`, type: selectedStrategyType,
                pair: currentPair, status: 'Active', pnl: 0, config: currentConfig,
            };
            setUserStrategies(prev => [newStrategy, ...prev]);
        }
        setView('list');
        setEditingStrategy(null);
    };

    const handleSaveTemplate = () => {
        if (!currentConfig || !selectedStrategyType) return;
        const name = prompt("Enter a name for this template:", `My ${selectedStrategyType} Template`);
        if (name) {
            const newTemplate: StrategyTemplate = {
                id: `st-${Date.now()}`, name, type: selectedStrategyType, config: currentConfig,
            };
            setTemplates(prev => [...prev, newTemplate]);
            alert(`Template "${name}" saved!`);
        }
    };

    const renderConfigPanel = () => {
        if (!currentConfig) return null;
        switch (selectedStrategyType) {
            case 'Advanced DCA':
                return <DcaBotConfigPanel config={currentConfig} onConfigChange={setCurrentConfig} onSave={handleSaveStrategy} onSaveTemplate={handleSaveTemplate} />;
            case 'Advanced Grid':
                return <GridBotConfigPanel config={currentConfig} onConfigChange={setCurrentConfig} onSave={handleSaveStrategy} onSaveTemplate={handleSaveTemplate} />;
            case 'Normal Grid':
                return <NormalGridConfigPanel config={currentConfig} onConfigChange={setCurrentConfig} onSave={handleSaveStrategy} onSaveTemplate={handleSaveTemplate} />;
            case 'Normal DCA':
                return <NormalDCAConfigPanel config={currentConfig} onConfigChange={setCurrentConfig} onSave={handleSaveStrategy} onSaveTemplate={handleSaveTemplate} />;
            case 'Quantitative Strategy':
                return <QuantitativeStrategyConfigPanel config={currentConfig} onConfigChange={setCurrentConfig} onSave={handleSaveStrategy} onSaveTemplate={handleSaveTemplate} />;
            case 'Trend-Following Bot':
                return <TrendFollowingConfigPanel config={currentConfig} onConfigChange={setCurrentConfig} onSave={handleSaveStrategy} onSaveTemplate={handleSaveTemplate} />;
            case 'Mean Reversion Bot':
                return <MeanReversionConfigPanel config={currentConfig} onConfigChange={setCurrentConfig} onSave={handleSaveStrategy} onSaveTemplate={handleSaveTemplate} />;
            case 'Volatility Breakout Bot':
                return <VolatilityBreakoutConfigPanel config={currentConfig} onConfigChange={setCurrentConfig} onSave={handleSaveStrategy} onSaveTemplate={handleSaveTemplate} />;
            case 'TradingView Webhook Bot':
                return <TradingViewWebhookConfigPanel config={currentConfig} onConfigChange={setCurrentConfig} onSave={handleSaveStrategy} onSaveTemplate={handleSaveTemplate} />;
            case 'Dip Analyser Bot':
                return <DipAnalyserConfigPanel config={currentConfig} onConfigChange={setCurrentConfig} onSave={handleSaveStrategy} onSaveTemplate={handleSaveTemplate} />;
            case 'Signal Bot':
                return <SignalBotConfigPanel config={currentConfig} onConfigChange={setCurrentConfig} onSave={handleSaveStrategy} onSaveTemplate={handleSaveTemplate} />;
            default:
                return <Card><p>This strategy is not yet configurable.</p></Card>;
        }
    };
    
    const getStatusClasses = (status: UserStrategy['status']) => {
        switch (status) {
            case 'Active': return 'bg-success/10 text-success';
            case 'Paused': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300';
            case 'Error': return 'bg-danger/10 text-danger';
        }
    };

    if (view === 'config') {
        const chartVisuals = getChartVisualizations();
        const timeframe = (currentConfig as DcaConfig)?.timeframe || '1D';

        return (
            <div>
                 <button onClick={() => setView('list')} className="mb-4 text-sm font-semibold text-primary hover:underline flex items-center">
                    <Icon name="chevronLeft" className="h-4 w-4 mr-1" /> Back to Strategies
                </button>
                
                <div className="space-y-4 sm:space-y-6">
                    {renderConfigPanel()}
                    
                    <Card className="h-[500px] sm:h-[600px] lg:h-[700px] p-0 overflow-hidden">
                        <TradingViewWidget 
                            symbol={currentPair.replace('/', '')}
                            exchange="BINANCE"
                        />
                    </Card>
                    
                    <Card className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                            Professional Trading Charts
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary mb-4 sm:mb-6">
                            Powered by TradingView, the world's leading charting platform. Analyze markets with advanced technical indicators, drawing tools, and real-time data.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                                    <span className="text-green-500 mr-2">✓</span> Features
                                </h4>
                                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Real-time price data</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>50+ technical indicators</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Multiple timeframes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Drawing tools & patterns</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                                    <span className="text-blue-500 mr-2">📈</span> Indicators Included
                                </h4>
                                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>RSI (Relative Strength Index)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Moving Averages (MA)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>MACD</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Bollinger Bands</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }

    // Main Tabbed View
    return (
        <>
            {isComparing && <ComparisonModal strategyIds={comparingIds} onClose={() => { setIsComparing(false); setComparingIds([]); }} />}
            <Card>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-dark-border">
                    <div className="flex">
                        <button onClick={() => setActiveTab('my')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'my' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary dark:hover:text-white'}`}>My Strategies ({userStrategies.length})</button>
                        <button onClick={() => setActiveTab('market')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'market' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary dark:hover:text-white'}`}>Strategy Marketplace</button>
                        <button onClick={() => setActiveTab('templates')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'templates' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary dark:hover:text-white'}`}>Templates ({templates.length})</button>
                    </div>
                </div>

                {/* My Strategies Tab */}
                {activeTab === 'my' && (
                    <div className="pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={() => setIsComparing(true)} disabled={comparingIds.length < 2} className="bg-primary/10 text-primary font-semibold py-2 px-4 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-sm">
                                <Icon name="compare" className="h-4 w-4 mr-2" />
                                Compare Selected ({comparingIds.length})
                            </button>
                            <button onClick={() => setActiveTab('market')} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors flex items-center text-sm">
                                <Icon name="plus" className="h-4 w-4 mr-2" />
                                Create New Strategy
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-bg-secondary dark:text-dark-text-secondary">
                                    <tr>
                                        <th className="px-1 py-3 w-8"></th>
                                        <th className="px-6 py-3 text-left">Strategy Name</th>
                                        <th className="px-6 py-3">Type</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">PnL</th>
                                        <th className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {userStrategies.map(s => (
                                    <tr key={s.id} className="border-b dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg-secondary">
                                        <td className="px-1 py-4 text-center">
                                            <input type="checkbox" checked={comparingIds.includes(s.id)} onChange={() => handleSelectForCompare(s.id)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white">{s.name}<p className="font-normal text-xs text-gray-400">{s.pair}</p></td>
                                        <td className="px-6 py-4">{s.type}</td>
                                        <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(s.status)}`}>{s.status}</span></td>
                                        <td className={`px-6 py-4 font-semibold ${s.pnl >= 0 ? 'text-success' : 'text-danger'}`}>{s.pnl.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <button onClick={() => handlePauseResume(s.id)} title={s.status === 'Active' ? 'Pause' : 'Resume'} className="text-gray-400 hover:text-primary"><Icon name={s.status === 'Active' ? 'pause' : 'play'} className="h-5 w-5"/></button>
                                                <button onClick={() => handleEditStrategy(s)} title="Edit" className="text-gray-400 hover:text-primary"><Icon name="edit" className="h-5 w-5"/></button>
                                                <button title="Clone" className="text-gray-400 hover:text-primary"><Icon name="clone" className="h-5 w-5"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Strategy Marketplace Tab */}
                {activeTab === 'market' && (
                    <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {strategyMarketplace.map(s => (
                            <div key={s.type} className="border dark:border-dark-border rounded-lg p-4 flex items-start justify-between hover:bg-gray-50 dark:hover:bg-dark-bg-secondary">
                                <div>
                                    <h4 className="font-bold flex items-center"><Icon name={s.icon} className="h-5 w-5 mr-2 text-primary" />{s.type}</h4>
                                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary mt-1">{s.description}</p>
                                </div>
                                <button onClick={() => startCreation(s.type as StrategyType, {})} className="bg-primary text-white font-semibold py-1 px-3 rounded-lg hover:bg-primary-hover text-xs whitespace-nowrap">
                                    Create Bot
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Templates Tab */}
                {activeTab === 'templates' && (
                     <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {templates.map(t => (
                            <div key={t.id} className="border dark:border-dark-border rounded-lg p-4">
                                <h4 className="font-bold">{t.name}</h4>
                                <p className="text-xs bg-gray-100 dark:bg-dark-bg-secondary inline-block px-2 py-0.5 rounded-md my-2">{t.type}</p>
                                <div className="mt-4 flex space-x-2">
                                     <button onClick={() => handleUseTemplate(t)} className="flex-1 bg-primary text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-primary-hover text-xs">Use Template</button>
                                     <button className="flex-1 bg-gray-200 dark:bg-dark-bg-secondary font-semibold py-1.5 px-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 text-xs">Delete</button>
                                </div>
                            </div>
                        ))}
                         {templates.length === 0 && <p className="text-center p-8 text-gray-500 col-span-full">You have no saved templates.</p>}
                    </div>
                )}

            </Card>
        </>
    );
};

export default StrategiesView;
