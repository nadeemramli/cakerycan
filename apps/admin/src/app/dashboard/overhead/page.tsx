"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverheadPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Operational Costs</h1>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Fixed Costs</CardTitle>
            </CardHeader>
            <CardContent>{/* Add fixed costs content here */}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variable Costs</CardTitle>
            </CardHeader>
            <CardContent>{/* Add variable costs content here */}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Utilities & Rent</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add utilities and rent content here */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Labor Costs</CardTitle>
            </CardHeader>
            <CardContent>{/* Add labor costs content here */}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
