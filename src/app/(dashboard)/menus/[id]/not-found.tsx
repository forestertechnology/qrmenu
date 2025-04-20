import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function MenuNotFound() {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Menu Not Found
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              The menu you&apos;re looking for doesn&apos;t exist or you don&apos;t have
              permission to access it.
            </p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <Button
                variant="outline"
                asChild
                className="ml-3"
              >
                <Link href="/menus">Back to menus</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="ml-3"
              >
                <Link href="/menus/new">Create new menu</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-yellow-100 pt-4">
        <p className="text-sm text-yellow-700">
          If you believe this is a mistake, please contact our support team at{" "}
          <a
            href="mailto:support@onourmenu.com"
            className="font-medium text-yellow-800 underline"
          >
            support@onourmenu.com
          </a>
        </p>
      </div>
    </div>
  );
}
