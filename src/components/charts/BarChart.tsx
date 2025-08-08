'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { BarChartProps } from '@/types/dashboard';
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
              Visitors:
            </span>
            <span className="text-sm font-medium text-text-primary">
              {formatNumber(data.value)}
            </span>
          </div>
          {data.payload.percentage && (
            <div className="text-xs text-text-secondary">
              {data.payload.percentage}% of total traffic
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function BarChart({
  data,
  title = 'Traffic Sources',
  loading = false,
  error,
  height = 300,
  className
}: BarChartProps) {
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
          Traffic distribution by source
        </p>
      </div>

      {/* Chart Container */}
      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            layout="horizontal"
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#F1F5F9" 
              horizontal={false}
            />
            
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
              tickFormatter={(value) => formatNumber(value)}
            />
            
            <YAxis
              dataKey="source"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
              width={100}
            />
            
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{
                fill: 'rgba(59, 130, 246, 0.1)',
              }}
            />
            
            <Bar
              dataKey="visitors"
              radius={[0, 4, 4, 0]}
              fill="#3B82F6"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-text-secondary">{item.source}</span>
            <span className="text-sm font-medium text-text-primary">
              {formatNumber(item.visitors)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 