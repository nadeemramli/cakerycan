import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../lib/types';
import type { UserRole } from './types';

export class AuthService {
  constructor(private supabase: SupabaseClient<Database>) {}

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Get user role after sign in
    const role = await this.getUserRole();
    if (!role) {
      await this.signOut();
      throw new Error("User role not found");
    }

    return { ...data, role };
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

  async getUserRole(): Promise<UserRole | null> {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error || !user) return null;

    const { data, error: roleError } = await this.supabase
      .from('auth.users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (roleError || !data) return null;
    return data.role as UserRole;
  }

  async isAdmin() {
    const role = await this.getUserRole();
    return role === 'admin';
  }

  // Admin only: Set user role
  async setUserRole(userId: string, role: UserRole) {
    // Check if current user is admin
    if (!await this.isAdmin()) {
      throw new Error("Unauthorized: Only admins can set user roles");
    }

    const { error } = await this.supabase
      .rpc('set_user_role', { user_id: userId, new_role: role });

    if (error) throw error;
  }

  // Create an admin user (should only be used during initial setup)
  async createAdminUser(email: string, password: string) {
    const { error } = await this.supabase
      .rpc('create_admin_user', { email, password });

    if (error) throw error;
  }
} 