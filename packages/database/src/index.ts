import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// Create a single supabase client for interacting with your database
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};

export * from './types';