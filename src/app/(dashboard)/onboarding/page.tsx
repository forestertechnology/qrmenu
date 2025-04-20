import { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BusinessFormWrapper } from "@/components/onboarding/BusinessFormWrapper";

export const metadata: Metadata = {
  title: "Business Setup - On Our Menu",
  description: "Set up your restaurant's profile to get started with On Our Menu.",
};

export default async function OnboardingPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if user already has a business profile
  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // If they already have a business profile, redirect to dashboard
  if (business) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
          Welcome to On Our Menu!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Let&apos;s set up your restaurant&apos;s profile to get started. This information
          will be used to create your digital menu and QR codes.
        </p>
      </div>

      <div className="mt-8">
        <BusinessFormWrapper userId={user.id} />
      </div>
    </div>
  );
}
