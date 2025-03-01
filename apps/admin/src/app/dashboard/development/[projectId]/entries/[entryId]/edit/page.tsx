"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditEntryPageProps {
  params: {
    projectId: string;
    entryId: string;
  };
}

export default function EditEntryPage({ params }: EditEntryPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [changes, setChanges] = useState("");
  const [ingredients, setIngredients] = useState<
    Array<{
      id: string;
      name: string;
      quantity: string;
      unitCost: number;
      total: number;
    }>
  >([]);
  const [steps, setSteps] = useState<
    Array<{
      id: string;
      order: number;
      description: string;
    }>
  >([]);
  const [laborHours, setLaborHours] = useState("0");
  const [laborRate] = useState(15);

  // Mock data - will be replaced with actual data from database
  const availableIngredients = [
    { id: "1", name: "Matcha Powder", unitCost: 0.5 },
    { id: "2", name: "Cake Flour", unitCost: 0.2 },
    { id: "3", name: "Sugar", unitCost: 0.15 },
  ];

  useEffect(() => {
    // Fetch entry data and populate form
    // This is mock data for now
    const mockEntry = {
      changes: "Initial test with adjusted ratios",
      ingredients: [
        {
          id: "1",
          name: "Matcha Powder",
          quantity: "50",
          unitCost: 0.5,
          total: 25,
        },
      ],
      steps: [
        {
          id: "1",
          order: 1,
          description: "Mix dry ingredients",
        },
      ],
      laborHours: "2",
    };

    setChanges(mockEntry.changes);
    setIngredients(mockEntry.ingredients);
    setSteps(mockEntry.steps);
    setLaborHours(mockEntry.laborHours);
    setIsLoading(false);
  }, [params.entryId]);

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
    field: "name" | "quantity",
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
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-8">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <h2 className="text-3xl font-bold">Edit Development Entry</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Changes & Observations</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              id="changes"
              value={changes}
              onChange={(e) => setChanges(e.target.value)}
              placeholder="Describe the changes and observations"
              className="h-32"
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
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex gap-4 items-start">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Labor & Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-[180px]">
                <Input
                  id="labor"
                  type="number"
                  min="0"
                  step="0.5"
                  value={laborHours}
                  onChange={(e) => setLaborHours(e.target.value)}
                  placeholder="Labor Hours"
                />
              </div>
              <span className="text-sm text-muted-foreground">
                × RM {laborRate.toFixed(2)}/hour =
              </span>
              <span className="text-sm font-medium">
                RM {(parseFloat(laborHours) * laborRate).toFixed(2)}
              </span>
            </div>

            <div>
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

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
