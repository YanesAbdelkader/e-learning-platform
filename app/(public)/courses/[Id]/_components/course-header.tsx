"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { toggleWishlist } from "../_actions/actions"

interface CourseHeaderProps {
  title: string
  rating: number
  students: number
  isBestseller: boolean
  courseId: string
}

export default function CourseHeader({ title, rating, students, isBestseller, courseId }: CourseHeaderProps) {
  const [wishlist, setWishlist] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleWishlistToggle = async () => {
    if (isPending) return

    setIsPending(true)
    try {
      const newWishlistState = await toggleWishlist(courseId, wishlist)
      setWishlist(newWishlistState)
    } catch (error) {
      console.error("Failed to toggle wishlist:", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex items-center mt-2 space-x-2">
          {isBestseller && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Bestseller</span>
          )}
          <div className="flex items-center">
            <span className="font-bold mr-1">{rating}</span>
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i}>
                {i <= Math.floor(rating) ? (
                  <StarFilledIcon className="h-4 w-4 text-yellow-400" />
                ) : (
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                )}
              </span>
            ))}
            <span className="text-gray-500 ml-1">({students.toLocaleString()} students)</span>
          </div>
        </div>
      </div>
      <button
        className={`p-2 rounded-full bg-white shadow-sm border ${isPending ? "opacity-50" : ""}`}
        onClick={handleWishlistToggle}
        disabled={isPending}
        aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`h-6 w-6 ${wishlist ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
      </button>
    </div>
  )
}

