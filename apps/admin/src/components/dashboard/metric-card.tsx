"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatValue } from "@/lib/utils";
import { MetricDefinition, MetricData } from "@/types/dashboard";
import { ArrowDownIcon, ArrowUpIcon, InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricCardProps {
  metric: MetricDefinition;
  data: MetricData & { loading?: boolean; error?: string };
  className?: string;
}

export function MetricCard({ metric, data, className }: MetricCardProps) {
  const { label, description, visualizationType, format } = metric;
  const { current, previous, change } = data;

  const renderValue = () => {
    if (data.loading) {
      return <Skeleton className="h-9 w-[100px]" />;
    }

    if (data.error) {
      return <span className="text-destructive">Error loading data</span>;
    }

    switch (visualizationType[0]) {
      case "number":
        return (
          <div className="space-y-1">
            <p className="text-2xl font-bold">{formatValue(current, format)}</p>
            <div className="flex items-center space-x-2">
              <span
                className={cn(
                  "text-sm",
                  change >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                <span className="inline-flex items-center">
                  {change >= 0 ? (
                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="mr-1 h-4 w-4" />
                  )}
                  {Math.abs(change)}%
                </span>
              </span>
              <span className="text-sm text-muted-foreground">
                vs previous period
              </span>
            </div>
          </div>
        );

      case "chart":
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{formatValue(current, format)}</span>
              <span className="text-muted-foreground">
                {change >= 0 ? "+" : ""}
                {change}%
              </span>
            </div>
            <Progress value={50 + change / 2} />
          </div>
        );

      case "list":
        if (Array.isArray(current)) {
          return (
            <div className="space-y-2">
              {current.map((item, index) => (
                <div key={index} className="text-sm">
                  {item}
                </div>
              ))}
            </div>
          );
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>{renderValue()}</CardContent>
    </Card>
  );
}
