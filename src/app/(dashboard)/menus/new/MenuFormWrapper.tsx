"use client";

import { useRouter } from "next/navigation";
import { MenuForm } from "@/components/forms/MenuForm";
import { supabase } from "@/lib/supabase";
import type { Menu } from "@/types/database";

interface MenuFormWrapperProps {
  businessId: string;
}

export function MenuFormWrapper({ businessId }: MenuFormWrapperProps) {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Menu>) => {
    const { error } = await supabase
      .from("menus")
      .insert({
        ...data,
        business_id: businessId,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    router.push("/menus");
    router.refresh();
  };

  return <MenuForm onSubmit={handleSubmit} />;
}
