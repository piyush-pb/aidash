'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import { 
  generateLineChartData, 
  generateBarChartData 
} from '@/lib/data';
import { Calendar, Download, Filter, FileText, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState('performance');
  const [dateRange, setDateRange] = useState('30d');
  const [data, setData] = useState({
    lineChartData: [],
    barChartData: []
  });

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setData({
        lineChartData: generateLineChartData(),
        barChartData: generateBarChartData()
      });
      
      setIsLoading(false);
    };

    loadData();
  }, [dateRange, selectedReport]);

  const reports = [
    {
      id: 'performance',
      title: 'Performance Report',
      description: 'Campaign performance and ROI analysis',
      icon: TrendingUp,
      metrics: [
        { label: 'Total Revenue', value: '$45,670', change: '+12.5%' },
        { label: 'ROI', value: '4.2x', change: '+0.5x' },
        { label: 'Conversion Rate', value: '3.2%', change: '+0.8%' }
      ]
    },
    {
      id: 'audience',
      title: 'Audience Report',
      description: 'Demographics and user behavior insights',
      icon: Users,
      metrics: [
        { label: 'Total Users', value: '12,450', change: '+8.3%' },
        { label: 'Active Users', value: '8,920', change: '+5.2%' },
        { label: 'Engagement Rate', value: '2.8%', change: '+0.4%' }
      ]
    },
    {
      id: 'financial',
      title: 'Financial Report',
      description: 'Revenue, costs, and profitability analysis',
      icon: DollarSign,
      metrics: [
        { label: 'Total Spend', value: '$10,890', change: '+15.2%' },
        { label: 'Profit Margin', value: '76.1%', change: '+2.1%' },
        { label: 'Cost per Conversion', value: '$9.03', change: '-1.2%' }
      ]
    }
  ];

  const currentReport = reports.find(r => r.id === selectedReport);

  return (
    <DashboardLayout 
      title="Reports"
      breadcrumbs={['Reports']}
    >
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Reports</h1>
            <p className="text-text-secondary mt-1">
              Generate and analyze comprehensive marketing reports
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report Selection Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Report Types</h3>
            <div className="space-y-2">
              {reports.map((report) => {
                const Icon = report.icon;
                const isActive = selectedReport === report.id;
                
                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600 border border-primary-200' 
                        : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{report.title}</p>
                      <p className="text-xs opacity-75">{report.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {currentReport && (
              <div>
                {/* Report Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <currentReport.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">{currentReport.title}</h2>
                    <p className="text-text-secondary">{currentReport.description}</p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {currentReport.metrics.map((metric, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-text-secondary mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold text-text-primary mb-1">{metric.value}</p>
                      <p className="text-sm text-green-600 font-medium">{metric.change}</p>
                    </div>
                  ))}
                </div>

                {/* Charts Section */}
                <div className="space-y-8">
                  {/* Performance Trend */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Performance Trend
                    </h3>
                    <LineChart
                      data={data.lineChartData}
                      title="Revenue Trend"
                      loading={isLoading}
                      height={300}
                    />
                  </div>

                  {/* Campaign Performance */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Campaign Performance
                    </h3>
                    <BarChart
                      data={data.barChartData}
                      title="Traffic Sources"
                      loading={isLoading}
                      height={300}
                    />
                  </div>

                  {/* Detailed Analysis */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Detailed Analysis
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-text-primary mb-3">Top Performing Campaigns</h4>
                        <div className="space-y-3">
                          {[
                            { name: 'Summer Sale 2024', performance: '125%', revenue: '$12,500' },
                            { name: 'Brand Awareness Q4', performance: '98%', revenue: '$8,900' },
                            { name: 'Holiday Special', performance: '142%', revenue: '$6,700' }
                          ].map((campaign, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm text-text-primary">{campaign.name}</p>
                                <p className="text-xs text-text-secondary">{campaign.revenue}</p>
                              </div>
                              <span className="text-sm font-medium text-green-600">{campaign.performance}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-text-primary mb-3">Key Insights</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <p className="text-sm text-text-secondary">
                              Revenue increased by 12.5% compared to the previous period
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <p className="text-sm text-text-secondary">
                              Conversion rate improved by 0.8% due to optimized landing pages
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                            <p className="text-sm text-text-secondary">
                              Cost per acquisition decreased by 1.2% through better targeting
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Recommendations
                    </h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-900 mb-2">Optimization Opportunities</h4>
                          <ul className="space-y-2 text-sm text-blue-800">
                            <li>• Increase budget allocation for top-performing campaigns</li>
                            <li>• Optimize ad copy for campaigns with lower conversion rates</li>
                            <li>• Implement retargeting strategies for improved ROI</li>
                            <li>• Consider expanding successful campaign themes to new audiences</li>
                          </ul>
                        </div>
                      </div>
                    </div>
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