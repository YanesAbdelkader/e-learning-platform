"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookmarkX, Bookmark, ArrowRight } from "lucide-react";
import { useCartAndFavorites } from "@/hooks/use-Cart-Fav";
import { useEffect, useState } from "react";
import type { Course } from "@/data/types";
import { CourseCard } from "../_components/course-card-fav";
import { fetchCoursesByIds } from "@/functions/custom";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "../_components/empty-state";

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, loadingFavorites } =
    useCartAndFavorites();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteCourses = async () => {
      if (loadingFavorites) return;

      try {
        setIsLoading(true);
        setError(null);

        if (favorites.length === 0) {
          setCourses([]);
          return;
        }

        const coursesData = await fetchCoursesByIds(favorites);
        setCourses(coursesData);
      } catch (err) {
        console.log("Error fetching favorite courses:", err);
        setError("Failed to load favorite courses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteCourses();
  }, [favorites, loadingFavorites]);

  const handleRemoveFavorite = (courseId: string) => {
    removeFromFavorites(courseId);
  };

  if (isLoading) {
    return <FavoritesSkeleton />;
  }

  if (error) {
    return (
      <EmptyState
        icon={<BookmarkX className="h-16 w-16" />}
        title="Error Loading Favorites"
        description={error}
        action={
          <Button
            onClick={() => window.location.reload()}
            className="gap-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700"
          >
            Retry
            <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Favorites</h1>
        {courses.length > 0 && (
          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {courses.length} {courses.length === 1 ? "course" : "courses"}
          </span>
        )}
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={true}
              onFavoriteToggle={() => handleRemoveFavorite(String(course.id))}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Bookmark className="h-16 w-16" />}
          title="No favorites yet"
          description="Start adding courses to your favorites to keep track of what interests you."
          action={
            <Link href="/courses">
              <Button className="gap-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700">
                <ArrowRight className="h-4 w-4" />
                Browse Courses
              </Button>
            </Link>
          }
        />
      )}
    </main>
  );
}

function FavoritesSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-6 w-20" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-40 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-24 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
