import React, { useState, createContext, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import UserLoginPage from './pages/UserLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import UserDashboard from './pages/user-dashboard/UserDashboard';
import AdminDashboard from './pages/admin-dashboard/AdminDashboard';
import { Theme } from './types';

export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

const ProtectedRoute: React.FC<{ children: React.ReactNode; requireAdmin?: boolean }> = ({ children, requireAdmin = false }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || !user) {
    return <Navigate to={requireAdmin ? "/admin" : "/login"} replace />;
  }
  
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

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
        <Routes>
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/dashboard/*" 
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
