"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function CategoriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Error Loading Categories
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error.message || "An unexpected error occurred."}</p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <Button
                variant="outline"
                onClick={() => reset()}
                className="ml-3"
              >
                Try again
              </Button>
              <Button
                variant="outline"
                asChild
                className="ml-3"
              >
                <a href="/menus">Back to menus</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-red-100 pt-4">
        <p className="text-sm text-red-700">
          If this error persists, please contact our support team at{" "}
          <a
            href="mailto:support@onourmenu.com"
            className="font-medium text-red-800 underline"
          >
            support@onourmenu.com
          </a>
        </p>
      </div>
    </div>
  );
}
