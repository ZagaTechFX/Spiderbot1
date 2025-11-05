import React from 'react';
import Card from '../../components/Card';
import Icon from '../../components/Icon';

const SystemStatusView: React.FC = () => {
  const services = [
    { name: 'Web Server', status: 'operational', uptime: '99.99%', responseTime: '45ms' },
    { name: 'API Server', status: 'operational', uptime: '99.98%', responseTime: '78ms' },
    { name: 'Database', status: 'operational', uptime: '100%', responseTime: '12ms' },
    { name: 'WebSocket Server', status: 'operational', uptime: '99.95%', responseTime: '32ms' },
    { name: 'Trading Engine', status: 'operational', uptime: '99.97%', responseTime: '156ms' },
    { name: 'Market Data Feed', status: 'degraded', uptime: '98.45%', responseTime: '234ms' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white">System Status</h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text-secondary mt-1">Real-time platform health monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.name}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold dark:text-white">{service.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                service.status === 'operational' ? 'bg-success/20 text-success' :
                service.status === 'degraded' ? 'bg-warning/20 text-warning' : 'bg-danger/20 text-danger'
              }`}>
                {service.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Uptime</span>
                <span className="font-medium dark:text-white">{service.uptime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Response Time</span>
                <span className="font-medium dark:text-white">{service.responseTime}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-lg font-bold mb-4 dark:text-white">System Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm dark:text-white">CPU Usage</span>
              <span className="text-sm font-medium dark:text-white">45%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-dark-bg-secondary rounded-full h-3">
              <div className="bg-primary h-3 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm dark:text-white">Memory Usage</span>
              <span className="text-sm font-medium dark:text-white">68%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-dark-bg-secondary rounded-full h-3">
              <div className="bg-warning h-3 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm dark:text-white">Disk Usage</span>
              <span className="text-sm font-medium dark:text-white">32%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-dark-bg-secondary rounded-full h-3">
              <div className="bg-success h-3 rounded-full" style={{ width: '32%' }}></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemStatusView;
