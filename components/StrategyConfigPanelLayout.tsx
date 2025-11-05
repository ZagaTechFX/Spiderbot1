import React, { ReactNode } from 'react';

export interface CategoryTab {
    id: string;
    label: string;
    content: ReactNode;
}

interface StrategyConfigPanelLayoutProps {
    title: string;
    activeTab: string;
    tabs: CategoryTab[];
    onTabChange: (tabId: string) => void;
    onSave: () => void;
    onSaveTemplate: () => void;
}

const StrategyConfigPanelLayout: React.FC<StrategyConfigPanelLayoutProps> = ({ 
    title, 
    activeTab, 
    tabs, 
    onTabChange, 
    onSave, 
    onSaveTemplate 
}) => {
    return (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border">
            <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-dark-border">
                <h3 className="text-base sm:text-lg font-bold dark:text-white">{title}</h3>
            </div>

            <div className="border-b border-gray-200 dark:border-dark-border overflow-x-auto">
                <div className="flex min-w-max">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'border-b-2 border-primary text-primary dark:text-primary'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary dark:hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto">
                {tabs.find(tab => tab.id === activeTab)?.content}
            </div>

            <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-dark-border flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                    onClick={onSaveTemplate}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-gray-700 dark:text-dark-text-secondary bg-gray-100 dark:bg-dark-bg-secondary rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Save as Template
                </button>
                <button
                    onClick={onSave}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
                >
                    Save & Start Bot
                </button>
            </div>
        </div>
    );
};

export default StrategyConfigPanelLayout;
