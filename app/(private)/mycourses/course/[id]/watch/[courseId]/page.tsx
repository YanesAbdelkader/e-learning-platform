"use server";
import { cookies } from "next/headers";
import VideoPage from "../../../../_components/watch";
import Loading from "@/app/(public)/loading";
import { fetchCourse } from "@/app/(private)/mycourses/_actions/CoursesActions";

interface PageProps {
  params: { courseId: string };
}

export default async function Page({ params }: PageProps) {
  const courseId = params.courseId;
  const token = (await cookies()).get("token")?.value;
  const course = await fetchCourse(courseId);

  if (!token) {
    return <Loading />;
  }

  return <VideoPage token={token} course={course} />;
}