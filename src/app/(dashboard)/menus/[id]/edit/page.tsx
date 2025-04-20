import { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { MenuFormWrapper } from "./MenuFormWrapper";

export const metadata: Metadata = {
  title: "Edit Menu - On Our Menu",
  description: "Edit your restaurant's digital menu.",
};

interface EditMenuPageProps {
  params: {
    id: string;
  };
}

export default async function EditMenuPage({ params }: EditMenuPageProps) {
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

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Edit Menu: {menu.name}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Update your menu&apos;s details. You can manage categories and items after
            saving these changes.
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
                <MenuFormWrapper businessId={business.id} menu={menu} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
