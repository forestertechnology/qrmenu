export default function NewMenuLoading() {
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-96 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div className="mt-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
              <div className="mt-1 h-16 w-64 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="space-y-8">
                  {/* Menu Name */}
                  <div>
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="mt-1 h-10 w-full animate-pulse rounded bg-gray-200" />
                  </div>

                  {/* Menu Type */}
                  <div>
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="mt-1 h-10 w-full animate-pulse rounded bg-gray-200" />
                  </div>

                  {/* Description */}
                  <div>
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="mt-1 h-24 w-full animate-pulse rounded bg-gray-200" />
                  </div>

                  {/* Background Type */}
                  <div>
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="mt-1 h-10 w-full animate-pulse rounded bg-gray-200" />
                  </div>

                  {/* Background Upload */}
                  <div>
                    <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
                    <div className="mt-1 h-48 w-full animate-pulse rounded bg-gray-200" />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
