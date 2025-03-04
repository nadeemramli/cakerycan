"use client";

import { PageContainer } from "@/components/layout/page-container";
import { MetricGrid } from "@/components/dashboard/metric-grid";
import { ChartBuilder } from "@/components/dashboard/chart-builder";
import { CustomChartComponent } from "@/components/dashboard/custom-chart";
import { useDashboard } from "@/hooks/use-dashboard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DashboardPage() {
  const {
    metrics,
    preferences,
    loading,
    onPreferencesChange,
    onAddCustomChart,
    onRemoveCustomChart,
  } = useDashboard();
  const [showChartBuilder, setShowChartBuilder] = useState(false);

  return (
    <PageContainer
      title="Dashboard"
      actions={
        <Button onClick={() => setShowChartBuilder(true)}>
          Create Custom Chart
        </Button>
      }
    >
      <div className="space-y-8">
        <MetricGrid
          metrics={metrics || {}}
          preferences={preferences}
          isLoading={loading}
          onPreferencesChange={onPreferencesChange}
        />

        {preferences.customCharts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {preferences.customCharts.map((chart) => (
              <CustomChartComponent
                key={chart.id}
                chart={chart}
                data={metrics || {}}
                onRemove={() => onRemoveCustomChart(chart.id)}
              />
            ))}
          </div>
        )}

        <ChartBuilder
          open={showChartBuilder}
          onOpenChange={setShowChartBuilder}
          onSave={onAddCustomChart}
        />
      </div>
    </PageContainer>
  );
}
