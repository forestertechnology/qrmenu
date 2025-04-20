import { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { CategoryList } from "./CategoryList";

export const metadata: Metadata = {
  title: "Menu Categories - On Our Menu",
  description: "Manage your menu's categories and items.",
};

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
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

  // Get the menu
  const { data: menu } = await supabase
    .from("menus")
    .select("*")
    .eq("id", params.id)
    .eq("business_id", business.id)
    .single();

  // If menu doesn't exist or doesn't belong to this business
  if (!menu) {
    notFound();
  }

  // Get user's subscription plan
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_plan")
    .eq("id", user.id)
    .single();

  // Get menu's categories to check against limit
  const { data: categories } = await supabase
    .from("categories")
    .select("id")
    .eq("menu_id", menu.id);

  // Check if user has reached their category limit
  const categoryLimit = profile?.subscription_plan === "advanced" ? 20 : 5;
  const canCreateCategory = !categories || categories.length < categoryLimit;

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            Categories: {menu.name}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Organize your menu items into categories. Each category can have its own
            image and description.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {canCreateCategory ? (
            <Button asChild>
              <Link href={`/menus/${menu.id}/categories/new`}>
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Category
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/pricing">
                Upgrade to create more categories
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <CategoryList 
          initialData={categories ?? []} 
          menuId={menu.id} 
        />
      </div>

      {(!categories || categories.length === 0) && (
        <div className="mt-16 text-center">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No categories
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new category.
          </p>
          {canCreateCategory && (
            <div className="mt-6">
              <Button asChild>
                <Link href={`/menus/${menu.id}/categories/new`}>
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Category
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
