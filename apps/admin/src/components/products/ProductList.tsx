"use client";

import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductListProps {
  onEditRecipe: (id: string) => void;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: number;
  steps: number;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Chocolate Chip Cookies",
    description:
      "Classic chocolate chip cookies with a crispy edge and soft center",
    price: 12.99,
    ingredients: 8,
    steps: 6,
  },
  // Add more mock products as needed
];

export default function ProductList({ onEditRecipe }: ProductListProps) {
  const [products] = useState<Product[]>(mockProducts);

  const handleDelete = async (id: string) => {
    // TODO: Implement delete functionality
    console.log("Delete product:", id);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Ingredients</TableHead>
            <TableHead className="text-center">Steps</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell className="text-right">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                {product.ingredients}
              </TableCell>
              <TableCell className="text-center">{product.steps}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditRecipe(product.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
