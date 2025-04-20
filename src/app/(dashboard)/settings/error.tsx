"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function SettingsError({
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
    <div className="min-h-[400px] px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
            500
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Something went wrong
              </h1>
              <p className="mt-1 text-base text-gray-500">
                {error.message || "Please try again later."}
              </p>
            </div>
            <div className="mt-8 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Button onClick={() => reset()}>Try again</Button>
              <Button variant="outline" asChild>
                <a href="/dashboard">Go to dashboard</a>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
