import React, { useState } from 'react';
import Card from '../../components/Card';
import { Exchange } from '../../types';
import Icon from '../../components/Icon';

const initialExchanges: Exchange[] = [
    { name: 'Binance', logo: 'https://cdn.worldvectorlogo.com/logos/binance.svg', connected: true, permissions: ['Read', 'Spot & Margin Trading'], requiredPermissions: ['Read', 'Spot & Margin Trading'] },
    { name: 'Bybit', logo: 'https://cdn.worldvectorlogo.com/logos/bybit.svg', connected: true, permissions: ['Read', 'Derivatives Trading'], requiredPermissions: ['Read', 'Derivatives Trading'] },
    { name: 'KuCoin', logo: 'https://cdn.worldvectorlogo.com/logos/kucoin.svg', connected: false, permissions: [], requiredPermissions: ['Read', 'Spot Trading'] },
    { name: 'BingX', logo: 'https://bingx.com/en-us/fileres/images/bingx-logoplate.svg', connected: false, permissions: [], requiredPermissions: ['Read', 'Spot Trading', 'Futures Trading'] },
    { name: 'Bitget', logo: 'https://www.bitget.com/da/header-logo.31553630.svg', connected: true, permissions: ['Read', 'Spot Trading'], requiredPermissions: ['Read', 'Spot Trading'] },
    { name: 'MEXC', logo: 'https://www.mexc.com/favicon.ico', connected: false, permissions: [], requiredPermissions: ['Read', 'Spot Trading'] },
    { name: 'Gate.io', logo: 'https://www.gate.io/favicon.ico', connected: false, permissions: [], requiredPermissions: ['Read', 'Spot Trading', 'Futures Trading'] },
    { name: 'HTX', logo: 'https://www.htx.com/favicon.ico', connected: false, permissions: [], requiredPermissions: ['Read', 'Spot Trading'] },
];

const APISetup: React.FC = () => {
    const [exchanges, setExchanges] = useState<Exchange[]>(initialExchanges);
    const [showApiKeyModal, setShowApiKeyModal] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [error, setError] = useState('');

    const handleConnect = (exchangeName: string) => {
        setShowApiKeyModal(exchangeName);
        setError('');
        setApiKey('');
        setApiSecret('');
    };

    const handleDisconnect = (exchangeName: string) => {
        setExchanges(exchanges.map(ex => 
            ex.name === exchangeName 
                ? { ...ex, connected: false, permissions: [] }
                : ex
        ));
        alert(`${exchangeName} disconnected successfully!\n\nYour API keys have been removed and automated trading has been disabled for this exchange.`);
    };

    const handleSaveApiKeys = () => {
        setError('');
        
        if (!apiKey || !apiSecret) {
            setError('Both API Key and API Secret are required to connect.');
            return;
        }

        if (apiKey.length < 20) {
            setError('API Key appears to be invalid. Please check and try again.');
            return;
        }

        if (apiSecret.length < 20) {
            setError('API Secret appears to be invalid. Please check and try again.');
            return;
        }
        
        if (showApiKeyModal) {
            setExchanges(exchanges.map(ex => 
                ex.name === showApiKeyModal 
                    ? { ...ex, connected: true, permissions: ex.requiredPermissions }
                    : ex
            ));
            alert(`${showApiKeyModal} connected successfully!\n\nYour API keys have been securely saved and automated trading is now enabled for this exchange.`);
            setShowApiKeyModal(null);
            setApiKey('');
            setApiSecret('');
            setError('');
        }
    };

    return (
        <>
            <Card>
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Connect Your Exchanges</h2>
                <p className="text-gray-500 dark:text-dark-text-secondary mb-6">Manage API keys to enable automated trading on your favorite exchanges.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exchanges.map(exchange => (
                    <div key={exchange.name} className="border border-gray-200 dark:border-dark-border rounded-lg p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center mb-4">
                                <img src={exchange.logo} alt={`${exchange.name} logo`} className="h-8 w-8 mr-3"/>
                                <h3 className="text-lg font-semibold">{exchange.name}</h3>
                            </div>
                            <div className="mb-4">
                                {exchange.connected ? (
                                    <div className="flex items-center text-sm text-success">
                                        <Icon name="check" className="h-4 w-4 mr-1" />
                                        <span>Connected</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Icon name="cross" className="h-4 w-4 mr-1" />
                                        <span>Not Connected</span>
                                    </div>
                                )}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-dark-text-secondary min-h-[50px]">
                                {exchange.connected ? (
                                    <>
                                        <p className="font-semibold mb-1">Granted Permissions:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {exchange.permissions.map(p => (
                                                <span key={p} className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-md font-medium">{p}</span>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-semibold mb-1">Required Permissions:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {exchange.requiredPermissions.map(p => (
                                                <span key={p} className="bg-gray-100 dark:bg-dark-bg-secondary text-gray-700 dark:text-dark-text-secondary px-2 py-0.5 rounded-md">{p}</span>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="mt-4">
                            {exchange.connected ? (
                                <button 
                                    onClick={() => handleDisconnect(exchange.name)}
                                    className="w-full bg-danger/10 text-danger py-2 rounded-lg hover:bg-danger/20 transition-colors text-sm"
                                >
                                    Disconnect
                                </button>
                            ) : (
                                <button 
                                    onClick={() => handleConnect(exchange.name)}
                                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-hover transition-colors text-sm"
                                >
                                    Connect
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>

        {showApiKeyModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-dark-card rounded-lg max-w-md w-full p-6">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">Connect to {showApiKeyModal}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Enter your API credentials to connect your {showApiKeyModal} account. Make sure to enable the required permissions.
                    </p>
                    
                    <div className="space-y-4">
                        {error && (
                            <div className="bg-danger/10 border border-danger/30 rounded-lg p-3">
                                <p className="text-sm text-danger flex items-start">
                                    <Icon name="warning" className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </p>
                            </div>
                        )}
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Key</label>
                            <input 
                                type="text"
                                value={apiKey}
                                onChange={(e) => {
                                    setApiKey(e.target.value);
                                    setError('');
                                }}
                                placeholder="Enter your API key"
                                className={`w-full px-3 py-2 bg-white dark:bg-dark-bg-secondary border ${error && (error.includes('API Key') || error.includes('required')) ? 'border-danger' : 'border-gray-300 dark:border-dark-border'} rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary`}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Secret</label>
                            <input 
                                type="password"
                                value={apiSecret}
                                onChange={(e) => {
                                    setApiSecret(e.target.value);
                                    setError('');
                                }}
                                placeholder="Enter your API secret"
                                className={`w-full px-3 py-2 bg-white dark:bg-dark-bg-secondary border ${error && (error.includes('API Secret') || error.includes('required')) ? 'border-danger' : 'border-gray-300 dark:border-dark-border'} rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary`}
                            />
                        </div>

                        <div className="bg-info/10 border border-info/30 rounded-lg p-3">
                            <p className="text-xs text-info flex items-start">
                                <Icon name="info" className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                                <span>Your API keys are encrypted and stored securely. Never share your API secret with anyone. Ensure withdrawal permissions are disabled for maximum security.</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex space-x-3 mt-6">
                        <button 
                            onClick={() => {
                                setShowApiKeyModal(null);
                                setApiKey('');
                                setApiSecret('');
                                setError('');
                            }}
                            className="flex-1 px-4 py-2 bg-gray-200 dark:bg-dark-bg-secondary text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSaveApiKeys}
                            className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
                        >
                            Connect Exchange
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default APISetup;