import { createProductManagementService } from 'database';
import type { ProductManagementService } from 'database/src/services/product-management';

export class CustomerProductService {
  private baseService: ProductManagementService;

  constructor() {
    this.baseService = createProductManagementService();
  }

  // Customer-specific methods
  async getAvailableProducts() {
    return this.baseService.getAvailableProducts();
  }

  async getProductsByCategory(categoryId: string) {
    return this.baseService.getProductsByCategory(categoryId);
  }

  async getFeaturedProducts() {
    return this.baseService.getFeaturedProducts();
  }

  async searchProducts(query: string) {
    return this.baseService.searchProducts(query);
  }

  // This method checks if we have enough stock for the order
  async validateOrderQuantity(productId: string, quantity: number): Promise<boolean> {
    const availableStock = await this.baseService.getProducibleItems(productId);
    return availableStock >= quantity;
  }

  async getProductDetails(productId: string) {
    return this.baseService.getProductWithRecipe(productId);
  }
} 