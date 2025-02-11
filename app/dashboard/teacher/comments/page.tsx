import { CommentsViewer } from "@/components/teacher/comments-viewer";

export default function page() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Comments</h2>
      <CommentsViewer />
    </div>
  );
}
