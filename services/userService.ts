import { supabase } from '../lib/supabase';
import { User } from '../types';

export const userService = {
  async getUserProfile(userId: string): Promise<User | null> {
    const { data: userProfile, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    if (!userProfile) return null;

    const { data: { user: authUser } } = await supabase.auth.admin
      .getUserById(userId)
      .catch(() => ({ data: { user: null } }));

    return {
      id: userProfile.id,
      username: userProfile.username,
      name: userProfile.display_name,
      email: authUser?.email || '',
      avatarUrl: userProfile.avatar_url,
      role: userProfile.role,
      kycStatus: userProfile.kyc_status,
      subscriptionPlan: userProfile.subscription_plan,
      lastLogin: userProfile.last_login,
    };
  },

  async updateUserProfile(
    userId: string,
    updates: Partial<{
      display_name: string;
      avatar_url: string;
      subscription_plan: string;
    }>
  ): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      username: data.username,
      name: data.display_name,
      email: '',
      avatarUrl: data.avatar_url,
      role: data.role,
      kycStatus: data.kyc_status,
      subscriptionPlan: data.subscription_plan,
      lastLogin: data.last_login,
    };
  },

  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((user) => ({
      id: user.id,
      username: user.username,
      name: user.display_name,
      email: '',
      avatarUrl: user.avatar_url,
      role: user.role,
      kycStatus: user.kyc_status,
      subscriptionPlan: user.subscription_plan,
      lastLogin: user.last_login,
    }));
  },

  async updateUserRole(userId: string, role: 'user' | 'admin'): Promise<void> {
    const { error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId);

    if (error) throw error;
  },
};
