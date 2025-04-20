import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';

// Define the background image options
export const BACKGROUND_IMAGES = [
  {
    id: 'bg-1',
    name: 'Minimal White',
    url: '/backgrounds/minimal-white.jpg',
    planLevel: 'free',
  },
  {
    id: 'bg-2',
    name: 'Light Wood',
    url: '/backgrounds/light-wood.jpg',
    planLevel: 'free',
  },
  {
    id: 'bg-3',
    name: 'Dark Wood',
    url: '/backgrounds/dark-wood.jpg',
    planLevel: 'free',
  },
  {
    id: 'bg-4',
    name: 'Marble',
    url: '/backgrounds/marble.jpg',
    planLevel: 'free',
  },
  {
    id: 'bg-5',
    name: 'Concrete',
    url: '/backgrounds/concrete.jpg',
    planLevel: 'free',
  },
  {
    id: 'bg-6',
    name: 'Slate',
    url: '/backgrounds/slate.jpg',
    planLevel: 'free',
  },
  {
    id: 'bg-7',
    name: 'Linen',
    url: '/backgrounds/linen.jpg',
    planLevel: 'free',
  },
  {
    id: 'bg-8',
    name: 'Chalkboard',
    url: '/backgrounds/chalkboard.jpg',
    planLevel: 'free',
  },
  {
    id: 'bg-9',
    name: 'Rustic',
    url: '/backgrounds/rustic.jpg',
    planLevel: 'free',
  },
  {
    id: 'bg-10',
    name: 'Vintage Paper',
    url: '/backgrounds/vintage-paper.jpg',
    planLevel: 'free',
  },
  {
    id: 'bg-11',
    name: 'Elegant Gold',
    url: '/backgrounds/elegant-gold.jpg',
    planLevel: 'advanced',
  },
  {
    id: 'bg-12',
    name: 'Modern Black',
    url: '/backgrounds/modern-black.jpg',
    planLevel: 'advanced',
  },
  {
    id: 'bg-13',
    name: 'Botanical',
    url: '/backgrounds/botanical.jpg',
    planLevel: 'advanced',
  },
  {
    id: 'bg-14',
    name: 'Geometric',
    url: '/backgrounds/geometric.jpg',
    planLevel: 'advanced',
  },
  {
    id: 'bg-15',
    name: 'Watercolor',
    url: '/backgrounds/watercolor.jpg',
    planLevel: 'advanced',
  },
];

interface BackgroundSelectorProps {
  selectedBackground: string | null;
  onSelect: (backgroundUrl: string) => void;
  planLevel: 'free' | 'advanced';
  customBackgroundUrl?: string | null;
  onCustomBackgroundSelect?: (file: File) => void;
  className?: string;
}

/**
 * Component for selecting background images for QR code flyers
 */
export function BackgroundSelector({
  selectedBackground,
  onSelect,
  planLevel,
  customBackgroundUrl,
  onCustomBackgroundSelect,
  className,
}: BackgroundSelectorProps) {
  // Filter backgrounds based on plan level
  const availableBackgrounds = BACKGROUND_IMAGES.filter(
    (bg) => bg.planLevel === 'free' || planLevel === 'advanced'
  );

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onCustomBackgroundSelect) {
      onCustomBackgroundSelect(e.target.files[0]);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-medium">Select Background</h3>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {availableBackgrounds.map((background) => (
          <button
            key={background.id}
            type="button"
            className={cn(
              'relative aspect-[2/3] overflow-hidden rounded-md border-2 transition-all',
              selectedBackground === background.url
                ? 'border-blue-500 ring-2 ring-blue-300'
                : 'border-gray-200 hover:border-gray-300'
            )}
            onClick={() => onSelect(background.url)}
          >
            <Image
              src={background.url}
              alt={background.name}
              fill
              className="object-cover"
            />
            <span className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-xs text-white">
              {background.name}
            </span>
          </button>
        ))}

        {/* Custom background upload (advanced plan only) */}
        {planLevel === 'advanced' && onCustomBackgroundSelect && (
          <div
            className={cn(
              'relative aspect-[2/3] overflow-hidden rounded-md border-2 border-dashed transition-all',
              customBackgroundUrl && selectedBackground === customBackgroundUrl
                ? 'border-blue-500 ring-2 ring-blue-300'
                : 'border-gray-300 hover:border-gray-400'
            )}
          >
            {customBackgroundUrl ? (
              <>
                <button
                  type="button"
                  className="absolute inset-0 z-10"
                  onClick={() => onSelect(customBackgroundUrl)}
                >
                  <Image
                    src={customBackgroundUrl}
                    alt="Custom background"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-xs text-white">
                    Custom
                  </span>
                </button>
              </>
            ) : (
              <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="mt-2 text-xs font-medium text-gray-500">
                  Upload Custom
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        )}
      </div>

      {planLevel === 'free' && (
        <p className="text-xs text-gray-500">
          Upgrade to the Advanced plan to upload custom backgrounds and access
          more options.
        </p>
      )}
    </div>
  );
}
