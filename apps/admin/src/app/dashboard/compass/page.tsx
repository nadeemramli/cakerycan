"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CompassPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Business Compass</h1>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Goals Tracking</CardTitle>
            </CardHeader>
            <CardContent>{/* Add goals tracking content here */}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add performance metrics content here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
