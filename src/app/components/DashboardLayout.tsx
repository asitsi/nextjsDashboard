"use client"
import React, { useState } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="dashboard-layout" style={{display: 'flex'}}>
      <Sidebar onMenuItemClick={handleMenuItemClick} />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
