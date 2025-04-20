"use client";

import { useRouter } from "next/navigation";
import { MenuForm } from "@/components/forms/MenuForm";
import { supabase } from "@/lib/supabase";
import type { Menu } from "@/types/database";

interface MenuFormWrapperProps {
  businessId: string;
  menu: Menu;
}

export function MenuFormWrapper({ businessId, menu }: MenuFormWrapperProps) {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Menu>) => {
    const { error } = await supabase
      .from("menus")
      .update({
        ...data,
        business_id: businessId,
      })
      .eq("id", menu.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    router.push("/menus");
    router.refresh();
  };

  return <MenuForm initialData={menu} onSubmit={handleSubmit} />;
}
