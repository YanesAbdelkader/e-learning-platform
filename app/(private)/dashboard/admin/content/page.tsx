import { fetchCourses } from "../_actions/ContentActions";
import ContentManagement from "../_components/content-management";
import { Course } from "../_lib/shemaCourse";
  
export default async function CoursesAndContentPage() {
  const Courses:Course[] = await fetchCourses();
  return <ContentManagement initialCourses={Courses} />;
}
