
import { getRecommendedCourses } from "./_actions/get-recommended-courses";
import { getTeacherProfile } from "./_actions/get-teacher-profile";
import TeacherProfile from "./_components/teacher-profile";

export default async function TeacherPage({
  params,
}: {
  params: { id: string };
}) {
  const teacher = await getTeacherProfile(params.id);
  const coursesData = await getRecommendedCourses(params.id);
  return <TeacherProfile teacher={teacher} coursesData={coursesData} />;
}
