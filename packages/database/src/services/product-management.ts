import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types';

type Product = Database['public']['Tables']['products']['Row'];
type Ingredient = Database['public']['Tables']['ingredients']['Row'];
type Recipe = Database['public']['Tables']['recipes']['Row'];
type Inventory = Database['public']['Tables']['inventory']['Row'];

export class ProductManagementService {
  constructor(protected supabase: SupabaseClient<Database>) {}

  // Product Operations
  async createProduct(
    name: string,
    description: string,
    price: number,
    categoryId: string,
    imageUrl?: string
  ): Promise<Product | null> {
    const { data, error } = await this.supabase
      .from('products')
      .insert({
        name,
        description,
        price,
        category_id: categoryId,
        image_url: imageUrl,
        stock: 0,
        status: 'out_of_stock'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateProduct(
    id: string,
    updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<Product | null> {
    const { data, error } = await this.supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Ingredient Operations
  async createIngredient(
    name: string,
    unit: string,
    costPerUnit: number
  ): Promise<Ingredient | null> {
    const { data, error } = await this.supabase
      .from('ingredients')
      .insert({
        name,
        unit,
        cost_per_unit: costPerUnit
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateIngredientStock(
    ingredientId: string,
    currentStock: number,
    lowStockThreshold: number
  ): Promise<Inventory | null> {
    const { data, error } = await this.supabase
      .from('inventory')
      .upsert({
        ingredient_id: ingredientId,
        current_stock: currentStock,
        low_stock_threshold: lowStockThreshold
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Recipe Operations
  async createRecipe(
    productId: string,
    ingredientId: string,
    quantityRequired: number
  ): Promise<Recipe | null> {
    const { data, error } = await this.supabase
      .from('recipes')
      .insert({
        product_id: productId,
        ingredient_id: ingredientId,
        quantity_required: quantityRequired
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Query Operations
  async getProductWithRecipe(productId: string) {
    const { data: product, error: productError } = await this.supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (productError) throw productError;

    const { data: recipes, error: recipesError } = await this.supabase
      .from('recipes')
      .select(`
        quantity_required,
        ingredients (
          name,
          unit,
          cost_per_unit,
          inventory (current_stock, low_stock_threshold)
        )
      `)
      .eq('product_id', productId);

    if (recipesError) throw recipesError;

    return {
      ...product,
      recipes: recipes || []
    };
  }

  async getProducibleItems(productId: string): Promise<number> {
    const { data, error } = await this.supabase
      .rpc('calculate_producible_items', { product_id: productId });

    if (error) throw error;
    return data || 0;
  }

  async getProductInventoryStatus(productId: string) {
    const { data: product, error: productError } = await this.supabase
      .from('products')
      .select('status, stock')
      .eq('id', productId)
      .single();

    if (productError) throw productError;
    return product;
  }

  // Frontend-specific query methods
  async getAvailableProducts() {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .neq('status', 'out_of_stock')
      .order('name');

    if (error) throw error;
    return data;
  }

  async getProductsByCategory(categoryId: string) {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .neq('status', 'out_of_stock')
      .order('name');

    if (error) throw error;
    return data;
  }

  async getFeaturedProducts() {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .neq('status', 'out_of_stock')
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) throw error;
    return data;
  }

  async searchProducts(query: string) {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .neq('status', 'out_of_stock')
      .ilike('name', `%${query}%`)
      .order('name');

    if (error) throw error;
    return data;
  }
} 