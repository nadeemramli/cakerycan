"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface Metrics {
  revenue: {
    amount: number;
    percentage_change: number;
  };
  orders: {
    count: number;
    change: number;
  };
  lowStock: {
    count: number;
    items: Array<{
      id: string;
      name: string;
      current_stock: number;
      threshold: number;
    }>;
  };
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const [revenueData, ordersData, stockData] = await Promise.all([
          supabase.rpc("get_total_revenue"),
          supabase.rpc("get_active_orders"),
          supabase.rpc("get_low_stock_items"),
        ]);

        if (revenueData.error) throw revenueData.error;
        if (ordersData.error) throw ordersData.error;
        if (stockData.error) throw stockData.error;

        setMetrics({
          revenue: {
            amount: revenueData.data.amount || 0,
            percentage_change: revenueData.data.percentage_change || 0,
          },
          orders: {
            count: ordersData.data.count || 0,
            change: ordersData.data.change || 0,
          },
          lowStock: {
            count: stockData.data.count || 0,
            items: stockData.data.items || [],
          },
        });
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, [supabase]);

  if (loading) {
    return <div>Loading dashboard metrics...</div>;
  }

  if (!metrics) {
    return <div>No metrics available</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div
              className={`text-sm ${
                metrics.revenue.percentage_change >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metrics.revenue.percentage_change >= 0 ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.revenue.amount.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.revenue.percentage_change >= 0 ? "+" : ""}
              {metrics.revenue.percentage_change}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.orders.count}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.orders.change >= 0 ? "+" : ""}
              {metrics.orders.change} since yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.lowStock.count}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {metrics.lowStock.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {metrics.lowStock.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{item.name}</span>
                  <span className="text-red-500">
                    {item.current_stock} / {item.threshold}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
