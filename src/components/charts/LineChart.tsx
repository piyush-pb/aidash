'use client';

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { LineChartProps } from '@/types/dashboard';
import { formatCurrency, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-large border border-gray-200">
        <p className="text-sm font-medium text-text-primary mb-2">
          {formatDate(label || '', 'short')}
        </p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-text-secondary">
                {entry.name}:
              </span>
              <span className="text-sm font-medium text-text-primary">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function LineChart({
  data,
  title = 'Revenue Trend',
  loading = false,
  error,
  height = 300,
  className
}: LineChartProps) {
  if (loading) {
    return (
      <div className={cn(
        "bg-white rounded-xl p-6 shadow-soft border border-gray-100",
        "animate-pulse",
        className
      )}>
        <div className="w-32 h-6 bg-gray-200 rounded mb-4"></div>
        <div className="w-full h-[300px] bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(
        "bg-white rounded-xl p-6 shadow-soft border border-gray-100",
        "flex items-center justify-center",
        className
      )}>
        <div className="text-center">
          <div className="text-error-500 text-sm mb-1">Chart Error</div>
          <div className="text-text-secondary text-xs">{error}</div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={cn(
        "bg-white rounded-xl p-6 shadow-soft border border-gray-100",
        "flex items-center justify-center",
        className
      )}>
        <div className="text-center">
          <div className="text-text-secondary text-sm">No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-soft border border-gray-100",
      className
    )}>
      {/* Chart Title */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary">
          Last 30 days revenue performance
        </p>
      </div>

      {/* Chart Container */}
      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#F1F5F9" 
              vertical={false}
            />
            
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
              tickFormatter={(value) => formatDate(value, 'short')}
              interval="preserveStartEnd"
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
              tickFormatter={(value) => formatCurrency(value)}
              width={80}
            />
            
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{
                stroke: '#3B82F6',
                strokeWidth: 2,
                strokeDasharray: '5 5',
              }}
            />
            
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#colorRevenue)"
              dot={{
                fill: '#3B82F6',
                strokeWidth: 2,
                stroke: '#FFFFFF',
                r: 4,
              }}
              activeDot={{
                r: 6,
                stroke: '#3B82F6',
                strokeWidth: 2,
                fill: '#FFFFFF',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="mt-4 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-500"></div>
          <span className="text-sm text-text-secondary">Revenue</span>
        </div>
      </div>
    </div>
  );
} 