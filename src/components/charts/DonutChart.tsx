'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { DonutChartProps } from '@/types/dashboard';
import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-3 rounded-lg shadow-large border border-gray-200">
        <p className="text-sm font-medium text-text-primary mb-2">
          {label}
        </p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }}
            />
            <span className="text-sm text-text-secondary">
              Percentage:
            </span>
            <span className="text-sm font-medium text-text-primary">
              {data.payload.percentage}%
            </span>
          </div>
          {data.payload.value && (
            <div className="text-xs text-text-secondary">
              {formatNumber(data.payload.value)} users
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function DonutChart({
  data,
  title = 'Device Distribution',
  loading = false,
  error,
  height = 300,
  className
}: DonutChartProps) {
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

  const totalValue = data.reduce((sum, item) => sum + (item.value || 0), 0);

  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-soft border border-gray-100",
      className
    )}>
      {/* Chart Title */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary">
          User device breakdown
        </p>
      </div>

      {/* Chart Container */}
      <div className="w-full relative" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="percentage"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {formatNumber(totalValue)}
            </div>
            <div className="text-sm text-text-secondary">Total Users</div>
          </div>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: item.color }}
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-text-primary truncate">
                {item.device}
              </div>
              <div className="text-xs text-text-secondary">
                {item.percentage}% • {formatNumber(item.value || 0)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 