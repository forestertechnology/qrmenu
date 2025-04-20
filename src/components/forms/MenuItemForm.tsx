"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import type { MenuItem } from "@/types/database";

const menuItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  price: z.string().min(1, "Price is required"),
  display_order: z.number().int().min(0).default(0),
  is_available: z.boolean().default(true),
  image_url: z.string().optional(),
  dietary_info: z.object({
    vegetarian: z.boolean().default(false),
    vegan: z.boolean().default(false),
    gluten_free: z.boolean().default(false),
    contains_nuts: z.boolean().default(false),
    spicy: z.boolean().default(false),
  }),
});

type MenuItemFormData = z.infer<typeof menuItemSchema>;

interface MenuItemFormProps {
  initialData?: Partial<MenuItem>;
  onSubmit: (data: MenuItemFormData) => Promise<void>;
  isLoading?: boolean;
}

export function MenuItemForm({
  initialData,
  onSubmit,
  isLoading = false,
}: MenuItemFormProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.image_url || null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      display_order: initialData?.display_order || 0,
      is_available: initialData?.is_available ?? true,
      image_url: initialData?.image_url,
      dietary_info: {
        vegetarian: initialData?.dietary_info?.vegetarian ?? false,
        vegan: initialData?.dietary_info?.vegan ?? false,
        gluten_free: initialData?.dietary_info?.gluten_free ?? false,
        contains_nuts: initialData?.dietary_info?.contains_nuts ?? false,
        spicy: initialData?.dietary_info?.spicy ?? false,
      },
    },
  });

  const onFormSubmit = handleSubmit(async (data) => {
    try {
      await onSubmit({
        ...data,
        image_url: imageUrl || undefined,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  });

  return (
    <form onSubmit={onFormSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Item Name
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
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="text"
          {...register("price")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Display Order
        </label>
        <input
          type="number"
          {...register("display_order", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.display_order && (
          <p className="mt-1 text-sm text-red-600">
            {errors.display_order.message}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("is_available")}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Item is currently available
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dietary Information
        </label>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("dietary_info.vegetarian")}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm text-gray-900">Vegetarian</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("dietary_info.vegan")}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm text-gray-900">Vegan</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("dietary_info.gluten_free")}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Gluten Free
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("dietary_info.contains_nuts")}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Contains Nuts
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("dietary_info.spicy")}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm text-gray-900">Spicy</label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Item Image
        </label>
        <p className="mt-1 text-sm text-gray-500">
          Upload an image of this menu item.
        </p>
        <div className="mt-2">
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            onError={setError}
            folder="menu-items"
            maxWidth={800}
            maxHeight={600}
            aspectRatio="square"
            className="h-48"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Item"}
        </Button>
      </div>
    </form>
  );
}
