"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface DataPoint {
  date: Date;
  actual: number;
  forecast: number;
}

type MetricType = "revenue" | "gross-margin" | "net-profit";

const generateMockData = (metric: MetricType): DataPoint[] => {
  const data: DataPoint[] = [];
  const today = new Date();

  // Adjust base values and variations based on metric type
  const getBaseValue = () => {
    switch (metric) {
      case "revenue":
        return 100000;
      case "gross-margin":
        return 35;
      case "net-profit":
        return 15;
      default:
        return 100000;
    }
  };

  const baseValue = getBaseValue();

  for (let i = 0; i < 12; i++) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - 11 + i);

    // Generate some mock data with seasonal variations
    const seasonalFactor = 1 + Math.sin((i / 12) * Math.PI * 2) * 0.2;
    const randomVariation = 0.9 + Math.random() * 0.2;

    data.push({
      date,
      actual:
        i < 9 ? Math.round(baseValue * seasonalFactor * randomVariation) : 0,
      forecast: Math.round(baseValue * seasonalFactor),
    });
  }

  return data;
};

const formatValue = (value: number, metric: MetricType): string => {
  switch (metric) {
    case "revenue":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case "gross-margin":
    case "net-profit":
      return `${value.toFixed(1)}%`;
    default:
      return value.toString();
  }
};

const metrics = [
  {
    label: "Revenue",
    value: "revenue" as MetricType,
    description: "Total revenue from all sales channels",
  },
  {
    label: "Gross Margin",
    value: "gross-margin" as MetricType,
    description: "Revenue minus cost of goods sold (COGS)",
  },
  {
    label: "Net Profit",
    value: "net-profit" as MetricType,
    description: "Total profit after all expenses and taxes",
  },
];

export function ForecastComparison() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("revenue");
  const data = generateMockData(selectedMetric);

  const handleMetricChange = (value: MetricType) => {
    setSelectedMetric(value);
  };

  const selectedMetricInfo = metrics.find((m) => m.value === selectedMetric);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Select value={selectedMetric} onValueChange={handleMetricChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            {metrics.map((metric) => (
              <SelectItem key={metric.value} value={metric.value}>
                {metric.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedMetricInfo && (
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{selectedMetricInfo.description}</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), "MMM yy")}
            />
            <YAxis
              tickFormatter={(value) => formatValue(value, selectedMetric)}
            />
            <Tooltip
              formatter={(value: number) => [
                formatValue(value, selectedMetric),
                selectedMetricInfo?.label,
              ]}
              labelFormatter={(date) => format(new Date(date), "MMMM yyyy")}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#9333ea"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Forecast"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
