import { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { MenuList } from "./MenuList";

export const metadata: Metadata = {
  title: "Menus - On Our Menu",
  description: "Manage your restaurant's digital menus.",
};

export default async function MenusPage() {
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

  // Get user's menus
  const { data: menus } = await supabase
    .from("menus")
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq("business_id", business.id)
    .order("created_at", { ascending: false });

  // Check if user has reached their menu limit
  const menuLimit = profile?.subscription_plan === "advanced" ? 5 : 1;
  const canCreateMenu = !menus || menus.length < menuLimit;

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            Menus
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Create and manage your restaurant&apos;s digital menus. Each menu will have
            its own QR code that customers can scan.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {canCreateMenu ? (
            <Button asChild>
              <Link href="/menus/new">
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Menu
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/pricing">
                Upgrade to create more menus
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <MenuList 
          initialData={menus ?? []} 
          businessId={business.id} 
        />
      </div>

      {(!menus || menus.length === 0) && (
        <div className="mt-16 text-center">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No menus
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new menu.
          </p>
          {canCreateMenu && (
            <div className="mt-6">
              <Button asChild>
                <Link href="/menus/new">
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Menu
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
