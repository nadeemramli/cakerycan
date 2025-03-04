"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomChart, MetricData } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { metricDefinitions } from "@/hooks/use-dashboard";
import { formatValue } from "@/lib/utils";
import { ReactElement } from "react";

interface CustomChartProps {
  chart: CustomChart;
  data: Record<string, MetricData>;
  onRemove: () => void;
}

interface ChartDataPoint {
  date: string;
  [key: string]: number | string;
}

const DEFAULT_COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#ca8a04",
  "#9333ea",
  "#0891b2",
  "#be185d",
  "#ea580c",
];

export function CustomChartComponent({
  chart,
  data,
  onRemove,
}: CustomChartProps) {
  const processData = () => {
    const dates = new Set<string>();
    const metricValues: Record<string, Record<string, number>> = {};

    // Collect all dates and metric values
    chart.metrics.forEach((metricId) => {
      const metricData = data[metricId];
      if (!metricData) return;

      metricData.history.forEach(({ date, value, comparison }) => {
        dates.add(date);
        if (!metricValues[date]) {
          metricValues[date] = {};
        }
        metricValues[date][metricId] = value;
        if (chart.showComparison && comparison !== undefined) {
          metricValues[date][`${metricId}_comparison`] = comparison;
        }
      });
    });

    // Convert to array format for Recharts
    return Array.from(dates)
      .sort()
      .map((date) => ({
        date,
        ...metricValues[date],
      })) as ChartDataPoint[];
  };

  const renderChart = (): ReactElement | null => {
    const chartData = processData();
    const commonProps = {
      width: 500,
      height: 300,
      data: chartData,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    switch (chart.type) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {chart.metrics
              .map((metricId, index) => {
                const definition = metricDefinitions[metricId];
                if (!definition) return null;

                return (
                  <Line
                    key={metricId}
                    type="monotone"
                    dataKey={metricId}
                    name={definition.label}
                    stroke={
                      chart.colors?.[index] ||
                      DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                    }
                    strokeWidth={2}
                  />
                );
              })
              .filter(Boolean)}
          </LineChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {chart.metrics
              .map((metricId, index) => {
                const definition = metricDefinitions[metricId];
                if (!definition) return null;

                return (
                  <Bar
                    key={metricId}
                    dataKey={metricId}
                    name={definition.label}
                    fill={
                      chart.colors?.[index] ||
                      DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                    }
                    stackId={chart.stacked ? "stack" : undefined}
                  />
                );
              })
              .filter(Boolean)}
          </BarChart>
        );

      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {chart.metrics
              .map((metricId, index) => {
                const definition = metricDefinitions[metricId];
                if (!definition) return null;

                return (
                  <Area
                    key={metricId}
                    type="monotone"
                    dataKey={metricId}
                    name={definition.label}
                    fill={
                      chart.colors?.[index] ||
                      DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                    }
                    stroke={
                      chart.colors?.[index] ||
                      DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                    }
                    stackId={chart.stacked ? "stack" : undefined}
                    fillOpacity={0.3}
                  />
                );
              })
              .filter(Boolean)}
          </AreaChart>
        );

      case "pie":
        const latestData = chartData[chartData.length - 1];
        const pieData = chart.metrics
          .map((metricId) => {
            const definition = metricDefinitions[metricId];
            if (!definition || !latestData) return null;

            return {
              name: definition.label,
              value: latestData[metricId] as number,
            };
          })
          .filter(Boolean);

        return (
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    chart.colors?.[index] ||
                    DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );

      default:
        return null;
    }
  };

  const chart_element = renderChart();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{chart.title}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          onClick={onRemove}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          {chart_element || <div>No data available</div>}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
