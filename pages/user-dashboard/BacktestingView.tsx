import React, { useState } from 'react';
import Card from '../../components/Card';
import Icon from '../../components/Icon';

const BacktestingView: React.FC = () => {
  const [strategy, setStrategy] = useState('Advanced DCA');
  const [timeframe, setTimeframe] = useState('1 Year');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleRunBacktest = () => {
    setIsRunning(true);
    setTimeout(() => {
      setResults({
        totalReturn: 45.67,
        sharpeRatio: 1.85,
        maxDrawdown: 12.3,
        winRate: 68.5,
        totalTrades: 247,
        avgProfit: 3.2,
        avgLoss: -1.8
      });
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white">Strategy Backtesting</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text-secondary mt-1">Test your strategies against historical data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1">
          <h3 className="text-base sm:text-lg font-bold mb-4 dark:text-white">Backtest Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Strategy</label>
              <select 
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option>Advanced DCA</option>
                <option>Advanced Grid</option>
                <option>Signal Bot</option>
                <option>TradingView Webhook</option>
                <option>Quantitative Strategy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timeframe</label>
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>1 Year</option>
                <option>2 Years</option>
                <option>All Time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trading Pair</label>
              <select className="w-full px-3 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary">
                <option>BTC/USDT</option>
                <option>ETH/USDT</option>
                <option>SOL/USDT</option>
                <option>BNB/USDT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Initial Capital ($)</label>
              <input 
                type="number"
                defaultValue={10000}
                step={100}
                className="w-full px-3 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <button 
              onClick={handleRunBacktest}
              disabled={isRunning}
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Running Backtest...</span>
                </>
              ) : (
                <>
                  <Icon name="analytics" className="h-5 w-5" />
                  <span>Run Backtest</span>
                </>
              )}
            </button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-base sm:text-lg font-bold mb-4 dark:text-white">Backtest Results</h3>
          
          {!results ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Icon name="analytics" className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-dark-text-secondary">Configure and run a backtest to see results</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Total Return</p>
                  <p className="text-2xl font-bold text-success mt-1">+{results.totalReturn}%</p>
                </div>
                
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Sharpe Ratio</p>
                  <p className="text-2xl font-bold text-primary mt-1">{results.sharpeRatio}</p>
                </div>
                
                <div className="bg-danger/10 border border-danger/30 rounded-lg p-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Max Drawdown</p>
                  <p className="text-2xl font-bold text-danger mt-1">-{results.maxDrawdown}%</p>
                </div>
                
                <div className="bg-info/10 border border-info/30 rounded-lg p-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Win Rate</p>
                  <p className="text-2xl font-bold text-info mt-1">{results.winRate}%</p>
                </div>
                
                <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Total Trades</p>
                  <p className="text-2xl font-bold text-warning mt-1">{results.totalTrades}</p>
                </div>
                
                <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Avg Profit</p>
                  <p className="text-2xl font-bold text-success mt-1">+{results.avgProfit}%</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-dark-bg-secondary rounded-lg p-4">
                <h4 className="font-semibold mb-2 dark:text-white">Performance Chart</h4>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Equity Curve Visualization</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BacktestingView;
