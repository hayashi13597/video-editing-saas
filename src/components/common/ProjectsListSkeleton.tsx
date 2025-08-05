import React from "react";

const columns = [
  { key: "status", width: 60 },
  { key: "title", width: 200 },
  { key: "applicant", width: 120 },
  { key: "requestDate", width: 100 },
  { key: "deadline", width: 100 },
  { key: "points", width: 80 },
  { key: "action", width: 40 }
];

const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={`bg-green-main animate-pulse rounded ${className || "h-5 w-full"}`}
  />
);

const ProjectsListSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Top bar skeleton (search/filter/buttons) */}
      <div className="flex-between">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-7 w-32" /> {/* Filter or title */}
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-64" /> {/* Search input */}
          <Skeleton className="h-9 w-32" /> {/* Button */}
        </div>
      </div>

      {/* Table skeleton */}
      <div className="space-y-2 pb-[60px]">
        {/* Header */}
        <div
          className="grid px-3 gap-6"
          style={{
            gridTemplateColumns: columns
              .map((col, idx) =>
                idx === columns.length - 1
                  ? "max-content"
                  : col.key === "title"
                    ? `${12 - columns.length}fr`
                    : "minmax(auto,1fr)"
              )
              .join(" ")
          }}
        >
          {columns.map(col => (
            <Skeleton key={col.key} className="h-5 w-full" />
          ))}
        </div>

        {/* Rows */}
        {[...Array(10)].map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="grid gap-6 px-3 py-2 bg-white rounded-6 items-center"
            style={{
              gridTemplateColumns: columns
                .map((col, idx) =>
                  idx === columns.length - 1
                    ? "max-content"
                    : col.key === "title"
                      ? `${12 - columns.length}fr`
                      : "1fr"
                )
                .join(" ")
            }}
          >
            {columns.map(col => (
              <Skeleton key={col.key} className="h-20 w-full" />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination or more link skeleton */}
      <div className="flex-center">
        <Skeleton className="h-10 w-1/2" />
      </div>
    </div>
  );
};

export default ProjectsListSkeleton;
