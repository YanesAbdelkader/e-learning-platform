import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonHeader() {
    return (
      <div className="bg-muted py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <Skeleton className="h-6 w-32 mb-4" />
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2 order-2 md:order-1 space-y-4">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-10 w-full max-w-md mb-2" />
                <Skeleton className="h-6 w-48" />
              </div>
  
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
              </div>
  
              <div className="pt-2">
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
  
            <div className="md:col-span-1 order-1 md:order-2">
              <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
                <Skeleton className="w-full aspect-video" />
                <div className="p-4 space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Skeleton className="h-5 w-28" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-2.5 w-full mb-2" />
                    <Skeleton className="h-4 w-40" />
                  </div>
  
                  <div className="pt-2 flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }