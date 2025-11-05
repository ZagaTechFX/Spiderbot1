import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../App';
import Icon from './Icon';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border px-3 sm:px-4 md:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg-secondary lg:hidden"
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text-secondary hidden sm:block">System Administration Panel</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg-secondary transition-colors hidden sm:block"
            title="Toggle theme"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-5 w-5 text-gray-600 dark:text-dark-text-secondary" />
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg-secondary transition-colors relative hidden sm:block">
            <Icon name="bell" className="h-5 w-5 text-gray-600 dark:text-dark-text-secondary" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-danger rounded-full"></span>
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg-secondary transition-colors relative hidden sm:block">
            <Icon name="warning" className="h-5 w-5 text-warning" />
            <span className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg-secondary transition-colors"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-warning"
              />
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                  {user.name}
                  <span className="ml-2 px-2 py-0.5 text-xs bg-warning text-white rounded-full">ADMIN</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{user.email}</p>
              </div>
              <Icon name="chevron" className={`h-4 w-4 text-gray-500 transition-transform hidden sm:block ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg shadow-lg py-2 z-50 max-h-[80vh] overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{user.email}</p>
                  <p className="text-xs text-warning font-semibold mt-1">Administrator Access</p>
                </div>

                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-dark-text-secondary uppercase">
                    Admin Tools
                  </div>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="settings" className="h-4 w-4 text-warning" />
                    <span>System Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="analytics" className="h-4 w-4 text-warning" />
                    <span>Platform Analytics</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="search" className="h-4 w-4 text-warning" />
                    <span>Audit Logs</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="warning" className="h-4 w-4 text-danger" />
                    <span>System Alerts</span>
                    <span className="ml-auto px-2 py-0.5 text-xs bg-danger text-white rounded-full">3</span>
                  </button>
                  
                  <div className="border-t border-gray-200 dark:border-dark-border my-2"></div>
                  
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-dark-text-secondary uppercase">
                    Personal
                  </div>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="user" className="h-4 w-4" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="settings" className="h-4 w-4" />
                    <span>Preferences</span>
                  </button>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-border pt-2">
                  <button
                    onClick={() => {
                      logout();
                      navigate('/admin', { replace: true });
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3"
                  >
                    <Icon name="logout" className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
