"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-container";
import { PerformanceMetrics } from "@/components/compass/performance-metrics";
import { VarianceAnalysis } from "@/components/compass/variance-analysis";
import { ForecastComparison } from "@/components/compass/forecast-comparison";
import { ActionRecommendations } from "@/components/compass/action-recommendations";

export default function CompassPage() {
  return (
    <PageContainer title="Business Compass">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* Performance Metrics */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceMetrics />
          </CardContent>
        </Card>

        {/* Variance Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Variance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <VarianceAnalysis />
          </CardContent>
        </Card>

        {/* Forecast vs Actual */}
        <Card>
          <CardHeader>
            <CardTitle>Forecast Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ForecastComparison />
          </CardContent>
        </Card>

        {/* Action Recommendations */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ActionRecommendations />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
