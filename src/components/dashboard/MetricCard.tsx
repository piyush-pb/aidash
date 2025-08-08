'use client';

import React from 'react';
import { 
  DollarSign, 
  Users, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Minus 
} from 'lucide-react';
import { MetricCardProps } from '@/types/dashboard';
import { formatCurrency, formatNumber, formatPercentage, getTrendIcon, getTrendColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

const iconMap = {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  Minus
};

export default function MetricCard({
  title,
  value,
  change,
  icon,
  format,
  description,
  className,
  loading = false,
  error
}: MetricCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || TrendingUp;
  const TrendIcon = iconMap[getTrendIcon(change) as keyof typeof iconMap] || Minus;

  const formatValue = (val: number, fmt: string) => {
    switch (fmt) {
      case 'currency':
        return formatCurrency(val);
      case 'percentage':
        return formatPercentage(val);
      case 'number':
        return formatNumber(val);
      default:
        return val.toString();
    }
  };

  if (loading) {
    return (
      <div className={cn(
        "bg-white rounded-xl p-6 shadow-soft border border-gray-100",
        "w-full max-w-[280px] h-[120px]",
        "animate-pulse",
        className
      )}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="w-24 h-8 bg-gray-200 rounded mb-2"></div>
        <div className="w-16 h-3 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(
        "bg-white rounded-xl p-6 shadow-soft border border-gray-100",
        "w-full max-w-[280px] h-[120px]",
        "flex items-center justify-center",
        className
      )}>
        <div className="text-center">
          <div className="text-error-500 text-sm mb-1">Error</div>
          <div className="text-text-secondary text-xs">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
        "bg-white rounded-xl p-6 shadow-soft border border-gray-100",
        "w-full max-w-[280px] h-[120px]",
        "hover:shadow-medium hover:scale-[1.02] transform transition-all duration-200 ease-in-out",
        "cursor-pointer",
        className
      )}
      title={description}
    >
      {/* Header: Icon and Title */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
          <IconComponent 
            className="w-5 h-5 text-primary-600" 
            aria-hidden="true"
          />
        </div>
        <h3 className="text-sm font-medium text-text-secondary truncate">
          {title}
        </h3>
      </div>

      {/* Main Value */}
      <div className="mb-2">
        <div className="text-2xl font-bold text-text-primary">
          {formatValue(value, format)}
        </div>
      </div>

      {/* Footer: Change Percentage */}
      <div className="flex items-center gap-1">
        <TrendIcon 
          className={cn(
            "w-4 h-4",
            getTrendColor(change)
          )}
          aria-hidden="true"
        />
        <span className={cn(
          "text-xs font-medium",
          getTrendColor(change)
        )}>
          {change > 0 ? '+' : ''}{formatPercentage(Math.abs(change))}
        </span>
        <span className="text-xs text-text-secondary ml-1">
          vs last period
        </span>
      </div>
    </div>
  );
} 