'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTheme } from '@/lib/theme';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Save,
  X
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    weekly: true,
    monthly: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'data', label: 'Data & Privacy', icon: Database }
  ];

  return (
    <DashboardLayout 
      title="Settings"
      breadcrumbs={['Settings']}
    >
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                     <div>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
             <p className="text-gray-600 dark:text-gray-300 mt-1">
               Manage your account preferences and configurations
             </p>
           </div>
          
                     <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
               <X className="w-4 h-4" />
               <span>Cancel</span>
             </button>
             
             <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
               <Save className="w-4 h-4" />
               <span>Save Changes</span>
             </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-r-2 border-primary-500' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            {activeTab === 'profile' && (
              <div>
                                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                        Change Photo
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                                             <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                         First Name
                       </label>
                                             <input
                         type="text"
                         defaultValue="John"
                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                       />
                    </div>
                    
                                         <div>
                       <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                         Last Name
                       </label>
                       <input
                         type="text"
                         defaultValue="Smith"
                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                       />
                     </div>
                     
                     <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                         Email Address
                       </label>
                       <input
                         type="email"
                         defaultValue="john.smith@admybrand.com"
                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                       />
                     </div>
                     
                     <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                         Job Title
                       </label>
                       <input
                         type="text"
                         defaultValue="Marketing Manager"
                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                       />
                     </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
                 
                 <div className="space-y-6">
                   <div>
                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Communication Channels</h3>
                     <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <div>
                           <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                           <p className="text-sm text-gray-600 dark:text-gray-300">Receive updates via email</p>
                         </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.email}
                            onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      
                                             <div className="flex items-center justify-between">
                         <div>
                           <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                           <p className="text-sm text-gray-600 dark:text-gray-300">Receive push notifications in browser</p>
                         </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.push}
                            onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      
                                             <div className="flex items-center justify-between">
                         <div>
                           <p className="font-medium text-gray-900 dark:text-white">SMS Notifications</p>
                           <p className="text-sm text-gray-600 dark:text-gray-300">Receive SMS alerts for critical updates</p>
                         </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.sms}
                            onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                                     <div>
                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Report Frequency</h3>
                     <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <div>
                           <p className="font-medium text-gray-900 dark:text-white">Weekly Reports</p>
                           <p className="text-sm text-gray-600 dark:text-gray-300">Receive weekly performance summaries</p>
                         </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.weekly}
                            onChange={(e) => setNotifications({...notifications, weekly: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      
                                             <div className="flex items-center justify-between">
                         <div>
                           <p className="font-medium text-gray-900 dark:text-white">Monthly Reports</p>
                           <p className="text-sm text-gray-600 dark:text-gray-300">Receive monthly performance summaries</p>
                         </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.monthly}
                            onChange={(e) => setNotifications({...notifications, monthly: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h2>
                 
                 <div className="space-y-6">
                   <div>
                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Password</h3>
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                      Change Password
                    </button>
                  </div>
                  
                                     <div>
                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
                     <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                       <div>
                         <p className="font-medium text-gray-900 dark:text-white">2FA Status</p>
                         <p className="text-sm text-gray-600 dark:text-gray-300">Add an extra layer of security to your account</p>
                       </div>
                       <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                  
                                     <div>
                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Active Sessions</h3>
                     <div className="space-y-3">
                       <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                         <div>
                           <p className="font-medium text-gray-900 dark:text-white">Current Session</p>
                           <p className="text-sm text-gray-600 dark:text-gray-300">Windows • Chrome • 192.168.1.100</p>
                         </div>
                         <span className="text-sm text-green-600 dark:text-green-400 font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Appearance Settings</h2>
                 
                 <div className="space-y-6">
                   <div>
                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button 
                        onClick={() => setTheme('light')}
                        className={`p-4 border-2 rounded-lg bg-white transition-all ${
                          theme === 'light' 
                            ? 'border-primary-500 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-full h-8 bg-gray-100 rounded mb-2"></div>
                                                 <p className="text-sm font-medium text-gray-900 dark:text-white">Light</p>
                      </button>
                      <button 
                        onClick={() => setTheme('dark')}
                        className={`p-4 border-2 rounded-lg bg-gray-900 transition-all ${
                          theme === 'dark' 
                            ? 'border-primary-500 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                        <p className="text-sm font-medium text-white">Dark</p>
                      </button>
                      <button 
                        onClick={() => setTheme('auto')}
                        className={`p-4 border-2 rounded-lg bg-white transition-all ${
                          theme === 'auto' 
                            ? 'border-primary-500 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-full h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded mb-2"></div>
                                                 <p className="text-sm font-medium text-gray-900 dark:text-white">Auto</p>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                                         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Language</h3>
                     <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div>
                                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Integrations</h2>
                 
                 <div className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                       <div className="flex items-center gap-3 mb-3">
                         <div className="w-8 h-8 bg-blue-500 rounded"></div>
                         <div>
                           <p className="font-medium text-gray-900 dark:text-white">Google Analytics</p>
                           <p className="text-sm text-gray-600 dark:text-gray-300">Connected</p>
                         </div>
                       </div>
                       <button className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                        Disconnect
                      </button>
                    </div>
                    
                                         <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                       <div className="flex items-center gap-3 mb-3">
                         <div className="w-8 h-8 bg-green-500 rounded"></div>
                         <div>
                           <p className="font-medium text-gray-900 dark:text-white">Facebook Ads</p>
                           <p className="text-sm text-gray-600 dark:text-gray-300">Connected</p>
                         </div>
                       </div>
                       <button className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                        Disconnect
                      </button>
                    </div>
                    
                                         <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                       <div className="flex items-center gap-3 mb-3">
                         <div className="w-8 h-8 bg-gray-300 rounded"></div>
                         <div>
                           <p className="font-medium text-gray-900 dark:text-white">Google Ads</p>
                           <p className="text-sm text-gray-600 dark:text-gray-300">Not connected</p>
                         </div>
                       </div>
                      <button className="w-full px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                        Connect
                      </button>
                    </div>
                    
                                         <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                       <div className="flex items-center gap-3 mb-3">
                         <div className="w-8 h-8 bg-gray-300 rounded"></div>
                         <div>
                           <p className="font-medium text-gray-900 dark:text-white">Mailchimp</p>
                           <p className="text-sm text-gray-600 dark:text-gray-300">Not connected</p>
                         </div>
                       </div>
                      <button className="w-full px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div>
                                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Data & Privacy</h2>
                 
                 <div className="space-y-6">
                   <div>
                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Export</h3>
                     <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                       Download a copy of your data including campaigns, analytics, and settings.
                     </p>
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                      Export Data
                    </button>
                  </div>
                  
                                     <div>
                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Deletion</h3>
                     <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                       Permanently delete your account and all associated data. This action cannot be undone.
                     </p>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 