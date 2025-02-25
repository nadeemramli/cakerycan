export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          role: 'admin' | 'customer'
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          role?: 'admin' | 'customer'
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          role?: 'admin' | 'customer'
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          image_url: string
          category_id: string
          stock: number
          status: 'in_stock' | 'low_stock' | 'out_of_stock'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          image_url?: string
          category_id: string
          stock: number
          status?: 'in_stock' | 'low_stock' | 'out_of_stock'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          image_url?: string
          category_id?: string
          stock?: number
          status?: 'in_stock' | 'low_stock' | 'out_of_stock'
          created_at?: string
          updated_at?: string
        }
      }
      ingredients: {
        Row: {
          id: string
          name: string
          unit: string
          cost_per_unit: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          unit: string
          cost_per_unit: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          unit?: string
          cost_per_unit?: number
          created_at?: string
          updated_at?: string
        }
      }
      recipes: {
        Row: {
          id: string
          product_id: string
          ingredient_id: string
          quantity_required: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          ingredient_id: string
          quantity_required: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          ingredient_id?: string
          quantity_required?: number
          created_at?: string
          updated_at?: string
        }
      }
      inventory: {
        Row: {
          id: string
          ingredient_id: string
          current_stock: number
          low_stock_threshold: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ingredient_id: string
          current_stock: number
          low_stock_threshold: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ingredient_id?: string
          current_stock?: number
          low_stock_threshold?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      calculate_producible_items: {
        Args: {
          product_id: string
        }
        Returns: number
      }
      update_product_status: {
        Args: {
          product_id: string
        }
        Returns: void
      }
      verify_admin_status: {
        Args: {
          user_id: string
        }
        Returns: {
          is_admin: boolean
        }
      }
      set_user_role: {
        Args: {
          user_id: string
          new_role: 'admin' | 'customer'
        }
        Returns: void
      }
    }
  }
}