"use client";

import { useRouter } from "next/navigation";
import { CategoryForm } from "@/components/forms/CategoryForm";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/types/database";

interface CategoryFormWrapperProps {
  menuId: string;
  category: Category;
}

export function CategoryFormWrapper({
  menuId,
  category,
}: CategoryFormWrapperProps) {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Category>) => {
    const { error } = await supabase
      .from("categories")
      .update({
        ...data,
        menu_id: menuId,
      })
      .eq("id", category.id)
      .eq("menu_id", menuId)
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
      initialData={category}
    />
  );
}
