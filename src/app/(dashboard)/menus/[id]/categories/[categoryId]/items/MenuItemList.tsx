"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import {
  PencilIcon,
  TrashIcon,
  CurrencyDollarIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import type { MenuItem } from "@/types/database";

interface MenuItemWithDetails extends MenuItem {
  _count?: {
    options: number;
  };
}

interface MenuItemListProps {
  initialData: MenuItemWithDetails[];
  menuId: string;
  categoryId: string;
}

export function MenuItemList({
  initialData,
  menuId,
  categoryId,
}: MenuItemListProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialData);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setIsDeleting(itemId);
    try {
      const { error } = await supabase
        .from("menu_items")
        .delete()
        .eq("id", itemId)
        .eq("category_id", categoryId);

      if (error) throw error;

      setItems((prev) => prev.filter((item) => item.id !== itemId));
      router.refresh();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <ul role="list" className="divide-y divide-gray-200">
        {items.map((item) => (
          <li
            key={item.id}
            className="relative flex items-center justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
          >
            <div className="min-w-0 flex items-center gap-x-4">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 flex-none rounded-lg bg-gray-100 object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-gray-100">
                  <PhotoIcon className="h-6 w-6 text-gray-400" />
                </div>
              )}
              <div className="min-w-0 flex-auto">
                <div className="flex items-start gap-x-2">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-x-1">
                    <CurrencyDollarIcon className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-gray-500">{item.price}</p>
                  </div>
                </div>
                {item.description && (
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {item.description}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {item._count?.options || 0} options/variants
                </p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:block"
              >
                <Link href={`/menus/${menuId}/categories/${categoryId}/items/${item.id}/options`}>
                  <CurrencyDollarIcon className="h-5 w-5" />
                  <span className="sr-only">Manage options</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:block"
              >
                <Link href={`/menus/${menuId}/categories/${categoryId}/items/${item.id}/edit`}>
                  <PencilIcon className="h-5 w-5" />
                  <span className="sr-only">Edit item</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(item.id)}
                disabled={isDeleting === item.id}
                className="hidden sm:block"
              >
                <TrashIcon className="h-5 w-5 text-red-500" />
                <span className="sr-only">Delete item</span>
              </Button>

              {/* Mobile actions */}
              <Button
                variant="ghost"
                asChild
                className="sm:hidden"
              >
                <Link href={`/menus/${menuId}/categories/${categoryId}/items/${item.id}/actions`}>
                  <span className="sr-only">View item actions</span>
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.5-4.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
