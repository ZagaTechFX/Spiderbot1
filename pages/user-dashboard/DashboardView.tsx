
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../components/Icon';
import Card from '../../components/Card';
import { KpiCardData } from '../../types';

const kpiData: KpiCardData[] = [
    { title: 'Total PnL', value: '$12,480.50', change: '+2.5%', changeType: 'increase', icon: 'wallet' },
    { title: 'Win Rate', value: '72.3%', change: '-0.8%', changeType: 'decrease', icon: 'check' },
    { title: 'Active Bots', value: '14', icon: 'bot' },
    { title: 'Portfolio Value', value: '$152,830.00', change: '+5.1%', changeType: 'increase', icon: 'analytics' },
];

const portfolioData = [
    { name: 'Jan', value: 100000 },
    { name: 'Feb', value: 105000 },
    { name: 'Mar', value: 115000 },
    { name: 'Apr', value: 110000 },
    { name: 'May', value: 125000 },
    { name: 'Jun', value: 140000 },
    { name: 'Jul', value: 152830 },
];

const pnlByStrategyData = [
  { name: 'DCA', pnl: 4200 },
  { name: 'Grid', pnl: 3500 },
  { name: 'Signal', pnl: 2800 },
  { name: 'Arbitrage', pnl: 1500 },
  { name: 'Other', pnl: 480 },
];

const KpiCard: React.FC<{ data: KpiCardData }> = ({ data }) => {
    return (
        <Card className="flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">{data.title}</p>
                    <Icon name={data.icon} className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{data.value}</p>
            </div>
            {data.change && (
                 <p className={`text-sm font-semibold mt-4 ${data.changeType === 'increase' ? 'text-success' : 'text-danger'}`}>
                    {data.change} vs last month
                </p>
            )}
        </Card>
    );
}

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map(item => <KpiCard key={item.title} data={item} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Portfolio Performance</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={portfolioData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.3)" />
                        <XAxis dataKey="name" stroke="rgba(156, 163, 175, 1)" />
                        <YAxis stroke="rgba(156, 163, 175, 1)" />
                        <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} labelStyle={{ color: '#e2e8f0' }}/>
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <Card>
           <h3 className="text-lg font-semibold mb-4">PnL by Strategy</h3>
           <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pnlByStrategyData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.2)" />
                    <XAxis type="number" stroke="rgba(156, 163, 175, 1)" />
                    <YAxis dataKey="name" type="category" stroke="rgba(156, 163, 175, 1)" width={60}/>
                    <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} labelStyle={{ color: '#e2e8f0' }}/>
                    <Bar dataKey="pnl" fill="#4f46e5" background={{ fill: '#eee', fillOpacity: 0.1 }} />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
