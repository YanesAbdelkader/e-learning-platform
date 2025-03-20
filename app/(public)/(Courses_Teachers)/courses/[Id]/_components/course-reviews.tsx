"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarFilledIcon } from "@radix-ui/react-icons"
import { getReviews, submitReview } from "../_actions/actions"

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
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadReviews() {
      try {
        const reviewsData = await getReviews(courseId)
        setReviews(reviewsData)
      } catch (error) {
        console.error("Failed to load reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [courseId])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewText.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const newReview = await submitReview(courseId, {
        rating,
        comment: reviewText,
      })

      setReviews([newReview, ...reviews])
      setReviewText("")
      setRating(5)
    } catch (error) {
      console.error("Failed to submit review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div>Loading reviews...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>

      <form onSubmit={handleSubmitReview} className="mb-8">
        <h3 className="text-lg font-medium mb-2">Leave a Review</h3>
        <div className="flex items-center mb-2">
          <div className="mr-2">Rating:</div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                <StarFilledIcon className={`h-5 w-5 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`} />
              </button>
            ))}
          </div>
        </div>
        <Textarea
          placeholder="Share your experience with this course..."
          className="mb-2"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting || !reviewText.trim()}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${review.avatar}`} alt={review.name} />
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{review.name}</div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarFilledIcon
                      key={i}
                      className={`h-3 w-3 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

