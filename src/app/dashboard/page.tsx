'use client';

import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import MetricCard from '@/components/dashboard/MetricCard';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import DonutChart from '@/components/charts/DonutChart';
import DataTable from '@/components/dashboard/DataTable';
import { 
  fetchMetricsData,
  fetchLineChartData,
  fetchBarChartData,
  fetchDonutChartData,
  fetchCampaignData,
  fetchDashboardData,
  simulateNetworkError,
  simulateServerError,
  simulateDataError
} from '@/lib/data';
import { useDataFetching } from '@/lib/hooks';
import { RefreshCw, AlertCircle, X, WifiOff, Server } from 'lucide-react';
import { MetricCard as MetricCardType, LineChartData, BarChartData, DonutChartData, CampaignData } from '@/types/dashboard';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [errorSimulation, setErrorSimulation] = useState<'network' | 'server' | 'data' | null>(null);

  // Use the new data fetching hook with error handling
  const { 
    data: dashboardData, 
    loading: isLoading, 
    error, 
    refetch 
  } = useDataFetching({
    fetchFn: () => {
      if (errorSimulation === 'network') {
        return simulateNetworkError();
      } else if (errorSimulation === 'server') {
        return simulateServerError();
      } else if (errorSimulation === 'data') {
        return simulateDataError();
      }
      return fetchDashboardData();
    },
    dependencies: [errorSimulation],
    onError: (error) => {
      console.error('Dashboard data fetch error:', error);
    }
  });

  const handleRefresh = useCallback(async () => {
    setErrorSimulation(null);
    refetch();
  }, [refetch]);

  const handleErrorSimulation = useCallback(async (errorType: 'network' | 'server' | 'data') => {
    setErrorSimulation(errorType);
  }, []);

  // Error state component
  if (error) {
    return (
      <DashboardLayout 
        title="Dashboard Overview"
        breadcrumbs={['Analytics', 'Dashboard']}
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {errorSimulation === 'network' ? (
                <WifiOff className="w-8 h-8 text-error-600" aria-hidden="true" />
              ) : errorSimulation === 'server' ? (
                <Server className="w-8 h-8 text-error-600" aria-hidden="true" />
              ) : (
                <AlertCircle className="w-8 h-8 text-error-600" aria-hidden="true" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {errorSimulation === 'network' ? 'Network Error' : 
               errorSimulation === 'server' ? 'Server Error' : 
               'Unable to Load Dashboard'}
            </h3>
            <p className="text-text-secondary mb-6">
              {error.message}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                aria-label="Retry loading dashboard data"
              >
                Try Again
              </button>
              <button
                onClick={() => setErrorSimulation(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Dismiss error message"
              >
                Dismiss
              </button>
            </div>
            
            {/* Error simulation controls for testing */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-text-secondary mb-3">Test Error Handling:</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handleErrorSimulation('network')}
                  className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors"
                >
                  Network Error
                </button>
                <button
                  onClick={() => handleErrorSimulation('server')}
                  className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
                >
                  Server Error
                </button>
                <button
                  onClick={() => handleErrorSimulation('data')}
                  className="px-3 py-1 text-xs bg-orange-100 text-orange-800 rounded hover:bg-orange-200 transition-colors"
                >
                  Data Error
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Default data structure
  const data = dashboardData || {
    metrics: [],
    lineChartData: [],
    barChartData: [],
    donutChartData: [],
    campaigns: []
  };

  return (
    <ErrorBoundary>
      <DashboardLayout 
        title="Dashboard Overview"
        breadcrumbs={['Analytics', 'Dashboard']}
      >
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Dashboard Overview</h1>
              <p className="text-text-secondary mt-1">
                Monitor your marketing performance and campaign insights
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                aria-label="Select time period"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
              
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Refresh data"
                aria-label="Refresh dashboard data"
              >
                <RefreshCw className={cn(
                  "w-4 h-4 text-text-secondary",
                  isLoading && "animate-spin"
                )} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mb-8">
          <h2 className="sr-only">Key Performance Metrics</h2>
          <div className="grid-responsive">
            {data.metrics.map((metric) => (
              <MetricCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                icon={metric.icon}
                format={metric.format}
                description={metric.description}
                loading={isLoading}
              />
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            Performance Analytics
          </h2>
          
          <div className="grid-charts-responsive mb-6">
            {/* Line Chart - 2/3 width on desktop */}
            <div className="lg:col-span-2">
              <LineChart
                data={data.lineChartData}
                title="Revenue Trend"
                loading={isLoading}
                height={300}
              />
            </div>
            
            {/* Donut Chart - 1/3 width on desktop */}
            <div className="lg:col-span-1">
              <DonutChart
                data={data.donutChartData}
                title="Device Distribution"
                loading={isLoading}
                height={300}
              />
            </div>
          </div>
          
          {/* Bar Chart - Full width */}
          <div className="w-full">
            <BarChart
              data={data.barChartData}
              title="Traffic Sources"
              loading={isLoading}
              height={300}
            />
          </div>
        </div>

        {/* Data Table Section */}
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            Campaign Performance
          </h2>
          
          <DataTable
            data={data.campaigns}
            loading={isLoading}
            itemsPerPage={10}
          />
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  );
} 