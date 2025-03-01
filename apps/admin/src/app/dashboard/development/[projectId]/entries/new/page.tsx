"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, ArrowLeft, Camera } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface NewEntryPageProps {
  params: {
    projectId: string;
  };
}

export default function NewEntryPage({ params }: NewEntryPageProps) {
  const router = useRouter();
  const [changes, setChanges] = useState("");
  const [observations, setObservations] = useState("");
  const [improvements, setImprovements] = useState("");
  const [nextSteps, setNextSteps] = useState("");
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
      notes: string;
    }>
  >([]);
  const [laborHours, setLaborHours] = useState("0");
  const [laborRate] = useState(15);
  const [photos, setPhotos] = useState<File[]>([]);
  const [tasteRating, setTasteRating] = useState<number>(0);
  const [textureRating, setTextureRating] = useState<number>(0);
  const [appearanceRating, setAppearanceRating] = useState<number>(0);

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
        notes: "",
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

  const updateStep = (
    index: number,
    field: "description" | "notes",
    value: string
  ) => {
    const updated = [...steps];
    updated[index][field] = value;
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    router.back();
  };

  const renderRatingButtons = (
    rating: number,
    setRating: (value: number) => void
  ) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            type="button"
            size="sm"
            variant={value <= rating ? "default" : "outline"}
            onClick={() => setRating(value)}
          >
            {value}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <h2 className="text-3xl font-bold">New Development Entry</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Changes & Observations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>What changes were made in this iteration?</Label>
              <Textarea
                value={changes}
                onChange={(e) => setChanges(e.target.value)}
                placeholder="Describe the changes made to the recipe..."
                className="h-20"
              />
            </div>

            <div className="space-y-2">
              <Label>Observations</Label>
              <Textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="What did you observe during the process? How did it turn out?"
                className="h-32"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Taste Rating</Label>
                {renderRatingButtons(tasteRating, setTasteRating)}
              </div>
              <div className="space-y-2">
                <Label>Texture Rating</Label>
                {renderRatingButtons(textureRating, setTextureRating)}
              </div>
              <div className="space-y-2">
                <Label>Appearance Rating</Label>
                {renderRatingButtons(appearanceRating, setAppearanceRating)}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Areas for Improvement</Label>
              <Textarea
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                placeholder="What aspects need improvement?"
                className="h-20"
              />
            </div>

            <div className="space-y-2">
              <Label>Next Steps</Label>
              <Textarea
                value={nextSteps}
                onChange={(e) => setNextSteps(e.target.value)}
                placeholder="What changes will you try in the next iteration?"
                className="h-20"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recipe Details</CardTitle>
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
            <div className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="flex gap-4 items-start">
                  <Select
                    value={ingredient.name}
                    onValueChange={(value) =>
                      updateIngredient(index, "name", value)
                    }
                  >
                    <SelectTrigger className="w-[200px]">
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
                    className="w-[120px]"
                  />

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      RM {ingredient.total.toFixed(2)}
                    </Badge>
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
              <CardTitle>Method & Notes</CardTitle>
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
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className="space-y-2">
                  <div className="flex gap-4 items-start">
                    <div className="flex-none w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      {step.order}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        value={step.description}
                        onChange={(e) =>
                          updateStep(index, "description", e.target.value)
                        }
                        placeholder={`Step ${step.order}`}
                        className="h-20"
                      />
                      <Textarea
                        value={step.notes}
                        onChange={(e) =>
                          updateStep(index, "notes", e.target.value)
                        }
                        placeholder="Add notes about this step (temperature, timing, texture, etc.)"
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Labor & Documentation</CardTitle>
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

            <div className="space-y-2">
              <Label>Photos</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </div>
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-video bg-muted rounded-lg flex items-center justify-center"
                  >
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                ))}
              </div>
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
          <Button type="submit">Save Entry</Button>
        </div>
      </form>
    </div>
  );
}
