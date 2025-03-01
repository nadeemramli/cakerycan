"use client";

import { useState } from "react";
import { DeliveryPlanner } from "@/components/orders/delivery-planner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DeliveryPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Delivery Management</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Export Schedule</Button>
            <Button>Optimize Routes</Button>
          </div>
        </div>

        <Tabs defaultValue="management" className="space-y-4">
          <TabsList>
            <TabsTrigger value="management">Delivery Management</TabsTrigger>
            <TabsTrigger value="planning">Route Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="management" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Today's Deliveries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Assigned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">75% of total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    50% completion rate
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Delivery Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45m</div>
                  <p className="text-xs text-muted-foreground">
                    -5m from average
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Add delivery management table here */}
          </TabsContent>

          <TabsContent value="planning" className="space-y-4">
            <DeliveryPlanner />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
