export default function NewMenuItemLoading() {
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
                  {/* Item Name */}
                  <div>
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="mt-1 h-10 w-full animate-pulse rounded bg-gray-200" />
                  </div>

                  {/* Description */}
                  <div>
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="mt-1 h-24 w-full animate-pulse rounded bg-gray-200" />
                  </div>

                  {/* Price */}
                  <div>
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                    <div className="mt-1 h-10 w-48 animate-pulse rounded bg-gray-200" />
                  </div>

                  {/* Item Image */}
                  <div>
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="mt-1 h-4 w-96 animate-pulse rounded bg-gray-200" />
                    <div className="mt-2 h-40 w-full animate-pulse rounded bg-gray-200" />
                  </div>

                  {/* Dietary Info */}
                  <div>
                    <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                    <div className="mt-2 space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-x-2"
                        >
                          <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                        </div>
                      ))}
                    </div>
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
