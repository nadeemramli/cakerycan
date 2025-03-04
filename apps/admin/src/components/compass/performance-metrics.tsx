"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  actual: number;
  forecast: number;
  format: (value: number) => string;
  unit?: string;
}

const MetricCard = ({
  title,
  actual,
  forecast,
  format,
  unit,
}: MetricCardProps) => {
  const variance = actual - forecast;
  const percentageVariance = (variance / forecast) * 100;
  const isPositive = variance >= 0;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">
                {format(actual)} {unit}
              </p>
              <p className="text-sm text-muted-foreground">
                vs {format(forecast)} {unit} forecast
              </p>
            </div>
            <div
              className={`flex items-center ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
              <span className="ml-1 text-sm font-medium">
                {Math.abs(percentageVariance).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};

const formatPercentage = (value: number) => {
  return value.toFixed(1);
};

export function PerformanceMetrics() {
  // TODO: Replace with actual data from API
  const metrics = [
    {
      title: "Revenue",
      actual: 125000,
      forecast: 150000,
      format: formatCurrency,
    },
    {
      title: "Orders",
      actual: 450,
      forecast: 400,
      format: formatNumber,
    },
    {
      title: "Contribution Margin",
      actual: 32,
      forecast: 35,
      format: formatPercentage,
      unit: "%",
    },
    {
      title: "Cash Balance",
      actual: 85000,
      forecast: 100000,
      format: formatCurrency,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
