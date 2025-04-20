"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import type { Business } from "@/types/database";

const businessSchema = z.object({
  contact_name: z.string().min(1, "Contact name is required"),
  contact_email: z.string().email("Invalid email address"),
  contact_phone: z.string().min(10, "Phone number must be at least 10 digits"),
  phone_type: z.enum(["cell", "landline"]),
  business_name: z.string().min(1, "Business name is required"),
  business_phone: z.string().min(10, "Phone number must be at least 10 digits"),
  business_address: z.string().min(1, "Business address is required"),
  business_email: z.string().email("Invalid email address"),
  business_website: z.string().url("Invalid URL").optional(),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  logo_url: z.string().optional(),
});

type BusinessFormData = z.infer<typeof businessSchema>;

interface BusinessFormProps {
  initialData?: Partial<Business>;
  onSubmit: (data: BusinessFormData) => Promise<void>;
  isLoading?: boolean;
}

export function BusinessForm({
  initialData,
  onSubmit,
  isLoading = false,
}: BusinessFormProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.logo_url || null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      phone_type: "cell",
      business_name: "",
      business_phone: "",
      business_address: "",
      business_email: "",
      business_website: "",
      description: "",
      logo_url: "",
      ...initialData,
    },
  });

  const onFormSubmit = handleSubmit(async (data) => {
    try {
      await onSubmit({
        ...data,
        logo_url: imageUrl || undefined,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  });

  return (
    <form onSubmit={onFormSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Contact Information
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Contact Name
            </label>
            <input
              type="text"
              {...register("contact_name")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.contact_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.contact_name.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Contact Email
            </label>
            <input
              type="email"
              {...register("contact_email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.contact_email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.contact_email.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Contact Phone
            </label>
            <input
              type="tel"
              {...register("contact_phone")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.contact_phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.contact_phone.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Phone Type
            </label>
            <select
              {...register("phone_type")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="cell">Cell</option>
              <option value="landline">Landline</option>
            </select>
            {errors.phone_type && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone_type.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Business Information
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Business Name
            </label>
            <input
              type="text"
              {...register("business_name")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.business_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.business_name.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Business Phone
            </label>
            <input
              type="tel"
              {...register("business_phone")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.business_phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.business_phone.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">
              Business Address
            </label>
            <input
              type="text"
              {...register("business_address")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.business_address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.business_address.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Business Email
            </label>
            <input
              type="email"
              {...register("business_email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.business_email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.business_email.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Business Website
            </label>
            <input
              type="url"
              {...register("business_website")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.business_website && (
              <p className="mt-1 text-sm text-red-600">
                {errors.business_website.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-6">
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

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">
              Business Logo
            </label>
            <div className="mt-2">
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                onError={setError}
                folder="logos"
                maxWidth={400}
                maxHeight={400}
                aspectRatio="square"
                className="h-40"
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Business"}
        </Button>
      </div>
    </form>
  );
}
