"use server";

import { getCourseDetails, getRelatedCourses } from "./_actions/actions";
import CourseHeader from "./_components/course-header";
import CourseDetails from "./_components/course-details";
import CourseTabs from "../../teachers/[id]/course-tabs";
import CourseSidebar from "./_components/course-sidebar";
import RelatedCourses from "./_components/related-courses";

export default async function CourseDetailPage({
  params,
}: {
  params: {
    Id: string;
  };
}) {
  const courseData = await getCourseDetails(params.Id);
  const relatedCourses = await getRelatedCourses(params.Id);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CourseHeader
            title={courseData.title}
            rating={courseData.rating}
            students={courseData.students}
            courseId={params.Id}
          />

          <p className="text-lg text-gray-700 dark:text-gray-300">
            {courseData.description}
          </p>

          <CourseDetails
            duration={courseData.duration}
            level={courseData.level}
            category={courseData.category.name}
            lastUpdated={courseData.lastUpdated}
          />

          <CourseTabs instructor={courseData.instructor} courseId={params.Id} />
        </div>

        <div className="lg:col-span-1">
          <CourseSidebar
            image={courseData.image}
            price={courseData.price}
            courseId={params.Id}
            title={courseData.title}
          />
        </div>
      </div>

      <div className="mt-16">
        <RelatedCourses courses={relatedCourses} />
      </div>
    </div>
  );
}
