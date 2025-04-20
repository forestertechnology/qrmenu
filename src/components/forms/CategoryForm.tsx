"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import type { Category } from "@/types/database";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  display_order: z.number().int().min(0).default(0),
  image_url: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  initialData?: Partial<Category>;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  isLoading?: boolean;
}

export function CategoryForm({
  initialData,
  onSubmit,
  isLoading = false,
}: CategoryFormProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.image_url || null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      display_order: initialData?.display_order || 0,
      image_url: initialData?.image_url,
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
          Category Name
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
        <label className="block text-sm font-medium text-gray-700">
          Category Image
        </label>
        <p className="mt-1 text-sm text-gray-500">
          Upload an image to represent this category.
        </p>
        <div className="mt-2">
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            onError={setError}
            folder="categories"
            maxWidth={800}
            maxHeight={600}
            aspectRatio="wide"
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
          {isLoading ? "Saving..." : "Save Category"}
        </Button>
      </div>
    </form>
  );
}
