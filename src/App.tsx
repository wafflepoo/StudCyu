import React, { useState, createContext, useContext } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { Dashboard } from './components/Dashboard';
import { SearchRepository } from './components/SearchRepository';
import { DocumentUpload } from './components/DocumentUpload';
import { StudyLists } from './components/StudyLists';
import { Profile } from './components/Profile';
import { AdminDashboard } from './components/AdminDashboard';
import { HelpSupport } from './components/HelpSupport';
import { Navbar } from './components/Navbar';

// User context for role-based functionality
type UserRole = 'guest' | 'registered' | 'premium' | 'institutional';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AppContextType {
  user: User | null;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('landing');

  const login = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'search':
        return <SearchRepository />;
      case 'upload':
        return <DocumentUpload />;
      case 'study-lists':
        return <StudyLists />;
      case 'profile':
        return <Profile />;
      case 'admin':
        return <AdminDashboard />;
      case 'help':
        return <HelpSupport />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <AppContext.Provider value={{ user, currentPage, setCurrentPage, login, logout }}>
      <div className="min-h-screen bg-background">
        {currentPage !== 'landing' && <Navbar />}
        <main className={currentPage !== 'landing' ? 'pt-16' : ''}>
          {renderPage()}
        </main>
      </div>
    </AppContext.Provider>
  );
}