import { CourseManagement } from "../_components/course-management";

export default async function CoursesPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Course Management</h2>
      <CourseManagement />
    </div>
  );
}
