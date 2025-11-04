
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
import AdminHeader from '../../components/AdminHeader';

const AdminDashboard: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('Dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <AdminHomeView />;
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
      case 'Feature Flags':
        return <FeatureFlagsView />;
      default:
        return <div className="p-8"><h1 className="text-2xl font-bold">{activeView}</h1><p>Content coming soon...</p></div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark-bg">
      <AdminSidebar isCollapsed={isSidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} activeView={activeView} setActiveView={setActiveView} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
