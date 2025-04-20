"use client";

import { useRouter } from "next/navigation";
import { MenuItemForm } from "@/components/forms/MenuItemForm";
import { supabase } from "@/lib/supabase";
import type { MenuItem } from "@/types/database";

interface MenuItemFormWrapperProps {
  categoryId: string;
  initialDisplayOrder: number;
}

export function MenuItemFormWrapper({
  categoryId,
  initialDisplayOrder,
}: MenuItemFormWrapperProps) {
  const router = useRouter();

  const handleSubmit = async (data: Partial<MenuItem>) => {
    const { error } = await supabase
      .from("menu_items")
      .insert({
        ...data,
        category_id: categoryId,
        display_order: initialDisplayOrder,
        dietary_info: {
          vegetarian: data.dietary_info?.vegetarian || false,
          vegan: data.dietary_info?.vegan || false,
          gluten_free: data.dietary_info?.gluten_free || false,
          contains_nuts: data.dietary_info?.contains_nuts || false,
          spicy: data.dietary_info?.spicy || false,
        },
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    router.push(`/menus/${categoryId}/items`);
    router.refresh();
  };

  return (
    <MenuItemForm
      onSubmit={handleSubmit}
      initialData={{ display_order: initialDisplayOrder }}
    />
  );
}
