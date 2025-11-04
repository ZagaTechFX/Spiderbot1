
import React, { useState, useMemo } from 'react';
import Card from '../../components/Card';
import { ActivePosition, TradeHistory } from '../../types';
import Icon from '../../components/Icon';

const mockActivePositions: ActivePosition[] = [
  { symbol: 'BTC/USDT', entryPrice: 68500, quantity: 0.5, currentPrice: 69200, pnl: 350, position: 'Long', exchange: 'Binance' },
  { symbol: 'ETH/USDT', entryPrice: 3800, quantity: 10, currentPrice: 3750, pnl: -500, position: 'Short', exchange: 'Bybit' },
  { symbol: 'SOL/USDT', entryPrice: 165, quantity: 100, currentPrice: 172, pnl: 700, position: 'Long', exchange: 'KuCoin' },
];

const mockTradeHistory: TradeHistory[] = [
  { symbol: 'ADA/USDT', entryPrice: 0.45, exitPrice: 0.48, quantity: 5000, pnl: 150, position: 'Long', date: '2024-07-20', mode: 'Real', strategy: 'DCA' },
  { symbol: 'XRP/USDT', entryPrice: 0.52, exitPrice: 0.50, quantity: 10000, pnl: 200, position: 'Short', date: '2024-07-19', mode: 'Real', strategy: 'Signal Bot' },
  { symbol: 'DOGE/USDT', entryPrice: 0.15, exitPrice: 0.16, quantity: 20000, pnl: 200, position: 'Long', date: '2024-07-18', mode: 'Demo', strategy: 'Grid' },
  { symbol: 'BTC/USDT', entryPrice: 68000, exitPrice: 69500, quantity: 0.1, pnl: 150, position: 'Long', date: '2024-07-15', mode: 'Real', strategy: 'DCA' },
];

const SegmentedButton: React.FC<{ options: string[]; selected: string; onSelect: (option: any) => void }> = ({ options, selected, onSelect }) => (
    <div className="flex w-full bg-gray-100 dark:bg-dark-bg rounded-lg p-1">
        {options.map(option => (
            <button
                key={option}
                onClick={() => onSelect(option)}
                className={`w-full py-1.5 text-sm font-semibold rounded-md transition-colors ${selected === option ? 'bg-white dark:bg-primary shadow-sm' : 'text-gray-500 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-bg-secondary'}`}
            >
                {option}
            </button>
        ))}
    </div>
);

const ManualOrderModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [orderType, setOrderType] = useState<'Market' | 'Limit'>('Market');
    const [side, setSide] = useState<'Buy' | 'Sell'>('Buy');

    if (!isOpen) return null;

    const handlePlaceOrder = () => {
        // In a real app, this would dispatch the order
        console.log(`Placing ${side} ${orderType} order...`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <Card className="w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Manual Order Entry</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                        <Icon name="cross" className="h-6 w-6" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Order Type</label>
                        <SegmentedButton options={['Market', 'Limit']} selected={orderType} onSelect={setOrderType} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Side</label>
                        <SegmentedButton options={['Buy', 'Sell']} selected={side} onSelect={setSide} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Symbol</label>
                        <input type="text" placeholder="e.g., BTC/USDT" className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2 focus:ring-primary focus:border-primary"/>
                    </div>
                    {orderType === 'Limit' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Limit Price</label>
                            <input type="number" placeholder="Enter price" className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2 focus:ring-primary focus:border-primary"/>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Amount</label>
                        <input type="number" placeholder="Enter amount" className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2 focus:ring-primary focus:border-primary"/>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-dark-bg-secondary rounded-lg text-sm">
                        <div className="flex justify-between">
                            <span>Total (Estimate)</span>
                            <span className="font-semibold">$0.00</span>
                        </div>
                    </div>
                    <div className="flex space-x-2 pt-4">
                         <button onClick={onClose} className="w-full bg-gray-200 dark:bg-dark-bg-secondary py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold">
                            Cancel
                        </button>
                        <button onClick={handlePlaceOrder} className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors font-semibold">
                            Place Order
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const FilterInput: React.FC<React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> & {label: string}> = ({label, ...props}) => (
    <div>
       <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-secondary mb-1">{label}</label>
       <input {...props} className="w-full bg-gray-100 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-md shadow-sm p-2 text-sm focus:ring-primary focus:border-primary" />
   </div>
);

const FilterSelect: React.FC<React.InputHTMLAttributes<HTMLSelectElement> & {label: string}> = ({label, children, ...props}) => (
   <div>
       <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-secondary mb-1">{label}</label>
       <select {...props} className="w-full bg-gray-100 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-md shadow-sm p-2 text-sm focus:ring-primary focus:border-primary">
           {children}
       </select>
   </div>
);


const ActiveTradesView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'positions' | 'history'>('positions');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // State for filters
    const [symbolFilter, setSymbolFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [modeFilter, setModeFilter] = useState('All');

    const handleResetFilters = () => {
        setSymbolFilter('');
        setStartDateFilter('');
        setEndDateFilter('');
        setModeFilter('All');
    };

    const filteredTradeHistory = useMemo(() => {
        return mockTradeHistory.filter(trade => {
            const tradeDate = new Date(trade.date);
            const startDate = startDateFilter ? new Date(startDateFilter) : null;
            const endDate = endDateFilter ? new Date(endDateFilter) : null;

            if (startDate) startDate.setUTCHours(0, 0, 0, 0);
            if (endDate) endDate.setUTCHours(23, 59, 59, 999);
            
            const symbolMatch = trade.symbol.toLowerCase().includes(symbolFilter.toLowerCase());
            const startDateMatch = !startDate || tradeDate >= startDate;
            const endDateMatch = !endDate || tradeDate <= endDate;
            const modeMatch = modeFilter === 'All' || trade.mode === modeFilter;

            return symbolMatch && startDateMatch && endDateMatch && modeMatch;
        });
    }, [symbolFilter, startDateFilter, endDateFilter, modeFilter]);

    return (
        <>
        <ManualOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Card>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-dark-border">
                <div className="flex">
                    <button 
                        onClick={() => setActiveTab('positions')} 
                        className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'positions' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary dark:hover:text-white'}`}
                    >
                        Active Positions ({mockActivePositions.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('history')} 
                        className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'history' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary dark:hover:text-white'}`}
                    >
                        Trade History
                    </button>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors flex items-center text-sm"
                >
                    <Icon name="plus" className="h-4 w-4 mr-2" />
                    Manual Order
                </button>
            </div>


            {activeTab === 'history' && (
                <div className="p-4 border-b border-gray-200 dark:border-dark-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <FilterInput label="Symbol" type="text" placeholder="e.g. BTC" value={symbolFilter} onChange={e => setSymbolFilter(e.target.value)} />
                        <FilterInput label="Start Date" type="date" value={startDateFilter} onChange={e => setStartDateFilter(e.target.value)} />
                        <FilterInput label="End Date" type="date" value={endDateFilter} onChange={e => setEndDateFilter(e.target.value)} />
                        <FilterSelect label="Mode" value={modeFilter} onChange={e => setModeFilter(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Real">Real</option>
                            <option value="Demo">Demo</option>
                        </FilterSelect>
                        <button onClick={handleResetFilters} className="bg-gray-200 dark:bg-dark-bg-secondary text-sm font-medium py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors h-10">
                            Reset Filters
                        </button>
                    </div>
                </div>
            )}
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-dark-text-secondary">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-bg-secondary dark:text-dark-text-secondary">
                        {activeTab === 'positions' ? (
                            <tr>
                                <th scope="col" className="px-6 py-3">Symbol</th>
                                <th scope="col" className="px-6 py-3">Entry Price</th>
                                <th scope="col" className="px-6 py-3">Quantity</th>
                                <th scope="col" className="px-6 py-3">Current Price</th>
                                <th scope="col" className="px-6 py-3">Profit/Loss</th>
                                <th scope="col" className="px-6 py-3">Position</th>
                                <th scope="col" className="px-6 py-3">Exchange</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        ) : (
                            <tr>
                                <th scope="col" className="px-6 py-3">Symbol</th>
                                <th scope="col" className="px-6 py-3">Entry Price</th>
                                <th scope="col" className="px-6 py-3">Exit Price</th>
                                <th scope="col" className="px-6 py-3">Quantity</th>
                                <th scope="col" className="px-6 py-3">P/L</th>
                                <th scope="col" className="px-6 py-3">Position</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Mode</th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {activeTab === 'positions' ? mockActivePositions.map((pos, i) => (
                            <tr key={i} className="bg-white border-b dark:bg-dark-card dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg-secondary">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pos.symbol}</td>
                                <td className="px-6 py-4">${pos.entryPrice.toLocaleString()}</td>
                                <td className="px-6 py-4">{pos.quantity}</td>
                                <td className="px-6 py-4">${pos.currentPrice.toLocaleString()}</td>
                                <td className={`px-6 py-4 font-bold ${pos.pnl >= 0 ? 'text-success' : 'text-danger'}`}>${pos.pnl.toLocaleString()}</td>
                                <td className="px-6 py-4">{pos.position}</td>
                                <td className="px-6 py-4">{pos.exchange}</td>
                                <td className="px-6 py-4"><button className="font-medium text-primary hover:underline">Close</button></td>
                            </tr>
                        )) : filteredTradeHistory.map((trade, i) => (
                            <tr key={i} className="bg-white border-b dark:bg-dark-card dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg-secondary">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{trade.symbol}</td>
                                <td className="px-6 py-4">${trade.entryPrice.toLocaleString()}</td>
                                <td className="px-6 py-4">${trade.exitPrice.toLocaleString()}</td>
                                <td className="px-6 py-4">{trade.quantity}</td>
                                <td className={`px-6 py-4 font-bold ${trade.pnl >= 0 ? 'text-success' : 'text-danger'}`}>${trade.pnl.toLocaleString()}</td>
                                <td className="px-6 py-4">{trade.position}</td>
                                <td className="px-6 py-4">{trade.date}</td>
                                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${trade.mode === 'Real' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>{trade.mode}</span></td>
                            </tr>
                        ))}
                         {activeTab === 'history' && filteredTradeHistory.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center py-8 text-gray-500 dark:text-dark-text-secondary">
                                    No trades found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
        </>
    );
};

export default ActiveTradesView;
