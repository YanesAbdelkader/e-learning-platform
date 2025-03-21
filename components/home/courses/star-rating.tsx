import { Star } from "lucide-react"

type StarRatingProps = {
  rating: number
  maxStars?: number
}

export default function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  return (
    <div className="flex" aria-label={`Rating: ${rating} out of ${maxStars} stars`}>
      {[...Array(maxStars)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

