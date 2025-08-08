'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import { generateCampaignData } from '@/lib/data';
import { Search, Filter, Download } from 'lucide-react';
import type { CampaignData } from '@/types/dashboard';

export default function CampaignsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCampaigns(generateCampaignData());
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Filter campaigns based on search and status
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout 
      title="Campaigns"
      breadcrumbs={['Analytics', 'Campaigns']}
    >
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Campaigns</h1>
            <p className="text-text-secondary mt-1">
              Manage and monitor your marketing campaigns
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              <span>+ New Campaign</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <DataTable
          data={filteredCampaigns}
          loading={isLoading}
          itemsPerPage={10}
        />
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Total Campaigns</p>
              <p className="text-2xl font-bold text-text-primary">{campaigns.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold">{campaigns.length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Active</p>
              <p className="text-2xl font-bold text-text-primary">
                {campaigns.filter((c: any) => c.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold">✓</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Paused</p>
              <p className="text-2xl font-bold text-text-primary">
                {campaigns.filter((c: any) => c.status === 'paused').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 font-bold">⏸</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Completed</p>
              <p className="text-2xl font-bold text-text-primary">
                {campaigns.filter((c: any) => c.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">✓</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 