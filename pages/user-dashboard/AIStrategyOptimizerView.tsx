
import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Icon from '../../components/Icon';
import { OptimizationResult } from '../../types';

const mockResults: OptimizationResult[] = [
    { timeframe: '4h', totalReturn: 85.2, maxDrawdown: 12.5, winRate: 68, robustnessScore: 92, trades: 150, weeklyProfitability: 1.64, sharpeRatio: 2.1 },
    { timeframe: '1d', totalReturn: 65.7, maxDrawdown: 9.8, winRate: 75, robustnessScore: 88, trades: 65, weeklyProfitability: 1.26, sharpeRatio: 2.5 },
    { timeframe: '1h', totalReturn: 110.4, maxDrawdown: 25.1, winRate: 59, robustnessScore: 65, trades: 620, weeklyProfitability: 2.12, sharpeRatio: 1.8 },
];

const sortedResults = [...mockResults].sort((a,b) => b.robustnessScore - a.robustnessScore);

const ConfigStep: React.FC<{ onStart: () => void }> = ({ onStart }) => (
    <Card className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">AI Strategy Optimizer</h2>
        <p className="text-gray-500 dark:text-dark-text-secondary mb-6">Let AI find the most profitable configuration for your trading strategy.</p>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Asset Selection</label>
                <select className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2">
                    <option>BTC/USDT</option>
                    <option>ETH/USDT</option>
                    <option>SOL/USDT</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Strategy Selection</label>
                <select className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2">
                    <option>Moving Average Crossover</option>
                    <option>RSI Divergence</option>
                    <option>Bollinger Bands</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Historical Data Range</label>
                <select className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2">
                    <option>Last 6 months</option>
                    <option>Last 1 year</option>
                    <option>All available data</option>
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Candlestick Intervals to Test</label>
                <div className="flex space-x-4">
                    {['1h', '4h', '1d'].map(interval => (
                        <label key={interval} className="flex items-center">
                            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                            <span className="ml-2 text-sm">{interval}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Optimization Goal</label>
                <select className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2">
                    <option>Maximize Sharpe Ratio (Recommended)</option>
                    <option>Maximize Total Profit</option>
                    <option>Minimize Maximum Drawdown</option>
                </select>
            </div>
            <button onClick={onStart} className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-hover transition-colors mt-4">
                Start AI Analysis
            </button>
        </div>
    </Card>
);

const LoadingStep: React.FC = () => {
    const messages = ["Analyzing historical data...", "Running thousands of simulations...", "Applying machine learning models...", "Calculating risk-adjusted metrics..."];
    const [message, setMessage] = useState(messages[0]);
    
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % messages.length;
            setMessage(messages[i]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
         <div className="text-center">
            <Icon name="brain" className="h-16 w-16 text-primary mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold mt-4">AI Analysis in Progress</h2>
            <p className="text-gray-500 dark:text-dark-text-secondary mt-2">{message}</p>
        </div>
    );
}

const ResultsStep: React.FC<{ onReset: () => void }> = ({ onReset }) => (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
           <h2 className="text-2xl font-bold">Optimization Results</h2>
           <button onClick={onReset} className="bg-gray-200 dark:bg-dark-bg-secondary font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
               Run New Analysis
           </button>
       </div>

       <Card className="bg-primary/10 dark:bg-primary/20 border-l-4 border-primary">
           <h3 className="text-lg font-bold">Optimal Configuration Found</h3>
           <p className="mt-2">Use a <span className="font-semibold text-primary">{sortedResults[0].timeframe}</span> interval with a 50-period and 200-period EMA. Projected Annual Return: <span className="font-semibold text-success">+{sortedResults[0].totalReturn}%</span></p>
           <button className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors mt-4 text-sm">
               Apply These Settings
           </button>
       </Card>

        <Card>
           <h3 className="text-xl font-bold mb-4">Performance Matrix</h3>
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-bg-secondary dark:text-dark-text-secondary">
                       <tr>
                           <th className="px-6 py-3">Timeframe</th>
                           <th className="px-6 py-3">Total Return</th>
                           <th className="px-6 py-3">Max Drawdown</th>
                           <th className="px-6 py-3">Win Rate</th>
                           <th className="px-6 py-3">Robustness Score</th>
                           <th className="px-6 py-3">Action</th>
                       </tr>
                   </thead>
                   <tbody>
                       {sortedResults.map(res => (
                           <tr key={res.timeframe} className="border-b dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg-secondary">
                               <td className="px-6 py-4 font-bold">{res.timeframe}</td>
                               <td className="px-6 py-4 text-success font-semibold">+{res.totalReturn.toFixed(1)}%</td>
                               <td className="px-6 py-4 text-danger">{res.maxDrawdown.toFixed(1)}%</td>
                               <td className="px-6 py-4">{res.winRate}%</td>
                               <td className="px-6 py-4 font-bold">{res.robustnessScore}/100</td>
                               <td className="px-6 py-4">
                                   <button className="bg-primary/10 text-primary hover:bg-primary/20 font-semibold py-1 px-3 rounded-lg text-xs">Apply</button>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
       </Card>
   </div>
);


const AIStrategyOptimizerView: React.FC = () => {
    const [step, setStep] = useState<'config' | 'loading' | 'results'>('config');

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (step === 'loading') {
            timer = setTimeout(() => setStep('results'), 4000);
        }
        return () => clearTimeout(timer);
    }, [step]);
    
    return (
        <div>
            {step === 'config' && <ConfigStep onStart={() => setStep('loading')} />}
            {step === 'loading' && <LoadingStep />}
            {step === 'results' && <ResultsStep onReset={() => setStep('config')} />}
        </div>
    );
};

export default AIStrategyOptimizerView;
