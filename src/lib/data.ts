import { 
  MetricCard, 
  LineChartData, 
  BarChartData, 
  DonutChartData, 
  CampaignData 
} from '@/types/dashboard';

/**
 * Simulate API delay and potential errors
 */
async function simulateApiCall<T>(data: T, shouldFail: boolean = false, delay: number = 500): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to fetch data from server. Please try again later.'));
      } else {
        resolve(data);
      }
    }, delay);
  });
}

/**
 * Simulate network error
 */
export async function simulateNetworkError(): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Network connection failed. Please check your internet connection and try again.'));
    }, 1000);
  });
}

/**
 * Simulate server error
 */
export async function simulateServerError(): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Server is temporarily unavailable. Please try again in a few minutes.'));
    }, 1000);
  });
}

/**
 * Simulate data corruption error
 */
export async function simulateDataError(): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Unable to load dashboard data. The data format is invalid or corrupted.'));
    }, 1000);
  });
}

/**
 * Generate realistic metrics data for the dashboard
 */
export function generateMetricsData(): MetricCard[] {
  return [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: 45670,
      change: 12.5,
      icon: 'DollarSign',
      format: 'currency',
      description: 'Total revenue from all campaigns'
    },
    {
      id: 'users',
      title: 'Active Users',
      value: 12450,
      change: -2.3,
      icon: 'Users',
      format: 'number',
      description: 'Number of active users this month'
    },
    {
      id: 'conversions',
      title: 'Conversions',
      value: 1205,
      change: 8.7,
      icon: 'Target',
      format: 'number',
      description: 'Total conversions achieved'
    },
    {
      id: 'growth',
      title: 'Growth Rate',
      value: 15.8,
      change: 3.2,
      icon: 'TrendingUp',
      format: 'percentage',
      description: 'Overall growth percentage'
    }
  ];
}

/**
 * Async version of metrics data with error handling
 */
export async function fetchMetricsData(shouldFail: boolean = false): Promise<MetricCard[]> {
  const data = generateMetricsData();
  return simulateApiCall(data, shouldFail);
}

/**
 * Generate 30 days of revenue data for line chart
 */
export function generateLineChartData(): LineChartData[] {
  const data: LineChartData[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate realistic revenue data with some variation
    const baseRevenue = 1200;
    const variation = Math.random() * 800 - 400; // ±400 variation
    const seasonalFactor = 1 + Math.sin((i / 29) * Math.PI * 2) * 0.2; // Weekly pattern
    const revenue = Math.max(500, Math.round(baseRevenue * seasonalFactor + variation));
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: revenue,
      visitors: Math.round(revenue * (0.8 + Math.random() * 0.4)), // Related visitor data
      conversions: Math.round(revenue * (0.05 + Math.random() * 0.03)) // Related conversion data
    });
  }
  
  return data;
}

/**
 * Async version of line chart data with error handling
 */
export async function fetchLineChartData(shouldFail: boolean = false): Promise<LineChartData[]> {
  const data = generateLineChartData();
  return simulateApiCall(data, shouldFail);
}

/**
 * Generate traffic sources data for bar chart
 */
export function generateBarChartData(): BarChartData[] {
  const sources = [
    { name: 'Google Ads', visitors: 4500, color: '#3B82F6' },
    { name: 'Facebook', visitors: 3200, color: '#6366F1' },
    { name: 'Direct Traffic', visitors: 2800, color: '#10B981' },
    { name: 'Organic Search', visitors: 2100, color: '#F59E0B' },
    { name: 'Email Marketing', visitors: 1800, color: '#EF4444' },
    { name: 'Social Media', visitors: 1200, color: '#8B5CF6' }
  ];
  
  const totalVisitors = sources.reduce((sum, source) => sum + source.visitors, 0);
  
  return sources.map(source => ({
    source: source.name,
    visitors: source.visitors,
    color: source.color,
    percentage: Math.round((source.visitors / totalVisitors) * 100)
  }));
}

/**
 * Async version of bar chart data with error handling
 */
export async function fetchBarChartData(shouldFail: boolean = false): Promise<BarChartData[]> {
  const data = generateBarChartData();
  return simulateApiCall(data, shouldFail);
}

/**
 * Generate device distribution data for donut chart
 */
export function generateDonutChartData(): DonutChartData[] {
  return [
    {
      device: 'Desktop',
      percentage: 45,
      color: '#3B82F6',
      value: 5600
    },
    {
      device: 'Mobile',
      percentage: 35,
      color: '#10B981',
      value: 4350
    },
    {
      device: 'Tablet',
      percentage: 15,
      color: '#F59E0B',
      value: 1875
    },
    {
      device: 'Other',
      percentage: 5,
      color: '#EF4444',
      value: 625
    }
  ];
}

