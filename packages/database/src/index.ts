// Export types and utilities
export * from './types';
export * from './lib/client';
export * from './lib/errors';
export * from './lib/constants';

// Export services and their types
export * from './services';

// Export factory functions
import { createSupabaseClient } from './lib/client';
import { AuthService } from './services/auth';
import { ProductManagementService } from './services/product-management';

export const createAuthService = () => {
  return new AuthService(createSupabaseClient());
};

export const createProductManagementService = () => {
  return new ProductManagementService(createSupabaseClient());
};