import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = "menu-images";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface UploadOptions {
  folder?: string;
  maxWidth?: number;
  maxHeight?: number;
}

export class ImageUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageUploadError";
  }
}

/**
 * Validates an image file before upload
 */
function validateImage(file: File) {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new ImageUploadError(
      "Invalid file type. Please upload a JPEG, PNG, or WebP image."
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new ImageUploadError(
      "File size too large. Maximum size is 5MB."
    );
  }
}

/**
 * Resizes an image to fit within the specified dimensions while maintaining aspect ratio
 */
async function resizeImage(
  file: File,
  maxWidth: number = 1200,
  maxHeight: number = 1200
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not create blob from canvas"));
            return;
          }
          resolve(blob);
        },
        file.type,
        0.9
      );
    };
    img.onerror = () => {
      reject(new Error("Could not load image"));
    };
  });
}

/**
 * Uploads an image to Supabase storage
 */
export async function uploadImage(
  file: File,
  options: UploadOptions = {}
): Promise<string> {
  try {
    // Validate the file
    validateImage(file);

    // Resize the image if needed
    const resizedImage = await resizeImage(
      file,
      options.maxWidth,
      options.maxHeight
    );

    // Generate a unique file name
    const ext = file.name.split(".").pop();
    const fileName = `${options.folder ? options.folder + "/" : ""}${uuidv4()}.${ext}`;

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, resizedImage, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      throw new ImageUploadError(error.message);
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    if (error instanceof ImageUploadError) {
      throw error;
    }
    throw new ImageUploadError("Failed to upload image");
  }
}

/**
 * Deletes an image from Supabase storage
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    // Extract the file path from the URL
    const path = url.split(`${BUCKET_NAME}/`)[1];
    if (!path) {
      throw new ImageUploadError("Invalid image URL");
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      throw new ImageUploadError(error.message);
    }
  } catch (error) {
    if (error instanceof ImageUploadError) {
      throw error;
    }
    throw new ImageUploadError("Failed to delete image");
  }
}
