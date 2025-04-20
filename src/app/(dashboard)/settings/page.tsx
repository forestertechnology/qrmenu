import { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BusinessFormWrapper } from "./BusinessFormWrapper";

export const metadata: Metadata = {
  title: "Settings - On Our Menu",
  description: "Manage your restaurant's profile and settings.",
};

export default async function SettingsPage() {
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

  return (
    <div>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
          Business Settings
        </h1>
      </div>

      <div className="mt-8 max-w-3xl">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Business Profile
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Update your restaurant&apos;s information. This will be displayed on your
                digital menu.
              </p>
            </div>
            <div className="mt-5">
              <BusinessFormWrapper userId={user.id} initialData={business} />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Subscription Plan
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                You are currently on the{" "}
                <span className="font-medium capitalize">
                  {business.subscription_plan}
                </span>{" "}
                plan.
              </p>
            </div>
            <div className="mt-5">
              <a
                href="/pricing"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                View Plans & Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
