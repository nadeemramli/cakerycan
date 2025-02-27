"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecipeBuilder } from "@/components/products/recipe-builder";
import { ProductList } from "@/components/products/product-list";
import { toast } from "sonner";

export default function MenuPage() {
  const [showRecipeBuilder, setShowRecipeBuilder] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);

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

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Menu & Recipes</h2>
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
      )}
    </div>
  );
}
