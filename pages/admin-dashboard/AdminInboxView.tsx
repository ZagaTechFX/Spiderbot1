
import React, { useState } from 'react';
import Card from '../../components/Card';
import { AdminInboxItem } from '../../types';
import Icon from '../../components/Icon';

const mockInboxItems: AdminInboxItem[] = [
    { id: 'inbox-1', type: 'Approval', title: 'KYC Application: USR-B3C4', description: 'Jane Smith has submitted Tier 2 verification documents.', timestamp: '1h ago', isRead: false },
    { id: 'inbox-2', type: 'Alert', title: 'High Bot Error Rate: BOT-C3', description: 'Bot has failed 5 consecutive orders. Manual review required.', timestamp: '3h ago', isRead: false },
    { id: 'inbox-3', type: 'Task', title: 'Review System Health Report', description: 'The weekly performance and health report is ready for your review.', timestamp: '1d ago', isRead: true },
    { id: 'inbox-4', type: 'Approval', title: 'Large Withdrawal Request: $50,000', description: 'User USR-F6G7 has requested a large withdrawal requiring manual approval.', timestamp: '2d ago', isRead: true },
];

type ActiveTab = 'All' | 'Approvals' | 'Alerts' | 'Tasks';

const TabButton: React.FC<{
    tabName: ActiveTab;
    label: string;
    activeTab: ActiveTab;
    onClick: (tabName: ActiveTab) => void;
}> = ({ tabName, label, activeTab, onClick }) => (
     <button onClick={() => onClick(tabName)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tabName ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-200 dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary'}`}>
        {label}
    </button>
);

const AdminInboxView: React.FC = () => {
    const [items, setItems] = useState(mockInboxItems);
    const [activeTab, setActiveTab] = useState<ActiveTab>('All');

    const filteredItems = items.filter(item => {
        if (activeTab === 'All') return true;
        return item.type.toLowerCase() === activeTab.slice(0, -1).toLowerCase();
    });

    const getIconForType = (type: AdminInboxItem['type']) => {
        switch (type) {
            case 'Approval': return { icon: 'check', color: 'text-blue-500' };
            case 'Alert': return { icon: 'warning', color: 'text-danger' };
            case 'Task': return { icon: 'audit', color: 'text-gray-500' };
        }
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold mb-4">Admin Inbox</h2>
            <div className="flex space-x-2 p-1 bg-gray-100 dark:bg-dark-bg-secondary rounded-lg mb-4 w-full md:w-auto">
                <TabButton tabName="All" label="All" activeTab={activeTab} onClick={setActiveTab} />
                <TabButton tabName="Approvals" label="Approvals" activeTab={activeTab} onClick={setActiveTab} />
                <TabButton tabName="Alerts" label="Alerts" activeTab={activeTab} onClick={setActiveTab} />
                <TabButton tabName="Tasks" label="Tasks" activeTab={activeTab} onClick={setActiveTab} />
            </div>

            <div className="space-y-3">
                {filteredItems.map(item => (
                    <div key={item.id} className={`p-4 rounded-lg flex items-start space-x-4 ${!item.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : 'bg-gray-50 dark:bg-dark-bg-secondary'}`}>
                        <div className={`p-2 rounded-full bg-white dark:bg-dark-bg ${getIconForType(item.type).color}`}>
                            <Icon name={getIconForType(item.type).icon} className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-xs text-gray-400">{item.timestamp}</p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                             <button className="text-sm font-medium text-primary hover:underline">View</button>
                             <button className="text-sm font-medium text-gray-500 hover:text-gray-700">Dismiss</button>
                        </div>
                    </div>
                ))}
                 {filteredItems.length === 0 && <p className="text-center p-8 text-gray-500">No items in this category.</p>}
            </div>
        </Card>
    );
};

export default AdminInboxView;
