import React from 'react';
import ReactQRCode from 'react-qr-code';
import { cn } from '@/utils/cn';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

/**
 * QR Code component for client-side rendering
 */
export function QRCode({ value, size = 200, className }: QRCodeProps) {
  return (
    <div className={cn('flex items-center justify-center p-4 bg-white rounded-md', className)}>
      <ReactQRCode
        value={value}
        size={size}
        level="H"
        fgColor="#000000"
        bgColor="#FFFFFF"
      />
    </div>
  );
}
