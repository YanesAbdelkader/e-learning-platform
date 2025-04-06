"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookmarkX } from "lucide-react";
import { useCartAndFavorites } from "@/hooks/use-Cart-Fav";
import { useEffect, useState } from "react";
import { Course } from "@/data/types";
import { CourseCard } from "../_components/course-card-fav";
import { fetchCoursesByIds } from "@/functions/custom";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useCartAndFavorites();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }
      try {
        const coursesByIds = await fetchCoursesByIds(favorites);
        setCourses(coursesByIds);
      } catch (error) {
        console.error("Error fetching favorite courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Favorites</h1>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={true}
              onFavoriteToggle={() => toggleFavorite(String(course.id))}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <BookmarkX className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Start adding courses to your favorites to keep track of what
            interests you.
          </p>
          <Link href="/courses">
            <Button className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Browse Courses
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}
