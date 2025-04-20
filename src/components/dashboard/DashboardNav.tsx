import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import {
  HomeIcon,
  QrCodeIcon,
  Squares2X2Icon,
  CogIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  { name: "Menus", href: "/dashboard/menus", icon: Squares2X2Icon },
  { name: "QR Codes", href: "/dashboard/qr-codes", icon: QrCodeIcon },
  { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon },
  { name: "Billing", href: "/dashboard/billing", icon: CurrencyDollarIcon },
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
            )}
          >
            <item.icon
              className={cn(
                isActive
                  ? "text-white"
                  : "text-gray-400 group-hover:text-white",
                "mr-3 h-6 w-6 flex-shrink-0"
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
