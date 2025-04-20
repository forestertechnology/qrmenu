"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { BusinessForm } from "@/components/forms/BusinessForm";
import type { Business } from "@/types/database";

interface BusinessFormWrapperProps {
  userId: string;
  initialData: Business;
}

export function BusinessFormWrapper({ userId, initialData }: BusinessFormWrapperProps) {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Business>) => {
    const { error } = await supabase
      .from("businesses")
      .update({
        ...data,
        user_id: userId,
      })
      .eq("id", initialData.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    router.refresh();
  };

  return <BusinessForm initialData={initialData} onSubmit={handleSubmit} />;
}
