import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency values with proper locale support
 */
export function formatCurrency(
  value: number,
  locale: string = 'en-US',
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(value: number): string {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1) + 'B';
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toString();
}

/**
 * Format percentage values with configurable decimal places
 */
export function formatPercentage(
  value: number,
  decimals: number = 1
): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format dates with multiple format options
 */
export function formatDate(
  date: string | Date,
  format: 'short' | 'long' | 'relative' | 'iso' = 'short'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    case 'long':
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'relative':
      return getRelativeTimeString(dateObj);
    case 'iso':
      return dateObj.toISOString().split('T')[0];
    default:
      return dateObj.toLocaleDateString();
  }
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

/**
 * Generic sorting function for arrays
 */
export function sortData<T>(
  data: T[],
  key: keyof T,
  direction: 'asc' | 'desc' | null
): T[] {
  if (!direction) return data;
  
  return [...data].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return direction === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });
}

/**
 * Filter data based on multiple criteria
 */
export function filterData<T>(
  data: T[],
  filters: Array<{ key: keyof T; value: any; operator: string }>
): T[] {
  return data.filter(item => {
    return filters.every(filter => {
      const itemValue = item[filter.key];
      
      switch (filter.operator) {
        case 'equals':
          return itemValue === filter.value;
        case 'contains':
          return String(itemValue).toLowerCase().includes(
            String(filter.value).toLowerCase()
          );
        case 'greater':
          return Number(itemValue) > Number(filter.value);
        case 'less':
          return Number(itemValue) < Number(filter.value);
        case 'in':
          return Array.isArray(filter.value) && filter.value.includes(itemValue);
        default:
          return true;
      }
    });
  });
}

/**
 * Paginate data with metadata
 */
export function paginateData<T>(
  data: T[],
  page: number,
  limit: number
): { data: T[]; meta: any } {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    meta: {
      currentPage: page,
      totalPages: Math.ceil(data.length / limit),
      totalItems: data.length,
      itemsPerPage: limit,
      hasNextPage: endIndex < data.length,
      hasPreviousPage: page > 1,
    },
  };
}

/**
 * Search data across multiple fields
 */
export function searchData<T>(
  data: T[],
  query: string,
  fields: (keyof T)[]
): T[] {
  if (!query.trim()) return data;
  
  const searchTerm = query.toLowerCase();
  
  return data.filter(item => {
    return fields.some(field => {
      const value = item[field];
      return String(value).toLowerCase().includes(searchTerm);
    });
  });
}

/**
 * Generate color palette for charts
 */
export function generateColors(count: number): string[] {
  const colors = [
    '#3B82F6', // Primary blue
    '#6366F1', // Secondary indigo
    '#10B981', // Success green
    '#F59E0B', // Warning amber
    '#EF4444', // Error red
    '#8B5CF6', // Purple
    '#06B6D4', // Cyan
    '#F97316', // Orange
    '#84CC16', // Lime
    '#EC4899', // Pink
  ];
  
  // If we need more colors, generate them
  while (colors.length < count) {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 60 + Math.floor(Math.random() * 20);
    const lightness = 50 + Math.floor(Math.random() * 20);
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  
  return colors.slice(0, count);
}

/**
 * Calculate trend direction and percentage
 */
export function calculateTrends(data: number[]): {
  direction: 'up' | 'down' | 'stable';
  percentage: number;
} {
  if (data.length < 2) {
    return { direction: 'stable', percentage: 0 };
  }
  
  const recent = data[data.length - 1];
  const previous = data[data.length - 2];
  
  if (previous === 0) {
    return { direction: 'up', percentage: 100 };
  }
  
  const percentage = ((recent - previous) / previous) * 100;
  
  if (Math.abs(percentage) < 1) {
    return { direction: 'stable', percentage: 0 };
  }
  
  return {
    direction: percentage > 0 ? 'up' : 'down',
    percentage: Math.abs(percentage),
  };
}

/**
 * Aggregate data by grouping criteria
 */
export function aggregateData<T>(
  data: T[],
  groupBy: keyof T,
  aggregateField: keyof T
): Record<string, number> {
  return data.reduce((acc, item) => {
    const group = String(item[groupBy]);
    const value = Number(item[aggregateField]) || 0;
    
    acc[group] = (acc[group] || 0) + value;
    return acc;
  }, {} as Record<string, number>);
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle function for scroll/resize events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

/**
 * Generate unique ID for components
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Validate date format
 */
export function isValidDate(date: any): boolean {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
}

/**
 * Validate number with range checks
 */
export function isValidNumber(
  value: any,
  min?: number,
  max?: number
): boolean {
  const num = Number(value);
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
}

/**
 * Validate filter values
 */
export function validateFilters(filters: any): boolean {
  // Add validation logic based on your filter structure
  return true;
}

/**
 * Get status color for campaign status
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'text-success-600 bg-success-50';
    case 'paused':
      return 'text-warning-600 bg-warning-50';
    case 'completed':
      return 'text-primary-600 bg-primary-50';
    case 'draft':
      return 'text-text-secondary bg-gray-50';
    default:
      return 'text-text-secondary bg-gray-50';
  }
}

/**
 * Get trend icon based on change value
 */
export function getTrendIcon(change: number): string {
  if (change > 0) return 'TrendingUp';
  if (change < 0) return 'TrendingDown';
  return 'Minus';
}

/**
 * Get trend color based on change value
 */
export function getTrendColor(change: number): string {
  if (change > 0) return 'text-success-600';
  if (change < 0) return 'text-error-600';
  return 'text-text-secondary';
} 