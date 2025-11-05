
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHomeView from './AdminHomeView';
import KycManagementView from './KycManagementView';
import UserManagementView from './UserManagementView';
import BotManagementView from './BotManagementView';
import AuditTrailView from './AuditTrailView';
import AdminInboxView from './AdminInboxView';
import BotHealthView from './BotHealthView';
import FeatureFlagsView from './FeatureFlagsView';
import PerformanceMetricsView from './PerformanceMetricsView';
import SystemStatusView from './SystemStatusView';
import SupportTicketsView from './SupportTicketsView';
import AdminHeader from '../../components/AdminHeader';

const AdminDashboard: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('Dashboard');

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <AdminHomeView />;
      case 'Performance Metrics':
        return <PerformanceMetricsView />;
      case 'User List / CRM':
        return <UserManagementView />;
      case 'KYC Management':
        return <KycManagementView />;
      case 'Bot Management':
        return <BotManagementView />;
      case 'Audit Trail':
        return <AuditTrailView />;
      case 'Admin Inbox':
        return <AdminInboxView />;
      case 'Bot Health / Heartbeats':
        return <BotHealthView />;
      case 'System Status':
        return <SystemStatusView />;
      case 'Feature Flags':
        return <FeatureFlagsView />;
      case 'Support Tickets':
        return <SupportTicketsView />;
      default:
        return <div className="p-4 sm:p-6 md:p-8"><h1 className="text-xl sm:text-2xl font-bold dark:text-white">{activeView}</h1><p className="dark:text-gray-400">Content coming soon...</p></div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark-bg overflow-hidden">
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed} 
        setSidebarCollapsed={setSidebarCollapsed} 
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeView={activeView} 
        setActiveView={handleViewChange} 
      />
      
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <div className={`flex-1 flex flex-col transition-all duration-300 w-full lg:w-auto ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <AdminHeader onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
