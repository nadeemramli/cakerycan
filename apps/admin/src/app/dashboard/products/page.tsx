"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeBuilder } from "@/components/products/recipe-builder";
import { ProductList } from "@/components/products/product-list";
import { InventoryManager } from "@/components/products/inventory-manager";
import { SupplierManager } from "@/components/products/supplier-manager";
import { AnalyticsDashboard } from "@/components/products/analytics-dashboard";
import { toast } from "sonner";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "products"
  );
  const [showRecipeBuilder, setShowRecipeBuilder] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);

  // Update URL when tab changes
  useEffect(() => {
    router.push(`/dashboard/products?tab=${activeTab}`);
  }, [activeTab, router]);

  // Handle tab change from URL
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleEdit = (id: string) => {
    setEditingRecipeId(id);
    setShowRecipeBuilder(true);
  };

  const handleDuplicate = (id: string) => {
    toast.success("Recipe duplicated successfully");
  };

  const handleDelete = (id: string) => {
    toast.success("Recipe deleted successfully");
  };

  const handleView = (id: string) => {
    console.log("Viewing recipe:", id);
  };

  // Inventory handlers
  const handleAddStock = (id: string, quantity: number) => {
    toast.success(`Added ${quantity} units to stock`);
  };

  const handleUpdateThreshold = (id: string, threshold: number) => {
    toast.success("Stock threshold updated successfully");
  };

  const handleReorder = (id: string) => {
    toast.success("Reorder request sent to supplier");
  };

  // Supplier handlers
  const handleAddSupplier = () => {
    toast.success("Add supplier form will open");
  };

  const handleEditSupplier = (id: string) => {
    toast.success("Edit supplier form will open");
  };

  const handleViewOrders = (id: string) => {
    toast.success("Viewing supplier orders");
  };

  const handleCreateOrder = (id: string) => {
    toast.success("Create order form will open");
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Product Management
        </h2>
        <Button onClick={() => setShowRecipeBuilder(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Recipe
        </Button>
      </div>

      {showRecipeBuilder ? (
        <RecipeBuilder
          onClose={() => {
            setShowRecipeBuilder(false);
            setEditingRecipeId(null);
          }}
        />
      ) : (
        <Tabs
          defaultValue="products"
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products & Recipes</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Products & Recipes</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductList
                  onEdit={handleEdit}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                  onView={handleView}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
              </CardHeader>
              <CardContent>
                <InventoryManager
                  onAddStock={handleAddStock}
                  onUpdateThreshold={handleUpdateThreshold}
                  onReorder={handleReorder}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Management</CardTitle>
              </CardHeader>
              <CardContent>
                <SupplierManager
                  onAddSupplier={handleAddSupplier}
                  onEditSupplier={handleEditSupplier}
                  onViewOrders={handleViewOrders}
                  onCreateOrder={handleCreateOrder}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <AnalyticsDashboard />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