/**
 * Async version of donut chart data with error handling
 */
export async function fetchDonutChartData(shouldFail: boolean = false): Promise<DonutChartData[]> {
  const data = generateDonutChartData();
  return simulateApiCall(data, shouldFail);
}

/**
 * Generate realistic campaign data
 */
export function generateCampaignData(): CampaignData[] {
  const campaignNames = [
    'Summer Sale 2024',
    'Brand Awareness Q4',
    'Holiday Special',
    'Product Launch',
    'Retargeting Campaign',
    'New Customer Acquisition',
    'Seasonal Promotion',
    'Social Media Boost',
    'Email Newsletter',
    'Influencer Partnership',
    'Black Friday Sale',
    'Cyber Monday Deals',
    'Spring Collection',
    'Back to School',
    'Valentine\'s Day Special',
    'Easter Promotion',
    'Mother\'s Day Campaign',
    'Father\'s Day Special',
    'Independence Day Sale',
    'Labor Day Weekend',
    'Halloween Spooky Deals',
    'Thanksgiving Special',
    'Christmas Countdown',
    'New Year Resolution',
    'Winter Clearance'
  ];
  
  const statuses: ('active' | 'paused' | 'completed' | 'draft')[] = ['active', 'paused', 'completed', 'draft'];
  
  return campaignNames.map((name, index) => {
    const clicks = Math.floor(Math.random() * 4900) + 100; // 100-5000 clicks
    const conversions = Math.floor(Math.random() * 490) + 10; // 10-500 conversions
    const cost = Math.floor(Math.random() * 1450) + 50; // $50-$1500 cost
    const cpc = cost / clicks; // Calculate CPC
    
    // Calculate conversion rate
    const conversionRate = (conversions / clicks) * 100;
    
    // Calculate ROI (assuming average order value of $100)
    const revenue = conversions * 100;
    const roi = ((revenue - cost) / cost) * 100;
    
    // Generate realistic dates
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 90)); // Random date within last 90 days
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 30) + 7); // 7-37 days duration
    
    return {
      id: `campaign-${index + 1}`,
      name: name,
      clicks: clicks,
      conversions: conversions,
      cost: cost,
      cpc: Math.round(cpc * 100) / 100, // Round to 2 decimal places
      status: statuses[Math.floor(Math.random() * statuses.length)],
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      conversionRate: Math.round(conversionRate * 10) / 10, // Round to 1 decimal place
      roi: Math.round(roi * 10) / 10 // Round to 1 decimal place
    };
  });
}

/**
 * Async version of campaign data with error handling
 */
export async function fetchCampaignData(shouldFail: boolean = false): Promise<CampaignData[]> {
  const data = generateCampaignData();
  return simulateApiCall(data, shouldFail);
}

/**
 * Generate complete dashboard data
 */
export function generateDashboardData() {
  return {
    metrics: generateMetricsData(),
    lineChartData: generateLineChartData(),
    barChartData: generateBarChartData(),
    donutChartData: generateDonutChartData(),
    campaigns: generateCampaignData(),
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Async version of complete dashboard data with error handling
 */
export async function fetchDashboardData(shouldFail: boolean = false) {
  const data = generateDashboardData();
  return simulateApiCall(data, shouldFail);
}

/**
 * Generate random data for real-time updates simulation
 */
export function generateRandomData() {
  return {
    revenue: Math.floor(Math.random() * 2000) + 500,
    users: Math.floor(Math.random() * 1000) + 500,
    conversions: Math.floor(Math.random() * 100) + 10,
    growth: (Math.random() * 20 - 10).toFixed(1) // -10 to +10
  };
}

/**
 * Generate sample user data
 */
export function generateUserData() {
  return {
    id: 'user-1',
    name: 'John Smith',
    email: 'john.smith@admybrand.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'admin' as const
  };
}

/**
 * Generate sample notifications
 */
export function generateNotifications() {
  return [
    {
      id: 'notif-1',
      title: 'Campaign Performance Alert',
      message: 'Your "Summer Sale 2024" campaign is performing above average!',
      type: 'success' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: false
    },
    {
      id: 'notif-2',
      title: 'Budget Warning',
      message: 'Campaign "Brand Awareness Q4" is approaching its daily budget limit.',
      type: 'warning' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      read: true
    },
    {
      id: 'notif-3',
      title: 'New Feature Available',
      message: 'Advanced analytics dashboard is now available for all users.',
      type: 'info' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      read: true
    }
  ];
} 