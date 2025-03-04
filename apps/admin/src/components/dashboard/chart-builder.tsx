"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  AVAILABLE_METRICS,
  ChartConfig,
  ChartType,
  CustomChart,
  TimeFrame,
} from "@/types/dashboard";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { metricDefinitions } from "@/hooks/use-dashboard";

interface ChartBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (chart: CustomChart) => void;
  className?: string;
}

const CHART_TYPES: ChartType[] = ["line", "bar", "area", "pie"];
const TIME_FRAMES: { value: TimeFrame; label: string }[] = [
  { value: "24h", label: "Last 24 Hours" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "1y", label: "Last Year" },
];

export function ChartBuilder({
  open,
  onOpenChange,
  onSave,
  className,
}: ChartBuilderProps) {
  const [chartName, setChartName] = useState("");
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    type: "line" as ChartType,
    metrics: [],
    title: "",
    timeframe: "7d" as TimeFrame,
    showComparison: false,
    stacked: false,
  });

  const handleSave = () => {
    if (!chartName || !chartConfig.title || chartConfig.metrics.length === 0) {
      return;
    }

    const chart: CustomChart = {
      id: crypto.randomUUID(),
      name: chartName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...chartConfig,
    };

    onSave(chart);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setChartName("");
    setChartConfig({
      type: "line",
      metrics: [],
      title: "",
      timeframe: "7d",
      showComparison: false,
      stacked: false,
    });
  };

  const handleMetricToggle = (metricId: string) => {
    setChartConfig((prev) => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter((id) => id !== metricId)
        : [...prev.metrics, metricId],
    }));
  };

  const availableMetrics = Object.values(AVAILABLE_METRICS).filter((metric) =>
    metric.visualizationType.includes("number")
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn("gap-2", className)}
          onClick={() => onOpenChange(true)}
        >
          <PlusIcon className="h-4 w-4" />
          Create Custom Chart
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Custom Chart</DialogTitle>
          <DialogDescription>
            Build a custom chart by selecting metrics and visualization options.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="chart-name">Chart Name</Label>
            <Input
              id="chart-name"
              value={chartName}
              onChange={(e) => setChartName(e.target.value)}
              placeholder="My Custom Chart"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="display-title">Display Title</Label>
            <Input
              id="display-title"
              value={chartConfig.title}
              onChange={(e) =>
                setChartConfig((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Revenue Over Time"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="chart-type">Chart Type</Label>
            <Select
              value={chartConfig.type}
              onValueChange={(value: ChartType) =>
                setChartConfig((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger id="chart-type">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                {CHART_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="time-period">Time Period</Label>
            <Select
              value={chartConfig.timeframe}
              onValueChange={(value: TimeFrame) =>
                setChartConfig((prev) => ({ ...prev, timeframe: value }))
              }
            >
              <SelectTrigger id="time-period">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                {TIME_FRAMES.map((frame) => (
                  <SelectItem key={frame.value} value={frame.value}>
                    {frame.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Metrics</Label>
            <div className="grid gap-2">
              {Object.entries(metricDefinitions)
                .filter(([_, def]) => def.visualizationType.includes("chart"))
                .map(([id, def]) => (
                  <div key={id} className="flex items-center gap-2">
                    <Switch
                      id={`metric-${id}`}
                      checked={chartConfig.metrics.includes(id)}
                      onCheckedChange={() => handleMetricToggle(id)}
                    />
                    <Label htmlFor={`metric-${id}`}>{def.label}</Label>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="show-comparison"
                checked={chartConfig.showComparison}
                onCheckedChange={(checked) =>
                  setChartConfig((prev) => ({
                    ...prev,
                    showComparison: checked,
                  }))
                }
              />
              <Label htmlFor="show-comparison">Show Comparison</Label>
            </div>

            {chartConfig.type !== "pie" && (
              <div className="flex items-center gap-2">
                <Switch
                  id="stacked"
                  checked={chartConfig.stacked}
                  onCheckedChange={(checked) =>
                    setChartConfig((prev) => ({ ...prev, stacked: checked }))
                  }
                />
                <Label htmlFor="stacked">Stacked</Label>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Create Chart</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
