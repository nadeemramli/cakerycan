"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface NewEntryFormProps {
  projectId: string;
  currentVersion: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface IngredientEntry {
  id: string;
  name: string;
  quantity: string;
  unitCost: number;
  total: number;
}

interface Step {
  id: string;
  order: number;
  description: string;
}

export function NewEntryForm({
  projectId,
  currentVersion,
  open,
  onOpenChange,
}: NewEntryFormProps) {
  const [ingredients, setIngredients] = useState<IngredientEntry[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [laborHours, setLaborHours] = useState("0");
  const [laborRate] = useState(15); // This could be configurable in settings

  // Mock data - will be replaced with actual data from database
  const availableIngredients = [
    { id: "1", name: "Matcha Powder", unitCost: 0.5 },
    { id: "2", name: "Cake Flour", unitCost: 0.2 },
    { id: "3", name: "Sugar", unitCost: 0.15 },
  ];

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: Date.now().toString(),
        name: "",
        quantity: "",
        unitCost: 0,
        total: 0,
      },
    ]);
  };

  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: Date.now().toString(),
        order: steps.length + 1,
        description: "",
      },
    ]);
  };

  const updateIngredient = (
    index: number,
    field: keyof IngredientEntry,
    value: string
  ) => {
    const updated = [...ingredients];
    const ingredient = updated[index];

    if (field === "name") {
      const selectedIngredient = availableIngredients.find(
        (i) => i.id === value
      );
      if (selectedIngredient) {
        ingredient.name = selectedIngredient.name;
        ingredient.unitCost = selectedIngredient.unitCost;
        ingredient.total =
          parseFloat(ingredient.quantity || "0") * selectedIngredient.unitCost;
      }
    } else if (field === "quantity") {
      ingredient.quantity = value;
      ingredient.total = parseFloat(value || "0") * ingredient.unitCost;
    }

    setIngredients(updated);
  };

  const updateStep = (index: number, description: string) => {
    const updated = [...steps];
    updated[index].description = description;
    setSteps(updated);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const removeStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index);
    // Reorder remaining steps
    updated.forEach((step, i) => {
      step.order = i + 1;
    });
    setSteps(updated);
  };

  const calculateTotalCost = () => {
    const ingredientsCost = ingredients.reduce((sum, i) => sum + i.total, 0);
    const laborCost = parseFloat(laborHours) * laborRate;
    return ingredientsCost + laborCost;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            New Development Entry (v{currentVersion + 1})
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Changes & Observations</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                id="changes"
                placeholder="Describe the changes and observations"
                className="h-24"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Ingredients Used</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addIngredient}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <div key={ingredient.id} className="flex gap-2 items-start">
                      <Select
                        value={ingredient.name}
                        onValueChange={(value) =>
                          updateIngredient(index, "name", value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select ingredient" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableIngredients.map((i) => (
                            <SelectItem key={i.id} value={i.id}>
                              {i.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Input
                        placeholder="Quantity"
                        value={ingredient.quantity}
                        onChange={(e) =>
                          updateIngredient(index, "quantity", e.target.value)
                        }
                        className="w-[100px]"
                      />

                      <div className="flex items-center gap-2 ml-2">
                        <span className="text-sm">
                          RM {ingredient.total.toFixed(2)}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeIngredient(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recipe Steps</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addStep}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex gap-2 items-start">
                      <div className="flex-none w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {step.order}
                      </div>
                      <div className="flex-1">
                        <Textarea
                          value={step.description}
                          onChange={(e) => updateStep(index, e.target.value)}
                          placeholder={`Step ${step.order}`}
                          className="h-20"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeStep(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Labor & Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="labor">Labor Hours</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="labor"
                    type="number"
                    min="0"
                    step="0.5"
                    value={laborHours}
                    onChange={(e) => setLaborHours(e.target.value)}
                    className="w-[100px]"
                  />
                  <span className="text-sm text-muted-foreground">
                    × RM {laborRate.toFixed(2)}/hour =
                  </span>
                  <span className="text-sm font-medium">
                    RM {(parseFloat(laborHours) * laborRate).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Photos</Label>
                <Input type="file" multiple accept="image/*" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                RM {calculateTotalCost().toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Entry</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
