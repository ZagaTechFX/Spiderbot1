import React from 'react';
import Card from '../../components/Card';
import Icon from '../../components/Icon';

const RiskAssessmentView: React.FC = () => {
  const riskMetrics = [
    { label: 'Portfolio Value at Risk (VaR)', value: '$2,450', risk: 'medium', icon: 'warning' },
    { label: 'Expected Shortfall (ES)', value: '$3,120', risk: 'high', icon: 'danger' },
    { label: 'Portfolio Beta', value: '1.35', risk: 'medium', icon: 'analytics' },
    { label: 'Correlation Risk', value: '0.78', risk: 'high', icon: 'refresh' },
    { label: 'Leverage Exposure', value: '3.2x', risk: 'high', icon: 'warning' },
    { label: 'Liquidity Risk Score', value: '6.5/10', risk: 'medium', icon: 'exchange' },
  ];

  const activePositions = [
    { pair: 'BTC/USDT', size: '$5,000', risk: 'Low', profit: '+12.5%', status: 'success' },
    { pair: 'ETH/USDT', size: '$3,500', risk: 'Medium', profit: '+8.3%', status: 'success' },
    { pair: 'SOL/USDT', size: '$2,000', risk: 'High', profit: '-3.2%', status: 'danger' },
    { pair: 'BNB/USDT', size: '$1,500', risk: 'Low', profit: '+5.7%', status: 'success' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white">Risk Assessment</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text-secondary mt-1">Monitor and manage your portfolio risk exposure</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {riskMetrics.map((metric) => (
          <Card key={metric.label}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{metric.label}</p>
                <p className="text-xl sm:text-2xl font-bold dark:text-white">{metric.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${
                metric.risk === 'high' ? 'bg-danger/10' :
                metric.risk === 'medium' ? 'bg-warning/10' : 'bg-success/10'
              }`}>
                <Icon 
                  name={metric.icon} 
                  className={`h-6 w-6 ${
                    metric.risk === 'high' ? 'text-danger' :
                    metric.risk === 'medium' ? 'text-warning' : 'text-success'
                  }`} 
                />
              </div>
            </div>
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                metric.risk === 'high' ? 'bg-danger/20 text-danger' :
                metric.risk === 'medium' ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
              }`}>
                {metric.risk.charAt(0).toUpperCase() + metric.risk.slice(1)} Risk
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-base sm:text-lg font-bold mb-4 dark:text-white">Position Risk Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Trading Pair</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Position Size</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Risk Level</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">P&L</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activePositions.map((position) => (
                <tr key={position.pair} className="border-b border-gray-100 dark:border-dark-border/50 hover:bg-gray-50 dark:hover:bg-dark-bg-secondary/50">
                  <td className="py-3 px-2 font-mono text-sm dark:text-white">{position.pair}</td>
                  <td className="py-3 px-2 text-sm dark:text-white">{position.size}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      position.risk === 'High' ? 'bg-danger/20 text-danger' :
                      position.risk === 'Medium' ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                    }`}>
                      {position.risk}
                    </span>
                  </td>
                  <td className={`py-3 px-2 text-sm font-semibold ${
                    position.status === 'success' ? 'text-success' : 'text-danger'
                  }`}>
                    {position.profit}
                  </td>
                  <td className="py-3 px-2">
                    <button 
                      onClick={() => alert(`Adjust position: ${position.pair}\n\nThis would open position adjustment controls for risk management.`)}
                      className="text-xs px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded transition-colors"
                    >
                      Adjust
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-base sm:text-lg font-bold mb-4 dark:text-white">Risk Limits & Alerts</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm dark:text-white">Max Daily Loss</span>
              <span className="text-sm font-semibold text-danger">$5,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm dark:text-white">Max Portfolio Drawdown</span>
              <span className="text-sm font-semibold text-warning">15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm dark:text-white">Max Position Size</span>
              <span className="text-sm font-semibold text-info">30% of Portfolio</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm dark:text-white">Max Leverage</span>
              <span className="text-sm font-semibold text-warning">5x</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-dark-bg-secondary hover:bg-gray-700 dark:hover:bg-gray-600 text-white py-2 rounded-lg transition-colors text-sm">
            Configure Risk Limits
          </button>
        </Card>

        <Card>
          <h3 className="text-base sm:text-lg font-bold mb-4 dark:text-white">Recent Risk Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <Icon name="warning" className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium dark:text-white">High Correlation Detected</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">BTC and ETH positions are highly correlated (0.92)</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-danger/10 border border-danger/30 rounded-lg">
              <Icon name="warning" className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium dark:text-white">Drawdown Approaching Limit</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Portfolio drawdown at 12.5% (limit: 15%)</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">5 hours ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RiskAssessmentView;
