"use client";

import { useEffect, useState } from "react";
import type { Course } from "@/data/types";
import { fetchCourses } from "@/data/getData";
import { LoadingCards } from "./courses/loading-cards";
import { EmptyState } from "./courses/empty-state";
import CourseCard from "./courses/course-card";

type CourseGridProps = {
  selectedCategory: string;
};

export default function CourseGrid({ selectedCategory }: CourseGridProps) {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchCourses();
      setCourses(result || []);
      setError(null);
    } catch (error) {
      console.log("Error fetching data:", error);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const filteredCourses =
    selectedCategory === "All Categories"
      ? courses || []
      : (courses || []).filter(
          (course) => course.category.name === selectedCategory
        );

  const displayedCourses = filteredCourses.slice(0, 12);

  return (
    <section className="py-2 bg-gradient-to-b from-muted/50 to-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-6 md:mb-10">
          Featured Courses
        </h2>

        {loading ? (
          <LoadingCards count={8} />
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No courses found"
            description="No courses available in this category."
            category={selectedCategory}
            onRefresh={handleRefresh}
          />
        )}
      </div>
    </section>
  );
}
