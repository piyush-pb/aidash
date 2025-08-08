'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbs?: string[];
}

export default function DashboardLayout({ 
  children, 
  title, 
  breadcrumbs = [] 
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false); // Always show sidebar on desktop
        setIsSidebarCollapsed(false); // Reset collapse on desktop
      } else if (window.innerWidth < 768) {
        setIsSidebarCollapsed(false); // Never collapse on mobile
        // Keep mobile sidebar closed by default
        if (window.innerWidth < 768) {
          setIsSidebarOpen(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={toggleSidebar}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />
      
      {/* Main Content */}
      <div className={cn(
        "main-content-responsive",
        isSidebarCollapsed ? "main-content-collapsed" : "main-content-desktop",
        isSidebarOpen ? "main-content-mobile-sidebar-open" : "",
        "w-full"
      )}>
        {/* Header */}
        <Header 
          title={title} 
          breadcrumbs={breadcrumbs}
          onMenuToggle={toggleSidebar}
        />
        
        {/* Page Content */}
        <main className="spacing-responsive">
          <div className="container-max">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 