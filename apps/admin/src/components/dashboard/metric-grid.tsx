"use client";

import { useState } from "react";
import { MetricCard } from "./metric-card";
import {
  AVAILABLE_METRICS,
  DashboardPreferences,
  MetricData,
} from "@/types/dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { metricDefinitions } from "@/hooks/use-dashboard";
import { formatValue } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricGridProps {
  metrics: Record<string, MetricData>;
  preferences: DashboardPreferences;
  onPreferencesChange: (preferences: DashboardPreferences) => void;
  isLoading?: boolean;
  className?: string;
}

export function MetricGrid({
  metrics,
  preferences,
  onPreferencesChange,
  isLoading,
  className,
}: MetricGridProps) {
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleTimeframeChange = (timeframe: string) => {
    onPreferencesChange({
      ...preferences,
      timeframe: timeframe as DashboardPreferences["timeframe"],
    });
  };

  const handleComparisonToggle = (showComparisons: boolean) => {
    onPreferencesChange({
      ...preferences,
      showComparisons,
    });
  };

  const handleMetricToggle = (metricId: string) => {
    const newSelectedMetrics = preferences.selectedMetrics.includes(metricId)
      ? preferences.selectedMetrics.filter((id) => id !== metricId)
      : [...preferences.selectedMetrics, metricId];

    onPreferencesChange({
      ...preferences,
      selectedMetrics: newSelectedMetrics,
    });
  };

  const renderCustomizationPanel = () => (
    <div className="mb-6 space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Customize Dashboard</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Time Period</Label>
          <Select
            value={preferences.timeframe}
            onValueChange={handleTimeframeChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Show Comparisons</Label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={preferences.showComparisons}
              onCheckedChange={handleComparisonToggle}
            />
            <span className="text-sm text-muted-foreground">
              Compare with previous period
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Visible Metrics</Label>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {Object.values(AVAILABLE_METRICS).map((metric) => (
            <div
              key={metric.id}
              className="flex items-center space-x-2 rounded border p-2"
            >
              <Switch
                checked={preferences.selectedMetrics.includes(metric.id)}
                onCheckedChange={() => handleMetricToggle(metric.id)}
              />
              <span className="text-sm">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Dashboard Overview</h2>
        <button
          onClick={() => setIsCustomizing(!isCustomizing)}
          className="text-sm text-primary hover:underline"
        >
          {isCustomizing ? "Done" : "Customize"}
        </button>
      </div>

      {isCustomizing && renderCustomizationPanel()}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {preferences.selectedMetrics.map((metricId) => {
          const definition = metricDefinitions[metricId];
          const data = metrics[metricId];

          if (!definition || !data) return null;

          return (
            <Card key={metricId}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {definition.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-[100px]" />
                ) : (
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {formatValue(data.current, definition.format)}
                    </div>
                    {preferences.showComparisons && (
                      <p
                        className={`text-xs ${
                          data.change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {data.change >= 0 ? "+" : ""}
                        {data.change.toFixed(1)}% from previous period
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
