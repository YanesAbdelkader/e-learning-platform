import ContentManagement from "../_components/content-management";
import { initialCourses } from "../_lib/shemaCourse";

export default function CoursesAndContentPage() {
  return <ContentManagement initialCourses={initialCourses} />;
}
