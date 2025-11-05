import React from 'react';
import Card from '../../components/Card';
import { AdminBotInfo } from '../../types';
import Icon from '../../components/Icon';

const mockBots: AdminBotInfo[] = [
    { botId: 'BOT-A1', userId: 'USR-11A2', strategy: 'Advanced DCA', pair: 'BTC/USDT', status: 'Active', pnl: 1250.50, drawdown: -2.5 },
    { botId: 'BOT-B2', userId: 'USR-B3C4', strategy: 'Grid Bot', pair: 'ETH/USDT', status: 'Active', pnl: 850.75, drawdown: -1.8 },
    { botId: 'BOT-C3', userId: 'USR-9D5E', strategy: 'Signal Bot', pair: 'SOL/USDT', status: 'Error', pnl: -150.20, drawdown: -8.2 },
    { botId: 'BOT-D4', userId: 'USR-F6G7', strategy: 'Advanced DCA', pair: 'ADA/USDT', status: 'Paused', pnl: 25.10, drawdown: -0.5 },
];

const BotManagementView: React.FC = () => {

    const getStatusClasses = (status: AdminBotInfo['status']) => {
        switch(status) {
            case 'Active': return 'bg-success/10 text-success';
            case 'Paused': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300';
            case 'Error': return 'bg-danger/10 text-danger';
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Total Active Bots</p><p className="text-3xl font-bold mt-1">18,345</p></Card>
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Bots with Errors</p><p className="text-3xl font-bold text-danger mt-1">12</p></Card>
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">24h PnL</p><p className="text-3xl font-bold text-success mt-1">+$150,000</p></Card>
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Highest Drawdown</p><p className="text-3xl font-bold text-warning mt-1">-18.5%</p></Card>
            </div>
            <Card>
                <h2 className="text-xl font-bold mb-4">Global Bot Management</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-bg-secondary dark:text-dark-text-secondary">
                            <tr>
                                <th className="px-6 py-3">Bot ID</th>
                                <th className="px-6 py-3">User ID</th>
                                <th className="px-6 py-3">Strategy</th>
                                <th className="px-6 py-3">Pair</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">PnL</th>
                                <th className="px-6 py-3">Drawdown</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockBots.map(bot => (
                                <tr key={bot.botId} className="border-b dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg-secondary">
                                    <td className="px-6 py-4 font-mono text-xs">{bot.botId}</td>
                                    <td className="px-6 py-4">{bot.userId}</td>
                                    <td className="px-6 py-4">{bot.strategy}</td>
                                    <td className="px-6 py-4">{bot.pair}</td>
                                    <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(bot.status)}`}>{bot.status}</span></td>
                                    <td className={`px-6 py-4 font-semibold ${bot.pnl >= 0 ? 'text-success' : 'text-danger'}`}>${bot.pnl.toFixed(2)}</td>
                                    <td className="px-6 py-4">{bot.drawdown.toFixed(1)}%</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                             <button 
                                                onClick={() => alert(`Force Pause Bot\n\nBot ID: ${bot.botId}\nStrategy: ${bot.strategy}\n\nThis will immediately pause the bot and prevent it from executing new trades.`)}
                                                title="Force Pause" 
                                                className="text-yellow-500 hover:text-yellow-700"
                                             >
                                                <Icon name="warning" className="h-5 w-5" />
                                             </button>
                                             <button 
                                                onClick={() => {
                                                    if (confirm(`Force Close Position\n\nBot ID: ${bot.botId}\nPair: ${bot.pair}\n\nThis will close all open positions immediately. Are you sure?`)) {
                                                        alert('Position closed successfully');
                                                    }
                                                }}
                                                title="Force Close Position" 
                                                className="text-danger hover:text-red-700"
                                             >
                                                <Icon name="cross" className="h-5 w-5" />
                                             </button>
                                             <button 
                                                onClick={() => alert(`Bot Details\n\nBot ID: ${bot.botId}\nUser: ${bot.userId}\nStrategy: ${bot.strategy}\nPair: ${bot.pair}\nStatus: ${bot.status}\nP&L: $${bot.pnl}\nDrawdown: ${bot.drawdown}%\n\nThis would open detailed bot analytics and configuration.`)}
                                                title="View Details" 
                                                className="text-primary hover:text-primary-hover"
                                             >
                                                <Icon name="search" className="h-5 w-5" />
                                             </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default BotManagementView;
