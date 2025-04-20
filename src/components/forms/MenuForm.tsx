"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import type { MenuWithCategories } from "@/types/index";

const menuSchema = z.object({
  name: z.string().min(1, "Menu name is required"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  is_active: z.boolean().default(true),
  background_url: z.string().optional(),
});

type MenuFormData = z.infer<typeof menuSchema>;

interface MenuFormProps {
  initialData?: Partial<MenuWithCategories>;
  onSubmit: (data: MenuFormData) => Promise<void>;
  isLoading?: boolean;
}

export function MenuForm({
  initialData,
  onSubmit,
  isLoading = false,
}: MenuFormProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.background_url || null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuFormData>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      is_active: initialData?.is_active ?? true,
      background_url: initialData?.background_url,
    },
  });

  const onFormSubmit = handleSubmit(async (data) => {
    try {
      await onSubmit({
        ...data,
        background_url: imageUrl || undefined,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  });

  return (
    <form onSubmit={onFormSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Menu Name
        </label>
        <input
          type="text"
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Background Image
        </label>
        <p className="mt-1 text-sm text-gray-500">
          Upload an image to use as the menu background. This will be displayed
          behind your menu items.
        </p>
        <div className="mt-2">
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            onError={setError}
            folder="menus"
            maxWidth={1920}
            maxHeight={1080}
            aspectRatio="wide"
            className="h-64"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("is_active")}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Menu is currently active
          </label>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Menu"}
        </Button>
      </div>
    </form>
  );
}
