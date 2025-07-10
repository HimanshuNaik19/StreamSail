import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Downloads } from './components/Downloads';
import { Files } from './components/Files';
import { Settings } from './components/Settings';
import { ThemeProvider } from './contexts/ThemeContext';

export type ViewType = 'dashboard' | 'downloads' | 'files' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'downloads':
        return <Downloads />;
      case 'files':
        return <Files />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          currentView={currentView}
        />
        
        <div className="flex">
          <Sidebar 
            isOpen={sidebarOpen}
            currentView={currentView}
            onViewChange={setCurrentView}
          />
          
          <main className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          } pt-16`}>
            <div className="p-6">
              {renderView()}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;