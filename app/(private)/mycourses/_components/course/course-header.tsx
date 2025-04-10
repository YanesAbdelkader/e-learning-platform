import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  BookOpen,
  ChevronLeft,
  Clock,
  Play,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "../../_lib/type";

export function CourseHeader({ course }: { course: Course }) {
  const totalEpisodes = course?.episodes.length || 0;
  const completedEpisodes =
    course?.episodes.filter((episode) => episode.completed).length || 0;

  return (
    <div className="bg-muted py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Link
          href="/mycourses"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          <span>Back to My Courses</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Course Info */}
          <div className="md:col-span-2 order-2 md:order-1 space-y-4">
            <div>
              <Badge variant="outline" className="mb-2">
                {course.category}
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                {course.title}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Instructor: {course.instructor}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center">
                <Clock className="mr-1.5 h-4 w-4 text-muted-foreground" />
                {course.totalHours} hours
              </span>
              <span className="flex items-center">
                <BarChart className="mr-1.5 h-4 w-4 text-muted-foreground" />
                {course.level}
              </span>
              <span className="flex items-center">
                <Star className="mr-1.5 h-4 w-4 text-muted-foreground" />
                {course.rating}/5
              </span>
              <span className="flex items-center">
                <Users className="mr-1.5 h-4 w-4 text-muted-foreground" />
                {course.students.toLocaleString()} students
              </span>
              <span className="flex items-center">
                <BookOpen className="mr-1.5 h-4 w-4 text-muted-foreground" />
                {totalEpisodes} episodes
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={`/mycourses/course/${course.id}/watch/${course.id}`}>
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <Play className="h-4 w-4" />
                  {completedEpisodes > 0
                    ? "Continue Learning"
                    : "Start Learning"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Course Thumbnail and Progress */}
          <div className="md:col-span-1 order-1 md:order-2">
            <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
              <div className="relative w-full aspect-video">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.thumbnail}`}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Your Progress</span>
                    <span className="text-sm font-medium">
                      {course.progress}% complete
                    </span>
                  </div>
                  <Progress value={course.progress} className="h-2.5 mb-2" />
                  <div className="text-sm text-muted-foreground">
                    {completedEpisodes} of {totalEpisodes} episodes completed
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-sm border-t">
                  <span className="text-muted-foreground">Time spent:</span>
                  <span className="font-medium flex items-center">
                    <Clock className="inline mr-1.5 h-4 w-4 text-muted-foreground" />
                    {course.completedHours}/{course.totalHours} hrs
                  </span>
                </div>

                {course.lastAccessed && (
                  <div className="text-xs text-muted-foreground pt-1">
                    Last accessed:{" "}
                    {new Date(course.lastAccessed).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
