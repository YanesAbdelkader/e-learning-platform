"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProgressTrackerSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[300px]" />
      
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4 p-6 border rounded-lg">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-5 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}