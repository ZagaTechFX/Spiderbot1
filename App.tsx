
import React, { useState, createContext, useMemo, useEffect } from 'react';
import UserDashboard from './pages/user-dashboard/UserDashboard';
import AdminDashboard from './pages/admin-dashboard/AdminDashboard';
import { Theme } from './types';

export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

const SwitchViewButton: React.FC<{ onViewChange: () => void; currentView: 'user' | 'admin' }> = ({ onViewChange, currentView }) => (
  <div className="fixed bottom-4 right-4 z-50">
    <button
      onClick={onViewChange}
      className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
    >
      Switch to {currentView === 'user' ? 'Admin' : 'User'} View
    </button>
  </div>
);

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [view, setView] = useState<'user' | 'admin'>('user');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#1a202c';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#f3f4f6';
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
  
  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="min-h-screen font-sans text-gray-900 dark:text-dark-text bg-gray-100 dark:bg-dark-bg">
        <SwitchViewButton onViewChange={() => setView(v => v === 'user' ? 'admin' : 'user')} currentView={view} />
        {view === 'user' ? <UserDashboard /> : <AdminDashboard />}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
