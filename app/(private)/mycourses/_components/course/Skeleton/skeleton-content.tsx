import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonContent() {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-10">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }