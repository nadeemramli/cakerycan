"use client";

import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";

interface VarianceItemProps {
  category: string;
  actual: number;
  forecast: number;
  impact: "high" | "medium" | "low";
  format: (value: number) => string;
  unit?: string;
}

const VarianceItem = ({
  category,
  actual,
  forecast,
  impact,
  format,
  unit = "",
}: VarianceItemProps) => {
  const variance = actual - forecast;
  const percentageVariance = (variance / forecast) * 100;
  const isPositive = variance >= 0;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-medium">{category}</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {format(actual)}
              {unit}
            </span>
            <span className="text-sm text-muted-foreground">vs</span>
            <span className="text-sm text-muted-foreground">
              {format(forecast)}
              {unit}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getImpactColor(
              impact
            )}`}
          >
            {impact}
          </span>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
      </div>
      <Progress value={50 + percentageVariance / 2} className="h-2" />
      <p className="text-sm text-muted-foreground">
        {Math.abs(percentageVariance).toFixed(1)}%{" "}
        {isPositive ? "above" : "below"} forecast
      </p>
    </div>
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

const formatPercentage = (value: number) => {
  return value.toFixed(1);
};

export function VarianceAnalysis() {
  // TODO: Replace with actual data from API
  const variances = [
    {
      category: "Gross Margin",
      actual: 42,
      forecast: 45,
      impact: "high",
      format: formatPercentage,
      unit: "%",
    },
    {
      category: "Operating Expenses",
      actual: 75000,
      forecast: 65000,
      impact: "medium",
      format: formatCurrency,
    },
    {
      category: "Net Profit Margin",
      actual: 15,
      forecast: 18,
      impact: "high",
      format: formatPercentage,
      unit: "%",
    },
  ] as const;

  const significantVariances = variances.filter((v) => v.impact === "high");

  return (
    <div className="space-y-6">
      {significantVariances.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Significant Variances Detected</AlertTitle>
          <AlertDescription>
            There are {significantVariances.length} metrics with significant
            variances that require attention.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {variances.map((variance) => (
          <VarianceItem key={variance.category} {...variance} />
        ))}
      </div>
    </div>
  );
}
