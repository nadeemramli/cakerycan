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
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
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
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          image_url?: string
          category_id: string
          stock: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          image_url?: string
          category_id?: string
          stock?: number
          created_at?: string
        }
      }
      // Add more tables as needed
    }
  }
}