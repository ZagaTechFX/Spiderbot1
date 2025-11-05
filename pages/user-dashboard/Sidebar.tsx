import React from 'react';
import Icon from '../../components/Icon';

interface SidebarProps {
  isCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setSidebarCollapsed, isMobileMenuOpen, setMobileMenuOpen, activeView, setActiveView }) => {
  const navItems = [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Active Trades', icon: 'trades' },
    { name: 'Exchanges API Setup', icon: 'exchange' },
    { name: 'Arbitrage', icon: 'refresh' },
    { name: 'Strategies', icon: 'strategy' },
    { name: 'Backtesting', icon: 'backtest' },
    { name: 'Risk Assessment', icon: 'warning' },
    { name: 'Social Trading Hub', icon: 'users' },
    { name: 'Advanced', icon: 'advanced' },
    { name: 'Analytics', icon: 'analytics' },
    { name: 'AI Strategy Optimizer', icon: 'brain' },
    { name: 'Investment Goals', icon: 'target' },
    { name: 'My Wallet', icon: 'wallet'},
    { name: 'Support/Help Desk', icon: 'support' },
    { name: 'Join Our Community', icon: 'community'},
    { name: 'Account Settings', icon: 'settings' },
  ];

  return (
    <div className={`fixed top-0 left-0 h-full bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text-secondary flex flex-col transition-all duration-300 shadow-2xl z-40 ${isCollapsed ? 'w-20' : 'w-64'} ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="flex items-center justify-between p-4 h-16 border-b dark:border-dark-border">
        {!isCollapsed && <span className="text-xl sm:text-2xl font-bold text-primary">SpiderBot</span>}
        <button onClick={() => setSidebarCollapsed(!isCollapsed)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-secondary hidden lg:block">
          <Icon name={isCollapsed ? 'chevronRight' : 'chevronLeft'} className="h-6 w-6" />
        </button>
        <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-secondary lg:hidden">
          <Icon name="close" className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <a
            key={item.name}
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveView(item.name); }}
            className={`flex items-center p-3 rounded-lg transition-colors text-sm ${activeView === item.name ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-dark-bg-secondary'}`}
            title={item.name}
          >
            <Icon name={item.icon} className="h-5 w-5" />
            {!isCollapsed && <span className="ml-4 font-medium">{item.name}</span>}
          </a>
        ))}
      </nav>
      <div className="p-2 border-t dark:border-dark-border">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); /* handle logout */ }}
          className={`flex items-center p-3 rounded-lg transition-colors text-danger hover:bg-red-50 dark:hover:bg-red-900/20`}
          title="Logout"
        >
          <Icon name="logout" className="h-5 w-5" />
          {!isCollapsed && <span className="ml-4 font-medium">Logout</span>}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
