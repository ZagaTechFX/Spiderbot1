import React from 'react';
import Card from '../../components/Card';
import Icon from '../../components/Icon';

const PerformanceMetricsView: React.FC = () => {
  const platformMetrics = [
    { label: 'Total Users', value: '12,458', change: '+8.5%', icon: 'users', trend: 'up' },
    { label: 'Active Bots', value: '3,247', change: '+12.3%', icon: 'bot', trend: 'up' },
    { label: 'Trading Volume (24h)', value: '$45.2M', change: '+15.7%', icon: 'trades', trend: 'up' },
    { label: 'Platform Revenue', value: '$324K', change: '+22.1%', icon: 'wallet', trend: 'up' },
    { label: 'Avg Response Time', value: '124ms', change: '-5.3%', icon: 'clock', trend: 'down' },
    { label: 'Uptime', value: '99.98%', change: '+0.02%', icon: 'check', trend: 'up' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white">Performance Metrics</h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text-secondary mt-1">Platform analytics and KPIs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platformMetrics.map((metric) => (
          <Card key={metric.label}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{metric.label}</p>
                <p className="text-2xl font-bold dark:text-white">{metric.value}</p>
                <p className={`text-sm font-medium mt-1 ${metric.trend === 'up' ? 'text-success' : 'text-warning'}`}>
                  {metric.change} vs last period
                </p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon name={metric.icon} className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-lg font-bold mb-4 dark:text-white">User Growth</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded">
            <p className="text-gray-500 dark:text-gray-400">Growth Chart</p>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold mb-4 dark:text-white">Revenue Trends</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded">
            <p className="text-gray-500 dark:text-gray-400">Revenue Chart</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceMetricsView;
