export const LOW_STOCK_THRESHOLD = 10;
export const DEFAULT_PAGE_SIZE = 20;

export const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
} as const;

export const PRODUCT_STATUS = {
  IN_STOCK: 'in_stock',
  LOW_STOCK: 'low_stock',
  OUT_OF_STOCK: 'out_of_stock',
} as const; 