import React from 'react';
import Icon from '../../components/Icon';

interface AdminSidebarProps {
  isCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, setSidebarCollapsed, isMobileMenuOpen, setMobileMenuOpen, activeView, setActiveView }) => {
  const navSections = [
    {
      title: "Overview & Analytics",
      items: [
        { name: 'Dashboard', icon: 'dashboard' },
        { name: 'Performance Metrics', icon: 'analytics' },
      ]
    },
    {
      title: "Trading Platform",
      items: [
        { name: 'Bot Management', icon: 'bot' },
        { name: 'Exchange & API Keys', icon: 'exchange' },
        { name: 'Order & Trade Logs', icon: 'trades' },
      ]
    },
    {
      title: "User Management",
      items: [
        { name: 'User List / CRM', icon: 'users' },
        { name: 'KYC Management', icon: 'kyc' },
        { name: 'Roles & Permissions', icon: 'settings' },
      ]
    },
    {
      title: "Financial & Billing",
      items: [
        { name: 'Platform Treasury', icon: 'wallet' },
        { name: 'Billing & Subscriptions', icon: 'billing' },
      ]
    },
    {
        title: "System Health",
        items: [
            { name: 'System Status', icon: 'system' },
            { name: 'Bot Health / Heartbeats', icon: 'heartbeat' },
        ]
    },
    {
      title: "Notifications & Alerts",
      items: [
        { name: 'Admin Inbox', icon: 'inbox' },
        { name: 'Audit Trail', icon: 'audit' },
      ]
    },
    {
        title: "Settings",
        items: [
            { name: 'Feature Flags', icon: 'flag' },
        ]
    },
    {
        title: "Support",
        items: [
            { name: 'Support Tickets', icon: 'support' },
        ]
    }
  ];

  return (
    <div className={`fixed top-0 left-0 h-full bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text-secondary flex flex-col transition-all duration-300 shadow-2xl z-40 ${isCollapsed ? 'w-20' : 'w-64'} ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="flex items-center justify-between p-4 h-16 border-b dark:border-dark-border">
        {!isCollapsed && <span className="text-xl sm:text-2xl font-bold text-danger">SpiderBot</span>}
        <button onClick={() => setSidebarCollapsed(!isCollapsed)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-secondary hidden lg:block">
          <Icon name={isCollapsed ? 'chevronRight' : 'chevronLeft'} className="h-6 w-6" />
        </button>
        <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-secondary lg:hidden">
          <Icon name="close" className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {navSections.map(section => (
          <div key={section.title}>
            {!isCollapsed && <h3 className="px-3 text-xs font-semibold uppercase text-gray-400 mb-1">{section.title}</h3>}
            {section.items.map(item => (
              <a
                key={item.name}
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveView(item.name); }}
                className={`flex items-center p-3 rounded-lg transition-colors text-sm ${activeView === item.name ? 'bg-danger/80 text-white' : 'hover:bg-gray-100 dark:hover:bg-dark-bg-secondary'}`}
                 title={item.name}
              >
                <Icon name={item.icon} className="h-5 w-5" />
                {!isCollapsed && <span className="ml-4 font-medium">{item.name}</span>}
              </a>
            ))}
             {isCollapsed && section.title === 'User Management' && <hr className="my-2 border-gray-200 dark:border-dark-border"/>}
          </div>
        ))}
      </nav>
       <div className="p-2 border-t dark:border-dark-border">
        <a href="#" className={`flex items-center p-3 rounded-lg transition-colors text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-bg-secondary`}>
          <Icon name="user" className="h-5 w-5" />
          {!isCollapsed && <span className="ml-4 font-medium">Admin User</span>}
        </a>
      </div>
    </div>
  );
};

export default AdminSidebar;