import React, { useState } from 'react';
import Card from '../../components/Card';
import { ArbitrageOpportunity, ActiveArbitrage, ArbitrageTradeHistory, ArbitrageConfig } from '../../types';
import Icon from '../../components/Icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- MOCK DATA ---
const mockOpportunities: ArbitrageOpportunity[] = [
    { id: 'op-1', path: 'USDT -> BTC -> ETH -> USDT', exchanges: 'Binance / KuCoin', profit: 0.68, timestamp: Date.now() },
    { id: 'op-2', path: 'USDT -> SOL -> JUP -> USDT', exchanges: 'Bybit / Gate.io', profit: 0.55, timestamp: Date.now() - 1000 },
    { id: 'op-3', path: 'USDT -> ADA -> DOT -> USDT', exchanges: 'Kraken / Binance', profit: 0.49, timestamp: Date.now() - 2000 },
];
const mockActiveTrades: ActiveArbitrage[] = [
    { id: 'at-1', path: 'USDT -> BTC -> ADA -> USDT', status: 'Executing Leg 2/3 (BTC -> ADA)', startTime: '10s ago' },
];
const mockTradeHistory: ArbitrageTradeHistory[] = [
    { id: 'th-1', timestamp: '2m ago', path: 'USDT -> BTC -> ETH -> USDT', profit: 15.23, fees: 1.2, netProfit: 14.03 },
    { id: 'th-2', timestamp: '5m ago', path: 'USDT -> ADA -> SOL -> USDT', profit: 8.45, fees: 0.8, netProfit: 7.65 },
    { id: 'th-3', timestamp: '8m ago', path: 'USDT -> LINK -> UNI -> USDT', profit: 11.20, fees: 1.1, netProfit: 10.10 },
];
const mockPnlData = [
    { time: '10:00', pnl: 0 }, { time: '10:05', pnl: 7.65 }, { time: '10:07', pnl: 21.68 }, { time: '10:10', pnl: 20.50 }, {time: '10:15', pnl: 31.78}
];

