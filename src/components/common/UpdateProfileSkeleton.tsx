
import { Skeleton } from "@/components/ui/skeleton";

const UpdateProfileSkeleton = () => {
  return (
    <div className="space-y-5 flex-col-center w-full">
      {/* Avatar and name/email skeleton */}
      <div className="space-y-5 flex-col-center w-full">
        <Skeleton className="w-32 h-32 rounded-full" />
        <div className="space-y-1 flex-col-center">
          <Skeleton className="h-6 w-32 rounded" />
          <Skeleton className="h-4 w-40 rounded" />
        </div>
      </div>
      {/* Form skeleton */}
      <div className="w-full mt-8">
        <form className="space-y-10">
          <div className="space-y-6">
            {/* Name/Contact Person & Phone */}
            <div className="grid grid-cols-2 gap-6">
              <Skeleton className="h-10 w-full rounded" />
              <Skeleton className="h-10 w-full rounded" />
            </div>
            {/* Password & Confirm Password */}
            <div className="grid grid-cols-2 gap-6">
              <Skeleton className="h-10 w-full rounded" />
              <Skeleton className="h-10 w-full rounded" />
            </div>
            {/* Plan (radio), Bank Name, Bank Info, Company Overview, Industry (for client) */}
            <div className="space-y-4">
              {/* Plan radio skeleton */}
              <div className="flex gap-4 items-center">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-24 rounded" />
              </div>
              {/* Bank name */}
              <Skeleton className="h-10 w-full rounded" />
              {/* Bank info */}
              <div className="grid grid-cols-2 gap-5">
                <Skeleton className="h-10 w-full rounded" />
                <Skeleton className="h-10 w-full rounded" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Skeleton className="h-10 w-full rounded" />
                <Skeleton className="h-10 w-full rounded" />
              </div>
              {/* Company Overview */}
              <Skeleton className="h-20 w-full rounded" />
              {/* Industry select */}
              <Skeleton className="h-10 w-full rounded" />
            </div>
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-10 w-24 rounded" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileSkeleton;