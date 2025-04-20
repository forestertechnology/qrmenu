"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { BusinessForm } from "@/components/forms/BusinessForm";
import type { Business } from "@/types/database";

interface BusinessFormWrapperProps {
  userId: string;
}

export function BusinessFormWrapper({ userId }: BusinessFormWrapperProps) {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Business>) => {
    const { error } = await supabase
      .from("businesses")
      .insert({
        ...data,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    router.push("/dashboard");
  };

  return <BusinessForm onSubmit={handleSubmit} />;
}
