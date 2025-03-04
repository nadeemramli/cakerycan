"use client";

import { useCallback, useEffect, useState } from "react";
import { CustomChart, DashboardPreferences, MetricData, MetricDefinition } from "@/types/dashboard";
import { format } from "date-fns";

const defaultPreferences: DashboardPreferences = {
  selectedMetrics: ["total_revenue", "active_orders", "inventory_status"],
  showComparisons: true,
  timeframe: "7d",
  customCharts: [],
};

// Mock data generation for metrics history
const generateHistoryData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: format(new Date(Date.now() - (days - 1 - i) * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
    value: Math.floor(Math.random() * 1000),
  }));
};

// Mock data fetching function
const fetchMetricData = async (): Promise<Record<string, MetricData>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    total_revenue: {
      current: 25000,
      previous: 22000,
      change: 13.6,
      history: generateHistoryData(30),
    },
    active_orders: {
      current: 45,
      previous: 38,
      change: 18.4,
      history: generateHistoryData(30),
    },
    inventory_status: {
      current: 85,
      previous: 92,
      change: -7.6,
      history: generateHistoryData(30),
    },
    new_customers: {
      current: 12,
      previous: 8,
      change: 50,
      history: generateHistoryData(30),
    },
    repeat_customers: {
      current: 33,
      previous: 30,
      change: 10,
      history: generateHistoryData(30),
    },
    expenses: {
      current: 15000,
      previous: 14000,
      change: 7.1,
      history: generateHistoryData(30),
    },
  };
};

export const metricDefinitions: Record<string, MetricDefinition> = {
  total_revenue: {
    id: "total_revenue",
    label: "Total Revenue",
    description: "Total revenue generated in the selected period",
    format: "currency",
    category: "financial",
    visualizationType: ["number", "chart"],
  },
  active_orders: {
    id: "active_orders",
    label: "Active Orders",
    description: "Number of orders currently being processed",
    format: "number",
    category: "operations",
    visualizationType: ["number", "chart"],
  },
  inventory_status: {
    id: "inventory_status",
    label: "Inventory Status",
    description: "Current inventory level as a percentage",
    format: "percentage",
    category: "operations",
    visualizationType: ["number", "chart"],
  },
  new_customers: {
    id: "new_customers",
    label: "New Customers",
    description: "Number of first-time customers",
    format: "number",
    category: "customers",
    visualizationType: ["number", "chart"],
  },
  repeat_customers: {
    id: "repeat_customers",
    label: "Repeat Customers",
    description: "Number of returning customers",
    format: "number",
    category: "customers",
    visualizationType: ["number", "chart"],
  },
  expenses: {
    id: "expenses",
    label: "Expenses",
    description: "Total expenses in the selected period",
    format: "currency",
    category: "financial",
    visualizationType: ["number", "chart"],
  },
};

export const useDashboard = () => {
  const [preferences, setPreferences] = useState<DashboardPreferences>(defaultPreferences);
  const [metrics, setMetrics] = useState<Record<string, MetricData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      try {
        const data = await fetchMetricData();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  const handlePreferencesChange = useCallback((newPreferences: Partial<DashboardPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  }, []);

  const handleAddCustomChart = useCallback((chart: CustomChart) => {
    setPreferences((prev) => ({
      ...prev,
      customCharts: [...prev.customCharts, chart],
    }));
  }, []);

  const handleRemoveCustomChart = useCallback((chartId: string) => {
    setPreferences((prev) => ({
      ...prev,
      customCharts: prev.customCharts.filter((chart) => chart.id !== chartId),
    }));
  }, []);

  return {
    preferences,
    metrics,
    loading,
    onPreferencesChange: handlePreferencesChange,
    onAddCustomChart: handleAddCustomChart,
    onRemoveCustomChart: handleRemoveCustomChart,
  };
}; 