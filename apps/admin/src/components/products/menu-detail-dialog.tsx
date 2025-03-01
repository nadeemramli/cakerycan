"use client";

import { useState } from "react";
import { ArrowLeftRight, RefreshCw, Pencil, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface MenuDetailDialogProps {
  menuId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (id: string) => void;
}

// Mock data - replace with actual data from your API
const mockMenuDetail = {
  id: "1",
  name: "Classic Chocolate Cake",
  description: "Rich and moist chocolate cake with premium ingredients",
  category: "Cakes",
  servingSize: "12 slices",
  prepTime: "30 mins",
  cookTime: "45 mins",
  price: 120.0,
  cost: 45.5,
  profit: 74.5,
  profitMargin: "62%",
  ingredients: [
    {
      name: "All-purpose flour",
      quantity: "300g",
      cost: 1.5,
      supplier: "Baker's Supply Co",
      stock: 5000,
    },
    {
      name: "Cocoa powder",
      quantity: "75g",
      cost: 3.0,
      supplier: "Premium Ingredients Ltd",
      stock: 2000,
    },
  ],
  steps: [
    {
      order: 1,
      description: "Preheat oven to 180°C",
      duration: "5 mins",
      tools: ["Oven"],
    },
    {
      order: 2,
      description: "Mix dry ingredients",
      duration: "10 mins",
      tools: ["Whisk", "Large bowl"],
    },
  ],
  sales: {
    total: 150,
    lastMonth: 25,
    trend: "+10%",
  },
  development: {
    version: 2,
    lastUpdated: "2024-02-28",
    changes: [
      {
        date: "2024-02-28",
        type: "Recipe Improvement",
        description: "Adjusted cocoa powder ratio for better taste",
      },
      {
        date: "2024-02-15",
        type: "Initial Version",
        description: "Original recipe creation",
      },
    ],
  },
};

export function MenuDetailDialog({
  menuId,
  open,
  onOpenChange,
  onEdit,
}: MenuDetailDialogProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // In a real implementation, fetch the menu details using the menuId
  const menuDetail = mockMenuDetail;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{menuDetail.name}</DialogTitle>
              <DialogDescription className="mt-1.5">
                {menuDetail.category} • {menuDetail.servingSize}
              </DialogDescription>
            </div>
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(menuId)}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit Recipe
              </Button>
            )}
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recipe">Recipe</TabsTrigger>
            <TabsTrigger value="sales">Sales & Stock</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] mt-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className="font-medium">Description:</span>
                      <p className="text-muted-foreground">
                        {menuDetail.description}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Preparation Time:</span>
                      <p className="text-muted-foreground">
                        {menuDetail.prepTime}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Cooking Time:</span>
                      <p className="text-muted-foreground">
                        {menuDetail.cookTime}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Financial Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className="font-medium">Selling Price:</span>
                      <p className="text-muted-foreground">
                        RM {menuDetail.price.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Cost:</span>
                      <p className="text-muted-foreground">
                        RM {menuDetail.cost.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Profit:</span>
                      <p className="text-green-600">
                        RM {menuDetail.profit.toFixed(2)} (
                        {menuDetail.profitMargin})
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recipe" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {menuDetail.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{ingredient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {ingredient.quantity} • RM{" "}
                            {ingredient.cost.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {ingredient.supplier}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Stock: {ingredient.stock}g
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preparation Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {menuDetail.steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-none">
                          <Badge variant="outline">{step.order}</Badge>
                        </div>
                        <div className="flex-1">
                          <p>{step.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {step.duration} • Tools: {step.tools.join(", ")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Sales
                      </p>
                      <p className="text-2xl font-bold">
                        {menuDetail.sales.total}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Last Month
                      </p>
                      <p className="text-2xl font-bold">
                        {menuDetail.sales.lastMonth}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Trend</p>
                      <p className="text-2xl font-bold text-green-600">
                        {menuDetail.sales.trend}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stock Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {menuDetail.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{ingredient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {ingredient.supplier}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">
                            {ingredient.stock}g in stock
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {Math.floor(
                              ingredient.stock / parseInt(ingredient.quantity)
                            )}{" "}
                            servings possible
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="development" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Development History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {menuDetail.development.changes.map((change, index) => (
                      <div key={index} className="relative pl-6 pb-8 last:pb-0">
                        <div className="absolute left-0 top-0 h-full w-[2px] bg-border">
                          <div className="absolute top-0 left-[-3px] w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{change.type}</p>
                          <p className="text-sm text-muted-foreground mb-1">
                            {change.date}
                          </p>
                          <p className="text-sm">{change.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
