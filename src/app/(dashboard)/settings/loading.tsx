export default function SettingsLoading() {
  return (
    <div>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <div className="h-9 w-48 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mt-8 max-w-3xl">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-96 animate-pulse rounded bg-gray-200" />
            <div className="mt-8 space-y-6">
              {/* Form skeleton */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="mt-1 h-10 w-full animate-pulse rounded bg-gray-200" />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="mt-1 h-24 w-full animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="h-6 w-36 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />
            <div className="mt-5">
              <div className="h-9 w-36 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
