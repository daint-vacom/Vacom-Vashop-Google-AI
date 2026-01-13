
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OrderListPage } from './pages/orders/OrderListPage';
import { SyncOrderPage } from './pages/orders/SyncOrderPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.ORDERS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (currentView) {
      case AppView.ORDERS:
        return <OrderListPage onGoToSync={() => setCurrentView(AppView.SYNC_ORDERS)} />;
      case AppView.SYNC_ORDERS:
        return <SyncOrderPage onBack={() => setCurrentView(AppView.ORDERS)} />;
      case AppView.SETTINGS:
        return <SettingsPage />;
      default:
        return <OrderListPage onGoToSync={() => setCurrentView(AppView.SYNC_ORDERS)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        isOpen={isSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Header onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
