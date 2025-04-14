"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input"; // Import the Input component
import Loading from "@/app/(public)/loading";
import { useEffect, useState } from "react";
import { fetchCourses } from "../_actions/CoursesActions";

interface Course {
  id: number;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalHours: number;
  completedHours: number;
  lastAccessed: string;
  category: string;
  status: "in-progress" | "completed" | "not-started";
}

interface CoursesListProps {
  filter?: "all" | "in-progress" | "completed" | "not-started";
}

export function CoursesList({ filter = "all" }: CoursesListProps) {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  const loadData = async () => {
    try {
      const data = await fetchCourses();
      const flattenedData = Array.isArray(data) ? data.flat() : [];
      setCourses(flattenedData);
    } catch (error) {
      console.log("Error loading data:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  let filteredCourses = courses;

  if (filter !== "all") {
    filteredCourses = courses.filter((course) => course.status === filter);
  }

  if (searchTerm) {
    filteredCourses = filteredCourses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No courses found.</p>
      </div>
    );
  }

  const getFilterTitle = () => {
    switch (filter) {
      case "in-progress":
        return "In Progress Courses";
      case "completed":
        return "Completed Courses";
      case "not-started":
        return "Not Started Courses";
      default:
        return "All Courses";
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">{getFilterTitle()}</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex justify-between items-center w-full mt-4">
          <Input
            type="text"
            placeholder="Search courses or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          {filter !== "all" && (
            <Link
              href="/mycourses"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              View All Courses
            </Link>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.thumbnail}`}
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
    </>
  );
}
