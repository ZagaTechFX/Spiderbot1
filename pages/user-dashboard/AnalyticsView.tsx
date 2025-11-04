import React from 'react';
import Card from '../../components/Card';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AnalyticsView: React.FC = () => {
    
    const kpiData = [
        { title: 'Total PnL', value: '$12,480.50' },
        { title: 'Win Rate', value: '72.3%' },
        { title: 'Profit Factor', value: '1.82' },
        { title: 'Avg Trade PnL', value: '$45.80' },
    ];

    const emotionalData = [
        { title: 'Adherence Score', value: '8/10', description: "Bot cycles completed without manual intervention." },
        { title: 'Intervention P&L Impact', value: '-$245.30', description: "P&L change from your manual closes vs. bot's logic." },
    ]

    const profitByPairData = [
        { name: 'BTC/USDT', profit: 5500 },
        { name: 'ETH/USDT', profit: 4200 },
        { name: 'SOL/USDT', profit: 2100 },
        { name: 'ADA/USDT', profit: 1200 },
        { name: 'XRP/USDT', profit: -500 },
    ];

    const tradeDurationData = [
        { name: '< 1h', wins: 40, losses: 25 },
        { name: '1-4h', wins: 80, losses: 30 },
        { name: '4-12h', wins: 50, losses: 15 },
        { name: '> 12h', wins: 20, losses: 5 },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(item => (
                    <Card key={item.title}>
                        <p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">{item.title}</p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{item.value}</p>
                    </Card>
                ))}
            </div>
            
            <Card>
                <h3 className="text-lg font-semibold mb-2">Emotional Performance Indicators</h3>
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-4">Quantifying your interaction with the bots.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {emotionalData.map(item => (
                        <div key={item.title} className="bg-gray-50 dark:bg-dark-bg-secondary p-4 rounded-lg">
                            <p className="font-semibold text-gray-700 dark:text-dark-text">{item.title}</p>
                            <p className={`text-2xl font-bold ${item.value.startsWith('-') ? 'text-danger' : 'text-success'}`}>{item.value}</p>
                            <p className="text-xs text-gray-500 dark:text-dark-text-secondary mt-1">{item.description}</p>
                        </div>
                    ))}
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Profit by Trading Pair</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={profitByPairData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.3)" />
                                <XAxis dataKey="name" stroke="rgba(156, 163, 175, 1)" />
                                <YAxis stroke="rgba(156, 163, 175, 1)" />
                                <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} labelStyle={{ color: '#e2e8f0' }} />
                                <Bar dataKey="profit">
                                    {profitByPairData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? '#10b981' : '#ef4444'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                 <Card>
                    <h3 className="text-lg font-semibold mb-4">Trade Duration Analysis</h3>
                    <div className="h-80">
                       <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={tradeDurationData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.3)" />
                                <XAxis dataKey="name" stroke="rgba(156, 163, 175, 1)" />
                                <YAxis stroke="rgba(156, 163, 175, 1)" />
                                <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} labelStyle={{ color: '#e2e8f0' }}/>
                                <Legend />
                                <Bar dataKey="wins" stackId="a" fill="#10b981" />
                                <Bar dataKey="losses" stackId="a" fill="#ef4444" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsView;