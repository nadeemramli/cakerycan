import { ProductManagementService as BaseProductManagementService } from 'database';
import { createSupabaseClient } from 'database';

export class AdminProductManagementService extends BaseProductManagementService {
  constructor() {
    super(createSupabaseClient());
  }

  // Admin-specific methods
  async getAllProducts() {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        recipes (
          quantity_required,
          ingredients (
            name,
            unit,
            cost_per_unit,
            inventory (current_stock, low_stock_threshold)
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getAllIngredients() {
    const { data, error } = await this.supabase
      .from('ingredients')
      .select(`
        *,
        inventory (*)
      `)
      .order('name');

    if (error) throw error;
    return data;
  }

  async getInventoryAlerts() {
    const { data, error } = await this.supabase
      .from('inventory')
      .select(`
        *,
        ingredients (name, unit)
      `)
      .filter('current_stock', 'lte', 'low_stock_threshold');

    if (error) throw error;
    return data;
  }

  async getProductionMetrics() {
    const { data: products, error: productsError } = await this.supabase
      .from('products')
      .select('*');

    if (productsError) throw productsError;

    const metrics = await Promise.all(
      products.map(async (product) => {
        const producibleItems = await this.getProducibleItems(product.id);
        return {
          ...product,
          producibleItems,
          needsRestock: producibleItems <= 10
        };
      })
    );

    return metrics;
  }

  async deleteProduct(productId: string) {
    // First delete all recipes associated with this product
    const { error: recipesError } = await this.supabase
      .from('recipes')
      .delete()
      .eq('product_id', productId);

    if (recipesError) throw recipesError;

    // Then delete the product
    const { error: productError } = await this.supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (productError) throw productError;
  }

  async deleteIngredient(ingredientId: string) {
    // First delete inventory entries
    const { error: inventoryError } = await this.supabase
      .from('inventory')
      .delete()
      .eq('ingredient_id', ingredientId);

    if (inventoryError) throw inventoryError;

    // Then delete recipes using this ingredient
    const { error: recipesError } = await this.supabase
      .from('recipes')
      .delete()
      .eq('ingredient_id', ingredientId);

    if (recipesError) throw recipesError;

    // Finally delete the ingredient
    const { error: ingredientError } = await this.supabase
      .from('ingredients')
      .delete()
      .eq('id', ingredientId);

    if (ingredientError) throw ingredientError;
  }

  async bulkUpdateStock(updates: Array<{ ingredientId: string; currentStock: number }>) {
    const { error } = await this.supabase
      .from('inventory')
      .upsert(
        updates.map(({ ingredientId, currentStock }) => ({
          ingredient_id: ingredientId,
          current_stock: currentStock
        }))
      );

    if (error) throw error;
  }
} 