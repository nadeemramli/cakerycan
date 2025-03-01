"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define order status types
type OrderStatus =
  | "PAYMENT_PENDING"
  | "PAYMENT_CONFIRMED"
  | "IN_PRODUCTION"
  | "IN_DELIVERY"
  | "DELIVERED"
  | "FOLLOW_UP"
  | "COMPLETED";

interface Order {
  id: string;
  customerName: string;
  items: Array<{ name: string; quantity: number }>;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  deliveryDate?: Date;
}

interface OrderDashboardProps {
  onViewOrder: (orderId: string) => void;
}

export function OrderDashboard({ onViewOrder }: OrderDashboardProps) {
  const [activeTab, setActiveTab] = useState<OrderStatus>("PAYMENT_PENDING");

  // Status color mapping
  const statusColors: Record<OrderStatus, string> = {
    PAYMENT_PENDING: "bg-yellow-500",
    PAYMENT_CONFIRMED: "bg-blue-500",
    IN_PRODUCTION: "bg-purple-500",
    IN_DELIVERY: "bg-orange-500",
    DELIVERED: "bg-green-500",
    FOLLOW_UP: "bg-pink-500",
    COMPLETED: "bg-gray-500",
  };

  // Mock data for demonstration
  const mockOrders: Order[] = [
    {
      id: "ORD-001",
      customerName: "John Doe",
      items: [{ name: "Chocolate Cake", quantity: 1 }],
      totalAmount: 120.0,
      status: "PAYMENT_PENDING",
      createdAt: new Date(),
      deliveryDate: new Date(Date.now() + 86400000), // Tomorrow
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      items: [{ name: "Cupcakes", quantity: 12 }],
      totalAmount: 72.0,
      status: "IN_PRODUCTION",
      createdAt: new Date(),
      deliveryDate: new Date(Date.now() + 86400000 * 2), // Day after tomorrow
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <div className="flex gap-4">
          <Card className="w-[200px]">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">
                Today's Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card className="w-[200px]">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">
                Pending Production
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
            </CardContent>
          </Card>
          <Card className="w-[200px]">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">In Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs
        defaultValue="PAYMENT_PENDING"
        className="w-full"
        onValueChange={(value) => setActiveTab(value as OrderStatus)}
      >
        <TabsList className="grid grid-cols-7 w-full">
          <TabsTrigger value="PAYMENT_PENDING">Payment Pending</TabsTrigger>
          <TabsTrigger value="PAYMENT_CONFIRMED">Confirmed</TabsTrigger>
          <TabsTrigger value="IN_PRODUCTION">In Production</TabsTrigger>
          <TabsTrigger value="IN_DELIVERY">In Delivery</TabsTrigger>
          <TabsTrigger value="DELIVERED">Delivered</TabsTrigger>
          <TabsTrigger value="FOLLOW_UP">Follow Up</TabsTrigger>
          <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
        </TabsList>

        {Object.keys(statusColors).map((status) => (
          <TabsContent key={status} value={status}>
            <Card>
              <CardHeader>
                <CardTitle>Orders - {status.replace("_", " ")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders
                      .filter((order) => order.status === status)
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>
                            {order.items
                              .map((item) => `${item.quantity}x ${item.name}`)
                              .join(", ")}
                          </TableCell>
                          <TableCell>
                            RM {order.totalAmount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            {order.createdAt.toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {order.deliveryDate?.toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={statusColors[order.status]}
                            >
                              {order.status.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onViewOrder(order.id)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
