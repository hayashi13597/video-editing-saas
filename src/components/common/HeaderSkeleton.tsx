import { Skeleton } from "../ui/skeleton"

const HeaderSkeleton = () => {
  return (
    <header className="flex-between w-full h-14">
      <Skeleton className="h-8 w-32" />
      <div className="flex-center gap-4">
        <div className="relative w-6 h-6">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="relative w-6 h-6">
          <Skeleton className="w-full h-full" />
          <Skeleton className="w-3 h-3 rounded-full absolute top-0 right-0" />
        </div>
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </header>
  )
}

export default HeaderSkeleton