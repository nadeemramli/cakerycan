"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Clock,
} from "lucide-react";

// Temporary mock data
const mockData = {
  timeRange: "This Month",
  revenue: {
    total: 45250.89,
    change: 12.5,
    trending: "up",
  },
  topProducts: [
    {
      name: "Chocolate Chip Cookies",
      revenue: 12500,
      orders: 250,
      profit: 35,
    },
    {
      name: "Vanilla Cake",
      revenue: 9800,
      orders: 120,
      profit: 42,
    },
    {
      name: "Red Velvet Cupcakes",
      revenue: 7500,
      orders: 180,
      profit: 38,
    },
  ],
  inventoryMetrics: {
    totalItems: 45,
    lowStock: 8,
    value: 12500,
    turnoverRate: 3.2,
  },
  productionMetrics: {
    efficiency: 87,
    wastage: 3.5,
    capacity: 92,
    avgProductionTime: 45,
  },
};

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <Select defaultValue="month">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockData.revenue.total.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {mockData.revenue.trending === "up" ? (
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span
                className={
                  mockData.revenue.trending === "up"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {mockData.revenue.change}%
              </span>
              <span className="ml-1">
                vs last {mockData.timeRange.toLowerCase()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Value
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockData.inventoryMetrics.value.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              {mockData.inventoryMetrics.totalItems} total items
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Production Efficiency
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.productionMetrics.efficiency}%
            </div>
            <div className="text-xs text-muted-foreground">
              {mockData.productionMetrics.wastage}% wastage rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Capacity Utilization
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.productionMetrics.capacity}%
            </div>
            <div className="text-xs text-muted-foreground">
              {mockData.productionMetrics.avgProductionTime} mins avg.
              production time
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Profit Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.topProducts.map((product) => (
                <TableRow key={product.name}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.revenue.toLocaleString()}</TableCell>
                  <TableCell>{product.orders}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${product.profit}%` }}
                        />
                      </div>
                      {product.profit}%
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Items
                </span>
                <span className="font-medium">
                  {mockData.inventoryMetrics.totalItems}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Low Stock Items
                </span>
                <span className="font-medium text-yellow-600">
                  {mockData.inventoryMetrics.lowStock}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Turnover Rate
                </span>
                <span className="font-medium">
                  {mockData.inventoryMetrics.turnoverRate}x per month
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Production Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Efficiency Rate
                </span>
                <span className="font-medium">
                  {mockData.productionMetrics.efficiency}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Wastage Rate
                </span>
                <span className="font-medium text-red-600">
                  {mockData.productionMetrics.wastage}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Capacity Utilization
                </span>
                <span className="font-medium">
                  {mockData.productionMetrics.capacity}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
