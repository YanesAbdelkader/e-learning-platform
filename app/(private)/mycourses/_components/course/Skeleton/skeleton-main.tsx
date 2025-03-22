import { SkeletonContent } from "./skeleton-content";
import { SkeletonHeader } from "./skeleton-header";

export function CoursePageSkeleton() {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <main className="flex-1">
          <SkeletonHeader />
          <SkeletonContent />
        </main>
      </div>
    );
  }