"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignManager } from "@/components/promotions/campaign-manager";
import { LoyaltyProgram } from "@/components/promotions/loyalty-program";
import { PromotionCharts } from "@/components/promotions/promotion-charts";

export default function PromotionsPage() {
  const [campaignType, setCampaignType] = useState<"one-time" | "evergreen">(
    "one-time"
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Promotions</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Export Report</Button>
            <Button>Create Campaign</Button>
          </div>
        </div>

        <Tabs defaultValue="reports" className="space-y-4">
          <TabsList>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="campaign">Campaign</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Campaigns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    4 ending this week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">RM 24,500</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Redemption Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45%</div>
                  <p className="text-xs text-muted-foreground">
                    +5% from average
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Loyalty Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,450</div>
                  <p className="text-xs text-muted-foreground">
                    +150 this month
                  </p>
                </CardContent>
              </Card>
            </div>

            <PromotionCharts />
          </TabsContent>

          <TabsContent value="campaign" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Campaign Management</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={
                        campaignType === "one-time" ? "default" : "outline"
                      }
                      onClick={() => setCampaignType("one-time")}
                    >
                      One-time / Launch
                    </Button>
                    <Button
                      variant={
                        campaignType === "evergreen" ? "default" : "outline"
                      }
                      onClick={() => setCampaignType("evergreen")}
                    >
                      Evergreen
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CampaignManager type={campaignType} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Loyalty Program</CardTitle>
              </CardHeader>
              <CardContent>
                <LoyaltyProgram />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
