import { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Review } from "../../_lib/type";
import {
  fetchMockReviews,
  reviewSubmit,
} from "../../_actions/comments-reviewsActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function Reviews({ courseId }: { courseId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewContent, setNewReviewContent] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    try {
      const formData = new FormData();
      formData.append("content", newReviewContent);
      formData.append("rating", newRating.toString());
      const newReviewData = await reviewSubmit(courseId, formData);
      if (newReviewData) {
        setNewReviewContent("");
        setNewRating(0);
        toast({
          title: "Success",
          description: "Review submitted successfully!",
          variant: "default",
        });
      }
    } catch (err) {
      console.log("Error submitting review:", err);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const reviewsData = await fetchMockReviews(courseId);
        if (reviewsData) {
          setReviews(reviewsData);
        }
      } catch (err) {
        setError(`${err}`);
        toast({
          title: "Error",
          description: "Failed to fetch reviews. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, toast]);

  return (
    <div>
      {/* Review Submission Form */}
      <Card className="mb-6">
        <CardHeader>
          <h3 className="text-lg font-medium">Add a Review</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReviewSubmit}>
            <div className="grid gap-4">
              {/* Rating Input */}
              <div className="grid gap-2">
                <Label htmlFor="rating">Your Rating</Label>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className="focus:outline-none hover:scale-110 transition-transform"
                      onClick={() => setNewRating(i + 1)}
                    >
                      <Star
                        className={`h-6 w-6 cursor-pointer ${
                          i < newRating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Input */}
              <div className="grid gap-2">
                <Label htmlFor="review">Your Review</Label>
                <Textarea
                  id="review"
                  placeholder="Share your experience with this course..."
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full sm:w-auto ml-auto"
                disabled={
                  isSubmittingReview ||
                  newRating === 0 ||
                  !newReviewContent.trim()
                }
              >
                {isSubmittingReview ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Display Reviews */}
      <div className="space-y-6">
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          reviews.length > 0 &&
          reviews.map((review) => (
            <Card key={review.id} className="border-b pb-6 last:border-b-0">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${review.avatar}`}
                      alt={review.name}
                    />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-medium">{review.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
