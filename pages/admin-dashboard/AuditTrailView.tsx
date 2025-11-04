import React, { useState, useMemo } from 'react';
import Card from '../../components/Card';
import { AuditLog } from '../../types';
import Icon from '../../components/Icon';

const mockAuditLogs: AuditLog[] = [
    { id: 'log-1', timestamp: '2024-07-21 10:30:15 UTC', adminUser: 'SuperAdmin', ipAddress: '192.168.1.1', action: 'CHANGE_GLOBAL_FEE', details: '{"old_value": "0.15%", "new_value": "0.18%"}' },
    { id: 'log-2', timestamp: '2024-07-21 10:15:00 UTC', adminUser: 'Mod Y', ipAddress: '10.0.0.5', action: 'APPROVE_KYC', details: '{"userId": "USR-11A2"}' },
    { id: 'log-3', timestamp: '2024-07-21 09:05:10 UTC', adminUser: 'RiskManager', ipAddress: '172.16.0.10', action: 'FORCE_CLOSE_POSITION', details: '{"botId": "BOT-C3", "reason": "Market volatility"}' },
    { id: 'log-4', timestamp: '2024-07-20 18:00:00 UTC', adminUser: 'SuperAdmin', ipAddress: '192.168.1.1', action: 'UPDATE_SUBSCRIPTION_PLAN', details: '{"planId": "pro", "newName": "Pro Plus"}' },
    { id: 'log-5', timestamp: '2024-07-20 15:30:00 UTC', adminUser: 'Mod X', ipAddress: '10.0.0.8', action: 'REJECT_KYC', details: '{"userId": "USR-9D5E", "reason": "Invalid document"}' },
];

const AuditTrailView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [actionFilter, setActionFilter] = useState('All');

    const filteredLogs = useMemo(() => {
        return mockAuditLogs.filter(log => {
            const searchMatch = log.adminUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.ipAddress.includes(searchTerm) ||
                log.action.toLowerCase().includes(searchTerm.toLowerCase());
            const actionMatch = actionFilter === 'All' || log.action === actionFilter;
            return searchMatch && actionMatch;
        });
    }, [searchTerm, actionFilter]);
    
    const uniqueActions = ['All', ...Array.from(new Set(mockAuditLogs.map(log => log.action)))];

    return (
        <Card>
            <h2 className="text-2xl font-bold mb-2">Comprehensive Audit Trail</h2>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-4">A chronological record of all administrative actions taken on the platform.</p>

            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                <div className="relative w-full md:w-1/3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="search" className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                        type="text"
                        placeholder="Search by user, IP, or action..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 p-2 border dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-bg-secondary focus:ring-primary focus:border-primary"
                    />
                </div>
                <div className="flex items-center space-x-2 w-full md:w-auto">
                    <label className="text-sm font-medium">Action:</label>
                    <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} className="p-2 border dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-bg-secondary focus:ring-primary focus:border-primary">
                        {uniqueActions.map(action => <option key={action} value={action}>{action}</option>)}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-bg-secondary dark:text-dark-text-secondary">
                        <tr>
                            <th className="px-6 py-3">Timestamp</th>
                            <th className="px-6 py-3">Admin User</th>
                            <th className="px-6 py-3">Source IP</th>
                            <th className="px-6 py-3">Action</th>
                            <th className="px-6 py-3">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.map(log => (
                            <tr key={log.id} className="border-b dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg-secondary">
                                <td className="px-6 py-4 whitespace-nowrap">{log.timestamp}</td>
                                <td className="px-6 py-4 font-semibold">{log.adminUser}</td>
                                <td className="px-6 py-4">{log.ipAddress}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-xs font-mono rounded-md bg-gray-100 dark:bg-dark-bg-secondary">{log.action}</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs">{log.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredLogs.length === 0 && <p className="text-center p-4">No logs found.</p>}
            </div>
        </Card>
    );
};

export default AuditTrailView;