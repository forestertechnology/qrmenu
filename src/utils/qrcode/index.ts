import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import { QRCodeToDataURLOptions, QRCodeToBufferOptions, QRCodeErrorCorrectionLevel } from 'qrcode';

// QR Code generation options
const QR_CODE_OPTIONS: QRCodeToDataURLOptions & QRCodeToBufferOptions = {
  errorCorrectionLevel: 'H' as QRCodeErrorCorrectionLevel,
  margin: 1,
  width: 200,
  color: {
    dark: '#000000',
    light: '#FFFFFF',
  },
};

/**
 * Generate a QR code as a data URL
 * @param url The URL to encode in the QR code
 * @returns A Promise that resolves to a data URL
 */
export async function generateQRCodeDataURL(url: string): Promise<string> {
  try {
    return await QRCode.toDataURL(url, QR_CODE_OPTIONS);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generate a QR code as a Buffer
 * @param url The URL to encode in the QR code
 * @returns A Promise that resolves to a Buffer
 */
export async function generateQRCodeBuffer(url: string): Promise<Buffer> {
  try {
    return await QRCode.toBuffer(url, QR_CODE_OPTIONS);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

// Flyer template options
export interface FlyerOptions {
  restaurantName: string;
  logoUrl?: string;
  backgroundUrl?: string;
  qrCodeUrl: string;
  width?: number;
  height?: number;
}

/**
 * Generate a flyer with a QR code
 * @param options The options for the flyer
 * @returns A Promise that resolves to a data URL
 */
export async function generateFlyer(options: FlyerOptions): Promise<string> {
  const {
    restaurantName,
    logoUrl,
    backgroundUrl,
    qrCodeUrl,
    width = 800,
    height = 1200,
  } = options;

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Draw background
  if (backgroundUrl) {
    try {
      const backgroundImage = await loadImage(backgroundUrl);
      ctx.drawImage(backgroundImage, 0, 0, width, height);
    } catch (error) {
      console.error('Error loading background image:', error);
      // Use a solid color as fallback
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, width, height);
    }
  } else {
    // Use a solid color as fallback
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);
  }

  // Add semi-transparent overlay for better text readability
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillRect(0, 0, width, height);

  // Draw restaurant name
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(restaurantName, width / 2, 150);

  // Draw logo if available
  if (logoUrl) {
    try {
      const logoImage = await loadImage(logoUrl);
      const logoSize = 150;
      ctx.drawImage(
        logoImage,
        width / 2 - logoSize / 2,
        200,
        logoSize,
        logoSize
      );
    } catch (error) {
      console.error('Error loading logo image:', error);
    }
  }

  // Draw QR code
  try {
    const qrCodeImage = await loadImage(await generateQRCodeDataURL(qrCodeUrl));
    const qrCodeSize = 300;
    ctx.drawImage(
      qrCodeImage,
      width / 2 - qrCodeSize / 2,
      height / 2 - qrCodeSize / 2,
      qrCodeSize,
      qrCodeSize
    );
  } catch (error) {
    console.error('Error drawing QR code:', error);
    throw new Error('Failed to generate flyer');
  }

  // Add instructions
  ctx.fillStyle = '#000000';
  ctx.font = '24px Arial';
  ctx.fillText('Scan to view our menu', width / 2, height / 2 + 200);

  // Return data URL
  return canvas.toDataURL('image/png');
}

/**
 * Generate a flyer with a QR code as a Buffer
 * @param options The options for the flyer
 * @returns A Promise that resolves to a Buffer
 */
export async function generateFlyerBuffer(options: FlyerOptions): Promise<Buffer> {
  const {
    restaurantName,
    logoUrl,
    backgroundUrl,
    qrCodeUrl,
    width = 800,
    height = 1200,
  } = options;

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Draw background
  if (backgroundUrl) {
    try {
      const backgroundImage = await loadImage(backgroundUrl);
      ctx.drawImage(backgroundImage, 0, 0, width, height);
    } catch (error) {
      console.error('Error loading background image:', error);
      // Use a solid color as fallback
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, width, height);
    }
  } else {
    // Use a solid color as fallback
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);
  }

  // Add semi-transparent overlay for better text readability
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillRect(0, 0, width, height);

  // Draw restaurant name
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(restaurantName, width / 2, 150);

  // Draw logo if available
  if (logoUrl) {
    try {
      const logoImage = await loadImage(logoUrl);
      const logoSize = 150;
      ctx.drawImage(
        logoImage,
        width / 2 - logoSize / 2,
        200,
        logoSize,
        logoSize
      );
    } catch (error) {
      console.error('Error loading logo image:', error);
    }
  }

  // Draw QR code
  try {
    const qrCodeImage = await loadImage(await generateQRCodeDataURL(qrCodeUrl));
    const qrCodeSize = 300;
    ctx.drawImage(
      qrCodeImage,
      width / 2 - qrCodeSize / 2,
      height / 2 - qrCodeSize / 2,
      qrCodeSize,
      qrCodeSize
    );
  } catch (error) {
    console.error('Error drawing QR code:', error);
    throw new Error('Failed to generate flyer');
  }

  // Add instructions
  ctx.fillStyle = '#000000';
  ctx.font = '24px Arial';
  ctx.fillText('Scan to view our menu', width / 2, height / 2 + 200);

  // Return buffer
  return canvas.toBuffer('image/png');
}
