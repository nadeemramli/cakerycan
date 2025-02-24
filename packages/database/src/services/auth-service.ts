import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types';

export class AuthService {
  constructor(private supabase: SupabaseClient<Database>) {}

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  async getUserRole() {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error) throw error;
    if (!user) return null;

    const { data: profile, error: profileError } = await this.supabase
      .from('auth.users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;
    return profile?.role;
  }

  async isAdmin() {
    const role = await this.getUserRole();
    return role === 'admin';
  }

  // Admin only: Set user role
  async setUserRole(userId: string, role: 'admin' | 'customer') {
    const { error } = await this.supabase
      .rpc('set_user_role', { user_id: userId, new_role: role });

    if (error) throw error;
  }
} 