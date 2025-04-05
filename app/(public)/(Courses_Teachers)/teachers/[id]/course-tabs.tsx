import { Skeleton } from "@/components/ui/skeleton";
import CourseReviews from "../../courses/[Id]/_components/course-reviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseInstructor, {
  Instructor,
} from "../../courses/[Id]/_components/course-instructor";

interface CourseTabsProps {
  instructor: Instructor;
  courseId: string;
  className?: string;
}

export default function CourseTabs({
  instructor,
  courseId,
  className,
}: CourseTabsProps) {
  return (
    <Tabs defaultValue="reviews" className={`mt-8 ${className}`}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="instructor">Instructor</TabsTrigger>
      </TabsList>

      <TabsContent value="reviews" className="mt-6">
        <CourseReviews courseId={courseId} />
      </TabsContent>

      <TabsContent value="instructor" className="mt-6">
        <CourseInstructor instructor={instructor} />
      </TabsContent>
    </Tabs>
  );
}

export function CourseTabsSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <Skeleton className="h-10 w-full rounded-md" />
      <div className="space-y-4">
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
      </div>
    </div>
  );
}
