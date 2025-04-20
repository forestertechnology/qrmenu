import React from 'react';
import Image from 'next/image';
import { QRCode } from './QRCode';
import { cn } from '@/utils/cn';

interface FlyerPreviewProps {
  restaurantName?: string;
  logoUrl?: string | null;
  backgroundUrl?: string | null;
  qrCodeUrl: string;
  className?: string;
}

/**
 * Preview component for QR code flyers
 */
export function FlyerPreview({
  restaurantName,
  logoUrl,
  backgroundUrl,
  qrCodeUrl,
  className,
}: FlyerPreviewProps) {
  return (
    <div
      className={cn(
        'relative w-full max-w-md aspect-[2/3] rounded-lg overflow-hidden shadow-lg mx-auto',
        className
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gray-100">
        {backgroundUrl && (
          <Image
            src={backgroundUrl}
            alt="Background"
            fill
            className="object-cover"
          />
        )}
        {/* Semi-transparent overlay for better text readability */}
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full p-6">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">{restaurantName}</h2>
          {logoUrl && (
            <div className="relative w-24 h-24 overflow-hidden rounded-full">
              <Image
                src={logoUrl}
                alt={`${restaurantName || 'Restaurant'} logo`}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center">
          <QRCode value={qrCodeUrl} size={180} />
          <p className="mt-4 text-sm font-medium text-gray-700">
            Scan to view our menu
          </p>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500">
          <p>Powered by On Our Menu</p>
        </div>
      </div>
    </div>
  );
}
