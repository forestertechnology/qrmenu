'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function QRCodeError({ error, reset }: ErrorProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="rounded-lg bg-red-50 p-6 text-center max-w-md">
        <h2 className="mb-2 text-xl font-semibold text-red-700">Error</h2>
        <p className="mb-4 text-red-600">{error.message || 'An error occurred while loading the QR code generator.'}</p>
        <Button onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
