"use client";

import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, AlertTriangle, Plus } from "lucide-react";

// Temporary mock data
const mockInventory = [
  {
    id: "1",
    name: "All-purpose Flour",
    currentStock: 25,
    unit: "kg",
    lowStockThreshold: 10,
    lastRestocked: "2024-03-15",
    supplier: "Baker's Supply Co",
    reorderQuantity: 50,
  },
  {
    id: "2",
    name: "Granulated Sugar",
    currentStock: 8,
    unit: "kg",
    lowStockThreshold: 15,
    lastRestocked: "2024-03-10",
    supplier: "Sweet Ingredients Ltd",
    reorderQuantity: 25,
  },
  // Add more mock inventory items as needed
];

interface InventoryManagerProps {
  onAddStock: (id: string, quantity: number) => void;
  onUpdateThreshold: (id: string, threshold: number) => void;
  onReorder: (id: string) => void;
}

export function InventoryManager({
  onAddStock,
  onUpdateThreshold,
  onReorder,
}: InventoryManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const filteredInventory = mockInventory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSupplier =
      supplierFilter === "all" || item.supplier === supplierFilter;
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && item.currentStock <= item.lowStockThreshold);
    return matchesSearch && matchesSupplier && matchesStock;
  });

  const uniqueSuppliers = Array.from(
    new Set(mockInventory.map((item) => item.supplier))
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={supplierFilter} onValueChange={setSupplierFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by supplier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Suppliers</SelectItem>
            {uniqueSuppliers.map((supplier) => (
              <SelectItem key={supplier} value={supplier}>
                {supplier}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Stock level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock Levels</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Ingredient
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Low Stock Threshold</TableHead>
              <TableHead>Last Restocked</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {item.currentStock <= item.lowStockThreshold && (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                    {item.name}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={
                      item.currentStock <= item.lowStockThreshold
                        ? "text-yellow-600"
                        : ""
                    }
                  >
                    {item.currentStock} {item.unit}
                  </span>
                </TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>
                  {item.lowStockThreshold} {item.unit}
                </TableCell>
                <TableCell>{item.lastRestocked}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAddStock(item.id, 0)}
                    >
                      Add Stock
                    </Button>
                    {item.currentStock <= item.lowStockThreshold && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onReorder(item.id)}
                      >
                        Reorder
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
