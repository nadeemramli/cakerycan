"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecipeBuilder } from "@/components/products/recipe-builder";
import { ProductList } from "@/components/products/product-list";
import { PageContainer } from "@/components/layout/page-container";
import { MenuDetailDialog } from "@/components/products/menu-detail-dialog";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data - will be replaced with actual data from database
const mockRecipes = [
  {
    id: "1",
    name: "Classic Chocolate Cake",
    description: "Rich and moist chocolate cake",
    category: "cakes",
    servingSize: "12 slices",
    prepTime: "30",
    cookTime: "45",
    ingredients: [
      {
        id: "1",
        name: "All-purpose flour",
        quantity: "300",
        unit: "g",
        cost: 1.5,
      },
      {
        id: "2",
        name: "Cocoa powder",
        quantity: "75",
        unit: "g",
        cost: 3.0,
      },
    ],
    steps: [
      {
        id: "1",
        description: "Preheat oven to 180°C",
        duration: "5",
        tools: ["oven"],
      },
      {
        id: "2",
        description: "Mix dry ingredients",
        duration: "10",
        tools: ["whisk"],
      },
    ],
  },
];

export default function MenuPage() {
  const [showRecipeBuilder, setShowRecipeBuilder] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);
  const [viewingRecipeId, setViewingRecipeId] = useState<string | null>(null);

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
    setViewingRecipeId(id);
  };

  const getRecipeData = (id: string) => {
    return mockRecipes.find((recipe) => recipe.id === id);
  };

  return (
    <PageContainer
      title="Menu & Recipes"
      breadcrumbs={[
        {
          title: "Menu",
          href: "/dashboard/menu",
        },
      ]}
    >
      <div className="flex items-center justify-between space-y-2">
        <div />
        <Button onClick={() => setShowRecipeBuilder(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Recipe
        </Button>
      </div>

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

      <Dialog
        open={showRecipeBuilder}
        onOpenChange={(open) => {
          setShowRecipeBuilder(open);
          if (!open) setEditingRecipeId(null);
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {editingRecipeId ? "Edit Recipe" : "New Recipe"}
            </DialogTitle>
          </DialogHeader>
          <RecipeBuilder
            recipeId={editingRecipeId || undefined}
            initialData={
              editingRecipeId ? getRecipeData(editingRecipeId) : undefined
            }
            onClose={() => {
              setShowRecipeBuilder(false);
              setEditingRecipeId(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <MenuDetailDialog
        menuId={viewingRecipeId || ""}
        open={viewingRecipeId !== null}
        onOpenChange={(open) => {
          if (!open) setViewingRecipeId(null);
        }}
        onEdit={(id) => {
          setViewingRecipeId(null);
          handleEdit(id);
        }}
      />
    </PageContainer>
  );
}
