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
  ViewfinderCircleIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";
import type { Category } from "@/types/database";

interface CategoryWithItems extends Category {
  _count?: {
    menu_items: number;
  };
}

interface CategoryListProps {
  initialData: CategoryWithItems[];
  menuId: string;
}

export function CategoryList({ initialData, menuId }: CategoryListProps) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialData);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<CategoryWithItems | null>(null);

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category and all its items?")) return;

    setIsDeleting(categoryId);
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", categoryId)
        .eq("menu_id", menuId);

      if (error) throw error;

      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
      router.refresh();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleDragStart = (category: CategoryWithItems) => {
    setIsDragging(true);
    setDraggedItem(category);
  };

  const handleDragOver = (e: React.DragEvent, category: CategoryWithItems) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === category.id) return;

    const newCategories = [...categories];
    const draggedIndex = newCategories.findIndex((cat) => cat.id === draggedItem.id);
    const hoverIndex = newCategories.findIndex((cat) => cat.id === category.id);

    // Swap positions
    newCategories[draggedIndex] = category;
    newCategories[hoverIndex] = draggedItem;

    setCategories(newCategories);
  };

  const handleDragEnd = async () => {
    setIsDragging(false);
    setDraggedItem(null);

    // Update display order in database
    try {
      const updates = categories.map((category, index) => ({
        id: category.id,
        display_order: index,
      }));

      const { error } = await supabase
        .from("categories")
        .upsert(updates, { onConflict: "id" });

      if (error) throw error;
    } catch (error) {
      console.error("Error updating category order:", error);
      alert("Failed to update category order. Please try again.");
    }
  };

  if (categories.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <ul role="list" className="divide-y divide-gray-200">
        {categories.map((category) => (
          <li
            key={category.id}
            draggable
            onDragStart={() => handleDragStart(category)}
            onDragOver={(e) => handleDragOver(e, category)}
            onDragEnd={handleDragEnd}
            className={`relative flex items-center justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 ${
              isDragging ? "cursor-move" : ""
            } ${draggedItem?.id === category.id ? "opacity-50" : ""}`}
          >
            <div className="min-w-0 flex items-center gap-x-4">
              <ArrowsUpDownIcon
                className="h-5 w-5 flex-none text-gray-400 cursor-move"
                aria-hidden="true"
              />
              {category.image_url ? (
                <Image
                  src={category.image_url}
                  alt={category.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 flex-none rounded-lg bg-gray-100 object-cover"
                />
              ) : (
                <div className="h-12 w-12 flex-none rounded-lg bg-gray-100" />
              )}
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {category.name}
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {category._count?.menu_items || 0} items
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
                <Link href={`/menus/${menuId}/categories/${category.id}/items`}>
                  <ViewfinderCircleIcon className="h-5 w-5" />
                  <span className="sr-only">View items</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:block"
              >
                <Link href={`/menus/${menuId}/categories/${category.id}/edit`}>
                  <PencilIcon className="h-5 w-5" />
                  <span className="sr-only">Edit category</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(category.id)}
                disabled={isDeleting === category.id}
                className="hidden sm:block"
              >
                <TrashIcon className="h-5 w-5 text-red-500" />
                <span className="sr-only">Delete category</span>
              </Button>

              {/* Mobile actions */}
              <Button
                variant="ghost"
                asChild
                className="sm:hidden"
              >
                <Link href={`/menus/${menuId}/categories/${category.id}/actions`}>
                  <span className="sr-only">View category actions</span>
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
