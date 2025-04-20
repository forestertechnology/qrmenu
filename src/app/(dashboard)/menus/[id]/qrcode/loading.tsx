import React from 'react';

export default function QRCodeLoading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 mx-auto"></div>
        <p>Loading QR code generator...</p>
      </div>
    </div>
  );
}
