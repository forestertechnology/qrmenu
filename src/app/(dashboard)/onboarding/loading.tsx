export default function OnboardingLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <div className="h-9 w-64 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-5 w-96 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mt-8 space-y-8">
        {/* Logo Upload Skeleton */}
        <div>
          <div className="mb-2 h-5 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-40 w-40 animate-pulse rounded-lg bg-gray-200" />
        </div>

        {/* Contact Information Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
              <div className="mt-1 h-10 w-full animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Business Information Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={i === 4 ? "md:col-span-2" : ""}>
              <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
              <div className="mt-1 h-10 w-full animate-pulse rounded bg-gray-200" />
            </div>
          ))}
          <div className="md:col-span-2">
            <div className="h-5 w-36 animate-pulse rounded bg-gray-200" />
            <div className="mt-1 h-24 w-full animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* Submit Button Skeleton */}
        <div className="flex justify-end">
          <div className="h-10 w-40 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
