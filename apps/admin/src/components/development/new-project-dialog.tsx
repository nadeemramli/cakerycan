"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProjectDialog({
  open,
  onOpenChange,
}: NewProjectDialogProps) {
  const [recipeType, setRecipeType] = useState<"existing" | "new">("new");
  const [existingRecipe, setExistingRecipe] = useState<string>("");

  // Mock data - will be replaced with actual data from database
  const existingRecipes = [
    { id: "1", name: "Classic Sponge Cake" },
    { id: "2", name: "Chocolate Cake" },
    { id: "3", name: "Vanilla Cupcake" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Development Project</DialogTitle>
            <DialogDescription>
              Start a new recipe development project. Fill in the project
              details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                className="col-span-3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your development goals"
                className="col-span-3"
              />
            </div>
            <div className="grid gap-2">
              <Label>Recipe Type</Label>
              <Select
                value={recipeType}
                onValueChange={(value: "existing" | "new") =>
                  setRecipeType(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select recipe type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Recipe</SelectItem>
                  <SelectItem value="existing">
                    Based on Existing Recipe
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {recipeType === "existing" && (
              <div className="grid gap-2">
                <Label>Base Recipe</Label>
                <Select
                  value={existingRecipe}
                  onValueChange={setExistingRecipe}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select base recipe" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingRecipes.map((recipe) => (
                      <SelectItem key={recipe.id} value={recipe.id}>
                        {recipe.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="initial-notes">Initial Notes</Label>
              <Textarea
                id="initial-notes"
                placeholder="Any initial ideas or requirements"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
