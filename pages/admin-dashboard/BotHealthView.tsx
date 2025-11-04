import React from 'react';
import Card from '../../components/Card';
import { BotHealth } from '../../types';

const mockBotHealth: BotHealth[] = [
    { botId: 'BOT-A1', userId: 'USR-11A2', strategy: 'Advanced DCA', status: 'Healthy', lastHeartbeat: '5s ago' },
    { botId: 'BOT-B2', userId: 'USR-B3C4', strategy: 'Grid Bot', status: 'Healthy', lastHeartbeat: '8s ago' },
    { botId: 'BOT-C3', userId: 'USR-9D5E', strategy: 'Signal Bot', status: 'Critical', lastHeartbeat: '15m ago' },
    { botId: 'BOT-E5', userId: 'USR-F6G7', strategy: 'Grid Bot', status: 'Warning', lastHeartbeat: '2m ago' },
    { botId: 'BOT-F6', userId: 'USR-11A2', strategy: 'Advanced DCA', status: 'Healthy', lastHeartbeat: '12s ago' },
];

const BotHealthView: React.FC = () => {

    const getStatusInfo = (status: BotHealth['status']) => {
        switch (status) {
            case 'Healthy': return { color: 'bg-success', text: 'text-success' };
            case 'Warning': return { color: 'bg-warning', text: 'text-warning' };
            case 'Critical': return { color: 'bg-danger', text: 'text-danger' };
        }
    };
    
    const kpiData = {
        total: mockBotHealth.length,
        healthy: mockBotHealth.filter(b => b.status === 'Healthy').length,
        warning: mockBotHealth.filter(b => b.status === 'Warning').length,
        critical: mockBotHealth.filter(b => b.status === 'Critical').length,
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Total Bots</p><p className="text-3xl font-bold mt-1">{kpiData.total}</p></Card>
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Healthy</p><p className="text-3xl font-bold text-success mt-1">{kpiData.healthy}</p></Card>
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Warnings</p><p className="text-3xl font-bold text-warning mt-1">{kpiData.warning}</p></Card>
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Critical</p><p className="text-3xl font-bold text-danger mt-1">{kpiData.critical}</p></Card>
            </div>
            <Card>
                <h2 className="text-xl font-bold mb-4">Bot Health & Heartbeats</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {mockBotHealth.map(bot => (
                        <div key={bot.botId} className="border dark:border-dark-border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-mono text-xs font-semibold">{bot.botId}</span>
                                <div className="flex items-center space-x-2">
                                    <span className={`text-xs font-bold ${getStatusInfo(bot.status).text}`}>{bot.status}</span>
                                    <div className={`h-3 w-3 rounded-full ${getStatusInfo(bot.status).color}`}></div>
                                </div>
                            </div>
                            <p className="text-sm"><strong>User:</strong> {bot.userId}</p>
                            <p className="text-sm"><strong>Strategy:</strong> {bot.strategy}</p>
                            <p className="text-xs text-gray-400 mt-2">Last Heartbeat: {bot.lastHeartbeat}</p>
                            <button className="text-xs font-semibold text-primary hover:underline mt-3 w-full text-left">View Logs</button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default BotHealthView;