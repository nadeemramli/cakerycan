"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LedgerPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Ledger Overview</h1>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Financial Status</CardTitle>
            </CardHeader>
            <CardContent>{/* Add financial status content here */}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historical Data</CardTitle>
            </CardHeader>
            <CardContent>{/* Add historical data content here */}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
