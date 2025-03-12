"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    thumbnail: "/placeholder.svg?height=200&width=350",
    progress: 65,
    totalHours: 63,
    completedHours: 41,
    lastAccessed: "2 days ago",
    category: "Web Development",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Machine Learning A-Z: Hands-On Python & R",
    instructor: "Kirill Eremenko",
    thumbnail: "/placeholder.svg?height=200&width=350",
    progress: 30,
    totalHours: 44,
    completedHours: 13,
    lastAccessed: "1 week ago",
    category: "Data Science",
    status: "in-progress",
  },
  {
    id: 3,
    title: "React - The Complete Guide",
    instructor: "Maximilian Schwarzmüller",
    thumbnail: "/placeholder.svg?height=200&width=350",
    progress: 100,
    totalHours: 40,
    completedHours: 40,
    lastAccessed: "1 month ago",
    category: "Web Development",
    status: "completed",
  },
  {
    id: 4,
    title: "The Complete JavaScript Course",
    instructor: "Jonas Schmedtmann",
    thumbnail: "/placeholder.svg?height=200&width=350",
    progress: 10,
    totalHours: 69,
    completedHours: 7,
    lastAccessed: "3 days ago",
    category: "Web Development",
    status: "in-progress",
  },
  {
    id: 5,
    title: "Python for Data Science and Machine Learning",
    instructor: "Jose Portilla",
    thumbnail: "/placeholder.svg?height=200&width=350",
    progress: 0,
    totalHours: 25,
    completedHours: 0,
    lastAccessed: "Not started",
    category: "Data Science",
    status: "not-started",
  },
];

interface CoursesListProps {
  filter?: "all" | "in-progress" | "completed" | "not-started";
}

export function CoursesList({ filter = "all" }: CoursesListProps) {
  let filteredCourses = courses;

  if (filter !== "all") {
    filteredCourses = courses.filter((course) => course.status === filter);
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No courses found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((course) => (
        <Card key={course.id} className="overflow-hidden">
          <div className="relative">
            <Image
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              width={350}
              height={200}
              className="w-full h-48 object-cover"
            />
            {course.progress > 0 && course.progress < 100 && (
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{course.progress}% complete</span>
                  <span>
                    {course.completedHours}/{course.totalHours} hrs
                  </span>
                </div>
                <Progress value={course.progress} className="h-1.5" />
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold line-clamp-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {course.instructor}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button asChild className="flex-1">
                <Link href={`mycourses/course/${course.id}`}>
                  {course.progress === 0
                    ? "Start Course"
                    : course.progress === 100
                    ? "Review"
                    : "Continue"}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
