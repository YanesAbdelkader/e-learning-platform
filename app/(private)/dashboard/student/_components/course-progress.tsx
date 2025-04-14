"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { fetchCourseProgress } from "../_actions/data";
import Loading from "../loading";
import Link from "next/link";

type Course = {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  lastAccessed: string;
};

export function CourseProgress() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCourseProgress();
        setCourses(data);
      } catch (error) {
        console.log("Failed to fetch course progress:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex flex-col gap-2 rounded-lg border p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{course.title}</h3>
              <p className="text-sm text-muted-foreground">
                Instructor: {course.instructor}
              </p>
            </div>
            <Link href={"/mycourses"}>
              <Button size="sm" className="gap-1">
                <PlayCircle className="h-4 w-4" />
                Continue
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={course.progress} className="h-2" />
            <span className="text-sm font-medium">{course.progress}%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Last accessed: {course.lastAccessed}
          </p>
        </div>
      ))}
    </div>
  );
}
