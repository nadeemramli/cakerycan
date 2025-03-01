"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderDetailProps {
  orderId: string;
}

export function OrderDetail({ orderId }: OrderDetailProps) {
  const [status, setStatus] = useState("PAYMENT_PENDING");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Order #{orderId}</h2>
          <p className="text-gray-500">Created on March 1, 2024</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">Print Invoice</Button>
          <Button>Update Status</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <Label>Name</Label>
                <p>John Doe</p>
              </div>
              <div>
                <Label>Phone</Label>
                <p>+60 12-345-6789</p>
              </div>
              <div>
                <Label>Email</Label>
                <p>john@example.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <Label>Address</Label>
                <p>123 Main Street, Apartment 4B</p>
                <p>Kuala Lumpur, 50000</p>
              </div>
              <div>
                <Label>Delivery Date</Label>
                <p>March 3, 2024</p>
              </div>
              <div>
                <Label>Special Instructions</Label>
                <p>Please call upon arrival</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAYMENT_PENDING">
                    Payment Pending
                  </SelectItem>
                  <SelectItem value="PAYMENT_CONFIRMED">
                    Payment Confirmed
                  </SelectItem>
                  <SelectItem value="IN_PRODUCTION">In Production</SelectItem>
                  <SelectItem value="IN_DELIVERY">In Delivery</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="FOLLOW_UP">Follow Up</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>

              <div>
                <Label>Last Updated</Label>
                <p>March 1, 2024 14:30</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="py-2">Item</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Price</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">Chocolate Cake</td>
                <td className="py-2">1</td>
                <td className="py-2">RM 120.00</td>
                <td className="py-2">RM 120.00</td>
              </tr>
              <tr>
                <td className="py-2">Cupcakes (Box of 6)</td>
                <td className="py-2">2</td>
                <td className="py-2">RM 36.00</td>
                <td className="py-2">RM 72.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t">
                <td colSpan={3} className="py-2 font-bold">
                  Total
                </td>
                <td className="py-2 font-bold">RM 192.00</td>
              </tr>
            </tfoot>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
              <div>
                <p className="font-medium">Order Created</p>
                <p className="text-sm text-gray-500">March 1, 2024 12:00</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
              <div>
                <p className="font-medium">Payment Confirmed</p>
                <p className="text-sm text-gray-500">March 1, 2024 12:05</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500" />
              <div>
                <p className="font-medium">In Production</p>
                <p className="text-sm text-gray-500">March 1, 2024 14:30</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
