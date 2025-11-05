import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/Icon';

const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(username, password);
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950 via-dark-bg to-gray-900 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-warning/10 rounded-full blur-3xl -top-32 sm:-top-48 -left-32 sm:-left-48"></div>
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-danger/10 rounded-full blur-3xl -bottom-32 sm:-bottom-48 -right-32 sm:-right-48"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md px-4 sm:px-8">
        <div className="bg-dark-card border border-warning/30 rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="bg-warning/20 p-3 rounded-full">
                <Icon name="settings" className="h-10 w-10 sm:h-12 sm:w-12 text-warning" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-sm sm:text-base text-warning">Restricted Access</p>
            <p className="text-xs text-dark-text-secondary mt-2">SpiderBot Administration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-dark-text-secondary mb-2">
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-dark-bg-secondary border border-warning/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-warning focus:border-transparent"
                placeholder="Enter admin username"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-dark-text-secondary mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-bg-secondary border border-warning/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-warning focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="bg-danger/10 border border-danger/50 rounded-lg p-3 flex items-center space-x-2">
                <Icon name="warning" className="h-5 w-5 text-danger flex-shrink-0" />
                <span className="text-danger text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-warning hover:bg-yellow-600 text-gray-900 font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-gray-900 border-t-transparent rounded-full"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Admin Sign In</span>
              )}
            </button>
          </form>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-warning/20">
            <p className="text-xs sm:text-sm text-dark-text-secondary text-center mb-3">Demo Credentials</p>
            <div className="bg-dark-bg-secondary border border-warning/20 rounded-lg p-2.5 sm:p-3">
              <p className="font-semibold text-warning mb-1 text-xs sm:text-sm">Admin User:</p>
              <p className="text-xs text-dark-text-secondary">Username: <span className="text-warning font-mono">admin</span></p>
              <p className="text-xs text-dark-text-secondary">Password: <span className="text-warning font-mono">admin</span></p>
            </div>
            <div className="mt-4 text-center">
              <a href="/login" className="text-xs text-primary hover:text-primary-hover transition-colors">
                ← User Portal
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
