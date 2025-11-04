
import React from 'react';
import Card from '../../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import Icon from '../../components/Icon';
import { SystemHealth } from '../../types';

const systemHealthData: SystemHealth[] = [
    { name: 'Binance API', status: 'ok', metric: '25ms' },
    { name: 'Bybit API', status: 'ok', metric: '40ms' },
    { name: 'Trading Engine', status: 'ok', metric: '65% Load' },
    { name: 'Database', status: 'warning', metric: '150ms latency' },
    { name: 'Unprocessed Signals', status: 'ok', metric: '2' },
];

const feesData = [ { day: 'Mon', fees: 2500 }, { day: 'Tue', fees: 3200 }, { day: 'Wed', fees: 2800 }, { day: 'Thu', fees: 4100 }, { day: 'Fri', fees: 5500 }, { day: 'Sat', fees: 6200 }, { day: 'Sun', fees: 5800 }];
const aumData = [{ name: 'BTC', value: 200.3 }, { name: 'ETH', value: 150.1 }, { name: 'USDT', value: 100.3 }];
const AUM_COLORS = ['#f59e0b', '#60a5fa', '#10b981'];

const getStatusColor = (status: string) => {
    if (status === 'ok') return 'text-success';
    if (status === 'warning') return 'text-warning';
    return 'text-danger';
};

const AuditLogItem: React.FC<{ action: string, user: string, time: string }> = ({ action, user, time }) => (
    <div className="flex items-start text-sm py-2">
        <div className="bg-gray-100 dark:bg-dark-bg-secondary p-1.5 rounded-full mr-3">
            <Icon name="search" className="h-4 w-4 text-gray-500" />
        </div>
        <div>
            <p className="font-medium">{action}</p>
            <p className="text-xs text-gray-400">{user} - {time}</p>
        </div>
    </div>
);

const AdminHomeView: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Total Users</p><p className="text-2xl lg:text-3xl font-bold mt-1">24,812</p></Card>
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">24h Volume</p><p className="text-2xl lg:text-3xl font-bold mt-1">$1.2B</p></Card>
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Platform AUM</p><p className="text-2xl lg:text-3xl font-bold mt-1">$450.7M</p></Card>
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Active Bots</p><p className="text-2xl lg:text-3xl font-bold mt-1">18,345</p></Card>
                 <Card><p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Pending Actions</p><p className="text-2xl lg:text-3xl font-bold text-warning mt-1">17</p></Card>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <h3 className="text-lg font-semibold mb-4">Platform Fees Collected (Last 7 Days)</h3>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={feesData}><CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.3)" /><XAxis dataKey="day" stroke="rgba(156, 163, 175, 1)" /><YAxis stroke="rgba(156, 163, 175, 1)" /><Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} labelStyle={{ color: '#e2e8f0' }}/><Bar dataKey="fees" fill="#4f46e5" /></BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                             <h3 className="text-lg font-semibold mb-4">System Health</h3>
                             <div className="space-y-3">
                                {systemHealthData.map(item => (
                                    <div key={item.name} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center">
                                            <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusColor(item.status).replace('text-', 'bg-')}`}></div>
                                            <span>{item.name}</span>
                                        </div>
                                        <span className="font-semibold">{item.metric}</span>
                                    </div>
                                ))}
                             </div>
                        </Card>
                        <Card>
                             <h3 className="text-lg font-semibold mb-4">Platform AUM Split</h3>
                             <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={aumData} cx="50%" cy="50%" outerRadius={80} dataKey="value" nameKey="name">
                                            {aumData.map((entry, index) => <Cell key={`cell-${index}`} fill={AUM_COLORS[index % AUM_COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} labelStyle={{ color: '#e2e8f0' }}/>
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                     </div>
                </div>
                
                {/* Right Column */}
                <div className="lg:col-span-1 space-y-6">
                     <Card>
                        <h3 className="text-lg font-semibold mb-2">Pending Admin Actions</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center"><p>KYC Pending Review</p><span className="font-bold text-warning">8</span></div>
                            <div className="flex justify-between items-center"><p>Large Withdrawals</p><span className="font-bold text-warning">3</span></div>
                            <div className="flex justify-between items-center"><p>Open Support Tickets</p><span className="font-bold text-warning">6</span></div>
                        </div>
                    </Card>
                    <Card>
                        <h3 className="text-lg font-semibold mb-2">Recent Audit Trail</h3>
                        <div className="divide-y divide-gray-200 dark:divide-dark-border -mx-6 px-6">
                            <AuditLogItem action="Changed global fee to 0.18%" user="SuperAdmin" time="5m ago" />
                            <AuditLogItem action="Approved KYC for User ID 12345" user="Mod Y" time="15m ago" />
                            <AuditLogItem action="Force-closed position on BOT-C3" user="RiskManager" time="1h ago" />
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default AdminHomeView;
