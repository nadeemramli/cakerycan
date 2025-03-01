"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data
const revenueData = [
  { month: "Jan", revenue: 24500, redemptions: 450 },
  { month: "Feb", revenue: 28900, redemptions: 520 },
  { month: "Mar", revenue: 32400, redemptions: 580 },
  { month: "Apr", revenue: 35700, redemptions: 620 },
  { month: "May", revenue: 38200, redemptions: 670 },
  { month: "Jun", revenue: 42100, redemptions: 720 },
];

const campaignPerformance = [
  { name: "New Year Special", redemptions: 145, revenue: 12450 },
  { name: "Valentine's Day", redemptions: 230, revenue: 18500 },
  { name: "Easter Bundle", redemptions: 180, revenue: 15200 },
  { name: "Mother's Day", redemptions: 290, revenue: 24600 },
];

const loyaltyDistribution = [
  { name: "Bronze", value: 1250, color: "#B87C4C" },
  { name: "Silver", value: 750, color: "#A7A7AD" },
  { name: "Gold", value: 450, color: "#FFD700" },
];

export function PromotionCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Revenue & Redemptions Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  name="Revenue (RM)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="redemptions"
                  stroke="#82ca9d"
                  name="Redemptions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={campaignPerformance}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="redemptions" fill="#8884d8" name="Redemptions" />
                <Bar dataKey="revenue" fill="#82ca9d" name="Revenue (RM)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Loyalty Tier Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={loyaltyDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {loyaltyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
