"use client";

import { useCallback, useState } from "react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/utils/cn";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  onError: (error: string) => void;
  folder: string;
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: "square" | "wide" | "video";
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onError,
  folder,
  maxWidth = 1920,
  maxHeight = 1080,
  aspectRatio = "square",
  className,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = useCallback(
    async (file: File) => {
      try {
        setIsUploading(true);

        // Create a canvas to resize the image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("Could not get canvas context");
        }

        // Load the image
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise((resolve) => (img.onload = resolve));

        // Calculate dimensions
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        if (aspectRatio === "square") {
          const size = Math.min(maxWidth, maxHeight, width, height);
          width = size;
          height = size;
        } else if (aspectRatio === "wide") {
          const ratio = 16 / 9;
          if (width / height > ratio) {
            width = height * ratio;
          } else {
            height = width / ratio;
          }
        } else if (aspectRatio === "video") {
          const ratio = 16 / 9;
          width = Math.min(width, maxWidth);
          height = width / ratio;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and resize image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.9)
        );

        // Upload to Supabase Storage
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from(folder)
          .upload(fileName, blob);

        if (error) {
          throw error;
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from(folder).getPublicUrl(data.path);

        onChange(publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        onError(error instanceof Error ? error.message : "Error uploading image");
      } finally {
        setIsUploading(false);
      }
    },
    [folder, maxWidth, maxHeight, aspectRatio, onChange, onError]
  );

  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
        className
      )}
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            handleImageUpload(file);
          }
        };
        input.click();
      }}
    >
      {value ? (
        <img
          src={value}
          alt="Uploaded"
          className="h-full w-full rounded-lg object-cover"
        />
      ) : (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">
            {isUploading ? "Uploading..." : "Click to upload"}
          </div>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      )}
    </div>
  );
}
