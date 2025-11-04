
import React, { useState, useContext, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardView from './DashboardView';
import ActiveTradesView from './ActiveTradesView';
import StrategiesView from './StrategiesView';
import AnalyticsView from './AnalyticsView';
import APISetup from './APISetup';
import InvestmentGoalsView from './InvestmentGoalsView';
import SocialTradingView from './SocialTradingView';
import AIStrategyOptimizerView from './AIStrategyOptimizerView';
import SettingsView from './SettingsView';
import ArbitrageView from './ArbitrageView';
import Icon from '../../components/Icon';
import { ThemeContext } from '../../App';
import ToggleSwitch from '../../components/ToggleSwitch';

const DropdownItem: React.FC<{ icon: string; label: string; onClick?: () => void; hasToggle?: boolean; toggleState?: boolean; onToggle?: () => void; }> = ({ icon, label, onClick, hasToggle, toggleState, onToggle }) => (
  <a href="#" onClick={(e) => { e.preventDefault(); onClick?.(); }} className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-bg-secondary">
      <div className="flex items-center">
          <Icon name={icon} className="h-5 w-5 mr-3" />
          <span>{label}</span>
      </div>
      {hasToggle && <ToggleSwitch enabled={toggleState || false} onChange={onToggle || (() => {})} size="sm" />}
  </a>
);

const ProfileDropdown: React.FC<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onViewChange: (view: string) => void;
  onClose: () => void;
}> = ({ theme, toggleTheme, onViewChange, onClose }) => {
  const profileRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef, onClose]);

  return (
    <div ref={profileRef} className="absolute right-0 mt-2 w-72 bg-white dark:bg-dark-card rounded-lg shadow-xl z-50 border border-gray-200 dark:border-dark-border">
      <div className="p-4 border-b border-gray-200 dark:border-dark-border">
        <div className="flex items-center">
            <img className="h-10 w-10 rounded-full object-cover mr-3" src="https://picsum.photos/100" alt="User avatar" />
            <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary">john.doe@example.com</p>
            </div>
        </div>
      </div>
      <div className="py-2">
        <DropdownItem icon={theme === 'light' ? 'moon' : 'sun'} label="Dark Mode" hasToggle={true} toggleState={theme === 'dark'} onToggle={toggleTheme} />
        <DropdownItem icon="trades" label="Demo Mode" hasToggle={true} toggleState={false} onToggle={() => {}} />
      </div>
       <div className="border-t border-gray-200 dark:border-dark-border py-2">
        <DropdownItem icon="billing" label="Subscription" />
        <DropdownItem icon="share" label="Affiliate Program" />
        <DropdownItem icon="portfolio" label="My Portfolio" />
      </div>
      <div className="border-t border-gray-200 dark:border-dark-border py-2">
        <DropdownItem icon="settings" label="Account Settings" onClick={() => onViewChange('Account Settings')} />
        <DropdownItem icon="bell" label="Notifications" />
        <DropdownItem icon="kyc" label="KYC Verification" />
      </div>
      <div className="border-t border-gray-200 dark:border-dark-border">
        <a href="#" className="flex items-center px-4 py-3 text-sm text-danger hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-lg"><Icon name="logout" className="h-5 w-5 mr-2"/>Logout</a>
      </div>
    </div>
  );
};


const UserDashboard: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('Dashboard');
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const handleViewChange = (view: string) => {
    setActiveView(view);
    setProfileOpen(false);
  };

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <DashboardView />;
      case 'Active Trades':
        return <ActiveTradesView />;
      case 'Exchanges API Setup':
        return <APISetup />;
      case 'Arbitrage':
        return <ArbitrageView />;
      case 'Strategies':
        return <StrategiesView />;
      case 'Social Trading Hub':
        return <SocialTradingView />;
      case 'Analytics':
        return <AnalyticsView />;
      case 'Investment Goals':
        return <InvestmentGoalsView />;
      case 'AI Strategy Optimizer':
        return <AIStrategyOptimizerView />;
      case 'Account Settings':
        return <SettingsView />;
      default:
        return <div className="p-8"><h1 className="text-2xl font-bold">{activeView}</h1><p>Content coming soon...</p></div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark-bg">
      <Sidebar isCollapsed={isSidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} activeView={activeView} setActiveView={setActiveView} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <header className="flex items-center justify-between p-4 bg-white dark:bg-dark-card shadow-md h-16">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{activeView}</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-white">
              <Icon name="bell" />
            </button>
            <div className="relative">
              <button onClick={() => setProfileOpen(!isProfileOpen)} className="flex items-center space-x-2">
                <img className="h-9 w-9 rounded-full object-cover" src="https://picsum.photos/100" alt="User avatar" />
                <Icon name="chevronDown" className="h-4 w-4" />
              </button>
              {isProfileOpen && <ProfileDropdown theme={theme} toggleTheme={toggleTheme} onViewChange={handleViewChange} onClose={() => setProfileOpen(false)} />}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
