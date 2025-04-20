import { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { MenuItemList } from "./MenuItemList";

export const metadata: Metadata = {
  title: "Menu Items - On Our Menu",
  description: "Manage your menu items.",
};

interface MenuItemsPageProps {
  params: {
    id: string;
    categoryId: string;
  };
}

export default async function MenuItemsPage({ params }: MenuItemsPageProps) {
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

  // Get the category
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("id", params.categoryId)
    .eq("menu_id", menu.id)
    .single();

  // If category doesn't exist or doesn't belong to this menu
  if (!category) {
    notFound();
  }

  // Get user's subscription plan
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_plan")
    .eq("id", user.id)
    .single();

  // Get menu's items with options count
  const { data: items } = await supabase
    .from("menu_items")
    .select(`
      *,
      menu_item_options (count)
    `)
    .eq("category_id", category.id)
    .order("display_order", { ascending: true });

  // Transform the data to match the expected format
  const transformedItems = items?.map(item => ({
    ...item,
    _count: {
      options: item.menu_item_options.count
    }
  }));

  // Check if user has reached their item limit
  const itemLimit = profile?.subscription_plan === "advanced" ? 100 : 50;
  const canCreateItem = !items || items.length < itemLimit;

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            Items: {category.name}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Add and manage items in this category. Each item can have its own
            image, description, and pricing options.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {canCreateItem ? (
            <Button asChild>
              <Link href={`/menus/${menu.id}/categories/${category.id}/items/new`}>
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Item
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/pricing">
                Upgrade to add more items
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <MenuItemList 
          initialData={transformedItems ?? []} 
          menuId={menu.id}
          categoryId={category.id}
        />
      </div>

      {(!items || items.length === 0) && (
        <div className="mt-16 text-center">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No items
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new menu item.
          </p>
          {canCreateItem && (
            <div className="mt-6">
              <Button asChild>
                <Link href={`/menus/${menu.id}/categories/${category.id}/items/new`}>
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Item
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
