
'use server';

import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { generateFlyer, generateFlyerBuffer } from '@/utils/qrcode';
import { uploadImage } from '@/utils/storage';

/**
 * Generate a QR code URL for a menu
 * @param menuId The ID of the menu
 * @returns The URL for the menu
 */
export async function getMenuQRCodeUrl(menuId: string): Promise<string> {
  // Get the base URL from the environment or use a default
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://onourmenu.app';
  
  // Return the URL for the menu
  return `${baseUrl}/menu/${menuId}`;
}

/**
 * Generate a QR code flyer for a menu
 * @param menuId The ID of the menu
 * @param backgroundUrl The URL of the background image
 * @returns The data URL of the flyer
 */
export async function generateQRCodeFlyer(
  menuId: string,
  backgroundUrl?: string | null
): Promise<string> {
  // Get the cookie store - not needed with direct supabase import
  // const cookieStore = cookies();
  
  // Use the imported supabase client
  // const supabase = createServerClient(cookieStore);
  
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  // Get the menu
  const { data: menu, error: menuError } = await supabase
    .from('menus')
    .select('*, restaurants(*)')
    .eq('id', menuId)
    .single();
  
  if (menuError || !menu) {
    throw new Error('Menu not found');
  }
  
  // Check if the user owns the menu
  if (menu.restaurants.user_id !== user.id) {
    throw new Error('Unauthorized');
  }
  
  // Get the QR code URL
  const qrCodeUrl = await getMenuQRCodeUrl(menuId);
  
  // Generate the flyer
  const flyerDataUrl = await generateFlyer({
    restaurantName: menu.restaurants.name,
    logoUrl: menu.restaurants.logo_url,
    backgroundUrl: backgroundUrl || undefined,
    qrCodeUrl,
  });
  
  return flyerDataUrl;
}

/**
 * Download a QR code flyer for a menu
 * @param menuId The ID of the menu
 * @param backgroundUrl The URL of the background image
 * @returns The buffer of the flyer
 */
export async function downloadQRCodeFlyer(
  menuId: string,
  backgroundUrl?: string | null
): Promise<Buffer> {
  // Get the cookie store - not needed with direct supabase import
  // const cookieStore = cookies();
  
  // Use the imported supabase client
  // const supabase = createServerClient(cookieStore);
  
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  // Get the menu
  const { data: menu, error: menuError } = await supabase
    .from('menus')
    .select('*, restaurants(*)')
    .eq('id', menuId)
    .single();
  
  if (menuError || !menu) {
    throw new Error('Menu not found');
  }
  
  // Check if the user owns the menu
  if (menu.restaurants.user_id !== user.id) {
    throw new Error('Unauthorized');
  }
  
  // Get the QR code URL
  const qrCodeUrl = await getMenuQRCodeUrl(menuId);
  
  // Generate the flyer
  const flyerBuffer = await generateFlyerBuffer({
    restaurantName: menu.restaurants.name,
    logoUrl: menu.restaurants.logo_url,
    backgroundUrl: backgroundUrl || undefined,
    qrCodeUrl,
  });
  
  return flyerBuffer;
}

/**
 * Upload a custom background image
 * @param file The file to upload
 * @returns The URL of the uploaded file
 */
export async function uploadBackgroundImage(file: File): Promise<string> {
  // Get the cookie store - not needed with direct supabase import
  // const cookieStore = cookies();
  
  // Use the imported supabase client
  // const supabase = createServerClient(cookieStore);
  
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  // Get the user's subscription plan
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('user_id', user.id)
    .single();
  
  // Check if the user has an advanced plan
  if (!subscription || subscription.plan !== 'advanced') {
    throw new Error('Advanced plan required to upload custom backgrounds');
  }
  
  // Upload the file
  const path = `backgrounds/${user.id}/${Date.now()}-${file.name}`;
  const url = await uploadImage(file, { folder: path });
  
  return url;
}
