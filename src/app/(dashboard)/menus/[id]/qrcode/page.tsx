'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FlyerPreview } from '@/components/qrcode/FlyerPreview';
import { BackgroundSelector } from '@/components/qrcode/BackgroundSelector';
import { generateQRCodeFlyer, getMenuQRCodeUrl, uploadBackgroundImage } from '@/app/api/qrcode/actions';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Menu, Business } from '@/types/database';

interface MenuWithRestaurant extends Menu {
  restaurants: Business;
}

export default function QRCodePage() {
  const { id } = useParams<{ id: string }>();
  const [menu, setMenu] = useState<MenuWithRestaurant | null>(null);
  const [restaurant, setRestaurant] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<'free' | 'advanced'>('free');
  const [downloadLoading, setDownloadLoading] = useState(false);

  // Fetch menu and restaurant data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Get the menu
        const { data: menuData, error: menuError } = await supabase
          .from('menus')
          .select('*, restaurants(*)')
          .eq('id', id)
          .single();
        
        if (menuError) throw new Error(menuError.message);
        if (!menuData) throw new Error('Menu not found');
        
        setMenu(menuData);
        setRestaurant(menuData.restaurants);
        
        // Get the user's subscription plan
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');
        
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('plan')
          .eq('user_id', user.id)
          .single();
        
        setUserPlan(subscription?.plan === 'advanced' ? 'advanced' : 'free');
        
        // Get the QR code URL
        const url = await getMenuQRCodeUrl(id);
        setQrCodeUrl(url);
        
        // Set default background
        setSelectedBackground('/backgrounds/minimal-white.jpg');
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [id]);

  // Handle background selection
  const handleBackgroundSelect = (backgroundUrl: string) => {
    setSelectedBackground(backgroundUrl);
  };

  // Handle custom background upload
  const handleCustomBackgroundUpload = async (file: File) => {
    try {
      setLoading(true);
      const url = await uploadBackgroundImage(file);
      setCustomBackgroundUrl(url);
      setSelectedBackground(url);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle flyer download
  const handleDownload = async () => {
    try {
      setDownloadLoading(true);
      
      // Generate the flyer data URL
      const flyerDataUrl = await generateQRCodeFlyer(id, selectedBackground);
      
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = flyerDataUrl;
      link.download = `${restaurant?.name?.replace(/\s+/g, '-').toLowerCase() || 'menu'}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setDownloadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-700">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">QR Code for {menu?.name}</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left column: QR code and download button */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">QR Code Flyer Preview</h2>
            <FlyerPreview
              restaurantName={restaurant?.name}
              logoUrl={restaurant?.logo_url}
              backgroundUrl={selectedBackground}
              qrCodeUrl={qrCodeUrl}
            />
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={handleDownload}
              disabled={downloadLoading}
              className="w-full max-w-md"
            >
              {downloadLoading ? 'Generating...' : 'Download QR Code Flyer'}
            </Button>
          </div>
          
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">QR Code URL</h2>
            <div className="break-all rounded-md bg-gray-100 p-3 font-mono text-sm">
              {qrCodeUrl}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              This is the URL that customers will be directed to when they scan the QR code.
            </p>
          </div>
        </div>
        
        {/* Right column: Background selection */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <BackgroundSelector
            selectedBackground={selectedBackground}
            onSelect={handleBackgroundSelect}
            planLevel={userPlan}
            customBackgroundUrl={customBackgroundUrl}
            onCustomBackgroundSelect={handleCustomBackgroundUpload}
          />
        </div>
      </div>
    </div>
  );
}
