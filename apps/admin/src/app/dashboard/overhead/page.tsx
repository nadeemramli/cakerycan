"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DateRangeSelector } from "@/components/ledger/date-range-selector";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Plus } from "lucide-react";

export default function OverheadPage() {
  const [primaryDateRange, setPrimaryDateRange] = useState<
    DateRange | undefined
  >({
    from: new Date(),
    to: undefined,
  });
  const [comparisonDateRange, setComparisonDateRange] = useState<
    DateRange | undefined
  >();
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Overhead Management</h1>
          <div className="flex items-center space-x-4">
            <DateRangeSelector
              primaryDateRange={primaryDateRange}
              setPrimaryDateRange={setPrimaryDateRange}
              comparisonDateRange={comparisonDateRange}
              setComparisonDateRange={setComparisonDateRange}
              showComparison={showComparison}
              setShowComparison={setShowComparison}
            />
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="utilities">Utilities</TabsTrigger>
            <TabsTrigger value="labor">Labor</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="rent">Rent & Facilities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Overhead
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">RM 12,450</div>
                  <p className="text-xs text-muted-foreground">
                    -5% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Labor Costs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">RM 5,230</div>
                  <p className="text-xs text-muted-foreground">42% of total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Utility Costs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">RM 2,845</div>
                  <p className="text-xs text-muted-foreground">23% of total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Other Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">RM 4,375</div>
                  <p className="text-xs text-muted-foreground">35% of total</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add expense breakdown chart component here */}
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Monthly Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add monthly trend chart component here */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="utilities" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Utility Usage Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add utility usage analysis component here */}
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Cost Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add utility cost distribution component here */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="labor" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Labor Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add labor hours component here */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Payroll Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add payroll analysis component here */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment Costs</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add equipment costs component here */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add maintenance schedule component here */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rent" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Facility Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add facility expenses component here */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Lease Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add lease overview component here */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
