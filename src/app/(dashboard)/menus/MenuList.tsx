"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import {
  QrCodeIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import type { Menu } from "@/types/database";

interface MenuWithCategories extends Menu {
  categories: Array<{
    id: string;
    name: string;
  }>;
  type?: string; // Add type property
}

interface MenuListProps {
  initialData: MenuWithCategories[];
  businessId: string;
}

export function MenuList({ initialData, businessId }: MenuListProps) {
  const router = useRouter();
  const [menus, setMenus] = useState(initialData);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (menuId: string) => {
    if (!confirm("Are you sure you want to delete this menu?")) return;

    setIsDeleting(menuId);
    try {
      const { error } = await supabase
        .from("menus")
        .delete()
        .eq("id", menuId)
        .eq("business_id", businessId);

      if (error) throw error;

      setMenus((prev) => prev.filter((menu) => menu.id !== menuId));
      router.refresh();
    } catch (error) {
      console.error("Error deleting menu:", error);
      alert("Failed to delete menu. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  if (menus.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <ul role="list" className="divide-y divide-gray-200">
        {menus.map((menu) => (
          <li
            key={menu.id}
            className="relative flex items-center justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {menu.name}
                </p>
                <p className="mt-0.5 whitespace-nowrap rounded-md bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  {menu.type}
                </p>
              </div>
              {menu.description && (
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {menu.description}
                </p>
              )}
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">
                  {menu.categories.length} categories
                </p>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="truncate">
                  Updated{" "}
                  {new Date(menu.updated_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
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
                <Link href={`/menu/${menu.id}`}>
                  <EyeIcon className="h-5 w-5" />
                  <span className="sr-only">View menu</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:block"
              >
                <Link href={`/menus/${menu.id}/qrcode`}>
                  <QrCodeIcon className="h-5 w-5" />
                  <span className="sr-only">View QR code</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:block"
              >
                <Link href={`/menus/${menu.id}/edit`}>
                  <PencilIcon className="h-5 w-5" />
                  <span className="sr-only">Edit menu</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(menu.id)}
                disabled={isDeleting === menu.id}
                className="hidden sm:block"
              >
                <TrashIcon className="h-5 w-5 text-red-500" />
                <span className="sr-only">Delete menu</span>
              </Button>

              {/* Mobile actions */}
              <Button
                variant="ghost"
                asChild
                className="sm:hidden"
              >
                <Link href={`/menus/${menu.id}/actions`}>
                  <span className="sr-only">View menu actions</span>
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
