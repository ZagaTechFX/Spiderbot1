import React from 'react';
import Card from '../../components/Card';
import { Exchange } from '../../types';
import Icon from '../../components/Icon';

const exchanges: Exchange[] = [
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
    return (
        <Card>
            <h2 className="text-2xl font-bold mb-2">Connect Your Exchanges</h2>
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
                                <button className="w-full bg-danger/10 text-danger py-2 rounded-lg hover:bg-danger/20 transition-colors text-sm">
                                    Disconnect
                                </button>
                            ) : (
                                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-hover transition-colors text-sm">
                                    Connect
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default APISetup;