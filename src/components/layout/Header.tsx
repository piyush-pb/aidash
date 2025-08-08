'use client';

import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  ChevronDown,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  breadcrumbs?: string[];
  onMenuToggle: () => void;
}

export default function Header({ title, breadcrumbs = [], onMenuToggle }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30" role="banner">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="mobile-menu-button p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded="false"
          aria-controls="sidebar-navigation"
        >
          <Menu className="w-5 h-5 text-text-secondary" aria-hidden="true" />
        </button>

        {/* Breadcrumbs */}
        <nav className="hidden sm:flex items-center gap-2" aria-label="Breadcrumb">
          <h1 className="text-lg font-semibold text-text-primary">
            {title}
          </h1>
          {breadcrumbs.length > 0 && (
            <>
              <span className="text-text-secondary" aria-hidden="true">/</span>
              <ol className="flex items-center gap-2" role="list">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} role="listitem">
                    <span className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                      {crumb}
                    </span>
                    {index < breadcrumbs.length - 1 && (
                      <span className="text-text-secondary ml-2" aria-hidden="true">/</span>
                    )}
                  </li>
                ))}
              </ol>
            </>
          )}
        </nav>
      </div>

      {/* Center Section - Search (Desktop only) */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search campaigns, reports..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            aria-label="Search campaigns and reports"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button 
          className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
          aria-describedby="notification-count"
        >
          <Bell className="w-5 h-5 text-text-secondary" aria-hidden="true" />
          <span 
            id="notification-count"
            className="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full"
            aria-label="3 unread notifications"
          ></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="User menu"
            aria-expanded={isUserMenuOpen}
            aria-haspopup="true"
            aria-controls="user-menu"
          >
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center" aria-hidden="true">
              <User className="w-4 h-4 text-primary-600" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-text-primary">John Smith</p>
              <p className="text-xs text-text-secondary">Admin</p>
            </div>
            <ChevronDown className={cn(
              "w-4 h-4 text-text-secondary transition-transform",
              isUserMenuOpen && "rotate-180"
            )} aria-hidden="true" />
          </button>

          {/* User Dropdown Menu */}
          {isUserMenuOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setIsUserMenuOpen(false)}
                aria-hidden="true"
              />
              
              {/* Menu */}
              <div 
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-large border border-gray-200 py-2 z-50"
                id="user-menu"
                role="menu"
                aria-label="User menu options"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-text-primary">John Smith</p>
                  <p className="text-xs text-text-secondary">john.smith@admybrand.com</p>
                </div>
                
                <div className="py-1" role="group" aria-label="User actions">
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-gray-50 hover:text-text-primary transition-colors"
                    role="menuitem"
                    aria-label="View profile"
                  >
                    <User className="w-4 h-4" aria-hidden="true" />
                    Profile
                  </button>
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-gray-50 hover:text-text-primary transition-colors"
                    role="menuitem"
                    aria-label="Open settings"
                  >
                    <Settings className="w-4 h-4" aria-hidden="true" />
                    Settings
                  </button>
                </div>
                
                <div className="border-t border-gray-100 pt-1" role="group" aria-label="Account actions">
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors"
                    role="menuitem"
                    aria-label="Sign out of account"
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 