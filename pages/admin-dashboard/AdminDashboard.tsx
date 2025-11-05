
import React, { useState, useEffect, useRef } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHomeView from './AdminHomeView';
import KycManagementView from './KycManagementView';
import UserManagementView from './UserManagementView';
import BotManagementView from './BotManagementView';
import AuditTrailView from './AuditTrailView';
import AdminInboxView from './AdminInboxView';
import BotHealthView from './BotHealthView';
import FeatureFlagsView from './FeatureFlagsView';
import { SystemAlert } from '../../types';
import Icon from '../../components/Icon';

const mockAlerts: SystemAlert[] = [
  { id: 'alert-1', severity: 'critical', title: 'Trading Engine Failure', message: 'The primary trading engine is unresponsive. All new trades are failing.', timestamp: '2m ago' },
  { id: 'alert-2', severity: 'warning', title: 'High DB Latency', message: 'Database query latency is exceeding 500ms. Performance may be degraded.', timestamp: '15m ago' },
  { id: 'alert-3', severity: 'warning', title: 'API Rate Limit Approaching', message: 'Binance API usage at 90%. Risk of temporary block.', timestamp: '30m ago' },
];

const AlertsDropdown: React.FC<{
  alerts: SystemAlert[];
  onViewAll: () => void;
}> = ({ alerts, onViewAll }) => (
  <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white dark:bg-dark-card rounded-lg shadow-xl z-50 border border-gray-200 dark:border-dark-border">
      <div className="p-3 font-semibold border-b border-gray-200 dark:border-dark-border">
          System Alerts ({alerts.length})
      </div>
      <div className="max-h-96 overflow-y-auto">
          {alerts.length > 0 ? alerts.map(alert => (
              <div key={alert.id} className={`flex items-start p-3 border-b border-gray-100 dark:border-dark-bg-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-secondary`}>
                  <Icon name="warning" className={`h-5 w-5 mr-3 mt-1 flex-shrink-0 ${alert.severity === 'critical' ? 'text-danger' : 'text-warning'}`} />
                  <div>
                      <p className="text-sm font-semibold">{alert.title}</p>
                      <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.timestamp}</p>
                  </div>
              </div>
          )) : (
              <p className="p-4 text-sm text-center text-gray-500">No active alerts.</p>
          )}
      </div>
      <div className="p-2 bg-gray-50 dark:bg-dark-bg-secondary text-center rounded-b-lg">
         <button onClick={onViewAll} className="text-sm font-medium text-primary hover:underline">View All in Inbox</button>
      </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('Dashboard');
  const [alerts, setAlerts] = useState<SystemAlert[]>(mockAlerts);
  const [isAlertsOpen, setAlertsOpen] = useState(false);
  const alertsRef = useRef<HTMLDivElement>(null);

  // Close alerts dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (alertsRef.current && !alertsRef.current.contains(event.target as Node)) {
        setAlertsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [alertsRef]);

  const hasCriticalAlert = alerts.some(a => a.severity === 'critical');
  const alertIconColor = hasCriticalAlert ? 'text-danger' : alerts.length > 0 ? 'text-warning' : 'text-gray-500 dark:text-dark-text-secondary';

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
        <header className="flex items-center justify-between p-4 bg-white dark:bg-dark-card shadow-md h-16">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{activeView}</h1>
          <div className="relative" ref={alertsRef}>
            <button 
              onClick={() => setAlertsOpen(o => !o)}
              className={`${alertIconColor} hover:text-gray-700 dark:hover:text-white relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-secondary`}
              aria-label="View Alerts"
            >
              <Icon name="bell" className="h-6 w-6" />
              {alerts.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${hasCriticalAlert ? 'bg-danger/75' : 'bg-warning/75'} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-4 w-4 text-xs text-white items-center justify-center ${hasCriticalAlert ? 'bg-danger' : 'bg-warning'}`}>
                    {alerts.length}
                  </span>
                </span>
              )}
            </button>
            {isAlertsOpen && <AlertsDropdown alerts={alerts} onViewAll={() => { setActiveView('Admin Inbox'); setAlertsOpen(false); }} />}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
