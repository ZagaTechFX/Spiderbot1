import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../App';
import Icon from './Icon';
import ToggleSwitch from './ToggleSwitch';

interface UserHeaderProps {
  onMenuClick: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
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
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text-secondary hidden sm:block">Welcome back, {user.name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg-secondary transition-colors relative text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-white hidden sm:block">
            <Icon name="bell" className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-danger rounded-full"></span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg-secondary transition-colors"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
              />
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{user.subscriptionPlan}</p>
              </div>
              <Icon name="chevron" className={`h-4 w-4 text-gray-500 transition-transform hidden sm:block ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg shadow-lg py-2 z-50 max-h-[80vh] overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full object-cover mr-3" src={user.avatarUrl} alt={user.name} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleTheme(); }}
                    className="w-full px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={theme === 'light' ? 'moon' : 'sun'} className="h-5 w-5" />
                      <span>Dark Mode</span>
                    </div>
                    <ToggleSwitch enabled={theme === 'dark'} onChange={toggleTheme} size="sm" />
                  </button>
                  <button 
                    onClick={(e) => { e.preventDefault(); }}
                    className="w-full px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="trades" className="h-5 w-5" />
                      <span>Demo Mode</span>
                    </div>
                    <ToggleSwitch enabled={isDemoMode} onChange={() => setIsDemoMode(!isDemoMode)} size="sm" />
                  </button>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-border py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="billing" className="h-5 w-5" />
                    <span>Subscription</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="share" className="h-5 w-5" />
                    <span>Affiliate Program</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="portfolio" className="h-5 w-5" />
                    <span>My Portfolio</span>
                  </button>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-border py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="settings" className="h-5 w-5" />
                    <span>Account Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="bell" className="h-5 w-5" />
                    <span>Notifications</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg-secondary flex items-center space-x-3">
                    <Icon name="kyc" className="h-5 w-5" />
                    <span>KYC Verification</span>
                  </button>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-border pt-2">
                  <button
                    onClick={() => {
                      logout();
                      navigate('/login', { replace: true });
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-danger hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-3 rounded-b-lg"
                  >
                    <Icon name="logout" className="h-5 w-5" />
                    <span>Logout</span>
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
