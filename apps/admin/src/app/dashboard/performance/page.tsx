"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PerformancePage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Marketing Performance</h1>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add marketing expenses content here */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add campaign analytics content here */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add content performance metrics here */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Influencer ROI</CardTitle>
            </CardHeader>
            <CardContent>{/* Add influencer ROI metrics here */}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
