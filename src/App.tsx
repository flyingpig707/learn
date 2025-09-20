import React, { useState, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import LearningPaths from './pages/LearningPaths';
import AICapabilities from './pages/AICapabilities';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import Home from '@/pages/Home';
import { AuthContext } from '@/contexts/authContext';

// 加载中组件
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ErrorBoundary>
      <AuthContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, logout }}
      >
          <div className="flex h-screen bg-gray-100">
            {isAuthenticated && <Sidebar />}
            <main className="flex-1 overflow-auto">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route 
                    path="/" 
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} 
                  />
                  <Route 
                    path="/dashboard" 
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
                  />
                  <Route 
                    path="/learning-paths" 
                    element={isAuthenticated ? <LearningPaths /> : <Navigate to="/" />} 
                  />
                  <Route 
                    path="/ai-capabilities" 
                    element={isAuthenticated ? <AICapabilities /> : <Navigate to="/" />} 
                  />
                  <Route 
                    path="/progress" 
                    element={isAuthenticated ? <Progress /> : <Navigate to="/" />} 
                  />
                  <Route 
                    path="/settings" 
                    element={isAuthenticated ? <Settings /> : <Navigate to="/" />} 
                  />
                  <Route 
                    path="/other" 
                    element={<div className="text-center text-xl p-8">Other Page - Coming Soon</div>} 
                  />
                </Routes>
              </Suspense>
            </main>
          </div>
      </AuthContext.Provider>
    </ErrorBoundary>
  );
}
