/**
 * TypeScript definitions for ADmyBRAND Insights Dashboard
 */

/**
 * Metric card data structure for displaying key performance indicators
 */
export interface MetricCard {
  id: string;
  title: string;
  value: number;
  change: number; // Percentage change from previous period
  icon: string; // Lucide React icon name
  format: 'currency' | 'number' | 'percentage';
  description?: string;
}

/**
 * Line chart data for time-series visualization
 */
export interface LineChartData {
  date: string;
  revenue: number;
  visitors?: number;
  conversions?: number;
}

/**
 * Bar chart data for categorical comparisons
 */
export interface BarChartData {
  source: string;
  visitors: number;
  color: string;
  percentage?: number;
}

/**
 * Donut chart data for proportional distributions
 */
export interface DonutChartData {
  device: string;
  percentage: number;
  color: string;
  value?: number;
}

/**
 * Campaign performance data for the data table
 */
export interface CampaignData {
  id: string;
  name: string;
  clicks: number;
  conversions: number;
  cost: number;
  cpc: number; // Cost per click
  status: 'active' | 'paused' | 'completed' | 'draft';
  startDate: string;
  endDate?: string;
  conversionRate?: number;
  roi?: number;
}

/**
 * Dashboard filters for data filtering and date range selection
 */
export interface DashboardFilters {
  dateRange: {
    start: string;
    end: string;
  };
  campaignStatus?: ('active' | 'paused' | 'completed' | 'draft')[];
  trafficSource?: string[];
  searchQuery?: string;
}

/**
 * Chart component props interface
 */
export interface ChartProps {
  data: LineChartData[] | BarChartData[] | DonutChartData[];
  title?: string;
  loading?: boolean;
  error?: string;
  height?: number;
  width?: number;
  className?: string;
}

/**
 * Table component props interface
 */
export interface TableProps {
  data: CampaignData[];
  loading?: boolean;
  error?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  currentPage?: number;
  itemsPerPage?: number;
  onSort?: (column: string) => void;
  onPageChange?: (page: number) => void;
  onSearch?: (query: string) => void;
  className?: string;
}

/**
 * Component props with common properties
 */
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
  error?: string;
}

/**
 * Navigation item structure for sidebar
 */
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavigationItem[];
}

/**
 * User data structure
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'viewer';
}

/**
 * Notification data structure
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

/**
 * Dashboard summary data
 */
export interface DashboardSummary {
  metrics: MetricCard[];
  lineChartData: LineChartData[];
  barChartData: BarChartData[];
  donutChartData: DonutChartData[];
  campaigns: CampaignData[];
  lastUpdated: string;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Sort configuration
 */
export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc' | null;
}

/**
 * Filter configuration
 */
export interface FilterConfig {
  key: string;
  value: string | string[] | number | boolean;
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'in' | 'between';
}

/**
 * Chart tooltip data
 */
export interface ChartTooltip {
  active?: boolean;
  payload?: any[];
  label?: string;
  coordinate?: {
    x: number;
    y: number;
  };
}

/**
 * Export utility types
 */
export type MetricCardProps = Omit<MetricCard, 'id'> & ComponentProps;
export type LineChartProps = ChartProps & { data: LineChartData[] };
export type BarChartProps = ChartProps & { data: BarChartData[] };
export type DonutChartProps = ChartProps & { data: DonutChartData[] };
export type CampaignTableProps = TableProps & { data: CampaignData[] }; 