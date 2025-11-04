
import React, { useState } from 'react';
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
import UserHeader from '../../components/UserHeader';

const UserDashboard: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('Dashboard');

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
        <UserHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
