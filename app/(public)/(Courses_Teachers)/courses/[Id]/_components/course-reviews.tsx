"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarFilledIcon } from "@radix-ui/react-icons"
import { getReviews } from "../_actions/actions"
import { Skeleton } from "@/components/ui/skeleton"

interface Review {
  id: number
  name: string
  avatar: string
  rating: number
  comment: string
  date: string
}

export default function CourseReviews({ courseId }: { courseId: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadReviews() {
      try {
        setIsLoading(true)
        setError(null)
        const reviewsData = await getReviews(courseId)
        setReviews(reviewsData)
      } catch (err) {
        console.log("Failed to load reviews:", err)
        setError("Failed to load reviews. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [courseId])

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-b pb-4 space-y-3">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
        <div className="text-red-500 p-4 bg-red-50 rounded-md">{error}</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Student Reviews</h2>
        {reviews.length > 0 && (
          <div className="flex items-center">
            <span className="text-lg font-semibold mr-2">{averageRating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarFilledIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(Number(averageRating)) 
                      ? "text-yellow-400" 
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({reviews.length} reviews)
            </span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No reviews yet. Be the first to review this course!
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start mb-3">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage 
                    src={review.avatar 
                      ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${review.avatar}` 
                      : undefined
                    } 
                    alt={review.name} 
                  />
                  <AvatarFallback>
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{review.name}</div>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <StarFilledIcon
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 pl-[52px]">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}