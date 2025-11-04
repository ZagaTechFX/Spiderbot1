import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../App';
import Icon from './Icon';

const UserHeader: React.FC = () => {
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
    <div className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Welcome back, {user.name}</p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg-secondary transition-colors"
            title="Toggle theme"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-5 w-5 text-gray-600 dark:text-dark-text-secondary" />
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg-secondary transition-colors relative">
            <Icon name="bell" className="h-5 w-5 text-gray-600 dark:text-dark-text-secondary" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-danger rounded-full"></span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg-secondary transition-colors"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{user.subscriptionPlan}</p>
              </div>
              <Icon name="chevron" className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{user.email}</p>
                </div>

                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="user" className="h-4 w-4" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="settings" className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="wallet" className="h-4 w-4" />
                    <span>Billing</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="search" className="h-4 w-4" />
                    <span>Help & Support</span>
                  </button>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-border pt-2">
                  <button
                    onClick={logout}
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

export default UserHeader;
