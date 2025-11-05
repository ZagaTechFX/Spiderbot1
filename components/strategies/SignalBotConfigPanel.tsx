import React from 'react';
import Card from '../Card';
import ToggleSwitch from '../ToggleSwitch';
import { SignalBotConfig } from '../../types';
import StrategyConfigPanelLayout from '../StrategyConfigPanelLayout';

interface SignalBotConfigPanelProps {
    config: SignalBotConfig;
    onConfigChange: (config: SignalBotConfig) => void;
    onSave: () => void;
    onSaveTemplate: () => void;
}

const SignalBotConfigPanel: React.FC<SignalBotConfigPanelProps> = ({ config, onConfigChange, onSave, onSaveTemplate }) => {
    const handleChange = (field: keyof SignalBotConfig, value: any) => {
        onConfigChange({ ...config, [field]: value });
    };

    const tabs = [
        { id: 'basic', label: 'Basic Signal' },
        { id: 'execution', label: 'Execution' },
        { id: 'risk', label: 'Risk & Limits' },
        { id: 'compliance', label: 'Compliance' },
        { id: 'monitoring', label: 'Monitoring' },
        { id: 'advanced', label: 'Advanced' }
    ];

    const renderTabContent = (activeTab: string) => {
        switch (activeTab) {
            case 'basic':
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">Signal Source Configuration</h3>
                            
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Signal Source</label>
                                    <select
                                        value={config.signalSource}
                                        onChange={(e) => handleChange('signalSource', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="Telegram">Telegram</option>
                                        <option value="Discord">Discord</option>
                                        <option value="API">API</option>
                                        <option value="Custom">Custom</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Platform where signals are received</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Message Parser (Regex)</label>
                                    <input
                                        type="text"
                                        value={config.messageParser}
                                        onChange={(e) => handleChange('messageParser', e.target.value)}
                                        placeholder="^(BUY|SELL)\s+(\w+)\s+@\s+([\d.]+)"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Custom regex pattern to extract action, asset, and price from signal</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Provider Trust Score (1-10)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        step="0.1"
                                        value={config.providerTrustScore}
                                        onChange={(e) => handleChange('providerTrustScore', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Dynamic position sizing based on provider's historical performance</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Signal Verification Delay (seconds)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={config.signalVerificationDelay}
                                        onChange={(e) => handleChange('signalVerificationDelay', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Wait time to check for signal correction/retraction before executing</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Maximum Positions</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={config.maximumPositions}
                                        onChange={(e) => handleChange('maximumPositions', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hard limit on concurrent open trades</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Correlation Limit (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="5"
                                        value={config.correlationLimit}
                                        onChange={(e) => handleChange('correlationLimit', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Prevent trading correlated assets simultaneously above this threshold</p>
                                </div>

                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Auto-Stop on Provider Error</label>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Stop bot on excessive invalid signals</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={config.autoStopOnProviderError}
                                        onChange={(checked) => handleChange('autoStopOnProviderError', checked)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Max Order Deviation (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        value={config.maxOrderDeviation}
                                        onChange={(e) => handleChange('maxOrderDeviation', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Reject trade if market price deviates from signal price by this %</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">Advanced Signal Handling</h3>
                            
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Signal Re-entry Delay (minutes)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={config.signalReentryDelay}
                                        onChange={(e) => handleChange('signalReentryDelay', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Wait time per asset before accepting new signals after trade close</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">TP/SL Overwrite Policy</label>
                                    <select
                                        value={config.tpSlOverwrite}
                                        onChange={(e) => handleChange('tpSlOverwrite', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="Allow">Allow Override</option>
                                        <option value="Reject">Reject Override</option>
                                        <option value="Only If Worse">Only If Worse</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Control whether bot can override signal TP/SL levels</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Vendor Signal License Key</label>
                                    <input
                                        type="password"
                                        value={config.vendorSignalLicenseKey}
                                        onChange={(e) => handleChange('vendorSignalLicenseKey', e.target.value)}
                                        placeholder="Enter license key"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Token required to decrypt/validate signal provider's feed</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Signal Parsing Failure Limit</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={config.signalParsingFailureLimit}
                                        onChange={(e) => handleChange('signalParsingFailureLimit', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Consecutive parsing failures before halting</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'execution':
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">Order Execution Logic</h3>
                            
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Order Type Preference</label>
                                    <select
                                        value={config.orderTypePreference}
                                        onChange={(e) => handleChange('orderTypePreference', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="Limit">Limit</option>
                                        <option value="Market">Market</option>
                                        <option value="Post-Only Limit">Post-Only Limit</option>
                                        <option value="IOC">IOC (Immediate or Cancel)</option>
                                        <option value="FOK">FOK (Fill or Kill)</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Limit is safer, Market is faster but risks slippage</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Slippage Tolerance (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={config.slippageTolerance}
                                        onChange={(e) => handleChange('slippageTolerance', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max acceptable price difference between intended and actual fill</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Fill-or-Kill Timeout (ms)</label>
                                    <input
                                        type="number"
                                        min="100"
                                        step="100"
                                        value={config.fillOrKillTimeout}
                                        onChange={(e) => handleChange('fillOrKillTimeout', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Maximum wait time for FOK/IOC orders before auto-cancel</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Dynamic Position Sizing Logic</label>
                                    <select
                                        value={config.dynamicPositionSizing}
                                        onChange={(e) => handleChange('dynamicPositionSizing', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="Fixed Amt">Fixed Amount</option>
                                        <option value="% of Balance">% of Balance</option>
                                        <option value="Kelly Criterion">Kelly Criterion</option>
                                        <option value="VaR">VaR (Value at Risk)</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Capital allocation method per trade</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Partial Fill Policy</label>
                                    <select
                                        value={config.partialFillPolicy}
                                        onChange={(e) => handleChange('partialFillPolicy', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="Hold">Hold</option>
                                        <option value="Cancel Remaining">Cancel Remaining</option>
                                        <option value="Re-Price Limit">Re-Price Limit</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Action when limit order is only partially filled</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Max Slippage per Position (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        value={config.maxSlippagePerPosition}
                                        onChange={(e) => handleChange('maxSlippagePerPosition', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Cumulative slippage cap for entire trade lifecycle</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Trade Execution Window Max Latency (ms)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={config.tradeExecutionWindowMaxLatency}
                                        onChange={(e) => handleChange('tradeExecutionWindowMaxLatency', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max acceptable delay from signal processing to order acceptance</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Order Routing Destination Override</label>
                                    <input
                                        type="text"
                                        value={config.orderRoutingDestinationOverride}
                                        onChange={(e) => handleChange('orderRoutingDestinationOverride', e.target.value)}
                                        placeholder="Leave empty for auto-routing"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Force all orders to specific exchange/venue (Exchange ID)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'risk':
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">Portfolio Risk Management</h3>
                            
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Max Portfolio Drawdown (%)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="50"
                                        step="1"
                                        value={config.maxPortfolioDrawdown}
                                        onChange={(e) => handleChange('maxPortfolioDrawdown', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Halt all trading if portfolio drops this % from peak</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Max Daily Loss ($)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={config.maxDailyLoss}
                                        onChange={(e) => handleChange('maxDailyLoss', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hard cap on daily losses; triggers auto-stop</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Max Weekly Loss ($)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={config.maxWeeklyLoss}
                                        onChange={(e) => handleChange('maxWeeklyLoss', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hard cap on weekly losses</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Max Adverse Excursion (MAE) Limit (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={config.maxAdverseExcursion}
                                        onChange={(e) => handleChange('maxAdverseExcursion', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max intra-trade loss before force-close regardless of SL</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Exposure Netting Mode</label>
                                    <select
                                        value={config.exposureNettingMode}
                                        onChange={(e) => handleChange('exposureNettingMode', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="Gross">Gross</option>
                                        <option value="Net">Net</option>
                                        <option value="Delta-Adjusted">Delta-Adjusted</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">How to calculate total exposure across correlated positions</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Max Volatility Filter (ATR $)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={config.maxVolatilityFilter}
                                        onChange={(e) => handleChange('maxVolatilityFilter', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Reject trades if ATR volatility exceeds this threshold</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Correlation Check Lookback Window</label>
                                    <input
                                        type="text"
                                        value={config.correlationCheckLookbackWindow}
                                        onChange={(e) => handleChange('correlationCheckLookbackWindow', e.target.value)}
                                        placeholder="30 Days / 60 Mins"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Time window for calculating asset correlation</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Leverage</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="125"
                                        value={config.leverage}
                                        onChange={(e) => handleChange('leverage', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Margin Mode</label>
                                    <select
                                        value={config.marginMode}
                                        onChange={(e) => handleChange('marginMode', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="Isolated">Isolated</option>
                                        <option value="Cross">Cross</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'compliance':
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">Compliance & Governance</h3>
                            
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Audit Log Verbosity Level</label>
                                    <select
                                        value={config.auditLogVerbosity}
                                        onChange={(e) => handleChange('auditLogVerbosity', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="Minimal">Minimal</option>
                                        <option value="Standard">Standard</option>
                                        <option value="Detailed">Detailed</option>
                                        <option value="Full">Full (Required for Institutional Audits)</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Level of detail logged for every action</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Asset Whitelist</label>
                                    <input
                                        type="text"
                                        value={config.assetWhitelist}
                                        onChange={(e) => handleChange('assetWhitelist', e.target.value)}
                                        placeholder="BTC,ETH,SOL,BNB (comma-separated)"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pre-approved assets authorized for trading</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Time-of-Day Trading Window</label>
                                    <input
                                        type="text"
                                        value={config.timeOfDayTradingWindow}
                                        onChange={(e) => handleChange('timeOfDayTradingWindow', e.target.value)}
                                        placeholder="09:30-16:00 EST"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Authorized trading hours for new orders</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Market Data Tolerance (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="0.5"
                                        value={config.marketDataTolerance}
                                        onChange={(e) => handleChange('marketDataTolerance', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max allowed deviation of current market price from signal price</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Order/Trade Ratio Limit</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={config.orderTradeRatioLimit}
                                        onChange={(e) => handleChange('orderTradeRatioLimit', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max ratio of orders placed to trades executed (MiFID II/SEC Rule 15c3-5)</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Strategy Version Lock</label>
                                    <input
                                        type="text"
                                        value={config.strategyVersionLock}
                                        onChange={(e) => handleChange('strategyVersionLock', e.target.value)}
                                        placeholder="v3.1.2_QC"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Locks bot to specific auditable strategy version</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Trade Identifier Tag</label>
                                    <input
                                        type="text"
                                        value={config.tradeIdentifierTag}
                                        onChange={(e) => handleChange('tradeIdentifierTag', e.target.value)}
                                        placeholder="ACCT123_SIGNALBOT_Q1"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Unique tag for regulatory reporting (CAT/MiFID II)</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Min. Exchange Liquidity ($)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={config.minExchangeLiquidity}
                                        onChange={(e) => handleChange('minExchangeLiquidity', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimum 24h trading volume required to trade an asset</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Post-Trade Compliance Delay (ms)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={config.postTradeComplianceDelay}
                                        onChange={(e) => handleChange('postTradeComplianceDelay', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Delay after fill before accepting new signals</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Audit Log Retention Period (days)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={config.auditLogRetentionPeriod}
                                        onChange={(e) => handleChange('auditLogRetentionPeriod', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimum required audit log storage period (e.g., 1825 for 5 years)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'monitoring':
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">Operational & Health Monitoring</h3>
                            
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Data Feed Latency Threshold (ms)</label>
                                    <input
                                        type="number"
                                        min="100"
                                        value={config.dataFeedLatencyThreshold}
                                        onChange={(e) => handleChange('dataFeedLatencyThreshold', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pause trading if market data is older than this</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Max API Request Rate (per min)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={config.maxAPIRequestRate}
                                        onChange={(e) => handleChange('maxAPIRequestRate', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Limit orders/cancellations to avoid rate-limiting</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Emergency Kill Switch API Key</label>
                                    <input
                                        type="password"
                                        value={config.emergencyKillSwitchKey}
                                        onChange={(e) => handleChange('emergencyKillSwitchKey', e.target.value)}
                                        placeholder="Enter emergency key"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Secondary key to instantly cancel all orders and close positions</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">P&L Reporting Frequency</label>
                                    <select
                                        value={config.pnlReportingFrequency}
                                        onChange={(e) => handleChange('pnlReportingFrequency', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="Real-Time">Real-Time</option>
                                        <option value="1min">1 Minute</option>
                                        <option value="5min">5 Minutes</option>
                                        <option value="EOD">End of Day</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">How often to calculate and report P&L metrics</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Circuit Breaker Response</label>
                                    <select
                                        value={config.circuitBreakerResponse}
                                        onChange={(e) => handleChange('circuitBreakerResponse', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="Cancel All">Cancel All Orders</option>
                                        <option value="Pause New">Pause New Orders</option>
                                        <option value="Reduce-Only">Reduce-Only Mode</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Bot's automated response when circuit breaker is triggered</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">External Risk System Heartbeat Timeout (seconds)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={config.externalRiskSystemHeartbeatTimeout}
                                        onChange={(e) => handleChange('externalRiskSystemHeartbeatTimeout', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max time gap since last risk system heartbeat before pause</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'advanced':
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">Advanced Model Validation</h3>
                            
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Strategy Confidence Score Threshold (0.0-1.0)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={config.strategyConfidenceScoreThreshold}
                                        onChange={(e) => handleChange('strategyConfidenceScoreThreshold', parseFloat(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Only execute if strategy's live performance score exceeds this</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Out-of-Sample Failure Threshold</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={config.outOfSampleFailureThreshold}
                                        onChange={(e) => handleChange('outOfSampleFailureThreshold', parseInt(e.target.value))}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Consecutive trade failures before forcing paper-trading mode</p>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1.5 sm:mb-2">Required Data Fields</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Asset', 'Action', 'Price', 'Stop-Loss', 'Timestamp', 'Context ID'].map((field) => (
                                            <label key={field} className="flex items-center space-x-2 text-xs sm:text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={config.requiredDataFields.includes(field)}
                                                    onChange={(e) => {
                                                        const newFields = e.target.checked
                                                            ? [...config.requiredDataFields, field]
                                                            : config.requiredDataFields.filter(f => f !== field);
                                                        handleChange('requiredDataFields', newFields);
                                                    }}
                                                    className="rounded text-primary focus:ring-primary"
                                                />
                                                <span className="text-gray-700 dark:text-dark-text-secondary">{field}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Mandatory fields in signal message; reject if any missing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <StrategyConfigPanelLayout
            tabs={tabs}
            renderTabContent={renderTabContent}
            onSave={onSave}
            onSaveTemplate={onSaveTemplate}
        />
    );
};

export default SignalBotConfigPanel;
