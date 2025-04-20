import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-full">
      {/* Mobile menu button */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">
          Dashboard
        </div>
        <Link href="/profile">
          <span className="sr-only">Your profile</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white">
            {session.user.email?.[0].toUpperCase()}
          </span>
        </Link>
      </div>

      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Link href="/" className="text-xl font-bold text-white">
                On Our Menu
              </Link>
            </div>
            <DashboardNav />
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-72">
          {/* Top header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex flex-1"></div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <Button variant="ghost" asChild>
                  <Link href="/profile">
                    <span className="sr-only">Your profile</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white">
                      {session.user.email?.[0].toUpperCase()}
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
