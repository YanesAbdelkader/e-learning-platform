import { Suspense } from "react";
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
  // In a real app, you would fetch this data from your Laravel API
  const courseData = await getCourseDetails(params.Id);
  const relatedCourses = await getRelatedCourses(params.Id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CourseHeader
            title={courseData.title}
            rating={courseData.rating}
            students={courseData.students}
            isBestseller={courseData.isBestseller}
            courseId={params.Id}
          />

          <p className="mt-4 text-lg">{courseData.description}</p>

          <CourseDetails
            duration={courseData.duration}
            level={courseData.level}
            hasCertificate={courseData.hasCertificate}
            lastUpdated={courseData.lastUpdated}
          />

          <Suspense fallback={<div>Loading course content...</div>}>
            <CourseTabs
              curriculum={courseData.curriculum}
              skills={courseData.skills}
              instructor={courseData.instructor}
              courseId={params.Id}
            />
          </Suspense>
        </div>

        <div className="lg:col-span-1">
          <CourseSidebar
            price={courseData.price}
            thumbnail={courseData.thumbnail}
            courseId={params.Id}
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <RelatedCourses courses={relatedCourses} />
      </div>
    </div>
  );
}
