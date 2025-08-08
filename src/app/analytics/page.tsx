'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import DonutChart from '@/components/charts/DonutChart';
import { 
  generateLineChartData, 
  generateBarChartData, 
  generateDonutChartData 
} from '@/lib/data';
import { Download, Filter } from 'lucide-react';
import { LineChartData, BarChartData, DonutChartData } from '@/types/dashboard';

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [data, setData] = useState<{
    lineChartData: LineChartData[];
    barChartData: BarChartData[];
    donutChartData: DonutChartData[];
  }>({
    lineChartData: [],
    barChartData: [],
    donutChartData: []
  });

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setData({
        lineChartData: generateLineChartData(),
        barChartData: generateBarChartData(),
        donutChartData: generateDonutChartData()
      });
      
      setIsLoading(false);
    };

    loadData();
  }, [timeRange]);

  return (
    <DashboardLayout 
      title="Analytics"
      breadcrumbs={['Analytics']}
    >
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Deep dive into your marketing performance and insights
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Key Performance Indicators
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$45,670</p>
                <p className="text-sm text-green-600 dark:text-green-400">+12.5% vs last period</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-bold">$</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3.2%</p>
                <p className="text-sm text-green-600 dark:text-green-400">+0.8% vs last period</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Cost per Click</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$2.45</p>
                <p className="text-sm text-red-600 dark:text-red-400">+0.3% vs last period</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 dark:text-yellow-400 font-bold">¢</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">ROAS</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.2x</p>
                <p className="text-sm text-green-600 dark:text-green-400">+0.5x vs last period</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-bold">×</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Performance Trends
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Revenue Trend - 2/3 width on desktop */}
          <div className="lg:col-span-2">
            <LineChart
              data={data.lineChartData}
              title="Revenue Trend"
              loading={isLoading}
              height={300}
            />
          </div>
          
          {/* Traffic Sources - 1/3 width on desktop */}
          <div className="lg:col-span-1">
            <DonutChart
              data={data.donutChartData}
              title="Traffic Sources"
              loading={isLoading}
              height={300}
            />
          </div>
        </div>
        
        {/* Campaign Performance - Full width */}
        <div className="w-full">
          <BarChart
            data={data.barChartData}
            title="Campaign Performance"
            loading={isLoading}
            height={300}
          />
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Campaigns
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Summer Sale 2024', revenue: 12500, growth: '+15%' },
              { name: 'Brand Awareness Q4', revenue: 8900, growth: '+8%' },
              { name: 'Holiday Special', revenue: 6700, growth: '+22%' },
              { name: 'Product Launch', revenue: 5400, growth: '+12%' }
            ].map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{campaign.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">${campaign.revenue.toLocaleString()}</p>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">{campaign.growth}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Audience Insights
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Age Group</span>
              <span className="font-medium text-gray-900 dark:text-white">25-34 (45%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Gender</span>
              <span className="font-medium text-gray-900 dark:text-white">Female (62%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Location</span>
              <span className="font-medium text-gray-900 dark:text-white">United States (78%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Device</span>
              <span className="font-medium text-gray-900 dark:text-white">Mobile (65%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Platform</span>
              <span className="font-medium text-gray-900 dark:text-white">Facebook (42%)</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 