import React, { useState } from 'react';
import Card from '../../components/Card';
import Icon from '../../components/Icon';

const SupportTicketsView: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const tickets = [
    { id: '#T2045', user: 'john.doe@email.com', subject: 'Bot not executing trades', status: 'Open', priority: 'High', created: '2 hours ago', assignee: 'Sarah M.' },
    { id: '#T2044', user: 'trader123@email.com', subject: 'API connection error', status: 'In Progress', priority: 'Medium', created: '4 hours ago', assignee: 'Mike R.' },
    { id: '#T2043', user: 'crypto_user@email.com', subject: 'Withdrawal delay', status: 'Open', priority: 'High', created: '6 hours ago', assignee: 'Unassigned' },
    { id: '#T2042', user: 'investor99@email.com', subject: 'Feature request: Multi-exchange support', status: 'In Progress', priority: 'Low', created: '1 day ago', assignee: 'Tom L.' },
    { id: '#T2041', user: 'hodler@email.com', subject: 'Account verification issue', status: 'Resolved', priority: 'Medium', created: '1 day ago', assignee: 'Sarah M.' },
    { id: '#T2040', user: 'daytrader@email.com', subject: 'Strategy backtest error', status: 'Resolved', priority: 'Low', created: '2 days ago', assignee: 'Mike R.' },
  ];

  const stats = [
    { label: 'Open Tickets', value: '23', color: 'warning' },
    { label: 'In Progress', value: '15', color: 'info' },
    { label: 'Resolved Today', value: '42', color: 'success' },
    { label: 'Avg Response Time', value: '2.3h', color: 'primary' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white">Support Tickets</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text-secondary mt-1">Manage user support requests</p>
        </div>
        <button 
          onClick={() => alert('Create New Ticket\n\nThis would open a form to manually create a support ticket on behalf of a user.')}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors text-sm"
        >
          New Ticket
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
            <p className={`text-2xl font-bold text-${stat.color} mt-1`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold dark:text-white">All Tickets</h3>
          <div className="flex space-x-2">
            {['all', 'open', 'in progress', 'resolved'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  filterStatus === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-dark-bg-secondary text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">ID</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">User</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Subject</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Priority</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Assignee</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Created</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-100 dark:border-dark-border/50 hover:bg-gray-50 dark:hover:bg-dark-bg-secondary/50">
                  <td className="py-3 px-2 font-mono text-sm text-primary">{ticket.id}</td>
                  <td className="py-3 px-2 text-sm dark:text-white">{ticket.user}</td>
                  <td className="py-3 px-2 text-sm dark:text-white">{ticket.subject}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ticket.status === 'Open' ? 'bg-warning/20 text-warning' :
                      ticket.status === 'In Progress' ? 'bg-info/20 text-info' : 'bg-success/20 text-success'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ticket.priority === 'High' ? 'bg-danger/20 text-danger' :
                      ticket.priority === 'Medium' ? 'bg-warning/20 text-warning' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm dark:text-white">{ticket.assignee}</td>
                  <td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400">{ticket.created}</td>
                  <td className="py-3 px-2">
                    <button 
                      onClick={() => alert(`Viewing ticket ${ticket.id}\n\nSubject: ${ticket.subject}\nUser: ${ticket.user}\nStatus: ${ticket.status}\n\nThis would open the full ticket details and response interface.`)}
                      className="text-xs px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded transition-colors"
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
    </div>
  );
};

export default SupportTicketsView;
