const DashboardSkeleton = () => {
  return (
    <main className="space-y-10 pb-[60px]">
      {/* StatsCard Skeleton */}
      <div className="grid grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border border-green-main bg-light-green flex-col-center gap-3 py-10 rounded-10 animate-pulse"
          >
            <div className="h-6 w-20 bg-green-main rounded mb-2" />
            <div className="h-12 w-24 bg-green-main rounded" />
          </div>
        ))}
      </div>

      {/* CompletedProjectsCard Skeleton */}
      <div className="space-y-6">
        <div className="h-7 w-32 bg-green-main rounded mb-2 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="p-3 rounded-6 bg-white space-y-4 animate-pulse"
            >
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="space-y-1.5">
                    <div className="h-4 w-32 bg-green-main rounded mb-1" />
                    <div className="h-3 w-24 bg-green-main rounded" />
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="h-4 w-4 bg-star rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="py-1 px-2.5 rounded-6 bg-bg-main flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-main rounded-full" />
                  <div className="flex flex-col gap-1">
                    <div className="h-4 w-20 bg-green-main rounded" />
                    <div className="h-3 w-16 bg-green-main rounded" />
                  </div>
                </div>
                <div className="h-5 w-16 bg-green-main rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TaskCard Skeleton */}
      <div className="space-y-5">
        <div className="flex justify-between">
          <div className="h-7 w-32 bg-green-main rounded animate-pulse" />
          <div className="h-8 w-24 bg-green-main rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          {/* Header Row Skeleton */}
          <div
            className="grid px-3 gap-6 text-gray"
            style={{
              gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr max-content"
            }}
          >
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="h-5 w-full bg-green-main rounded animate-pulse"
              />
            ))}
          </div>

          {/* Data Rows Skeleton */}
          {[...Array(10)].map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="grid gap-6 px-3 py-2 bg-white rounded-6"
              style={{
                gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr max-content"
              }}
            >
              {[...Array(7)].map((_, colIdx) => (
                <div
                  key={colIdx}
                  className={`h-4 w-full bg-green-main rounded animate-pulse`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="body-text text-green-main flex-end gap-2">
          <div className="h-4 w-20 bg-green-main rounded animate-pulse" />
        </div>
      </div>
    </main>
  );
};

export default DashboardSkeleton;
