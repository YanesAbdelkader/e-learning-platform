import { fetchComments } from "../_actions/CommentsActions";
import { CommentsViewer, CommentsViewerSkeleton } from "../_components/comments-viewer";
import { Suspense } from "react";

export default async function CommentsPage() {
  const initialComments = await fetchComments();
  
  return (
    <main className="container mx-auto px-4 py-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Course Comments
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Share your thoughts and feedback about the course
        </p>

      <Suspense fallback={<CommentsViewerSkeleton />}>
        <CommentsViewer initialComments={initialComments} />
      </Suspense>
    </main>
  );
}