"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { useCartAndFavorites } from "@/hooks/use-Cart-Fav";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { checkAuthStatus } from "@/functions/custom";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CourseHeaderProps {
  title: string;
  rating: number;
  students: number;
  courseId: string;
  isLoading?: boolean;
}

export default function CourseHeader({
  title,
  rating,
  students,
  courseId,
  isLoading = false,
}: CourseHeaderProps) {
  const router = useRouter();
  const { favorites, toggleFavorite } = useCartAndFavorites();
  const [isfaved, setIsfaved] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  // Calculate rating display
  const roundedRating = Math.round(rating * 10) / 10;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 >= 0.5;

  // Sync fav state with favorites
  useEffect(() => {
    setIsfaved(favorites.includes(courseId));
  }, [favorites, courseId]);

  const handlefavToggle = async () => {
    const { isLoggedIn } = await checkAuthStatus();

    if (!isLoggedIn) {
      setShowAuthDialog(true);
      return;
    }

    if (isPending) return;

    setIsPending(true);
    try {
      await toggleFavorite(courseId);
    } finally {
      setIsPending(false);
    }
  };

  const handleLoginRedirect = () => {
    document.cookie = `lastVisitedPage=${window.location.pathname}; path=/; max-age=3600`;
    router.push("/login");
    router.refresh(); // Ensure the page updates after redirect
  };

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>

        <div className="flex flex-wrap items-center mt-2 gap-x-2 gap-y-1">
          <div className="flex items-center">
            <span className="font-bold mr-1 text-gray-900 dark:text-gray-100">
              {roundedRating}
            </span>
            <div
              className="flex items-center"
              aria-label={`Rating: ${roundedRating} out of 5`}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i}>
                  {i <= fullStars ? (
                    <StarFilledIcon className="h-4 w-4 text-yellow-400" />
                  ) : i === fullStars + 1 && hasHalfStar ? (
                    <div className="relative h-4 w-4">
                      <StarIcon className="absolute h-4 w-4 text-yellow-400" />
                      <StarFilledIcon className="absolute h-4 w-4 text-yellow-400 clip-half" />
                    </div>
                  ) : (
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                  )}
                </span>
              ))}
            </div>
            <span className="text-gray-500 dark:text-gray-400 ml-1">
              ({students.toLocaleString()} students)
            </span>
          </div>
        </div>
      </div>

      <button
        className={cn(
          "p-2 rounded-full transition-all duration-200",
          "shadow-sm border border-gray-200 dark:border-gray-700",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
          isfaved
            ? "bg-red-50 dark:bg-red-900/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40"
            : "bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700",
          isPending ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"
        )}
        onClick={handlefavToggle}
        disabled={isPending}
        aria-label={isfaved ? "Remove from fav" : "Add to fav"}
        aria-busy={isPending}
      >
        <Heart
          className={cn(
            "h-6 w-6 transition-colors",
            isfaved ? "fill-current" : "",
            isPending ? "animate-pulse" : ""
          )}
        />
      </button>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg text-destructive">
              Authentication Required
            </DialogTitle>
            <DialogDescription className="text-base">
              You need to be logged in to add courses to your favorite.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAuthDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleLoginRedirect}
              className="bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-500"
            >
              Go to Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
