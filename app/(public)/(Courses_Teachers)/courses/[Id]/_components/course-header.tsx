"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { toggleWishlist } from "../_actions/actions"
import { useToast } from "@/hooks/use-toast"

interface CourseHeaderProps {
  title: string
  rating: number
  students: number
  courseId: string
  initialWishlistState?: boolean
}

export default function CourseHeader({ 
  title, 
  rating, 
  students, 
  courseId,
  initialWishlistState = false 
}: CourseHeaderProps) {
  const [wishlist, setWishlist] = useState(initialWishlistState)
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()

  const roundedRating = Math.round(rating * 10) / 10
  const fullStars = Math.floor(roundedRating)
  const hasHalfStar = roundedRating % 1 >= 0.5

  const handleWishlistToggle = async () => {
    if (isPending) return

    setIsPending(true)
    try {
      const newWishlistState = await toggleWishlist(courseId, !wishlist)
      setWishlist(newWishlistState)
      
      toast({
        title: newWishlistState ? "Added to wishlist" : "Removed from wishlist",
        description: newWishlistState 
          ? `"${title}" is now in your wishlist` 
          : `"${title}" was removed from your wishlist`,
        variant: "default",
      })
    } catch (error) {
      console.error("Failed to toggle wishlist:", error)
      toast({
        title: "Error",
        description: "Could not update wishlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        
        <div className="flex flex-wrap items-center mt-2 gap-x-2 gap-y-1">
          <div className="flex items-center">
            <span className="font-bold mr-1 text-gray-900 dark:text-gray-100">
              {roundedRating}
            </span>
            <div className="flex items-center" aria-label={`Rating: ${roundedRating} out of 5`}>
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
        className={`p-2 rounded-full transition-all duration-200 ${
          wishlist 
            ? "bg-red-50 dark:bg-red-900/30 text-red-500" 
            : "bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        } shadow-sm border border-gray-200 dark:border-gray-700 ${
          isPending ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"
        }`}
        onClick={handleWishlistToggle}
        disabled={isPending}
        aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
        aria-busy={isPending}
      >
        <Heart className={`h-6 w-6 ${wishlist ? "fill-current" : ""}`} />
      </button>
    </header>
  )
}