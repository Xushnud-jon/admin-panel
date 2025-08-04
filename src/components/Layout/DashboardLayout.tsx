import React, { useState } from 'react';
import  { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentPage,
  onPageChange,
  onLogout
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage}
        onPageChange={onPageChange}
        isOpen={sidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header 
          onMenuToggle={handleMenuToggle}
          onLogout={onLogout}
        />
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};