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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  Package,
} from "lucide-react";

// Temporary mock data
const mockSuppliers = [
  {
    id: "1",
    name: "Baker's Supply Co",
    contactPerson: "John Smith",
    email: "john@bakerssupply.com",
    phone: "+1 (555) 123-4567",
    address: "123 Baker Street, Flour City, FC 12345",
    status: "active",
    activeOrders: 2,
    totalOrders: 150,
    reliability: 98, // percentage
    avgDeliveryTime: 2.5, // days
    lastOrder: "2024-03-18",
    products: ["All-purpose Flour", "Sugar", "Baking Powder"],
  },
  {
    id: "2",
    name: "Sweet Ingredients Ltd",
    contactPerson: "Jane Doe",
    email: "jane@sweetingredients.com",
    phone: "+1 (555) 987-6543",
    address: "456 Sugar Lane, Sweet Town, ST 67890",
    status: "active",
    activeOrders: 1,
    totalOrders: 89,
    reliability: 95,
    avgDeliveryTime: 3.0,
    lastOrder: "2024-03-20",
    products: ["Vanilla Extract", "Food Coloring", "Sprinkles"],
  },
];

interface SupplierManagerProps {
  onAddSupplier: () => void;
  onEditSupplier: (id: string) => void;
  onViewOrders: (id: string) => void;
  onCreateOrder: (id: string) => void;
}

export function SupplierManager({
  onAddSupplier,
  onEditSupplier,
  onViewOrders,
  onCreateOrder,
}: SupplierManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  const filteredSuppliers = mockSuppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedSupplierData = mockSuppliers.find(
    (supplier) => supplier.id === selectedSupplier
  );

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Suppliers List */}
      <div className="col-span-2 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={onAddSupplier}>
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Active Orders</TableHead>
                <TableHead>Reliability</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow
                  key={supplier.id}
                  className={`cursor-pointer ${
                    selectedSupplier === supplier.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedSupplier(supplier.id)}
                >
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.contactPerson}</TableCell>
                  <TableCell>{supplier.activeOrders}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          supplier.reliability >= 95
                            ? "bg-green-500"
                            : supplier.reliability >= 85
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      />
                      {supplier.reliability}%
                    </div>
                  </TableCell>
                  <TableCell>{supplier.lastOrder}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onEditSupplier(supplier.id)}
                        >
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onViewOrders(supplier.id)}
                        >
                          View Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onCreateOrder(supplier.id)}
                        >
                          Create Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Supplier Details */}
      <div className="space-y-4">
        {selectedSupplierData ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>{selectedSupplierData.name}</CardTitle>
                <CardDescription>Supplier Details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    {selectedSupplierData.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4" />
                    {selectedSupplierData.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    {selectedSupplierData.address}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Reliability
                    </div>
                    <div className="text-2xl font-bold">
                      {selectedSupplierData.reliability}%
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Avg. Delivery
                    </div>
                    <div className="text-2xl font-bold">
                      {selectedSupplierData.avgDeliveryTime} days
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Total Orders
                    </div>
                    <div className="text-2xl font-bold">
                      {selectedSupplierData.totalOrders}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Active Orders
                    </div>
                    <div className="text-2xl font-bold">
                      {selectedSupplierData.activeOrders}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supplied Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedSupplierData.products.map((product) => (
                    <div
                      key={product}
                      className="flex items-center gap-2 text-sm rounded-md border p-2"
                    >
                      <Package className="h-4 w-4" />
                      {product}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                Select a supplier to view details
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
