"use client";

import { useRouter } from "next/navigation";
import { CategoryForm } from "@/components/forms/CategoryForm";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/types/database";

interface CategoryFormWrapperProps {
  menuId: string;
  initialDisplayOrder: number;
}

export function CategoryFormWrapper({
  menuId,
  initialDisplayOrder,
}: CategoryFormWrapperProps) {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Category>) => {
    const { error } = await supabase
      .from("categories")
      .insert({
        ...data,
        menu_id: menuId,
        display_order: initialDisplayOrder,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    router.push(`/menus/${menuId}/categories`);
    router.refresh();
  };

  return (
    <CategoryForm
      onSubmit={handleSubmit}
      initialData={{ display_order: initialDisplayOrder }}
    />
  );
}
