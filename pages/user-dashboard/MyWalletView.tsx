import React, { useState } from 'react';
import Card from '../../components/Card';
import Icon from '../../components/Icon';

const MyWalletView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const balances = [
    { asset: 'BTC', amount: '2.45', value: '$125,430.00', change: '+12.5%', icon: '₿' },
    { asset: 'ETH', amount: '15.8', value: '$45,670.00', change: '+8.3%', icon: 'Ξ' },
    { asset: 'USDT', amount: '25,000.00', value: '$25,000.00', change: '0.0%', icon: '$' },
    { asset: 'SOL', amount: '125.5', value: '$18,950.00', change: '-3.2%', icon: '◎' },
    { asset: 'BNB', amount: '45.2', value: '$22,135.00', change: '+5.7%', icon: 'B' },
  ];

  const transactions = [
    { type: 'Deposit', asset: 'BTC', amount: '+0.5', time: '2 hours ago', status: 'Completed' },
    { type: 'Withdrawal', asset: 'USDT', amount: '-5,000', time: '5 hours ago', status: 'Completed' },
    { type: 'Trade', asset: 'ETH', amount: '+2.3', time: '1 day ago', status: 'Completed' },
    { type: 'Deposit', asset: 'SOL', amount: '+50', time: '2 days ago', status: 'Completed' },
  ];

  const totalValue = balances.reduce((sum, b) => sum + parseFloat(b.value.replace(/[^0-9.-]+/g, "")), 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white">My Wallet</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text-secondary mt-1">Manage your assets and transactions</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-success hover:bg-green-700 text-white rounded-lg transition-colors text-sm flex items-center space-x-2">
            <Icon name="plus" className="h-4 w-4" />
            <span>Deposit</span>
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors text-sm flex items-center space-x-2">
            <Icon name="minus" className="h-4 w-4" />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-xs text-gray-600 dark:text-gray-400">Total Portfolio Value</p>
          <p className="text-2xl font-bold text-primary mt-1">${totalValue.toLocaleString()}</p>
          <p className="text-xs text-success mt-1">+8.5% (24h)</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-600 dark:text-gray-400">Available Balance</p>
          <p className="text-2xl font-bold dark:text-white mt-1">${(totalValue * 0.75).toLocaleString()}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">75% of total</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-600 dark:text-gray-400">Locked in Trades</p>
          <p className="text-2xl font-bold dark:text-white mt-1">${(totalValue * 0.25).toLocaleString()}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">25% of total</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-600 dark:text-gray-400">Total P&L (All Time)</p>
          <p className="text-2xl font-bold text-success mt-1">+$32,450</p>
          <p className="text-xs text-success mt-1">+17.8%</p>
        </Card>
      </div>

      <div className="border-b border-gray-200 dark:border-dark-border">
        <div className="flex space-x-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-2 text-sm font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary dark:hover:text-white'
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('transactions')}
            className={`pb-3 px-2 text-sm font-medium transition-colors ${
              activeTab === 'transactions' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary dark:hover:text-white'
            }`}
          >
            Transactions
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <Card>
          <h3 className="text-lg font-bold mb-4 dark:text-white">Asset Balances</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border">
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Asset</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Amount</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Value</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">24h Change</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {balances.map((balance) => (
                  <tr key={balance.asset} className="border-b border-gray-100 dark:border-dark-border/50 hover:bg-gray-50 dark:hover:bg-dark-bg-secondary/50">
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {balance.icon}
                        </div>
                        <span className="font-medium dark:text-white">{balance.asset}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono text-sm dark:text-white">{balance.amount}</td>
                    <td className="py-3 px-2 font-semibold dark:text-white">{balance.value}</td>
                    <td className={`py-3 px-2 font-medium ${balance.change.startsWith('+') ? 'text-success' : balance.change.startsWith('-') ? 'text-danger' : 'text-gray-500'}`}>
                      {balance.change}
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => alert(`Buy ${balance.asset}: This would open a buy order form`)}
                          className="text-xs px-2 py-1 bg-success hover:bg-green-700 text-white rounded transition-colors"
                        >
                          Buy
                        </button>
                        <button 
                          onClick={() => alert(`Sell ${balance.asset}: This would open a sell order form`)}
                          className="text-xs px-2 py-1 bg-danger hover:bg-red-700 text-white rounded transition-colors"
                        >
                          Sell
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'transactions' && (
        <Card>
          <h3 className="text-lg font-bold mb-4 dark:text-white">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg-secondary/50">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    tx.type === 'Deposit' ? 'bg-success/10' :
                    tx.type === 'Withdrawal' ? 'bg-danger/10' : 'bg-info/10'
                  }`}>
                    <Icon 
                      name={tx.type === 'Deposit' ? 'plus' : tx.type === 'Withdrawal' ? 'minus' : 'refresh'} 
                      className={`h-5 w-5 ${
                        tx.type === 'Deposit' ? 'text-success' :
                        tx.type === 'Withdrawal' ? 'text-danger' : 'text-info'
                      }`} 
                    />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{tx.type}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-mono font-medium ${tx.amount.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                    {tx.amount} {tx.asset}
                  </p>
                  <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default MyWalletView;
