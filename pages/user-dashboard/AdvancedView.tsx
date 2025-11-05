import React from 'react';
import Card from '../../components/Card';
import Icon from '../../components/Icon';

const AdvancedView: React.FC = () => {
  const advancedFeatures = [
    {
      title: 'API Trading',
      description: 'Direct API access for algorithmic trading and custom integrations',
      icon: 'exchange',
      status: 'Available',
      color: 'success'
    },
    {
      title: 'Smart Order Routing',
      description: 'Optimize order execution across multiple exchanges automatically',
      icon: 'refresh',
      status: 'Beta',
      color: 'warning'
    },
    {
      title: 'Market Making',
      description: 'Provide liquidity and earn rebates with automated market making strategies',
      icon: 'analytics',
      status: 'Available',
      color: 'success'
    },
    {
      title: 'Arbitrage Scanner',
      description: 'Detect and execute cross-exchange arbitrage opportunities in real-time',
      icon: 'search',
      status: 'Available',
      color: 'success'
    },
    {
      title: 'Portfolio Rebalancing',
      description: 'Automated portfolio rebalancing based on custom allocation targets',
      icon: 'refresh',
      status: 'Available',
      color: 'success'
    },
    {
      title: 'Advanced Analytics',
      description: 'Deep performance analytics, attribution analysis, and custom reporting',
      icon: 'chart',
      status: 'Available',
      color: 'success'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white">Advanced Features</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text-secondary mt-1">Professional-grade trading tools and capabilities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {advancedFeatures.map((feature) => (
          <Card key={feature.title} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${feature.color}/10`}>
                <Icon name={feature.icon} className={`h-6 w-6 text-${feature.color}`} />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full bg-${feature.color}/20 text-${feature.color}`}>
                {feature.status}
              </span>
            </div>
            <h3 className="text-base font-bold dark:text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
            <button 
              onClick={() => alert(`Configure ${feature.title}\n\nThis would open the configuration panel for this advanced feature.`)}
              className="w-full text-sm px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
            >
              Configure
            </button>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-lg font-bold mb-4 dark:text-white">API Configuration</h3>
        <div className="space-y-4">
          <div className="bg-info/10 border border-info/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="info" className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-info mb-1">API Access Enabled</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Your API keys are active and ready for use. Keep your secret keys secure and never share them.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Key</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  value="sk_live_1234567890abcdef" 
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white font-mono text-sm"
                />
                <button className="px-3 py-2 bg-dark-bg-secondary hover:bg-gray-700 text-white rounded-lg transition-colors">
                  Copy
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Secret Key</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="password" 
                  value="********************************" 
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white font-mono text-sm"
                />
                <button className="px-3 py-2 bg-dark-bg-secondary hover:bg-gray-700 text-white rounded-lg transition-colors">
                  Show
                </button>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-danger hover:bg-red-700 text-white rounded-lg transition-colors text-sm">
              Revoke Keys
            </button>
            <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors text-sm">
              Generate New Keys
            </button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-lg font-bold mb-4 dark:text-white">WebSocket Streams</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-dark-border">
              <span className="text-sm dark:text-white">Market Data Stream</span>
              <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">Connected</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-dark-border">
              <span className="text-sm dark:text-white">Order Updates Stream</span>
              <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">Connected</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-dark-border">
              <span className="text-sm dark:text-white">Account Balance Stream</span>
              <span className="text-xs px-2 py-1 rounded-full bg-warning/20 text-warning">Disconnected</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold mb-4 dark:text-white">Rate Limits</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm dark:text-white">API Requests</span>
                <span className="text-sm font-medium dark:text-white">847 / 1000</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '84.7%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm dark:text-white">Order Placements</span>
                <span className="text-sm font-medium dark:text-white">45 / 100</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-bg-secondary rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm dark:text-white">WebSocket Connections</span>
                <span className="text-sm font-medium dark:text-white">3 / 5</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-bg-secondary rounded-full h-2">
                <div className="bg-info h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedView;
