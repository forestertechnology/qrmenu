export default function MenusLoading() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-96 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div className="mt-8">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
          <ul role="list" className="divide-y divide-gray-200">
            {[...Array(3)].map((_, i) => (
              <li
                key={i}
                className="relative flex items-center justify-between gap-x-6 px-4 py-5 sm:px-6"
              >
                <div className="min-w-0 flex-auto">
                  <div className="flex items-start gap-x-3">
                    <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
                  </div>
                  <div className="mt-1 h-4 w-64 animate-pulse rounded bg-gray-200" />
                  <div className="mt-1 flex items-center gap-x-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="h-1 w-1 rounded-full bg-gray-200" />
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                  <div className="hidden sm:flex sm:items-center sm:gap-x-4">
                    {[...Array(4)].map((_, j) => (
                      <div
                        key={j}
                        className="h-8 w-8 animate-pulse rounded bg-gray-200"
                      />
                    ))}
                  </div>
                  <div className="sm:hidden">
                    <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
