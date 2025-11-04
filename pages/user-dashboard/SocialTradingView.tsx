
import React, { useState } from 'react';
import Card from '../../components/Card';
import Icon from '../../components/Icon';
import { MasterTrader, CopiedTrade } from '../../types';

const mockMasterTraders: MasterTrader[] = [
  { id: 'trader-1', name: 'CryptoWizard', avatarUrl: 'https://picsum.photos/seed/wizard/100', pnl: 145.5, maxDrawdown: 15.2, winRate: 78, aumCopied: 1200000, strategy: 'Advanced DCA' },
  { id: 'trader-2', name: 'VolatilityKing', avatarUrl: 'https://picsum.photos/seed/king/100', pnl: 98.2, maxDrawdown: 25.5, winRate: 65, aumCopied: 850000, strategy: 'Grid Bot' },
  { id: 'trader-3', name: 'SteadyGains', avatarUrl: 'https://picsum.photos/seed/steady/100', pnl: 45.1, maxDrawdown: 8.1, winRate: 85, aumCopied: 2100000, strategy: 'Mean Reversion' },
  { id: 'trader-4', name: 'SignalSurfer', avatarUrl: 'https://picsum.photos/seed/surfer/100', pnl: 210.3, maxDrawdown: 35.8, winRate: 61, aumCopied: 550000, strategy: 'Signal Bot' },
];

const mockCopiedTrades: CopiedTrade[] = [
    { id: 'ct-1', masterTraderId: 'trader-1', masterTraderName: 'CryptoWizard', masterTraderAvatarUrl: 'https://picsum.photos/seed/wizard/100', strategy: 'Advanced DCA', symbol: 'ETH/USDT', position: 'Long', pnl: 52.10, timestamp: '2m ago' },
    { id: 'ct-2', masterTraderId: 'trader-2', masterTraderName: 'VolatilityKing', masterTraderAvatarUrl: 'https://picsum.photos/seed/king/100', strategy: 'Grid Bot', symbol: 'BTC/USDT', position: 'Short', pnl: -15.80, timestamp: '5m ago' },
    { id: 'ct-3', masterTraderId: 'trader-3', masterTraderName: 'SteadyGains', masterTraderAvatarUrl: 'https://picsum.photos/seed/steady/100', strategy: 'Mean Reversion', symbol: 'ADA/USDT', position: 'Long', pnl: 22.45, timestamp: '8m ago' },
    { id: 'ct-4', masterTraderId: 'trader-1', masterTraderName: 'CryptoWizard', masterTraderAvatarUrl: 'https://picsum.photos/seed/wizard/100', strategy: 'Advanced DCA', symbol: 'SOL/USDT', position: 'Long', pnl: 112.90, timestamp: '12m ago' },
];

