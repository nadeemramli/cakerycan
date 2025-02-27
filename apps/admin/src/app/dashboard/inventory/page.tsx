"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoryManager } from "@/components/products/inventory-manager";
import { toast } from "sonner";

export default function InventoryPage() {
  const handleAddStock = (id: string, quantity: number) => {
    toast.success(`Added ${quantity} units to stock`);
  };

  const handleUpdateThreshold = (id: string, threshold: number) => {
    toast.success("Stock threshold updated successfully");
  };

  const handleReorder = (id: string) => {
    toast.success("Reorder request sent to supplier");
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Inventory Management
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Stock Management</CardTitle>
        </CardHeader>
        <CardContent>
          <InventoryManager
            onAddStock={handleAddStock}
            onUpdateThreshold={handleUpdateThreshold}
            onReorder={handleReorder}
          />
        </CardContent>
      </Card>
    </div>
  );
}
