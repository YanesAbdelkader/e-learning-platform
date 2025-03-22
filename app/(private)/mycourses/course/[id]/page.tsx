"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CoursePageSkeleton } from "../../_components/course/Skeleton/skeleton-main";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CourseHeader } from "../../_components/course/course-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Curriculum } from "../../_components/course/curriculum";
import { Comments } from "../../_components/course/comments";
import { Reviews } from "../../_components/course/reviews";
import { Course } from "../../_lib/type";
import { fetchCoursesById } from "../../_actions/CoursesActions";

export default function CoursePage() {
  const params = useParams();
  const courseId = params.id as string;

  // State for course data, loading, and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<Course | null>(null);

  // State for tabs
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const courseData = await fetchCoursesById(courseId);
        setCourse(courseData);
      } catch (err) {
        setError(`${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  // Loading state
  if (loading) {
    return <CoursePageSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto p-6 bg-card rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Error Loading Course</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link href="/mycourses">
            <Button>Return to My Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Course not found state
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto p-6 bg-card rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The requested course could not be found.
          </p>
          <Link href="/mycourses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <CourseHeader course={course} />
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 w-full sm:w-auto grid grid-cols-2 sm:inline-flex">
              <TabsTrigger value="overview" className="flex-1 sm:flex-initial">
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="flex-1 sm:flex-initial"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger
                value="discussions"
                className="flex-1 sm:flex-initial"
              >
                Discussions
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 sm:flex-initial">
                Reviews
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="prose max-w-none dark:prose-invert">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                  About This Course
                </h2>
                <div className="space-y-4">
                  <p>{course.description}</p>
                  <div className="bg-muted/50 p-4 rounded-lg mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-medium mb-1">Category</h3>
                      <p className="text-muted-foreground">{course.category}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Level</h3>
                      <p className="text-muted-foreground">{course.level}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Last Updated</h3>
                      <p className="text-muted-foreground">
                        {course.updatedAt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum">
              <Curriculum episodes={course.episodes} />
            </TabsContent>

            {/* Discussions Tab */}
            <TabsContent value="discussions">
              <Comments courseId={courseId} />
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <Reviews courseId={courseId} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
