import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: { [key: string]: { password: string; user: User } } = {
  'demo': {
    password: 'demo',
    user: {
      id: 'user-1',
      username: 'demo',
      role: 'user',
      name: 'Demo User',
      email: 'demo@spiderbot.io',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      kycStatus: 'Verified',
      subscriptionPlan: 'Pro',
      lastLogin: new Date().toISOString()
    }
  },
  'admin': {
    password: 'admin',
    user: {
      id: 'admin-1',
      username: 'admin',
      role: 'admin',
      name: 'Admin User',
      email: 'admin@spiderbot.io',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      kycStatus: 'Verified',
      subscriptionPlan: 'Enterprise',
      lastLogin: new Date().toISOString()
    }
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    const userEntry = DEMO_USERS[username.toLowerCase()];
    if (userEntry && userEntry.password === password) {
      setUser(userEntry.user);
      localStorage.setItem('spiderbot_user', JSON.stringify(userEntry.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spiderbot_user');
  };

  React.useEffect(() => {
    const savedUser = localStorage.getItem('spiderbot_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('spiderbot_user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
