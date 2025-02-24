"use client";

import { useState } from "react";
import { Plus, Minus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  lowStockThreshold: number;
  costPerUnit: number;
  supplier: string;
  leadTime: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "All-Purpose Flour",
    currentStock: 25,
    unit: "kg",
    lowStockThreshold: 10,
    costPerUnit: 2.5,
    supplier: "Baking Supplies Co.",
    leadTime: "3-5 days",
  },
  // Add more mock inventory items as needed
];

export default function InventoryManager() {
  const [inventory] = useState<InventoryItem[]>(mockInventory);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({});

  const handleAddItem = () => {
    // TODO: Implement add functionality
    console.log("Add item:", newItem);
    setShowAddDialog(false);
  };

  const handleStockAdjustment = (id: string, adjustment: number) => {
    // TODO: Implement stock adjustment
    console.log("Adjust stock:", id, adjustment);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Inventory Items</h2>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={newItem.name || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    value={newItem.currentStock || ""}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        currentStock: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={newItem.unit || ""}
                    onChange={(e) =>
                      setNewItem({ ...newItem, unit: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                  <Input
                    id="lowStockThreshold"
                    type="number"
                    value={newItem.lowStockThreshold || ""}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        lowStockThreshold: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="costPerUnit">Cost per Unit</Label>
                  <Input
                    id="costPerUnit"
                    type="number"
                    step="0.01"
                    value={newItem.costPerUnit || ""}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        costPerUnit: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={newItem.supplier || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, supplier: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="leadTime">Lead Time</Label>
                <Input
                  id="leadTime"
                  value={newItem.leadTime || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, leadTime: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleAddItem} className="w-full">
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Current Stock</TableHead>
            <TableHead className="text-right">Low Stock Threshold</TableHead>
            <TableHead className="text-right">Cost per Unit</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Lead Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.currentStock <= item.lowStockThreshold && (
                  <AlertTriangle className="h-4 w-4 text-yellow-500 inline mr-2" />
                )}
                {item.name}
              </TableCell>
              <TableCell className="text-right">
                {item.currentStock} {item.unit}
              </TableCell>
              <TableCell className="text-right">
                {item.lowStockThreshold} {item.unit}
              </TableCell>
              <TableCell className="text-right">
                ${item.costPerUnit.toFixed(2)}
              </TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell>{item.leadTime}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleStockAdjustment(item.id, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleStockAdjustment(item.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