const CopySetupModal: React.FC<{ trader: MasterTrader; onClose: () => void }> = ({ trader, onClose }) => {
    const [config, setConfig] = useState({
        allocationMethod: 'Proportional',
        maxCapital: 500,
        maxLossLimit: 20,
    });

    const handleStartCopying = () => {
        console.log('Starting to copy', trader.name, 'with config:', config);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Copy Trader: <span className="text-primary">{trader.name}</span></h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                        <Icon name="cross" className="h-6 w-6" />
                    </button>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-2">Allocation Method</label>
                        <div className="flex space-x-2">
                            {['Proportional', 'Fixed Amount'].map(method => (
                                <button key={method} onClick={() => setConfig(c => ({...c, allocationMethod: method}))} className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${config.allocationMethod === method ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-dark-bg-secondary hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                                    {method}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <label htmlFor="maxCapital" className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Max Copy Capital (USDT)</label>
                        <input id="maxCapital" type="number" value={config.maxCapital} onChange={e => setConfig(c => ({...c, maxCapital: parseInt(e.target.value)}))} className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2 focus:ring-primary focus:border-primary" />
                    </div>
                     <div>
                        <label htmlFor="maxLoss" className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Max Loss Limit (Copy Guard %)</label>
                        <input id="maxLoss" type="number" value={config.maxLossLimit} onChange={e => setConfig(c => ({...c, maxLossLimit: parseInt(e.target.value)}))} className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2 focus:ring-primary focus:border-primary" />
                        <p className="text-xs text-gray-400 mt-1">If your copy P&L drops by this percentage, all positions will be closed automatically.</p>
                    </div>

                    <div className="flex space-x-4 pt-4">
                         <button onClick={onClose} className="w-full bg-gray-200 dark:bg-dark-bg-secondary py-2.5 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold">
                            Cancel
                        </button>
                        <button onClick={handleStartCopying} className="w-full bg-primary text-white py-2.5 px-4 rounded-lg hover:bg-primary-hover transition-colors font-semibold">
                            Start Copying
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};


const SocialTradingView: React.FC = () => {
  const [copyTrader, setCopyTrader] = useState<MasterTrader | null>(null);

  return (
    <>
      {copyTrader && <CopySetupModal trader={copyTrader} onClose={() => setCopyTrader(null)} />}
      <div className="space-y-8">
        {/* Discover Traders Section */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Discover Top Traders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-dark-text-secondary">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-bg-secondary dark:text-dark-text-secondary">
                <tr>
                  <th scope="col" className="px-6 py-3">Trader</th>
                  <th scope="col" className="px-6 py-3">P&L (90d)</th>
                  <th scope="col" className="px-6 py-3">Max Drawdown</th>
                  <th scope="col" className="px-6 py-3">Win Rate</th>
                  <th scope="col" className="px-6 py-3">AUM Copied</th>
                  <th scope="col" className="px-6 py-3">Strategy</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockMasterTraders.map(trader => (
                  <tr key={trader.id} className="bg-white border-b dark:bg-dark-card dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg-secondary">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        <img src={trader.avatarUrl} alt={trader.name} className="h-8 w-8 rounded-full mr-3" />
                        {trader.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-success">{trader.pnl.toFixed(1)}%</td>
                    <td className="px-6 py-4 text-danger">{trader.maxDrawdown.toFixed(1)}%</td>
                    <td className="px-6 py-4">{trader.winRate}%</td>
                    <td className="px-6 py-4">${trader.aumCopied.toLocaleString()}</td>
                    <td className="px-6 py-4">{trader.strategy}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setCopyTrader(trader)}
                        className="bg-primary/10 text-primary hover:bg-primary/20 font-semibold py-1 px-3 rounded-lg text-xs flex items-center"
                      >
                          <Icon name="copy" className="h-4 w-4 mr-1" />
                          Copy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Real-Time Feed Section */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Real-Time Copy Trade Feed</h2>
          <div className="space-y-4">
              {mockCopiedTrades.map(trade => (
                  <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg-secondary rounded-lg">
                      <div className="flex items-center">
                          <img src={trade.masterTraderAvatarUrl} alt={trade.masterTraderName} className="h-10 w-10 rounded-full mr-4"/>
                          <div>
                              <p className="text-sm font-semibold">
                                  You copied a trade from <span className="text-primary">{trade.masterTraderName}</span>
                              </p>
                              <p className="text-xs text-gray-500 dark:text-dark-text-secondary">
                                  {trade.strategy} | {trade.symbol} ({trade.position})
                              </p>
                          </div>
                      </div>
                      <div className="flex items-center space-x-6">
                          <div className="text-right">
                              <p className={`font-bold ${trade.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                                  {trade.pnl >= 0 ? `+$${trade.pnl.toFixed(2)}` : `-$${Math.abs(trade.pnl).toFixed(2)}`}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500">{trade.timestamp}</p>
                          </div>
                           <button className="text-sm font-medium text-primary hover:underline flex items-center space-x-1 whitespace-nowrap">
                              <Icon name="user" className="h-4 w-4" />
                              <span>View Profile</span>
                          </button>
                      </div>
                  </div>
              ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default SocialTradingView;
