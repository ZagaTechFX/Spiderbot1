import React, { useState } from 'react';
import Card from '../../components/Card';
import { User } from '../../types';
import Icon from '../../components/Icon';

const mockUsers: User[] = [
    { id: 'USR-11A2', username: 'johndoe', role: 'user', name: 'John Doe', email: 'john.doe@email.com', avatarUrl: 'https://picsum.photos/seed/john/100', kycStatus: 'Verified', subscriptionPlan: 'Pro', lastLogin: '2h ago' },
    { id: 'USR-B3C4', username: 'janesmith', role: 'user', name: 'Jane Smith', email: 'jane.smith@email.com', avatarUrl: 'https://picsum.photos/seed/jane/100', kycStatus: 'Pending', subscriptionPlan: 'Starter', lastLogin: '1d ago' },
    { id: 'USR-9D5E', username: 'samwilson', role: 'user', name: 'Sam Wilson', email: 'sam.wilson@email.com', avatarUrl: 'https://picsum.photos/seed/sam/100', kycStatus: 'Not Submitted', subscriptionPlan: 'Free', lastLogin: '5d ago' },
    { id: 'USR-F6G7', username: 'emilybrown', role: 'user', name: 'Emily Brown', email: 'emily.brown@email.com', avatarUrl: 'https://picsum.photos/seed/emily/100', kycStatus: 'Verified', subscriptionPlan: 'Expert', lastLogin: '5m ago' },
];


const UserManagementView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getKycStatusClasses = (status: User['kycStatus']) => {
        switch(status) {
            case 'Verified': return 'bg-success/10 text-success';
            case 'Pending': return 'bg-warning/10 text-warning';
            case 'Rejected': return 'bg-danger/10 text-danger';
            default: return 'bg-gray-100 dark:bg-gray-700 text-gray-500';
        }
    };
    
    return (
        <Card>
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="search" className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                        type="text"
                        placeholder="Search users by name, email, or ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 p-2 border dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-bg-secondary focus:ring-primary focus:border-primary"
                    />
                </div>
                <button 
                    onClick={() => alert('Add New User\n\nThis would open a form to manually create a new user account with admin privileges.')}
                    className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors flex items-center"
                >
                    <Icon name="plus" className="h-5 w-5 mr-2" />
                    Add User
                </button>
            </div>

             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-bg-secondary dark:text-dark-text-secondary">
                        <tr>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">User ID</th>
                            <th className="px-6 py-3">KYC Status</th>
                            <th className="px-6 py-3">Subscription</th>
                            <th className="px-6 py-3">Last Login</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="border-b dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg-secondary">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 rounded-full mr-3" />
                                        <div>
                                            <div className="font-semibold text-gray-800 dark:text-white">{user.name}</div>
                                            <div className="text-xs text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{user.id}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getKycStatusClasses(user.kycStatus)}`}>{user.kycStatus}</span>
                                </td>
                                <td className="px-6 py-4">{user.subscriptionPlan}</td>
                                <td className="px-6 py-4">{user.lastLogin}</td>
                                <td className="px-6 py-4">
                                    <button 
                                        onClick={() => alert(`View User Details\n\nUser: ${user.name}\nEmail: ${user.email}\nID: ${user.id}\nKYC: ${user.kycStatus}\nPlan: ${user.subscriptionPlan}\n\nThis would open the full user profile with account details, trading history, and admin controls.`)}
                                        className="font-medium text-primary hover:underline"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default UserManagementView;