const ArbitrageView: React.FC = () => {
    const [engineRunning, setEngineRunning] = useState(false);
    const [config, setConfig] = useState<ArbitrageConfig>({ capitalAllocation: 10000, minReturnThreshold: 0.5, maxDrawdown: 10, includedAssets: ['BTC', 'ETH', 'SOL', 'ADA'] });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            {/* Left Column: Config & Control */}
            <div className="lg:col-span-3 space-y-6">
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Arbitrage Engine</h2>
                        <div className={`flex items-center text-sm font-semibold ${engineRunning ? 'text-success' : 'text-gray-500'}`}>
                            <div className={`h-2 w-2 rounded-full mr-2 ${engineRunning ? 'bg-success animate-pulse' : 'bg-gray-400'}`}></div>
                            {engineRunning ? 'RUNNING' : 'STOPPED'}
                        </div>
                    </div>
                    <button 
                        onClick={() => setEngineRunning(!engineRunning)}
                        className={`w-full flex items-center justify-center py-3 rounded-lg font-bold text-lg transition-colors ${engineRunning ? 'bg-danger text-white hover:bg-red-700' : 'bg-success text-white hover:bg-green-700'}`}
                    >
                        <Icon name="power" className="h-6 w-6 mr-2" />
                        {engineRunning ? 'STOP ENGINE' : 'START ENGINE'}
                    </button>
                </Card>
                <Card>
                     <h3 className="text-lg font-semibold mb-4">Configuration</h3>
                     <div className="space-y-4 text-sm">
                        <div>
                            <label className="font-medium">Capital Allocation</label>
                            <input type="number" value={config.capitalAllocation} onChange={e => setConfig(c => ({...c, capitalAllocation: +e.target.value}))} className="w-full mt-1 p-2 bg-gray-100 dark:bg-dark-bg-secondary rounded-md border dark:border-dark-border"/>
                        </div>
                         <div>
                            <label className="font-medium">Min. Profit Threshold (%)</label>
                            <input type="number" step="0.01" value={config.minReturnThreshold} onChange={e => setConfig(c => ({...c, minReturnThreshold: +e.target.value}))} className="w-full mt-1 p-2 bg-gray-100 dark:bg-dark-bg-secondary rounded-md border dark:border-dark-border"/>
                        </div>
                         <div>
                            <label className="font-medium">Max. Drawdown Circuit Breaker (%)</label>
                            <input type="number" value={config.maxDrawdown} onChange={e => setConfig(c => ({...c, maxDrawdown: +e.target.value}))} className="w-full mt-1 p-2 bg-gray-100 dark:bg-dark-bg-secondary rounded-md border dark:border-dark-border"/>
                        </div>
                     </div>
                </Card>
            </div>

            {/* Center Column: Live Data */}
            <div className="lg:col-span-5 space-y-6">
                 <Card>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div><p className="text-sm text-gray-500">Live PnL</p><p className="text-2xl font-bold text-success">+$31.78</p></div>
                        <div><p className="text-sm text-gray-500">Capital Deployed</p><p className="text-2xl font-bold">$2,500</p></div>
                        <div><p className="text-sm text-gray-500">Success Rate</p><p className="text-2xl font-bold">88%</p></div>
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Icon name="zap" className="h-5 w-5 mr-2 text-yellow-400" />
                        Live Opportunity Ticker
                    </h3>
                    <div className="space-y-2">
                        {mockOpportunities.map(op => (
                            <div key={op.id} className="p-2 bg-gray-50 dark:bg-dark-bg-secondary rounded-md flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-semibold">{op.path}</p>
                                    <p className="text-xs text-gray-400">{op.exchanges}</p>
                                </div>
                                <p className="text-lg font-bold text-success">+{op.profit.toFixed(2)}%</p>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold mb-2">Active Executions</h3>
                    <div className="space-y-2">
                         {mockActiveTrades.map(trade => (
                            <div key={trade.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                                <p className="text-sm font-semibold">{trade.path}</p>
                                <div className="flex items-center text-xs mt-1">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mr-2">
                                        <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '66%'}}></div>
                                    </div>
                                    <span className="whitespace-nowrap">{trade.status}</span>
                                </div>
                            </div>
                        ))}
                         {mockActiveTrades.length === 0 && <p className="text-sm text-center text-gray-500 py-4">No active trades.</p>}
                    </div>
                </Card>
            </div>
            
            {/* Right Column: History & Analytics */}
            <div className="lg:col-span-4 space-y-6">
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Historical Performance</h3>
                    <div className="h-48">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockPnlData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.2)" />
                                <XAxis dataKey="time" stroke="rgba(156, 163, 175, 1)" />
                                <YAxis stroke="rgba(156, 163, 175, 1)" domain={['dataMin - 5', 'dataMax + 5']} />
                                <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} />
                                <Line type="monotone" dataKey="pnl" stroke="#10b981" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                 <Card className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Trade Ledger</h3>
                    <div className="overflow-y-auto max-h-96">
                        <table className="w-full text-xs">
                             <thead className="sticky top-0 bg-white dark:bg-dark-card">
                                <tr>
                                    <th className="p-1 text-left">Time</th>
                                    <th className="p-1 text-left">Path</th>
                                    <th className="p-1 text-right">Net Profit</th>
                                </tr>
                             </thead>
                             <tbody>
                                {mockTradeHistory.map(t => (
                                <tr key={t.id} className="border-b dark:border-dark-border">
                                    <td className="p-1 text-gray-400">{t.timestamp}</td>
                                    <td className="p-1 font-medium">{t.path}</td>
                                    <td className="p-1 text-right font-semibold text-success">${t.netProfit.toFixed(2)}</td>
                                </tr>
                                ))}
                             </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ArbitrageView;