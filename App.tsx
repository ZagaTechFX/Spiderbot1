
import React, { useState, createContext, useMemo, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/user-dashboard/UserDashboard';
import AdminDashboard from './pages/admin-dashboard/AdminDashboard';
import { Theme } from './types';

export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

const AppContent: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const { user, isAuthenticated } = useAuth();

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
  
  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="min-h-screen font-sans text-gray-900 dark:text-dark-text bg-gray-100 dark:bg-dark-bg">
        {user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </ThemeContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
