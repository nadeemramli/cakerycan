import type { Database } from '../../lib/types';

export type Product = Database['public']['Tables']['products']['Row'];
export type Ingredient = Database['public']['Tables']['ingredients']['Row'];
export type Recipe = Database['public']['Tables']['recipes']['Row'];
export type Inventory = Database['public']['Tables']['inventory']['Row'];

export type ProductWithRecipes = Product & {
  recipes: Array<{
    quantity_required: number;
    ingredients: {
      name: string;
      unit: string;
      cost_per_unit: number;
      inventory: Array<{
        current_stock: number;
        low_stock_threshold: number;
      }>;
    };
  }>;
};

export type ProductStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface ProductMetrics extends Product {
  producibleItems: number;
  needsRestock: boolean;
} 