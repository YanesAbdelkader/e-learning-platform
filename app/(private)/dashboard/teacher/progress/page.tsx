import { Suspense } from 'react';
import { fetchProgress } from "../_actions/ProgressAction";
import { ProgressTracker } from "../_components/progress-tracker";
import { ProgressTrackerSkeleton } from '../_components/progress-tracker-skeleton';

export default async function StudentProgressPage() {
  try {
    const initialStudents = await fetchProgress();

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Student Progress</h1>
        </div>
        
        <Suspense fallback={<ProgressTrackerSkeleton />}>
          <ProgressTracker initialStudents={initialStudents} />
        </Suspense>
      </div>
    );
  } catch (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Student Progress</h1>
        <div className="rounded-lg border border-dashed border-red-300 p-8 text-center">
          <p className="text-red-500 font-medium">
            Failed to load student progress data
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {error instanceof Error ? error.message : 'An unknown error occurred'}
          </p>
        </div>
      </div>
    );
  }
}