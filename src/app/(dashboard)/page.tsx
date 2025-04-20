import { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  QrCodeIcon,
  UsersIcon,
  DocumentTextIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Dashboard - On Our Menu",
  description: "Manage your restaurant's digital menu and QR codes",
};

const stats = [
  {
    name: "Total Menus",
    value: "0",
    icon: DocumentTextIcon,
    change: "+0%",
    changeType: "positive",
  },
  {
    name: "QR Code Scans",
    value: "0",
    icon: QrCodeIcon,
    change: "+0%",
    changeType: "positive",
  },
  {
    name: "Menu Views",
    value: "0",
    icon: EyeIcon,
    change: "+0%",
    changeType: "positive",
  },
  {
    name: "Unique Visitors",
    value: "0",
    icon: UsersIcon,
    change: "+0%",
    changeType: "positive",
  },
];

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Here&apos;s what&apos;s happening with your restaurant&apos;s digital menu.
        </p>
      </div>

      {/* Stats */}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      {/* Get Started Section */}
      <div className="mt-8 rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Getting Started
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Create your first menu and start generating QR codes for your
              restaurant. Your customers will be able to view your menu by scanning
              the QR code with their phone.
            </p>
          </div>
          <div className="mt-5">
            <a
              href="/dashboard/menus/new"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create your first menu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
