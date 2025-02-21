import { fetchCategories, fetchCourses } from "../_actions/CoursesAction";
import { CourseManagement } from "../_components/course-management";

export default async function CoursesPage() {
  const courses = await fetchCourses();
  const categories = await fetchCategories();
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Course Management</h2>
      <CourseManagement initialCourses={courses} categories={categories}/>
    </div>
  );
}
