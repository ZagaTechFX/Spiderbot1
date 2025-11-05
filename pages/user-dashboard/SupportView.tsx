import React, { useState } from 'react';
import Card from '../../components/Card';
import Icon from '../../components/Icon';

const SupportView: React.FC = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqItems = [
    {
      question: 'How do I start my first trading bot?',
      answer: 'Go to Strategies → Strategy Marketplace, select a strategy (like Advanced DCA), configure your parameters, and click "Save & Start Bot". Make sure you have configured your exchange API keys first.'
    },
    {
      question: 'What are the subscription plan differences?',
      answer: 'Free tier allows 1 active bot. Pro ($29/month) allows 5 bots with advanced features. Enterprise (custom pricing) offers unlimited bots, dedicated support, and institutional features.'
    },
    {
      question: 'How secure are my API keys?',
      answer: 'All API keys are encrypted at rest using AES-256 encryption and stored in secure vaults. We never have withdrawal permissions and use read-only keys where possible.'
    },
    {
      question: 'Can I backtest my strategies before going live?',
      answer: 'Yes! Navigate to the Backtesting section to test your strategies against historical data before deploying them with real capital.'
    }
  ];

  const tickets = [
    { id: '#T2045', subject: 'Bot not executing trades', status: 'Open', priority: 'High', updated: '2 hours ago' },
    { id: '#T2038', subject: 'API connection error', status: 'In Progress', priority: 'Medium', updated: '1 day ago' },
    { id: '#T2021', subject: 'Feature request: Multi-exchange support', status: 'Closed', priority: 'Low', updated: '3 days ago' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white">Support & Help Desk</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text-secondary mt-1">Get help and submit support tickets</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-bold mb-4 dark:text-white">Submit Support Ticket</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
              <input 
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="Brief description of your issue"
                className="w-full px-3 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
              <select className="w-full px-3 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select className="w-full px-3 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary">
                <option>Technical Issue</option>
                <option>Billing & Subscription</option>
                <option>Feature Request</option>
                <option>Account Issue</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea 
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                rows={6}
                placeholder="Describe your issue in detail..."
                className="w-full px-3 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <button 
              onClick={() => {
                if (ticketSubject && ticketMessage) {
                  alert(`Ticket submitted successfully!\n\nSubject: ${ticketSubject}\n\nYour support ticket has been created and our team will respond within 24 hours.`);
                  setTicketSubject('');
                  setTicketMessage('');
                } else {
                  alert('Please fill in both subject and message fields.');
                }
              }}
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Submit Ticket
            </button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-bold mb-4 dark:text-white">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-dark-bg-secondary rounded transition-colors">
                <Icon name="book" className="h-5 w-5 text-primary" />
                <span className="text-sm dark:text-white">Documentation</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-dark-bg-secondary rounded transition-colors">
                <Icon name="video" className="h-5 w-5 text-primary" />
                <span className="text-sm dark:text-white">Video Tutorials</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-dark-bg-secondary rounded transition-colors">
                <Icon name="chat" className="h-5 w-5 text-primary" />
                <span className="text-sm dark:text-white">Live Chat</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-dark-bg-secondary rounded transition-colors">
                <Icon name="community" className="h-5 w-5 text-primary" />
                <span className="text-sm dark:text-white">Community Forum</span>
              </a>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold mb-4 dark:text-white">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Icon name="email" className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Email</p>
                  <p className="dark:text-white">support@spiderbot.io</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="clock" className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Hours</p>
                  <p className="dark:text-white">24/7 Support</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <h3 className="text-lg font-bold mb-4 dark:text-white">My Tickets</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Ticket ID</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Subject</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Priority</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-100 dark:border-dark-border/50 hover:bg-gray-50 dark:hover:bg-dark-bg-secondary/50 cursor-pointer">
                  <td className="py-3 px-2 font-mono text-sm text-primary">{ticket.id}</td>
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
                      ticket.priority === 'High' || ticket.priority === 'Critical' ? 'bg-danger/20 text-danger' :
                      ticket.priority === 'Medium' ? 'bg-warning/20 text-warning' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400">{ticket.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold mb-4 dark:text-white">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqItems.map((faq, index) => (
            <details key={index} className="group border border-gray-200 dark:border-dark-border rounded-lg">
              <summary className="cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-dark-bg-secondary rounded-lg transition-colors">
                <span className="font-medium dark:text-white">{faq.question}</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SupportView;
