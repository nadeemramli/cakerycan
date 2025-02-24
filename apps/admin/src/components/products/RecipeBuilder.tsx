"use client";

import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface RecipeBuilderProps {
  onClose: () => void;
}

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Step {
  description: string;
  duration: number;
  tools: string[];
}

export default function RecipeBuilder({ onClose }: RecipeBuilderProps) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: 0, unit: "" },
  ]);
  const [steps, setSteps] = useState<Step[]>([
    { description: "", duration: 0, tools: [] },
  ]);
  const [price, setPrice] = useState("");

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setSteps([...steps, { description: "", duration: 0, tools: [] }]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save recipe
    console.log({ productName, description, ingredients, steps, price });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">New Recipe</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., Chocolate Chip Cookies"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your product..."
          />
        </div>

        <div>
          <Label>Ingredients</Label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <Input
                placeholder="Ingredient name"
                value={ingredient.name}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].name = e.target.value;
                  setIngredients(newIngredients);
                }}
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={ingredient.quantity || ""}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].quantity = Number(e.target.value);
                  setIngredients(newIngredients);
                }}
              />
              <Input
                placeholder="Unit"
                value={ingredient.unit}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].unit = e.target.value;
                  setIngredients(newIngredients);
                }}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeIngredient(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addIngredient}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Ingredient
          </Button>
        </div>

        <div>
          <Label>Steps</Label>
          {steps.map((step, index) => (
            <div key={index} className="space-y-2 mt-2">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Step description"
                  value={step.description}
                  onChange={(e) => {
                    const newSteps = [...steps];
                    newSteps[index].description = e.target.value;
                    setSteps(newSteps);
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeStep(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={step.duration || ""}
                  onChange={(e) => {
                    const newSteps = [...steps];
                    newSteps[index].duration = Number(e.target.value);
                    setSteps(newSteps);
                  }}
                />
                <Input
                  placeholder="Tools (comma separated)"
                  value={step.tools.join(", ")}
                  onChange={(e) => {
                    const newSteps = [...steps];
                    newSteps[index].tools = e.target.value
                      .split(",")
                      .map((tool) => tool.trim());
                    setSteps(newSteps);
                  }}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addStep}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save Recipe</Button>
      </div>
    </form>
  );
}
