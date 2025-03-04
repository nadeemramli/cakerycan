export type TimeFrame = "24h" | "7d" | "30d" | "90d" | "1y";

export type MetricCategory = "financial" | "operations" | "customers" | "marketing";

export type MetricFormat = "number" | "currency" | "percentage" | "text";

export type VisualizationType = "number" | "chart" | "list";

export interface MetricDefinition {
  id: string;
  label: string;
  description: string;
  format: MetricFormat;
  category: MetricCategory;
  visualizationType: VisualizationType[];
}

export interface MetricDataPoint {
  date: string;
  value: number;
  comparison?: number;
}

export interface MetricData {
  current: number;
  previous: number;
  change: number;
  history: MetricDataPoint[];
}

export type ChartType = "line" | "bar" | "area" | "pie";

export interface ChartConfig {
  type: ChartType;
  metrics: string[];
  title: string;
  description?: string;
  timeframe: TimeFrame;
  showComparison: boolean;
  stacked?: boolean;
  colors?: string[];
}

export interface CustomChart extends ChartConfig {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardPreferences {
  selectedMetrics: string[];
  showComparisons: boolean;
  timeframe: TimeFrame;
  customCharts: CustomChart[];
}

export interface DashboardState extends DashboardPreferences {
  metrics: Record<string, MetricData>;
  isLoading: boolean;
  error?: string;
}

// Available metrics configuration
export const AVAILABLE_METRICS: Record<string, MetricDefinition> = {
  totalRevenue: {
    id: 'totalRevenue',
    label: 'Total Revenue',
    category: 'financial',
    description: 'Total revenue generated in the selected time period',
    format: 'currency',
    visualizationType: ['number'],
  },
  activeOrders: {
    id: 'activeOrders',
    label: 'Active Orders',
    category: 'operations',
    description: 'Number of orders currently being processed',
    format: 'number',
    visualizationType: ['number'],
  },
  inventoryStatus: {
    id: 'inventoryStatus',
    label: 'Inventory Status',
    category: 'operations',
    description: 'Current inventory levels and alerts',
    format: 'percentage',
    visualizationType: ['number'],
  },
  newCustomers: {
    id: 'newCustomers',
    label: 'New Customers',
    category: 'customers',
    description: 'Number of first-time customers',
    format: 'number',
    visualizationType: ['number'],
  },
  repeatCustomers: {
    id: 'repeatCustomers',
    label: 'Repeat Customers',
    category: 'customers',
    description: 'Number of returning customers',
    format: 'number',
    visualizationType: ['number'],
  },
  marketingExpenses: {
    id: 'marketingExpenses',
    label: 'Marketing Expenses',
    category: 'financial',
    description: 'Total marketing spend',
    format: 'currency',
    visualizationType: ['number'],
  },
  recentFeedback: {
    id: 'recentFeedback',
    label: 'Recent Feedback',
    category: 'marketing',
    description: 'Latest customer reviews and feedback',
    format: 'text',
    visualizationType: ['list'],
  },
}; 