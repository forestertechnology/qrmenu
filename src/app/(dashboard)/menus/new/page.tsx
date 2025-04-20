import { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MenuFormWrapper } from "./MenuFormWrapper";

export const metadata: Metadata = {
  title: "Create Menu - On Our Menu",
  description: "Create a new digital menu for your restaurant.",
};

export default async function NewMenuPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user's business profile
  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // If they don't have a business profile, redirect to onboarding
  if (!business) {
    redirect("/onboarding");
  }

  // Get user's subscription plan
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_plan")
    .eq("id", user.id)
    .single();

  // Get user's menus to check against limit
  const { data: menus } = await supabase
    .from("menus")
    .select("id")
    .eq("business_id", business.id);

  // Check if user has reached their menu limit
  const menuLimit = profile?.subscription_plan === "advanced" ? 5 : 1;
  if (menus && menus.length >= menuLimit) {
    redirect("/pricing?reason=menu_limit");
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Create New Menu
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Create a new digital menu for your restaurant. You can add categories
            and items after creating the menu.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Menu Details
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed at the top of your menu when
                customers scan the QR code.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <MenuFormWrapper businessId={business.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
