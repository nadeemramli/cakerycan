"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FinancePage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Finance Management</h1>
        </div>

        <Tabs defaultValue="capex" className="space-y-4">
          <TabsList>
            <TabsTrigger value="capex">CAPEX</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="interest">Interest</TabsTrigger>
            <TabsTrigger value="expansion">Expansion</TabsTrigger>
          </TabsList>

          <TabsContent value="capex" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Capital Expenditure Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add CAPEX tracking content here */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent CAPEX Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add recent CAPEX transactions here */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="loans" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Loans</CardTitle>
                </CardHeader>
                <CardContent>{/* Add active loans content here */}</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Loan Payment Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add loan payment schedule here */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="interest" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Interest Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add interest tracking content here */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Interest Analysis</CardTitle>
                </CardHeader>
                <CardContent>{/* Add interest analysis here */}</CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expansion" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Expansion Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add expansion projects content here */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Investment Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add investment planning content here */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
