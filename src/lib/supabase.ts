import { createClient } from '@supabase/supabase-js';
import { type Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper function to get the current user's profile
export async function getCurrentProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile;
}

// Helper function to get the current user's business
export async function getCurrentBusiness() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return business;
}

// Helper function to check if a user has reached their menu limit
export async function hasReachedMenuLimit(businessId: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_plan')
    .single();

  const { count } = await supabase
    .from('menus')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId);

  const limit = profile?.subscription_plan === 'advanced' ? 5 : 1;
  return (count ?? 0) >= limit;
}

// Helper function to check if a category has reached its item limit
export async function hasReachedMenuItemLimit(menuId: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_plan')
    .single();

  const { count } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', menuId);

  const limit = profile?.subscription_plan === 'advanced' ? 100 : 50;
  return (count ?? 0) >= limit;
}

// Helper function to check if a menu has reached its category limit
export async function hasReachedCategoryLimit(menuId: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_plan')
    .single();

  const { count } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true })
    .eq('menu_id', menuId);

  const limit = profile?.subscription_plan === 'advanced' ? 20 : 5;
  return (count ?? 0) >= limit;
}

// Helper function to track menu views and QR code scans
export async function trackMenuEvent(menuId: string, eventType: 'scan' | 'view') {
  const { data } = await supabase
    .from('analytics')
    .insert({
      menu_id: menuId,
      event_type: eventType,
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    })
    .select()
    .single();

  return data;
}
