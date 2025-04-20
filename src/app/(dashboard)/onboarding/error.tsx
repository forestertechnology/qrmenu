"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function OnboardingError({
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
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              There was an error setting up your business profile
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error.message || "Please try again later."}</p>
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
                  <a href="/dashboard">Go to dashboard</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Need help? Contact our support team at{" "}
          <a
            href="mailto:support@onourmenu.com"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            support@onourmenu.com
          </a>
        </p>
      </div>
    </div>
  );
}
