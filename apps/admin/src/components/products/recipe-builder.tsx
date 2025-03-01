"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { X, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecipeBuilderProps {
  onClose: () => void;
  recipeId?: string;
  initialData?: {
    name: string;
    description: string;
    category: string;
    servingSize: string;
    prepTime: string;
    cookTime: string;
    ingredients: Ingredient[];
    steps: Step[];
    developmentVersion?: number;
  };
}

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  cost?: number;
}

interface Step {
  id: string;
  description: string;
  duration: string;
  tools: string[];
}

export function RecipeBuilder({
  onClose,
  recipeId,
  initialData,
}: RecipeBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [recipeData, setRecipeData] = useState(
    initialData || {
      name: "",
      description: "",
      category: "",
      servingSize: "",
      prepTime: "",
      cookTime: "",
      ingredients: [] as Ingredient[],
      steps: [] as Step[],
      developmentVersion: undefined as number | undefined,
    }
  );

  const addIngredient = () => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        {
          id: Math.random().toString(),
          name: "",
          quantity: "",
          unit: "",
          cost: 0,
        },
      ],
    }));
  };

  const removeIngredient = (id: string) => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((ing) => ing.id !== id),
    }));
  };

  const addStep = () => {
    setRecipeData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          id: Math.random().toString(),
          description: "",
          duration: "",
          tools: [],
        },
      ],
    }));
  };

  const removeStep = (id: string) => {
    setRecipeData((prev) => ({
      ...prev,
      steps: prev.steps.filter((step) => step.id !== id),
    }));
  };

  const updateIngredient = (
    id: string,
    field: keyof Ingredient,
    value: string | number
  ) => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing
      ),
    }));
  };

  const updateStep = (
    id: string,
    field: keyof Step,
    value: string | string[]
  ) => {
    setRecipeData((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      ),
    }));
  };

  const handleSave = () => {
    // Save recipe data and sync with development if needed
    if (recipeId) {
      // Update existing recipe
      console.log("Updating recipe:", recipeId, recipeData);
    } else {
      // Create new recipe
      console.log("Creating new recipe:", recipeData);
    }
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Step indicators */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`flex items-center ${
              currentStep === step ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === step
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted"
              }`}
            >
              {step}
            </div>
            <span className="ml-2">
              {step === 1 ? "Basic Info" : step === 2 ? "Ingredients" : "Steps"}
            </span>
            {step < 3 && (
              <div className="w-24 h-[2px] mx-4 bg-muted-foreground/25" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Recipe Name</Label>
                <Input
                  id="name"
                  value={recipeData.name}
                  onChange={(e) =>
                    setRecipeData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter recipe name"
                />
              </div>
              {recipeData.developmentVersion && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">
                    Development v{recipeData.developmentVersion}
                  </Badge>
                  <span>
                    This recipe is synced with development version{" "}
                    {recipeData.developmentVersion}
                  </span>
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={recipeData.description}
                  onChange={(e) =>
                    setRecipeData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter recipe description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={recipeData.category}
                  onValueChange={(value) =>
                    setRecipeData((prev) => ({
                      ...prev,
                      category: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cakes">Cakes</SelectItem>
                    <SelectItem value="cookies">Cookies</SelectItem>
                    <SelectItem value="pastries">Pastries</SelectItem>
                    <SelectItem value="breads">Breads</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="servingSize">Serving Size</Label>
                  <Input
                    id="servingSize"
                    value={recipeData.servingSize}
                    onChange={(e) =>
                      setRecipeData((prev) => ({
                        ...prev,
                        servingSize: e.target.value,
                      }))
                    }
                    placeholder="e.g., 12 cookies"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="prepTime">Preparation Time (minutes)</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    value={recipeData.prepTime}
                    onChange={(e) =>
                      setRecipeData((prev) => ({
                        ...prev,
                        prepTime: e.target.value,
                      }))
                    }
                    placeholder="e.g., 30"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Ingredients */}
      {currentStep === 2 && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Ingredients</h3>
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
            <div className="space-y-4">
              {recipeData.ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    <div className="col-span-2">
                      <Label>Name</Label>
                      <Input
                        value={ingredient.name}
                        onChange={(e) =>
                          updateIngredient(
                            ingredient.id,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Ingredient name"
                      />
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input
                        value={ingredient.quantity}
                        onChange={(e) =>
                          updateIngredient(
                            ingredient.id,
                            "quantity",
                            e.target.value
                          )
                        }
                        placeholder="Amount"
                      />
                    </div>
                    <div>
                      <Label>Unit</Label>
                      <Select
                        value={ingredient.unit}
                        onValueChange={(value) =>
                          updateIngredient(ingredient.id, "unit", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="g">Grams (g)</SelectItem>
                          <SelectItem value="kg">Kilograms (kg)</SelectItem>
                          <SelectItem value="ml">Milliliters (ml)</SelectItem>
                          <SelectItem value="l">Liters (l)</SelectItem>
                          <SelectItem value="pcs">Pieces</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeIngredient(ingredient.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Steps */}
      {currentStep === 3 && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Recipe Steps</h3>
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
            <div className="space-y-4">
              {recipeData.steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex items-start gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-none w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={step.description}
                        onChange={(e) =>
                          updateStep(step.id, "description", e.target.value)
                        }
                        placeholder="Describe this step"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Duration (minutes)</Label>
                        <Input
                          type="number"
                          value={step.duration}
                          onChange={(e) =>
                            updateStep(step.id, "duration", e.target.value)
                          }
                          placeholder="Duration"
                        />
                      </div>
                      <div>
                        <Label>Tools Required</Label>
                        <Select
                          value={step.tools[0] || ""}
                          onValueChange={(value) =>
                            updateStep(step.id, "tools", [value])
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select tool" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mixer">Stand Mixer</SelectItem>
                            <SelectItem value="oven">Oven</SelectItem>
                            <SelectItem value="whisk">Whisk</SelectItem>
                            <SelectItem value="spatula">Spatula</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStep(step.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <div className="space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {currentStep === 3 ? (
            <Button onClick={handleSave}>Save Recipe</Button>
          ) : (
            <Button
              type="button"
              onClick={() => currentStep < 3 && setCurrentStep(currentStep + 1)}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
