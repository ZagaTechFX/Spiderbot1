import React, { useState } from 'react';
import Card from '../../components/Card';
import { FeatureFlag } from '../../types';
import ToggleSwitch from '../../components/ToggleSwitch';

const initialFeatureFlags: FeatureFlag[] = [
    { id: 'ff-1', name: 'Social Trading Hub', description: 'Enables the "Discover Traders" and copy trading features for all users.', enabled: true },
    { id: 'ff-2', name: 'AI Strategy Optimizer', description: 'Allows users to access the AI-powered backtesting and optimization module.', enabled: true },
    { id: 'ff-3', name: 'Fiat Deposit Gateway', description: 'Controls the visibility and functionality of credit card and bank transfer deposits.', enabled: false },
    { id: 'ff-4', name: 'Advanced Charting Tools', description: 'Unlocks professional-grade charting tools and indicators on the strategy page (BETA).', enabled: true },
];

const FeatureFlagsView: React.FC = () => {
    const [flags, setFlags] = useState(initialFeatureFlags);

    const handleToggle = (id: string) => {
        setFlags(prevFlags =>
            prevFlags.map(flag =>
                flag.id === id ? { ...flag, enabled: !flag.enabled } : flag
            )
        );
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold mb-2">Feature Flags & System Toggles</h2>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-6">Control feature availability across the platform in real-time. Changes are applied instantly.</p>

            <div className="divide-y divide-gray-200 dark:divide-dark-border">
                {flags.map(flag => (
                    <div key={flag.id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">{flag.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-dark-text-secondary max-w-lg">{flag.description}</p>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center space-x-4">
                           <span className={`text-sm font-bold ${flag.enabled ? 'text-success' : 'text-gray-500'}`}>
                                {flag.enabled ? 'ENABLED' : 'DISABLED'}
                           </span>
                           <ToggleSwitch enabled={flag.enabled} onChange={() => handleToggle(flag.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default FeatureFlagsView;